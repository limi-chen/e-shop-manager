<template>
	<div class="recommend-container">
		<ul class="recommend" v-if="userInfo.id">
		    
		    <shop-list tag="li" v-for="(item, index) in recommendshoplist" 
		    	:key="index" :item="item" :clickCellBtn="dealWithCellBtnClick" />
		    
		</ul>
		<select-login v-else />
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import ShopList from '../../components/shopList/ShopList'
	import BScroll from 'better-scroll'
	import {addShopToCart} from './../../api/index'
	import SelectLogin from './../Login/SelectLogin'
	import { Indicator, Toast } from 'mint-ui'
	
	
	export default {
		name: "Recommend",
		data () {
			return {
				page: 1,
				count: 20
			}
		},
		components: {
			ShopList,
			SelectLogin
		},
		mounted() {
			Indicator.open('正在加载数据...')
			
			this.$store.dispatch('reqRecShopList', {page: this.page, count: this.count,callback: () => {
				Indicator.close();
			}})
		},
		computed: {
			...mapState(['recommendshoplist','userInfo'])
		},
		watch: {
			recommendshoplist(){
				this.$nextTick(() => {
					//让当前页码+1
					this.page += 1;
					
					//1.1初始化
					this._initBScroll();
				})
			}
		},
		methods: {
			//1.1初始化
			_initBScroll(){
				//1.初始化
				this.listScroll = new BScroll('.recommend-container', {
					scrollY: true,
					click: true,
					probeType: 3
				})
				
				//2.监听滚动的区域
				this.listScroll.on('touchEnd',(position) => {
					
					//监听下拉
					if (position.y >= 50) {
						//console.log('下拉加载更多')
					}
					
					//监听上拉
					if(this.listScroll.maxScrollY > position.y + 50) {
						//console.log('上拉加载更多')
						console.log(this.page)
						Indicator.open('正在加载数据...')
						this.$store.dispatch('reqRecShopList', {page: this.page, count: this.count, callback: () => {
							Indicator.close();
						}})
					}
				})
				
									
				//3.列表滚动结束
				this.listScroll.on('scrollEnd',(position) => {
					this.listScroll.refresh();
				})
					
			},
			
			async dealWithCellBtnClick (goods) {
				//console.log(goods);
				//user_id, goods_id, goods_name, thumb_url, price
				let res = await addShopToCart(this.userInfo.id, goods.goods_id, goods.goods_name, goods.thumb_url, goods.price);
				//console.log(res);
				Toast(res.message)
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container {
  	background: #f5f5f5;
  	width: 100%;
  	height: 100%;
  	overflow: hidden;
  }
  .recommend {
  	display: flex;
  	flex-direction: row;
  	flex-wrap: wrap;
  	background: #f5f5f5;
  	padding-bottom: 40px;
  }
</style>