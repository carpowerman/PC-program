import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { encryption, deepClone } from '@/util/util'
import webiste from '@/config/website'
import { loginByUsername, getUserPermission, getUserInfo, getMenu, getTopMenu, logout, refeshToken } from '@/api/user'


function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children].forEach(child => {
            if (!isURL(child[propsDefault.path])) {
                child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
            }
            addPath(child);
        })
    }

}
const user = {
    state: {
        userName: '',
        userId: '',
        nickName: '',
        avatar: '',
        permission: {},
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            // 加密，需与后端协调
            const user = encryption({
                data: userInfo,
                type: 'Aes',
                key: '/iqichenyun.com/',
                param: ['password']
            });
            // 发起 api 请求
            return new Promise((resolve) => {
                // api 请求 --@/api/user.js
                loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
                    const data = res.data;
                    if(data.code === 0) {
                        // token 存入 store
                        commit('SET_TOKEN', data.data.token);
                        commit('SET_USERNAME', data.data.username);
                        commit('DEL_ALL_TAG');
                        commit('CLEAR_LOCK');

                    }
                    // 成功为 code: 0 
                    resolve({ code: data.code });
                }).catch(err => {
                    //在 store 层规避 catch 抛出
                    resolve({ code: err.status });
                });
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        GetUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                getUserPermission(state.username).then((res) => {
                    if(res.data.code === 0) {
                        const data = res.data.data;
                        commit('SET_ROLES', data.roles);
                        commit('SET_PERMISSION', data.permissions);
                        commit('SET_USERID', data.userId);
                        getUserInfo(state.userId).then((res) => {
                            if(res.data.code === 0) {
                                const data = res.data.data;
                                commit('SET_NICKNAME', data.nickname);
                                commit('SET_AVATAR', data.avatar);
                                commit('SET_ORGNAME', data.orgName);
                                resolve();
                            }
                        }).catch(err => {
                            reject(err);
                        })
                    }
                }).catch(err => {
                    reject(err);
                })
            });

        },
        //刷新token
        RefeshToken({ state, commit }) {
            return new Promise((resolve, reject) => {
                refeshToken(state.refeshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        GetTopMenu() {
            return new Promise(resolve => {
                getTopMenu().then((res) => {
                    const data = res.data.data || []
                    resolve(data)
                })
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data.data
                    let menu = deepClone(data);
                    menu.forEach(ele => {
                        addPath(ele, true);
                    })
                    commit('SET_MENU', menu)
                    resolve(menu)
                })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERNAME: (state, username) => {
            state.username = username;
            setStore({ name: 'username', content: state.userName, type: 'session' })
        },
        SET_USERID: (state, userid) => {
            state.userId = userid;
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickName = nickname;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}
export default user