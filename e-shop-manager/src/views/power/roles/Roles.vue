<template>
	<div>
		<!--面包屑导航区域-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
		  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!--卡片视图-->
		<el-card>
			<!--添加角色按钮区域-->
			<el-row>
				<el-col>
					<el-button type="primary">添加角色</el-button>
				</el-col>
			</el-row>
			
			<!--角色列表区域-->
			<el-table :data="rolesList" border stripe>
				<!--展开列-->
				<el-table-column type="expand">
					<template v-slot="scope">
						<el-row :class="['dbbottom', index1 === 0 ? 'dbtop' : '', 'vcenter']"
							 v-for="(item1, index1) in scope.row.children" :key="index1">
							<!--渲染一级权限-->
							<el-col :span="5">
								<el-tag closable @close="removeRightsById(scope.row, item1.id)">{{item1.authName}}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
						    
							<!--渲染二级和三级权限-->
							<el-col :span="19">
								<!--通过for循环 嵌套渲染二级权限-->
								<el-row :class="[index2 === 0 ? '' : 'dbtop', 'vcenter']"
									 v-for="(item2, index2) in item1.children" :key="index2"
									  >
									<el-col :span="6">
										<el-tag type="success" closable 
											@close="removeRightsById(scope.row, item2.id)">{{item2.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span="18">
										<el-tag type="warning" v-for="(item3, index3) in item2.children"
										 :key="index3" closable @close="removeRightsById(scope.row, item3.id)">
										 {{item3.authName}}
										</el-tag>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						
						<!--<pre>{{scope.row}}</pre>-->
					</template>
				</el-table-column>
				
				<!--索引列-->
			  	<el-table-column type="index" label="#"></el-table-column>
			  	<el-table-column label="角色名称" prop="roleName"></el-table-column>
			  	<el-table-column label="角色描述" prop="roleDesc"></el-table-column>
			  	<el-table-column label="操作" width="300">
			  		<template v-slot="scope">
			  			<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
			  			<el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
			  			<el-button type="warning" icon="el-icon-setting" size="mini" 
			  				@click="showSetRightDialog(scope.row)">分配权限</el-button>
			  		</template>
			  	</el-table-column>
		    </el-table>
		</el-card>
		
		<!--分配权限-->
		<el-dialog title="分配权限" :visible.sync="setDialogVisible" width="50%" @close="setRightDialogClosed">
			<!--树形控件-->
			<el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id"
				default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
			<span slot="footer" class="dialog-footer">
			   <el-button @click="setDialogVisible = false">取 消</el-button>
			   <el-button @click="allToRights">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		name: 'Roles',
		data() {
			return {
				rolesList: [],
				setDialogVisible: false, 
				rightsList: [],  //获取到的权限数据
				treeProps: {  //树形控件的属性绑定对象
					label: 'authName',
					children: 'children'
				},
				defKeys: [],   //默认选中的节点Id值数组
				roleId: '', //当前即将分配权限的角色id
			}
		},
		created() {
			this.getRolesList();
		},
		methods: {
			//获取所有角色的列表
			async getRolesList() {
				const {data: res} = await this.$http.get('roles')
				
				if (res.meta.status !== 200) {
					return this.$message.error('获取角色列表失败!')
				}
				
				this.rolesList = res.data;
				//console.log(this.rolesList)
			},
			async removeRightsById(role, rightId) {
				//弹窗询问用户是否删除数据
				const confirmResult = await this.$confirm('此操作将永久删除该用户权限, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).catch(err => err)
			    
			    if (confirmResult !== 'confirm') {
			    	return this.$message.info('已取消删除!')
			    }
			    
			    const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
			    
			    if (res.meta.status !== 200) {
			    	return this.$message.error('删除权限失败!')
			    }
			    this.$message.success('删除权限成功!')
			    
			    //this.getRolesList();
			    role.children = res.data;
			},
			//分配权限对话框
			async showSetRightDialog (role) {
				this.roleId = role.id;
				
				//获取所有权限数据
				const {data: res} = await this.$http.get('rights/tree')
				
				if (res.meta.status !== 200) {
					return this.$message.error('获取权限数据失败!')
				}
				
				//把获取的权限数据保存到 data 中
				this.rightsList = res.data;
				//console.log(this.rightsList)
				
				//递归获取三级节点的id
				this.getLeafKeys(role, this.defKeys)
				
				this.setDialogVisible = true;
			},
			//通过递归的方式，获取角色下所有三级权限的id，并保存到 defKeys中
			getLeafKeys (node, arr) {
				//如果当前节点 node 不包含childre属性，则是三级节点
				if (!node.children) {
					return arr.push(node.id)
				}
				
				node.children.forEach(item => this.getLeafKeys(item, arr));
			},
			//监听分配权限的关闭事件
			setRightDialogClosed () {
				this.defKeys = []
			},
			//点击为角色分配权限
			async allToRights () {
				const keys = [
				   ...this.$refs.treeRef.getCheckedKeys(),
				   ...this.$refs.treeRef.getHalfCheckedKeys()
				]
				
				const idStr = keys.join(',')
				
				const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, {rids: idStr})
				
				if (res.meta.status !== 200) {
					return this.$message.error('分配权限失败!')
				}
				
				this.$message.success('分配权限成功!')
				
				this.getRolesList();
				this.setDialogVisible = false;
			}
		}
	}
</script>

<style scoped lang="less">
   .el-tag {
   	  margin: 7px;
   }
   
   .dbtop {
   	  border-top: 1px solid #EEEEEE;
   }
   
   .dbbottom {
   	  border-bottom: 1px solid #EEEEEE;
   }
   
   .vcenter {
   	display: flex;
   	align-items: center;
   }
</style>