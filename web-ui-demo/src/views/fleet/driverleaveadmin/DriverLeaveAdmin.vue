<template>
<section>
<ToolBarBox>
	<el-col class="tool-bar">
		<el-button-group>
			<el-button type="primary"  size="small" @click="handleAudit(2)">审核通过</el-button>
			<el-button type="primary"  size="small" @click="handleAudit(3)">审核不通过</el-button>
		</el-button-group>
  	</el-col>
  	<el-col>
		<form-box title="查询">
			<el-form inline :model="form" ref="form" @submit.prevent="onSubmit">
					<el-form-item label="司机" prop="driverInfoId" :label-width="labelWidth">
					<el-input v-model="form.driverName" class='control-width'></el-input>
						<!-- <el-select 
						  clearable filterable default-first-option 
						v-model="form.driverInfoId" 
						class='control-width'>
							<el-option 
							v-for="item in allleavedriverInfoList" 
							:key="item.driverInfoId" 
							:value="item.driverInfoId"
							:label="item.driverName" 
							
							></el-option>
						</el-select> -->
					</el-form-item>

					<el-form-item label="类型" prop="status" :label-width="labelWidth">
						<el-select 
						  clearable filterable default-first-option 
						v-model="form.status" 
						class='control-width'>
							<el-option  label="审批中" :value="1"></el-option>
							<el-option  label="已通过" :value="2"></el-option>
							<el-option  label="未通过" :value="3"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="请假开始时间"  prop="startDate" :label-width="labelWidth">
						<el-date-picker v-model="form.startDate"  >
						</el-date-picker>
					</el-form-item>

					<el-form-item label="请假结束时间"  prop="endDate" :label-width="labelWidth">
						<el-date-picker v-model="form.endDate" >
						</el-date-picker>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
					</el-form-item>

			</el-form>
		 </form-box>
  	</el-col>
</ToolBarBox>
<TableBox>	
   <!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="driverLeaveList.data"
	    :max-height="tableMaxHeight"
	    stripe
	     @selection-change="handleSelectionChange"
	     @row-click="handleRowClick">
	    <el-table-column type="selection" >
	      </el-table-column>
	    <el-table-column
	      prop="driverName"
	      label="司机" >
	    </el-table-column>
	     <el-table-column
	      prop="startDate"
	      label="开始时间" >
	    </el-table-column>
	    <el-table-column 
	      prop="endDate"
	      label="结束时间" >
	    </el-table-column>
	    <el-table-column 
	      prop="dayNum"
	      label="请假天数" >
	    </el-table-column>
	     <el-table-column
	      prop="status"
	      label="审批状态"  >
	      <template scope="scope">
				<span v-if="scope.row.status == 1 ">审核中</span>
				<span v-if="scope.row.status == 2 ">已通过</span>
				<span v-if="scope.row.status == 3 ">未通过</span>

	      </template>
	    </el-table-column>
	     <el-table-column
	      prop="operatorName"
	      label="操作人姓名" >
	    </el-table-column>
	    <el-table-column 
	      prop="leaveReason"
	      label="请假缘由">
	    </el-table-column>
	    <el-table-column 
	      prop="operatorRemark"
	      label="操作人备注">
	    </el-table-column>
		<el-table-column
	      prop="operatorDate"
	      label="操作时间">
	    </el-table-column>

  </el-table>
  </el-col>
  </TableBox>
  <PaginationBox>
  <el-col style="text-align:center;">
  		<el-pagination layout="total, sizes, prev, pager, next, jumper"  
  		@current-change="handleCurrentChange" 
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col>
  </PaginationBox>
  </section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination],
		components:{},
		data() {
			return {
				labelWidth:'80px',
				newFormVisible:false,
				editLoading:false,
				editFormVisible:false,
				selectData:[],
				form: {
					driverName: '',
					status: '',
					startDate:'',
					endDate:''
					
				}
			}
		},
		computed:{
			...mapGetters([
				'driverLeaveList','allleavedriverInfoList'
				])
		},
		methods: {
			...mapActions([
				'getDriverLeaveList','leaveUpdStatus','getAllLeaveDriverInfo'
				]),
			init(){
				this.$store.dispatch('getAllLeaveDriverInfo')
				this.getList()
			},
			handleSelectionChange(val){
				this.selectData = val
			},
			handleAudit(status){
				if(this.selectData.length == 0){
					this.$confirm('请选择一条数据')
				}else{
					let idsArr = this.selectData.map((val,key)=>{
						 return val.driverLeaveId
					})
					let param = {status:status,ids:idsArr.join(',')}
					if(status ==2){
						this.$confirm('确定通过审核?').then(()=>{
							 this.leaveUpdStatus(param).then((res)=>{
							 	if(res.success){
							 		this.$message({
							 			message:res.message,
							 			type:'success'
							 		})
							 		this.getList()
							 	}else{
							 		this.$message({
							 			message:res.message,
							 			type:'warning'
							 		})
							 	}
							 })
						})
					}else if(status == 3){
						this.$confirm('确定不通过审核?').then(()=>{
							 this.leaveUpdStatus(param).then((res)=>{
							 	if(res.success){
							 		this.$message({
							 			message:res.message,
							 			type:'success'
							 		})
							 		this.getList()
							 	}else{
							 		this.$message({
							 			message:res.message,
							 			type:'warning'
							 		})
							 	}
							 })
						})
					}
					
				}
				
			},
			//获取列表
			getList(){
				this.form.startDate = (typeof(this.form.startDate)== "undefined")?'':(typeof(this.form.startDate)== "string"?this.form.startDate:util.formatDate.format(this.form.startDate,'yyyy-MM-dd'));
				this.form.endDate = (typeof(this.form.endDate)== "undefined")?'':(typeof(this.form.endDate)== "string"?this.form.endDate:util.formatDate.format(this.form.endDate,'yyyy-MM-dd'));
				this.pageHandler(this.form,this.getDriverLeaveList)

			},
			//删除客户
			handleDelete(){
				if(this.selectData.length == 1){
					let driverInfoId = this.selectData[0].driverInfoId;
					this.$confirm('是否删除改司机的信息').then(()=>{
						this.driverInfoDelete({id:driverInfoId}).then((res)=>{
							if(res.success){
								this.$message({
									message:'删除成功',
									type:'success'
								})
								this.getList()
							}else{
								this.$message({
									message:'删除失败',
									type:'warning'
								})
							}
						})
					})
		        }else{
		            this.$confirm('请选择一条数据')
		        }
			},
			//查询
			onSubmit() {
				this.getList()
			},
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