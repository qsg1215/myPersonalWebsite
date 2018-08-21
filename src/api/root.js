import request from '@/utils/request'

/* 登陆接口(新接口) */
export function loginApi (params) {
  return request({
    url: '/users/login',
    method: 'post',
    data: params
  });
}
/* 获取七牛接口 */
export function QiniuApi () {
  return request({
    url: 'config/qiniu',
    method: 'get',
    params: {
      deleteAfterDays: 1
    }
  });
}

// 获取RSA公钥
export function getRSAApi () {
  return request({
    url: '/common/getRSA',
    method: 'get'
  });
}
