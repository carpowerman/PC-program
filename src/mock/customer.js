import Mock from 'mockjs';

export default ({ mock }) => {
    if (!mock) return;

    Mock.mock('/cust/list', 'post', {
        "code": 0,
        "message": "SUCCESS",
        "data": {
            "pageNum": 1,
            "pageSize": 2,
            "total": 1,
            "pages": 1,
            "content": [
                {
                    "custId": 10,
                    "custName": "注册1",
                    "custMobile": "13112345678",
                    "preOrders": [
                        {
                            "serialNo": "",
                            "salerId": 6,
                            "salerName": "业务员B",
                            "orgId": 4,
                            "orgName": "业务一部",
                            "orgAddress": "",
                            "status": 1,
                            "statusDesc": "审核通过"
                        },
                        {
                            "serialNo": "15643801831171WKZz",
                            "salerId": 4,
                            "salerName": "业务员A",
                            "orgId": 3,
                            "orgName": "宁波分公司",
                            "orgAddress": "",
                            "status": 0,
                            "statusDesc": "已预约"
                        }
                    ]
                }
            ]
        },
        "path": "/cls/cust/list",
        "timestamp": 1564539729246
    })
}