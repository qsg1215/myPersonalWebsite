// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 代码高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';

import waves from '@/directive/waves' // 水波纹指令

// store
import store from './store'

// UEditor
import UE from './components/UE.vue'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
import '../static/UE/themes/iframe.css'

// iconfont
import '../static/font/iconfont.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 公用样式引入
import './assets/css/common.css'
// 水波纹指令
Vue.directive('waves', waves);

// 声明一个全局变量
window.globalData = {};

// 代码高亮
hljs.highlightCode = function () {
  let blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock)
}
window.hljs = hljs

// 挂载工具
import * as util from '@/utils'
Vue.prototype.$util = util;
Vue.config.productionTip = false
Vue.use(ElementUI)

// 注册UE editor 全局组件
Vue.component('UE', UE)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
