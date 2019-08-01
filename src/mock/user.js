import Mock from 'mockjs'
export default ({ mock }) => {
    if (!mock) return;
    // 用户登录
    Mock.mock('/auth/login', 'post', {
        code: 0,
        message: 'SUCCESS',
        data: {
            username: 'ADMIN',
            token: "eyJraWQiOiJpcWljaGVuY2xvdWQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ3d3cuaXFpY2hlbi5jb20iLCJhdWQiOiJ1c2VyIiwic3ViIjoiQURNSU4iLCJleHAiOjIxNjQzOTAyMTIsImp0aSI6Ijl3UnVLbGJVeG1PT1AxYnJZY0R4VXciLCJpYXQiOjE1NjQzOTAyMTIsIm5iZiI6MTU2NDM5MDA5Mn0.KM_f2PMtyXpV4xEucqpcMv52col51SJJElF5eS3s5HlmVqEXD4ZqBCgsGE8qCOKswsZHFNMMl3Bd31IBizlXR1r7CQnLH49I0Npp-gR0OCfckO2xXI7b3pW4uxGVTDQrUHdBUCJBzsGpw2RlyB9_SUVi2VSuCllAT2hDKYkhjEsb9-v02wzpaSSO8T1-fV6p1UxuKPCFVvbR0FQrJoqE46TvD31ld7Fwxhkvw-rw6aSI4bad_uGEp0P60eJ1YiA9E1lR8nE2oTf1TKsyy5MKZCgGPdYihRR54Ir2l-Ki4rhEn_9O73sl2N9v_fGoDBG8FQ6abevoZqm1B0D-_Q1QZQ",
            loginType: 'USER'
        },
        path: '/cls/auth/login',
        timestamp: 1564390212248
    });

    // 用户权限信息
    Mock.mock('/user/allInfo', 'get', {
        "code": 0,
        "message": "SUCCESS",
        "data": {
            "userId": 1,
            "userName": "ADMIN",
            "enabled": true,
            "roles": [
                "AMDIN"
            ],
            "permissions": [
                "sys",
                "sys_user",
                "customer",
                "sys_role",
                "sys_org",
                "sys_menu",
                "rule",
            ],
            "dataPerms": [
                1,
                2,
                4,
                5,
                3,
                7,
                6
            ]
        },
        "path": "/cls/user/allInfo",
        "timestamp": 1564403849881
    })

    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });
    //获取用户信息
    Mock.mock('/user/info', 'get', {
        "code": 0,
        "message": "SUCCESS",
        "data": {
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
            "roles": [
                {
                    "id": 1,
                    "name": "超级管理员"
                }
            ]
        },
        "path": "/cls/user/info",
        "timestamp": 1564448376701
    });

    //获取表格数据
    Mock.mock('/user/getTable', 'get', () => {
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                id: '@increment',
                name: Mock.mock('@cname'),
                username: Mock.mock('@last'),
                type: [0, 2],
                checkbox: [0, 1],
                'number|0-100': 0,
                datetime: 1532932422071,
                'sex|0-1': 0,
                moreselect: [0, 1],
                "grade": 0,
                address: Mock.mock('@cparagraph(1, 3)'),
                check: [1, 3, 4]
            }))
        }
        return {
            data: {
                total: 11,
                pageSize: 10,
                tableData: list
            }
        }
    })
}