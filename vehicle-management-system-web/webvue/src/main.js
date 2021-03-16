import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

const FastClick = require('fastclick')
FastClick.attach(document.body)




import { Toast,MessageBox,Indicator,Loadmore } from 'mint-ui';
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
Vue.component(Loadmore.name, Loadmore);

import "../static/font/iconfont.css"

Vue.config.productionTip = false

import router from '../src/router'
import '@/permission'



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
