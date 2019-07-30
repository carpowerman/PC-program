import request from '@/router/axios';
import { baseUrl } from '@/config/env';
// 登录
export const loginByUsername = (username, password, code, redomStr) => request({
    url: baseUrl + '/auth/login',
    method: 'post',
    meta: {
        isToken: false
    },
    data: {
        username,
        password,
        code,
        redomStr
    }
});

// 获取用户权限信息
export const getUserPermission = (username) => request({
    url: baseUrl + '/user/allInfo',
    method: 'get',
    data: {
        username: username
    }
});

export const getUserInfo = (id) => request({
    url: baseUrl + '/user/info',
    method: 'get',
    data: {
        id: id
    }
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refesh',
    method: 'post'
})

// 此处的 type 即为角色 id
export const getMenu = (type = 3) => request({
    url: baseUrl + '/user/getMenu',
    method: 'get',
    data: {
        type
    }
});

export const getTopMenu = () => request({
    url: baseUrl + '/user/getTopMenu',
    method: 'get'
});

export const sendLogs = (list) => request({
    url: baseUrl + '/user/logout',
    method: 'post',
    data: list
})

export const logout = () => request({
    url: baseUrl + '/user/logout',
    meta: {
        isToken: false
    },
    method: 'get'
})