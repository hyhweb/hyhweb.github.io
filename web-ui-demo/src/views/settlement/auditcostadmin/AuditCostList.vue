<style type="text/css">
	.query-modal {
		display: flex;
		flex-flow: row nowrap;
	}
	.query-modal .el-form-item {
		margin: 5px;
		margin-right: 10px;
	}
	.query-params> .el-form-item> label {
		width: 80px;
	}
	.query-params> .el-form-item> div {
		width: 150px;
		height: 36px;
	}
	.query-btns {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}
	.query-btns> .el-form-item:last-of-type {
		margin-bottom: 0;
	}
	.query-btns> .el-form-item .el-button {
		margin: 0;
		width: 90px;
	}
</style>
<template>
<section>
	<ToolBarBox>
  	<el-col>
		<form-box title="查询">
			<el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
				<div class="query-params">
					<el-form-item label="客户名称"  prop="orderCustomerName">
						<el-input v-model="form.orderCustomerName "></el-input>
					</el-form-item>

					<el-form-item label="箱号"  prop="cabinetNo ">
						<el-input v-model="form.cabinetNo "></el-input>
					</el-form-item>

					<el-form-item label="订单号"  prop="orderNo ">
						<el-input v-model="form.orderNo "></el-input>
					</el-form-item>

					<el-form-item label="行程开始日期" :label-width="labelWidth" prop="endDateStart" >
		            	<el-date-picker type="date"  v-model="form.endDateStart"  @change="endDateStartChange " class='control-width'></el-date-picker>
		          	</el-form-item>

		          	<el-form-item label="行程结束日期" :label-width="labelWidth" prop="endDateEnd" >
		            	<el-date-picker type="date"  v-model="form.endDateEnd"  @change="endDateEndChange " class='control-width'></el-date-picker>
		          	</el-form-item>

					<el-form-item label="费用类型" :label-width="labelWidth" prop="costTypeCode">
			            <el-select  clearable filterable default-first-option  v-model="form.costTypeCode"  class='control-width' >
			            	<el-option v-for="item in auditingCostQueryList.costTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
			            </el-select>
			        </el-form-item>

					<el-form-item label="费用状态" :label-width="labelWidth" prop="costStatus">
			            <el-select  clearable filterable default-first-option  v-model="form.costStatus "  class='control-width' >
			            	<el-option v-for="item in auditingCostQueryList.costStatusTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
			            </el-select>
			        </el-form-item>

	 				<el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
			            <el-select class='control-width' clearable filterable default-first-option  v-model="form.orgCode" @visible-change="visibleChangeDeptmentList">
			            	<el-option v-for="item in deptmentList" :key="item.value " :label="item.text" :value="item.value"></el-option>
			            </el-select>
			        </el-form-item>


                    <el-form-item label="结算开始日期" prop="settlementDateStart">
                      <el-date-picker class='control-width' type="date" icon="" placeholder="" v-model="form.settlementDateStart" @change="settlementDateStartChange" ></el-date-picker>
                    </el-form-item>

                  <el-form-item  label="结算结束日期" :label-width="labelWidth" prop="settlementDateEnd" >
	                <el-date-picker class='control-width' type="date" placeholder="" v-model="form.settlementDateEnd" @change="settlementDateEndChange" ></el-date-picker>
	              </el-form-item>


			    </div>

				<div class="query-btns">
					<el-form-item>
						<el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="resetQuery" icon="setting">清空</el-button>
					</el-form-item>
				</div>

			</el-form>
		 </form-box>
  	</el-col>
  <el-col :span="24" class="toolbar">
    <el-button-group>
      <el-button v-if="!this.$global.isDisabled(67) || !this.$global.isDisabled(5)" size="small" type="primary"  @click="auditCostHandle(1)">通过审核</el-button>
      <el-button v-if="!this.$global.isDisabled(67) || !this.$global.isDisabled(5)" size="small" type="primary" @click="unAuditCostHandle(0)" >不通过审核</el-button>
      <el-button v-if="!this.$global.isDisabled(21)"  size="small" type="primary" @click="exportCabinetCost()" >导出excel</el-button>
    </el-button-group>
    <div style="float:right;margin-top:8px;margin-right:10px">
      总应收(元)：<span style="color:red">{{incomeAmount}}</span>
      总应付(元)：<span style="color:red">{{payAmount}}</span>
    </div>
  </el-col>
  </ToolBarBox>
  <TableBox>
