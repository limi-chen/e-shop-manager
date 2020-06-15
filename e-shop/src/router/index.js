//1.引入对应的模块
import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

//路由懒加载

const Home = () => import ('./../page/Home/Home')
const Chat = () => import ('./../page/Chat/Chat')
const Me = () => import ('./../page/Me/Me')
const Recommend = () => import ('./../page/Recommend/Recommend')
const Search = () => import ('./../page/Search/Search')
const Login = () => import ('./../page/Login/Login')

import Hot from './../page/Home/Children/Hot/Hot'
import Box from './../page/Home/Children/Box'
import Dress from './../page/Home/Children/Dress'
import Ele from './../page/Home/Children/Ele'
import Food from './../page/Home/Children/Food'
import General from './../page/Home/Children/General'
import Man from './../page/Home/Children/Man'
import Mbaby from './../page/Home/Children/Mbaby'
import Shirt from './../page/Home/Children/Shirt'

import MeSetting from './../page/Me/MeSetting'
import MeDetail from './../page/Me/MeDetail'

//2.声明使用
Vue.use(VueRouter)

//创建一级路由对象 
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    
    {
        path: '/home',
        component: Home,
        children: [
          {path: 'hot',component: Hot, meta: {showBottomTabBar: true}},
          {path: 'box', component: Box},
	        {path: 'dress', component: Dress},
	        {path: 'ele', component: Ele},
	        {path: 'food', component: Food},
	        {path: 'general', component: General},
	        {path: 'mbaby', component: Mbaby},
	        {path: 'man', component: Man},
	        {path: 'shirt', component: Shirt},
	        {path: '/home', redirect: '/home/hot'}
        ]
    },
    
    {
        path: '/chat',
        component: Chat,
        meta: {showBottomTabBar: true}
    },
    
    {
        path: '/me',
        component: Me,
        meta: {showBottomTabBar: true}
    },
    
    {
        path: '/recommend',
        component: Recommend,
        meta: {showBottomTabBar: true}
    },
    
    {
        path: '/search',
        component: Search,
        meta: {showBottomTabBar: true}
    },
    
    {
        path: '/login',
        component: Login
    },
    
    {
        path: '/Set',
        component: MeSetting
    },
    {
        path: '/detail',
        component: MeDetail
    }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

//3.输出路由对象
export default router
