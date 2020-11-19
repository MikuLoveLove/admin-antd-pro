const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            path: '/home',
            name: 'home',
            icon: 'home',
            authority: ['admin', 'user'],
            component: './Home',
          },
          // {
          //   path: '/welcome',
          //   name: 'welcome',
          //   icon: 'smile',
          //   authority: ['admin', 'user'],
          //   component: './Welcome',
          // },
          // {
          //   path: '/admin',
          //   name: 'admin',
          //   icon: 'crown',
          //   component: './Admin',
          //   authority: ['admin'],
          //   routes: [
          //     {
          //       path: '/admin/sub-page',
          //       name: 'sub-page',
          //       icon: 'smile',
          //       component: './Welcome',
          //       authority: ['admin'],
          //     },
          //   ],
          // },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            name: 'goodsManage',
            icon: 'appstore',
            path: '/goodsManage',
            routes: [
              {
                name: 'category',
                icon: 'table',
                path: '/goodsManage/category',
                authority: ['admin'],
                component: './GoodsManage/Category'
              },
              {
                name: 'goodsList',
                icon: 'table',
                path: '/goodsManage/goodsList',
                authority: ['admin'],
                component: './GoodsManage/GoodsList'
              }
            ]
          },
          {
            name: 'orderManage',
            icon: 'container',
            path: '/orderManage',
            routes: [
              {
                name: 'orderList',
                icon: 'table',
                path: '/orderManage/orderList',
                authority: ['admin'],
                component: './OrderManage/OrderList'
              }
            ]
          },
          {
            name: 'systemSetting',
            icon: 'SettingOutlined',
            path: '/systemSetting',
            authority: ['admin'],
            routes: [
              {
                path: '/systemSetting/roleManage',
                name: 'roleManage',
                authority: ['admin'],
                component: './SystemSetting/RoleManage'
              },
              {
                path: '/systemSetting/roleManage/roleDetail',
                name: 'roleDetail',
                hideInMenu: true,
                authority: ['admin'],
                component: './SystemSetting/RoleManage/RoleDetail'
              },
              {
                path: '/systemSetting/userManage',
                name: 'userManage',
                authority: ['admin'],
                component: './SystemSetting/UserManage',
              },
              {
                path: '/systemSetting/authorityList',
                name: 'authorityList',
                authority: ['admin'],
                component: './SystemSetting/AuthorityList',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

export default routes;
