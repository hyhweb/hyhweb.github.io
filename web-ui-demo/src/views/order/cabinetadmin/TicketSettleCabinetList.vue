<template>
  <section>
    <ToolBarBox>

    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">

            <el-form-item label="客户" :label-width="labelWidth" prop="orgCode">
              <el-select clearable filterable v-model.trim="form.customerId" placeholder="请选择客户名称" class='control-width'>
                <el-option v-for="item in orderStatus.customerList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model.trim="form.bookSpaceNo" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="船名航次" :label-width="labelWidth" prop="voyageName">
              <el-input v-model.trim="form.voyageName" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model.trim="form.orderNo" class='control-width'></el-input>
            </el-form-item>

            <el-form-item class="combine-input" label="下单日期" :label-width="labelWidth" prop="createDateStart">
              <el-date-picker type="date" icon="" placeholder="选择开始日期" v-model.trim="form.createDateStart" @change="createDateStartChange"></el-date-picker>
              -
              <!--</el-form-item>-->
              <!--<label style="padding-right:0;padding-top:11px;">-</label>-->
              <!--<el-form-item label="" :label-width="labelWidth" prop="createDateEnd">-->
              <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="form.createDateEnd" @change="createDateEndChange"></el-date-picker>
            </el-form-item>

            <el-form-item label="业务员" :label-width="labelWidth" prop="salesmanName">
              <el-input v-model.trim="form.salesmanName" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
              <el-select clearable filterable v-model.trim="form.orgCode" placeholder="请选择子公司" class='control-width'>
                <el-option v-for="item in orderStatus.deptmentList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="报价港口" :label-width="labelWidth" prop="harborId">
              <el-select clearable filterable v-model.trim="form.harborId" placeholder="请选择报价港口" class='control-width'>
                <el-option v-for="item in orderStatus.harborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="收款申请单号" :label-width="labelWidth" prop="receivableNo">
              <el-input v-model.trim="form.receivableNo" class='control-width'></el-input>
            </el-form-item>


            <el-form-item label="结算状态" :label-width="labelWidth" prop="costStatus">
              <el-select clearable filterable v-model.trim="form.costStatus" placeholder="请选择结算状态" class='control-width'>
                <el-option v-for="item in costStatus" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

          </div>

          <div class="query-btns">
            <el-form-item>
              <el-button  type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button  @click="resetForm('form')">清空</el-button>
            </el-form-item>

          </div>
        </el-form>
      </form-box>
    </el-col>
      <el-col class="toolbar">
        <el-button-group>
          <el-button :disabled="selectData.length==0" v-if="!this.$global.isDisabled(117)" type="primary" size="small" @click="exportStatement">导出账单生成收款单</el-button>
          <el-button v-if="!this.$global.isDisabled(114)" type="primary" size="small" @click="requisitionDetail">对账单明细</el-button>
          <el-button v-if="!this.$global.isDisabled(108)" type="primary" size="small" @click="bookingNoteSettingHandler">订舱单扣货设置</el-button>
          <el-button  type="primary" size="small" @click="bookingNoteStatusHandler">订舱单柜状态</el-button>
        </el-button-group>
        <div style="float:right;margin-top:8px;margin-right:10px">
          已选金额(元)：<span style="color:red">{{selectAmount}}</span> &nbsp;&nbsp;
          总应收(元)：<span style="color:red">{{costAmount}}</span> &nbsp;&nbsp;
          已申请金额(元)：<span style="color:red">{{requisitionAmount}}</span> &nbsp;&nbsp;
          未申请金额(元)：<span style="color:red">{{notApplyingAmount}}</span>
        </div>
      </el-col>
    </ToolBarBox>
    <TableBox>
    <!--列表-->
    <el-col>
      <el-table border ref="table" :max-height="tableMaxHeight" highlight-current-row :data="ticketSettleCabinetPageList.data" stripe
      @selection-change="handleSelectionChange"
       @row-click="handleRowClick"
          >
          <el-table-column type="selection" v-model="selectData" fixed width="40">
        </el-table-column>

        <el-table-column prop="isDetainingCargo" label="状态" min-width="100" sortable align="center">
          <template scope="scope">
            <el-col>{{scope.isDetainingCargo?'扣货中':'正常'}}</el-col>
          </template>
        </el-table-column>

        <el-table-column prop="orderNo" label="订单号" min-width="180" sortable align="center">
        </el-table-column>

        <el-table-column prop="receivableRequisitionId" label="收款申请单号" min-width="150" sortable align="center">
        </el-table-column>

        <el-table-column prop="createDate" label="下单日期" min-width="180" sortable align="center">
        </el-table-column>

        <el-table-column prop="goodsName" label="品名" min-width="80" sortable align="center">
        </el-table-column>

        <el-table-column prop="customerName" label="下单客户" min-width="150" sortable align="center">
        </el-table-column>

        <el-table-column prop="salesmanName" label="业务员" min-width="80" align="center">
        </el-table-column>

        <el-table-column prop="harborName" label="港口" min-width="80" sortable align="center">
        </el-table-column>

        <el-table-column prop="harborName" label="地址" min-width="80" sortable align="center">
        </el-table-column>

        <el-table-column prop="shipCompanyName" label="船公司" min-width="180" sortable align="center">
        </el-table-column>

        <el-table-column prop="voyageName" label="船名航次" min-width="180" sortable align="center">
        </el-table-column>

        <el-table-column prop="bookSpaceNo" label="订舱单号" min-width="180" sortable align="center">
        </el-table-column>

        <el-table-column prop="cabinetType" label="箱型" min-width="130" sortable align="center">
        </el-table-column>

        <el-table-column prop="cabinetNo" label="箱号" min-width="130" sortable align="center">
        </el-table-column>

        <el-table-column prop="receivableStatusText"  label="结算状态" min-width="130" sortable align="center">
        </el-table-column>

        <el-table-column prop="costAmount" label="总计" min-width="130" sortable align="center">
        </el-table-column>

        <!--<el-table-column prop="requisitionAmount" label="已申请金额" min-width="130" sortable align="center">-->
        <!--</el-table-column>-->

        <!--<el-table-column prop="notApplyingAmount" label="未申请金额" min-width="130" sortable align="center">-->
        <!--</el-table-column>-->

        <el-table-column label="操作" fixed="right" align="center" width="100">
          <template scope="scope">
            <el-button size="small" type="primary" :disabled="isDisabled(113)" @click="goCusDetails(scope.row)">费用详情</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-col>
    </TableBox>
   <PaginationBox>
    <el-col>
    <!--  <span style="padding-top: 6px;display: inline-block;" >集装箱统计：
      <span v-for="item in CabinetStatistics" class="cab-total">{{item}}</span>

      </span>-->
      <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
    </PaginationBox>
    <CostList ref="costList" ></CostList>
    <RequisitionList ref="requisitionList" :requisitionDetailId="requisitionDetailId"  @on-close="requisitionListShow=false" @on-fresh="onSubmit" ></RequisitionList>
     <BookingNoteSetting v-if="lazySwitch" ref="bookingNoteSetting"></BookingNoteSetting>
     <BookingNoteStatus v-if="lazySwitch" ref="bookingNoteStatus"></BookingNoteStatus>
  </section>
