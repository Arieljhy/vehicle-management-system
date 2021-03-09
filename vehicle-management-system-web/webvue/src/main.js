import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import "../static/font/iconfont.css"
// import ElementUI from ‘element-ui';
// import ‘element-ui/lib/theme-chalk/index.css’;
Vue.config.productionTip = false

import router from '../src/router'



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
