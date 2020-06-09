import Vue from 'vue'
import Router from 'vue-router'
import { routeList } from '../nav'

Vue.use(Router)

// 获取所有的demo组合成路由
export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    ...routeList(),
    { path: '/index', meta: { name: '首页' }, component: () => import('../routers/index.vue') },
    { path: '/', redirect: '/index' }
  ]
})
