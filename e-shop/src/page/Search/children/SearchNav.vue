<template>
	<div class="search-nav">
	 <a href="" class="search-nav-icon" @click.prevent="searchPanelClick(true)">
	 	<img src="../images/search.png" width="25"/>
	 	<span>毕业设计</span>
	 </a>
	</div>
</template>

<script>
	export default {
		name: 'SearchNav',
		props: {
			searchPanelClick: {
				type: Function
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

   @import "../../../common/stylus/mixins.styl" 
 
   .search-nav {
	  width: 100%;
	  height: 60px;
	  background: #fff;
	  border-bottom-1px(#ccc);
	  position: fixed;
	  top: 0;
	  left: 0;
	  z-index: 998;
	  display: flex;
	  justify-content: center; 
	  align-items: center;
   }
   .search-nav-icon {
   	   width: 90%;
   	   height: 70%;
   	   background-color: #e8e8e8;
   	   border-radius: 10px;
   	   display: flex;
   	   justify-content: center; 
	   align-items: center;
   }
   .search-nav-icon span {
   	   color: #aaa;
   	   margin-left: 6px;
       font-size: 18px;
       font-weight: lighter;
   }
</style>