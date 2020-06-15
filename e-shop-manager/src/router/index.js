import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from 'views/login/Login'

import Home from 'views/user/home/Home'
import Welcome from 'views/user/welcome/Welcome'
import User from 'views/user/User'

import Rights from 'views/power/right/Rights'
import Roles from 'views/power/roles/Roles'

import Cate from 'views/goods/cate/Cate'
import Params from 'views/goods/params/Params'
import GoodsList from 'views/goods/goodsList/GoodsList'
import Add from 'views/goods/goodsList/add/Add'

import Orders from 'views/order/Orders'

import Reports from 'views/reports/Reports'


Vue.use(VueRouter)

const routes = [
    {
       path: '',
       redirect: '/login'
    },
    
    {
       path: '/login',
       component: Login
    },
    
    {
       path: '/home',
       component: Home,
       redirect: '/welcome',
       children: [
	       { path: '/welcome', component: Welcome },
	       { path: '/users', component: User },
	       { path: '/rights', component: Rights },
	       { path: '/roles', component: Roles },
	       { path: '/categories', component: Cate },
	       { path: '/params', component: Params },
	       { path: '/goods', component: GoodsList },
	       { path: '/goods/add', component: Add },
	       { path: '/orders', component: Orders },
	       { path: '/reports', component: Reports },
       ]
    }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
	//如果用户访问的是登录页，直接放行
	if (to.path === '/login') return next();
	//从 sessionStorage 中获取到保存的 token 值
	const tokenStr = window.sessionStorage.getItem('token');
	//没有token,强制跳转到登录页
	if (!tokenStr) return next('/login')
	next();
})

export default router
