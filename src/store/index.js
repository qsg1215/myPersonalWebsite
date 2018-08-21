import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import commonConfig from './modules/commonConfig'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    commonConfig
  },
  getters
})

export default store
