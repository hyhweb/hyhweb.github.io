<template>
  <el-dialog
    size="20%"
    title="扣款维护"
    v-model="advanceFeesVisible">
    <el-form ref="form" inline  :rules="advanceFeesFormRules" :model="form" label-width="150px">
      <el-form-item label="七天结算Id" prop="advanceId" v-show="false">
        <el-input v-model="form.advanceId" :disabled="true" class='control-width2'></el-input>
      </el-form-item>

      <div class="advance">
      <p>(原)提现金额:<span style="color:red">{{withdraw}}元</span></p>
      <p>预支运费:<span style="color:red">{{freight}}元</span></p>
      <p>预支利息:<span style="color:red">{{intrest}}元</span></p>
      <p>(剩余)提现金额:<span style="color:red; ">{{getChangeWithdraw}}元</span></p>
      </div>

      <el-form-item label="供车款"  prop="carSupplyFunds" class="table_list">
      <el-input v-model="form.carSupplyFunds" :disabled="false" class="advanceInput" ></el-input>
      </el-form-item>
     <el-form-item label="车款首付押金" prop="downPayment" class="table_list">
      <el-input v-model="form.downPayment" :disabled="false" class="advanceInput"></el-input>
      </el-form-item>
      <el-form-item label="服务费" prop="tsfs" class="table_list">
        <el-input v-model="form.tsfs" :disabled="false" class="advanceInput"></el-input>
      </el-form-item>
      <el-form-item label="油费" prop="oilcard" class="table_list">
        <el-input v-model="form.oilcard" :disabled="false" class="advanceInput"></el-input>
      </el-form-item>
      <el-form-item label="其他费用" prop="otherCost" class="table_list">
        <el-input v-model="form.otherCost" :disabled="false" class="advanceInput"></el-input>
      </el-form-item>
      <el-form-item label="调整利息" prop="adjustInterest" class="table_list" >
        <el-input v-model="form.adjustInterest" :disabled="false" class="advanceInput"></el-input>
      </el-form-item>


      <br/>
      <el-form-item class="button table_list">
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(19)">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style>


  .advance{
    width:100%;
    display: flex;
    padding-bottom: 20px;
  }
  .advance p{
    float:left;
    padding-right:2px;
    flex:1;
    text-align:center;

  }
  .advance p:last-of-type{
    padding-right:0px;
    font-size:0.8rem!important;
  }

  .table_list{
    width: 30%;

  }

  .table_list label{
    width:30%!important;
  }
  .table_list .el-form-item__content{
    width:70%!important;
  }
  .advanceInput{
    width:100%;
  }

  .button{
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }



</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {updateFeesMaintainApi} from '../../../api/modules/settlement'

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        advanceFeesVisible: false,
        /*updateFormRules: {
          settlementType: [
            {required: true, message: '请选择结算方式', trigger: 'blur,change'}
          ]
        },*/
        advance: {},
        withdraw:'',
        freight:'',
        intrest:'',
        totalWithdraw:'',
        changeWithraw:'',
        startIncidental:'',
        updatIncidental:'',
        form: {
          advanceId:'',//七天结算id
          carSupplyFunds:'',//供车款
          downPayment:'',//车款首付押金
          tsfs:'',//服务费
          oilcard:'',//油费
          otherCost:'', //其他费用
          adjustInterest:'',//调整利息
          changeWithraw:''//修改后提现金额

        },
        advanceFeesFormRules:{
          carSupplyFunds:[
            { validator:this.$global.validate.number}
          ],
          downPayment:[
            { validator:this.$global.validate.number}
          ],
          tsfs:[
            { validator:this.$global.validate.number}
          ],
          oilcard:[
            { validator:this.$global.validate.number}
          ],
          otherCost:[
            { validator:this.$global.validate.number}
          ],
          adjustInterest:[
            { validator:this.$global.validate.number}
          ],
        }
      }
    },
    computed: {
      //计算修改后的提现金额
      getChangeWithdraw(){
        let changeWithraw = 0;
        changeWithraw = parseFloat(this.withdraw);
        if(this.startIncidental>this.getUpdatIncidental){
          changeWithraw += parseFloat(this.startIncidental-this.getUpdatIncidental);
        } else {
          changeWithraw -= parseFloat(this.getUpdatIncidental-this.startIncidental);
        }
        this.form.changeWithraw = changeWithraw;
       return changeWithraw.toFixed(2);
      },
      //统计修改后的费用
      getUpdatIncidental(){
       return Number(this.form.carSupplyFunds)+Number(this.form.downPayment)+Number(this.form.tsfs)+
              Number(this.form.oilcard)+Number(this.form.otherCost)+Number(this.form.adjustInterest);
      }


    },

    methods: {
      ...mapActions([]),
      /* getList(){

        let param = Object.assign(this.paginationParams(), this.form)
      },*/
      closeDialog(){
        this.advanceFeesVisible = false;
        this.$refs['form'].resetFields()
      },
      carSupplyFunds(){
        this.changeWithraw -= this.form.carSupplyFunds;
      },
      onSubmit() {
        this.$refs.form.validate((valid) =>{
          if(valid){
            updateFeesMaintainApi(this.form).then(res => {
                if (res.data.success == 1) {
                  this.$refs['form'].resetFields();
                  this.advanceFeesVisible = false;
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  this.$parent.getList();
                  return true;
                } else {
                  this.advanceFeesVisible = false;
                  this.$message({
                    message: '更新失败',
                    type: 'error'
                  });
                  return false;
                }
              });
            }
        })

      },
    },
    watch: {

    },
    created(){
    },
    mounted(){
    }
  }
</script>
