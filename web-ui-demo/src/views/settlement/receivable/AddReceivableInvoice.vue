<template>
  <el-dialog
    id="eraDialog"
    size="large"
    title="开票新增"
    :visible.sync="addReceivableInvoiceVisible"
    append-to-body
    :before-close="closeDialog">

    <el-col>

      <!--表单部分-->
      <el-form ref="form" :rules="formRules" :model="form" label-width="100px" style="width: 400px;margin: auto;">

        <el-form-item label="发票代码" prop="invoiceCode" :label-width="labelWidth">
          <el-input v-model="form.invoiceCode" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="发票号码" prop="invoiceNo" :label-width="labelWidth">
          <el-input v-model="form.invoiceNo" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="付款单位(个人)名称" prop="payObj" :label-width="labelWidth">
          <el-input v-model="form.payObj" :disabled="true" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="收款单位(个人)名称" prop="receiveObj" :label-width="labelWidth">
          <el-input v-model="form.receiveObj" :disabled="true" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="开票金额" prop="invoiceAmount" :label-width="labelWidth">
          <el-input v-model.number="form.invoiceAmount" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="开票日期" prop="invoiceDate" :label-width="labelWidth">
          <el-date-picker type="date" v-model="form.invoiceDate" class='control-width2' icon="" placeholder="选择日期" style=""></el-date-picker>
        </el-form-item>

        <el-form-item label="发票税率" prop="taxRate" :label-width="labelWidth">
          <el-select clearable filterable default-first-option v-model="form.taxRate" placeholder="请选择发票税率" class='control-width2'>
            <el-option label="3%" :key="form.taxRate" value="3%"></el-option>
            <el-option label="6%" :key="form.taxRate" value="6%"></el-option>
            <el-option label="11%" :key="form.taxRate" value="11%"></el-option>
            <el-option label="17%" :key="form.taxRate" value="17%"></el-option>
            <el-option label="普通发票" :key="form.taxRate" value="普通发票"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark" :label-width="labelWidth">
          <el-input type="textarea" v-model="form.remark" style="width: 250px;"></el-input>
        </el-form-item>

        <el-form-item label-width="0" style="text-align: center;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
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
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {},
    data(){
      return {
        addReceivableInvoiceVisible: false,
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
          invoiceCode: [
            {required: true, message: '发票代码不能为空', trigger: 'blur,change'}
          ],
          invoiceNo: [
            {required: true, message: '发票号码不能为空', trigger: 'blur,change'}
          ],
          payObj: [
            {required: true, message: '付款单位(个人)名称不能为空', trigger: 'blur,change'}
          ],
          receiveObj: [
            {required: true, message: '收款单位(个人)名称不能为空', trigger: 'blur,change'}
          ],
          invoiceAmount: [
            {type: 'number', required: true, message: '开票金额为数字,不能为空', trigger: 'blur,change'}
          ],
          invoiceDate: [
            {type: 'date', required: true, message: '开票日期不能为空', trigger: 'blur,change'}
          ],
          taxRate: [
            {required: true, message: '发票税率不能为空', trigger: 'blur,change'}
          ]
        },

        form: {
          receivableRequisitionId: '',//应收申请单id(隐藏参数)
          invoiceCode: '',
          invoiceNo: '',
          payObj: '',
          receiveObj: '',
          invoiceAmount: '',
          invoiceDate: '',
          taxRate: '',
          remark: ''
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
        //新增开票
        'saveReceivableInvoice'
      ]),
      seltChange(val) {
//        alert(val);
//        alert(this.form.receiveType);
//        alert(this.receiveType_accept);
      },


      getList(){
        //1.获取收款历史 表格数据
//        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)


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
        this.addReceivableInvoiceVisible = false;
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

      onSubmit() {
        this.$refs.form.validate((valid) => {
            if (valid) {
              //日期格式转换
//              this.form.invoiceDate = (typeof(this.form.invoiceDate) == "string" ? this.form.invoiceDate + " 00:00:00" : util.formatDate.format(this.form.invoiceDate, 'yyyy-MM-dd 00:00:00'));
              this.form.invoiceDate = (typeof(this.form.invoiceDate) == "string" ? this.form.invoiceDate : util.formatDate.format(this.form.invoiceDate, 'yyyy-MM-dd hh:mm:ss'));

              this.saveReceivableInvoice(this.form).then(res => {
                if (res.success) {
                  this.$emit("saveReceivableInvoiceSuccess");
//                  this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                  this.$refs.form.resetFields()
                  this.addReceivableInvoiceVisible = false;
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  })
//                  this.transferSelected=[]
//                  this.form.showFlgA = false;
//                  this.$parent.getList()
                  return true;
                } else {
//                  alert("失败")
//                  this.modifyVisible = false;
//                  this.form.invoiceDate = util.formatDate.format(this.form.invoiceDate, 'yyyy-MM-dd hh:mm:ss');
//                  this.form.invoiceDate = '';
//                  this.$refs.form.resetFields();

                  this.$message({
                    message: '新增失败',
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
