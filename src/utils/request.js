import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrl } from '@/config'
import * as verifyData from '@/common/verifyData.js';
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : baseUrl
})
// 封装axios请求
request.defaults.timeout = 100000 * 6 // 响应时间
request.defaults.validateStatus = status => {
  return status >= 200
}


// 发送请求之前调用拦截器
request.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['user-token'] = store.state.token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求成功经过拦截器
request.interceptors.response.use(
  response => {
    const { status } = response
    // console.log("status",response,)
    if (status !== 200) {
      const { message = '网络出错啦，请重试' } = response.data
      Message.error(message)
      return Promise.reject(message)
    }
    if(response.data.errCode == 51000){  //您需要登陆才能查看更多数据
      store.dispatch('saveTokenOk', "51000")
      console.log("51000",response.data.errorMsg)
    }
    if(response.data.errCode == 52000){
      store.dispatch('saveTokenOk','52000') //权限不足
      console.log("52000",response.data.errorMsg)
    }
    if(response.data.errorMsg == 'token已超时'){
      store.dispatch('saveTokenOk','51000') //token已超时
      console.log("1",response.data.errorMsg)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 基础请求体
 *
 * @export
 * @param {*} { method, url, data, params, isShowMessage: 是否操作提醒显示 }
 * @return {*}
 */
function baseRequest({ method, url, data, params, isShowMessage }) {
  return new Promise((resolve, reject) => {
    request({ method, url, data, params, isShowMessage })
      .then(res => {
        if (method == "POST") {
          resolve(res)
        } else {
          if(isShowMessage == false){
            
            resolve(verifyData.test(res.data))
          }else{
            resolve(res.data)
          }
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function post(url, data, isShowMessage = false) {
  return baseRequest({ method: 'POST', url, data, isShowMessage })
}

export function get(url, params, isShowMessage = false) {
  return baseRequest({ method: 'GET', url, params, isShowMessage })
}
