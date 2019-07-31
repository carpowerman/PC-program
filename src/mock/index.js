import user from './user';
import role from './role';
import menu from './menu';
import organization from './organization'

/**
 * 模拟数据mock
 * 
 * mock是否开启模拟数据拦截
 */

user({ mock: true });
menu({ mock: true });
role({ mock: true });
organization({ mock: true });
