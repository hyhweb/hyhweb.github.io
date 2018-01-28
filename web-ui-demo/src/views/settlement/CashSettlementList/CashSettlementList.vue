<template>
	<section>
		<el-col>
			<ToolBarBox>
				<form-box title="查询" ref="formbox">
					<el-form :inline="true" class="query-modal query-modal-sm"  :model="cashForm" ref="cashForm" @submit.prevent="onSubmit">
						<div class="query-params">
							<el-form-item label="子公司" :label-width="labelWidth" prop="subCompanyCode">
	           				 	<el-select  @change="handleOrderSelect" v-model="cashForm.subCompanyCode" class='control-width' clearable filterable placeholder="请选择">
	                  				<el-option v-for="item in initData.childCompanys"  :key="item.code" :label="item.value" :value="item.code"></el-option>
	                			</el-select>
	              			</el-form-item>
							<el-form-item label="物流公司" :label-width="labelWidth" prop="logisticsCompanyCode">
	           				 	<el-select v-model="cashForm.logisticsCompanyCode" clearable class='control-width' filterable placeholder="请选择">
	                  				<el-option v-for="(item, index) in logisticsList"  :key="item.id" :label="item.text" :value="item.value"></el-option>
	                			</el-select>
	              			</el-form-item>
							<el-form-item label="申请时间" :label-width="labelWidth" prop="requestSettleTimeStart" style="margin-right:2px">
	          					<el-date-picker type="date" icon="" placeholder="年/月/日" v-model="cashForm.requestSettleTimeStart" @change="requestSettleTimeStartChange"
	                              style="width:150px"></el-date-picker>
	            			</el-form-item>
	            			<label style="padding-right:0;padding-top:11px;">-</label>
	            			<el-form-item label="" :label-width="labelWidth" prop="requestSettleTimeEnd" style="width:150px">
	              				<el-date-picker type="date" placeholder="年/月/日" v-model="cashForm.requestSettleTimeEnd" @change="requestSettleTimeEndChange"
	                              style="width:150px"></el-date-picker>
	            			</el-form-item>
							<el-form-item label="司机" :label-width="labelWidth">
				                <el-autocomplete
				                  class="control-width"
				                  v-model="trailerName"
				                  :fetch-suggestions="querySearchTrailer"
				                  placeholder="请输入车牌号"
				                  @select="handleSelectTrailer"
				                  :icon="trailerIcon"
				                  :on-icon-click="handCloseTralier"
				                  :trigger-on-focus="true"></el-autocomplete>
			              	</el-form-item>
							<el-form-item label="结算单号" :label-width="labelWidth">
	                			<el-input v-model.trim="cashForm.cashSettlementNo" class='control-width'></el-input>
	              			</el-form-item>
	              			<el-form-item v-if="cashStatus=='already' || cashStatus=='all'" label="付款时间" :label-width="labelWidth" prop="payTimeStart" style="margin-right:2px">
	          					<el-date-picker type="date" icon="" placeholder="年/月/日" v-model="cashForm.payTimeStart" @change="payTimeStartChange"
	                              style="width:150px"></el-date-picker>
	            			</el-form-item>
	            			<label v-if="cashStatus=='already' || cashStatus=='all'" style="padding-right:0;padding-top:11px;">-</label>
	            			<el-form-item v-if="cashStatus=='already' || cashStatus=='all'" label="" :label-width="labelWidth" prop="payTimeEnd" style="width:150px">
	              				<el-date-picker type="date" placeholder="年/月/日" v-model="cashForm.payTimeEnd" @change="payTimeEndChange"
	                              style="width:150px"></el-date-picker>
	            			</el-form-item>
							<el-form-item  label="行程结束日期" :label-width="labelWidth" prop="endDateStart" style="margin-right:2px">
	          					<el-date-picker type="date" icon="" placeholder="年/月/日" v-model="cashForm.endDateStart" @change="endDateStartChange"
	                              style="width:150px"></el-date-picker>
	            			</el-form-item>
	            			<label style="padding-right:0;padding-top:11px;">-</label>
	            			<el-form-item label="" :label-width="labelWidth" prop="endDateEnd" style="width:150px">
	              				<el-date-picker type="date" placeholder="年/月/日" v-model="cashForm.endDateEnd" @change="endDateEndChange"
	                              style="width:150px"></el-date-picker>
	            			</el-form-item>
	          			</div>
						<div class="query-btns">
            				<el-form-item>
          						<el-button type="primary" @click="getList" icon="search">查询</el-button>
            				</el-form-item>
            				<el-form-item>
              				<el-button type="success" @click="resetForm" icon="setting">清空</el-button>
            				</el-form-item>
          				</div>
					</el-form>
				</form-box>
			</ToolBarBox>
			<TableBox>
				<el-col :span="24"  class="toolbar">
					<el-button type="primary" icon="arrow-right" size="small" @click="showCashApplication" v-if="cashStatus=='dispatch'" :disabled="multipleSelection.length !== 1 || this.$global.isDisabled(209)">调度核单</el-button>
					<el-button type="primary" icon="arrow-right" size="small" v-if="cashStatus=='finance'" :disabled="multipleSelection.length !== 1 || this.$global.isDisabled(209)" @click="showFinance">子公司财务核单</el-button>
					<el-button type="primary" icon="arrow-right" size="small" v-if="cashStatus=='inspector'" :disabled="multipleSelection.length !== 1 || this.$global.isDisabled(209)" @click="showInspector">子公司总监核单</el-button>
					<el-button type="primary" icon="arrow-right" size="small" v-if="cashStatus=='cashier'" :disabled="multipleSelection.length <= 1 || this.$global.isDisabled(210)" @click="showCashiers">总公司出纳转账(批量)</el-button>
					<el-button type="primary" icon="arrow-right" size="small" v-if="cashStatus=='cashier'" :disabled="multipleSelection.length !== 1 || this.$global.isDisabled(210)" @click="showCashier">总公司出纳转账(单笔)</el-button>
					<el-button type="primary" icon="arrow-down" size="small" v-if="cashStatus=='cashier' || cashStatus=='already'"  :disabled="multipleSelection.length !== 1 || this.$global.isDisabled(208)" @click="showPrint">打印审核单</el-button>
					<el-button type="primary" size="small" icon="document" @click="exportBill" :disabled="multipleSelection.length < 1 || this.$global.isDisabled(206)">导出</el-button>
					<el-button type="primary" size="small" icon="view"  :disabled="multipleSelection.length !== 1 || this.$global.isDisabled(207)" @click="showView">查看</el-button>
				</el-col>
				<el-col>
					<el-table
			          :data="cashSettlementListData"
			          :max-height="tableMaxHeight"
			          ref="table"
			          border
			          @selection-change="handleSelectionChange"
			          highlight-current-row
			          @row-click="handleRowClick"
			          stripe>
						<el-table-column type="selection" align="center" width="30">
			        	</el-table-column>
						<el-table-column
				          prop="subCompanyName"
				          align="center"
				          label="子公司" width="150">
        				</el-table-column>
						<el-table-column
				          prop="logisticsCompanyName"
				          align="center"
				          label="物流公司" width="160">
			          	</el-table-column>
						<el-table-column
				          prop="driverName"
				          align="center"
				          label="司机" width="120">
        				</el-table-column>
						<el-table-column
				          prop="cashSettlementNo"
				          align="center"
				          label="结算单号" width="120">
        				</el-table-column>
						<el-table-column
				          prop="totalAmount"
				          align="center"
				          label="运费总金额" width="80">
        				</el-table-column>
						<el-table-column
						  v-if="cashStatus!='cashier'"
				          prop="numberOfCabinet"
				          align="center"
				          label="箱数量" width="100">
        				</el-table-column>
						<el-table-column
						  v-if="cashStatus=='cashier'"
				          prop="bankName"
				          align="center"
				          label="开户银行" width="100">
        				</el-table-column>
						<el-table-column
						  v-if="cashStatus=='cashier'"
				          prop="accountHolder"
				          align="center"
				          label="开户人" width="100">
        				</el-table-column>
						<el-table-column
						  v-if="cashStatus=='cashier'"
				          prop="accountOpenSite"
				          align="center"
				          label="开户网点" width="100">
        				</el-table-column>
						<el-table-column
				          prop="requestSettleTime"
				          align="center"
				          label="申请时间" width="100">
        				</el-table-column>
						<el-table-column
				          prop="settleStatusText"
				          align="center"
				          label="结算状态" width="100">
        				</el-table-column>
						<el-table-column
				          prop="settleTypeText"
				          align="center"
				          label="结算方式" width="100">
        				</el-table-column>
						<el-table-column
						  v-if="cashStatus=='already' || cashStatus=='all'"
				          prop="payTime"
				          align="center"
				          label="付款时间" width="100">
        				</el-table-column>
						<el-table-column
				          prop="belongToMonth"
				          align="center"
				          label="所属月份" width="100">
        				</el-table-column>
		          	</el-table>
				</el-col>
			</TableBox>
			<PaginationBox>
				<el-col>
					<span class="cl">集装箱数量 * {{statistics.totalNumberOfCabinets}}</span>
					<span class="cl">结算单数量 * {{statistics.totalNumberOfStatement}}</span>
					<span class="cl">运费总金额 * {{statistics.totalAmountOfAllStatement}}</span>
	              	<el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
	              	</el-pagination>
	            </el-col>
      		</PaginationBox>
		</el-col>
    <!--组件begin-->
    <CashApplication v-model="cashApplicationVisible" ref="cashApplication" :data.sync="cashApplicationForm" :allInfo="allInfo" :auditButton="auditButton" :bankList.sync="initData.bankNames" @submitSuccess="getList"></CashApplication>
    <Cashier ref="cashier"></Cashier>
    <!--组件end-->
	</section>
