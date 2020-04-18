import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/MainPage')
    },
    {
      path: '/anime',
      name: 'AnimePage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/AnimePage')
    }
  ]
})
