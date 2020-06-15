<template>
	<div>
		<!--面包屑导航区域-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!--卡片视图区域-->
		<el-card>
			
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
					   <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="goodsAdd">添加商品</el-button>
				</el-col>
			</el-row>
			
			<!-- table 表格区域 -->
			<el-table :data="goodsList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="商品名称" prop="goods_name"></el-table-column>
				<el-table-column label="商品价格(元)" prop="goods_price" width="95"></el-table-column>
				<el-table-column label="商品重量" prop="goods_weight" width="70"></el-table-column>
				<el-table-column label="创建时间" prop="add_time" width="140">
					<template v-slot="scope">
						{{scope.row.add_time | dateFormmat}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template v-slot="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini"
							 @click="removeById(scope.row.goods_id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<!--分页区域-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			  	:current-page="queryInfo.pagenum" :page-sizes="[1, 5, 10, 20]" :page-size="queryInfo.pagesize" 
			  	layout="total, sizes, prev, pager, next, jumper" :total="total">
	        </el-pagination>
			
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'GoodsList',
		data() {
			return {
				//查询对象
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 10
				},
				total: 0,  //商品总数
				goodsList: [],   //商品列表数据
			}
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			async getGoodsList() {
				const { data: res } = await this.$http.get('goods', {
					params: this.queryInfo
				})
				if (res.meta.status !== 200) {
					userinfo.mg_state != userinfo.mg_state
					return this.$message.error('获取商品列表失败!')
				}
				this.$message.success('获取商品列表成功!')
				
				console.log(res.data)
				this.goodsList = res.data.goods;
				this.total = res.data.total;
			},
			//监听pageSize改变的事件
			handleSizeChange (newSize) {
				//console.log(newSize)
				this.queryInfo.pagesize = newSize;
				this.getGoodsList();
			},
			//监听页码值改变的事件
			handleCurrentChange (newPage) {
				//console.log(newPage)
				this.queryInfo.pagenum = newPage;
				this.getGoodsList();
			},
			async removeById(id) {
				const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			    }).catch(err => err)
			    
			    if (confirmResult !== 'confirm') {
			    	return this.$message.error('已经取消删除!')
			    }
			    
			    const { data: res } = await this.$http.delete(`goods/${id}`)
			    
			    if (res.meta.status !== 200) {
			    	return this.$message.error('删除失败!')
			    }
			    
			    this.$message.success('删除成功!')
			    this.getGoodsList();
			},
			goodsAdd() {
				this.$router.push('/goods/add')
			}
		}
	}
</script>

<style scoped lang="less">
</style>