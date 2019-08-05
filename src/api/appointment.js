import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getAppointList = (data) => request({
    url: baseUrl + "/preod/list",
    method: "post",
    data: data
});

export const updateAppointStatus = (data) => request({
    url: baseUrl + '/preod/approve',
    method: 'post',
    data: data
});

export const AddAppointment = (data) => request({
    url: baseUrl + '/preod/add',
    method: 'post',
    data: data
});