<template>
<el-dialog title="查询联系人" v-model="dialogVisible" top="10%" ref="newDialog" >
  	<el-col>
		<form-box title="查询">
			<el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
				<el-form-item label="订单编号" :label-width="labelWidth" prop="contactName">
					<el-input v-model="form.contactName"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button @click="resetForm('form')">重置</el-button>
				</el-form-item>
			</el-form>
		 </form-box>
  	</el-col>

   <!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="userContactsList.data"
	    height="300"
	    stripe
	     @selection-change="handleSelectionChange"
	      @row-click="handleRowClick">
	    <el-table-column type="selection" width="40">
	      </el-table-column>
	    <el-table-column
	      prop="contactName"
	      label="联系人" width="100"  sortable>

	    </el-table-column>
	    <el-table-column
	      prop="contactPhone"
	      label="联系电话" width="130"  sortable>
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址" sortable>
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
   <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible">取 消</el-button>
    <el-button type="primary" @click="confirmDialog">确 定</el-button>
  </div>
  </el-dialog>
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
				selectData:[],
				form: {
					customerId:'',
					orderType:'',
					contactName:''
				}
			}
		},
		computed:{
			...mapGetters([
				'userContactsList'
				])
		},
		methods: {
			...mapActions([
				'getUserContactsList','getAddressByRegion','getAllRegionByRegionCodes'
				]),
			//初始化函数
			init(){
				this.getList()
			},
			//获取列表选中的数据
			handleSelectionChange(val){
				this.selectData = val;
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getUserContactsList)
			},
			//查询
			onSubmit() {
				this.getList()
			},
			//重置查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
		    confirmDialog(){
		    	if(this.selectData.length !=1){
		    		this.$message({
		    			message:'请选择一条数据',
		    			type:'warning'
		    		})
		    		return;
		    	}
		    	let param = {code:this.selectData[0].regionCode}

		    	/*this.getAllRegionByRegionCodes(param).then((res)=>{
		    		if(res.success){
		    			this.$parent.currentRegionList = res.data;
		    			this.$parent.form.regionCode = param.code;
		    			this.$parent.addressLevel ="4";
		    			this.$parent.addressSelectedArr.regionOne = param.code.slice(0, 2)
		    			this.$parent.addressSelectedArr.regionTow = param.code.slice(0, 4)
		    			this.$parent.addressSelectedArr.regionThird = param.code.slice(0, 6)
		    			this.$parent.addressSelectedArr.regionFourth = param.code.slice(0, 9)
		    		}
		    	})*/
		    	this.getAddressByRegion(param).then((res)=>{
		    		if(res.success){
						this.$parent.form.addressBefore=res.data
						this.selectData[0].address = this.selectData[0].address.replace(/\s\- /g,"")
						this.$parent.form.addressOther=this.selectData[0].address.slice(res.data.length)
		    		}
		    	})
		    	this.$parent.form.regionCode=this.selectData[0].regionCode
		    	this.$parent.form.contactName=this.selectData[0].contactName
		    	this.$parent.form.contactPhone=this.selectData[0].contactPhone
		      	this.dialogVisible= false
		    },
	      	dialogFormVisible(){
	      		this.dialogVisible= false
	    	}
		},
		created(){
			//this.init()
		},
		mounted(){

		}
	}

</script>
