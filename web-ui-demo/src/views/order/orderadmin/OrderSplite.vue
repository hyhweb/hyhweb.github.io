<template>
<section>
	<!--列表-->
   <el-col>
		<el-table
	    :data="splitOrderListData"
	    stripe>
	    <el-table-column
	      prop="customerName"
	      label="客户"   sortable>
	    </el-table-column>
	    <el-table-column
	      prop="bookSpaceNo"
	      label="订舱单号" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="orderTypeText"
	      label="运输类型" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="harborName"
	      label="报价港口" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="goodsName"
	      label="货物名称" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="contactName"
	      label="联系人" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="contactPhone"
	      label="手机号" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址" sortable>
	    </el-table-column>

  </el-table>
  </el-col>
  <el-col style="padding:10px 0;">
  	 <el-col  style="padding:10px 0;">
			Tips：从以下列表点选需要拆分的柜子(装货无柜号显示)
  	 </el-col>
  	  <el-col>
	 <el-checkbox-group size="large" v-model="form.cabIds">
	   <el-checkbox-button 
	   v-for="item in cabinetList" 
	   :label="item.cabinetIds" 
	   :key="item.cabinetIds">
	   <div v-if="item.cabinetNo">
	    {{item.cabinetNo}}
	   </div>
	   	<div>
	    {{item.cabinetType}}
	   </div>
	   </el-checkbox-button>
	  </el-checkbox-group>
	   </el-col>
  </el-col>
  <el-col>
    <el-button type="primary" @click="onSubmit" style="width:88px;">提交</el-button>
    <el-button @click="goBack()" class="el-button--gray">返回</el-button>
  </el-col>



</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import tool from '../../../common/mixins/tool'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination,tool],
		data() {
			return {
				labelWidth:'80px',
				dialogVisible:false,
				adddialogVisible:false,
				selectData:[],
				form: {
					orderId:this.$route.params.orderId,
					cabIds:[],
					cabNumStr:[]
				}
			}
		},
		computed:{
			...mapGetters([
				'splitOrderList'
				]),
			splitOrderListData(){
				return[
				{
					"orderId":this.splitOrderList.orderId,
				    "requireDate": this.splitOrderList.orderId,
				    "address": this.splitOrderList.address,
				    "contactPhone":this.splitOrderList.contactPhone,
				    "contactName":this.splitOrderList.contactName,
				    "goodsName": this.splitOrderList.goodsName,
				    "orderStatus": this.splitOrderList.orderStatus,
				    "orderType":this.splitOrderList.orderType,
				    "bookSpaceNo": this.splitOrderList.bookSpaceNo,
				    "customerName":this.splitOrderList.customerName,
				    "harborName": this.splitOrderList.harborName,
 				    "orderTypeText":this.splitOrderList.orderTypeText,
				}]
			},
			cabinetList(){
				return this.splitOrderList.cabinetList
			}
		},
		methods: {
			...mapActions([
				'getSplitOrderList','splitOrder'
				]),
			//初始化函数
			init(){
				this.getList()
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getSplitOrderList)
			},
			//提交
			onSubmit(){
					if(this.form.cabIds.length == 0){
						this.$message({
							message:'请点选需要拆分的柜子',
							type:'warning'
						})
						return
					}
					let cabNumArr =[],cabNumObject={};
					this.form.cabIds.forEach((val,key)=>{
						this.cabinetList.forEach((item,i)=>{
							if(val == item.cabinetIds){
								cabNumArr.push(item.cabinetType)
							}
						})
					})
					if(cabNumArr.length != 0){
						cabNumArr.forEach((val,key)=>{
							if(typeof(cabNumObject[val]) =="undefined"){
								cabNumObject[val]=1
							}else{
								cabNumObject[val] +=1
							}
						})
						
					 }
				let param = {
					orderId:this.$route.params.orderId,
					cabIds:this.form.cabIds.join(','),
					cabNumStr:JSON.stringify(cabNumObject)
				}
				console.log(param,'---param----')
				this.splitOrder(param).then((res)=>{
					if(res.success){
						this.init()
						this.adddialogVisible = false
						this.$message({
							message:'拆分订单成功！',
							type:'success'
						})
						this.goBack()
					}else{
						this.$message({
							message:'拆分订单失败！',
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
		watch:{
			 '$route' (to, from) {
				this.form.orderId = this.$route.params.orderId
			}
		},
		created(){
			this.init()
		},
		mounted(){}
	}

</script>