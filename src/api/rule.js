import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getRuleList = (data) => request({
    url: baseUrl + '/rule/list',
    method: 'post',
    data: data
});

export const saveRule = (data) => request({
    url: baseUrl + '/rule/save',
    method: 'post',
    data: data
});