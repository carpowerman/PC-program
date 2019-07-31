import user from './user';
import menu from './menu';
import org from './org';
import customer from './customer';

/**
 * 模拟数据mock
 * 
 * mock是否开启模拟数据拦截
 */

user({ mock: true });

menu({ mock: true });

org({ mock: true });

customer({ mock: true });