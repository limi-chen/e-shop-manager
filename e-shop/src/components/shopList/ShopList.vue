<template>
	   <a class="recommend-item">
		       <img :src="item.thumb_url" width="100%"/>
		       <h4 class="item-title">{{item.short_name}}</h4>
		       <div class="item-buttom">
		       	<span class="item-price">￥{{item.price/100}}</span>
		       	<span class="item-count">{{item.sales_tip}}</span>
		       	<button class="item-btn" @click="clickCellBtn(item)">加入购物车</button>
		       </div>
		</a>
</template>

<script>
	export default {
		name: 'ShopList',
		props: {
			item: {
				type: Object
			},
			clickCellBtn: {
				type: Function,
				default: ()=>{}
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.recommend-item:nth-child(2n-1){
    margin-right: 1%; 	
  }
  .recommend-item {
  	width: 49.5%;
  	background: #fff;
  	padding-bottom: 15px;
  	margin-bottom: 15px;
  }
  .item-title {
  	line-height: 20px;
  	font-size: 13px;
  	font-weight: lighter;
  	height: 20px;
  	overflow: hidden;
  	margin: 5px 0;
  	padding: 0 5px;
  }
  .item-buttom {
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	padding: 0 6px;
  }
  .item-price {
  	flex: 1;
  	color: red;
  	font-weight: bolder;
  	font-size: 12px;
  	margin-right: 3px;
  }
  .item-count {
  	flex: 3;
  	font-size: 5px;
  	color: #666666;
  }
  .item-btn {
  	flex: 4;
  	border: 1px solid orangered;
  	height: 26px;
  	border-radius: 5px;
  	font-size: 10px;
  	background: transparent;
  	color: red;
  }
</style>