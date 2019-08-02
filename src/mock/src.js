import Mock from "mockjs";

export default ({ mock }) => {
    if(!mock) return ;

    Mock.mock('/file/list', 'post', {
        "code": 0,
        "message": "SUCCESS",
        "data": {
            "pageNum": 1,
            "pageSize": 1,
            "total": 1,
            "pages": 1,
            "content": [
                {
                    "id": 31,
                    "createdBy": 1,
                    "createdTime": "2019-07-23 16:58:06",
                    "remark": "",
                    "disabledFlag": 0,
                    "fileBizType": 90,
                    "bizId": "",
                    "url": "http://120.55.49.21:9450/images/banner/io2vG1564576477508.jpeg",
                    "fileName": "20150828225753_jJ4Fc.jpeg"
                }
            ]
        },
        "path": "/cls/file/list",
        "timestamp": 1564642159126
    });
}