<template>
<section >
	<el-col class="tool-bar">
		<el-button-group>
	    <el-button size="small" type="primary" @click="addCost">添加</el-button>
	    <el-button size="small" type="primary"  @click="goBack()">返回</el-button>
	    </el-button-group>
	 </el-col>
  	<el-col>
		<form-box title="查询" :visible="true" >
			<el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
				<el-form-item label="箱号"  prop="cabinetNo">
					<el-input v-model.trim="form.cabinetNo"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
				</el-form-item>
			</el-form>
		 </form-box>

  	</el-col>

<!--列表-->
   <el-col v-if="visible">
		<el-table ref="table"
	    :data="costAdminList.data"
	    :max-height="tableMaxHeight"
	    stripe
	     @selection-change="handleSelectionChange"
	      @row-click="handleRowClick">
	       <el-table-column type="selection"  width="30" >
        </el-table-column>

	   <el-table-column width="140px"
	      prop="cabinetNo"
	      label="箱号">
	      <template scope="scope">
	      		<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''" >{{scope.row.cabinetNo}}</span><span v-if="scope.row.isFixed ==1" style="    color: red;font-size: 24px;vertical-align: bottom;line-height: 16px;">*</span>
	      </template>
	    </el-table-column>
		 <el-table-column
	      prop="cabinetType"
	      label="箱型">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.cabinetType}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column width="100px"
	      prop="costTypeName"
	      label="费用类型">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.costTypeName}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column  width="100px"
	      prop="payAmount"
	      label="应付金额">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.payAmount}}</span>
	      </template>
	    </el-table-column>
		<el-table-column  width="100px"
	      prop="payObject"
	      label="应付对象">
	       <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.payObject}}</span>
	      </template>
	    </el-table-column>

		 <el-table-column  width="100px"
	      prop="incomeAmount"
	      label="应收金额">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.incomeAmount}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="incomeObject"  width="100px"
	      label="应收对象">
	       <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.incomeObject}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="agencyfundText"
	      label="代收款">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.agencyfundText}}</span>
	      </template>
	    </el-table-column>
	     <el-table-column  width="120px"
	      prop="customerName"
	      label="真实收送货客户">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.customerName}}</span>
	      </template>
	    </el-table-column>
		<el-table-column
	      prop="remark"
	      label="备注">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.remark}}</span>
	      </template>
	    </el-table-column>
      <el-table-column
        prop="payResponsibleText"  width="120px"
        label="付款责任方">
      </el-table-column>
	    <el-table-column
	      prop="userName"  width="120px"
	      label="操作人">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.userName}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="updateTime"
	      label="最后更新时间" width="180">
	      <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.updateTime}}</span>
	      </template>
	    </el-table-column>
		<el-table-column
	      prop="settlementDate"
	      label="结算日期" width="180">
	       <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.settlementDate}}</span>
	      </template>
	    </el-table-column>
	     <el-table-column width="100px"
	      prop="costStatusName"
	      label="费用状态">
	       <template scope="scope">
	      	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.costStatusName}}</span>
	      </template>
	    </el-table-column>
	     <el-table-column
	     v-if="!isDisabled(7)"
	     fixed="right"
	      label="操作"
	      width="110">
	      <template scope="scope">
	      		<div>
	      			<el-button-group>
	      			<el-button type="primary" size="mini" @click="editCost(scope.row)" :disabled="scope.row.isEdit === 0">编辑</el-button>
	      			<el-button type="primary" size="mini" @click="logsHandle(scope.row)" >修改日志</el-button>
	      			</el-button-group>
	      		</div>

	      </template>
	    </el-table-column>
  </el-table>
  </el-col>

  <el-col style="padding:10px 0;" v-if="visible">
  		<div style="float:left" v-if="isShowTotal">
		 <span style="padding-right:10px;">
		 	应收合计:<span >
		 	{{amountTotal.incomeAmount}}
		 	</span>
		 	元
		 </span>
		 <span style="padding-right:10px;">
			应付合计:<span >
		 	{{amountTotal.payAmount}}
		 	</span>
		 	元
		</span>
		 <span>
		 	毛利合计:<span v-if="amountTotal.grossProfit < 0" class="c1">
		 	{{amountTotal.grossProfit}}
		 	</span>
		 	<span v-else>
		 	{{amountTotal.grossProfit}}
		 	</span>元
		 </span>
		 </div>
  		<el-pagination style="float:right" layout="total, sizes, prev, pager, next, jumper"
  		@current-change="handleCurrentChange"
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col>

