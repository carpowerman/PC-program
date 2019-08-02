import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getScoringRulesList = (data) => request({
    url: baseUrl + '/rule/list',
    method: 'post',
    data: data
})