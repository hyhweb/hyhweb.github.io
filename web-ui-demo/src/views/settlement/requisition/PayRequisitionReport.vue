<template>
  <section>
    <!--应付杂费管理-->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="子公司" :label-width="labelWidth" prop="subCode">
              <el-select
                clearable
                filterable
                default-first-option
                @input="selectChild"
                v-model="form.subCode" placeholder="请选择子公司" class='control-width'>
                <el-option
                  v-for="item in initChild.deptmentList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="费用类型" prop="costType" :label-width="labelWidth">
              <el-select
                clearable
                filterable
                multiple
                default-first-option
                @change="changeCostType"
                v-model="form.costTypeList" placeholder="请选择费用类型" class='control-width'>
                <el-option
                  v-for="item in initCostType.costTypes"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="物流公司" :label-width="labelWidth" prop="logisticsCode">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.logisticsCode" placeholder="请选择物流公司" class='control-width'>
                <el-option
                  v-for="item in initLogistic.logisticsList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对象类型" :label-width="labelWidth" prop="objType">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.objType" placeholder="请选择对象类型" class='control-width'>
                <el-option v-for="item in objType"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="应付对象" :label-width="labelWidth" prop="payObj">
              <el-input v-model="form.payObj" placeholder="请输入应付对象" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="任务类型" :label-width="labelWidth" prop="transType">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.transType" placeholder="请选择任务类型" class='control-width'>
                <el-option v-for="item in transType"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="申请单编号(总子)" :label-width="labelWidth" prop="payChildReqNo">
              <el-input v-model="form.payChildReqNo" placeholder="请输入申请单编号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="申请单编号(子物)" :label-width="labelWidth" prop="payLogisticsReqNo">
              <el-input v-model="form.payLogisticsReqNo" placeholder="请输入申请单编号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="申请单编号(杂费)" :label-width="labelWidth" prop="payReqNo">
              <el-input v-model="form.payReqNo" placeholder="请输入申请单编号" class='control-width'></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="付款状态(总子)" :label-width="labelWidth" prop="payChildStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.payChildStatus" placeholder="请选择付款状态" class='control-width'>
                <el-option v-for="item in payStatus"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="付款状态(子物)" :label-width="labelWidth" prop="payLogisticsStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.payLogisticsStatus" placeholder="请选择付款状态" class='control-width'>
                <el-option v-for="item in payStatus"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款状态(杂费)" :label-width="labelWidth" prop="payStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.payStatus" placeholder="请选择付款状态" class='control-width'>
                <el-option v-for="item in payStatus"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="行程结束日期" :label-width="labelWidth" prop="startDate" >
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.startDate" @change="startDateChange" ></el-date-picker>
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate"  @change="endDateChange"></el-date-picker>
            </el-form-item>
          </div>
          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" icon="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>

    <!--功能按钮-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" icon="document" @click="exportExcel" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        总应收(元)：<span style="color:red">{{sumIncomeAmount}}</span>&nbsp;&nbsp;
        总应付(元)：<span style="color:red">{{sumPayAmount}}</span>&nbsp;&nbsp;
    <!--    总子(元)：<span style="color:deeppink">{{sumPayChildAmount}}</span>&nbsp;&nbsp;
        子物(元)：<span style="color:blue">{{sumPayLogisticsAmount}}</span>
        总杂费(元)：<span style="color:blueviolet">{{sumIncidentalAmount}}</span>-->
      </div>
    </el-col>

    <!--查询结果一览-->
    <el-col>
      <el-table
        ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" :data="payRequisitionReportList.data" stripe>
        <el-table-column type="selection" fixed width="50">
        </el-table-column>
        <el-table-column
          prop="childCompany"
          label="子公司" width="100">
        </el-table-column>
        <el-table-column
          prop="hangCompany"
          label="物流公司" width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束日期" width="100">
        </el-table-column>
        <el-table-column
          prop="orderTypeText"
          label="任务类型" width="100">
        </el-table-column>
        <el-table-column
          prop="isInvoiceText"
          label="订单模式" width="100">
        </el-table-column>
        <el-table-column
          prop="objectText"
          label="对象类型" width="100">
        </el-table-column>
        <el-table-column
          prop="payObject"
          label="应付对象" width="100">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="100">
        </el-table-column>
        <el-table-column
          prop="bookSpaceNo"
          label="订舱单号" width="100">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
        </el-table-column>
        <el-table-column
          prop="costName"
          label="费用类型" width="100">
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="应收金额" width="100">
        </el-table-column>
        <el-table-column
          prop="payAmount"
          label="应付金额" width="100">
        </el-table-column>
        <el-table-column
          prop="payChildReqNo"
          label="(总子)编号" width="100">
        </el-table-column>
        <el-table-column
          prop="payChildStatusText"
          label="(总子)状态" width="100">
        </el-table-column>
        <el-table-column
          prop="payChildAmount"
          label="(总子)金额" width="100">
        </el-table-column>

        <el-table-column
          prop="payLogisticsReqNo"
          label="(子物)编号" width="100">
        </el-table-column>
        <el-table-column
          prop="payLogisticsStatusText"
          label="(子物)状态" width="100">
        </el-table-column>
        <el-table-column
          prop="payLogisticsAmount"
          label="(子物)金额" width="100">
        </el-table-column>
        <el-table-column
          prop="payReqNo"
          label="(杂费)编号" width="100">
        </el-table-column>
        <el-table-column
          prop="payStatusText"
          label="(杂费)状态" width="100">
        </el-table-column>
        <el-table-column
          prop="incidentalAmount"
          label="杂费金额" width="100">
        </el-table-column>
      </el-table>
    </el-col>
    <!--分页-->
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

  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getPayRequisitionReportListExcelApi, getDeptmentListApi,getLogisticListApi}from '../../../api/modules/settlement';
  import {getPayRequisitionReportSumAmountApi,getCostTypeCodeListApi,getCostTypeApi} from '../../../api/modules/settlement';
  import Qs from 'qs';
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '150px',
        labelWidth2: '110px',
        labelWidth3: '100px',
        selectData: [],
        initData: {},
        initChild:{},
        costTypeCodeList:{},
        initLogistic:{},
        sumIncomeAmount:0.00,
        sumPayAmount:0.00,
        sumIncidentalAmount:0.00,
        sumPayChildAmount:0.00,
        sumPayLogisticsAmount:0.00,
        initCostType:'',
        form: {
          orderNo: '',// 子公司
          bookSpaceNo: '',  //订单号
          cabinetNo: '',  //箱号
          startDate: '',//起始日期
          endDate: '',// 结束日期
          subCode: '',// 状态
          Authorization:'',//认证token
          logisticsCode: '',
          payObj: '',
          objType: '',
          transType: '',
          isInvoice: '',
          payStatus: '',
          payReqNo: '',
          payChildStatus: '',
          payChildReqNo: '',
          payLogisticsStatus: '',
          payLogisticsReqNo: '',
          endDateStart:'',
          endDateEnd:'',
          costType:{},
          costTypeList:[],
        },
        //[任务类型]下拉框
        transType: [
          {text: '装货', value: 1},
          {text: '送货', value: 2},
        ],
        //[物流公司]下拉框
        logisticsCode: [
          {text: '洋浦安速达物流有限公司', value: 1},
          {text: '广州市凯懿达物流有限公司', value: 2},
        ],
        //[订单模式]下拉框
        isInvoice: [
          {text: '自营', value: 1},
          {text: '他营', value: 0},
        ],
        //[付款状态]下拉框
        payStatus: [
          {text: '未申请', value: 0},
          {text: '待付款', value: 1},
          {text: '已付款', value: 2},
        ],
        //[对象类型]下拉框
        isCheck: [
          {text: '司机', value: 1},
          {text: '办单员', value: 2},
          {text: '码头', value: 3},
        ],
        objType: [
          {text: '司机', value: 1},
          {text: '办单员', value: 2},
          {text: '码头', value: 3},
          {text: '船公司', value: 4},
          {text: '子公司', value: 7},
          {text: '物流公司(不保底)', value: 8},
          {text: '物流公司(保底)', value: 9}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'payRequisitionReportList', 'payRequisitionReportSumAmount'
      ])
    },
    methods: {
      ...mapActions([
        'getPayRequisitionReportList', 'getPayRequisitionReportSumAmount'
      ]),
      // 获取行程开始日期
      endDateStartChange(val) {
        this.form.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form.endDateEnd = val;
      },
      init(){
        this.getList();
        this.getSumAmount();
        this.getChildCompany();
        this.getCostTypeCodeList();
        this.getCostType();
      },
      //消费明细下拉框
      getCostTypeCodeList(){
        getCostTypeCodeListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.costTypeCodeList = data.data;
          }
        });
      },
      //子公司下拉框
      getChildCompany(){
        getDeptmentListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initChild = data.data;
          }
        });
      },
      //子公司下拉框联动(获取物流公司下拉框)
      selectChild(val){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val}
          getLogisticListApi(param).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              this.initLogistic = data.data;
              this.form.logisticsCode=''
            }
          })
        }
      },
      //获取开始日期
      startDateChange(val){
        this.form.startDate = val
      },
      //获取结束日期
      endDateChange(val){
        this.form.endDate = val
      },
      //费用类型下拉框
      changeCostType(val){
      },
      //获取费用类型下拉框
      getCostType(){
        getCostTypeApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initCostType = data.data;
          }
        });
      },
      //导出excel
      exportExcel(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
//            let params = Qs.stringify(this.form.Authorization);
          let params = Qs.stringify(this.form);

          this.download({
            params: params,
            handle: getPayRequisitionReportListExcelApi,
            callback () {

            }
          });
        });
      },

      //获取列表
      getList(){
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //柜号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        //应付对象
        this.form.payObj= this.form.payObj ? this.form.payObj.trim() : '';
        //申请单编号
        this.form.payReqNo= this.form.payReqNo ? this.form.payReqNo.trim() : '';
        this.pageHandler(this.form, this.getPayRequisitionReportList)
      },
      onSubmit() {
        this.getList();
        this.getSumAmount();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.startDate='';
        this.form.endDate='';
        this.initCostType={};
        this.form.costTypeList=[];
      },
      //获取总的金额
      getSumAmount(){
        getPayRequisitionReportSumAmountApi(this.form).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.sumIncomeAmount = data.data.sumIncomeAmount;
            this.sumPayAmount = data.data.sumPayAmount;
//            this.sumIncidentalAmount = data.data.sumIncidentalAmount;
//            this.sumPayChildAmount = data.data.sumPayChildAmount;
//            this.sumPayLogisticsAmount = data.data.sumPayLogisticsAmount;
          }else{
            this.sumIncomeAmount=0.00;
            this.sumPayAmount=0.00;
//            this.sumIncidentalAmount=0.00;
//            this.sumPayChildAmount=0.00;
//            this.sumPayLogisticsAmount=0.00;
          }
        })
      }
    },
    created(){
      this.init()
    },
  }

