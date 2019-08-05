import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const getAppointList = (data) => request({
    url: baseUrl + "/preod/list",
    method: "post",
    data: data
})