import Vue from 'vue'
import App from './App'
import store from './store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

//引入路由器
import router from './router'
import LyTab from 'ly-tab'

// 引入字体图标
import './common/css/style.css'

import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);


Vue.config.productionTip = false

Vue.use(LyTab)
Vue.use(Mint);

//配置图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/image/loading.gif';

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
    loading
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
