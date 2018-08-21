import {logoutApi, QiniuApi } from '@/api/root'
import { getCookie, setCookie, removeCookie} from '@/utils/auth'
import Cookies from "js-cookie";
const user = {
  state: {
    qiniuToken: getCookie('qiniuToken') || '',
    userInfo: {},
    limit: 10
  },

  mutations: {
    SET_QINIU: (state, data) => {
      setCookie('qiniuToken', data, { expires: 0.02 })
      state.qiniuToken = data
    },
    SET_USER_INFO: (state, data) => {
      getCookie('userInfo', data, { expires: 0.02 })
      state.userInfo = data
      setCookie('userInfo', JSON.stringify(data))
    }

  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
      return new Promise((resolve, reject) => {
        QiniuApi().then(response => {
          commit('SET_QINIU', response.data.token)
          localStorage.qiuniuToken = response.data.token
        }).catch(error => {
          reject(error)
        })
      })
    },
    getQiniuToken ({ commit }) {
      return new Promise((resolve, reject) => {
        QiniuApi().then((res) => {
          commit('SET_QINIU', res.data.token)
          resolve(res.data.token)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logoutApi(state.id).then(() => {
          state.userInfo = {}
          removeCookie('userInfo')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ state }) {
      return new Promise(resolve => {
        state.userInfo = {}
        Cookies.remove('userInfo')
        localStorage.removeItem('brandName')
        localStorage.removeItem('activeIndex')
        resolve()
      })
    }
  }
}

export default user
