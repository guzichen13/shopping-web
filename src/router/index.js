import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
/**
 * vue-router路由版本更新产生的问题,导致路由跳转失败抛出该错误;
 * 真正的原因是由于返回了一个Promise对象, 正常的跳转由then方法执行 当正常的路由跳转, 被"路由导航守卫"拦截并重新指定路由时, 由于 this.$router.push() 返回的是Promise对象, 此时then方法不能正常执行, 无法跳转到指定路由, 就触发了该对象的捕获错误的方法, throw抛出错误, 但并不影响程序功能.
 * 高逼格式 (推荐)
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e) => {})
}
const router = new VueRouter({
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
      path: '/searchList',
      name: 'searchList',
      component: () => import('@/views/search/list')
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

// 需要拦截的地址数组
const authorArr = ['/pay', '/cart']

// 前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!authorArr.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