<!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="auditingCostList.data"
	    :max-height="tableMaxHeight"
	    @selection-change="handleSelectionChange"
	    @row-click="handleRowClick"
	    stripe>
        <el-table-column type="selection"  width="30" >
        </el-table-column>
	     <el-table-column
	     fixed="right"
	      label="操作"
	      width="140">
	      <template scope="scope">
	      <div style="text-align:center;">
	      <el-button-group>
		      <el-button size="mini" type="primary" @click="clickHandle(scope.row)">费用详情</el-button>
			  <el-button size="mini" type="primary" @click="auditCostLogHandle(scope.row)">审核详情</el-button>
		  </el-button-group>
		 </div>
	      </template>
	    </el-table-column>

	    <el-table-column width="110px"
	      prop="orderNo"
	      label="订单号">
	    </el-table-column>

	   <el-table-column width="100px"
	      prop="cabinetNo"
	      label="箱号">
	    </el-table-column>
		 <el-table-column width="50px" align="center"
	      prop="cabinetType"
	      label="箱型">
	    </el-table-column>
	    <el-table-column width="80px" align="center"
	      prop="costTypeName"
	      label="费用类型">
	    </el-table-column>
	    <el-table-column  width="60px" align="center"
	      prop="payAmount"
	      label="应付金额">
	    </el-table-column>
		<el-table-column  width="80px" align="center"
	      prop="payObject"
	      label="应付对象">
	    </el-table-column>

		 <el-table-column  width="60px" align="center"
	      prop="incomeAmount"
	      label="应收金额">
	    </el-table-column>
	    <el-table-column
	      prop="incomeObject"  width="80px" align="center"
	      label="应收对象">
	    </el-table-column>
	    <el-table-column align="center" width="50px"
	      prop="agencyfundText"
	      label="代收款">
	    </el-table-column>
	     <el-table-column  width="120px" align="center"
	      prop="customerName"
	      label="真实收送货客户">
	    </el-table-column>
		 <el-table-column align="center"
	      prop="remark" width="120px"
	      label="备注">
       <template scope="scope">
         <el-popover
           placement="left-end"
           trigger="hover"
           ref="popover"
           width="100"
         >
           <div>{{scope.row.remark}}</div>
         </el-popover>
         <span class="remark" v-popover:popover>
                {{scope.row.remark}}
            </span>
       </template>
	    </el-table-column>
	    <el-table-column align="center"
	      prop="userName"  width="80px"
	      label="操作人">
	    </el-table-column>
	    <el-table-column align="center"
	      prop="updateTime"
	      label="最后更新时间" width="100px">
	    </el-table-column>
	     <el-table-column align="center"
	      prop="settlementDate"
	      label="结算日期">
	    </el-table-column>
	     <el-table-column align="center"
	      prop="costStatusName"
	      label="费用状态">
	    </el-table-column>

	     <el-table-column align="center"
	      prop="orderCustomerName"
	      label="下单客户">
	    </el-table-column>
	     <el-table-column align="center"
	      prop="orderType"
	      label="装送类型">
	    </el-table-column>
	     <el-table-column align="center"
	      prop="harborName"
	      label="报价港口">
	    </el-table-column>
	    <el-table-column align="center"
	      prop="salesmanName"
	      label="业务员">
	    </el-table-column>
	     <el-table-column align="center" width="150px"
	      prop="endDate"
	      label="任务完成时间">
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
	<AuditCostLog ref="auditCostLog"></AuditCostLog>
	<CostDetail ref="costdetail"></CostDetail>
