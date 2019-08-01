import Mock from 'mockjs';

export default ({ mock }) => {
    if (!mock) return;

    Mock.mock('/rule/list', 'get', {
            "code": 0,
            "message": "SUCCESS",
            "data": {
                "pageNum": 1,
                "pageSize": 4,
                "total": 8,
                "pages": 2,
                "content": [
                    {
                        "id": 1,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项1",
                        "score": 2.51,
                        "chooseType": 0,
                        "orderNum": 30
                    },
                    {
                        "id": 2,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项2",
                        "score": 2.61,
                        "chooseType": 1,
                        "orderNum": 20
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项3",
                        "score": 2.79,
                        "chooseType": 0,
                        "orderNum": 10
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项3",
                        "score": 2.79,
                        "chooseType": 0,
                        "orderNum": 10
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项3",
                        "score": 2.79,
                        "chooseType": 0,
                        "orderNum": 10
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项3",
                        "score": 2.79,
                        "chooseType": 0,
                        "orderNum": 10
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项3",
                        "score": 2.79,
                        "chooseType": 0,
                        "orderNum": 10
                    },
                    {
                        "id": 3,
                        "createdBy": 1,
                        "createdTime": "2019-07-25 21:43:03",
                        "remark": "",
                        "disabledFlag": 0,
                        "itemType": 0,
                        "itemName": "加分项3",
                        "score": 2.79,
                        "chooseType": 0,
                        "orderNum": 10
                    }
                ]
            },
            "path": "/cls/rule/list",
            "timestamp": 1564672394228
    })
}