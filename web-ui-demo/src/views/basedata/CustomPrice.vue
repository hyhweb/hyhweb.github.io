<template>
<section>
	<el-col style="padding:10px 0;">
		<el-button-group>
			<el-button type="primary"  size="small" @click="handleDetail()">查看</el-button>
			<el-button type="primary"  size="small">编辑</el-button>
			<el-button type="primary"  size="small" @click="orderCancel()">取消</el-button>
			<el-button type="primary"  size="small">审核</el-button>
			<el-button type="primary"  size="small"  @click="handleNew()">代下单</el-button>


		</el-button-group>
  	</el-col>
  	<el-col>
		<form-box title="查询">
			<el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
				<el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo">
					<el-input v-model="form.orderNo" class='control-width'></el-input>
				</el-form-item>
				<el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
					<el-input v-model="form.bookSpaceNo" class='control-width'></el-input>
				</el-form-item>
				<el-form-item label="导入单号" :label-width="labelWidth" prop="importNo">
					<el-input v-model="form.importNo" class='control-width'></el-input>
				</el-form-item>
				<el-form-item label="下单日期" :label-width="labelWidth" prop="createDateStart" style="margin-right:2px">
				<el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.createDateStart" style="width:120px" @change="createDateStartChange"></el-date-picker>
				</el-form-item><label class="el-form-item__label" style="padding-right:0">-</label>
				<el-form-item label="" :label-width="labelWidth" prop="createDateEnd">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.createDateEnd" style="width:120px" @change="createDateEndChange"></el-date-picker>
				</el-form-item>
				<el-form-item label="包含箱号" :label-width="labelWidth"  prop="cabinetNo">
					<el-input v-model="form.cabinetNo" class='control-width'></el-input>
				</el-form-item>
				<el-form-item label="客户名称" :label-width="labelWidth"  prop="customerName">
					<el-input v-model="form.customerName" class='control-width'></el-input>
				</el-form-item>
				<el-form-item label="货物名称" :label-width="labelWidth"  prop="goodsName">
					<el-input v-model="form.goodsName" class='control-width'></el-input>
				</el-form-item>

				<el-form-item label="要求装送货日期" :label-width="labelWidth"  prop="requireDateStart" style="margin-right:2px">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.requireDateStart" style="width:120px" @change="requireDateStartChange"></el-date-picker>
						</el-form-item><label class="el-form-item__label" style="padding-right:0">-</label>
						<el-form-item label="" :label-width="labelWidth"  prop="requireDateEnd">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.requireDateEnd" style="width:120px" @change="requireDateEndChange"></el-date-picker>
						</el-form-item>

				<el-form-item label="订单状态" :label-width="labelWidth"  prop="orderStatus">
					<el-select
					filterable
					v-model="form.orderStatus" placeholder="请选择订单状态" class='control-width'>
						<el-option v-for="item in orderStatus.orderStatusList" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运输类型" :label-width="labelWidth"  prop="orderType">
					<el-select
					v-model="form.orderType"
					placeholder="请选择运输类型"
					class='control-width'>
						<el-option v-for="item in orderStatus.orderTypeList" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报价港口" :label-width="labelWidth"  prop="harborId">
					<el-select
					v-model="form.harborId" placeholder="请选择报价港口" class='control-width'>
						<el-option v-for="item in orderStatus.harborList" :label="item.text" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="子公司" :label-width="labelWidth"  prop="orgCode">
					<el-select
					v-model="form.orgCode" placeholder="请选择子公司" class='control-width'>
						<el-option
						v-for="item in orderStatus.deptmentList"
						:label="item.text"
						:value="item.value"></el-option>
					</el-select>
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
		<el-table
      ref="table" @row-click="handleRowClick"
	    :data="orderList"
	    height="300"
	    stripe
	     @selection-change="handleSelectionChange">
	    <el-table-column type="selection" width="50">
	      </el-table-column>
	    <el-table-column
	      prop="orderNo"
	      label="订单号" width="120"  sortable>

	    </el-table-column>
	    <el-table-column
	      prop="customerName"
	      label="客户名称" width="150"  sortable>
	    </el-table-column>
	    <el-table-column
	      prop="orderType"
	      label="运输类型" width="200" sortable>
	    </el-table-column>
	     <el-table-column
	      prop="bookSpaceNo"
	      label="订舱单号" width="200" sortable>
	    </el-table-column>
	     <el-table-column
	      prop="requireDate"
	      label="要求装送货日期" width="200" sortable>
	    </el-table-column>
	     <el-table-column
	      prop="goodsName"
	      label="货物名称" width="200" sortable>
	    </el-table-column>
		<el-table-column
	      prop="createDate"
	      label="下单日期" width="200" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="totalAmount"
	      label="总价(元)" width="200" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="harborName"
	      label="报价港口" width="200" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="importNo"
	      label="导入单号" width="200" sortable>
	    </el-table-column>
	    <el-table-column
	      prop="cabinetType"
	      label="箱量" width="200" sortable>
	    </el-table-column>
		<el-table-column
	      prop="orderStatusName"
	      label="状态" width="200" sortable>
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




  <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<EditOrder :detail="rowData"></EditOrder>
		</el-dialog>
	<!-- 	<AddOrder  ref="AddOrder"></AddOrder> -->
  </section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import util from '../../common/js/util'
	import pagination  from '../../common/mixins/pagination'
	import AddOrder from './AddOrder.vue'
	import EditOrder from './EditOrder.vue'
	export default {
		mixins:[pagination],
		components:{AddOrder,EditOrder},
		data() {
			return {
				labelWidth:'80px',
				newFormVisible:false,
				editLoading:false,
				editFormVisible:false,
				selectData:[],
				rowData:{},
				form: {
					orderNo: '',  //订单号
					bookSpaceNo: '',//订舱单号
					importNo:'',//导入单号
					requireDateStart:'',//要求装送货开始日期
					requireDateEnd:'',//要求装送货结束日期
					createDateStart:'',//下单开始日期
					createDateEnd:'',//下单结束日期
					customerName:'',//客户
					goodsName:'',//货物名称
					orderStatus:'',//订单状态
					orderType:'',//订单类型
					harborId:'',//港口
					orgCode:'',//子公司编码
					cabinetNo:'' //箱号
				}
			}
		},
		computed:{
			...mapGetters([
				'orderList','orderStatus','portPrice'
				])
		},
		methods: {
			...mapActions([
				'getOrderList','getOrderStatus','getorderCancel'
				]),
			init(){
					this.$store.dispatch('getOrderList')
					this.$store.dispatch('getOrderStatus')
			},
			//获取下单开始日期
			createDateStartChange(val){
				this.form.createDateStart = val
			},
			//获取下单结束日期
			createDateEndChange(val){
				this.form.createDateEnd = val
			},
			//获取要求装送货开始日期
			requireDateStartChange(val){
				this.form.requireDateStart = val
			},
			//获取要求装送货结束日期
			requireDateEndChange(val){
				this.form.requireDateEnd = val
			},
			//获取列表选中的数据
			handleSelectionChange(val){
				console.log(val)
				this.selectData = val;
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getOrderList)
			},
			//取消订单
			orderCancel(){
				if(this.selectData.length == 1){
					this.$confirm('确认要取消订单吗？', '提示').then(() => {
						let param = {"orderId":this.selectData[0].orderId}
						console.log(param,'------param')
						this.getorderCancel(param)
					})
				}else{
					this.$message('请选择一条数据进行取消')
				}
			},
			//代下单
			handleNew(){
				this.$router.push('/addorder')
			},
			//查看
			handleDetail(){
				this.$router.push('/orderdetail')
			},
			//显示编辑界面
			handleEdit (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.rowData = row
				console.log(row)
			},

			//查询
			onSubmit() {
				console.log(this.form)
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
			console.log(this.orderStatus,'---status---')
		}
	}

</script>
