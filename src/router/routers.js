import login from '@/pages/login'
import navigation from '@/pages/navigation'
import home from '@/pages/home'
import user from '@/pages/system/user'
import role from '@/pages/system/role'
import dept from '@/pages/system/dept'
import menu from '@/pages/system/menu'
import log from '@/pages/system/log'

export default[
  /* {
    path: '*',
    component: login
  },
  {
    path: '',
    redirect: '/login'
  }, */
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: navigation,
    children: [
      {
        path: '/home',
        name: '首页',
        component: home
      },
      {
        path: '/user',
        name: '用户信息',
        component: user
      },
      {
        path: '/dept',
        name: '部门信息',
        component: dept
      },
      {
        path: '/role',
        name: '角色信息',
        component: role
      },
      {
        path: '/menu',
        name: '菜单信息',
        component: menu
      },
      {
        path: '/log',
        name: '日志信息',
        component: log
      }
    ]
  },

]
/*export default new Router({
  routes: [
    {
      path: '*',
      component: login
    },
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: home,
      children: [
        {
          path: '/home',
          name: '首页',
          component: home
        },
        {
          path: '/user',
          name: '用户信息',
          component: user
        },
        {
          path: '/dept',
          name: '部门信息',
          component: dept
        },
        {
          path: '/role',
          name: '角色信息',
          component: role
        },
        {
          path: '/menu',
          name: '菜单信息',
          component: menu
        },
        {
          path: '/log',
          name: '日志信息',
          component: log
        }
      ]
    }
  ]
})*/
