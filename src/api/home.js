import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getHomeData = (data) => request({
    url: baseUrl + '/home/data',
    method: 'post',
    data: data
});

export const getNotice = (data) => request({
    url: baseUrl + '/notice/list',
    method: 'post',
    data: data
});