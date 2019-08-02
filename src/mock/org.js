import Mock from 'mockjs';

export default ({ mock }) => {
    if (!mock) return;

    // 机构树
    Mock.mock('/org/tree', 'post', {
        "code": 0,
        "message": "SUCCESS",
        "data": [
            {
                "id": 1,
                "createdBy": 1,
                "createdTime": "2019-07-19 15:01:04",
                "remark": "",
                "disabledFlag": 0,
                "parentId": 0,
                "parentName": "",
                "orgNo": "001",
                "orgFullName": "浙江启辰云科技有限公司",
                "orgSimpleName": "启辰云",
                "orgType": 0,
                "orgTypeDesc": "公司",
                "orderNum": "",
                "children": [
                    {
                        "id": 2,
                        "createdBy": 1,
                        "createdTime": "2019-07-19 15:02:05",
                        "remark": "",
                        "disabledFlag": 0,
                        "parentId": 1,
                        "parentName": "启辰云",
                        "orgNo": "001001",
                        "orgFullName": "杭州分公司",
                        "orgSimpleName": "杭分",
                        "orgType": 0,
                        "orgTypeDesc": "公司",
                        "orderNum": 1,
                        "children": [
                            {
                                "id": 4,
                                "createdBy": 1,
                                "createdTime": "2019-07-19 15:02:43",
                                "remark": "",
                                "disabledFlag": 0,
                                "parentId": 2,
                                "parentName": "杭分",
                                "orgNo": "001001001",
                                "orgFullName": "业务一部",
                                "orgSimpleName": "",
                                "orgType": 1,
                                "orgTypeDesc": "部门",
                                "orderNum": 1,
                                "children": []
                            },
                            {
                                "id": 5,
                                "createdBy": 1,
                                "createdTime": "2019-07-19 15:03:03",
                                "remark": "",
                                "disabledFlag": 0,
                                "parentId": 2,
                                "parentName": "杭分",
                                "orgNo": "001001002",
                                "orgFullName": "业务二部",
                                "orgSimpleName": "",
                                "orgType": 1,
                                "orgTypeDesc": "部门",
                                "orderNum": 2,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-19 15:02:21",
                        "remark": "",
                        "disabledFlag": 0,
                        "parentId": 1,
                        "parentName": "启辰云",
                        "orgNo": "001002",
                        "orgFullName": "宁波分公司",
                        "orgSimpleName": "宁分",
                        "orgType": 0,
                        "orgTypeDesc": "公司",
                        "orderNum": 2,
                        "children": [
                            {
                                "id": 7,
                                "createdBy": 1,
                                "createdTime": "2019-07-19 15:03:41",
                                "remark": "",
                                "disabledFlag": 0,
                                "parentId": 3,
                                "parentName": "宁分",
                                "orgNo": "001002001",
                                "orgFullName": "业务一部",
                                "orgSimpleName": "",
                                "orgType": 1,
                                "orgTypeDesc": "部门",
                                "orderNum": 1,
                                "children": []
                            },
                            {
                                "id": 6,
                                "createdBy": 1,
                                "createdTime": "2019-07-19 15:03:30",
                                "remark": "",
                                "disabledFlag": 0,
                                "parentId": 3,
                                "parentName": "宁分",
                                "orgNo": "001002002",
                                "orgFullName": "业务二部",
                                "orgSimpleName": "",
                                "orgType": 1,
                                "orgTypeDesc": "部门",
                                "orderNum": 2,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ],
        "path": "/cls/org/tree",
        "timestamp": 1564488983772
    });


}