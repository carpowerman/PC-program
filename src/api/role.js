import request from '@/router/axios';
import { baseUrl } from '@/config/env';
//获取列表
export const getRoleList = (data) => request({
    url: baseUrl + '/role/list',
    method: 'post',
    data: data
});
//添加
export const addRole = (list) => request({
    url: baseUrl + '/role/add',
    method: 'post',
    data: list
})
//编辑
export const editRole = (data) => request({
    url: baseUrl + '/role/edit',
    method: 'post',
    data: data
})
//删除
export const delRole = (data) => request({
    url: baseUrl + '/role/del',
    method: 'post',
    data: data
})
//权限添加分配
export const addPermRole = (data) => request({
    url: baseUrl + '/role/addPerm',
    method: 'post',
    data: data
});

export const roleInfo = (data) => request({
    url: baseUrl + '/role/info',
    method: "post",
    data: data
})