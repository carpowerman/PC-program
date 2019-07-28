import Mock from 'mockjs'
const top = [{
  label: "首页",
  path: "/wel/index",
  icon: 'el-icon-document',
  meta: {
    i18n: 'dashboard',
  },
  parentId: 0
},
{
  label: "官网",
  icon: 'el-icon-document',
  meta: {
    i18n: 'website',
  },
  path: "https://avuex.avue.top",
  parentId: 1
},
{
  label: "测试",
  icon: 'el-icon-document',
  path: "/test/index",
  meta: {
    i18n: 'test',
  },
  parentId: 2
},
{
  label: "门店管理",
  icon: 'el-icon-document',
  path: "/storeManagement",
  meta: {
    i18n: 'storeManagement',
  },
  parentId: 3
},
{
  label: "员工管理",
  icon: 'el-icon-document',
  path: "/employeeManagement",
  meta: {
    i18n: 'employeeManagement',
  },
  parentId: 4 
},
{
  label: "客户管理",
  icon: 'el-icon-document',
  path: "/customerManagement",
  meta: {
    i18n: 'customerManagement',
  },
  parentId: 5
},{
  label: "预约管理",
  icon: 'el-icon-document',
  path: "/bookingManagement",
  meta: {
    i18n: 'bookingManagement',
  },
  parentId: 6
},{
  label: "评分规则",
  icon: 'el-icon-document',
  path: "/scoringRules",
  meta: {
    i18n: 'scoringRules',
  },
  parentId: 6
},
{
  label: "数据大屏",
  icon: 'el-icon-document',
  path: "http://data.avue.top",
  meta: {
    i18n: 'datascreen',
  },
  parentId: 3
}]
const first = [{
  label: "缓冲",
  path: '/cache',
  component: 'views/util/cache',
  icon: 'icon-caidan',
  meta: {
    i18n: 'cache',
    keepAlive: true
  },
  children: []
}, {
  label: "标签",
  path: '/tags',
  component: 'views/util/tags',
  icon: 'icon-caidan',
  meta: {
    i18n: 'tags',
  },
  children: []
}, {
  label: "存储",
  path: '/store',
  component: 'views/util/store',
  icon: 'icon-caidan',
  meta: {
    i18n: 'store',
  },
  children: []
}, {
  label: "全局函数",
  path: 'https://avuex.avue.top/doc/api',
  icon: 'icon-caidan',
  meta: {
    i18n: 'api',
  },
  children: []
}, {
  label: "日志监控",
  path: '/logs',
  component: 'views/util/logs',
  icon: 'icon-caidan',
  meta: {
    i18n: 'logs',
  },
  children: []
}, {
  label: "表格",
  path: '/table',
  component: 'views/util/table',
  icon: 'icon-caidan',
  meta: {
    i18n: 'table',
  },
  children: []
}, {
  label: "表单",
  path: '/form',
  component: 'views/util/form',
  icon: 'icon-caidan',
  meta: {
    i18n: 'form'
  },
  children: []
}, {
  label: "权限",
  path: '/permission',
  component: 'views/util/permission',
  icon: 'icon-caidan',
  meta: {
    i18n: 'permission',
  },
  children: []
}, {
  label: "返回顶部",
  path: '/top',
  component: 'views/util/top',
  icon: 'icon-caidan',
  meta: {
    i18n: 'top',
  },
  children: []
}, {
  label: "表格表单",
  path: '/crud-form',
  component: 'views/util/crud-form',
  icon: 'icon-caidan',
  meta: {
    i18n: 'crudForm',
  },
  children: []
}, {
  label: "图钉",
  path: '/affix',
  component: 'views/util/affix',
  icon: 'icon-caidan',
  meta: {
    i18n: 'affix',
  },
  children: []
},

{
  label: "数据展示",
  path: '/data',
  component: 'views/util/data',
  icon: 'icon-caidan',
  meta: {
    i18n: 'data',
  },
  children: []
}, {
  label: "异常页",
  path: '/error',
  meta: {
    i18n: 'error',
  },
  icon: 'icon-caidan',
  children: [{
    label: "403",
    path: 'error',
    component: 'components/error-page/403',
    icon: 'icon-caidan',
    children: []
  }, {
    label: "404",
    path: '404',
    component: 'components/error-page/404',
    icon: 'icon-caidan',
    children: []
  }, {
    label: "500",
    path: '500',
    component: 'components/error-page/500',
    icon: 'icon-caidan',
    children: []
  }]
}]
const second = []
const third = [{
  label: "测试页面",
  path: '/test',
  component: 'views/test',
  icon: 'icon-caidan',
  meta: {
    i18n: 'test',
  },
  children: []
}];
// 全部菜单栏
// 我们改这个就行了
const admin = [
 {
    label: '小程序设置',
    path: '/miniProgram',
    component: 'views/miniProgram/index',
    icon: '',
    meta: {
      i18n: 'miniProgram'
    },
    children: []
  },  {
    label: '门店管理',
<<<<<<< HEAD
    // url
    path: '/storeManagement',
    // 页面路径
    component: 'views/storeManagement',
=======
    path: '/miniProgram1',
    component: '',
>>>>>>> 92365f2da536fe36b0fa3232d2d17d3370e5b20f
    icon: '',
    meta: {
      i18n: 'storeManagement'
    },
    children: []
  },  {
    label: '员工管理',
<<<<<<< HEAD
    path: '/employeeManagement',
    component: 'views/employeeManagement',
=======
    path: '/miniProgram2',
    component: '',
>>>>>>> 92365f2da536fe36b0fa3232d2d17d3370e5b20f
    icon: '',
    meta: {
      i18n: 'miniProgram'
    },
    children: []
  },  {
    label: '客户管理',
<<<<<<< HEAD
    path: '/customerManagement',
    component: 'views/customerManagement',
=======
    path: '/miniProgram3',
    component: '',
>>>>>>> 92365f2da536fe36b0fa3232d2d17d3370e5b20f
    icon: '',
    meta: {
      i18n: 'miniProgram'
    },
    children: []
  },  {
    label: '预约管理',
<<<<<<< HEAD
    path: '/bookingManagement',
    component: 'views/bookingManagement',
=======
    path: '/miniProgram4',
    component: '',
>>>>>>> 92365f2da536fe36b0fa3232d2d17d3370e5b20f
    icon: '',
    meta: {
      i18n: 'bookingManagement'
    },
    children: []
  },  {
    label: '金融方案',
    path: '/financialPlan',
    component: 'views/financialPlan/index',
    icon: '',
    meta: {
      i18n: 'financialPlan'
    },
    children: []
  },  {
    label: '评分规则',
<<<<<<< HEAD
    path: '/scoringRules',
    component: 'views/scoringRules',
=======
    path: '/miniProgram6',
    component: '',
>>>>>>> 92365f2da536fe36b0fa3232d2d17d3370e5b20f
    icon: '',
    meta: {
      i18n: 'scoringRules'
    },
    children: []
  },
]
export default ({ mock }) => {
  if (!mock) return;
  let menu = [first, second, third, admin];
  Mock.mock('/user/getMenu', 'get', (res) => {
    let body = JSON.parse(res.body);
    return {
      data: menu[body.type] || []
    }
  })
  Mock.mock('/user/getTopMenu', 'get', () => {
    return {
      data: top
    }
  })

}