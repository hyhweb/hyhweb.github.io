<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" size="small" @click="getCashHandler()" :disabled="!statusToBtn.cash" v-if="!this.$global.isDisabled(101)">现金收款</el-button>
          <el-button type="primary" size="small" @click="FreeTransferHandler(false)" :disabled="!statusToBtn.diff" v-if="!this.$global.isDisabled(102)">费用转移</el-button>
          <el-button type="primary" size="small" @click="FreeTransferHandler(true)" :disabled="!statusToBtn.same" v-if="!this.$global.isDisabled(103)">费用转移(同柜)</el-button>
          <el-button type="primary" size="small" @click="getExportOrderDataList()" v-if="!this.$global.isDisabled(21)" >导出excel</el-button>
        </el-button-group>
      </el-col>
      <el-col>
        <form-box title="查询">
          <el-form :inline="true" :model="form" ref="form" class="linesmall" @submit.prevent="onSubmit">
            <div style="padding-right:100px;position:relative;">
              <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
                <el-input v-model.trim="form.orderNo" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="下单客户" :label-width="labelWidth" prop="customerId">
                <el-select ref="customerId" clearable filterable default-first-option v-model.trim="form.customerId" class='control-width' @visible-change="visibleChangeCustomerId">
                  <el-option v-for="item in orderUserList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="船名航次" :label-width="labelWidth" prop="voyageName">
                <el-input v-model.trim="form.voyageName" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="运单号" :label-width="labelWidth" prop="bookSpaceNo">
                <el-input v-model.trim="form.bookSpaceNo" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="费用状态" :label-width="labelWidth" prop="status">
                <el-select ref="status" clearable filterable default-first-option v-model.trim="form.status" class='control-width'
                @input="statusHandler"
                @visible-change="visibleChangeStatus">
                  <el-option v-for="item in costChangeTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="箱型" :label-width="labelWidth" prop="cabinetType">
                <el-select ref="cabinetType" clearable filterable default-first-option v-model.trim="form.cabinetType" class='control-width' @visible-change="visibleChangeCabinetType">
                  <el-option v-for="item in conTypeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
                <el-input v-model.trim="form.cabinetNo" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="费用类型" :label-width="labelWidth" prop="costTypeCode">
                <el-select ref="costTypeCode" clearable filterable default-first-option v-model.trim="form.costTypeCode" class='control-width' @visible-change="visibleChangeCostTypeCode">
                  <el-option v-for="item in costTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="付款申请单号" :label-width="labelWidth" prop="requisitionId">
                <el-input v-model.trim="form.requisitionId" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
                <el-select ref="org" clearable filterable default-first-option v-model.trim="form.orgCode" class='control-width' @visible-change="visibleChangeDeptmentList">
                  <el-option v-for="item in deptmentList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理方式" :label-width="labelWidth" prop="opType">
                <el-select ref="opType" clearable filterable default-first-option v-model.trim="form.opType" class='control-width' @visible-change="visibleChangeCostOpType">
                  <el-option v-for="item in processedTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item style="position: absolute;right:10px;top:60px;">
              <p style="padding-bottom:10px;">
                <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" style="width:90px;" v-if="!this.$global.isDisabled(1)">查询</el-button>
              </p>
              <p>
                <el-button @click="resetForm" style="width:90px;">清空</el-button>
              </p>
            </el-form-item>
          </el-form>
        </form-box>
      </el-col>
    </ToolBarBox>
    <TableBox>
      <!--列表-->
      <el-col>
        <el-table ref="table" :data="cancelOrderDataList" :max-height="tableMaxHeight" stripe @selection-change="handleSelectionChange" @row-click="handleRowClick">
          <el-table-column type="selection" width="30" fixed="left">
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号" width="150">
          </el-table-column>
          <el-table-column prop="customerName" label="下单客户" width="150">
          </el-table-column>
          <el-table-column prop="createDate" label="下单日期" width="150">
          </el-table-column>
          <el-table-column prop="salesmanName" label="业务员" width="50">
          </el-table-column>
          <el-table-column prop="followUserName" label="跟单员" width="50">
          </el-table-column>
          <el-table-column prop="voyageName" label="船名航次" width="100">
          </el-table-column>
          <el-table-column prop="bookSpaceNo" label="运单号" width="130">
          </el-table-column>
          <el-table-column prop="cabinetType" label="箱型" width="50">
          </el-table-column>
          <el-table-column prop="cabinetNo" label="箱号" width="100">
          </el-table-column>
          <el-table-column prop="statusName" label="费用状态" >
          </el-table-column>
          <el-table-column prop="costTypeName" label="费用类型">
          </el-table-column>
          <el-table-column prop="payAmount" label="费用金额">
          </el-table-column>
          <el-table-column prop="incomeAmount" label="实收金额">
          </el-table-column>
          <el-table-column prop="requisitionId" label="付款申请单" width="160">
          </el-table-column>
          <el-table-column prop="reqTime" label="申请日期" width="150">
          </el-table-column>
          <el-table-column prop="payTime" label="付款日期" width="150">
          </el-table-column>
          <el-table-column prop="opTypeName" label="收款方式" width="100">
          </el-table-column>
          <el-table-column prop="operateor" label="操作人">
          </el-table-column>
          <el-table-column prop="updateTime" label="操作日期" width="150">
          </el-table-column>
          <el-table-column prop="newOrderNo" label="新订单号" width="150">
          </el-table-column>
          <el-table-column prop="newCabinetNo" label="新集装箱号" width="120">
          </el-table-column>
          <el-table-column label="操作" fixed="right" v-if="freeStatus == 1" >
            <template scope="scope">
              <el-button size="small" type="primary" @click="editCost(scope.row)">费用跟踪</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </TableBox>
    <PaginationBox>
      <el-col>
        <span style="padding-top: 6px;display: inline-block;">费用金额统计：
      <span class="c1">{{amountTotal}}元</span>
        </span>
        <el-pagination style="float:right" ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>
    <GetCash ref="getCashComponent"></GetCash>
    <FreeTransfer ref="freetransferComponent"></FreeTransfer>
    <EditCost ref="editcost"></EditCost>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import util from '../../../common/js/util';
