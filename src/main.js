import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/vant-ui'
// 重置默认样式
import '@/styles/common.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
