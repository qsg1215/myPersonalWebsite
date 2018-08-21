import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

import{decryptByRSA, getDAesString, getAesString} from './index.js'
import {getRSAapi} from './API'
import AES from './AES';
import CryptoJS from  "crypto-js";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 1000 * 60, // 请求超时时间,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=utf-8',
  }

})

// request拦截器
service.interceptors.request.use(config => {
  var postAesKeyData = {
    key: JSON.stringify(CryptoJS.enc.Utf8.parse(AES.key)),
    iv: JSON.stringify(CryptoJS.enc.Utf8.parse(AES.iv))
  }
  globalData.RSApublicKey = '-----BEGIN PUBLIC KEY-----' +
   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzHyokrXxMEgXSTWb4X7\n' +
   'E6wHZOtOVLEhxPkditT0081Y2zurIa8awegm0+9szrmwgutPppqFnS4TwzJ+i5Lz\n' +
   'nUhTh9NRDvqAq9Lm7SdsoLnbVCZY9M0BBr4yAVKa3MHyPoEPctkC+zhwWJPZQRT9\n' +
   'et3Jo/qefWu2+zw7IDWK2itRTe6jGThbd7UKww2PmYGj3cEEYLL6b3h4ep8yazCq\n' +
   '3k/2xAVD8QgDStExIRmKV/47+PKAlWNXF8K/hhLARXEFSCdIQ8X6A9m27ecwT8PU\n' +
   'G1gSW+AzaaZUmR3FAR/eheffZMpgzEfVJHli85q/Qx1NsOesQqdpUB9emBiAoLRh\n' +
   '6QIDAQAB' +
   '-----END PUBLIC KEY-----'
    if (globalData.RSApublicKey) {
      config.headers.aeskey = decryptByRSA(globalData.RSApublicKey,JSON.stringify(postAesKeyData).toString());
    }
 /* config.params = config.params ? getAesString(config.params) : config.params;*/
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
   /* if (res.data) {
      res.data = JSON.parse(JSON.parse(getDAesString(res.data)));
    }*/
    if (res.status !== '200') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000,
        showClose: true
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === '401') {
        MessageBox.confirm('你已被登出，可重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 其他情况
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '请求超时, 请刷新重试！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
