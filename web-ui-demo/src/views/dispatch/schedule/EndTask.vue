<template>
  <div>
    <el-form label-position="right" :rules="endTaskRules" label-width="90px" :model="endTaskForm" ref="endTaskForm">
      <el-form-item label="提柜时间:"  prop="selectPickUpCabinetTime">
        <el-date-picker
          align="right"
          type="datetime"
          v-model="endTaskForm.selectPickUpCabinetTime"
          @change="handleSelect1"
          :picker-options="pickerOptions0"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到场时间:"  prop="arriveDate">
        <el-date-picker
          align="right"
          type="datetime"
          v-model="endTaskForm.arriveDate"
          @change="handleSelect2"
          :picker-options="pickerOptions1"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>              
      <el-form-item label="还柜时间:"  prop="selectReturnCabinetTime">
        <el-date-picker
          align="right"
          type="datetime"
          v-model="endTaskForm.selectReturnCabinetTime"
          @change="handleSelect"
          :picker-options="pickerOptions2"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="overSchedule('endTaskForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {overSchedule} from '../../../api/modules/dispatch';
    export default {
        props:["scheduleDto"],
        data() {
          let that = this;
            return {
                labelWidth: '120px',
                loading: false,
                arriveDate: '',
                pickUpCabinetTime: '',
                returnCabinetTime: '',
                endTaskForm:{
                  selectReturnCabinetTime: '',
                  selectPickUpCabinetTime: '',
                  arriveDate: ''
                },           
                endTaskRules:{
                  selectReturnCabinetTime: [ {type: 'date', required: true, message: '请选择日期', trigger: 'blur' }],
                  selectPickUpCabinetTime: [ {type: 'date', required: true, message: '请选择日期', trigger: 'blur' }],
                  arriveDate: [ {type: 'date', required: true, message: '请选择日期', trigger: 'blur' }]
                },
                pickerOptions0: {
                   disabledDate(time) {
                      return time.getTime() > Date.now() 
                   }
                },
                pickerOptions1: {
                   disabledDate(time) {
                      return time.getTime() > Date.now() ||time.getTime() < new Date(that.pickUpCabinetTime).getTime()- 8.64e7;
                   }
                },                
                pickerOptions2: {
                   disabledDate(time) {
                      return time.getTime() > Date.now() ||time.getTime() < new Date(that.arriveDate).getTime()- 8.64e7;
                   }
                },                                
                
            } 
        },
        watch: {
          scheduleDto: function () {
              this.endTaskForm.selectReturnCabinetTime = this.scheduleDto[1];
              this.endTaskForm.selectPickUpCabinetTime = this.scheduleDto[1];
              this.endTaskForm.arriveDate = this.scheduleDto[1];
          }
        },        
        methods: {
          handleSelect(val){
              this.returnCabinetTime = val;
          },
          handleSelect1(val){
              this.pickUpCabinetTime = val;
              this.endTaskForm.arriveDate = '';
              this.endTaskForm.selectReturnCabinetTime = '';
          },
          handleSelect2(val){
              this.arriveDate = val;
              this.endTaskForm.selectReturnCabinetTime = '';
          },                               
          overSchedule(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      overSchedule({scheduleIds: this.scheduleDto,pickUpCabinetTime: this.pickUpCabinetTime, returnCabinetTime: this.returnCabinetTime, arriveDate: this.arriveDate}).then((res) => {
                        console.log(res)
                        let data = res.data;
                        if(data.code==1){
                          this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                              this.$emit('closeEndTask');
                            }
                          });

                        }else {
                          this.$message({
                            type: 'error',
                            message: data.message
                          });
                        }
                      });
                    } else {
                        return false;
                    }
                });
            }
        }

    }
</script>

<style >

</style>
