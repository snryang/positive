import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import { VueAxios } from './axios'


let ACCESS_TOKEN = 'BXC_TOKEN'
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/airtraveladmin/api' : '/api',
  timeout: 10000 // 请求超时时间
})

const err = (error) => {
  NProgress.done()
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      console.log('Forbidden:'+ data.message)
      // notification.error({ message: 'Forbidden', description: data.message })
    }
    if (error.response.status === 500) {
      console.log('Internal Server Error 服务器暂时不可用')
      // notification.error({ message: 'Internal Server Error', description: '服务器暂时不可用' })
    }
    if (error.response.status === 401) {
      console.log('Unauthorized 未授权，请重新登录')
      // notification.error({ message: 'Unauthorized', description: '未授权，请重新登录' })      
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
    NProgress.start()
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {  
  NProgress.done()
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}