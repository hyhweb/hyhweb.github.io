<template>
  <el-dialog
    id="prepaidFreightBill"
    class="prepaid-freight-bill"
    size="large"
    title="运柜宝预支运费签收单"
    v-model="prepaidFreightBillVisible" append-to-body :before-close="closeDialog">
      <!-- table -->
      <el-col style="margin-bottom: 20px;">
        <el-row id="pdfWrapper">
          <el-col>
            <!--<p>{{}}(车牌号：{{}})，您好！</p>-->
            <!--<p style="text-indent: 2em;">根据您的申请，我司于{{}}为您办理了预支运费业务，具体如下：</p>-->
          </el-col>

          <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
            <div style="float:left;margin-right:10px">
              <span style="font-family: Microsoft YaHei;font-size: 120%">预支运费信息</span>
            </div>
          </el-col>

          <el-col>
            <table class="freight-table">
              <thead>
                <tr>
                  <th width="13%">序号</th>
                  <th width="43.5%">日期</th>
                  <th width="43.5%">运费金额(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData6">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.cost }}</td>
                </tr>
                <tr>
                  <td style="box-sizing: border-box; width: 93px;">银行卡信息</td>
                  <td>
                    <p>收款账号：123232222222334</p>
                    <p>开户人：张三</p>
                    <p>开户银行：兴业银行</p>
                    <p>开户网点：深圳南山科技园支行</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <p>温馨提示：</p>
                    <p>在业务办理后1个工作日后，费用未到账的，请尽快与平台客服联系。</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 0;">
                    <div class="imitate-table">
                      <div class="imitate-td">业务办理人员（签字）</div>
                      <div class="imitate-td">司机确认（签字）</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>

          <!--startprint-->
          <!--<p id="pdf">test print</p>-->
          <!--endprint-->
          <el-col class="noprint" style="margin-top: 25px; text-align: center;">
            <el-button type="primary" @click="printBill">打印</el-button>
          </el-col>

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
        tableData6: [{
          id: '12987122',
          date: '2017年12月7日',
          cost: '1111'
        }, {
          id: '12987122',
          date: '2017年12月8日',
          cost: '1111'
        }, {
          id: '12987122',
          date: '2017年12月9日',
          cost: '1111'
        }, {
          id: '12987122',
          date: '2017年12月10日',
          cost: '1111'
        }, {
          id: '12987122',
          date: '2017年12月11日',
          cost: '1111'
        }, {
          id: '12987122',
          date: '2017年12月12日',
          cost: '1111'
        }],

        prepaidFreightBillVisible: false,
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

      printBill() {
//        let bdhtml=window.document.body.innerHTML;
//        const sprnstr="<!--startprint-->";
//        const eprnstr="<!--endprint-->";
//        let prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
//        console.log(prnhtml)
//        console.log(bdhtml.indexOf(sprnstr)+17)
//        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
//        console.log(prnhtml)
//        window.document.body.innerHTML=prnhtml;
//        window.print();

//        let newContent = document.getElementById("pdfWrapper").innerHTML;   //获取需要生成pdf页面的div代码
//        let oldContent = document.body.innerHTML;
//        let newWindow = window.open("_blank");   //打开新窗口
//        newWindow.document.write(oldContent);   //向文档写入HTML表达式或者JavaScript代码
//        newWindow.document.body.innerHTML = newContent;  //向文档写入HTML表达式或者JavaScript代码
////        newWindow.document.onload = function() {
//          newWindow.print();   //打印当前窗口
//          newWindow.document.close();     //关闭document的输出流, 显示选定的数据
////        }
//        return false;

//        let newContent = document.getElementById("pdfWrapper").innerHTML;
//        let oldContent = document.body.innerHTML;
//        document.body.innerHTML = newContent;
//        window.print();
//        window.location.reload();
//        document.body.innerHTML = oldContent;
//        return false;
        window.print();
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
        this.prepaidFreightBillVisible = false;
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
                  this.prepaidFreightBillVisible = false;
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
                  this.prepaidFreightBillVisible = false;
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

<style lang="scss" type="text/scss">
  #prepaidFreightBill .el-dialog {
    /*width: 50%;*/
    /*min-width: 800px;*/
    width: 750px;
    padding-bottom: 60px;
  }

  .freight-table {
    width: 100%;
    /*border: 1px solid #dfe6ec;*/
    border: 1px solid #dfe6ec;
    border-collapse: collapse;
    border-spacing: 0;

    th,
    td {
      padding: 12px 10px;
      text-align: left;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;

      &:last-child {
        border-right: 0;
      }
    }

    tbody tr:last-child {

      td {
        border-bottom: 0;
      }
    }
  }
  /*************************/
  .collapse-table {
    width: 100%;
    border: 1px solid #dfe6ec;
    border-top: 0;
    border-collapse: collapse;
    border-spacing: 0;

    td {
      padding: 12px 10px;
      text-align: left;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;

      &:last-child {
        border-right: 0;
      }
    }
  }

  .imitate-table {
    display: flex;
    height: 120px;
  }
  .imitate-table .imitate-td {
    flex: 1;
    padding: 12px 10px;
    border-right: 1px solid #dfe6ec;
  }
  .imitate-table .imitate-td:last-of-type {
    border-right: none;
  }

  /************************/
  @media print {

    .prepaid-freight-bill .el-dialog {
      width: 100% !important;
      height: 100% !important;
      top: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: translateX(0) !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      border: 0 !important;

      &__header {
        text-align: center;
      }
      &__headerbtn {
        display: none;
      }

      .toolbar {
        padding-left: 0;
      }

      table, th, td, div {
        border-color: #555;
      }

      .el-table {
        /*border-color: #000;*/

        &:before,
        &:after {
          display: none !important;
        }

        td,
        th {
          /*border-color: #000;*/
        }

        &__header,
        &__body,
        &__footer {
          width: 100% !important;
        }
      }
    }

    .collapse-table,
    .collapse-table td,
    .imitate-table .imitate-td {
      /*border-color: #000;*/
    }

    .noprint {
      display: none !important;
    }
  }
</style>
