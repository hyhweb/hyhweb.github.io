<template>
<section>
<el-dialog title="客服备注" v-model="dialogVisible"  ref="newDialog" >
  	<el-col style="margin-bottom:10px;">
		<el-button size="small" type="primary" @click="add">添加</el-button>
  	</el-col>
	
	<!--列表-->
   <el-col>
		<el-table
	    :data="orderRemarkData.data"
	    stripe>
	    <el-table-column
	      prop="remark"
	      label="备注信息"   sortable>

	    </el-table-column>
	    <el-table-column
	      prop="userName"
	      label="操作人" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="操作时间" sortable>
	    </el-table-column>

  </el-table>
  </el-col>
  <el-col style="padding:10px 0;text-align:center;">
  		<el-pagination layout="total, sizes, prev, pager, next, jumper"  
  		@current-change="handleCurrentChange" 
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col>

  </el-dialog>
  <el-dialog title="添加客服备注" v-model="adddialogVisible"  ref="addDialog" >
		<el-form  v-model="form" >
			<el-col>
					<el-form-item label="箱号" style="width:100%">
						<el-select   clearable filterable default-first-option 
						v-model="form.cabinetNo" 
						placeholder="请选择箱号" 
						class='control-width'
						@change="changeCabinetNo"
						>
							<el-option 
							v-for="item in orderDetail.cabinetList"
							v-if="item.cabinetNo != null"
							:key="item.cabinetNo"
							:label="item.cabinetNo" 
							:value="item.cabinetNo">
								
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备注" style="width:100%">
					<el-input
					  type="textarea"
					  :rows="6"
					  placeholder="请输入客服备注内容"
					  v-model="form.remark" style="width:80%" >
					</el-input>
					</el-form-item>
			</el-col>
		</el-form>
		<div slot="footer">
				<el-button type="primary" @click="submitReMark">提交</el-button>
		</div>
  </el-dialog>
</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination],
		data() {
			return {
				labelWidth:'80px',
				dialogVisible:false,
				adddialogVisible:false,
				selectData:[],
				form: {
					orderId:"",
					cabinetNo:'',
					remark:''
				}
			}
		},
		computed:{
			...mapGetters([
				'orderRemarkData','orderDetail'
				])
		},
		methods: {
			...mapActions([
				'getOrderRemarkData','getSaveRemarkInfo'
				]),
			//初始化函数
			init(){
				this.getList()
			},
			//获取列表选中的数据
			handleSelectionChange(val){
				console.log(val)
				this.selectData = val;
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getOrderRemarkData)
			},
			//选择箱号
			changeCabinetNo(val){
				this.form.remark=val+':'
			},
			//添加
			add() {
				this.adddialogVisible = true
				this.form.remark=''
			},
			//提交备注
			submitReMark(){
				if(this.form.cabinetNo==""){
					this.$message({
						message:'请选择箱号',
						type:'warning'
					})
					return
				}
				if(this.form.remark==""){
					this.$message({
						message:'请输入客服备注内容',
						type:'warning'
					})
					return
				}
				this.getSaveRemarkInfo(this.form).then((res)=>{
					if(res.success){
						this.init()
						this.adddialogVisible = false
						this.$message({
							message:'添加客服备注成功！',
							type:'success'
						})
					}else{
						this.$message({
							message:'添加客服备注失败！请重新添加',
							type:'warning'
						})

					}
				})
			},
			//重置查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		      }
		},
		created(){
			this.init()
		},
		mounted(){

		}
	}

</script>