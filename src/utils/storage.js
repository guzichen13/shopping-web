// 规定一个统一key
const key = 'my-shopping-info-key'

// 获取本地存储
export const getInfo = () => {
  const obj = { // 默认对象
    token: '',
    userId: ''
  }
  const result = localStorage.getItem(key) // 获取本地存储
  return result ? JSON.parse(result) : obj
}

// 设置本地存储
export const setInfo = obj => {
  localStorage.setItem(key, JSON.stringify(obj))
}

// 移除本地存储
export const removeInfo = () => {
  localStorage.removeItem(key)
}

// 搜索历史的key
const HISTORY_KEY = 'historyList'

export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

export const setHistory = arr => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
