import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.scss';
// import '@/assets/iconfont/iconfont.css';
import '@/utils/filter'
import * as Y from '@/utils/y.js'

Vue.prototype.$Y = Y

import { Lazyload, Icon, Cell, CellGroup, Loading, Button, Toast,Field,Image } from 'vant';
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Image)

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
