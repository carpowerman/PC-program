import Mock from 'mockjs'
export default ({ mock }) => {
    if (!mock) return;
    // 用户登录
    Mock.mock('/user/login', 'post', (opts) => {
        // opts 含 url type body 三个对象
        const loginForm = JSON.parse(opts.body);
        const username = loginForm.username;
        const password = window.CryptoJS.AES.decrypt(
            loginForm.password,
            window.CryptoJS.enc.Utf8.parse('/iqichenyun.com/')
            ,{
                iv: window.CryptoJS.enc.Utf8.parse('/iqichenyun.com/'),
                mode: window.CryptoJS.mode.CBC,
                padding: window.CryptoJS.pad.Pkcs7
            }).toString(window.CryptoJS.enc.Utf8).toString();
        
        if((username === 'tql' && password == '123456') || (username === 'jxj' && password === '123456')) return { data:  new Date().getTime() + '', code: 1 }
        //if()
        return { code: 0 };
    });
    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });
    //获取用户信息
    Mock.mock('/user/getUserInfo', 'get', {
        data: {
            userInfo: {
                username: 'admin',
                name: '周小雨',
                type: '业务员',
                org: '杭州创汇科技有限公司',
                avatar: 'https://gitee.com/uploads/61/632261_smallweigit.jpg',
            },
            roles: 'admin',
            permission: [
                'sys_crud_btn_add',
                'sys_crud_btn_export',
                'sys_menu_btn_add',
                'sys_menu_btn_edit',
                'sys_menu_btn_del',
                'sys_role_btn1',
                'sys_role_btn2',
                'sys_role_btn3',
                'sys_role_btn4',
                'sys_role_btn5',
                'sys_role_btn6',
            ], //权限级别
        }
    });

    //获取表格数据
    Mock.mock('/user/getTable', 'get', () => {
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                id: '@increment',
                name: Mock.mock('@cname'),
                username: Mock.mock('@last'),
                type: [0, 2],
                checkbox: [0, 1],
                'number|0-100': 0,
                datetime: 1532932422071,
                'sex|0-1': 0,
                moreselect: [0, 1],
                "grade": 0,
                address: Mock.mock('@cparagraph(1, 3)'),
                check: [1, 3, 4]
            }))
        }
        return {
            data: {
                total: 11,
                pageSize: 10,
                tableData: list
            }
        }
    })
}