import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    // userInfo: {
    //   token: '',
    //   userId: ''
    // },
    userInfo: getInfo()
  },
  mutations: {
    SETUSERINFO (state, userInfo) {
      state.userInfo = userInfo
      // 本地存储
      setInfo(userInfo)
    }
  },
  actions: {
  },
  getters: {
  }
}
