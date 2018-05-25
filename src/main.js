// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
//引入rem
import '@/utils/rem'
import './plugins'

//引入自定义指令
import '@/directive/'

// 引入axios
import service from "@/utils/request"
Vue.prototype.$http = service

Vue.prototype.isRequire=(isPath)=>{
  return isPath
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
