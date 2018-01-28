<template>
  <el-dialog
    size="0%"
    title="付款"
    v-model="payVisible">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="申请单编号" prop="requisitionId" :label-width="labelWidth">
        <el-input v-model="form.requisitionId" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <!--办单员以外场合显示-->
      <el-form-item label="付款对象" prop="payObj" v-show="form.showFlgA" :label-width="labelWidth">
        <el-input v-model="form.payObj" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <!--办单员场合显示-->
      <el-form-item label="付款对象" prop="payObjBDY" v-show="form.showFlgB" :label-width="labelWidth">
        <el-input v-model="form.payObjBDY" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="办单员姓名" prop="payObj" v-show="form.showFlgB" :label-width="labelWidth">
        <el-input v-model="form.payObj" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="付款方式(隐藏)" prop="payType" v-show="false" :label-width="labelWidth">
        <el-input v-model="form.payType" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="payTypeName" v-show="form.showFlgA" :label-width="labelWidth">
        <el-input v-model="form.payTypeName" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="申请单金额" prop="reqAmount" :label-width="labelWidth">
        <el-input v-model="form.reqAmount" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="付款金额" prop="unpaidAmount" :label-width="labelWidth">
        <el-input v-model="form.unpaidAmount" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="付款备注" prop="payRemark" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.payRemark" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import {payPayCashRequestApi} from '../../../api/modules/settlement'

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '90px',
        payVisible: false,
        detail: {},
        form: {
          requisitionId: '',
          payObj: '',
          payObjBDY: '',
          payObj: '',
          payType: '',
          payTypeName:'',
          reqAmount: '',
          unpaidAmount: '',
          payRemark: '',
          showFlgA: true,
          showFlgB: false
        }
      }
    },
    computed: {},

    methods: {
      ...mapActions([
        'payPayCashRequest'
      ]),
      getList(){
        let param = Object.assign(this.paginationParams(), this.form)
      },
      closeDialog(){
        this.payVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        payPayCashRequestApi(this.form).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            var flg = data.success;
            if (flg) {
              this.$refs['form'].resetFields()
              this.payVisible = false;
              this.$parent.getList()
              this.$parent.showDetail(this.form.requisitionId)

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
          }
        });
      },
    },

    watch: {
      detail(val){
        Object.assign(this.form, val)
//设置付款方式
        if (this.form.payType == 1) {
          this.form.payTypeName = '支票'
        } else if (this.form.payType == 2) {
          this.form.payTypeName = '现金'
        } else if (this.form.payType == 3) {
          this.form.payTypeName = '银行转账'
        } else {
          this.form.payTypeName = ''
        }

        var payObjectType = this.form.payObjectType;
        var payObjId = this.form.payObjId;
        var payObjIdDock = this.form.payObjIdDock;
        var payObjIdShip = this.form.payObjIdShip;

        if(payObjectType==1 || payObjId != ''){
          this.form.showFlgA = true
          this.form.showFlgB = false
        }else if(payObjectType==3 || payObjIdDock != ''){
          this.form.showFlgA = true
          this.form.showFlgB = false
        }else if(payObjectType==5 || payObjIdShip != ''){
          this.form.showFlgA = true
          this.form.showFlgB = false
        }else{
          this.form.showFlgA = false
          this.form.showFlgB = true
          this.form.payObjBDY = '办单元(BDY)'
        }

//设置办单员
// if (undefined == this.form.payObjId || null == this.form.payObjId || '' == this.form.payObjId) {
// this.form.showFlgA = false
// this.form.showFlgB = true
// this.form.payObjBDY = '办单元(BDY)'
// } else {
// this.form.showFlgA = true
// this.form.showFlgB = false
// }

        this.form.reqTime = null
        this.form.status = null
      }
    },
    created(){
    },
    mounted(){
    }
  }
</script>
