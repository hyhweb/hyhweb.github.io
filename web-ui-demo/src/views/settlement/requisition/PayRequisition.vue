<template>
  <el-dialog
    size="small"
    title="付款"
    v-model="payVisible" class="dialog">
    <el-col>
      <el-collapse v-model="collTableShow">
        <el-collapse-item title="付款历史记录" name="1">
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
                  prop="payRemark"
                  label="备注" width="100">
                </el-table-column>

<!--                <el-table-column
                  prop="backReason"
                  label="回退原因" width="100">
                </el-table-column>-->

                <el-table-column label="操作列" align="center" width="100">
                  <template scope="scope">
                    <el-button size="small" type="primary" v-show="this.showFlgC" v-if="getLastOne(scope.row.payableLogId)" :disabled="isDisabled(29)" @click="updatePay(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-col>
          </TableBox>
        </el-collapse-item>
      </el-collapse>
    </el-col>

    <el-col class="formClass" v-show="form.showFlgC">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
        <el-form-item label="申请单编号" prop="requisitionId" v-show="false" :label-width="labelWidth">
          <el-input v-model="form.requisitionId" :disabled="true" class='textClass'></el-input>
        </el-form-item>
        <!--办单员以外场合显示-->
        <el-form-item label="付款对象" prop="payObj" v-show="false" :label-width="labelWidth">
          <el-input v-model="form.payObj" :disabled="true" class='textClass'></el-input>
        </el-form-item>
        <!--办单员场合显示-->
        <el-form-item label="付款对象" prop="payObjBDY" v-show="false" :label-width="labelWidth">
          <el-input v-model="form.payObjBDY" :disabled="true" class='textClass'></el-input>
        </el-form-item>
        <el-form-item label="办单员姓名" prop="payObj" v-show="form.showFlgB" :label-width="labelWidth">
          <el-input v-model="form.payObj" :disabled="true" class='textClass'></el-input>
        </el-form-item>

        <el-form-item label="付款方式" prop="payType" :label-width="labelWidth">
          <el-select clearable filterable default-first-option @change="payTypeChange"  v-model="form.payType" placeholder="请选择付款方式" class='textClass'>
            <el-option v-for="item in payTypeList"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="承兑号" prop="acceptNo" v-if="showAccept" :label-width="labelWidth">
          <el-input v-model="form.acceptNo" class='textClass'></el-input>
        </el-form-item>

        <el-form-item label="银行账号" prop="bankAccount" v-if="showBank" :label-width="labelWidth">
          <el-select clearable filterable default-first-option @change="bankAccountChange" v-model="form.bankAccount" placeholder="请选择银行账号" class='textClass'>
            <el-option v-for="item in bankAccountList"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行名称" prop="bankName" v-if="showBank" :label-width="labelWidth">
          <el-select :disabled="true" clearable filterable default-first-option v-model="form.bankName" placeholder="请选择银行账号" class='textClass'>
            <el-option v-for="item in bankNameList"
                       :key="item.value"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应付金额" prop="payAmount" :label-width="labelWidth">
          <el-input v-model="form.payAmount" :disabled="true" class='textClass'></el-input>
        </el-form-item>
        <el-form-item label="实付金额" prop="realAmount" :label-width="labelWidth">
          <el-input v-model="form.realAmount" @change="realChange" class='textClass'></el-input>
        </el-form-item>
        <el-form-item label="现金折扣" prop="discountAmount" :label-width="labelWidth">
          <el-input v-model="form.discountAmount" @change="realChange" class='textClass'></el-input>
        </el-form-item>

        <el-form-item label="未付金额" prop="unpaidAmount" :label-width="labelWidth">
          <el-input v-model="form.unpaidAmount" :disabled="true" class='textClass'></el-input>
        </el-form-item>

        <el-form-item label="付款备注" prop="payRemark" :label-width="labelWidth">
          <el-input type="textarea" v-model="form.payRemark" :rows='5' class="textClass"></el-input>
        </el-form-item>

        <el-form-item :label-width="labelWidth">
          <el-button type="primary" v-show="confirmShow" @click="onSubmit">确认付款</el-button>
          <el-button type="primary" v-show="partShow" @click="onSubmit">部分付款暂存</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-dialog>
</template>
<style>

  .textClass{
    width: 300px;
  }

  .dialog .el-dialog{
      min-width: 664px ;
      width: 925px!important;
  }

  .dialog .formClass{
    width:100%;
    margin: 0!important;
    padding:20px;
  }

  .dialog .formClass .el-form{
    margin: 0 auto;
    width: 60%;
  }

