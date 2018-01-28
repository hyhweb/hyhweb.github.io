<template>
  <el-dialog
    size="30%"
    title="确认收到"
    v-model="detailDialogVisible">
    <el-form ref="form" :rules="updateFormRules" :model="form" label-width="120px">
      <el-form-item label="集装箱Id" prop="cabinetId" v-show="false">
        <el-input v-model="form.cabinetId" :disabled="true" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item label="结算方式" prop="settlementType">
        <el-select clearable filterable default-first-option v-model="form.settlementType" placeholder="请选择结算方式" class='control-width2'>
          <el-option label="微信" value="1">微信</el-option>
          <el-option label="银行转账" value="2">银行转账</el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="确认人"  prop="confirmer">-->
      <!--<el-input v-model="form.confirmer" :disabled="false"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="确认收到金额" prop="amountIn">-->
      <!--<el-input v-model="form.amountIn" :disabled="false"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(19)">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {comfirmInApi} from '../../../api/modules/settlement'
  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        detailDialogVisible: false,
        updateFormRules: {
          settlementType: [
            {required: true, message: '请选择结算方式', trigger: 'blur,change'}
          ]
        },
        params:[],
        confirmerData:[],
        form: {
          cabinetId: '',
          settlementType: '',
          confirmer: '',
          amountIn: '',
          remark: '',
          customerId:'',
          costStatus:''
        }
      }
    },
    computed: {},

    methods: {
      ...mapActions([
        'getOnceCusList', 'updateOnceCusDetail'
      ]),
      getList(){

        let param = Object.assign(this.paginationParams(), this.form)
      },
      closeDialog(){
        this.detailDialogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        this.$refs.form.validate((valid)=>{
            if(valid){
              this.params.forEach((res)=>{
                 let param = {
                    cabinetId:res.cabinetId,
                    cabinetCostId:res.cabinetCostId,
                    amountIn:res.incomeAmount,
                    settlementType:this.form.settlementType,
                    remark:this.form.remark
                  };
                 this.confirmerData.push(param);
              });
              comfirmInApi({confirmerData:JSON.stringify(this.confirmerData)}).then((res) => {
                if (res.data.success && res.data.code === '1') {
                  this.params = [];
                  this.confirmerData = [];
                  this.$refs.form.resetFields();
                  this.$parent.getList();
                  this.detailDialogVisible = false;
                  this.$message({
                    message: '确认成功',
                    type: 'success'
                  });
                  return true;
                } else {
                  this.params = [];
                  this.confirmerData = [];
                  this.detailDialogVisible = false;
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

       console.log(param);
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
