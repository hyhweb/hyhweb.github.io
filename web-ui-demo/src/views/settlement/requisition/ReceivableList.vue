<template>
  <el-dialog
    size="small"
    title="收款"
    v-model="receivableVisible" class="receivableDialog">
    <el-col>
      <el-collapse v-model="collTableShow">
        <el-collapse-item title="收款历史记录" name="1">
          <TableBox>
            <!--列表-->
            <el-col>
              <el-table ref="table"
                        :data="payablePayLogList.data" stripe
              >
                <el-table-column type="index"
                                 label="序号" width="100">
                </el-table-column>
                <el-table-column
                  prop="payTypeText"
                  label="付款方式" width="100">
                </el-table-column>
                <el-table-column
                  prop="acceptNo"
                  label="承兑号" width="100">
                </el-table-column>
                <el-table-column
                  prop="bankAccount"
                  label="银行账号" width="100">
                </el-table-column>
                <el-table-column
                  prop="bankName"
                  label="银行名称" width="100">
                </el-table-column>
                <el-table-column
                  prop="payAmount"
                  label="应付金额" width="100">
                </el-table-column>
                <el-table-column
                  prop="realAmount"
                  label="实付金额" width="100">
                </el-table-column>
                <el-table-column
                  prop="discountAmount"
                  label="折扣金额" width="100">
                </el-table-column>

                <el-table-column
                  prop="unpaidAmount"
                  label="未付金额" width="100">
                </el-table-column>

                <el-table-column
                  prop="remark"
                  label="备注" width="100">
                </el-table-column>

                <el-table-column label="操作列" align="center" width="100">
                  <template scope="scope">
                    <el-button size="small" type="primary" v-if="scope.row.payableStatus!=1" :disabled="isDisabled(29)" @click="receivable(scope.row)">收款</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-col>
          </TableBox>
        </el-collapse-item>
      </el-collapse>
    </el-col>

    <el-col class="formStyle">
      <el-form ref="form" v-if="formShow" :model="form" label-width="100px">
        <el-form-item label="申请单编号" prop="requisitionId" v-show="false" :label-width="labelWidth">
          <el-input v-model="form.requisitionId" :disabled="true" class='textWidth'></el-input>
        </el-form-item>
<!--        &lt;!&ndash;办单员以外场合显示&ndash;&gt;
        <el-form-item label="付款对象" prop="payObj" v-show="false" :label-width="labelWidth">
          <el-input v-model="form.payObj" :disabled="true" class='textWidth'></el-input>
        </el-form-item>
        &lt;!&ndash;办单员场合显示&ndash;&gt;
        <el-form-item label="付款对象" prop="payObjBDY" v-show="false" :label-width="labelWidth">
          <el-input v-model="form.payObjBDY" :disabled="true" class='textWidth'></el-input>
        </el-form-item>-->
        <el-form-item label="付款方式" prop="payType" :label-width="labelWidth">
          <el-select clearable filterable default-first-option :disabled="true" @change="payTypeChange"  v-model="form.payType" placeholder="请选择付款方式" class='textWidth'>
            <el-option v-for="item in payTypeList"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="承兑号" prop="acceptNo" :label-width="labelWidth" v-if="form.showFlgA">
          <el-input v-model="form.acceptNo" :disabled="true" class='textWidth'></el-input>
        </el-form-item>

        <el-form-item label="银行账号" prop="bankAccount"  :label-width="labelWidth" v-if="form.showFlgB">
          <el-select clearable filterable default-first-option :disabled="true" @change="bankAccountChange" v-model="form.bankAccount" placeholder="请选择付款方式" class='textWidth'>
            <el-option v-for="item in bankAccountList"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行名称" prop="bankName"  :label-width="labelWidth" v-if="form.showFlgC">
          <el-select clearable filterable default-first-option :disabled="true" v-model="form.bankName" placeholder="请选择付款方式" class='textWidth'>
            <el-option v-for="item in bankNameList"
                       :key="item.value"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应付金额" prop="payAmount" :label-width="labelWidth">
          <el-input v-model="form.payAmount" :disabled="true" class='textWidth'></el-input>
        </el-form-item>
        <el-form-item label="实付金额" prop="realAmount" :label-width="labelWidth">
          <el-input v-model="form.realAmount" :disabled="true" @change="realChange" class='textWidth'></el-input>
        </el-form-item>
        <el-form-item label="现金折扣" prop="discountAmount" :label-width="labelWidth">
          <el-input v-model="form.discountAmount" :disabled="true" @change="computeAmount" class='textWidth'></el-input>
        </el-form-item>

        <el-form-item label="未付金额" prop="unpaidAmount" :label-width="labelWidth">
          <el-input v-model="form.unpaidAmount"  :disabled="true" class='textWidth'></el-input>
        </el-form-item>

        <el-form-item label="收款备注" prop="receiveRemark" :label-width="labelWidth">
          <el-input type="textarea" v-model="form.receiveRemark" :rows='5' class="textWidth"></el-input>
        </el-form-item>

        <el-form-item :label-width="labelWidth">
          <el-button type="primary"  @click="onSubmit(1)">确认</el-button>
          <!--<el-button type="primary"  @click="onSubmit(2)">回退</el-button>-->
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-dialog>

