<template>
	<div class="cell" @click="clickCell(leftTitle)">
	    <div class="cell-left" :style="{color: leftTitleColor}">
	    	<i :class="leftIcon" v-show="leftIcon"></i>
	    	<span v-show="leftTitle">{{leftTitle}}</span>
	    </div>
	    <div :style="{color: rightTitleColor}">
	    	<span v-show="rightTitle">{{rightTitle}}</span>
	    	<i class="itlike-uniE909" v-show="isShowRightArrow"></i>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'MeCommonCell',
		props: {
			leftTitle: { type: String, default: '' },
			leftIcon: { type: String, default: '' },
			rightTitle: { type: String, default: '' },
			leftTitleColor: { type: String, default: '' },
			rightTitleColor: { type: String, default: '' },
			isShowRightArrow: { type: Boolean, default: true},
			clickCell: { type: Function, default: ()=>{} }
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
   .cell {
   	  height: 44px;
   	  background-color: #fff;
   	  display: flex;
   	  justify-content: space-between;
   	  align-items: center;
   	  padding: 0 10px;
   	  border-bottom: 1px solid #ececec;
   }
   
   .cell-right, .cell-left {
   	  display: flex;
   	  align-items: center;
   	  
   }
   .cell-right, .cell-left i {
   	margin: 5px;
   }
   
</style>