<template>
  <section>
  <el-dialog
    id="eraDialog"
    size="large"
    title="收款-编辑"
    v-model="editAcountVisible" :before-close="closeDialog">
    <el-col>

      <!-- 编辑收款.标题-->
      <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
        <div style="float:left;margin-right:10px">
          <span style="font-family: Microsoft YaHei;font-size: 120%">收款历史</span>
        </div>
      </el-col>

      <!-- 编辑收款.查询结果-->
      <el-col style="margin-bottom: 20px;">
        <el-table ref="table" :data="acountList.data" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>
          <!--<el-table-column type="selection" fixed :selectable="checkSelectable">-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
            <!--prop="acceptNo"-->
            <!--label="序号">-->
          <!--</el-table-column>-->

          <el-table-column
            label="序号"
            type="index">
          </el-table-column>

          <el-table-column
            prop="receiveTypeStr"
            label="收款方式">
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

          <!--<el-table-column-->
            <!--prop="deptName"-->
            <!--label="操作列">-->
          <!--</el-table-column>-->
          <el-table-column label="操作" prop="contactInfo" width="80" fixed="right">
            <template scope="scope">
              <el-button size="small" type="primary" @click="showEditAcountTrue(scope.row)" :disabled="editAcountAccess">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--表单部分-->
      <el-form v-if="formWrapVisible" ref="form" :rules="formRules" :model="form" label-width="100px" style="width: 400px;margin: auto;">

        <el-form-item label="收款方式" prop="receiveType" :label-width="labelWidth">
          <el-select clearable filterable default-first-option v-model="form.receiveType" @change="seltChange" placeholder="请选择收款方式" class='control-width2'>
            <el-option label="现金" :key="form.receiveType" :value="0"></el-option>
            <el-option label="微信转账" :key="form.receiveType" :value="2"></el-option>
            <el-option label="银行转账" :key="form.receiveType" :value="3"></el-option>
            <el-option label="承兑" :key="form.receiveType" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="this.form.receiveType == 1">
          <el-form-item label="承兑号" prop="acceptNo" :label-width="labelWidth">
            <el-input v-model="form.acceptNo" class='control-width2'></el-input>
          </el-form-item>
        </template>

        <template v-if="this.form.receiveType === 3">
          <el-form-item label="银行账户" prop="bankAccount" :label-width="labelWidth">
            <!--<el-input v-model="form.bankAccount" class='control-width2'></el-input>-->
            <el-select clearable filterable default-first-option @change="bankAccountChange" v-model="form.bankAccount" class='control-width2' placeholder="请选择银行帐号">
              <el-option v-for="item in bankAccountList"
                         :key="item.value"
                         :label="item.text"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="银行名称" prop="bankName" :label-width="labelWidth">
            <!--<el-input v-model="form.bankName" class='control-width2'></el-input>-->
            <el-select :disabled="true" clearable filterable default-first-option v-model="form.bankName" class='control-width2' placeholder="请选择银行">
              <el-option v-for="item in bankNameList"
                         :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </template>

        <el-form-item label="应收金额" prop="receivableAmount" :label-width="labelWidth">
          <el-input v-model="form.receivableAmount" :disabled="true" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="实收金额" prop="realAmount" :label-width="labelWidth">
          <el-input v-model="form.realAmount" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="现金折扣" prop="discountAmount" :label-width="labelWidth">
          <el-input v-model="form.discountAmount" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="未收金额" prop="unReceivableAmount" :label-width="labelWidth">
          <el-input v-model="unReceivableAmount" :disabled="true" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark" :label-width="labelWidth">
          <el-input type="textarea" v-model="form.remark" style="width: 250px;"></el-input>
        </el-form-item>

        <el-form-item label-width="0" style="text-align: center;">
          <el-button type="primary" @click="onSubmit" :disabled="!unReceivableAmountClear">全部收款</el-button>
          <el-button type="primary" @click="onSubmit2" :disabled="unReceivableAmountClear2">部分收款</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>

      </el-form>

    </el-col>
  </el-dialog>
  <el-dialog
    id="editAcountTrue"
    size="large"
    title="编辑收款历史"
    v-model="editAcountVisibleTrue" :before-close="closeDialog2">
    <el-form ref="form2" :rules="formRules2" :model="form2" label-width="100px" style="width: 400px;margin: auto;">

      <el-form-item label="收款方式" prop="receiveType" :label-width="labelWidth">
        <el-select clearable filterable default-first-option v-model="form2.receiveType" @change="seltChange" placeholder="请选择收款方式" class='control-width2'>
          <el-option label="现金" :key="form2.receiveType" :value="0"></el-option>
          <el-option label="微信转账" :key="form2.receiveType" :value="2"></el-option>
          <el-option label="银行转账" :key="form2.receiveType" :value="3"></el-option>
          <el-option label="承兑" :key="form2.receiveType" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <template v-if="this.form2.receiveType == 1">
        <el-form-item label="承兑号" prop="acceptNo" :label-width="labelWidth">
          <el-input v-model="form2.acceptNo" class='control-width2'></el-input>
        </el-form-item>
      </template>

      <template v-if="this.form2.receiveType === 3">
        <el-form-item label="银行账户" prop="bankAccount" :label-width="labelWidth">
          <!--<el-input v-model="form2.bankAccount" class='control-width2'></el-input>-->
          <el-select clearable filterable default-first-option @change="bankAccountChange2" v-model="form2.bankAccount" class='control-width2' placeholder="请选择银行帐号">
            <el-option v-for="item in bankAccountList"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行名称" prop="bankName" :label-width="labelWidth">
          <!--<el-input v-model="form2.bankName" class='control-width2'></el-input>-->
          <el-select clearable filterable default-first-option v-model="form2.bankName" class='control-width2' placeholder="请选择银行">
            <el-option v-for="item in bankNameList"
                       :key="item.value"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="应收金额" prop="receivableAmount" :label-width="labelWidth">
        <el-input v-model="form2.receivableAmount" :disabled="true" class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="实收金额" prop="realAmount" :label-width="labelWidth">
        <el-input v-model="form2.realAmount" class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="现金折扣" prop="discountAmount" :label-width="labelWidth">
        <el-input v-model="form2.discountAmount" class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="未收金额" prop="unReceivableAmount2" :label-width="labelWidth">
        <el-input v-model="unReceivableAmount2" :disabled="true" class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark" :label-width="labelWidth">
        <el-input type="textarea" v-model="form2.remark" style="width: 250px;"></el-input>
      </el-form-item>

      <el-form-item label-width="0" style="text-align: center;">
        <el-button type="primary" @click="onSubmitTrue">确定</el-button>
        <el-button @click="closeDialog2">取消</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>

  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import {getSelectListApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {},
    data(){
      return {
        bankAccountList: [],
        bankNameList:[],
        editAcountAccess: this.$global.isDisabled(106),
        formWrapVisible: true,
        editAcountVisible: false,
        editAcountVisibleTrue: false,
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
        },
        formRules2: {
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
        form2: {
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
      unReceivableAmount2() {
        return this.form2.receivableAmount - this.form2.realAmount - this.form2.discountAmount;
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
        'saveReceivableLogPortion',
        //编辑收款历史
        'updateReceivableLog'
      ]),

      //银行账号选择事件
      bankAccountChange(param){
        this.bankNameList.filter((res)=>{
          if(res.code != null){
            if(res.code === param){
              this.form.bankName = res.value;
//              console.log(this.form.bankAccount)
//              console.log(this.form2.bankAccount)
//              console.log(this.form.bankName)
//              console.log(this.form2.bankName)
              return ;
            }
          }
        })
      },
      bankAccountChange2(param){
        this.bankNameList.filter((res)=>{
          if(res.code != null){
            if(res.code === param){
              this.form2.bankName = res.value;
//              console.log(this.form.bankAccount)
//              console.log(this.form2.bankAccount)
//              console.log(this.form.bankName)
//              console.log(this.form2.bankName)
              return ;
            }
          }
        })
      },

      showEditAcountTrue(row) {
        this.form2.receivableLogId = row.receivableLogId;
        this.form2.receiveType = row.receiveType;
        this.form2.acceptNo = row.acceptNo;
        this.form2.bankAccount = row.bankAccount;
        this.form2.bankName = row.bankName;

        this.form2.receivableAmount = row.receivableAmount;
        this.form2.realAmount = row.realAmount;
        this.form2.discountAmount = row.discountAmount;
        this.form2.remark = row.remark;

        this.editAcountVisibleTrue = true;
      },

      seltChange(val) {
//        alert(val);
//        alert(this.form.receiveType);
//        alert(this.receiveType_accept);
      },


      getList(){
        //1.获取收款历史 表格数据
        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)

        getSelectListApi().then(res => {
            if (res.data.success) {
              this.bankAccountList = res.data.data.bankAccountList;
              this.bankNameList = res.data.data.bankNameList;
            }
        })

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
        this.editAcountVisible = false;
        this.$refs['form'].resetFields()
        this.item = null;
      },
      closeDialog2() {
        this.editAcountVisibleTrue = false;
        this.$refs['form2'].resetFields()
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

      onSubmitTrue() {
        this.$refs.form2.validate((valid) => {
          if (valid) {

            this.updateReceivableLog(this.form2).then(res => {
              if (res.success) {
                //Receivable刷新table页
                this.$emit("saveEditAcountSuccess");
                //EditAcount刷新收款历史页
                //this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                //EditAcount刷新部分表单数据
                this.getAcountList({"receivableRequisitionId": this.form.receivableRequisitionId}).then(res => {
                  if (res.success) {
                    //console.log('acountList已刷新')
                    let lastIndex = this.acountList.data.length-1;
                    this.form.receivableAmount = this.form.realAmount = this.acountList.data[lastIndex].unReceivableAmount
                    //console.log(this.acountList.data[lastIndex].unReceivableAmount)
                  }
                });


                this.$refs.form2.resetFields()
                this.editAcountVisibleTrue = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                return true;
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'error'
                })
                return false;
              }
            });

          }
        })
      },

      onSubmit() {
        this.$refs.form.validate((valid) => {
            if (valid) {
              this.saveReceivableLog(this.form).then(res => {
                if (res.success) {
                  this.$emit("saveEditAcountSuccess");
                  this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getAcountList)
                  this.$refs.form.resetFields()
                  this.editAcountVisible = false;
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
                  this.editAcountVisible = false;
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
  #editAcountTrue .el-dialog,
  #eraDialog .el-dialog {
    width: 75%;
  }
</style>
