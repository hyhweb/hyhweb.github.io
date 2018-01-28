<template>
  <el-dialog
    size="30%"
    title="发票确认"
    v-model="invoiceConfirmationLogVisible">
    <el-form ref="form" :rules="updateFormRules" :model="form" label-width="120px">
      <el-form-item label="申请人" prop="invoiceApplicantName" >
        <el-input v-model="form.invoiceApplicantName" :disabled="true" class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="开票金额(元)" prop="applyAmount" >
        <el-input v-model="form.applyAmount" :disabled="true" class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="开票类型" prop="invoiceType">
        <el-select clearable filterable disabled default-first-option v-model="form.invoiceType" placeholder="请选择结算方式" class='control-width2'>
          <el-option label="无票" value="0">无票</el-option>
          <el-option label="普票" value="1">普票</el-option>
          <el-option label="专票" value="2">专票</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发票抬头"  prop="invoiceTitle" >
        <el-input v-model="form.invoiceTitle" disabled class='control-width2'></el-input>
      </el-form-item>

      <el-form-item label="发票号码"  prop="invoiceNo" >
        <el-input v-model="form.invoiceNo"  class='control-width2'></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(19)">确认开票</el-button>
        <el-button @click="closeDialog">取消退出</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {invoiceConfirmationApi} from '../../../api/modules/settlement'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
  export default {
    mixins: [pagination],
    components: {ElInput},
    data() {
      return {
        invoiceConfirmationLogVisible: false,
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
          invoiceType:'',//开票类型
          invoiceTitle:'',//发票抬头
          invoiceApplyNo:'',//发票申请号
          invoiceNo:'',//发票号码
        }
      }
    },
    computed: {},

    methods: {
      ...mapActions([

      ]),
      getList(){

        let param = Object.assign(this.paginationParams(), this.form)
      },
      closeDialog(){
        this.invoiceConfirmationLogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        this.$refs.form.validate((valid)=>{

            if(valid){

              let params = {
                invoiceNo:this.form.invoiceNo,
                invoiceApplyNo:this.form.invoiceApplyNo
              };
              invoiceConfirmationApi({data:JSON.stringify(params)}).then((res) => {
                if (res.data.success && res.data.code === '1') {
                  params = {};
                  this.confirmerData = [];
                  this.$refs.form.resetFields();
                  this.$parent.getList();
                  this.invoiceConfirmationLogVisible = false;
                  this.$message({
                    message: '确认成功',
                    type: 'success'
                  });
                  return true;
                } else {
                  params = {};
                  this.params = [];
                  this.invoiceConfirmationLogVisible = false;
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