</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	import AuditCostLog from './AuditCostLog.vue'
	import CostDetail from './CostDetail.vue'
  import {exportAuditingCabintCostListApi} from '../../../api/modules/order'
  import Qs from 'qs';
	export default {
		mixins:[pagination],
		components:{AuditCostLog,CostDetail},
		data() {
			return {
				labelWidth:'80px',
				deptmentList:[],
				selectData:[],
        incomeAmount:'0.00',
        payAmount:'0.00',
				form: {
					orderCustomerName:'',
          			Authorization:'',
					cabinetNo:'',
					orderNo:'',
					costTypeCode:'',
					endDateStart:'',
					endDateEnd:'',
					orgCode:'',
					costStatus:'0',
					settlementDateStart:'',
					settlementDateEnd:''
				}
			}
		},
		computed:{
			...mapGetters([
				'auditingCostList','auditingCostQueryList','auditingCostLogList','auditingCabinetCostAmount'
				])
		},
		methods: {
			...mapActions([
				'getAuditingCostList','getAuditingCostQueryList','auditingCabinetCostHandle','getCostAuditinfoLog','getAuditingCabinetCostAmount'
				]),
			//初始化函数
			init(){
				this.getList();
				this.getAuditingCostQueryList().then((res)=>{
					this.form.costStatus = res.data.costStatusTypeList[0].value
				});

			},
			//获取列表
			getList(){
        this.incomeAmount = "0.00";
        this.payAmount = '0.00';
        let success = success =>{
          if(this.auditingCabinetCostAmount.incomeAmount != null){
            this.incomeAmount = this.auditingCabinetCostAmount.incomeAmount;
          }
          if(this.auditingCabinetCostAmount.payAmount != null){
            this.payAmount = this.auditingCabinetCostAmount.payAmount;
          }
        };
        this.form.cabinetNo = this.form.cabinetNo ? this.form.cabinetNo.trim():'';
        this.form.orderNo = this.form.orderNo ? this.form.orderNo.trim():'';
				this.pageHandler(this.form,this.getAuditingCostList,null,success);
        this.getAuditingCabinetCostAmount(this.form);
			},
			endDateStartChange(val){
				this.form.endDateStart = val;
			},
			endDateEndChange(val){
				this.form.endDateEnd = val;
			},
			clickHandle(row){
				//查看费用详情
				this.$refs.costdetail.form.cabinetId=row.cabinetId;
				this.$refs.costdetail.dialogVisible = true;
				this.$refs.costdetail.init()

			},
			// 获取列表选中的数据
	      handleSelectionChange(val) {
	      	this.selectData = val;
	      },
			visibleChangeDeptmentList(val){
				if(val){
					this.deptmentList = this.auditingCostQueryList.deptmentList;
				}
			},
			auditCostLogHandle(row){
				this.$refs.auditCostLog.dialogVisible = true;
				this.$refs.auditCostLog.form.cabinetCostId = row.cabinetCostId;
				this.$refs.auditCostLog.init();

			},
			settlementDateStartChange(val){
				this.form.settlementDateStart = val;
			},
			settlementDateEndChange(val){
				this.form.settlementDateEnd = val;
			},

      //导出excel
      exportCabinetCost(){
        this.$confirm('确认要导出列表信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          this.form.cabinetNo = this.form.cabinetNo ? this.form.cabinetNo.trim():'';
          this.form.orderNo = this.form.orderNo ? this.form.orderNo.trim():'';
          this.form.pageSize = this.pageCount;
          let params = Qs.stringify(this.form);
          exportAuditingCabintCostListApi(params);
        })
      },
			prevAuditCostHandle(val){
				 if (this.selectData.length > 0) {
				 	let title = (val == 1?'确定通过审核？':'确定不通过审核？');
				 	let optype = (val == 1?1:0);
		          	this.$confirm(title).then((res)=>{
					//@param cabinetCostIds 逗号隔开的费用id
					//@param optype 0 不通过, 1 通过
					let cabinetCostIdsArr = [];
					this.selectData.forEach((item)=>{
						cabinetCostIdsArr.push(item.cabinetCostId);
					})
					let param = {cabinetCostIds:cabinetCostIdsArr.join(','),optype:optype}
					this.auditingCabinetCostHandle(param).then((res)=>{
							if(res.success){
								this.getList();
								this.$message({
									message:res.message,
									type:'success'
								})
							}else{
								this.$message({
									message:res.message,
									type:'warning'
								})
							}
						})
					}).catch((error)=>{

					})

		        } else {
		          this.$confirm('请先选择数据');
		        }
			},
			auditCostHandle(val){
				this.prevAuditCostHandle(val);
			},
			unAuditCostHandle(val){
				this.prevAuditCostHandle(val);
			},
			//查询
			onSubmit() {
				this.getList()
			},
			//清空查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    resetQuery() {
		    	this.form = {
					orderCustomerName:'',
          			Authorization:'',
					cabinetNo:'',
					orderNo:'',
					endDateStart:'',
					endDateEnd:'',
					costTypeCode:'',
					orgCode:'',
					costStatus:''
				}
		    }

		},
		created(){
			this.init()
		},
		mounted(){

		}
	}

</script>
