<template>
	<div>
		<!--面包屑导航区域-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>参数列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!--卡片视图区域-->
		<el-card>
			<!--警告区域-->
			<el-alert title="注意：只允许为第三级分类设置相关参数!" type="warning" show-icon
				 :closable="false"></el-alert>
				 
		    <!--选择商品分类区域-->
		    <el-row class="cat_opt">
		    	<el-col>
		    		<span>选择商品分类：</span>
		    		<!-- 选择商品分类级联选择框 -->
		    		<!--options: 用来指定数据源-->
				    <el-cascader v-model="selectedCateKeys" :options="catelist"
				    	 :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name',children: 'children'}"
				    	  @change="handleChange"></el-cascader>
		    	</el-col>
		    </el-row>
		    
		    <!-- tab 页签区域 -->
		    <el-tabs v-model="activeName" @tab-click="handleTabClick">
		    	<!-- 添加动态参数的面板 -->
			    <el-tab-pane label="动态参数" name="many">
			    	<!-- 添加参数的按钮 -->
			    	<el-button type="primary" size="mini" :disabled="isBtnDisabled"
			    		 @click="addDialogVisible = true">添加参数</el-button>
			    	
			    	<!-- 动态参数表格 -->
			    	<el-table :data="manyTableData" border stripe>
			    		<!-- 展开列 -->
			    		<el-table-column type="expand">
			    			<template v-slot="scope">
			    				<!-- 循环渲染 tag 标签 -->
			    				<el-tag v-for="(item, index) in scope.row.attr_vals"
			    					 :key="index" closable @close="handleClose(index, scope.row)">
			    					{{item}}
			    				</el-tag>
			    				
			    				<!-- 输入的文本框 -->
			    				<el-input
								  class="input-new-tag"
								  v-if="scope.row.inputVisible"
								  v-model="scope.row.inputValue"
								  ref="saveTagInput"
								  size="small"
								  @keyup.enter.native="handleInputConfirm(scope.row)"
								  @blur="handleInputConfirm(scope.row)"
								>
								</el-input>
								<!-- 添加按钮 -->
								<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
			    			</template>
			    		</el-table-column>
			    		
			    		<!-- 索引列 -->
			    		<el-table-column type="index" label="#"></el-table-column>
			    		<el-table-column label="参数名称" prop="attr_name"></el-table-column>
			    		<el-table-column label="操作">
			    			<template v-slot="scope">
			    				<el-button size="mini" type="primary" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
			    				<el-button size="mini" type="danger" @click="removeParamas(scope.row.attr_id)">删除</el-button>
			    			</template>
			    		</el-table-column>
			    	</el-table>
			    </el-tab-pane>
			    <!-- 添加静态属性的面板 -->
			    <el-tab-pane label="静态属性" name="only">
			    	<el-button type="primary" size="mini" :disabled="isBtnDisabled"
			    		@click="addDialogVisible = true">添加属性</el-button>
			    	
			    	<!-- 静态属性表格 -->
			    	<el-table :data="onlyTableData" border stripe>
			    		<!-- 展开列 -->
			    		<el-table-column type="expand">
			    			<template v-slot="scope">
			    				<!-- 循环渲染 tag 标签 -->
			    				<el-tag v-for="(item, index) in scope.row.attr_vals"
			    					 :key="index" closable @close="handleClose(index, scope.row)">
			    					{{item}}
			    				</el-tag>
			    				
			    				<!-- 输入的文本框 -->
			    				<el-input
								  class="input-new-tag"
								  v-if="scope.row.inputVisible"
								  v-model="scope.row.inputValue"
								  ref="saveTagInput"
								  size="small"
								  @keyup.enter.native="handleInputConfirm(scope.row)"
								  @blur="handleInputConfirm(scope.row)"
								>
								</el-input>
								<!-- 添加按钮 -->
								<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
			    			</template>
			    		</el-table-column>
			    		
			    		<!-- 索引列 -->
			    		<el-table-column type="index" label="#"></el-table-column>
			    		<el-table-column label="属性名称" prop="attr_name"></el-table-column>
			    		<el-table-column label="操作">
			    			<template v-slot="scope">
			    				<el-button size="mini" type="primary" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
			    				<el-button size="mini" type="danger" @click="removeParamas(scope.row.attr_id)">删除</el-button>
			    			</template>
			    		</el-table-column>
			    	</el-table>
			    </el-tab-pane>
			</el-tabs>
  
		</el-card>
		
		<!-- 添加参数的对话框 -->
		<el-dialog :title="'添加' + titleText" :visible.sync="addDialogVisible" width="50%"
			 @close="addDialogClosed">
		  <el-form ref="addFormRef"  :rules="addFormRules" :model="addForm" label-width="100px">
			  <el-form-item :label="titleText" prop="attr_name">
			    <el-input v-model="addForm.attr_name"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addParams">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 修改参数的对话框 -->
		<el-dialog :title="'修改' + titleText" :visible.sync="editDialogVisible" width="50%"
			 @close="editDialogClosed">
		  <el-form ref="editFormRef"  :rules="editFormRules" :model="editForm" label-width="100px">
			  <el-form-item :label="titleText" prop="attr_name">
			    <el-input v-model="editForm.attr_name"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editParams">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		name: 'Params',
		data() {
			return {
				catelist: [],    //商品分类列表
				selectedCateKeys: [],  //选中父级分类的ID数组
				activeName: 'many',   //被激活的页签名称
				manyTableData: [],  //动态参数数据
				onlyTableData: [],  //静态属性数据
				addDialogVisible: false,  //控制添加对话框的显示与隐藏
				addForm: {  //添加参数的表单数据对象
					attr_name: ''
				},
				addFormRules: {  //添加表当的验证规则对象
					attr_name: [{ required: true, message: '请输入参数', trigger: 'blur' }]
				},
				editDialogVisible: false,   //控制修改对话框的显示与隐藏
				editForm: {  //修改参数的表单数据对象
				},
				editFormRules: {  //修改表当的验证规则对象
					attr_name: [{ required: true, message: '请输入参数', trigger: 'blur' }]
				},
				
			}
		},
		created() {
			this.getCateList()
		},
		methods: {
			//获取所有商品分类列表
			async getCateList() {
				const { data: res } = await this.$http.get('categories')
				
				if (res.meta.status !== 200) {
				   return this.$message.error("获取商品分类失败!")
				}
				
				this.catelist = res.data;
				console.log(this.catelist)
			},
			//级联选择框选中项变化，会触发这个函数
			handleChange () {
				this.getParamsData();
			},
			//tab 页签点击事件的处理函数
			handleTabClick () {
				console.log(this.activeName)
				this.getParamsData();
			},
			async getParamsData () {
				if (this.selectedCateKeys.length !== 3) {
					this.selectedCateKeys = [];
					this.manyTableData = [];
					this.onlyTableData = [];
					return
				}
				
				//证明选中的是三级分类
				console.log(this.selectedCateKeys)
				//根据所选分类的 id ，和当前所处的面板，获取对应的参数
				const { data: res } = await this.$http.get(`categories/${this.cateid}/attributes`, {
					params: { sel: this.activeName }
				})
				
				if (res.meta.status !== 200) {
				   return this.$message.error("获取商品参数失败!")
				}
				
				res.data.forEach(item => {
					item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
					//控制按钮与文本框的切换显示
					item.inputVisible = false    
					//文本框中输入的内容
				    item.inputValue = ''   
				})
				
				console.log(res.data)
				
				if (this.activeName === 'many') {
					this.manyTableData = res.data
				}else{
					this.onlyTableData = res.data
				}
			},
			//监听表单关闭按钮
			addDialogClosed() {
				this.addForm.attr_name = ''
			},
			//添加参数按钮
			addParams() {
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					
					const { data: res } = await this.$http.post(`categories/${this.cateid}/attributes`, {
						attr_name: this.addForm.attr_name,
						attr_sel: this.activeName
				    })
					
					if (res.meta.status !== 201) {
				        return this.$message.error("添加商品参数失败!")
				    }
					
					this.$message.success('添加参数成功!')
					this.addDialogVisible = false;
					this.getParamsData()
				})
			},
			//点击按钮显示修改的对话框
			async showEditDialog(attr_id) {
				//查询当前参数的信息
				const { data: res } = await this.$http.get(`categories/${this.cateid}/attributes/${attr_id}`, {
					params: { attr_sel: this.activeName }
				})
				
				if (res.meta.status !== 200) {
				    return this.$message.error("修改商品参数失败!")
				}
				
				this.editForm = res.data
				this.editDialogVisible = true
			},
			//监听表单关闭按钮
			editDialogClosed() {
				this.$refs.editFormRef.resetFields();
			},
			//点击按钮，修改参数数据
			editParams() {
				this.$refs.editFormRef.validate(async valid => {
					if (!valid) return
					
					const { data: res } = await this.$http.put(`categories/${this.cateid}/attributes/${
						this.editForm.attr_id
					}`, {
						attr_name: this.editForm.attr_name,
						attr_sel: this.activeName
				    })
					
					if (res.meta.status !== 200) {
				        return this.$message.error("修改商品参数失败!")
				    }
					
					this.$message.success('修改参数成功!')
					this.editDialogVisible = false;
					this.getParamsData()
				})
			},
			//点击按钮，删除参数数据
			async removeParamas(attr_id) {
				const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).catch(err => err)
		        
		        //用户取消了删除操作
		        if (confirmResult !== 'confirm') {
		        	this.$message.info('已取消!')
		        }
		        
		        //删除业务逻辑
		        const { data: res } = await this.$http.delete(`categories/${this.cateid}/attributes/${attr_id}`)
		        
		        if (res.meta.status !== 200) {
				        return this.$message.error("删除参数失败!")
				}
		        
		        this.$message.success('删除参数成功!')
				this.getParamsData()
			},
			//文本框失去焦点或摁下 Enter 都会触发
			handleInputConfirm (row) {
				if (row.inputValue.trim().length === 0) {
					row.inputValue = '' 
					row.inputVisible = false
					return
				}
				//如果没有 return ，则证明输入的内容，需要做后续处理
				row.attr_vals.push(row.inputValue.trim())
				row.inputValue = '' 
				row.inputVisible = false
				
				//需要发起请求，保存这次操作
				this.saveAttrVals(row);
			},
			//将对attr_vals 的操作保存到数据库
			async saveAttrVals(row) {
				//需要发起请求，保存这次操作
				const { data: res } = await this.$http.put(`categories/${this.cateid}/attributes/${row.attr_id}`, {
					attr_name: row.attr_name,
					attr_sel: row.attr_sel,
					attr_vals: row.attr_vals.join(' ')
				})
				
				
				if (res.meta.status !== 200) {
					        return this.$message.error("修改参数项失败!")
					}
			        
			    this.$message.success('修改参数项成功!')
			},
			//点击按钮展示输入框
			showInput(row) {
				row.inputVisible = true;
				//让文本自动获取焦点
				// $nextTick 方法的作用，当页面上的元素被重新渲染后，才会指定回调函数中的代码
				this.$nextTick(_ => {
		          this.$refs.saveTagInput.$refs.input.focus();
		        });
			},
			//删除对应的参数可选项
			handleClose(index, row) {
				row.attr_vals.splice(index, 1)
				this.saveAttrVals(row);
			}
			
		},
		computed: {
			//如果按钮需要被禁用，则返回true，否则返回false
			isBtnDisabled() {
				if (this.selectedCateKeys.length !== 3) {
					return true
				}
				return false;
			},
			//当前选中的三级分类的id
			cateid() {
				if (this.selectedCateKeys.length === 3) {
					return this.selectedCateKeys[2]
				}
				return null
			},
			titleText() {
				if (this.activeName === 'many') {
					return '动态参数'
				}
				return '静态属性'
			}
		}
	}
</script>

<style scoped lang="less">
.cat_opt {
	margin: 15px 0;
}

.el-tag {
	margin: 10px;
}

.input-new-tag {
	width: 120px;
}
</style>