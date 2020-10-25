const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      }
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
            icon: 'smile',
            component: './Home',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            name: 'authorityManage',
            icon: 'SettingOutlined',
            path: '/authorityManage',
            routes: [
              {
                path: '/authorityManage/roleManage',
                name: 'roleManage',
                component: './AuthorityManage/RoleManage',
              },
              {
                path: '/authorityManage/roleManage/roleDetail',
                name: 'roleDetail',
                hideInMenu: true,
                component: './AuthorityManage/RoleManage/RoleDetail',
              },
              {
                path: '/authorityManage/userManage',
                name: 'userManage',
                component: './AuthorityManage/UserManage',
              },
            ]
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
]

export default routes
