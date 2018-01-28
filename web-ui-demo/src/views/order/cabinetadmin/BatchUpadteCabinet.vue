<template>
  <el-dialog
    size="small"
    title="批量修改集装箱信息"
    v-model="BatchUpdateCabinetVisible">
    <el-form ref="form" inline :model="form" label-width="150px">

  <!--    <el-form-item label="订单号" prop="orderNo" >
        <el-input v-model="form.orderNo" :disabled="true" class='control-width'></el-input>
      </el-form-item>

      <el-form-item label="客户名称" prop="customerName" >
        <el-input v-model="form.customerName" :disabled="true" class='control-width'></el-input>
      </el-form-item>

      <el-form-item label="定舱单号" prop="bookSpaceNo" >
        <el-input v-model="form.bookSpaceNo" :disabled="true" class='control-width'></el-input>
      </el-form-item>

      <el-form-item label="集装箱号" prop="cabinetNo">
        <el-input v-model="form.cabinetNo" :disabled="true" class='control-width'></el-input>
      </el-form-item>

      <el-form-item label="集装箱类型" prop="cabinetType">
        <el-input v-model="form.cabinetType" :disabled="true" class='control-width'></el-input>
      </el-form-item>-->

      <el-form-item label="联系客户时间"  prop="contactTime" style="margin-right:2px">
        <el-date-picker type="datetime"  class='control-width'  size="small" placeholder="选择日期" v-model="form.contactTime" style="width:200px" @change="requireContactTimeChange"></el-date-picker>
      </el-form-item>
      <el-form-item label="派车时间"  prop="assignDate" style="margin-right:2px">
        <el-date-picker type="datetime"  class='control-width'  size="small" placeholder="选择日期" v-model="form.assignDate" style="width:200px" @change="requireassignDateChange"></el-date-picker>
      </el-form-item>
      <el-form-item label="到厂时间"  prop="arrivalTime" style="margin-right:2px">
        <el-date-picker type="datetime"  class='control-width'  size="small" placeholder="选择日期" v-model="form.arrivalTime" style="width:200px" @change="requireArrivalTimeChange"></el-date-picker>
      </el-form-item>
      <el-form-item label="装/卸货完成时间"  prop="leavingTime" style="margin-right:2px">
        <el-date-picker type="datetime"  class='control-width'  size="small" placeholder="选择日期" v-model="form.leavingTime" style="width:200px" @change="requireLeavingTimeChange"></el-date-picker>
      </el-form-item>
      <el-form-item label="还柜时间"  prop="completeTime" style="margin-right:2px">
        <el-date-picker type="datetime"  class='control-width'  size="small" placeholder="选择日期" v-model="form.completeTime" style="width:200px" @change="requireCompleteTimeChange"></el-date-picker>
      </el-form-item>
  <!--     <el-form-item label="要求运货时间"  prop="freightTime" style="margin-right:2px">
        <el-date-picker type="datetime" class='control-width' size="small" placeholder="选择日期" v-model="form.freightTime" style="width:200px" @change="requireFreightTtimeChange"></el-date-picker>
      </el-form-item>

      <el-form-item label="实际作业时间"  prop="actualTime" style="margin-right:10px">
        <el-date-picker type="datetime" class='control-width' size="small" placeholder="选择日期" v-model="form.actualTime"style="width:200px"@change="requireActualTimeChange"></el-date-picker>
      </el-form-item>

      <el-form-item label="紧急状态"  prop="urgencyStatus" style="margin-right:2px">
        <el-select size="small" v-model="form.urgencyStatus" placeholder="请选择">
          <el-option label="急送" value="0">急送</el-option>
          <el-option label="重要" value="1">重要</el-option>
          <el-option label="普通" value="2">普通</el-option>
          </el-select>
      </el-form-item> -->

      <!--<el-form-item label="备注" prop="remark">-->
        <!--<el-input v-model="form.remark"></el-input>-->
      <!--</el-form-item>-->
      <el-col class="textAlign">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {updateCabinetApi,batchupdateCabinetApi} from '../../../api/modules/order'
  import Qs from 'qs';
  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '200px',
        BatchUpdateCabinetVisible: false,
//        updateFormRules: {
//          settlementType: [
//            {required: true, message: '请选择结算方式', trigger: 'blur,change'}
//          ]
//        },
        detail: {},
        selectUpdate:[],
        form: {
          orderNo:'',//订单号
          cabinetIds: '',
          urgencyStatus:'',//紧急性状态
          urgencyText:'',
          receiveTime:'',//接收时间
          contactTime:'',//联系时间
          assignDate:'',//派车时间
          arrivalTime:'',//到达装/卸货时间
          leavingTime:'',//离开装/卸货时间
          freightTime:'',//要求运货时间
          actualTime:'',//实际作业时间
          completeTime:''//完成时间
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
        this.BatchUpdateCabinetVisible = false;
        this.$refs['form'].resetFields()
      },
      //接收时间
      requireReceiveTimeChange(val){
          this.form.receiveTime = val;
      },
      //联系时间
      requireContactTimeChange(val){
          this.form.contactTime = val;
      },
      //派车时间
      requireassignDateChange(val){
        this.form.assignDate = val;
      },
      //到达装/卸货时间
      requireArrivalTimeChange(val){
        this.form.arrivalTime = val;
      },
      // 离开装/卸货时间
      requireLeavingTimeChange(val){
        this.form.leavingTime = val;
      },
      //要求运货时间
      requireFreightTtimeChange(val){
          this.form.freightTime = val;
      },
      //实际作业时间
      requireActualTimeChange(val){
          this.form.actualTime = val;
      },
      //完成时间
      requireCompleteTimeChange(val){
          this.form.completeTime = val;
      },
      onSubmit() {
        this.$refs.form.validate((valid)=>{
          var cabinetIds = this.selectUpdate.map(item => item.cabinetId);
          this.form.cabinetIds = cabinetIds.toString();
          if(valid){
            batchupdateCabinetApi(this.form).then(res => {
                if (res.data.success) {
                  this.$refs.form.resetFields()
                  this.BatchUpdateCabinetVisible = false;
                  this.$parent.getList();
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$parent.getList()
                } else {
                  this.BatchUpdateCabinetVisible = false;
                  this.$message({
                    message: '修改失败',
                    type: 'error'
                  })
                }
              });
            }
        })

      }
    },
    watch: {
      detail(val){
        Object.assign(this.form, val)

      }
    },
    created(){
    },
    mounted(){
    }
  }
</script>
