import request from '@/router/axios';
import { baseUrl } from '@/config/env';

const getFileList = (data) => request({
    url: baseUrl + '/file/list',
    method: 'get',
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