import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.scss';
// import '@/assets/iconfont/iconfont.css';
import '@/utils/filter'
import * as Y from '@/utils/y.js'
import * as R from 'ramda'
import Storage from 'vue-ls'

Vue.prototype.$Y = Y
Vue.prototype.$R = R
Vue.use(Storage, {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
});

import { Lazyload, Icon, Cell, CellGroup, Loading, Button, Toast,Field,Image,Row, Col,Notify,Picker,Popup,Tabbar, TabbarItem } from 'vant';
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Image)
Vue.use(Row)
Vue.use(Col)
Vue.use(Notify)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Tabbar).use(TabbarItem)

Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('@/assets/images/goods_default.png'),
  loading: require('@/assets/images/goods_default.png'),
  attempt: 1,
  listenEvents: ['scroll'],
  lazyComponent: true
});



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
