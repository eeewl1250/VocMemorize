import Vue from 'vue'
import Router from 'vue-router'
import Cookie from '../util/cookie'
import Configs from '../assets/global'
import store from '../store'
import Http from '../util/http'

import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import WordsImport from '@/components/Import'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        toLog: true
      }
    }, {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        toLog: true
      }
    }, {
      path: '/import',
      name: 'import',
      component: WordsImport,
      meta: {
        requireAuth: true
      }
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  let user = store.state.user
  if (user) {
    next()
  } else {
    let isCookie = Cookie.isName(Configs.cookieName)
    if (to.matched.some(record => record.meta.toLog)) { // 不需要验证的页面：登录，注册
      if (isCookie) {
        next('/')
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requireAuth)) { // 需要验证的页面
      if (isCookie) { // 发送token到服务器进行验证
        Http.post('/token')
          .then(res => {
            res = res.data
            if (res.code) {
              next()
            } else {
              Cookie.remove(Configs.cookieName)
              next('/login')
            }
          })
          .catch()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  }
})

export default router
