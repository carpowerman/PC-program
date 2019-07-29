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
    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });
    //获取用户信息
    Mock.mock('/user/getUserInfo', 'get', {
        data: {
            userInfo: {
                username: 'admin',
                name: '周小雨',
                type: '业务员',
                org: '杭州创汇科技有限公司',
                avatar: 'https://gitee.com/uploads/61/632261_smallweigit.jpg',
            },
            roles: 'admin',
            permission: [
                'sys_crud_btn_add',
                'sys_crud_btn_export',
                'sys_menu_btn_add',
                'sys_menu_btn_edit',
                'sys_menu_btn_del',
                'sys_role_btn1',
                'sys_role_btn2',
                'sys_role_btn3',
                'sys_role_btn4',
                'sys_role_btn5',
                'sys_role_btn6',
            ], //权限级别
        }
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