import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecShopList,
  getSearchGoods,
  getUserInfo,
  getLogout,
  getCartGoods,
  delShopToCart
} from '../api/index'


import {
	HOME_CASUAL,
	HOME_NAV,
	HOME_SHOP_LIST,
	REC_SHOP_LIST,
	SEARCH_GOODS,
	USER_INFO,
	RESET_USER_INFO,
	CART_GOODS_LIST,
	ADD_GOODS_COUNT,
	REDUCE_GOODS_COUNT,
	SELECTED_ALL_GOODS,
	SELECTED_SINGER_GOODS,
	DEL_SINGER_GOODS
} from './mutation-types'


export default {
	//1.获取首页轮播图
	async reqHomeCasual({commit}) {
		const result = await getHomeCasual();
		commit(HOME_CASUAL, {homecasual : result.message})
//		if(result.success_code===200){
//    commit(HOME_CASUAL,{homecasual:result.message});
//  }
	},
	
	//2.获取首页导航
    async reqHomeNav({commit}){
	    const nav_result = await getHomeNav();
	    commit(HOME_NAV, {homenav : nav_result.message.data})
	},
    
    //3.获取首页商品列表
	  async reqHomeShopList({commit}){
	    const nav_result = await getHomeShopList();
	    commit(HOME_SHOP_LIST, {homeshoplist : nav_result.message.goods_list})
	  },
	  
	  //4.获取推荐商品列表
	  async reqRecShopList({commit}, params){
	    //console.log(params);
	    const nav_result = await getRecShopList(params);
	    commit(REC_SHOP_LIST, {recommendshoplist : nav_result.message})
	    
	    params.callback && params.callback();
	  },
	  
	  //5.获取搜索商品列表
	  async reqSearchGoods({commit}, callback){
	    const nav_result = await getSearchGoods();
	    commit(SEARCH_GOODS, {searchgoods : nav_result.message.data})
	
	    callback && callback();
	  },
	  
	  //6.同步用户信息
	  syncUserInfo({commit}, userInfo){
	    commit(USER_INFO, {userInfo})
	  },
	  
	  //7. 异步获取用户信息
	  async getUserInfo({commit}){
	    const result = await getUserInfo();
	    //console.log(result)
	    if (result.success_code === 200) {
	    	commit(USER_INFO, {userInfo: result.message});
	    }
	  },
	  
	  //8.退出登录
	  async logOut({commit}){
	    const result = await getLogout();
	    console.log(result)
	    if (result.success_code === 200) {
	    	commit(RESET_USER_INFO);
	    }
	  },
	  
	  //9.请求购物车数据
	  async reqCartGoods({commit}) {
		const result = await getCartGoods();
		//console.log(result)
		 if (result.success_code === 200) {
	    	commit(CART_GOODS_LIST, {cartGoods : result.message})
	    }
   },
   
    //10.单个商品的增加和减少
	  updateGoodsCount({commit}, {goods, isAdd}) {
			 if (isAdd) { //增加
		    	commit(ADD_GOODS_COUNT, {goods})
		  } else { //减少
		   	  commit(REDUCE_GOODS_COUNT, {goods})
		  }
    },
	  
	  //11. 是否选中所有商品
	  selectedAll({commit}, {isSelected}) {
			 commit(SELECTED_ALL_GOODS, {isSelected})
   },
   
   //12. 单个商品的选中与取消
	  singerGoodsSelected({commit}, {goods}) {
			 commit(SELECTED_SINGER_GOODS, {goods})
   },
   
   //13. 单个商品的删除
	  delGoodsSinger({commit}, {goods}) {			
	    	commit(DEL_SINGER_GOODS, {goods})
   },
	  
}