</template>
<style scoped  lang="scss">
	@import '../../../styles/custom-theme/query-modal.css';
	.query-params .query-modal-sm{
 		width: 240px;
    	margin-right: 0px;
	}
	.cl {
	    padding: 5px 10px;
	    display: inline-block;
	    background-color: #0283e6;
	    color: white;
	    margin-left: 5px;
	    font-size: 12px;
  	}
</style>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import {getListByStrCode,getStatistics,exportBill} from '../../../api/modules/settlement'
  import util from '../../../common/js/util';
  import pagination  from '../../../common/mixins/pagination';
  import CashApplication  from './CashApplication.vue';
  import Cashier  from './Cashier.vue';
	export default{
		mixins: [pagination],
        components: {
          CashApplication,Cashier
        },
		props:["cashStatus","initData"],
	 	data() {
		 	return{
		 		allInfo:false,
        auditButton: false,
        		cashApplicationForm: {},
        		cashApplicationVisible: false,
		 		statistics:{},
		 		cashStatusName:{"dispatch":4,"finance":5,"inspector":6,"cashier":7,"already":8,"all":null},
		 		// applyVisible: false,
		 		// applyDto: {},
				trailerName: '',
				logisticsList:[],
        		trailerIcon: '',
		 		labelWidth: '90px',
		 		cashForm:{
		 			subCompanyCode:'',//子公司
		 			logisticsCompanyCode:'',//物流公司
		 			driverId:'',//司机
		 			requestSettleTimeStart:'',
		 			requestSettleTimeEnd:'',//申请时间
		 			cashSettlementNo:'',//结算单号
		 			payTimeStart:'',
		 			payTimeEnd:'',//付款时间
		 			endDateStart:'',
		 			endDateEnd:'',
		 			settleStatus:'',
		 		},
	 		 	multipleSelection: [],
	 		 	closeIcon: 'circle-close',
		 	}
	 	},
 	 	watch: {
			cashStatus: function () {
          		this.getList();
        	},
			trailerName: function () {
        		if(!this.trailerName){
          			this.cashForm.driverId=null;
          			this.trailerIcon='';
        		}else {
          			this.trailerIcon=this.closeIcon;
        		}
      		},
 	 	},
		computed: {
      		...mapGetters([
        		'settlementList',
      		]),
			cashSettlementListData(){
      			if(this.settlementList == null){
          			return [];
      			}else{
          			return this.settlementList.data;
      			}
    		}
    	},
	 	methods:{
 			...mapActions([
        		'getSettlementList',
      		]),
      		// 导出
      		exportBill(){
      			if(this.checkMultipleSelection()){
					this.$confirm('确认要导出任务吗?', '提示', {
            			confirmButtonText: '确定',
			            cancelButtonText: '取消',
			            type: 'warning'
          			}).then(() => {
			            const token = sessionStorage.getItem('id_token');
			            var cashSettlementNos = this.multipleSelection.map(cashSettlementNos => cashSettlementNos.cashSettlementNo).join(",");
			            var settleStatus = this.cashStatusName[this.cashStatus]
			            var paramToken = 'Bearer ' + token;
			            var params = 'Authorization=' + paramToken + "&cashSettlementNos=" + cashSettlementNos + "?" + settleStatus;
            			exportBill(params);
          			});
      			}
      		},
      		handleOrderSelect(strCode){
      			if (strCode) {
	      			let param = {strCode: strCode};
	      			getListByStrCode(param).then((res) => {
	      				if (res.data.code==="1") {
	      					this.logisticsList = res.data.data.logisticsList
	      				}
	      			})
      			}
      		},
			handCloseTralier(){
        		this.trailerName='';
      		},
			handleSelectTrailer(item){
        		this.cashForm.driverId=item.id;
      		},
			querySearchTrailer(queryString, cb) {
        		let data = this.initData.plateNumbers;
        		var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
			createFilter(queryString) {
        		return (item) => {
          			return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
        		};
      		},
      		getList(){
      			this.cashForm.settleStatus = this.cashStatusName[this.cashStatus];
      			this.pageHandler(this.cashForm, this.getSettlementList)
      			getStatistics(this.cashForm).then((res) =>{
					let data = res.data;
          			if(data.code==1){
            			this.statistics = data.data
          			}
      			})
      		},
			handleSelectionChange(val){
        		this.multipleSelection=val;
      		},
	 		requestSettleTimeStartChange(val){
	 			this.cashForm.requestSettleTimeStart = val;
	 		},
	 		requestSettleTimeEndChange(val){
	 			this.cashForm.requestSettleTimeEnd = val;
	 		},
			payTimeStartChange(val){
	 			this.cashForm.payTimeStart = val;
	 		},
	 		endDateStartChange(val){
	 			this.cashForm.endDateStart = val;
	 		},
	 		endDateEndChange(val){
	 			this.cashForm.endDateEnd = val;
	 		},
	 		payTimeEndChange(val){
	 			this.cashForm.payTimeEnd = val;
	 		},
	 		// 选择记录
			checkMultipleSelection(){
        		if(!this.multipleSelection || this.multipleSelection.length == 0){
          			this.$message('请先选择记录');
          			return false;
    			}
        		return true;
      		},
      		// 子公司财务核核单
      		showFinance(){
//            if(this.multipleSelection[0].settleStatus == 6 || this.multipleSelection[0].settleStatus == 7 || this.multipleSelection[0].settleStatus == 8){
              this.$refs.cashApplication.payModeVisible = false;
//            }
				this.allInfo = true;
				this.auditButton = true;
				this.$refs.cashApplication.auditButtonText = "子公司财务核单";
			  	this.cashApplicationVisible = true;
			  	this.cashApplicationForm = this.multipleSelection[0];
			  	this.$refs.cashApplication.settleStatus =  5;
      		},
      		// 子公司总监核单
      		showInspector(){
//            if(this.multipleSelection[0].settleStatus == 6 || this.multipleSelection[0].settleStatus == 7 || this.multipleSelection[0].settleStatus == 8){
              this.$refs.cashApplication.payModeVisible = true;
//            }
				this.allInfo = true;
            this.auditButton = true;
            this.$refs.cashApplication.auditButtonText = "子公司总监核单";
			  	this.cashApplicationVisible = true;
			  	this.cashApplicationForm = this.multipleSelection[0];
			  	this.$refs.cashApplication.settleStatus =  6;
      		},

      		// 批量转账
      		showCashiers(){
      			if (this.checkMultipleSelection()) {
      				this.$refs.cashier.cashierVisible = true;
      				this.$refs.cashier.singular = this.multipleSelection.length;
      				this.$refs.cashier.form.ids = this.multipleSelection.map(el => el.id).join(",");
      				var num = 0;
      				this.multipleSelection.forEach(function(el){
      					num+=Number(el.totalAmount)
      				})
      				this.$refs.cashier.totals = num;
					this.$refs.cashier.examine = true;
					this.$refs.cashier.examinesign = true;
          			this.$refs.cashier.examinesss = false;
          			this.$refs.cashier.titles = '总公司出纳转账（批量）'
      			}
      		},
      		// 打印审核单
      		showPrint(){
				this.allInfo = true;
				this.auditButton = true;
				this.$refs.cashApplication.auditButtonText = "打印";
			  	this.cashApplicationVisible = true;
			  	this.cashApplicationForm = this.multipleSelection[0];
      		},
      		// 单笔转账
      		showCashier(){
//            if(this.multipleSelection[0].settleStatus == 6 || this.multipleSelection[0].settleStatus == 7 || this.multipleSelection[0].settleStatus == 8){
              this.$refs.cashApplication.payModeVisible = true;
//            }
      			this.allInfo = true;
            	this.auditButton = true;
            	this.$refs.cashApplication.auditButtonText = "总公司出纳转账";
            	this.cashApplicationVisible = true;
		  	  	this.cashApplicationForm = this.multipleSelection[0];
      		},

      		// 子公司调度核单
			showCashApplication(){
				this.allInfo = false;
			  	this.cashApplicationVisible = true;
			  	this.cashApplicationForm = this.multipleSelection[0];
			  	this.$refs.cashApplication.settleStatus =  4;
      		},
      		// 查看
      		showView(){
			      if(this.multipleSelection[0].settleStatus == 6 || this.multipleSelection[0].settleStatus == 7 || this.multipleSelection[0].settleStatus == 8){
			        this.$refs.cashApplication.payModeVisible = true;
            } else {
              this.$refs.cashApplication.payModeVisible = false;
            }
      			this.allInfo = true;
      			this.auditButton = false;
				    this.cashApplicationVisible = true;
			  	  this.cashApplicationForm = this.multipleSelection[0];
      		},
	 		// 清空
	 		resetForm(){
	 			this.logisticsList=[];
	 			this.trailerName='';
				this.cashForm = {
					subCompanyCode:'',//子公司
		 			logisticsCompanyCode:'',//物流公司
		 			driverId:'',//司机
		 			requestSettleTimeStart:'',
		 			requestSettleTimeEnd:'',//申请时间
		 			cashSettlementNo:'',//结算单号
		 			payTimeStart:'',
		 			payTimeEnd:'',//付款时间
		 			cashStatus:'',
					endDateStart:'',
		 			endDateEnd:'',
				}
	 		},
	 	},
		mounted(){
	      	this.$nextTick(function () {
	        	this.getList();
	      	});
	    }
	}
</script>
