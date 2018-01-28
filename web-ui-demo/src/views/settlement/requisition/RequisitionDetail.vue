<template>
  <el-col>
    <!-- 付款申请单明细.查询条件-->
    <form-box title="查询">
      <el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
        <div class="query-params">
        <el-form-item label="申请单编号" :label-width="labelWidth" prop="reqId" v-show="false">
          <el-input v-model="form.reqId" placeholder="请输入申请单编号" class='control-width'></el-input>
        </el-form-item>
        <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
        </el-form-item>
        <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookspaceNo">
          <el-input v-model="form.bookspaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
        </el-form-item>
        <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
          <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
        </el-form-item>
        <br>
        <el-form-item label="子公司" :label-width="labelWidth" prop="subsidiary">
          <el-select
            clearable
            filterable
            default-first-option
            @input="selectChild"
            v-model="form.subsidiary" placeholder="请选择子公司" class='control-width'>
            <el-option
              v-for="item in initChild.deptmentList"
              :key="item.value"
              :label="item.text"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流公司" :label-width="labelWidth" prop="affiliated">
          <el-select
            clearable
            filterable
            default-first-option
            v-model="form.affiliated" placeholder="请选择物流公司" class='control-width'>
            <el-option
              v-for="item in initLogistic.logisticsList"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="labelWidth" prop="startDate" style="margin-right:2px">
          <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.startDate"
                          style="width:125px"></el-date-picker>
        </el-form-item>
        <label style="padding-right:0;padding-top:11px;">-</label>
        <el-form-item label="" :label-width="labelWidth" prop="endDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width:125px"></el-date-picker>
        </el-form-item>
        </div>
        <div class="query-btns">
          <el-form-item style="float:rigth" >
          <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
          <el-button type="success" icon="setting" @click="resetForm('form')">清空</el-button>
        </el-form-item>
        </div>
      </el-form>
    </form-box>
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">应付申请详情</span>
      </div>
      <el-button-group>
        <el-button type="primary" icon="arrow-left" @click="outPortRequisition" size="small" v-if="!isDisabled(28)" :disabled="form.disableFlg">移出应付款</el-button>
        <el-button type="primary" icon="document" @click="exportExcel2" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>
      </el-button-group>
      <div style="float:right;margin-top:8px;margin-right:10px">&nbsp;&nbsp;
        应付总金额：<span style="color:red">{{sumPayAmount}}</span>元
        开票总金额：<span style="color:red">{{sumInvoiceAmount}}</span>元
        不开票总金额：<span style="color:red">{{sumUnInvoiceAmount}}</span>元
      </div>
      <div v-show="showFlagA" style="float:right;margin-top:8px;margin-right:10px">
        对象：<span style="color:red">{{payObjectName}}</span>&nbsp;&nbsp;
        选中金额：<span style="color:red">{{selectSum}}</span>元
      </div>
    </el-col>
    <!-- 付款申请单明细.查询结果-->
    <el-col v-show="form.showFlag">
      <el-table ref="table" @row-click="handleRowClick" :data="requisitiondetailListData" @selection-change="handleSelectionChange" stripe>
        <el-table-column type="selection" fixed :selectable="checkSelectable" width="50">
        </el-table-column>
        <el-table-column
          prop="payObject"
          label="对象" width="100">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="子公司" width="150">
        </el-table-column>
        <el-table-column
          prop="affiliated"
          label="物流公司" width="150">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="120">
        </el-table-column>
        <el-table-column
          prop="bookspaceNo"
          label="订舱单号" width="120">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="120">
        </el-table-column>
        <el-table-column
          prop="driver"
          label="司机/车牌" width="150">
        </el-table-column>
        <el-table-column
          prop="costType"
          label="费用类型" width="100">
        </el-table-column>
<!--        <el-table-column
          prop="payAmount"
          label="金额(元)" width="90">
        </el-table-column>-->
        <el-table-column
          prop="invoiceAmount"
          label="开票金额(元)" width="100">
        </el-table-column>
        <el-table-column
          prop="unInvoiceAmount"
          label="不开票金额(元)" width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期" width="90">
        </el-table-column>
        <el-table-column
          prop="isPayName"
          label="付款状态" fixed="right" width="90">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col style="padding:10px 0;text-align:center;" v-show="form.showFlag">
      <el-pagination layout="total, sizes, prev, pager, next, jumper"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :total="pageCount"
                     :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
  </el-col>

