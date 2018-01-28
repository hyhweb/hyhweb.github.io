<template >
  <div>
  <el-dialog
    title="开票"
    :visible.sync="invoiceVisible" class="billing">
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">开票历史记录</span>
      </div>
      <el-button type="primary" icon="plus" @click="add" size="small" v-show="form.showFlgA" :disabled="this.$global.isDisabled(2)">新增</el-button>
      <el-button type="primary" icon="delete" @click="remove" size="small" v-show="form.showFlgA" :disabled="this.$global.isDisabled(9)">删除</el-button>
    </el-col>
    <el-col>
          <TableBox>
            <!--列表-->
            <el-col>
              <el-table ref="table" @row-click="handleRowClick"
                        :data="payableInvoiceList.data" stripe @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" fixed width="50">
                </el-table-column>
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
                  label="备注" width="100">
                </el-table-column>
              </el-table>
            </el-col>
          </TableBox>
    </el-col>
    <el-col align="center" slot="footer" class="buttonClass">
      <el-button-group>
      <!--<el-button type="primary" icon="document" size="small" :disabled="this.$global.isDisabled(21)">确认开票</el-button>-->
      <!--<el-button type="primary" icon="circle-check"  size="small" :disabled="this.$global.isDisabled(21)">取消</el-button>-->
        <el-button type="primary" @click="confirmInvoice" v-show="form.showFlgA">确定开票</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-button-group>
    </el-col>

  </el-dialog>
    <AddInvoice ref="addInvoice"></AddInvoice>
  </div>

</template>
<style>
  .billing .el-dialog{
    min-width: 664px;
    width: 1035px!important;
    /*height: 1500px;*/
  }
  .billing .buttonClass{
    width: 100%;
    padding:35px 0;
  }
  .buttonClass div{
    width: 17%;
    margin: 0 auto;
  }

</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import AddInvoice from './AddInvoice.vue';
  import {savePayAblePayLogApi,deletePayableInvoiceApi,confirmPayableInvoiceApi,getTotalInvoiceAmountApi} from '../../../api/modules/settlement'
  import ElCol from "element-ui/packages/col/src/col";
  import ElOption from "../../../../node_modules/element-ui/packages/select/src/option.vue";
  import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";

  export default {
    mixins: [pagination],
    components: {
      ElDialog,
      ElOption,
      ElCol, AddInvoice},
    data() {
      return {
        labelWidth: '100px',
        invoiceVisible: false,
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
        reqAmount:0,
        invoiceAmount:0,
        form: {
          payableInvoiceId:'',//发票id
          payRequisitionId: '',//付款申请单id
          payObjCode:'',//付款单位编码
          receiveObjId:'',//收款单位ID
          payObjName:'',//付款单位(个人)名称
          receiveObjName:'',//收款单位(个人)名称
          showFlgA:true//按钮是否显示
        },
      }
    },
    computed: {
      ...mapGetters([
        'payableInvoiceList'
      ]),
    },

    methods: {
      ...mapActions([
        'getRequisitionList', 'payRequisition',"getPayableInvoiceList"
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
      },
      //新增发票信息
      add(){
        this.$refs.addInvoice.addVisible = true;
        Object.assign(this.$refs.addInvoice.form, this.form);
      },
      confirmInvoice(){

          if(this.payableInvoiceList.data.length==0){
            this.$message.info('至少需要开一票！');
              return;
          }

        //验证开票总金额不能大于申请总金额
         let amount = 0;
         for(var i=0;i<this.payableInvoiceList.data.length;i++){
             amount += this.payableInvoiceList.data[i].invoiceAmount;
         }
//         if(amount > this.reqAmount){
//             this.$confirm('申请总额:'+this.reqAmount+'元  开票总额:'+amount+'元  开票总额不能大于申请金额！');
//             return;
//         }
//         if(amount<this.reqAmount){
//             this.$confirm('申请总额:'+this.reqAmount+'元  开票总额:'+amount+'元  开票总额不足！');
//             return;
//         }
        if(amount==0){
          this.$message.error('开票总额不能为0！');
          return;
        }
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
      },
      //删除发票信息
      remove(){
        if(this.selectData.length !== 0){
          let data={
            payableInvoiceId:''
          };
          data.payableInvoiceId = this.selectData[0].payableInvoiceId;
          deletePayableInvoiceApi({data:JSON.stringify(data)}).then((res)=>{
              let resultData = res.data;
              let fig = resultData.success;
              if(resultData.code === '1' && fig){
                  this.getList();
                  this.$message({
                    message: '删除发票信息成功',
                    type: 'success'
                  })
              } else {
                this.invoiceVisible = false;
                this.$message({
                  message: '删除发票信息失败',
                  type: 'error'
                })
              }
          })
        }
      },

      cancel(){
        this.invoiceVisible = false;
      },

      closeDialog() {
        this.invoiceVisible = false;
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
