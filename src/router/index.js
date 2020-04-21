import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexBody',
      component: () => import(/* webpackChunkName: "video" */ '@/components/IndexBody')
    },
    {
      path: '/anime',
      name: 'AnimePage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/AnimePage')
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/LoginPage')
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/RegisterPage')
    },
    {
      path: '/supple',
      name: 'SupplePage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/SupplePage')
    }
  ]
})