</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import download from '../../../common/mixins/download';
  import Qs from 'qs'
  export default {
    mixins: [pagination,download],
    components: {},
    data(){
      return {
        labelWidth: '90px',
        selectData: [],
        initData: {},
        initChild:{},
        initLogistic:{},
        sumPayAmount: 0.00,
        sumInvoiceAmount: 0.00,
        sumUnInvoiceAmount: 0.00,
        selectCount:0,
        selectSum:0,
        payObjectName:'',
        showFlagA:false,
        status:0,
        paidAmount:0,
        payObjectType:'',
        currentOrgCode:'',
        recordOrgCode:'',
        RequisitionFeesForm: {
          reqId: '',//申请单编号
          reqIds: '',
          reqDetailIds: '',
          cabCostIds: ''//集装箱费用Id数组
        },
        form: {
          reqId: 0,
          detailReqId: '',//申请编号(隐藏参数)
          orderNo: '',//订单号
          bookspaceNo: '',  //订舱单号
          cabinetNo: '',  //箱号
          subsidiary: '',//子公司
          affiliated: '',//物流公司
          startDate: '',//日期
          endDate: '',//日期
          showFlag:false,//控制结果一览和分页的显示
          disableFlg:false,//控制移出应付款按钮是否禁用（当记录是已付款状态时禁用）
        }
      }
    },
    computed: {
      ...mapGetters(['requisitiondetailList']),
      requisitiondetailListData(){
        if (this.requisitiondetailList.data == undefined) {
          return []
        } else {
          return this.requisitiondetailList.data
        }

      }
    },
    methods: {
      ...mapActions(['outPort', 'getRequisitionDetail']),
      getList(){
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getRequisitionDetail)
        var val = this.form.reqId;
        this.getDetailSumAmount(val)
      },
      //选中复选框计算选中记录条数和选中金额
      handleSelectionChange(val){
        this.selectData = val;
        var amount = 0;
        if(this.selectData.length>0){
          for (var i = 0; i < this.selectData.length; i++) {
            var payObject1 = this.selectData[0].payObject;
            var payObject2 = this.selectData[i].payObject;
              if(payObject1 != payObject2){
                this.payObjectName ="";
                this.selectCount = 0;
                this.selectSum = 0;
                this.showFlagA = false;
                return;
              }else{
                amount += this.selectData[i].payAmount;
              }
          }
          this.payObjectName = payObject1;
          this.selectCount = this.selectData.length;
          this.selectSum = amount;
          this.showFlagA = true;
        }else{
          this.payObjectName ="";
          this.selectCount = 0;
          this.selectSum = 0;
          this.showFlagA = false;
        }
      },
      checkSelectable(row){
        if(this.status!=0 || this.currentOrgCode != this.recordOrgCode) {
          this.form.disableFlg=true;
          return false;
        }
        this.form.disableFlg=false;
        return true;
      },
      onSubmit() {
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getRequisitionDetail)
        this.getSumAmount()
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
      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //导出excel
      exportExcel2(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          this.download({
            params: params,
            handle: getRequisitionDetailExcelApi,
            callback () {

            }
          });

        });
      },
      //获取总金额
      getDetailSumAmount(val){
        let param = {reqId: val}
        getDetailSumAmountApi(param).then((res) => {
          let data = res.data;
          if (data.code == 1 && data.success) {
            this.sumPayAmount = data.data.sumPayAmount;
            this.sumInvoiceAmount = data.data.sumInvoiceAmount;
            this.sumUnInvoiceAmount = data.data.sumUnInvoiceAmount;
          }
        });
      },
      //移出应付款
      outPortRequisition(){
        if (this.selectData.length >= 1) {
          if(this.status!=0) {
            this.$confirm('只能移出【申请单状态=申请中】的费用！');
            return;
          }
          this.$confirm('您确定要移出吗?', '提示', {type: 'warning'})
            .then(() => {
              //第二种方法(Json提交)
              var reqId = this.form.reqId;
              var reqDetailIds = this.selectData.map(item => item.reqDetailId);
              var cabCostIds = this.selectData.map(item => item.cabCostId);

              this.RequisitionFeesForm.reqId = reqId;
              this.RequisitionFeesForm.reqIds = reqDetailIds;

              this.RequisitionFeesForm.reqDetailIds = reqDetailIds;
              this.RequisitionFeesForm.cabCostIds = cabCostIds;
              this.RequisitionFeesForm.payObjectType = this.payObjectType;

              this.outPort({data: JSON.stringify(this.RequisitionFeesForm)}).then(res => {
                if (res.success) {
                    this.getList();
                    this.$parent.getList();
                  this.$message({
                    message: '移出成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '移出失败',
                    type: 'error'
                  })
                }
              });
            })
        } else {
          this.$confirm('请选择要移出的记录！')
        }
      },
      getSumAmount(){
        this.getRequisitionDetailSumAmount(this.form)
      }
    },
    created(){
      this.getChildCompany()
    },
    mounted(){

    }
  }
</script>
