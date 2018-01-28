<template>
<el-dialog
    size="30%"
    title="结算比例设置(修改)"
    v-model="newSettlementRatedialogVisible">
  <el-form ref="form" :rules="updateFormRules" :model="form"  label-width="150px">
  <el-form-item label="部门" :label-width="labelWidth" prop="departName">
    <el-input v-model="form.departName" :disabled="true" class='control-width2'></el-input>
  </el-form-item>
  <el-form-item label="代码" :label-width="labelWidth" prop="orgCode">
    <el-input v-model="form.orgCode" :disabled="true" class='control-width2'></el-input>
  </el-form-item>
  <el-form-item label="描述" :label-width="labelWidth" prop="description">
    <el-input v-model="form.description" :disabled="true" class='control-width2'></el-input>
  </el-form-item>
  <el-form-item label="子公司类型" :label-width="labelWidth" prop="settleType">
      <el-select clearable filterable default-first-option v-model="form.settleType" class='control-width2' placeholder="请选择子公司类型">
          <el-option label="A" value="A">A</el-option>
          <el-option label="B" value="B">B</el-option>
      </el-select>
  </el-form-item>
   <el-form-item label="子公司结算比例" :label-width="labelWidth" prop="settleRate">
    <el-input v-model="form.settleRate" class='control-width2'></el-input>
  </el-form-item>
    <el-form-item label="是否保底" :label-width="labelWidth" prop="minimumGuarantee">
      <el-select clearable filterable default-first-option v-model="form.minimumGuarantee" class='control-width2' placeholder="请选择子保底类型">
        <el-option label="是" value="1">是</el-option>
        <el-option label="否" value="0">否</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="物流公司结算比例" :label-width="labelWidth" prop="logisticsRate">
      <el-input v-model="form.logisticsRate" class='control-width2'></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(7)">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'


  export default {
    mixins:[pagination],
    components:{},
    data() {
      return {
        labelWidth: '140px',
        newSettlementRatedialogVisible:false,
        updateFormRules: {
            settleType: [
            { required: true, message: '请选择子公司类型',trigger:'blur,change' }
          ],
            settleRate: [
            {required: true, message: '请输入运费比例',trigger:'blur,change' },
              { validator:this.$global.validate.number}
          ],
            minimumGuarantee: [
            { required: true, message: '请选择是否保底',trigger:'blur,change' }
          ],
            logisticsRate: [
            { required: true, message: '请输入物流公司结算比例',trigger:'blur,change' },
              { validator:this.$global.validate.number}
          ]
        },
        detail:{},

        form: {
            departName :'',
            orgCode:'',
            description:'',
            settleType :'',
            settleRate:'',
            minimumGuarantee:'',
            logisticsRate:''
        }
      }
    },
    computed:{

    },

    methods: {
      ...mapActions([
        'getSettlementRateList','updateSettlementRate'
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
             },
      closeDialog(){
        this.newSettlementRatedialogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.updateSettlementRate(this.form).then(res =>{
              if(res.success){
                this.$refs['form'].resetFields()
                this.newSettlementRatedialogVisible = false;
                this.getSettlementRateList()
                this.$message({
                  message:'更新成功',
                  type:'success'
                })
              }else{
                this.newSettlementRatedialogVisible = false;
                this.$message({
                  message:'更新失败',
                  type:'error'
                })
              }
            });
          }
        })
      }
    },
    watch:{
      detail(val){
        Object.assign(this.form,val)
        this.form.settleType=val.settleType.toString();
        this.form.minimumGuarantee=val.minimumGuarantee.toString();
      }
    },
    created(){
          },
    mounted(){
    }
  }
</script>
