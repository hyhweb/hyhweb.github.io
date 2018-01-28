<template>
  <el-dialog
    id="eraDialog"
    size="large"
    title="财务经理审核"
    v-model="receivableAmountAuditVisible" :before-close="closeDialog">
    <el-col>
      <!--副标题-->
      <el-col>
        以下涉及到费用金额的单位均为"元"
      </el-col>

      <!-- 收款详情.标题-->
      <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
        <div style="float:left;margin-right:10px">
          <span style="font-family: Microsoft YaHei;font-size: 120%">收款详情</span>
        </div>
      </el-col>

      <!-- 收款详情.查询结果-->
      <el-col>
        <el-table ref="table" :data="receivableAcountList" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>

          <el-table-column
            prop="receiveTypeStr"
            label="收款方式">
          </el-table-column>

          <el-table-column
            prop="acceptNo"
            label="承兑号">
          </el-table-column>

          <el-table-column
            prop="bankAccount"
            label="银行帐户">
          </el-table-column>

          <el-table-column
            prop="bankName"
            label="银行名称">
          </el-table-column>

          <el-table-column
            prop="receivableAmount"
            label="应收金额">
          </el-table-column>

          <el-table-column
            prop="realAmount"
            label="实际收款金额">
          </el-table-column>

          <el-table-column
            prop="discountAmount"
            label="现金折扣">
          </el-table-column>

          <el-table-column
            prop="unReceivableAmount"
            label="未收金额">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 收款详情.分页-->
      <!--<el-col style="padding:10px 0;text-align:center;">-->
        <!--<el-pagination layout="total, sizes, prev, pager, next, jumper"-->
                       <!--@current-change="handleCurrentChange"-->
                       <!--@size-change="handleSizeChange"-->
                       <!--:current-page="pageNo"-->
                       <!--:page-size="pageSize"-->
                       <!--:total="pageCount"-->
                       <!--:page-sizes="pagesizes">-->
        <!--</el-pagination>-->
      <!--</el-col>-->


      <!-- 发票详情.标题-->
      <el-col :span="24" class="toolbar" style="margin:20px 0 0;">
        <div style="float:left;margin-right:10px">
          <span style="font-family: Microsoft YaHei;font-size: 120%">发票详情</span>
        </div>
      </el-col>

      <!-- 发票详情.查询结果-->
      <el-col style="margin:0 0 20px;">
        <el-table ref="table" :data="receivableInvoiceList" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>

          <el-table-column
            prop="invoiceCode"
            label="发票代码">
          </el-table-column>

          <el-table-column
            prop="invoiceNo"
            label="发票号码">
          </el-table-column>

          <el-table-column
            prop="payObj"
            label="付款单位(个人)名称">
          </el-table-column>

          <el-table-column
            prop="receiveObj"
            label="收款单位(个人)名称">
          </el-table-column>

          <el-table-column
            prop="invoiceAmount"
            label="开票金额">
          </el-table-column>

          <el-table-column
            prop="invoiceDate"
            label="开票日期">
          </el-table-column>

          <el-table-column
            prop="taxRate"
            label="发票税率">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 发票详情.分页-->
      <!--<el-col style="padding:10px 0;text-align:center;">-->
        <!--<el-pagination layout="total, sizes, prev, pager, next, jumper"-->
                       <!--@current-change="handleCurrentChange"-->
                       <!--@size-change="handleSizeChange"-->
                       <!--:current-page="pageNo"-->
                       <!--:page-size="pageSize"-->
                       <!--:total="pageCount"-->
                       <!--:page-sizes="pagesizes">-->
        <!--</el-pagination>-->
      <!--</el-col>-->


      <!--表单部分-->
      <el-form ref="form" :rules="formRules" :model="form" label-width="100px" style="width: 400px;margin: auto;">

        <el-form-item label="备注" prop="auditRemark" :label-width="labelWidth">
          <el-input type="textarea" v-model="form.auditRemark" style="width: 250px;"></el-input>
        </el-form-item>

        <el-form-item label-width="0" style="text-align: center;">
          <el-button type="primary" @click="onSubmit(2)" :disabled="this.$global.isDisabled(112)">审核通过</el-button>
          <el-button @click="onSubmit(4)" :disabled="this.$global.isDisabled(112)">审核不通过</el-button>
          <el-button @click="closeDialog">关闭</el-button>
        </el-form-item>

      </el-form>

    </el-col>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import {updReceivableRequisitionAuditStatus} from '../../../api/modules/settlement'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {},
    data(){
      return {
        receivableAmountAuditVisible: false,
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
        formRules: {
          acceptNo: [
            {required: true, message: '承兑号不能为空', trigger: 'blur,change'}
          ],
          bankAccount: [
            {required: true, message: '银行账户不能为空', trigger: 'blur,change'}
          ],
          bankName: [
            {required: true, message: '银行名称不能为空', trigger: 'blur,change'}
          ],
          auditRemark: [
            {required: false, message: '备注不能为空', trigger: 'blur,change'}
          ]
        },
        form: {
          receivableRequisitionId: '',//应收申请单id(隐藏参数)
          requisitionStatus: '',//审批状态：2-通过/4-不通过
          auditRemark: ''//财务审批备注
//          receiveType: '',//收款方式
//          acceptNo: '',//承兑号
//          bankAccount: '',//银行账户
//          bankName: '',//银行名称
//          receivableAmount: '',//应收金额
//          realAmount: '',//实际收款金额
//          discountAmount: 0,//现金折扣
//          //unReceivableAmount: '',//未收金额(前端计算得出)
//          remark: ''//备注
        }
      }
    },
    computed: {
      ...mapGetters([
//        //收款历史 的接口
//        'acountList',
//        //开票详情 的接口
//        'receivableInvoice'
        'receivableInvoceAndLogById'
      ]),
      receivableAcountList() {
        if (!this.receivableInvoceAndLogById.data) {
          return [];
        }
        return this.receivableInvoceAndLogById.data.rlDtoList;
      },
      receivableInvoiceList() {
        if (!this.receivableInvoceAndLogById.data) {
          return [];
        }
        return this.receivableInvoceAndLogById.data.riList;
      },

      unReceivableAmount() {
        return this.form.receivableAmount - this.form.realAmount - this.form.discountAmount;
      },
      unReceivableAmountClear() {
        return this.unReceivableAmount===0;
      }
//      receiveType_accept() {
//        return this.form.receiveType === '' || this.form.receiveType == 3;
//      },
//      receiveType_bank() {
//        return this.form.receiveType === '' || this.form.receiveType == 2;
//      }
    },
    methods: {
      ...mapActions([
        'outPort', 'getRequisitionDetail',
//        //收款历史
//        'getAcountList',
//        //开票复核 表格数据
//        'getReceivableInvoice',
        //收款历史与开票复核的表格数据
        'getReceivableInvoceAndLogById',
        //新增收款
        'saveReceivableLog',
        //审核通过或不通过
        'updReceivableRequisition'
      ]),
      seltChange(val) {
//        alert(val);
//        alert(this.form.receiveType);
//        alert(this.receiveType_accept);
      },


      getList(){
        //1.获取收款历史 表格数据
//        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
//        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getReceivableInvoice)
        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getReceivableInvoceAndLogById)



//        //订单号
//        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
//        //订舱单号
//        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
//        //箱号
//        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
//        this.pageHandler(this.form, this.getRequisitionDetail)
//        var val = this.form.reqId;
//        this.getDetailSumAmount(val)
      },

      closeDialog() {
        this.receivableAmountAuditVisible = false;
        this.$refs['form'].resetFields()
//        this.item = null;
      },

      //选中复选框计算选中记录条数和选中金额
      handleSelectionChange(val){
//        this.selectData = val;
//        var amount = 0;
//        if(this.selectData.length>0){
//          for (var i = 0; i < this.selectData.length; i++) {
//            var payObject1 = this.selectData[0].payObject;
//            var payObject2 = this.selectData[i].payObject;
//              if(payObject1 != payObject2){
//                this.payObjectName ="";
//                this.selectCount = 0;
//                this.selectSum = 0;
//                this.showFlagA = false;
//                return;
//              }else{
//                amount += this.selectData[i].payAmount;
//              }
//          }
//          this.payObjectName = payObject1;
//          this.selectCount = this.selectData.length;
//          this.selectSum = amount;
//          this.showFlagA = true;
//        }else{
//          this.payObjectName ="";
//          this.selectCount = 0;
//          this.selectSum = 0;
//          this.showFlagA = false;
//        }
      },

