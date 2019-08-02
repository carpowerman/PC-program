import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getOrgTree = () => request({
    url: baseUrl + '/org/tree',
    method: 'post'
});

export const saveOrgNode = (data) => request({
    url: baseUrl + '/org/edit',
    method: 'post',
    data: data
});

export const addOrgNode = (data) => request({
    url: baseUrl + '/org/add',
    method: 'post',
    data: data
});

export const deleteOrgNode = (data) => request({
    url: baseUrl + '/org/del',
    method: 'post',
    data: data
});