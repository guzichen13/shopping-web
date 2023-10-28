import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import { getInfo } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getInfo()
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    token (state) {
      return state.token.token.trim()
    }
  },
  modules: {
    user,
    cart
  }
})
