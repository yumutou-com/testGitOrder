export default [
  {
    path: '/user',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './Login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/AuthLayout',
    title: '开发菜单',
    routes: [
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', component: './Dashboard' },
      {
        path: '/moduleName',
        name: 'moduleName',
        title: '模块',
        routes: [{ title: '示例页面', path: '/moduleName/demo', component: './Demo' }],
      },
      { path: '/demoTable', name: '示例表单', title: '示例表单', component: './DemoTable' },
      { path: '/demoTableModel', name: '示例表单model', title: '示例表单model', component: './DemoTableModel' },
    ],
  },
];