</template>
<style>

 .textWidth{
    width: 300px;
  }

  .receivableDialog .el-dialog{
    min-width: 664px ;
    width: 1230px!important;
  }

  .receivableDialog .formStyle{
    width:100%;
    margin: 0!important;
    padding:20px;
  }

  .receivableDialog .formStyle .el-form{
    margin: 0 auto;
    width: 45%;
  }

</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import {payRequisitionApi,getSelectListApi,saveReceivableLogApi} from '../../../api/modules/settlement'
  import ElCol from "element-ui/packages/col/src/col";
  import ElOption from "../../../../node_modules/element-ui/packages/select/src/option.vue";

  export default {
    mixins: [pagination],
    components: {
      ElOption,
      ElCol},
    data() {
      return {
        labelWidth: '100px',
        receivableVisible: false,
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
        formShow:false,
        form: {
          payablePayLogId:'',//付款列表id
          payRequisitionId: '',
          payObj: '',
          payObjBDY: '',
          payType: '',
          payTypeName: '',
          reqAmount: '',
          unpaidAmount: '',// 未付金额
          remark: '',
          showFlgA: false,
          showFlgB: false,
          acceptNo:'',//承兑号
          bankAccount:'',//银行账号
          bankName:'',//银行名称
          payAmount:'',//应付金额
          realAmount:'',//实付金额
          discountAmount:0,//现金折扣
          payableStatus:'',//付款记录状态
          backReason:'',//回退原因
          receiveRemark:'',//收款备注
          showFlgA:false,//承兑号显示flg
          showFlgB:false,//银行账号显示flg
          showFlgC:false,//银行名称显示flg
        },
        payTypeList:[
          {text: '承兑', value: '0'},
          {text: '支票', value: '1'},
          {text: '现金', value: '2'},
          {text: '银行转账', value: '3'},
          {text: '微信转账', value: '4'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'payablePayLogList'
      ]),
    },

    methods: {
      ...mapActions([
        "getPayablePayLogList"
      ]),
      getList() {
//        let param = Object.assign(this.paginationParams(), this.form)
        let data={
          payRequisitionId:''
        };
        data.payRequisitionId = this.form.payRequisitionId;
        this.getPayablePayLogList({data:JSON.stringify(data)});
        getSelectListApi().then((res)=>{
          this.bankAccountList = res.data.data.bankAccountList;
          this.bankNameList = res.data.data.bankNameList;
        });

      },

      closeDialog() {
        this.receivableVisible = false;
        this.$refs['form'].resetFields()
      },
      //实际付款金额事件
      realChange(param){
      },

      //收款
      receivable(row){
          //付款方式：承兑号
        if(row.payType===0){
          this.form.showFlgA=true;//承兑号
          this.form.showFlgB=false;//银行账号
          this.form.showFlgC=false;//银行名称
        }else if(row.payType===3){//付款方式：银行转账
          this.form.showFlgA=false;//承兑号
          this.form.showFlgB=true;//银行账号
          this.form.showFlgC=true;//银行名称
        }else{//付款方式：现金、支票、微信转账
          this.form.showFlgA=false;//承兑号
          this.form.showFlgB=false;//银行账号
          this.form.showFlgC=false;//银行名称
        }
        this.formShow = true;
        var real = 0;
        var discount = 0;
        let list = this.payablePayLogList.data;
        list.filter((res)=>{
          real += res.realAmount;
          discount += res.discountAmount;
        });
        Object.assign(this.form, row);
        row.payTime = null;
        row.createDate = null;
        let rowAmount = row.realAmount+row.discountAmount;
        let unpaid = row.unpaidAmount;
        this.accessReal = rowAmount;
        this.accessUnpaid = unpaid+rowAmount;
        this.form.unpaidAmount = unpaid;
        this.form.payType = row.payType.toString();
      },

      //计算未付金额
      computeAmount(param){
      },
      //银行账号选择事件
      bankAccountChange(param){
      },
      //判断付款方式
      payTypeChange(){
      },
      onSubmit(flow) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.payableStatus = flow;
            if(flow == 2){
                this.form.backReason = this.form.receiveRemark;
            }
            saveReceivableLogApi({data: JSON.stringify(this.form)}).then((res) => {
              let data = res.data;
              var flg = data.success;
              if (data.code === '1' && flg) {
                this.$refs['form'].resetFields();
                this.receivableVisible = false;
                this.$parent.getList();
                this.$parent.showDetail(this.form.requisitionId);
                this.formShow = false;
                this.getList();
                if(flow == 2){
                  this.$message({
                    message: '回退成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '收款成功',
                    type: 'success'
                  })
                }
              } else {
                this.receivableVisible = false;
                this.$message({
                  message: '付款失败',
                  type: 'error'
                })
              }
            })
          }
        });
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
