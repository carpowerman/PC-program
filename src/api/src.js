import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getFileList = (data) => request({
    url: baseUrl + '/file/list',
    method: 'post',
    data: data
});

export const deleteFile = (data) => request({
    url: baseUrl + '/file/del',
    method: "post",
    data: data
});

export const addFile = (data) => request({
    url: baseUrl + '/file/upload',
    method: "post",
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
});