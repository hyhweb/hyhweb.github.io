<template >
  <div>
  <el-dialog
    title="收票"
    :visible.sync="invoiceVisible" class="billing">
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">收票历史记录</span>
      </div>
    </el-col>
    <el-col>
          <TableBox>
            <!--列表-->
            <el-col>
              <el-table ref="table" @row-click="handleRowClick"
                        :data="tableData" stripe
              >
                <el-table-column  fixed width="50">
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
      <div >
      <!--<el-button type="primary" icon="document" size="small" :disabled="this.$global.isDisabled(21)">确认开票</el-button>-->
      <!--<el-button type="primary" icon="circle-check"  size="small" :disabled="this.$global.isDisabled(21)">取消</el-button>-->
        <el-button-group>
        <el-button type="primary" @click="confirmInvoice">确定收票</el-button><br><br>
        <el-button @click="cancel">取 消</el-button>
        </el-button-group>
      </div>
    </el-col>

  </el-dialog>
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
  import {getPayableInvoiceListApi,checkedPayableInvoiceApi} from '../../../api/modules/settlement'
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
        tableData:[],
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
        payRequisitionId:'',
        form: {
          payableInvoiceId:'',//发票id
          payRequisitionId: '',//付款申请单id
          payObjCode:'',//付款单位编码
          receiveObjId:'',//收款单位ID
          payObjName:'',//付款单位(个人)名称
          receiveObjName:''//收款单位(个人)名称
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

      getList() {

      },
      confirmInvoice(){

        this.$confirm('确定要确定收票?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkedPayableInvoiceApi({"payRequisitionId":this.payRequisitionId}).then((res)=>{
            let resultData = res.data;
            let fig = resultData.success;
            this.$parent.getList();
            if(resultData.code === '1' && fig){
              this.invoiceVisible = false;
              this.$message({
                message: '确认收票成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '确认收票失败',
                type: 'error'
              })
            }
          })

        })/*.catch(() => {
          this.$message({
            type: 'error',
            message: '确认收票失败'
          });
        });*/

      }
     ,

      cancel(){
        this.invoiceVisible = false;
      },

      closeDialog() {
        this.invoiceVisible = false;
        this.$refs['form'].resetFields()
      },


    },

    watch: {
      payRequisitionId(){
          let data ={
              "payRequisitionId":this.payRequisitionId
          }
        getPayableInvoiceListApi({data:JSON.stringify(data)}).then((res)=>{
          let resultData = res.data;
          this.tableData=resultData.data.data;
        })

      },
      detail(val) {

      },
      created() {
      },
      mounted() {
      }
    }
  }
</script>
