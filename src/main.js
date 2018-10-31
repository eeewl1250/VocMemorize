// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './element'
import Http from './util/http'
import Cookie from './util/cookie'
import Configs from './assets/global'

Vue.config.productionTip = false

Vue.prototype.$cookies = Cookie
Vue.prototype.$configs = Configs

// http请求
Vue.prototype.$http = Http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
