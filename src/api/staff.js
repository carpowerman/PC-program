import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getStaffList = (data) => request({
    url: baseUrl + "/user/list",
    method: "post",
    data: data
});

export const deleteStaff = (data) => request({
    url: baseUrl + "/user/del",
    method: "post",
    data: data
});

export const editStaff = (data) => request({
    url: baseUrl + '/user/edit',
    method: "post",
    data: data
});

export const addStaff = (data) => request({
    url: baseUrl + "/user/add",
    method: "post",
    data: data
})