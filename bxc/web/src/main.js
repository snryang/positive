import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import * as Y from '@/utils/y.js'
import * as R from 'ramda'
import router from './router'
import { VueAxios } from '@/utils/request'

Vue.prototype.$Y = Y
Vue.prototype.$R = R

Vue.config.productionTip = false

Vue.use(Storage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
})
Vue.use(VueAxios, router)
new Vue({
  render: h => h(App),
}).$mount('#app')
