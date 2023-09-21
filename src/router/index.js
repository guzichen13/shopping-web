import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/home',
      component: () => import('@/views/layout')
    },
    {
      path: '/layout',
      name: '/layout',
      component: () => import('@/views/layout'),
      children: [
        {
          path: '/home',
          name: '/home',
          component: () => import('@/views/layout/home')
        },
        {
          path: '/category',
          name: '/category',
          component: () => import('@/views/layout/category')
        },
        {
          path: '/cart',
          name: '/cart',
          component: () => import('@/views/layout/cart')
        },
        {
          path: '/user',
          name: '/user',
          component: () => import('@/views/layout/user')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/proDetail/:id',
      name: 'proDetail',
      component: () => import('@/views/proDetail')
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('@/views/pay')
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('@/views/myOrder')
    }
  ]
})
