import Mock from 'mockjs'
export default ({ mock }) => {
    if (!mock) return;
    Mock.mock('/role/list', 'get', {
        code: 0,
        message: "SUCCESS",
        data: [
           {
                "id": 1,
                "createdBy": 1,
                "createdTime": "2019-07-19 15:12:48",
                "remark": "",
                "disabledFlag": 0,
                "roleNo": "AMDIN",
                "roleName": "超级管理员",
                "dataPermType": 1,
                "dataPermTypeDesc": "全部",
                "permissions": [],
                "orgs": []
            },
            {
                "id": 2,
                "createdBy": 1,
                "createdTime": "2019-07-19 15:14:32",
                "remark": "",
                "disabledFlag": 0,
                "roleNo": "SYSTEM",
                "roleName": "系统管理员",
                "dataPermType": 1,
                "dataPermTypeDesc": "全部",
                "permissions": [],
                "orgs": []
            },
            {
                "id": 3,
                "createdBy": 1,
                "createdTime": "2019-07-19 21:54:44",
                "remark": "",
                "disabledFlag": 0,
                "roleNo": "A",
                "roleName": "业务员",
                "dataPermType": 4,
                "dataPermTypeDesc": "自定义",
                "permissions": [],
                "orgs": []
            },
            {
                "id": 4,
                "createdBy": 1,
                "createdTime": "2019-07-20 18:13:04",
                "remark": "",
                "disabledFlag": 0,
                "roleNo": "B",
                "roleName": "业务员B",
                "dataPermType": 4,
                "dataPermTypeDesc": "自定义",
                "permissions": [],
                "orgs": []
            },
            {
                "id": 5,
                "createdBy": 1,
                "createdTime": "2019-07-20 18:16:27",
                "remark": "",
                "disabledFlag": 0,
                "roleNo": "C",
                "roleName": "业务员C",
                "dataPermType": 4,
                "dataPermTypeDesc": "自定义",
                "permissions": [],
                "orgs": []
            }
        ],
        path: "/cls/role/list",
        timestamp: 1564399327212
    })

    //编辑
    Mock.mock('/role/edit','post',{
            "code": 0,
            "message": "SUCCESS",
            "data": {},
            "path": "/cls/role/edit",
            "timestamp": 1564502871251
    })

    //删除
    Mock.mock('/role/del','delete',{
        "code": 1,
        "message": "该数据已被使用，无法删除",
        "data": {},
        "path": "/cls/role/del",
        "timestamp": 1564504786145
    })

  }