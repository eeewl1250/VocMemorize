import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: undefined,
    cookieName: 'token'
  },
  mutations: {
    login (state, payload) {
      state.user = payload
    },
    logout (state) {
      state.user = undefined
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('login', payload)
    },
    logout ({ commit }) {
      commit('logout')
    }
  }
})

export default store
