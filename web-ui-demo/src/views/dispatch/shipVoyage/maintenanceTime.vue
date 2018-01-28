<template>
  <div>
    <el-form label-position="right" label-width="90px" :model="maintenanceForm" ref="maintenanceForm">
      <el-form-item label="船名航次" prop="voyageName" >
        <el-input v-model="maintenanceForm.voyageName" :disabled="true" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="预计到港时间"  prop="expectArriveDate" style="margin-right:2px">
        <el-date-picker type="date"  size="small" placeholder="选择日期" v-model="maintenanceForm.expectArriveDate" style="width:200px" @change="requireexpectArriveDateStrChange"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际到港日期"  prop="actualArriveDate" style="margin-right:2px">
        <el-date-picker type="date"  size="small" placeholder="选择日期" v-model="maintenanceForm.actualArriveDate" style="width:200px" :picker-options="pickerOptions0" @change="requireactualArriveDateStrChange"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="maintenanceUpdata">确定</el-button>
        <el-button type="primary" @click="refmaintenance">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {maintenanceUpdata} from '../../../api/modules/dispatch';
    export default {
        props:["maintenance"],
        data() {
            return {
                pickerOptions0: {
                   disabledDate(time) {
                      return time.getTime() > Date.now()
                   }
                },
                maintenanceForm:{
                  voyageName:this.maintenance.voyageName,
                  expectArriveDate:this.maintenance.expectArriveDateStr,
                  actualArriveDate:this.maintenance.actualArriveDateStr,
                  destHarborId:this.maintenance.destHarborId
               }

            }
        },
        watch: {
          maintenance: function () {
              this.maintenanceForm.voyageName = this.maintenance.voyageName;
              this.maintenanceForm.expectArriveDate = this.maintenance.expectArriveDateStr;
              this.maintenanceForm.actualArriveDate = this.maintenance.actualArriveDateStr;
              this.maintenanceForm.destHarborId = this.maintenance.destHarborId
          }
        },
        methods: {
          //预计到港时间
          requireexpectArriveDateStrChange(val){
            this.maintenanceForm.expectArriveDate = val;
          },
          // 实际到港日期
          requireactualArriveDateStrChange(val){
            this.maintenanceForm.actualArriveDate = val;
          },
          maintenanceUpdata(){
            maintenanceUpdata(this.maintenanceForm).then((res)=>{
              let data = res.data;
              if (data.code == 1) {
                this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$refs.maintenanceForm.resetFields();
                    this.$emit('closeMintenance');
                  }
                });
              } else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            })
          },
          refmaintenance(){
            this.$refs.maintenanceForm.resetFields();
            this.$emit('closeMintenance');
          }
        }

    }
</script>

<style >

</style>
