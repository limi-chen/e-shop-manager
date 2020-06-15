import ajax from './ajax'

//基础路径
const BASE_URL = '/api';

//请求方法

//1.请求首页轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');

//2.请求首页nav列表
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav');

//3.请求首页购物列表
export const getHomeShopList = ()=> ajax(BASE_URL + '/api/homeshoplist');

//4.请求推荐商品列表
export const getRecShopList = (params)=> ajax(BASE_URL + '/api/recommendshoplist', params);

//5.请求搜索商品列表
export const getSearchGoods = ()=> ajax(BASE_URL + '/api/searchgoods');

//6.请求短信验证码
export const getPhoneCode = (phone)=> ajax(BASE_URL + '/api/send_code', {phone});

//7.手机验证码登录
export const phoneCodeLogin = (phone,code)=> ajax(BASE_URL + '/api/login_code', {phone,code}, 'POST');

//8.用户名和密码登录
export const pwdLogin = (user_name, pwd, captcha)=> ajax(BASE_URL + '/api/login_pwd', {user_name, pwd, captcha}, 'POST');

//9.获取登录的用户信息
export const getUserInfo = ()=> ajax(BASE_URL + '/api/user_info');

//10.退出登录
export const getLogout = ()=> ajax(BASE_URL + '/api/logout');

//11.修改客户信息
export const changeUserInfo = (user_id, user_name, user_sex, user_birthday, user_address, user_sign)=> ajax(BASE_URL + '/api/change_user_message', {user_id, user_name, user_sex, user_birthday, user_address, user_sign}, 'POST');

//12.添加到购物车
export const addShopToCart = (user_id, goods_id, goods_name, thumb_url, price)=> ajax(BASE_URL + '/api/add_shop_cart', {user_id, goods_id, goods_name, thumb_url, price}, 'POST');

//13.请求购物车数据
export const getCartGoods = () => ajax(BASE_URL + '/api/cart_goods');

//12.添加到购物车
export const delShopToCart = (user_id, goods_id)=> ajax(BASE_URL + '/api/del_shop_cart', {user_id, goods_id}, 'POST');