<template>
  <div id="app">
    <keep-alive><router-view/></keep-alive>
    <tab-bar v-show="this.$route.meta.showBottomTabBar"/>
  </div>
</template>

<script>
import TabBar from './components/TabBar/TabBar'
	
export default {
  name: 'App',
  components: {
  	TabBar
  },
  created() {
  	this.$store.dispatch('getUserInfo')
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
   #app
    width 100%
    height 100%
    background-color #f5f5f5 
</style>
