import user from './user';
import role from './role';
import menu from './menu';
import org from './org';
import customer from './customer';
import scoringRules from './scoringRules';


/**
 * 模拟数据mock
 * 
 * mock是否开启模拟数据拦截
 */

user({ mock: true });
menu({ mock: true });
org({ mock: true });
customer({ mock: true });
role({ mock: true });
scoringRules({ mock: true });
