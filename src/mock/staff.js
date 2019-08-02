import Mock from 'mockjs';

export default ({ mock }) => {
    if(!mock) return ;

    Mock.mock('/user/list', 'post', {
        "code": 0,
        "message": "SUCCESS",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "total": 7,
            "pages": 1,
            "content": [
                {
                    "id": 1,
                    "createdBy": "",
                    "createdTime": "",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "ADMIN",
                    "nickname": "超级管理员",
                    "orgId": 1,
                    "orgName": "浙江启辰云科技有限公司",
                    "email": "",
                    "mobile": "13145671234",
                    "avatar": "",
                    "type": -1,
                    "gender": "",
                    "roles": [
                        {
                            "id": 1,
                            "name": "超级管理员"
                        }
                    ]
                },
                {
                    "id": 2,
                    "createdBy": 1,
                    "createdTime": "2019-07-19 16:29:43",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "ADMIN2",
                    "nickname": "系统管理员",
                    "orgId": 1,
                    "orgName": "浙江启辰云科技有限公司",
                    "email": "",
                    "mobile": "13145328745",
                    "avatar": "",
                    "type": 0,
                    "gender": "",
                    "roles": [
                        {
                            "id": 1,
                            "name": "超级管理员"
                        }
                    ]
                },
                {
                    "id": 4,
                    "createdBy": 1,
                    "createdTime": "2019-07-19 21:56:52",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "ADMIN3",
                    "nickname": "业务员A",
                    "orgId": 3,
                    "orgName": "宁波分公司",
                    "email": "",
                    "mobile": "13512358907",
                    "avatar": "",
                    "type": 1,
                    "gender": "",
                    "roles": [
                        {
                            "id": 3,
                            "name": "业务员"
                        }
                    ]
                },
                {
                    "id": 6,
                    "createdBy": 1,
                    "createdTime": "2019-07-20 15:39:19",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "ADMIN4",
                    "nickname": "业务员B",
                    "orgId": 4,
                    "orgName": "业务一部",
                    "email": "",
                    "mobile": "13512358907",
                    "avatar": "",
                    "type": 1,
                    "gender": "",
                    "roles": [
                        {
                            "id": 2,
                            "name": "系统管理员"
                        }
                    ]
                },
                {
                    "id": 10,
                    "createdBy": 1,
                    "createdTime": "2019-07-25 15:18:20",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "13112345678",
                    "nickname": "注册1",
                    "orgId": 14,
                    "orgName": "ORG_VIP",
                    "email": "",
                    "mobile": "13112345678",
                    "avatar": "",
                    "type": 2,
                    "gender": 0,
                    "roles": [
                        {
                            "id": 6,
                            "name": "ROLE_VIP"
                        }
                    ]
                },
                {
                    "id": 12,
                    "createdBy": 1,
                    "createdTime": "2019-07-26 10:18:30",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "13112345679",
                    "nickname": "注册2",
                    "orgId": 14,
                    "orgName": "ORG_VIP",
                    "email": "",
                    "mobile": "13112345679",
                    "avatar": "",
                    "type": 2,
                    "gender": 1,
                    "roles": [
                        {
                            "id": 6,
                            "name": "ROLE_VIP"
                        }
                    ]
                },
                {
                    "id": 13,
                    "createdBy": 1,
                    "createdTime": "2019-07-26 10:30:19",
                    "remark": "",
                    "disabledFlag": 0,
                    "username": "13112345670",
                    "nickname": "注册3",
                    "orgId": 14,
                    "orgName": "ORG_VIP",
                    "email": "",
                    "mobile": "13112345670",
                    "avatar": "",
                    "type": 2,
                    "gender": 1,
                    "roles": [
                        {
                            "id": 6,
                            "name": "ROLE_VIP"
                        }
                    ]
                }
            ]
        },
        "path": "/cls/user/list",
        "timestamp": 1564758326714
    })
}