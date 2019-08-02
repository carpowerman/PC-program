import request from '@/router/axios';
import { baseUrl } from '@/config/env';

const getFileList = (data) => request({
    url: baseUrl + '/file/list',
    method: 'post',
    data: data
});

export const getBarB = getFileList({
    bizId: "",
    fileBizType: 90,
    paging: false,
    pageNum: "",
    pageSize: ""
});

export const getBarC = getFileList({
    bizId: "",
    fileBizType: 91,
    paging: false,
    pageNum: "",
    pageSize: ""
});

export const getLogo = getFileList({
    bizId: "",
    fileBizType: 92,
    paging: false,
    pageNum: "",
    pageSize: ""
});

export const getNew = getFileList({
    bizId: "",
    fileBizType: 93,
    paging: false,
    pageNum: "",
    pageSize: ""
});

export const getOld = getFileList({
    bizId: "",
    fileBizType: 94,
    paging: false,
    pageNum: "",
    pageSize: ""
});

export const deleteFile = (data) => request({
    url: baseUrl + '/file/del',
    method: "post",
    data: data
});

export const addFile = (data) => request({
    url: baseUrl + 'http://120.55.49.21:9450/cls/file/upload',
    method: "post",
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
});