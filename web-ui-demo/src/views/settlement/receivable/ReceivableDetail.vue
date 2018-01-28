<template>
  <el-dialog
    size="large"
    title="应收款列表"
    v-model="detailVisible" :before-close="closeDialog">
    <el-col>
      <!-- 收款申请单明细.查询条件-->
      <form-box title="查询" v-if="false">
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

            <div style="display: inline-block;">
              <el-form-item label="日期" :label-width="labelWidth" prop="startDate" style="margin-right:2px">
                <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.startDate" style="width:125px"></el-date-picker>
              </el-form-item>
              <label style="padding-right:0;padding-top:11px;display: inline-block;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="endDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width:125px"></el-date-picker>
              </el-form-item>
            </div>
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
        <div style="float:right;margin-top:8px;margin-right:10px">&nbsp;&nbsp;
          金额：<span style="color:red">{{ importedSumAmount }}</span>元
        </div>
      </el-col>

      <!-- 付款申请单明细.查询结果-->
      <el-col v-show="form.showFlag">
        <el-table ref="table" @row-click="handleRowClick" :data="receivableRequisitionDetailListData" @selection-change="handleSelectionChange" stripe>
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
            prop="endDate"
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
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getImportedSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getReceivableRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {},
    data(){
      return {
        importedSumAmount: 0,
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
          cabineNo: '',
          costTypeName: '',
          receivableObj: '',
          receivableAmount: '',
          orgName: '',

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
        'receivableRequisitionDetailList'
      ]),
      receivableRequisitionDetailListData(){
        if (this.receivableRequisitionDetailList == undefined) {
          return []
        } else {
          return this.receivableRequisitionDetailList.data
        }
      }
    },
    methods: {
      ...mapActions([
        'outPort', 'getReceivableRequisitionDetailList'
      ]),
      getList(){
        getImportedSumAmountApi({ receivableRequisitionId: this.form.receivableRequisitionId }).then((res) => {
          if (res.data.success) {
            this.importedSumAmount = res.data.data;
          } else {
          }
        });

//        console.log(this.receivableRequisitionDetailList.data);
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getReceivableRequisitionDetailList)
//        var val = this.form.reqId;
//        this.getDetailSumAmount(val)
        console.log(this.receivableRequisitionDetailList.data);
      },
      closeDialog() {
        this.detailVisible = false;
//        this.$refs['form'].resetFields()
//        this.item = null;
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
        if(row.pay){
            this.form.disableFlg=true;
            return false
        }
        this.form.disableFlg=false
        return true
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
//      //子公司下拉框
//      getChildCompany(){
//        getDeptmentListApi().then((res) => {
//          let data = res.data;
//          if (data.code == 1) {
//            this.initChild = data.data;
//          }
//        });
//      },
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
          getReceivableRequisitionDetailExcelApi(params)

//          this.exportExcelFormData.Authorization = `Bearer ${token}`;
//          this.exportExcelFormData.receivableRequisitionId = this.form.receivableRequisitionId;
//          let params = Qs.stringify(this.exportExcelFormData);

//          let params = Qs.stringify({receivableRequisitionId: this.form.receivableRequisitionId});
        });
      },
      //获取总金额
//      getDetailSumAmount(val){
//        let param = {reqId: val}
//        getDetailSumAmountApi(param).then((res) => {
//          let data = res.data;
//          if (data.code == 1) {
//            this.sumAmount = data.data;
//          }
//        });
//      },
      //移出应付款
      outPortRequisition(){
        if (this.selectData.length >= 1) {
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

              this.outPort({data: JSON.stringify(this.RequisitionFeesForm)}).then(res => {
                if (res.success) {
                  this.$parent.getList()
                  this.getList()
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
//      this.getChildCompany()
    },
    mounted(){

    }
  }
</script>
