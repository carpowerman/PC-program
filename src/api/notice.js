import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const addNotice = ({ title, content }) => request({
    url: baseUrl + '/notice/add',
    method: 'post',
    data: {
        title: title,
        content: content
    }
})

export const editNotice = ({ id, title, content }) => request({
    url: baseUrl + '/notice/edit',
    method: 'post',
    data: {
        id: id,
        title: title,
        content: content
    }
})