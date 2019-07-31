import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getCustomerList = (data) => request({
    url: baseUrl + '/cust/list',
    method: 'get',
    data: data
})