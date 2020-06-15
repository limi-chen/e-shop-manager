<template>
	<div id="bottom-tab">
	    <span class="tab-item" @click="switchTo('/home')">
	        <img :src="this.$route.path.includes('/home') ? tabItemImgAll[0].selected : tabItemImgAll[0].normal "/>
	        <span :class="{on: this.$route.path.includes('/home') }">主页</span>
	    </span>
	    <span class="tab-item" @click="switchTo('/recommend')">
	        <img :src="this.$route.path.includes('/recommend') ? tabItemImgAll[1].selected : tabItemImgAll[1].normal "/>
	        <span :class="{on: this.$route.path.includes('/recommend') }">推荐</span>
	    </span>
	    <span class="tab-item" @click="switchTo('/search')">
	        <img :src="this.$route.path.includes('/search') ? tabItemImgAll[2].selected : tabItemImgAll[2].normal "/>
	        <span :class="{on: this.$route.path.includes('/search') }">搜索</span>
	    </span>
	    <span class="tab-item" @click="switchTo('/chat')">
	        <img :src="this.$route.path.includes('/chat') ? tabItemImgAll[3].selected : tabItemImgAll[3].normal "/>
	        <span :class="{on: this.$route.path.includes('/chat') }">购物车</span>
	    </span>
	    <span class="tab-item" @click="switchTo('/me')">
	        <img :src="this.$route.path.includes('/me') ? tabItemImgAll[4].selected : tabItemImgAll[4].normal "/>
	        <span :class="{on: this.$route.path.includes('/me') }">我的</span>
	    </span>
	</div>
</template>

<script>
	export default {
		name: 'TabBar',
		data(){
			return {
				tabItemImgAll: [
				    {normal: require('../../../static/img/icon_home.png'), selected: require('../../../static/img/icon_home_selected.png')},
				    {normal: require('../../../static/img/icon_intro.png'), selected: require('../../../static/img/icon_intro_selected.png')},
				    {normal: require('../../../static/img/icon_search.png'), selected: require('../../../static/img/icon_search_selected.png')},
				    {normal: require('../../../static/img/icon_chat.png'), selected: require('../../../static/img/icon_chat_selected.png')},
				    {normal: require('../../../static/img/icon_mine.png'), selected: require('../../../static/img/icon_mine_selected.png')}
				]
			}
		},
		methods: {
			switchTo(path){
				//console.log(this.$router)
				this.$router.replace(path)
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    #bottom-tab {
    	width: 100%;
    	height: 50px;
    	background-color: #fff;
    	position: fixed;
    	left: 0;
    	bottom: 0;
    	display: flex;
    	z-index: 999;
    }
    .tab-item {
    	display: flex;
    	flex: 1;
    	flex-direction: column;
    	align-items: center;
    	justify-content: center;
    	font-size: 14px;
    	color: #666;
    }
    .tab-item img {
    	width: 35%;
    	margin-bottom: 2px;
    }
    .on {
    	color: #E12A1F;
    }
</style>