<template>
	<div class="login-container">
	   <div class="login-box">
	   	  <!--头像区域-->
	   	 <div class="avatar-box">
	   	 	<img src="../../assets/img/黑贞.jpg"/>
	   	 </div>
	   	 <!--登录表单区域-->
	   	 <el-form ref="loginForm" label-width="0px" class="login-form" :model="loginForm" :rules="loginFormRules">
	   	 	<!--用户名-->
			<el-form-item prop="username">
			   <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
			</el-form-item>
			<!--密码-->
			<el-form-item prop="password">
			   <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
			</el-form-item>
			<el-row class="btns">
				<el-button type="primary" :plain="true" @click="login">登录</el-button>
				<el-button type="info" @click="loginReset">重置</el-button>
			</el-row>
		 </el-form>
	   </div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data(){
			return {
				loginForm: {
					username: 'admin',
					password: '123456'
				},
				loginFormRules: {
					username: [
						{ required: true, message: '请输入登录名称', trigger: "blur" },
						{ min: 3,max: 10, message: '长度在 3 到 5 个字符', trigger: "blur" }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: "blur" },
						{ min: 6,max: 15, message: '长度在 6 到 15 个字符', trigger: "blur" }
					]
				}
			}
		},
		methods: {
			loginReset(){
				this.$refs.loginForm.resetFields();
			},
			login(){
				this.$refs.loginForm.validate(async valid => {
					if (!valid) return;
					const { data: res } = await this.$http.post("login", this.loginForm);
					if (res.meta.status !== 200) return this.$message.error('登录失败!');
					this.$message.success('登录成功!');
					//console.log(res)
					//1. 将登录成功之后的 token，保存到客服端的 sessionStorage 中
					//  1.1 项目中除了登录之外的其它API接口，必须在登录之后才能访问
					//  1.2 token 只因在当前网站打开期间生效，所以将token 保存在 sessionStorage 中
					window.sessionStorage.setItem("token", res.data.token);
					this.$router.push("/home");
				})
			}
		}
	}
</script>

<style scoped lang="less">
  .login-container {
  	background-color: #2b4b6b;
  	height: 100%;
  }
  .login-box {
  	width: 450px;
  	height: 300px;
  	background-color: #fff;
  	border-radius: 3px;
  	position: absolute;
  	left: 50%;
  	top: 50%;
  	transform: translate(-50%, -50%);
  }
  .avatar-box {
  	width: 130px;
  	height: 130px;
  	border: 1px solid #eee;
  	border-radius: 50%;
  	padding: 10px;
  	box-shadow: 0 0 10px #EDEDED;
  	position: absolute;
  	left: 50%;
  	transform: translate(-50%, -50%);
  	background-color: #FFFFFF;
  	img {
  		width: 100%;
  		height: 100%;
  		border-radius: 50%;
  		background-color: #EEEEEE;
  	}
  }
  .login-form {
  	position: absolute;
  	bottom: 0;
  	width: 100%;
  	padding: 0 20px;
  	box-sizing: border-box;
  }
  .btns {
  	display: flex;
  	justify-content: flex-end;
  }
</style>