</script>

<style csoped lang="css">
  @import '../../../styles/custom-theme/query-modal-lg.css';
  .el-table th.el-table_1_column_15 .cell{
    color:deeppink;
  }
  .el-table th.el-table_1_column_16 .cell{
    color:deeppink;
  }
  .el-table th.el-table_1_column_17 .cell{
    color:deeppink;
  }
  .el-table th.el-table_1_column_18 .cell{
    color:blue;
  }
  .el-table th.el-table_1_column_19 .cell{
    color:blue;
  }
  .el-table th.el-table_1_column_20 .cell{
    color:blue;
  }
  .el-table th.el-table_1_column_21 .cell{
    color:blueviolet;
  }
  .el-table th.el-table_1_column_22 .cell{
    color:blueviolet;
  }
  .el-table th.el-table_1_column_23 .cell{
    color:blueviolet;
  }
  .form .form-hebao{
    color:red;
  }
  label.el-form-item__label[for="payChildReqNo"]{
    color:deeppink;
  }
  label.el-form-item__label[for="payChildStatus"]{
    color:deeppink;
  }
  label.el-form-item__label[for="payLogisticsReqNo"]{
    color:blue;
  }
  label.el-form-item__label[for="payLogisticsStatus"]{
    color:blue;
  }
  label.el-form-item__label[for="payReqNo"]{
    color:blueviolet;
  }
  label.el-form-item__label[for="payStatus"]{
    color:blueviolet;
  }
</style>