import pagination from '../../../common/mixins/pagination';
import tool from '../../../common/mixins/tool';
import GetCash from './GetCash.vue';
import FreeTransfer from './FreeTransfer.vue';
import EditCost from '../orderadmin//EditCost.vue'
import { getExportOrderDataListApi } from './../../../api/modules/order'
import Qs from 'qs';
export default {
  mixins: [pagination, tool],
  components: { GetCash, FreeTransfer, EditCost },
  data() {
    return {
      labelWidth: '80px',
      selectData: [],
      rowData: {},
      amountTotal: '0',
      freeStatus:'0',
      statusToBtn: {
        cash: false,
        diff: false,
        same: false
      },
      CabinetStatistics: [], //集装箱统计
      form: {
        orderNo: '', // 订单号
        customerId: '', //下单客户
        voyageName: '', //船名航次
        bookSpaceNo: '', // 运单号
        status: '0', // 费用状态
        cabinetType: '', //箱型
        cabinetNo: '', // 箱号
        costTypeCode: '', //费用类型
        requisitionId: '', //付款申请单号
        opType: '', //处理方式
        orgCode: '' //子公司
      },
      orderUserList: [], //下单客户下拉列表
      processedTypeList: [], //处理方式下拉列表
      deptmentList: [], //子公司下拉列表
      costTypeList: [], //费用类型下拉列表
      costChangeTypeList: [], //费用状态下拉列表
      conTypeList: [], //箱型下拉列表
      deptmentList: [] //子公司下拉列表

    };
  },
  computed: {
    ...mapGetters([
      'cancelOrderDataList', 'cancelOrderQueryList'
    ])
  },
  methods: {
    ...mapActions([
      'getCancelOrderDataList',
      'getCancelOrderQuery',
      'getCancelOrderAmount'

    ]),
    statusHandler(val){
      this.form.status = val;
    },
    editCost(row){
       this.$refs.editcost.form.orderId=row.orderId
        this.$refs.editcost.form.cabinetId=row.newCabinetId
        this.$refs.editcost.dialogVisible = true
        this.$refs.editcost.addOrEdit = "edit"
        this.$refs.editcost.init()
      },
      //导出
      getExportOrderDataList(){
        this.$confirm('确认要导出取消订单列表数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          getExportOrderDataListApi(params);
        })



      },
    visibleChangeCustomerId() {
      this.orderUserList = this.cancelOrderQueryList.orderUserList
    },
    visibleChangeCabinetType() {
      this.conTypeList = this.cancelOrderQueryList.conTypeList
    },
    visibleChangeStatus() {
      this.costChangeTypeList = this.cancelOrderQueryList.costChangeTypeList
    },
    visibleChangeCostTypeCode() {
      this.costTypeList = this.cancelOrderQueryList.costTypeList
    },
    visibleChangeCostOpType() {
      this.processedTypeList = this.cancelOrderQueryList.processedTypeList
    },
    visibleChangeDeptmentList() {
      this.deptmentList = this.cancelOrderQueryList.deptmentList
    },
    init() {
      this.getList();
      this.costChangeTypeList =  [{text:"未处理",value:"0"}];
    },


    // 获取列表选中的数据
    handleSelectionChange(val) {
      let status = 1;
      this.selectData = val;
      if (this.selectData.length == 1) {
        if (this.selectData[0].status) {
          this.statusToBtn = {
            cash: false,
            diff: false,
            same: false
          }
        } else {
          this.statusToBtn = {
            cash: true,
            diff: true,
            same: true
          }
        }
      }


    },
    //现金收款
    getCashHandler() {
      if (this.selectData.length == 1) {
        this.$refs.getCashComponent.dialogVisible = true;
        this.$refs.getCashComponent.form = Object.assign(this.$refs.getCashComponent.form, this.selectData[0]);
        if (sessionStorage.getItem('user') != null) {
          let userInfo = JSON.parse(sessionStorage.getItem('user'));
          this.$refs.getCashComponent.form.operateor = userInfo.name;
          this.$refs.getCashComponent.form.updateTime = this.$global.currentTime;
        }

      } else {
        this.$confirm('请选择一条数据进行查看');
      }



    },
    //费用转移
    FreeTransferHandler(issame) {

      if (this.selectData.length == 1) {
        this.$refs.freetransferComponent.originOrder = this.selectData[0];
        this.$refs.freetransferComponent.issame = issame;
        if (issame) {

          this.$refs.freetransferComponent.form.bookSpaceNo = this.selectData[0].bookSpaceNo;
          this.$refs.freetransferComponent.form.cabinetNo = this.selectData[0].cabinetNo;
          this.$refs.freetransferComponent.form.costTypeCode = this.selectData[0].costTypeCode;
          this.$refs.freetransferComponent.costTypeList = [{
            value: this.selectData[0].costTypeCode,
            text: this.selectData[0].costTypeName
          }];
          this.$refs.freetransferComponent.init();
        } else {
          this.$refs.freetransferComponent.form = Object.assign(this.$refs.freetransferComponent.form, this.selectData[0]);
          this.$refs.freetransferComponent.form.orderNo = '';
          this.$refs.freetransferComponent.form.bookSpaceNo = '';
          this.$refs.freetransferComponent.form.cabinetNo = '';
          this.$refs.freetransferComponent.form.costTypeCode = '';
        }




        this.$refs.freetransferComponent.dialogVisible = true;

        if (sessionStorage.getItem('user') != null) {
          let userInfo = JSON.parse(sessionStorage.getItem('user'));
          this.$refs.freetransferComponent.form.operateor = userInfo.name;
        }

      } else {
        this.$confirm('请选择一条数据进行查看');
      }

    },
    // 获取列表
    getList(initpage, afterhandle) {
      this.pageHandler(this.form, this.getCancelOrderDataList, initpage, afterhandle);
      this.getCancelOrderQuery();
      this.getCancelOrderAmount(this.form).then((res) => {
        if (res.success) {
          this.amountTotal = res.data;
        }
      })
      this.freeStatus = this.form.status;
      /*      this.getCabinetStatisticsList(this.form).then((res) => {
              this.CabinetStatistics = res.data.split(',');
            });*/
    },

    // 查看订单详情
    handleDetail() {
      if (this.selectData.length == 1) {
        this.$refs.OrderDetail.orderModel = true;
        this.$refs.OrderDetail.orderId = this.selectData[0].orderId;
        this.$refs.OrderDetail.getDetail();
      } else {
        this.$confirm('请选择一条数据进行查看');
      }
    },
    // 查询
    onSubmit() {
      this.getList(true);
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },

  created() {
    this.init();

  },
  mounted() {

  },
  beforeDestroy() {

  }
};

</script>
