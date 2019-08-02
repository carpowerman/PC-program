import request from '@/router/axios';
import { baseUrl } from '@/config/env';
//获取列表
export const getRoleList = () => request({
    url: baseUrl + '/role/list',
    method: 'post'
});
//添加
export const addRoleList = (list) => request({
    url: baseUrl + '/role/add',
    method: 'post',
    data: list
})
//编辑
export const editRoleList = (list) => request({
    url: baseUrl + '/role/edit',
    method: 'post',
    data: list
})
//删除
export const delRoleList = (id) => request({
    url: baseUrl + '/role/del',
    method: 'post',
    data: {
        id: id,
    }
})
//权限添加分配
export const addPermRoleList = (list) => request({
    url: baseUrl + '/role/addPerm',
    method: 'post',
    data: list
})