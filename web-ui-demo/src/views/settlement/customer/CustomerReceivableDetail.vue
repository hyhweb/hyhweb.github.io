<template>
  <el-dialog
    size="large"
    title="应收款列表"
    v-model="detailVisible" :before-close="closeDialog">
    <el-col>
      <!-- 收款申请单明细.查询条件-->
      <form-box title="查询" v-if="true">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="申请单编号" :label-width="labelWidth" prop="reqId" v-show="false">
              <el-input v-model="form.reqId" placeholder="请输入申请单编号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
            </el-form-item>

            <br>

            <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
              <el-select
                clearable
                filterable
                default-first-option
                @input="selectChild"
                v-model="form.orgCode" placeholder="请选择子公司" class='control-width'>
                <el-option
                  v-for="item in initChild.deptmentList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <!--<el-form-item class="combine-input" label="日期" :label-width="labelWidth" prop="startDate" >-->
              <!--<el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.startDate" ></el-date-picker>-->
              <!-- - -->
              <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" ></el-date-picker>-->
            <!--</el-form-item>-->
          </div>
          <div class="query-btns">
            <el-form-item style="float:right;">
              <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
              <el-button type="success" icon="setting" @click="resetForm('form')">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>

      <el-col :span="24" class="toolbar" style="margin-bottom:0px;" v-if="true">
        <el-button type="primary" icon="document" @click="exportExcel2" size="small" :disabled="this.$global.isDisabled(29)">导出excel</el-button>
        <div style="float:right;margin-top:8px;margin-right:10px">
          合计金额(元)：<span style="color:red">{{sumAmount}}</span>
        </div>
      </el-col>

      <!-- 付款申请单明细.查询结果-->
      <el-col v-show="form.showFlag">
        <el-table ref="table" @row-click="handleRowClick" :data="customerReceivableDetailListData" @selection-change="handleSelectionChange" stripe>
          <!--<el-table-column type="selection" fixed :selectable="checkSelectable" width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="orderNo"
            label="订单编号" width="100">
          </el-table-column>
          <el-table-column
            prop="bookSpaceNo"
            label="订舱单号">
          </el-table-column>
          <el-table-column
            prop="cabinetNo"
            label="箱号" width="100">
          </el-table-column>

          <el-table-column
            prop="transportTypeName"
            label="运输类型">
          </el-table-column>
          <el-table-column
            prop="cabinetType"
            label="箱型">
          </el-table-column>

          <el-table-column
            prop="costTypeName"
            label="费用类型">
          </el-table-column>

          <el-table-column
            prop="harborName"
            label="报价港口">
          </el-table-column>

          <el-table-column
            prop="receivableObj"
            label="应收对象" width="100">
          </el-table-column>
          <el-table-column
            prop="receivableAmount"
            label="费用金额(元)" width="100">
          </el-table-column>

          <el-table-column
            prop="settlementDate"
            label="完成时间" width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="装送货地址" width="100">
          </el-table-column>

          <el-table-column
            prop="orgName"
            label="子公司" width="100">
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
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import download from '../../../common/mixins/download';
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {exportCustomerReceivableDetailExcelApi,getCustomerReceivableDetailAmountApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  export default {
    mixins: [pagination,download],
    components: {},
    data(){
      return {
        detailVisible: false,
        labelWidth: '90px',
        selectData: [],
        initData: {},
        initChild:{},
        initLogistic:{},
        sumAmount: 0.00,
        selectCount:0,
        selectSum:0,
        payObjectName:'',
        showFlagA:false,
        RequisitionFeesForm: {
          reqId: '',//申请单编号
          reqIds: '',
          reqDetailIds: '',
          cabCostIds: ''//集装箱费用Id数组
        },
        form: {
          receivableRequisitionId: '',
          orderNo: '',
          bookSpaceNo: '',
          cabinetNo: '',
          costTypeName: '',
          receivableObj: '',
          receivableAmount: '',
          orgName: '',
          orgCode:'',

          transportTypeName: '',
          cabinetType: '',
          harborName: '',
          settlementDate: '',
          address: ''
        },
        exportExcelFormData: {

        }
      }
    },
    computed: {
      ...mapGetters([
        'customerReceivableDetailList'
      ]),
      customerReceivableDetailListData(){
        if (this.customerReceivableDetailList == undefined) {
          return []
        } else {
          return this.customerReceivableDetailList.data
        }
      }
    },
    methods: {
      ...mapActions([
        'getCustomerReceivableDetailList'
      ]),
      handleSelectionChange(){

      },
      //初始化
      init(){
        this.getChildCompany();
        this.getList();
      },
      getList(){
//        console.log(this.receivableRequisitionDetailList.data);
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getCustomerReceivableDetailList,false,()=>{
            this.getDetailSumAmount(this.form.receivableRequisitionId)
        })
      },
      closeDialog() {
        this.detailVisible = false;
//        this.$refs['form'].resetFields()
//        this.item = null;
      },
      checkSelectable(row){
        if(row.pay){
            this.form.disableFlg=true;
            return false
        }
        this.form.disableFlg=false
        return true
      },
      onSubmit() {
        this.getList();
//        this.getSumAmount()
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
//        if(undefined!=val && null!=val && ''!=val){
//          let param = {strCode: val}
//          getLogisticListApi(param).then((res) => {
//            let data = res.data;
//            if (data.code == 1) {
//              this.initLogistic = data.data;
//              this.form.logisticsCode=''
//            }
//          })
//        }
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
            handle: exportCustomerReceivableDetailExcelApi,
            callback () {
            }
          })
        });
      },
      //获取总金额
      getDetailSumAmount(val){
        let param = {receivableId: val};
        getCustomerReceivableDetailAmountApi(param).then((res) => {
          let data = res.data;
          if (data.code === '1') {
            this.sumAmount = data.data;
          }
        });
      },
    },
    created(){
//      this.getChildCompany()
    },
    mounted(){

    }
  }
</script>
