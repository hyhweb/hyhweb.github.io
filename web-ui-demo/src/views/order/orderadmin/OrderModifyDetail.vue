<template>
<el-dialog size="large" title="订单修改详情" v-model="dialogVisible" top="10%" ref="newDialog" >
<!--   	<el-col>
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
</el-col> -->
	<el-col style="padding:10px 0">
		记录数据项包括：	下单港口、地区、货物名称、要求装送时间、订舱单号、船公司、起始港、目的港、保险类型、
货物总值、提柜码头、还柜码头、利润类型、要求提柜时间
	</el-col>
   <!--列表-->
   <el-col style="padding:10px 0">
		<el-table

	    :data="orderUpdateDetail"
	    stripe
	    >

	    <el-table-column
	      prop="displayname"
	      label="字段名" >
	    </el-table-column>
	    <el-table-column
	      prop="beforeval"
	      label="修改前"  >
	    </el-table-column>
	    <el-table-column
	      prop="afterval"
	      label="修改后">
	    </el-table-column>
	    <el-table-column
	      prop="username"
	      label="操作人">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="修改时间">
	    </el-table-column>

  </el-table>
  </el-col>
  <!-- <el-col style="padding:10px 0;text-align:center;">
  		<el-pagination layout="total, sizes, prev, pager, next, jumper"  
  		@current-change="handleCurrentChange" 
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col> -->
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
				form: {
					orderId:'',
					updateTime:''
				}
			}
		},
		computed:{
			...mapGetters([
				'orderUpdateDetail'
				])
		},
		methods: {
			...mapActions([
				'getOrderUpdateDetail'
				]),
			//初始化函数
			init(){
				this.getOrderUpdateDetail(this.form)
			},
			
			//获取列表
			/*getList(){
				this.pageHandler(this.form,this.getOrderUpdateDetail)
			},*/
			//查询
			onSubmit() {
				console.log(this.form)
				this.getList()
			},
			//重置查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
		   
		},
		created(){

		},
		mounted(){

		}
	}

</script>