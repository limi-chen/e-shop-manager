<template>
	<el-container class="home-container">
	  <!--头部区域-->
	  <el-header>
	  	<div>
	  		<img src="~assets/img/玛修.jpg"/>
	  		<span>电商后台管理系统</span>
	  	</div>
	  	<el-button type="info" @click="logout">退出</el-button>
	  </el-header>
	  <!-- 页面主题区域-->
	  <el-container>
	  	<!--侧边栏-->
	    <el-aside width="isSollapse ? '64px' : '250px'">
	    	<div class="toggle-button" @click="toggleCollase">|||</div>
	    	<!--侧边栏菜单区域-->
	    	<el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF"
	    		 unique-opened :collapse="isSollapse" :collapse-transition="false" router>
	    		<!--一级菜单-->
		        <el-submenu :index="item.id + ''" v-for="(item, index) in menuList" :key="index">
		        	<!--一级菜单的模板区域-->
			        <template slot="title">
			          <!--图标-->
			          <i :class="iconList[item.id]"></i>
			           <!--文本-->
			          <span>{{item.authName}}</span>
			        </template>
			        <!-- 二级菜单-->
			        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
			        	<template slot="title">
					        <!--图标-->
					        <i class="el-icon-menu"></i>
					        <!--文本-->
					        <span>{{subItem.authName}}</span>
				        </template>
			        </el-menu-item>
	            </el-submenu>
           </el-menu>
	    </el-aside>
	    <!--右侧内容主体-->
	    <el-main>
	    	<!--路由占位符-->
	    	<router-view />
	    </el-main>
	  </el-container>
  </el-container>
</template>

<script>
	export default {
		name: 'Home',
		data(){
			return {
				menuList: [],
				iconList: {
					'125': 'iconfont el-icon-s-custom',
					'103': 'iconfont el-icon-s-management',
					'101': 'iconfont el-icon-s-goods',
					'102': 'iconfont el-icon-s-order',
					'145': 'iconfont el-icon-s-platform'
				},
				isSollapse: false
			}
		},
		created() {
			this.getMenuList();
		},
		methods: {
			logout() {
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			async getMenuList() {
				const {data: res} = await this.$http.get('menus');
				if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
				this.menuList = res.data;
				//console.log(res);
			},
			toggleCollase() {
				this.isSollapse = !this.isSollapse;
			}
		}
	}
</script>

<style scoped lang="less">
   .home-container {
   	  height: 100%;
   }
   
   .el-header {
   	  background-color: #373d41;
   	  display: flex;
   	  justify-content: space-between;
   	  padding-left: 0;
   	  align-items: center;
   	  color: #FFFFFF;
   	  font-size: 20px;
   	  > div {
   	  	display: flex;
   	  	align-items: center;
   	  	img {
	   	  	width: 50px;
	   	  	height: 45px;
	   	  	border-radius: 50%;
   	    }
   	    span {
   	    	margin-left: 15px;
   	    }
   	  }
   }
   
   .el-aside {
   	  background-color: #333744;
   	  .el-menu {
   	  	border-right: none;
   	  }
   }
   
   .el-mian {
   	  background-color: #eaedf1;
   }
   .home-header {
   	  img {
   	  	width: 45px;
   	  	height: 45px;
   	  	border-radius: 50%;
   	  }
   }
   
   .iconfont {
   	  margin-right: 10px;
   }
   
   .toggle-button {
   	  background-color: #4a5064;
   	  font-size: 10px;
   	  line-height: 24px;
   	  color: #fff;
   	  text-align: center;
   	  letter-spacing: 0.2em;
   	  cursor: pointer;
   }
</style>