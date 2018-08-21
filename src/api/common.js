import request from '@/utils/request'
// 获取RSA公钥
export function getRSAApi () {
  return request({
    url: '/common/getRSA',
    method: 'get'
  });
}

// 登录接口
export function loginAPi (params) {
  return request({
    url: '/users/login',
    method: 'get',
    params: params
  });
}
