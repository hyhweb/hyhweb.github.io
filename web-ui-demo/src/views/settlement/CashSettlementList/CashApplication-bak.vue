<template>
  <div>
  <el-dialog
    id="cashApplication"
    size="small"
    title="结算申请"
    v-model="cashApplicationVisible" :before-close="closeDialog">
    <el-col>

      <!-- display -->
      <!--<el-col :span="12">-->
        <!--<label>子公司：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<label>物流公司：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->

      <!--<el-col :span="12">-->
        <!--<label>司机：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<label>申请时间：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->

      <!--<el-col :span="12">-->
        <!--<label>结算单号：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<label>结算方式：</label>-->
        <!--<span>现结</span>-->
      <!--</el-col>-->

      <!--<el-col :span="12">-->
        <!--<label>运费总金额：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<label>箱数量：</label>-->
        <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
      <!--</el-col>-->

      <!--<el-row type="flex" justify="end">-->
        <!--<el-col :span="2">-->
          <!--<el-button type="primary">打印账单</el-button>-->
        <!--</el-col>-->
      <!--</el-row>-->



      <!-- form -->
      <el-col style="margin-bottom: 20px;">
        <el-form class="cashApp-center-form" ref="form" :rules="formRules" :model="form" label-width="100px" style="">
          <div class="cashApp-inline-form">
            <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
              <el-button type="primary" @click="printBill">打印账单</el-button>
            </div>
            <div class="el-form-item-inline-wrapper">
              <el-form-item label="子公司" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
              <el-form-item label="物流公司" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
            </div>

            <div class="el-form-item-inline-wrapper">
              <el-form-item label="司机" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
              <el-form-item label="申请时间" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
            </div>

            <div class="el-form-item-inline-wrapper">
              <el-form-item label="结算单号" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
              <el-form-item label="结算方式" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
            </div>

            <div class="el-form-item-inline-wrapper">
              <el-form-item label="运费总金额" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
              <el-form-item label="箱数量" prop="acceptNo" :label-width="labelWidth">
                <el-input v-model="form.acceptNo" class='control-width2'></el-input>
              </el-form-item>
            </div>
          </div>

          <el-form-item label="收款帐号" prop="acceptNo" :label-width="labelWidth">
            <el-input v-model="form.acceptNo"></el-input>
          </el-form-item>

          <div class="el-form-item-inline-wrapper">
            <el-form-item label="开户人" prop="bankAccount" :label-width="labelWidth">
              <el-input v-model="form.bankAccount" class='control-width2'></el-input>
            </el-form-item>

            <el-form-item label="开户银行" prop="receiveType" :label-width="labelWidth">
              <el-select clearable filterable default-first-option v-model="form.receiveType" @change="seltChange" placeholder="请选择开户银行" class='control-width2'>
                <!--<el-option-->
                  <!--v-for="item in customList"-->
                  <!--:label="item.customerName"-->
                  <!--:key="item.customerId"-->
                  <!--:value="item.customerId">-->
                <!--</el-option>-->
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="开户网点" prop="bankName" :label-width="labelWidth">
            <el-input v-model="form.bankName"></el-input>
          </el-form-item>

          <el-form-item label="账单" prop="receivableAmount" :label-width="labelWidth">
            <!--<el-input v-model="form.receivableAmount" :disabled="true" class='control-width2'></el-input>-->
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <el-button size="medium" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">（注：请点击右上角【打印账单】上传司机对运费金额签字确定后的账单！）</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="现结申请说明" prop="remark" :label-width="labelWidth">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item label-width="0" style="text-align: center; position: relative; top: 166px;">
            <el-button type="primary" @click="onSubmit" :disabled="!unReceivableAmountClear">保存&提交</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="!unReceivableAmountClear">保存</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-form-item>

        </el-form>
      </el-col>

      <!-- table -->
      <el-col style="margin-bottom: 20px; margin-top: -70px;">
        <label>集装箱列表：</label>
        <el-table ref="table" :data="acountList.data" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>
          <!--<el-table-column type="selection" fixed :selectable="checkSelectable">-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
            <!--label="序号"-->
            <!--type="index">-->
          <!--</el-table-column>-->

          <el-table-column
            prop="receiveTypeStr"
            label="订单编号">
          </el-table-column>

          <el-table-column
            prop="receivableAmount"
            label="箱号">
          </el-table-column>

          <el-table-column
            prop="realAmount"
            label="箱型">
          </el-table-column>

          <el-table-column
            prop="discountAmount"
            label="送货类型">
          </el-table-column>

          <el-table-column
            prop="unReceivableAmount"
            label="集装箱状态">
          </el-table-column>

          <el-table-column
            prop="unReceivableAmount"
            label="完成日期">
          </el-table-column>

          <el-table-column
            prop="unReceivableAmount"
            label="签收单照片">
          </el-table-column>

          <el-table-column
            prop="unReceivableAmount"
            label="运费小计">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="行程运费备注">
          </el-table-column>

          <!--<el-table-column-->
            <!--prop="deptName"-->
            <!--label="操作列">-->
          <!--</el-table-column>-->
        </el-table>
      </el-col>

      <!-- 编辑收款.分页-->
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

    </el-col>
  </el-dialog>
  <PrepaidFreightBill ref="prepaidFreightBill"></PrepaidFreightBill>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import PrepaidFreightBill from './PrepaidFreightBill.vue'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {
      PrepaidFreightBill
    },
    data(){
      return {
        cashApplicationVisible: false,
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
          receiveType: [
            {type: 'number', required: true, message: '请选择收款方式', trigger: 'blur,change'}
          ],
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
          receiveType: '',//收款方式
          acceptNo: '',//承兑号
          bankAccount: '',//银行账户
          bankName: '',//银行名称
          receivableAmount: '',//应收金额
          realAmount: '',//实际收款金额
          discountAmount: 0,//现金折扣
          //unReceivableAmount: '',//未收金额(前端计算得出)
          remark: ''//备注
        }
      }
    },
    computed: {
      ...mapGetters([
        //收款历史 的接口
        'acountList'
      ]),
      unReceivableAmount() {
        return this.form.receivableAmount - this.form.realAmount - this.form.discountAmount;
      },
      unReceivableAmountClear() {
        if (this.$global.isDisabled(106) === true) {
          return true;
        }
        return this.unReceivableAmount===0;
      },
      unReceivableAmountClear2() {
        if (this.$global.isDisabled(106) === true) {
          return true;
        }
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
        'getAcountList',
        //新增收款-全部收款
        'saveReceivableLog',
        //新增收款-部分收款
        'saveReceivableLogPortion'
      ]),
      seltChange(val) {
//        alert(val);
//        alert(this.form.receiveType);
//        alert(this.receiveType_accept);
      },

      //打印账单
      printBill() {
        this.$refs.prepaidFreightBill.prepaidFreightBillVisible = true;
//        this.$refs.prepaidFreightBill.getList();
      },

      getList(){
        //1.获取收款历史 表格数据
        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)


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
        this.cashApplicationVisible = false;
        this.$refs['form'].resetFields()
        this.item = null;
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

      onSubmit() {
        this.$refs.form.validate((valid) => {
            if (valid) {
              this.saveReceivableLog(this.form).then(res => {
                if (res.success) {
                  this.$emit("saveEditAcountSuccess");
                  this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                  this.$refs.form.resetFields()
                  this.cashApplicationVisible = false;
//                  this.item = null;
//                  this.modifyVisible = false;
                  this.$message({
                    message: '收款成功',
                    type: 'success'
                  })
//                  this.transferSelected=[]
//                  this.form.showFlgA = false;
//                  this.$parent.getList()
                  return true;
                } else {
//                  this.modifyVisible = false;
                  this.$message({
                    message: '收款失败',
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

        onSubmit2() {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.saveReceivableLogPortion(this.form).then(res => {
                if (res.success) {
                  this.$emit("saveEditAcountSuccess");
                  this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                  this.$refs.form.resetFields()
                  this.cashApplicationVisible = false;
                  this.$message({
                    message: '收款成功',
                    type: 'success'
                  })
                  return true;
                } else {
                  this.$message({
                    message: '收款失败',
                    type: 'error'
                  })
                  return false;
                }
              });
            }
          })
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
  #cashApplication .el-dialog {
    width: 50%;
    min-width: 800px;
    padding-bottom: 60px;
  }
  #cashApplication .el-dialog__body {
    padding-top: 0;
  }

  .cashApp-center-form {
    width: 92%;
    max-width: 800px;
    padding-right: 3%;
    margin: auto;
  }

  .el-form-item-inline-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .el-form-item-inline-wrapper .el-form-item {
    /*flex: 1;*/
  }
  .el-form-item-inline-wrapper .el-form-item input {
    /*border: none;*/
  }


</style>
