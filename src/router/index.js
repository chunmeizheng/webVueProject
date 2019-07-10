import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'
import { getToken, canTurnTo } from '@/service/utils'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: routers,
  mode: 'history'
})
const token = getToken();

const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to, from, next) => {
  const token=localStorage.getItem("token")
  console.log("11111111111")
  console.log("11111111111"+!token && to.name !== LOGIN_PAGE_NAME)
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
    console.log("qq")
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    console.log("222222"+!token && to.name === LOGIN_PAGE_NAME)
    // 未登陆且要跳转的页面是登录页
    next({})
    console.log("32")
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    console.log("222222222222222222222")
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到home页
    })
  } else{
    next({})
  }
});


export default router
