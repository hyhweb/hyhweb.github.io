<template>
<section>
<!--列表-->
   <el-col class="tosendfee">
	<el-tabs v-model="activeName">
   		 <el-tab-pane label="改送费列表" name="first">

   		 </el-tab-pane>
    </el-tabs>

		<table class="table" cellspacing="0" cellpadding="0" border="0" >
			<tr>
			<td class="bg">原地址</td>
			<td colspan="7" style="text-align:left;color: #999;" class="bg">{{data.addressOld}}</td>
			</tr>
			<tr>
			<td class="bg">送货地址</td>
			<td colspan="7" style="text-align:left;color: #999;" class="bg">{{data.address}}</td>
			</tr>
			<tr>
				<td  class="bg">收费对象</td>
				<td  class="bg" style="color: #999;">收送货人</td>
				<td  class="bg">是否收真实收发货人</td>
				<td class="bg"><el-checkbox v-model="checked" @change="changeHandle"></el-checkbox></td>
				<td  class="bg">真实收发货人</td>
				<td colspan="3" class="bg">
				<el-select @change="changeSelect" :disabled="disabled" clearable filterable default-first-option  size="small"
				v-model="form.customerId"
				>
				<el-option
					v-for="item in data.orderUserList"
					:key="item.value"
					:label="item.text"
					:value="item.value">
					</el-option>
				</el-select>
				</td>
			</tr>
			<tr>
			<td class="bg">箱型</td>
			<td class="bg">箱号</td>
			<td class="bg">改送金额(收款)</td>
			<td class="bg">收款对象</td>
			<td class="bg">真实收发货人</td>
			<td class="bg">改送金额(付款)</td>
			<td class="bg">付款对象</td>
			<td class="bg">备注</td>
		</tr>
		<tr v-for="row in data.dataList">
			<td>{{row.cabinetType}}</td>
			<td>{{row.cabinetNo}}</td>
			<td>{{row.incomeAmount}}</td>
			<td>{{row.incomeObject}}</td>
			<td>
			<el-select  :disabled="disabled" clearable filterable default-first-option  size="small"
				v-model="row.customerId"
				>
				<el-option
					v-for="item in data.orderUserList"
					:key="item.value"
					:label="item.text"
					:value="item.value">
					</el-option>
				</el-select>
			</td>
			<td>{{row.payAmount}}</td>
			<td>{{row.payObject}}</td>
			<td><el-input  type="textarea"
				  autosize
				  v-model="row.remark">
			 	 </el-input></td>
		</tr>
		</table>
		<el-col class="textAlign" style="padding:10px; 0">
			<el-button type="primary" @click="submit">确认提交</el-button>
		</el-col>

  </el-col>


<el-col>



</el-col>
</section>
</template>
<style lang="scss" scoped >
	.tosendfee .table{
		width:100%;
		border-right:1px solid #dfe6ec;
		border-bottom:1px solid #dfe6ec;
		border-radius:6px;
		overflow:hidden;

	}
	.tosendfee .table td{
		border-top:1px solid #dfe6ec;
	    border-left:1px solid #dfe6ec;
	    padding:5px;
	    text-align:center;
		height:40px;
		box-sizing:border-box;

	}
	.tosendfee .table td.bg{
		    background-color: #eef1f6;
	}
</style>
<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination],
		data() {
			return {
				 activeName: 'first',
				form: {
					cabinetId:"",
					orderId:"",
					customerId:""

				},
				checked:false ,
				disabled:true,
				data:[]
			}
		},
		computed:{
		},
		methods: {
			...mapActions([
				'getToSendCostByOrderIdList','updateTosendCustomerId'
				]),
			//初始化函数
			getList(){

					this.getToSendCostByOrderIdList(this.form).then((res)=>{
						this.data = res.data;
					})
					if(this.checked){
						this.disabled = false;
					}else{
						this.disabled = true;
					}
			},
			//获取列表

			changeHandle(){

				if(this.checked){
					this.disabled = false;
				}else{
					this.form.customerId = "";
					this.disabled = true;
				}
				console.log(this.checked)

			},
			changeSelect(value){
				this.data.dataList = this.data.dataList.map((val,key)=>{
					console.log(val)
					val.customerId = value;

					return val;
				})
				console.log(this.data.dataList)
			},
			submit(){
				if(this.checked){
					if(this.form.customerId === ""){
							 this.$message({
			                  message: '请选择真实收发货人',
			                  type: 'warning',
			                });
							return;
						}
				}
				let paramData = this.data.dataList.map((val,key)=>{
					return {
						cabinetCostId:val.cabinetCostId,
						customerId:val.customerId,
						remark:val.remark,
						cabinetId:val.cabinetId
					}
				})
				let param = {data:JSON.stringify(paramData)}
				this.updateTosendCustomerId(param).then((res)=>{
					if(res.success){
						this.$message({
			                  message: res.message,
			                  type: 'success',

			             });
						 this.$router.push('/order/list')
					}else{
						this.$message({
			                  message:res.message,
			                  type: 'warning',
			             });
					}
				})
			}





		},
		watch:{
			'$route' (to, from){
				if(to.path.indexOf('/order/ToSendFee') >-1){
					this.form = {
					cabinetId:"",
					orderId:"",
					customerId:""
					};
					this.checked = false ;
					this.disabled = true;
					this.data = [];
					this.form.orderId = this.$route.params.orderId;
					this.getList();
				}

			}
		},
		created(){
			this.form.orderId = this.$route.params.orderId;
			this.getList();
		},
		mounted(){

		}
	}

</script>
