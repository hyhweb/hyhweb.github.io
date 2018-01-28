<template>
  <div>
  <el-dialog
    title="发票申请"
    size="large"
    v-model="invoiceApplyLogVisible">
    <ToolBarBox>
      <el-form :inline="true" ref="form" :rules="updateFormRules" :model="form" label-width="120px">
        <el-form-item label="申请单号" prop="invoiceApplicantName" >
          <el-input v-model="form.invoiceApplyNo" :disabled="true" class='control-width2'></el-input>
        </el-form-item>
        <el-form-item label="申请日期"  prop="dates">
          <el-input v-model="form.invoiceApplyTime" :disabled="true" class='control-width2'></el-input>
        </el-form-item>
        <el-form-item label="申请人" prop="invoiceApplicantName" >
          <el-input v-model="form.invoiceApplicantName" :disabled="true" class='control-width2'></el-input>
        </el-form-item>
        <el-form-item label="开票金额(元)" prop="applyAmount" >
          <el-input v-model="form.applyAmount" :disabled="true" class='control-width2'></el-input>
        </el-form-item>

        <el-form-item label="开票类型" prop="invoiceType">
          <el-select clearable filterable :disabled="invoiceDataDisabled" default-first-option v-model="form.invoiceType" placeholder="请选择结算方式" class='control-width2'>
            <el-option label="无票" value="0">无票</el-option>
            <el-option label="普票" value="1">普票</el-option>
            <el-option label="专票" value="2">专票</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle" >
          <el-input :disabled="invoiceDataDisabled" v-model="form.invoiceTitle"  class='control-width2'></el-input>
        </el-form-item>
        <el-form-item label="发票号" prop="invoiceTitle" >
          <el-input disabled v-model="form.invoiceNo"  class='control-width2'></el-input>
        </el-form-item>
        <el-form-item label="发票备注" prop="invoiceRemark" >
          <el-input :disabled="invoiceDataDisabled" v-model="form.invoiceRemark"  class='control-width2'></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(19)">确认提交</el-button>
          <el-button @click="closeDialog">取消提交</el-button>
        </el-form-item> -->
      </el-form>
    </ToolBarBox>
    <TableBox>
      <el-table
        :data="onceCusInvoiceLogList.data"
        :max-height="tableMaxHeight"
        ref="table"
        border
        @selection-change="handleSelectionChange"
        highlight-current-row
        @row-click="handleRowClick"
        stripe>
            <el-table-column type="selection" align="center">
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="100">
            </el-table-column>
            <el-table-column prop="createDate" label="下单日期" width="100">
            </el-table-column>
            <el-table-column prop="ordCustomerName" label="下单客户" width="100">
            </el-table-column>
            <el-table-column prop="customerName" label="真实收送货人" width="100">
            </el-table-column>
            <el-table-column prop="endDate" label="完结日期" width="100">
            </el-table-column>
            <el-table-column prop="harborName" label="港口" width="100">
            </el-table-column>
            <el-table-column prop="bookSpaceNo" label="运单号" width="100">
            </el-table-column>
            <el-table-column prop="cabinetType" label="箱型" width="100">
            </el-table-column>
            <el-table-column prop="cabinetNo" label="箱号" width="100">
            </el-table-column>
            <el-table-column prop="costTypeName" label="费用名称" width="100">
            </el-table-column>
            <el-table-column prop="incomeAmount" label="金额" width="100">
            </el-table-column>

      </el-table>
    </TableBox>
    <PaginationBox>
      <el-col style="float:left;display:inline-block;width:50%;">
        <el-button type="primary" @click="importInvoiceLog" v-show="!this.$global.isDisabled(19)" :disabled="importInvoiceLogDisabled">引入发票明细</el-button>
        <el-button type="primary" @click="deleteInvoiceLog" v-show="!this.$global.isDisabled(19)" :disabled="deleteInvoiceLogDisabled">移出发票明细</el-button>
        <el-button type="primary" @click="onSubmit"  v-show="!this.$global.isDisabled(19)" :disabled="onSubmitStatus">确认提交</el-button>
        <el-button @click="closeDialog">取消提交</el-button>
      </el-col>
      <el-col style="float:right;display:inline-block;width:50%;">
        <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>
  </el-dialog>
    <v-import ref="importInvoiceLog"></v-import>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {addInvoiceApplyApi,deleteOnceCusInvoiceLogApi} from '../../../api/modules/settlement'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
  import ImportInvoiceLog from './ImportInvoiceLog.vue'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    mixins: [pagination],
    components: {
      ElCol,
      'v-import': ImportInvoiceLog,
    },
    data() {
      return {
        visible: false,
        taskDto:{},
        invoiceLogSelect:[],
        invoiceApplyLogVisible: false,
        invoiceDataDisabled:false, //开票数据是否禁用
        importInvoiceLogDisabled:true,//引入按钮是否禁用
        deleteInvoiceLogDisabled:true,//移出按钮是否禁用
        onSubmitStatus:false, //提交按钮是否禁用
        invoiceStatus:0,//发票申请状态
        updateFormRules: {
          invoiceType: [
            {required: true, message: '请选发票方式', trigger: 'blur,change'}
          ]
        },
        params:[],
        confirmerData:[],
        form: {
          cabinetIds:'',//箱子id
          cabinetCostIds:'',//箱子费用id
          invoiceApplicantId:'',//开票申请人id
          invoiceApplicantName:'',//开票申请人名称
          applyAmount:'',//开票申请金额
          invoiceType:'1',//开票类型
          invoiceTitle:'',//发票抬头
          invoiceApplyTime:'',//申请日期
          invoiceApplyNo:'',//申请单号
          invoiceRemark:'',//发票备注

        }
      }
    },
    computed: {
      ...mapGetters([
        'onceCusInvoiceLogList'
      ]),
    },

    methods: {
      ...mapActions([
          'getOnceCusInvoiceLogList'
      ]),
      //初始化
      init(){
        this.initButton();
        this.getList();
      },
      //初始化按钮状态
      initButton(){
        this.importInvoiceLogDisabled = true;
        this.deleteInvoiceLogDisabled = true;
        this.onSubmitStatus = false;
        this.invoiceDataDisabled = false;
        //发票状态已经确认
        if(this.invoiceStatus === 1){
          this.invoiceDataDisabled = true;
          this.importInvoiceLogDisabled = true;
          this.deleteInvoiceLogDisabled = true;
          this.onSubmitStatus = true;
          return
        }
        //判断是否已经做过发票申请
        if(this.form.invoiceApplyNo !== null &&  this.form.invoiceApplyNo !== ''){
          this.importInvoiceLogDisabled = false;
          this.deleteInvoiceLogDisabled = false;
        }
      },
      // 引入发票明细
      importInvoiceLog(){
        this.$refs.importInvoiceLog.importInvoiceLogVisible = true;
        Object.assign(this.$refs.importInvoiceLog.invoiceLogFrom,this.form);
        this.$refs.importInvoiceLog.init()
      },
      // 关闭引入发票明细页面
      closeEdit(){
        this.remarkVisible=false;
      },
      //选中复选框
      handleSelectionChange(val){
        this.invoiceLogSelect=val;
      },
      handleStartDate(){
        this.form.date=val;
      },
      //获取列表数据
      getList(){
        this.pageHandler(this.form, this.getOnceCusInvoiceLogList);
      },
      //初始化列表数据
      initList(){
        this.getList();
        this.$parent.getList();
        this.form.applyAmount = this.$refs.importInvoiceLog.invoiceAmount;
      },

      //删除发票记录
      deleteInvoiceLog(){
        if (this.invoiceLogSelect.length !== 0) {
          let cabinetCostIds = [];
          this.invoiceLogSelect.forEach(res=>{
            cabinetCostIds.push(res.cabinetCostId)
          });
          let params ={
            cabinetCostIds:cabinetCostIds,
            applyAmount:this.form.applyAmount,
            invoiceApplyNo:this.form.invoiceApplyNo
          };
          deleteOnceCusInvoiceLogApi({data:JSON.stringify(params)}).then(res=>{
            if(res.data.success && res.data.code === '1'){
              cabinetCostIds = [];
              this.getList();
              this.$parent.getList();
              this.invoiceApplyLogVisible = false;
              this.$message({
                message: '移出成功',
                type: 'success'
              });
              return true;
            } else {
              cabinetCostIds = [];
              this.$message({
                message: '确认失败',
                type: 'error'
              });
              return false;
            }
          })
        } else {
          this.$confirm('请选择一条数据')
        }
      },
      closeDialog(){
        this.invoiceApplyLogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        this.$refs.form.validate((valid)=>{
            if(valid){

              this.params.forEach((res)=>{
                let param = {
                  cabinetId:res.cabinetId,
                  cabinetCostId:res.cabinetCostId,
                  invoiceApplicantId:this.form.invoiceApplicantId,
                  invoiceApplicantName:this.form.invoiceApplicantName,
                  applyAmount:this.form.applyAmount,
                  invoiceType:this.form.invoiceType,
                  invoiceTitle:this.form.invoiceTitle,
                  invoiceRemark:this.form.invoiceRemark,
                };
                this.confirmerData.push(param);
              });

              addInvoiceApplyApi({data:JSON.stringify(this.confirmerData)}).then((res) => {
                if (res.data.success && res.data.code === '1') {
                  this.params = [];
                  this.confirmerData = [];
                  this.$refs.form.resetFields();
                  this.$parent.getList();
                  this.invoiceApplyLogVisible = false;
                  this.$message({
                    message: '确认成功',
                    type: 'success'
                  });
                  return true;
                } else {
                  this.params = [];
                  this.confirmerData = [];
                  this.invoiceApplyLogVisible = false;
                  this.$message({
                    message: '确认失败',
                    type: 'error'
                  });
                  return false;
                }
              });
            }
        })

      }
    },
    watch: {
      detail(val){
        Object.assign(this.form, val);

        this.form.cabinetId = val.cabinetId;
        this.form.amountIn = val.total;
        if (this.form.disabled) {
          this.form.disabled = "1"
        } else {
          this.form.disabled = "0"
        }
      }
    },
    created(){

    },
    mounted(){
    }
  }
</script>