</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import {payRequisitionApi,getSelectListApi,savePayAblePayLogApi} from '../../../api/modules/settlement'
  import ElCol from "element-ui/packages/col/src/col";
  import ElOption from "../../../../node_modules/element-ui/packages/select/src/option.vue";

  export default {
    mixins: [pagination],
    components: {
      ElOption,
      ElCol},
    data() {
      var validateReal = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('实付金额不能为空'))
        }else if (Number(value) < Number(0)) {
          callback(new Error('实付金额不能为负数!'));
        }else if (value > this.form.payAmount) {
          callback(new Error('实际付款金额不能大于应付金额!'));
        } else if (value > this.accessUnpaid) {
          callback(new Error('实际付款金额不能小于未付金额!'));
        } else {
          callback();
        }
      };
      var validateDiscount = (rule, value, callback) => {
        if (Number(value) > Number(this.form.payAmount)) {
          callback(new Error('现金折扣不能大于应付金额!'));
        }else if (Number(value) < Number(0)) {
          callback(new Error('现金折扣不能为负数!'));
        }else {
          callback();
        }
      };

      var validateUnpaidAmount = (rule, value, callback) => {
        if (Number(value) < Number(0)) {
          callback(new Error('未付金额不能为负数!'));
        } else {
          callback();
        }
      };
      return {
        labelWidth: '100px',
        payVisible: false,
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
          payableLogId:'',//付款列表id
          payRequisitionId: '',
          payObj: '',
          payObjBDY: '',
          payType: '',
          payTypeName: '',
          reqAmount: '',
          unpaidAmount: '',// 未付金额
          payRemark: '',
          showFlgA: false,
          showFlgB: false,
          showFlgC: true,
          acceptNo:'',//承兑号
          bankAccount:'',//银行账号
          bankName:'',//银行名称
          payAmount:'',//应付金额
          realAmount:'',//实付金额
          discountAmount:0,//现金折扣
          payObjectType:'',//付款对象类型
        },
        formRules:{
          payType:[
            {required: true, message: '请选择付款方式', trigger: 'blur,change'}
          ],
          acceptNo:[
            {required: true, message: '请输入承兑号', trigger: 'blur,change'}
          ],
          bankAccount:[
            {required: true, message: '请选择银行账号', trigger: 'blur,change'}
          ],
          bankName:[
            {required: true, message: '请选择银行名称', trigger: 'blur,change'}
          ],
          realAmount:[
            { validator: validateReal, trigger: 'blur' }
          ],
          discountAmount:[
            { validator: validateDiscount, trigger: 'blur' }
          ],
          unpaidAmount:[
            { validator: validateUnpaidAmount, trigger: 'blur' }
          ]

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
        'getRequisitionList', 'payRequisition',"getPayablePayLogList"
      ]),
      getList() {
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
      //获取最后新付款的费用
      getLastOne(id){
          let data = this.payablePayLogList.data;
          var payableLogId = data[data.length-1].payableLogId;
          if(id === payableLogId){
            return true;
          }
          return false;
      },
      closeDialog() {
        this.payVisible = false;
        this.form.payableLogId='';
        this.$refs['form'].resetFields();
      },
      //实际付款金额事件
      realChange(param){
        var payAmount = this.form.payAmount;//应付金额
        var accessReal = this.form.realAmount;//实付金额
        var discountAmount = this.form.discountAmount;//现金折扣

        if(payAmount!==null && accessReal!==null && discountAmount!==null){
          var temp = payAmount-accessReal-discountAmount;
          this.form.unpaidAmount = Math.floor((temp) * 100)/100;
        }
        if(this.form.unpaidAmount===0){
          this.confirmShow = true;
          this.partShow = false;
        } else {
          this.confirmShow = false;
          this.partShow = true;
        }
      },
    //编辑页面
      updatePay(row){
        var real = 0;
        var discount = 0;
        let list = this.payablePayLogList.data;
        list.filter((res)=>{
           real += res.realAmount;
           discount += res.discountAmount;
        });
       Object.assign(this.form, row);
       let rowAmount = row.realAmount+row.discountAmount;
       let unpaid = row.unpaidAmount;
       this.accessReal = rowAmount;
       this.accessUnpaid = unpaid+rowAmount;
       this.form.unpaidAmount = unpaid;
       this.form.payType = row.payType.toString();
       this.form.payableLogId = row.payableLogId;
      },

      //计算未付金额
      computeAmount(param){
        var real = this.accessReal;
        if(this.form.discountAmount != null){
          real-=param;
        }
        if(this.form.unpaidAmount===0){
          this.confirmShow = true;
          this.partShow = false;
        } else {
          this.partShow = true;
          this.confirmShow = false;
        }
        this.form.realAmount = real;
      },
      //银行账号选择事件
      bankAccountChange(param){
        this.bankNameList.filter((res)=>{
          if(res.code != null){
            if(res.code === param){
              this.form.bankName = res.value;
              return ;
            }
          }
        })
      },
      //判断付款方式
      payTypeChange(){
        if(this.form.payType === '2' || this.form.payType === '4' || this.form.payType === '1'){
          this.showBank = false;
          this.showAccept = false;
        } else if(this.form.payType === '3'){
          this.showBank = true;
          this.showAccept = false;
        } else if(this.form.payType === '0'){
          this.showAccept = true;
          this.showBank = false;
        }
      },
      onSubmit() {
        if(this.form.payAmount===0){
          this.$confirm('应付金额已为0，不需要再付款！');
          return;
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            savePayAblePayLogApi({data: JSON.stringify(this.form)}).then((res) => {
              let data = res.data;
              var flg = data.success;
              if (data.code === '1' && flg) {
                this.$refs['form'].resetFields();
                  this.payVisible = false;
                  this.$parent.getList();
                  this.$parent.showDetail(this.form.requisitionId);
                  this.$message({
                    message: '付款成功',
                    type: 'success'
                  })
                } else {
                  this.payVisible = false;
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
