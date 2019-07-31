
let RouterPlugin = function () {
    this.$router = null;
    this.$store = null;

};
RouterPlugin.install = function (vue, router, store, i18n) {
    this.$router = router;
    this.$store = store;
    this.$vue = new vue({ i18n });
    // function isURL(s) {
    //     return /^http[s]?:\/\/.*/.test(s)
    // }
    function objToform(obj) {
        let result = [];
        Object.keys(obj).forEach(ele => {
            result.push(`${ele}=${obj[ele]}`);
        })
        return result.join('&');
    }
    this.$router.$avueRouter = {
        //全局配置
        $website: this.$store.getters.website,
        routerList: [],
        group: '',
        meta: {},
        safe: this,
        // 设置标题
        setTitle: (title) => {
            const defaultTitle = this.$vue.$t('title');
            title = title ? `${title}——${defaultTitle}` : defaultTitle;
            document.title = title;
        },
        closeTag: (value) => {
            let tag = value || this.$store.getters.tag;
            if (typeof value === 'string') {
                tag = this.$store.getters.tagList.filter(ele => ele.value === value)[0]
            }
            this.$store.commit('DEL_TAG', tag)
        },
        generateTitle: (title, key) => {
            if (!key) return title;
            const hasKey = this.$vue.$te('route.' + key)
            if (hasKey) {
                // $t :this method from vue-i18n, inject in @/lang/index.js
                const translatedTitle = this.$vue.$t('route.' + key)

                return translatedTitle
            }
            return title
        },
        //处理路由
        getPath: function (params) {
            let { src } = params;
            let result = src || '/';
            if (src.includes("http") || src.includes("https")) {
                result = `/myiframe/urlPath?${objToform(params)}`;
            }
            return result;
        },
        //正则处理路由
        vaildPath: function (list, path) {
            let result = false;
            list.forEach(ele => {
                if (new RegExp("^" + ele + ".*", "g").test(path)) {
                    result = true
                }

            })
            return result;
        },
        //设置路由值
        getValue: function (route) {
            let value = "";
            if (route.query.src) {
                value = route.query.src;
            } else {
                value = route.path;
            }
            return value;
        },
        //动态路由
        formatRoutes: function (aMenu = []) {
            const aRouter = []
            const propsConfig = this.$website.menu.props;
            // 拿到字段名称
            const propsDefault = {
                label: propsConfig.label || 'label',
                path: propsConfig.path || 'path',
                icon: propsConfig.icon || 'icon',
                children: propsConfig.children || 'children',
                meta: propsConfig.meta || 'meta',
            }
            if (aMenu.length === 0) return;

            // 循环
            for (let i = 0; i < aMenu.length; i++) {
                const oMenu = aMenu[i];
                // 已经包含在内 停止注册
                if (this.routerList.includes(oMenu[propsDefault.path])) return;

                // 判断是目录还是菜单
                if (oMenu.permissionType === 0) {
                    // 孩子递归
                    this.formatRoutes(oMenu.children);
                    // 自身结束
                    continue;
                }

                // 不是菜单全部结束
                if( oMenu.permissionType !=1 ) continue;

                // 变量赋值
                let path = oMenu.path,
                    component = oMenu.component,
                    name = oMenu.permissionName,
                    icon = oMenu.icon,

                    meta = oMenu.meta || {};

                meta = Object.assign(meta, (() => {
                    if (meta.keepAlive === true) {
                        return {
                            $keepAlive: true
                        }
                    }
                })());

                const oRouter = {
                    path: path,
                    component(resolve) {
                        require(['../page/index'], resolve)
                    },
                    name: name,
                    icon: icon,
                    meta: meta,
                    redirect: (() => {
                        return `${path}/index`;
                    })(),
                    children: (() => {
                        oMenu.path = `${path}/index`;
                        return [{
                            component(resolve) { require([`../${component}.vue`], resolve)},
                            icon: icon,
                            name: name,
                            meta: meta,
                            path: 'index'
                        }]
                    })()
                }
                aRouter.push(oRouter)
                this.routerList.push(path);
            }
            this.safe.$router.addRoutes(aRouter);
        }
    }
}
export default RouterPlugin;