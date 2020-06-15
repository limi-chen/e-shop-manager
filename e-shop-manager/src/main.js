import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

//导入全局样式
import 'assets/css/global.css'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
//将富文本编辑器，注册为全局可用组件
Vue.use(VueQuillEditor)

//导入 NProgress 包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//在 request 拦截器中，展示进度条 NProgress.start();

//axios 请求拦截
axios.interceptors.request.use(config => {
	//console.log(config)
	NProgress.start();
	
	//为请求头对象，添加 Token 验证 Authorization 字段
	config.headers.Authorization = window.sessionStorage.getItem('token')
	//在最后 return config
	return config;
})

//在 reponse 拦截器中，隐藏进度条  NProgress.done();
axios.interceptors.response.use(config => {
	NProgress.done();
	return config;
})

Vue.prototype.$http = axios

Vue.filter('dateFormmat', function(originVal){
	const dt = new Date(originVal)
	
	const y = dt.getFullYear()
	const m = (dt.getMonth() + 1 + '').padStart(2, '0')
	const d = (dt.getDate() + 1 + '').padStart(2, '0')
	
	
	const hh = (dt.getHours() + '').padStart(2, '0')
	const mm = (dt.getMinutes() + '').padStart(2, '0')
	const ss = (dt.getSeconds() + '').padStart(2, '0')
	
	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
