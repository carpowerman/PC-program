import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const getRoleList = () => request({
    url: baseUrl + '/role/list',
    method: 'get'
});

export const editRoleList = (list) => request({
    url: baseUrl + '/role/edit',
    method: 'post',
    data: list
})

export const delRoleList = (id) => request({
    url: baseUrl + '/role/del',
    method: 'delete',
})