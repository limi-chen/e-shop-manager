<template>
	<div class="search-panel">
	   <div class="search-nav">
	   	 <div class="search-input">
	   	 	<img src="../images/search.png" width="25"/>
	   	 	<input type="search" placeholder="毕业设计" ref="mySearch" >
	   	 </div>
	   	 <button @click="searchPanelClick(false)">取消</button>
	   </div>
	  
	   <div class="search-content">
	   	 <div class="title">
	   	 	<img src="../images/hot.png" width="25"/>
	   	 	<span>热门搜索</span>
	   	 </div>
	   	 <ul class="search-list">
	   	  <li>油脂批发</li>
          <li>浴巾可穿</li>
          <li>石榴水果</li>
          <li>富豪卷纸</li>
          <li>冰箱收纳盒</li>
          <li>毛巾衣服</li>
          <li>小白鞋增高透气</li>
          <li>连衣裙夏</li>
	   	 </ul>
	   </div>
	</div>
</template>

<script>
	export default {
		name: 'SearchPanel',
		props: {
			searchPanelClick: {
				type: Function
			}
		},
		mounted () {
			this.$refs.mySearch.focus();
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
   
   @import '../../../common/stylus/mixins.styl'

  .search-panel {
  	width: 100%;
  	height: 100%;
  	background: #fff;
  	position: fixed;
  	left: 0;
  	top: 0;
  	z-index: 1000;
  }
  .search-nav {
  	width: 100%;
  	height: 60px;
  	border-bottom-1px(#ddd);
  	padding: 0 20px;
  	display: flex;
  	flex-direction: row;
  	justify-content: space-between;
  	align-items: center;
  }
  .search-input {
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	background-color: #ededed;
  	width: 85%;
  	height: 38px;
  	border-radius: 10px;
  	padding: 0 10px;
  }
  .search-input input {
  	width: 90%;
  	height: 90%;
  	padding-left: 10px;
  	font-size: 15px;
  	background-color: transparent;
  	outline: none;
  }
  .search-nav button {
  	font-size: 16px;
  	background-color: transparent;
  	color: #aaa;
  }
  .search-content {
  	padding: 30px 15px;
  }
  .title {
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	margin-bottom: 10px;
  	color: #aaa;
  }
  .search-list {
  	display: flex;
  	flex-direction: row;
  	flex-wrap: wrap;
  }
  .search-list li {
  	background: #f5f5f5;
  	color: #aaa;
  	margin: 5px 10px;
  	padding: 5px;
  	border-radius: 5px;
  	font-weight: lighter;
  	font-size: 12px;
  }
</style>