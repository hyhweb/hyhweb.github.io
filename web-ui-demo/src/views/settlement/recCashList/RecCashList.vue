<template>
  <section>
    <ToolBarBox>
    <!-- 应收明细报表.查询条件 -->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" :model="form1" ref="form1" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form1.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form1.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form1.cabinetNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="费用类型" :label-width="labelWidth" prop="costTypeCode">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.costTypeCode" placeholder="请选择费用类型" class='control-width'>
                <el-option
                  v-for="item in costTypeList"
                  :label="item.text"
                  :key="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="客户名称" :label-width="labelWidth" prop="customerId">
              <el-select clearable filterable default-first-option v-model="form1.customerId" placeholder="请选择收款对象" class='control-width'>
                <el-option
                  v-for="item in customList"
                  :label="item.customerName"
                  :key="item.customerId"
                  :value="item.customerId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="任务类型" :label-width="labelWidth" prop="orderType">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.orderType" placeholder="请选择" class='control-width'>
                <el-option label="装货" :key="form1.orderType" :value="0"></el-option>
                <el-option label="送货" :key="form1.orderType" :value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="订单模式" :label-width="labelWidth" prop="isInvoice">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.isInvoice" placeholder="请选择" class='control-width'>
                <el-option label="自营" :key="form1.isInvoice" :value="1"></el-option>
                <el-option label="他营" :key="form1.isInvoice" :value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="收款状态" :label-width="labelWidth" prop="receivableStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.receivableStatus" placeholder="请选择" class='control-width'>
                <el-option label="未申请" :key="form1.receivableStatus" :value="0"></el-option>
                <el-option label="待收款" :key="form1.receivableStatus" :value="1"></el-option>
                <el-option label="已收款" :key="form1.receivableStatus" :value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="申请编号" :label-width="labelWidth" prop="receivableRequisitionId">
              <el-input v-model="form1.receivableRequisitionId" placeholder="请输入申请编号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="行程结束日期" :label-width="labelWidth" prop="scheduleEndDateStart" style="margin-right:2px">
              <el-date-picker type="date" icon="" placeholder="选择日期"
                              v-model="form1.scheduleEndDateStart"
                              @change="receiveTimeStartChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
            <label style="padding-right:0;padding-top:11px;">-</label>
            <el-form-item label="" :label-width="labelWidth" prop="scheduleEndDateEnd">
              <el-date-picker type="date" placeholder="选择日期"
                              v-model="form1.scheduleEndDateEnd"
                              @change="receiveTimeEndChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
          </div>
          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" icon="search" :disabled="this.$global.isDisabled(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form1')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>
    </ToolBarBox>

    <TableBox>
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <el-button type="primary" icon="document" @click="exportExcel" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>
      <span style="float: right;margin-top: 6px;">总应收（元）：<span style="color: #e00000;">{{ recCashSumAmount.sumAmount }}</span></span>
    </el-col>

    <!-- 应收明细报表.查询结果 -->
    <el-col>
      <el-table ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" :data="recCashList.data" @selection-change="handleSelectionChange1" stripe>
        <el-table-column
          label="序号"
          type="index">
        </el-table-column>

        <el-table-column
          prop="customerName"
          label="客户名称" width="100">
        </el-table-column>

        <el-table-column
          prop="childCompany"
          label="子公司" width="100">
        </el-table-column>

        <el-table-column
          prop="endDate"
          label="完成日期" width="100">
        </el-table-column>

        <el-table-column
          prop="orderTypeText"
          label="任务类型" width="90">
        </el-table-column>

        <el-table-column
          prop="isInvoiceText"
          label="订单模式" width="90">
        </el-table-column>

        <el-table-column
          prop="orderNo"
          label="订单号" width="90">
        </el-table-column>

        <el-table-column
          prop="bookSpaceNo"
          label="订舱单号" width="90">
        </el-table-column>

        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
        </el-table-column>

        <el-table-column
          prop="costTypeName"
          label="费用类型" width="100">
        </el-table-column>

        <el-table-column
          prop="incomeAmount"
          label="金额（元）" width="100">
        </el-table-column>

        <el-table-column
          prop="receivableRequisitionId"
          label="申请单编号" width="100">
        </el-table-column>

        <el-table-column
          prop="receivableStatusText"
          label="收款状态" width="100">
        </el-table-column>

        <el-table-column
          prop="receiveTime"
          label="收款时间" width="100">
        </el-table-column>
      </el-table>
    </el-col>
    </TableBox>

    <PaginationBox>
    <!-- 分页模块 -->
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
    </PaginationBox>

  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {exportRecCash} from '../../../api/modules/settlement'
  import Qs from 'qs'
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    components: {

    },
    data() {
      return {
        labelWidth: '90px',
        selectData: [],
        initData: {},
        item: [],

        form1: {
          orderNo: '',
          bookSpaceNo: '',
          cabinetNo: '',
          costTypeCode: '',
          customerId: '',
          orderType: '',
          isInvoice: '',
          receivableStatus: '',
          receivableRequisitionId: '',
          scheduleEndDateStart: '',
          scheduleEndDateEnd: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'customList',
        'recCashSumAmount',
        'recCashList',
        //费用类型 的接口
        'costTypeList'
      ])
    },
    methods: {
      ...mapActions([
        'getCustomList',
        'getRecCashSumAmount',
        'getRecCashList',
        //费用类型 的接口
        'getCostTypeList'
      ]),


      //画面初始化
      init(){
        this.getList()

        //获取客户名称 下拉列表数据
        this.getCustomList();

        //获取费用类型 的下拉列表数据
        this.getCostTypeList();

        //获取应收报表-总应收 数据
//        this.getRecCashSumAmount();
//        this.pageHandler(this.form1, this.getRecCashSumAmount)
        this.getRecCashSumAmount();

        //获取应收报表-查询结果 表格数据
//        this.$global.recorderTableData(this, 'recCashList');
//        this.pageHandler(this.form1, this.getRecCashList)
      },

      //付款起始时间
      receiveTimeStartChange(val){
        //this.form1.receiveTimeStart = val
      },
      //付款结束时间
      receiveTimeEndChange(val){
        //this.form1.receiveTimeEnd = val
      },

      //付款申请单管理_初始化/查询
      getList(){
        this.form1.scheduleEndDateStart = (typeof(this.form1.scheduleEndDateStart) == "string" ? this.form1.scheduleEndDateStart : util.formatDate.format(this.form1.scheduleEndDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form1.scheduleEndDateEnd = (typeof(this.form1.scheduleEndDateEnd) == "string" ? this.form1.scheduleEndDateEnd : util.formatDate.format(this.form1.scheduleEndDateEnd, 'yyyy-MM-dd hh:mm:ss'));
        //console.log(this.form1)
        this.pageHandler(this.form1, this.getRecCashList)
      },

      //付款申请单管理_查询
      onSubmit() {
        this.getList();
        this.getRecCashSumAmount(this.form1);
//        this.pageHandler(this.form1, this.getRecCashSumAmount)
      },

      //应收明细报表_导出excel
      exportExcel(){
        this.$confirm('确认要导出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          const token = sessionStorage.getItem('id_token');
//          this.form1.Authorization = `Bearer ${token}`;
//          let params = Qs.stringify(this.form1);
//          getRequisitionExcelApi(params)
          const token = sessionStorage.getItem('id_token');
          let raw_params = {
            Authorization: `Bearer ${token}`
          };
          Object.assign(this.form1, raw_params);
          let params = Qs.stringify(this.form1);
          this.download({
            params: params,
            handle: exportRecCash,
            callback () {

            }
          });

        });
      },

      //付款申请单管理_选中复选框
      handleSelectionChange1(val){
        this.selectData = val;
      },

      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },

    created(){
      this.init()
    },
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal.css';

  .long-label label {
    padding-left: 0 !important;
    padding-right: 12px !important;
  }

  .toolbarTips div {
    display: inline-block;
    margin-right: 18px;
  }
  .toolbarTips div span:last-child {
    color: red;
  }
</style>
