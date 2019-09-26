import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.scss';
import '@/assets/iconfont/iconfont.css';
import '@/utils/filter'
import * as Y from '@/utils/y.js'

Vue.prototype.$Y = Y

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
