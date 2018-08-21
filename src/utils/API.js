
/**
 * Created by Administrator on 2017/11/26.
 */
import axios from 'axios'
import {getAesString, toast, checkPostData} from './index.js'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (checkPostData(config.params)) {
    return Promise.reject({data: { msg: '参数错误!'}}) }
  config.params = config.params ? getAesString(config.params) : config.params;
  return config;
}, function (error) {
  toast(error)
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.status >= 400) {
    toast(response.data.msg,'danger')
    return Promise.reject(response.data)
  } else {
    toast(response.data.msg,'success')
  }
  return response
}, function (error) {
  if (!error) {
    toast(response.data.msg, 'danger')
  }
  return Promise.reject(error)
})
/*
// 获取RSA公匙
export function getRSAapi () {
  var promise = new Promise((resolve, reject) => {
    axios.get(server.testURL + '/common/getRSA')
      .then(function (response) {
        resolve(response.data.RSApublicKey)
        globalData.RSApublicKey = response.data.RSApublicKey
      })
      .catch(function (error) {
        reject(error)
      })
  })
  return promise
};

//  登录
export function loginInApi (data) {
  const promise = new Promise(function (resolve, reject) {
    requestConfig(data, 'get').then((config) => {
      axios('/users/login', config)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  })
  return promise
};
*/


