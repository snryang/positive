// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import  { ToastPlugin,AlertPlugin,LoadingPlugin } from 'vux'
import * as R from 'ramda'
import Storage from 'vue-ls'

Vue.use(ToastPlugin, {position: 'top',time:800})
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)


Vue.use(VueRouter)
Vue.use(Storage, {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
});

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$R = R

/* eslint-disable no-new */
new Vue({  
  router:new VueRouter(router),
  render: h => h(App)
}).$mount('#app-box')
