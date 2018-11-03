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
import WordsRecite from '@/components/recite/Word'
import WordsList from '@/components/recite/List'
import WordsMain from '@/components/recite/Main'

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
    }, {
      path: '/word',
      name: 'word',
      component: WordsRecite,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/list',
      name: 'list',
      component: WordsList,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/recite',
      name: 'recite',
      component: WordsMain,
      meta: {
        requireAuth: true
      }
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  let cookieName = Configs.cookieName
  let token = Cookie.get(cookieName)
  let user = store.state.user
  if (to.matched.some(record => record.meta.toLog)) { // 登录，注册
    if (user) {
      next('/')
    } else {
      if (token) { // cookie存在，后端token验证
        Http.post('/login/token', {token: token})
          .then(res => {
            res = res.data
            if (res.code) { // 验证成功
              store.dispatch('login', res.data.name)
              next('/')
            } else { // 验证失败
              if (Cookie.has(cookieName)) {
                Cookie.remove(cookieName)
              }
              console.log('Token Login Fail.\n' + res.msg)
              next()
            }
          })
          .catch(err => {
            console.log('Token Login Error: ' + err)
            next()
          })
        next('/')
      } else { // cookie不存在
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) { // 需要验证的页面
    if (user) {
      next()
    } else {
      if (token) { // cookie存在，后端token验证
        Http.post('/login/token', {token: token})
          .then(res => {
            res = res.data
            if (res.code) { // 验证成功
              store.dispatch('login', res.data.name)
              next()
            } else { // 验证失败
              if (Cookie.has(cookieName)) {
                Cookie.remove(cookieName)
              }
              console.log('Token Login Fail.\n Msg: ' + res.msg)
              next('/login')
            }
          })
          .catch(err => {
            console.log('Token Login Error: ' + err)
            next()
          })
      } else { // cookie不存在
        next('/login')
      }
    }
  } else { // 不需验证的页面
    next()
  }
})

export default router
