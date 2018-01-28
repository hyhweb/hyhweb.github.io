<template>
  <el-dialog
    title="引入发票"
    size="large"
    v-model="importInvoiceLogVisible"
    append-to-body>
     	<ToolBarBox>
     		<form-box title="查询">
     			<el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit" style="margin-bottom: 0;">
					<el-form-item label="订单号" prop="orderNo" :label-width="labelWidth">
          				<el-input v-model="form.orderNo"style="width:150px"></el-input>
			        </el-form-item>
        			<el-form-item label="下单客户" prop="ordCustomerName" :label-width="labelWidth">
          				<el-input v-model="form.ordCustomerName"style="width:150px"></el-input>
        			</el-form-item>
        			<el-form-item label="真实收送货人" prop="customerName" :label-width="labelWidth">
          				<el-input v-model="form.customerName"style="width:150px"></el-input>
        			</el-form-item>
              <el-form-item label="订舱单号" prop="bookSpaceNo" :label-width="labelWidth">
                      <el-input v-model="form.bookSpaceNo"style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="子公司" :label-width="labelWidth" prop="subCode">
                <el-select
                  clearable
                  filterable
                  default-first-option
                  v-model="form.subCode" placeholder="请选择子公司" class='control-width'>
                  <el-option
                    v-for="item in initSelectData.deptmentList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="箱号" prop="cabinetNo" :label-width="labelWidth">
                    <el-input v-model="form.cabinetNo"style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="完成时间(始)"  prop="endDateStart" :label-width="labelWidth">
			          	<el-date-picker v-model="form.endDateStart"style="width:150px" placeholder="完成时间" @change="handleStartDate">
			          	</el-date-picker>
			        </el-form-item>
			        <el-form-item label="完成时间(终)"  prop="endDateEnd" :label-width="labelWidth">
			          	<el-date-picker v-model="form.endDateEnd"style="width:150px" placeholder="完成时间" @change="handleEndDate">
			          	</el-date-picker>
			        </el-form-item>
              <el-form-item label="费用名称" prop="cabinetCostName" :label-width="labelWidth">
                <el-input v-model="form.cabinetCostName"style="width:150px"></el-input>
              </el-form-item>
					<el-form-item style="position: absolute; right: 40px; top: 30px;">
		              	<el-button
		              		style="display: block;margin:0;"
		              		type="primary"
	                      	icon="search"
                        @click="onSubmit"
	                      	>查询
		              	</el-button>
		              	<el-button style="display: block;margin:10px 0 0 0;"  @click="resetForm('form')" icon="setting">清空</el-button>
		            </el-form-item>
     			</el-form>
 			</form-box>
        <el-col :span="24" class="toolbar">
          <div style="float:right;margin-top:8px;margin-right:10px">
            已选金额(元)：<span style="color:red">{{selectCostAmount}}</span> &nbsp;&nbsp;
            发票申请总计(元)：<span style="color:red">{{invoiceAmount}}</span> &nbsp;&nbsp;
          </div>
        </el-col>
     	</ToolBarBox>
		<TableBox>
	      	<el-table
		        :data="onceCusNotInvoiceApplyLogList.data"
		        :max-height="tableMaxHeight"
		        ref="table"
		        border
		        @selection-change="handleSelectionChange"
		        highlight-current-row
		        @row-click="handleRowClick"
		        stripe>
	            <el-table-column type="selection" align="center">
	            </el-table-column>
              <el-table-column prop="orderNo" label="订单号" width="100">
              </el-table-column>
              <el-table-column prop="createDate" label="下单日期" width="100">
              </el-table-column>
              <el-table-column prop="ordCustomerName" label="下单客户" width="100">
              </el-table-column>
              <el-table-column prop="customerName" label="真实收送货人" width="100">
              </el-table-column>
              <el-table-column prop="endDate" label="完结日期" width="100">
              </el-table-column>
              <el-table-column prop="harborName" label="港口" width="100">
              </el-table-column>
              <el-table-column prop="bookSpaceNo" label="运单号" width="100">
              </el-table-column>
              <el-table-column prop="cabinetType" label="箱型" width="100">
              </el-table-column>
              <el-table-column prop="cabinetNo" label="箱号" width="100">
              </el-table-column>
              <el-table-column prop="costTypeName" label="费用名称" width="100">
              </el-table-column>
              <el-table-column prop="incomeAmount" label="金额" width="100">
              </el-table-column>

      		</el-table>
    	</TableBox>
 		<PaginationBox>
	      	<el-col style="float:left;display:inline-block;width:50%;">
		        <el-button type="primary" @click="confirmImport" :disabled="this.$global.isDisabled(19)">确认引入</el-button>
		        <el-button type="primary" @click="cancel" :disabled="this.$global.isDisabled(19)">取消关闭</el-button>
	      	</el-col>
      		<el-col style="float:right;display:inline-block;width:50%;">
		        <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
		        </el-pagination>
      		</el-col>
    </PaginationBox>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
  import {addImportOnceCusInvoiceLogApi,getDeptmentListApi} from '../../../api/modules/settlement';
	import pagination  from '../../../common/mixins/pagination'
    export default {
    	mixins:[pagination],
        data() {
            return {
            	labelWidth:'100px',
              importInvoiceLogVisible:false,
              importSelectData:[],
              selectCostAmount:'0.00',
              invoiceAmount:'0.00',
              initSelectData:{},
              invoiceLogFrom:{
                invoiceApplicantId:'',//开票申请人id
                invoiceApplicantName:'',//开票申请人名称
                applyAmount:'',//开票申请金额
                invoiceType:'1',//开票类型
                invoiceTitle:'',//发票抬头
                invoiceApplyTime:'',//申请日期
                invoiceApplyNo:'',//申请单号
              },
              form:{
                orderNo:'',
                ordCustomerName:'',
                customerName:'',
                bookSpaceNo:'',
                subCode:'',
                cabinetNo:'',
                cabinetCostName:'',
                endDateStart:'',
                endDateEnd:'',
              },
            }
        },
        computed: {
        ...mapGetters([
          'onceCusNotInvoiceApplyLogList'
        ]),
        },
        methods: {
          ...mapActions([
            'getOnceCusNotInvoiceApplyLogList'
          ]),
          init(){
            this.invoiceAmount = this.invoiceLogFrom.applyAmount;
            this.getList();
            this.getChildCompany();
          },
          //获取列表数据
          getList(){
            this.pageHandler(this.form, this.getOnceCusNotInvoiceApplyLogList);
          },
          //子公司下拉框(初期化)
          getChildCompany(){
            getDeptmentListApi().then((res) => {
              let data = res.data;
              if (res.data.code === "1") {
                this.initSelectData =  data.data;
              }
            });
          },
          handleSelectionChange(val){
              this.selectCostAmount = 0;
              this.importSelectData=val;
              this.importSelectData.forEach((res)=>{
              this.selectCostAmount+=parseFloat(res.incomeAmount);
            });
            this.invoiceAmount = parseFloat(this.selectCostAmount)+parseFloat(this.invoiceLogFrom.applyAmount);
      		},
        	//完结时间
		    	handleStartDate(val){
			  	this.form.endDateStart=val;
	      	},
	      	handleEndDate(val){
	      		this.form.endDateEnd=val;
	      	},
          //引入费用
          confirmImport(){
            if(this.importSelectData !== 0){
              let importData = [];

              this.importSelectData.forEach(res=>{
                let param = {
                  cabinetId:res.cabinetId,
                  cabinetCostId:res.cabinetCostId,
                  invoiceApplicantId:this.invoiceLogFrom.invoiceApplicantId,
                  invoiceApplicantName:this.invoiceLogFrom.invoiceApplicantName,
                  invoiceApplyNo:this.invoiceLogFrom.invoiceApplyNo,
                  invoiceType:this.invoiceLogFrom.invoiceType,
                  applyAmount:this.invoiceAmount,
                };
                importData.push(param);
              });
              addImportOnceCusInvoiceLogApi({data:JSON.stringify(importData)}).then(res=>{
                if(res.data.success && res.data.code === '1'){
                  importData = [];
                  this.$parent.initList();
                  this.getList();
                  this.importInvoiceLogVisible = false;
                  this.$message({
                    message: '引入成功',
                    type: 'success'
                  });
                  return true;
                } else {
                  importData = [];
                  this.getList();
                  this.$parent.initList();
                  this.importInvoiceLogVisible = false;
                  this.$message({
                    message: '确认失败',
                    type: 'error'
                  });
                  return false;
                }
              })


            } else {
              this.$confirm('请选择一条数据')
            }
          },
          //搜索
          onSubmit(){
            this.getList()
          },
          //关闭窗口
          cancel(){
            this.importInvoiceLogVisible = false;
          },
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

<style>
	/*.v-modal{*/
		/*z-index:1999!important;*/
	/*}*/
</style>