</template>
<style>
  .cab-total{
    padding: 5px 10px;
    display: inline-block;
    background-color: #0283e6;
    color: white;
    margin-left: 5px;
    font-size: 12px;
  }
</style>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';
  import download from '../../../common/mixins/download';
  import {getExportStatementApi,getTicketSettleCabinetCostAmountApi} from '../../../api/modules/order'
  import CostList from './CostList'
  import RequisitionList from './RequisitionList'
  import Qs from 'qs';
  import ElCol from "element-ui/packages/col/src/col";
  import BookingNoteSetting from '../orderadmin/BookingNoteSetting'
  import BookingNoteStatus from '../orderadmin/BookingNoteStatus'
  export default {
    mixins: [ pagination, download ],
    components: {ElCol,CostList,BookingNoteSetting,BookingNoteStatus,RequisitionList},
    data() {
      return {
        classButton:{},
        labelWidth: '85px',
        newFormVisible: false,
        editLoading: false,
        editFormVisible: false,
        selectData: [],
        orderStatusSelect:[],
        CabinetStatistics:[],
        selectAmount:'0.00',//已选金额
        costAmount:'0.00',//应收金额
        requisitionAmount:'0.00',//申请金额
        notApplyingAmount:'0.00',//未申请金额
        rowData: {},
        statusToBtn: {
          edit: false,
          cancel: false,
          audit: false,
          cost: false,
        },
        form: {
          customerName:'',//客户名称
          customerId:'',//客户id
          bookSpaceNo:'',//订舱单号
          voyageName:'',//船名航次
          orderNo:'',//订单号
          createDateStart:'',//下单起始时间
          createDateEnd:'',//下单截止时间
          salesmanName:'',//业务员名称
          orgCode:'',//子公司
          harborId:'',//报价港口
          costStatus:'',//结算状态
          receivableNo:''//收款申请单号

        },
        costStatus:[
          {text:'已收款',value:2},
          {text:'未收款',value:0}
        ],
        requisitionDetailId:'',
        requisitionListShow:false
      };
    },
    computed: {
      ...mapGetters([
        'ticketSettleCabinetPageList','orderStatus'
      ]),

    },
    methods: {
      ...mapActions([
        'getTicketSettleCabinetPageList', 'getOrderStatus'
      ]),
      receivableNumFormat(row, column, cellValue){
          if(cellValue==0){
              return this.costStatus[0].text
          }else{
              return this.costStatus[1].text
          }
      },
      init() {
//        this.getList();
        this.$store.dispatch('getOrderStatus').then(res=>{
          this.removeCancelStatus(res.data.orderStatusList)
        });
        this.$global.recorderTableData(this);
      },
      	//订舱单扣货设置
		bookingNoteSettingHandler(){
			if(this.selectData.length != 1){
				this.$message({
						message:"请先选择一条数据",
						type:'warning'
					});
				return;
			}
			this.$refs.bookingNoteSetting.dialogVisible = true;
			this.$refs.bookingNoteSetting.form.bookSpaceNo = this.selectData[0].bookSpaceNo
			this.$refs.bookingNoteSetting.init()


		},
		//订舱单柜状态
		bookingNoteStatusHandler(){
			if(this.selectData.length != 1){
				this.$message({
						message:"请先选择一条数据",
						type:'warning'
					});
				return;
			}
			this.$refs.bookingNoteStatus.dialogVisible = true;
			this.$refs.bookingNoteStatus.form.bookSpaceNo = this.selectData[0].bookSpaceNo
			this.$refs.bookingNoteStatus.init()
		},
      // 获取下单开始日期
      createDateStartChange(val) {
        this.form.createDateStart = val;
      },
      // 获取下单结束日期
      createDateEndChange(val) {
        this.form.createDateEnd = val;
      },
      //去除订单取消状态
      removeCancelStatus(orderStatusList){
          if(orderStatusList){
              Object.assign( this.orderStatusSelect,orderStatusList);
//            this.orderStatusSelect = orderStatusList;
           // this.orderStatusSelect.pop(); //去掉最后一位
          }
      },
      // 获取要求装送货开始日期
      requireDateStartChange(val) {
        this.form.requireDateStart = val;
      },
      // 获取行程开始日期
      endDateStartChange(val) {
        this.form.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form.endDateEnd = val;
      },
      exportStatement(){
        this.$confirm('确认要导出对账单信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          const param = {
            customerName: "",
            customerId:"",
            cabinetIds:"",
            receivableRequisitionId:"",
          };
          let customerIds = [];
          let receivableRequisitionIds = [];
          let cabinetIds = [];
          this.selectData.forEach((item)=>{
            if(item.cabinetId !== null){
              cabinetIds.push(item.cabinetId);
            }
            if(item.receivableRequisitionId !== null && item.receivableRequisitionId !== undefined){
              receivableRequisitionIds.push(item.receivableRequisitionId);
            }
            if(item.customerId !== null && item.customerId !== undefined){
              customerIds.push(item.customerId)
            }
          });
          //验证导出参数
          if(!this.checkExportParams(this.selectData,receivableRequisitionIds,customerIds))return;

//          param.notReceivableCabinetIds = param.notReceivableCabinetIds.filter(t=>t!== undefined && t!==null).toString();
//          param.cabinetIds = this.selectData.map(item => item.cabinetId).toString();

          param.cabinetIds = cabinetIds.toString();
          param.customerName =  this.selectData[0].customerName;
          param.customerId = this.selectData[0].customerId;
          param.receivableRequisitionId = receivableRequisitionIds[0];
          this.download({
            params: `Authorization=Bearer ${token}&data=${encodeURI(JSON.stringify(param))}`,
            handle: getExportStatementApi,
            callback () {
              this.getList()
            }
          });
        });
      },

      checkExportParams(selectData,arr,customerIds){
          let requisition = selectData.filter(s=>s.receivableRequisitionId!==null);
          if(arr.length === selectData.length){
            this.$message({
              message:"所选择的数据已经生成过对账单,请重新选择",
              type:'warning'
            });
            return false;
          }

          if (arr.length > 1 && !this.isRepeat(arr)) {
            this.$message({
              message:"所选择的箱子信息有不同的收款申请单号，请重新选择！",
              type:'warning'
            });
            return false;
          }

          if(undefined !==requisition[0] && requisition[0].requisitionStatus!==0){
            this.$message({
              message: '所选择的数据申请单已不是申请中状态,请重新选择',
              type: 'error'
            });
            return false;
          }

          if(selectData.length > 1 && !this.isRepeat(customerIds)){
            this.$message({
              message: '所选择的数据不是同一个客户,请重新选择',
              type: 'warning'
            });
            return false;
          }

          return true;

      },

      requisitionDetail(){
        if(this.selectData.length != 1){
          this.$message({
            message:"请先选择一条数据",
            type:'warning'
          });
          return;
        }
        if(!this.selectData[0].receivableRequisitionId){
          this.$message({
            message:"箱子对账单不存在",
            type:'warning'
          });
          return;
        }
        console.log(this.selectData[0].receivableRequisitionId);
         this.$refs.requisitionList.receivableDetailId=this.selectData[0].receivableRequisitionId+'';
         this.$refs.requisitionList.dialogVisible = true;
          this.$refs.requisitionList.init()
      },
      // 获取要求装送货结束日期
      requireDateEndChange(val) {
        this.form.requireDateEnd = val;
      },
      // 获取列表选中的数据
      handleSelectionChange(val) {
        this.selectAmount = 0;
        this.selectData = val;
        this.selectData.forEach((res)=>{
          this.selectAmount+=parseFloat(res.costAmount);
        });
        if (this.selectData.length == 0) {
          this.statusToBtn = {
            edit: false,
            cancel: false,
            audit: false,
            cost: false,
          };
          return;
        }

      },
      //验证是否有不同的申请单号
      isRepeat(arr){
        var hash = {};
        for(var i in arr) {
            if(hash[arr[i]])
              return true;
            hash[arr[i]] = true;

        }
        return false;
      },
      // 获取列表
      getList() {
        this.getAmount(this.form);
        this.pageHandler(this.form, this.getTicketSettleCabinetPageList);
//        this.getCabinetTypeNumberList(this.form).then((res)=>{
//          this.CabinetStatistics = res.data.split(',');
//        })
      },
      // 查询
      onSubmit() {
        this.getList(true);
      },

      //获取费用总计
      getAmount(form){
        getTicketSettleCabinetCostAmountApi(form).then(res=>{
            if(res.data.data === null || res.data.data === ""){
                this.costAmount = '0.00';//应收金额
                this.requisitionAmount = '0.00';//申请金额
                this.notApplyingAmount = '0.00';//未申请金额
                return;
            }
            let amount = res.data.data;
            this.costAmount = amount.costAmount;
            this.requisitionAmount = amount.requisitionAmount;
            this.notApplyingAmount = amount.notApplyingAmount;
        });
      },
      resetForm() {
        for(var o in this.form){
            this.form[o] = '';
        }
      },
      goCusDetails(row){
        this.$refs.costList.form.cabinetId=row.cabinetId
        this.$refs.costList.dialogVisible = true
        this.$refs.costList.init()
      }
    },
    created() {
      console.log("CabinetList.vue created");
//      this.init();
    },
    mounted() {
      this.$nextTick(function () {
        this.init();
      });
    },
    beforeDestroy(){
    }
  };

</script>

<style>
  @import '../../../styles/custom-theme/query-modal-lg.css';

</style>
