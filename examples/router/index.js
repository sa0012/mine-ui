import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/popup', meta: { name: '弹层' }, component: () => import('../../components/popup/demo/index.vue') },
    { path: '/index', meta: { name: '首页' }, component: () => import('../routers/index.vue') },
    { path: '/', redirect: '/index' }
  ]
})
