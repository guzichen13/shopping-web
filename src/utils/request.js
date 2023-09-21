import axios from 'axios'

export default axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 1000
//   headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})