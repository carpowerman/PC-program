// 配置编译环境和线上环境之间的切换

let baseUrl = '';
let iconfontVersion = ['567566_pwc3oottzol', '1323563_weqd56z5j6', '1351988_lvzd3t2gjca'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`
const env = process.env
if (env.NODE_ENV == 'development') {
    baseUrl = `https://dev.qichenyun.com:9450/cls`; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = `https://cls.qichenyun.com:9450/cls`; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = `https://cls.qichenyun.com:9450/cls`; //打包上传正式环境地址所有的都改成cls
}
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env
}