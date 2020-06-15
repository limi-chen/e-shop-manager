<template>
    <div id="hot">
    	<!--1.轮播图-->
        <div class="swiper-container">
		   <div class="swiper-wrapper">
			    <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
			    	<img :src="casual.imgurl" width=100%/>
			    </div>
		   </div>
		   <!-- 如果需要分页器-->
		   <div class="swiper-pagination"></div>
		</div>
        
        <!--2.中间导航-->
        <hot-nav/>
        
        <!--3.广告位-->
        <div class="hot-ad">
        	<img src="../../imgs/hot_ad/home_ad.gif"/>
        </div>
        
        <!--商品列表-->
        <hot-shop-list/>
    </div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/css/swiper.min.css'
	
	import HotNav from './HotNav'
	import HotShopList from './HotShopList'
	import {mapState} from 'vuex'
	
    export default {
        name: "Hot",
        components: {
        	HotNav,
        	HotShopList
        },
        computed: {
	      //获取轮播数据
	      ...mapState(['homecasual'])
	    },
        mounted(){
        	//1.请求轮播图数据
        	this.$store.dispatch('reqHomeCasual')
        	
        	//2.获取首页导航导航数据
		    this.$store.dispatch('reqHomeNav');
        	
		    //3.获取导航
		    this.$store.dispatch('reqHomeShopList');
        	
        	//创建swiper的实例
        	/*
        	var mySwiper = new Swiper ('.swiper-container', {
        		autoplay: true,
			    loop: true, // 循环模式选项
			    
			    // 如果需要分页器
			    pagination: {
			      el: '.swiper-pagination',
			    }
            })      
            */
        },
        watch: {
	      homecasual() {
	        this.$nextTick(() => {
	          // 2. 初始化轮播图
	          new Swiper('.swiper-container', {
	            autoplay: true,
	            loop: true,
	            pagination: {
	              el: '.swiper-pagination'
	            }
	          })
	        })
	      }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    #hot {
      width: 100%;
      height: 100%;
      padding-top: 43px;
    }
    
    .hot-ad {
    	background-color: #fff;
    	margin: 8px 0;
        padding: 5px;
    }
    .hot-ad img {
    	width: 100%;
    }
</style>
