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
export const getUserPermission = () => request({
    url: baseUrl + '/user/allInfo',
    method: 'post',
    data: {
        username: 'admin'
    }
});

export const getUserInfo = (id) => request({
    url: baseUrl + '/user/info',
    method: 'post',
    data: {
        id: id
    }
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refesh',
    method: 'post'
})


export const getMenu = (data) => request({
    url: baseUrl + '/menu/tree',
    method: 'post',
    data: data,
});

export const getTopMenu = () => request({
    url: baseUrl + '/user/getTopMenu',
    method: 'post'
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
    method: 'post'
})