//      checkSelectable(row){
//        if(row.pay){
//            this.form.disableFlg=true;
//            return false
//        }
//        this.form.disableFlg=false
//        return true
//      },

      onSubmit(auditStatus) {
        console.log(this.formRules.auditRemark)
        if(auditStatus == 2) {
          this.formRules.auditRemark[0].required = false;
        } else if(auditStatus == 4) {
          this.formRules.auditRemark[0].required = true;
        }
        this.$refs.form.validate((valid) => {
            if (valid) {
              this.form.requisitionStatus = auditStatus;
              //this.updReceivableRequisition(this.form).then(res => {
              updReceivableRequisitionAuditStatus(this.form).then(res => {

                if (res.data.success) {
                  this.$emit("updAmountAuditSuccess");
//                  this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                  this.$refs.form.resetFields()
                  this.receivableAmountAuditVisible = false;
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
//                  this.transferSelected=[]
//                  this.form.showFlgA = false;
//                  this.$parent.getList()
                  return true;
                } else {
//                  this.modifyVisible = false;
                  this.$message({
                    message: '操作失败',
                    type: 'error'
                  })
//                  this.transferSelected=[]
                  return false;
                }
              });
            }
        })



//        //订单号
//        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
//        //订舱单号
//        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
//        //箱号
//        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
//        this.pageHandler(this.form, this.getRequisitionDetail)
//        this.getSumAmount()
      },

      //子公司下拉框
