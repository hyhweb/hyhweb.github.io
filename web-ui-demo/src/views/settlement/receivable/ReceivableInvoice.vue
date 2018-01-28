<template>
  <div>

    <el-dialog
      id="eraDialog"
      size="large"
      title="开票功能"
      :visible.sync="receivableInvoiceVisible" :before-close="closeDialog">
      <el-col>

        <!-- 开票复核.标题-->
        <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
          <div style="float:left;margin-right:10px">
            <span style="font-family: Microsoft YaHei;font-size: 120%">以下涉及到费用金额的单位均为“元”</span>
          </div>
          <el-button type="primary" icon="plus" @click="add" size="small" :disabled="this.$global.isDisabled(110)">新增</el-button>
          <el-button type="primary" icon="edit" @click="del" size="small" :disabled="this.$global.isDisabled(110)">删除</el-button>
        </el-col>

        <!-- 开票复核.查询结果-->
        <el-col style="margin-bottom: 20px;">
          <el-table ref="table" :data="receivableInvoice.data" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>
            <el-table-column type="selection" fixed>
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

        <!-- 编辑收款.分页-->
        <!--<el-col style="padding:10px 0 20px;text-align:center;">-->
          <!--<el-pagination layout="total, sizes, prev, pager, next, jumper"-->
                         <!--@current-change="handleCurrentChange"-->
                         <!--@size-change="handleSizeChange"-->
                         <!--:current-page="pageNo"-->
                         <!--:page-size="pageSize"-->
                         <!--:total="pageCount"-->
                         <!--:page-sizes="pagesizes">-->
          <!--</el-pagination>-->
        <!--</el-col>-->

        <div style="text-align: center; margin-bottom: 20px;">
          <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(110)">确认开票</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>

      </el-col>

    </el-dialog>
    <AddReceivableInvoice ref="addReceivableInvoice" @saveReceivableInvoiceSuccess="getList"></AddReceivableInvoice>
  </div>
</template>

<script>
  import AddReceivableInvoice from './AddReceivableInvoice.vue'
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi,delReceivableInvoiceApi} from '../../../api/modules/settlement'
  import {getReceivableInvoiceApi} from '../../../api/modules/settlement'
  import {confirmReceivableInvoiceApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {
      AddReceivableInvoice
    },
    data(){
      return {
        receivableInvoiceVisible: false,
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
          ]
        },
        form: {
          receivableRequisitionId: '',//应收申请单id(隐藏参数)
          requisitionObjType: '',
          customerName: ''
        },
        form1: {
          receivableRequisitionId: '',//应收申请单id(隐藏参数)
          requisitionStatus: '1'
        }

      }
    },
    computed: {
      ...mapGetters([
        //开票详情 的接口
        'receivableInvoice'
      ]),
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
        //开票复核 表格数据
        'getReceivableInvoice',
        //新增收款
        'saveReceivableLog',
        //确认开票
        'updReceivableRequisition'
      ]),
      seltChange(val) {
//        alert(val);
//        alert(this.form.receiveType);
//        alert(this.receiveType_accept);
      },


      add() {
        this.$refs.addReceivableInvoice.form.receivableRequisitionId = this.form.receivableRequisitionId;
        this.$refs.addReceivableInvoice.form.receiveObj = this.form.requisitionObjType;
        this.$refs.addReceivableInvoice.form.payObj = this.form.customerName;
        this.$refs.addReceivableInvoice.addReceivableInvoiceVisible = true;
//        this.$refs.addReceivableInvoice.getList();
      },

      del() {
        if (this.selectData.length > 0) {
          let ids = "";
          this.$confirm('此操作将永久删除，是否继续?', '提示', {type: 'warning'}).then(() => {
            this.selectData.forEach(function(item) {
              ids += item.receivableInvoiceId+",";
            });
//            console.log(ids);
            ids = ids.substr  (0, ids.length - 1);
//            console.log(ids);

            delReceivableInvoiceApi({"ids": ids}).then((res) => {
              if (res.data.success) {
//                this.$refs['form'].resetFields();
                this.getList();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                });
              }
            });
          });
        } else {
          this.$confirm('请选择要删除的记录！');
        }
      },

      getList(){
        //1.获取开票 表格数据
        this.pageHandler({receivableRequisitionId: this.form.receivableRequisitionId}, this.getReceivableInvoice)


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
        this.receivableInvoiceVisible = false;
//        this.$refs['form'].resetFields()
//        this.item = null;
      },

      //选中复选框计算选中记录条数和选中金额
      handleSelectionChange(val){
        this.selectData = val;
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

      onSubmit() {
//        this.$refs.form.validate((valid) => {
//          if (valid) {
        if(this.receivableInvoice.data.length === 0) {
          //console.log(this.receivableInvoice.data.length);
          this.$message({
            message: '开票失败，请先增加一条数据',
            type: 'warning'
          })
          return;
        }
            //this.updReceivableRequisition(this.form1).then(res => {
            confirmReceivableInvoiceApi(this.form1).then(res => {

              if (res.data.success) {
                this.$emit("updReceivableRequisitionSuccess");
//                this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                this.receivableInvoiceVisible = false;
                this.$message({
                  message: '开票成功',
                  type: 'success'
                })
//                  this.transferSelected=[]
//                  this.form.showFlgA = false;
//                  this.$parent.getList()
                return true;
              } else {
//                console.log(res)
//                  this.modifyVisible = false;
                this.$message({
                  message: '开票失败',
                  type: 'error'
                })
//                  this.transferSelected=[]
                return false;
              }
            });
//          }
//        })


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
