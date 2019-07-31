import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getOrgTree = () => request({
    url: baseUrl + '/org/tree',
    method: 'get'
});