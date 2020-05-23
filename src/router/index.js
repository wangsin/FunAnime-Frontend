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
      path: '/list/:type',
      name: 'CategoryPage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/ListPage')
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/SearchPage')
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
      component: () => import(/* webpackChunkName: "video" */ '@/components/SupplePage'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/videoList',
      name: 'VideoUserList',
      component: () => import('@/components/VideoUserList'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/collectList',
      name: 'CollectList',
      component: () => import('@/components/CollectList'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/video/:videoID',
      name: 'VideoPage',
      component: (videoID) => import(/* webpackChunkName: "video" */ '@/components/VideoPage')
    },
    {
      path: '/post',
      name: 'PostPage',
      component: () => import(/* webpackChunkName: "video" */ '@/components/PostPage'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component: () => import('@/components/NotFountComponent')
    }
  ]
})
