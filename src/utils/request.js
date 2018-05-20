import axios from 'axios'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/json' }
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    //  config.headers['X-Token'] = 'application/json;charset=utf-8' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

export default service