//      getChildCompany(){
//        getDeptmentListApi().then((res) => {
//          let data = res.data;
//          if (data.code == 1) {
//            this.initChild = data.data;
//          }
//        });
//      },

      //子公司下拉框联动(获取物流公司下拉框)
//      selectChild(val){
//        if(undefined!=val && null!=val && ''!=val){
//          let param = {strCode: val}
//          getLogisticListApi(param).then((res) => {
//            let data = res.data;
//          if (data.code == 1) {
//            this.initLogistic = data.data;
//            this.form.logisticsCode=''
//          }
//        })
//        }
//      },

      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //导出excel
//      exportExcel2(){
//        this.$confirm('确认要导出任务吗?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          const token = sessionStorage.getItem('id_token');
//          this.form.Authorization = `Bearer ${token}`;
//          let params = Qs.stringify(this.form);
//        getRequisitionDetailExcelApi(params)
//        });
//      },

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
//      outPortRequisition(){
//        if (this.selectData.length >= 1) {
//          this.$confirm('您确定要移出吗?', '提示', {type: 'warning'})
//            .then(() => {
//              //第二种方法(Json提交)
//              var reqId = this.form.reqId;
//              var reqDetailIds = this.selectData.map(item => item.reqDetailId);
//              var cabCostIds = this.selectData.map(item => item.cabCostId);
//
//              this.RequisitionFeesForm.reqId = reqId;
//              this.RequisitionFeesForm.reqIds = reqDetailIds;
//
//              this.RequisitionFeesForm.reqDetailIds = reqDetailIds;
//              this.RequisitionFeesForm.cabCostIds = cabCostIds;
//
//              this.outPort({data: JSON.stringify(this.RequisitionFeesForm)}).then(res => {
//                if (res.success) {
//                  this.$parent.getList()
//                  this.getList()
//                  this.$message({
//                    message: '移出成功',
//                    type: 'success'
//                  })
//                } else {
//                  this.$message({
//                    message: '移出失败',
//                    type: 'error'
//                  })
//                }
//              });
//            })
//        } else {
//          this.$confirm('请选择要移出的记录！')
//        }
//      },

//      getSumAmount(){
//        this.getRequisitionDetailSumAmount(this.form)
//      }
    },
    created(){
//      this.getChildCompany()
    },
    mounted(){

    }
  }
</script>

<style>
  #eraDialog .el-dialog {
    width: 75%;
  }
</style>
