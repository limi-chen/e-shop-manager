<template>
	<div>
		<!--面包屑导航区域-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!--卡片视图区域-->
		<el-card>
			<!--添加角色按钮区域-->
			<el-row>
				<el-col>
					<el-button type="primary" @click="showAddCate">添加商品</el-button>
				</el-col>
			</el-row>
			
			<!--表格-->
			<tree-table class="treeTableClass" :data="cateList" :columns="columns" :selection-type="false" 
				:expand-type="false" show-index index-text="#" border :show-row-hover="false">
				<!--是否有效-->
				<template v-slot:isOk="scope">
					<i class="el-icon-success" v-if="scope.row.cat_deleted === false"
						style="color: lightgreen;"></i>
					<i class="el-icon-error" v-else style="color: red;"></i>
				</template>
				
				<!--排序-->
				<template v-slot:order="scope">
					<el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
					<el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
					<el-tag size="mini" type="warning" v-else>三级</el-tag>
				</template>
				
				<!--操作-->
				<template v-slot:opt="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
				</template>
				
			</tree-table>
			
			<!--分页-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
		  	 :current-page="queryInfo.pagenum" :page-sizes="[1, 5, 10, 20]" :page-size="queryInfo.pagesize" 
		  	 layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
			
		</el-card>
		
		<!--添加分类的对话框-->
		<el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%"
			 @close="addCateDialogClosed">
		  <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
			  <el-form-item label="分类名称：" prop="cat_name">
			     <el-input v-model="addCateForm.cat_name"></el-input>
			  </el-form-item>
			  <el-form-item label="父级分类：" prop="cat_name">
			  	<!--options: 用来指定数据源-->
			     <el-cascader v-model="selectedKeys" :options="parentCateLise" 
			     	:props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name',children: 'children', checkStrictly: true}"
			     	 @change="parentCateChange" clearable></el-cascader>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addCateDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addCate">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		name: 'Cate',
		data() {
			return {
				//查询条件
				queryInfo: {
					type: 3,
					pagenum: 1,
					pagesize: 5
				},
				cateList: [],  //商品分类的数据列表，默认为空
				total: 0,  //总数据条数
				columns: [
					{
						label: '分类名称',
						prop: 'cat_name'
					},
					{
						label: '是否有效',
						type: 'template',  //表示将当前列定义为模板列
						template: 'isOk'   //表示当前列使用的模板名称
					},
					{
						label: '排序',
						type: 'template',  //表示将当前列定义为模板列
						template: 'order'   //表示当前列使用的模板名称
					},
					{
						label: '操作',
						type: 'template',  //表示将当前列定义为模板列
						template: 'opt'   //表示当前列使用的模板名称
					}
				],
				addCateDialogVisible: false,    //控制添加分类对话框的显示与隐藏
				addCateForm: {      //添加分类的表单数据对象
					cat_name: '',   //将要添加分类的名称
					cat_pid: 0,      //父级分类的id
					cat_level: 0
				},
				addCateFormRules: {  //添加分类表单的验证规则对象
					cat_name: [
					   { required: true, message: '请输入分类名称', trigger: 'blur' },
					]
				},
				parentCateLise: [],  //父级分类列表
				selectedKeys: [],  //选中父级分类的ID数组
				
			}
		},
		created() {
			this.getCateList();
		},
		methods: {
			//获取商品分类
			async getCateList() {
				const { data: res } = await this.$http.get('categories', {
					params: this.queryInfo
				})
				
				if (res.meta.status !== 200) {
				   return this.$message.error("获取商品分类失败!")
				}
				
				console.log(res.data)
				
				//把数据列表赋值给 cateList
				this.cateList = res.data.result;
				//为总数据条数赋值
				this.total = res.data.total;
			},
			//监听pageSize改变的事件
			handleSizeChange (newSize) {
				this.queryInfo.pagesize = newSize;
				this.getCateList();
			},
			//监听页码值改变的事件
			handleCurrentChange (newPage) {
				//console.log(newPage)
				this.queryInfo.pagenum = newPage;
				this.getCateList();
			},
			showAddCate() {
				this.getParentCateList();
				
				this.addCateDialogVisible = true;
			},
			//获取父级分类的数据列表
			async getParentCateList() {
				
				const { data: res } = await this.$http.get('categories', {
					params: { type: 2 }
				})
				
				if (res.meta.status !== 200) {
					return this.$message.error("获取父级分类数据失败!")
				}
				
				console.log(res.data)
				
				this.parentCateLise = res.data;
			},
			parentCateChange () {
				console.log(this.selectedKeys)
				//如果selectedKeys数组中的length大于0， 证明选中的父级分类
				//反之，就说明没有选中任何父级分类
				if (this.selectedKeys.length > 0) {
					//父级分类id 
					this.addCateForm.cat_pid = this.selectedKeys[
					    this.selectedKeys.length - 1
					]
					//为当前分类的等级赋值
					this.addCateForm.cat_level = this.selectedKeys.length
					return
				}else{
					//父级分类的id
					this.addCateForm.cat_pid = 0
					//为当前分类的等级赋值
					this.addCateForm.cat_level = 0
				}
			},
			//点击按钮，添加新的分类
			addCate () {
				this.$refs.addCateFormRef.validate(async valid => {
					if (!valid) return;
					const { data: res } = await this.$http.post('categories', this.addCateForm)
					
					if (res.meta.status !== 201) {
					    return this.$message.error("添加分类失败!")
				    }
					
					this.$message.success("添加分类成功!")
					
					this.getCateList();
					
					this.addCateDialogVisible = false;
				})
			},
			//监听对话框关闭事件，重置表单数据
			addCateDialogClosed () {
				this.$refs.addCateFormRef.resetFields()
				this.selectedKeys = []
				this.addCateForm.cat_pid = 0
				this.addCateForm.cat_level = 0
			}
			
		}
	}
</script>

<style scoped lang="less">
	.treeTableClass {
		margin-top: 15px;
	}
	
	.el-cascader {
		width: 100%;
	}
</style>