<EditCost ref="editcost"></EditCost>
<CostLogs ref="costlogs"></CostLogs>
</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import tool from '../../../common/mixins/tool'
	import pagination  from '../../../common/mixins/pagination'
	import EditCost from './EditCost.vue'
	import CostLogs from './CostLogs.vue'
	export default {
		mixins:[pagination,tool],
		components:{EditCost,CostLogs},
		data() {
			return {
				labelWidth:'80px',
				visible:false,
				selectData:[],
				amountTotal:{},
				isShowTotal:true,
				form: {
					cabinetNo:'',
					orderId:this.$route.params.orderId
				}
			}
		},
		computed:{
			...mapGetters([
				'costAdminList'
				])
		},
		methods: {
			...mapActions([
				'getCabinetCostList',
				'getCabinetCostListAmount'
				]),
			//初始化函数
			init(){
				this.getList();

        		this.form.cabinetNo='';

			},
			//获取列表选中的数据
			handleSelectionChange(val){
				this.selectData = val;
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getCabinetCostList,false,()=>{
					setTimeout(()=>{
						this.visible = true;

					})

				})
				this.CabinetCostListAmountHandler();
			},
			//应付，应收，毛利统计
			CabinetCostListAmountHandler(){
				let param = {
					 cabinetNo:this.form.cabinetNo,
					 orderId:this.$route.params.orderId
				}
				this.getCabinetCostListAmount(param).then((res)=>{
					if(res.data == ""){
						this.isShowTotal = false;
						return;
					}
					this.isShowTotal = true;
					this.amountTotal = res.data;
					this.amountTotal.grossProfit = Number(this.amountTotal.grossProfit);
					this.amountTotal.incomeAmount = Number(this.amountTotal.incomeAmount);
					this.amountTotal.payAmount = Number(this.amountTotal.payAmount);
				})

			},
			addCost(){
				this.$refs.editcost.dialogVisible = true
				this.$refs.editcost.addOrEdit = "add"
				this.$refs.editcost.init()
			},
			editCost(row){
				this.$refs.editcost.form.cabinetId=row.cabinetId
				this.$refs.editcost.dialogVisible = true
				this.$refs.editcost.addOrEdit = "edit"
				this.$refs.editcost.init()
			},
			logsHandle(row){
				this.$refs.costlogs.form.cabinetCostId=row.cabinetCostId
				this.$refs.costlogs.dialogVisible = true
				this.$refs.costlogs.init()
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
		    	this.getAddressByRegion(param).then((res)=>{
		    		if(res.success){
						this.$parent.form.addressBefore=res.data
						this.$parent.form.addressOther=this.selectData[0].address.slice(res.data.length)
		    		}
		    	})
		    	this.$parent.form.regionCode=this.selectData[0].regionCode
		    	//this.$parent.form.address=this.selectData[0].address
		      	this.dialogVisible= false
		    },
		    goBack(){
		    	this.$router.push({path:'/order/list'})
		    }
		},
		watch:{
			 '$route' (to, from) {
			 	this.visible = false;
				this.form.orderId = this.$route.params.orderId
        		this.form.cabinetNo='';
        		this.CabinetCostListAmountHandler();
			}
		},
		created(){
			this.init()
		},
		mounted(){

		}
	}

</script>
