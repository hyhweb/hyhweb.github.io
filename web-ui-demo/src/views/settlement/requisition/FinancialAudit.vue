<template >
  <el-dialog
    title="财务审核"
    :visible.sync="auditVisible" class="audit">
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">付款详情</span>
      </div>
      <el-col>
        <TableBox>
          <!--列表-->
          <el-col>
            <el-table ref="table" @row-click="handleRowClick"
                      :data="payablePayLogList.data" stripe @selection-change="handleSelectionChange1"
            >
              <el-table-column prop="payTypeText" align="center"
                               label="付款方式" width="100">
              </el-table-column>
              <el-table-column prop="acceptNo" align="center"
                               label="承兑号" width="100">
              </el-table-column>
              <el-table-column
                prop="bankAccount" align="center"
                label="银行账户" width="150">
              </el-table-column>
              <el-table-column
                prop="bankName" align="center"
                label="银行名称" width="150">
              </el-table-column>
              <el-table-column
                prop="payAmount" align="center"
                label="应付金额" width="100">
              </el-table-column>
              <el-table-column
                prop="realAmount" align="center"
                label="实际付款金额" width="100">
              </el-table-column>

              <el-table-column
                prop="discountAmount" align="center"
                label="现金折扣" width="80">
              </el-table-column>

              <el-table-column
                prop="unpaidAmount" align="center"
                label="未付金额" width="70">
              </el-table-column>

              <el-table-column
                prop="payRemark" align="center"
                label="备注" width="120">
              </el-table-column>
            </el-table>
          </el-col>
        </TableBox>
      </el-col>
    </el-col>
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">发票详情</span>
      </div>
    <el-col>
          <TableBox>
            <!--列表-->
            <el-col>
              <el-table ref="table" @row-click="handleRowClick"
                        :data="payableInvoiceList.data" stripe @selection-change="handleSelectionChange1"
              >
                <el-table-column prop="invoiceCode" align="center"
                                 label="发票代码" width="100">
                </el-table-column>
                <el-table-column
                  prop="invoiceNo" align="center"
                  label="发票号码" width="100">
                </el-table-column>
                <el-table-column
                  prop="payObjName" align="center"
                  label="付款单位(个人)名称" width="150">
                </el-table-column>
                <el-table-column
                  prop="receiveObjName" align="center"
                  label="收款单位(个人)名称" width="150">
                </el-table-column>
                <el-table-column
                  prop="invoiceAmount" align="center"
                  label="开票金额" width="100">
                </el-table-column>

                <el-table-column
                  prop="invoiceDate" align="center"
                  label="开票日期" width="140">
                </el-table-column>

                <el-table-column
                  prop="taxRate" align="center"
                  label="发票税率" width="100">
                </el-table-column>

                <el-table-column
                  prop="remark" align="center"
                  label="备注" width="130">
                </el-table-column>
              </el-table>
            </el-col>
          </TableBox>
    </el-col>
    </el-col>
    <el-col class="textWidth">
      <div>
        审核备注:
        <el-input style="width: 40%;"
          type="textarea"
          v-model="form.auditRemark" :rows='2' >
        </el-input>
      </div>
    </el-col>
    <el-col align="center" slot="footer" class="auditButton">
      <el-button-group>
        <el-button type="success" @click="audit(5)">审核通过</el-button>&nbsp;&nbsp;&nbsp;
        <el-button type="warning" @click="audit(6)">审核不通过</el-button>
        <el-button type="info" @click="cancel">取 消</el-button>
      </el-button-group>
    </el-col>

  </el-dialog>

</template>
<style>
  .audit .el-dialog{
    min-width: 664px;
    width: 1035px!important;
    /*height: 1500px;*/
  }
  .audit .auditButton{
    width: 100%;
    padding:35px 0;
  }
  .auditButton div{
    width: 29%;
    margin: 0 auto;
  }

  .textWidth{
    width: 100%;
  }
  .textWidth div{
    text-align: center;margin-top:20px;
  }

</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import {financialAuditApi} from '../../../api/modules/settlement'
  import ElCol from "element-ui/packages/col/src/col";
  import ElOption from "../../../../node_modules/element-ui/packages/select/src/option.vue";
  import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";

  export default {
    mixins: [pagination],
    components: {
      ElDialog,
      ElOption,
      ElCol},
    data() {
      return {
        labelWidth: '100px',
        auditVisible: false,
        detail: {},
        bankAccountList:[],
        bankNameList:[],
        collTableShow:['1'],
        confirmShow:true,//确认付款
        partShow:false,//部分付款
        accessReal:'',//用作存储实际付款金额
        accessUnpaid:'',//用作存储未付金额
        showBank:false,
        showAccept:false,
        form: {
          payRequisitionId:'',//付款申请单id(用作查询发票和付款数据id)
          requisitionId: '',//付款申请单id
          auditRemark:'',//审核备注
          status:'',//付款申请单状态
        },
      }
    },
    computed: {
      ...mapGetters([
        'payablePayLogList','payableInvoiceList'
      ]),
    },

    methods: {
      ...mapActions([
        'getPayablePayLogList',"getPayableInvoiceList"
      ]),
      //发票列表_选中复选框
      handleSelectionChange1(val){
        this.selectData = val;
      },
      getList() {
        let data={
          payRequisitionId:''
        };
        data.payRequisitionId = this.form.payRequisitionId;
        this.getPayableInvoiceList({data:JSON.stringify(data)});
        this.getPayablePayLogList({data:JSON.stringify(data)});
      },

     /* confirmInvoice(){
        let data={
          payRequisitionId:''
        };
        data.payRequisitionId = this.form.payRequisitionId;
        confirmPayableInvoiceApi({data:JSON.stringify(data)}).then((res)=>{
          let resultData = res.data;
          let fig = resultData.success;
          this.$parent.getList();
          if(resultData.code === '1' && fig){
            this.invoiceVisible = false;
            this.$message({
              message: '确认开票成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '确认开票失败',
              type: 'error'
            })
          }
        })
      },*/
      //审核通过
      audit(status){
        if(status==6 && this.form.auditRemark==''){
          this.$confirm('请在审核备注里输入审核不通过的原因！');
          return;
        }
        this.form.status = status;
        financialAuditApi({data:JSON.stringify(this.form)}).then((res)=>{
              let data = res.data;
              if(data.code === '1' && data.success){
                this.auditVisible = false;
                this.$parent.getList();
                this.$message({
                  message: '审核操作成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '审核操作失败,请确认后再审核',
                  type: 'error'
                })
              }
        })
      },
      cancel(){
        this.auditVisible = false;
      },

      closeDialog() {
        this.auditVisible = false;
        this.$refs['form'].resetFields()
      },
    },

    watch: {
      detail(val) {

      },
      created() {
      },
      mounted() {
      }
    }
  }
</script>
