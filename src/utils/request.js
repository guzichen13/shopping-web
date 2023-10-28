import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api',
  timeout: 1000
  // headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0 // 0为一直显示
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const result = response.data
  if (result.status !== 200) {
    Toast(result.message)
    return Promise.reject(result.message)
  }
  // 成功相应则清楚toast
  Toast.clear()
  return result
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
