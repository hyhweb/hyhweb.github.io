<template>
  <div>
      <el-form :model="editForm" label-width="80px"  ref="editForm" >
          <el-form-item label="箱号" :label-width="labelWidth">
              <el-input v-model="editForm.cabinetNo" class='control-width'></el-input>
          </el-form-item>
        <el-form-item label="封号" :label-width="labelWidth">
          <el-input v-model="editForm.sealNo" class='control-width'></el-input>
        </el-form-item>
          <el-form-item label="提柜码头" :label-width="labelWidth">
              <span>{{taskDto.getDockName}}</span>
          </el-form-item>
          <el-form-item label="还柜码头" :label-width="labelWidth">
              <span>{{taskDto.returnDockName}}</span>
          </el-form-item>
          <el-form-item label="目的港" :label-width="labelWidth">
              <span>{{taskDto.endHarborName}}</span>
          </el-form-item>          
          <el-form-item label="船公司" :label-width="labelWidth">
              <span>{{taskDto.shipCompanyName}}</span>
          </el-form-item>
          <el-form-item label="联系人" :label-width="labelWidth">
              <span>{{taskDto.contactName}}</span>
          </el-form-item>
          <el-form-item label="装卸地址" :label-width="labelWidth"  >
              <span>{{taskDto.address}}</span>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="labelWidth">
              <span>{{taskDto.contactPhone}}</span>
          </el-form-item>
          <el-form-item label="马力要求" :label-width="labelWidth">
              <span>{{taskDto.horsePower}}</span>
          </el-form-item>
          <el-form-item label="要求装送货日期" :label-width="labelWidth">
              <!--<span>{{formatDate(taskDto.requireDate)}}</span>-->
            <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" v-model="requireDate" @change="handleSelectRequireDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="要求完成日期" :label-width="labelWidth">
              <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" v-model="overDate" @change="handleSelectOverDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="运费"  :label-width="labelWidth">
              <span>{{taskDto.freight}}</span>
          </el-form-item>
          <el-form-item label="备注" :label-width="labelWidth">
              <span>{{taskDto.orderRemark}}</span>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="handleUpdateOverDate" :loading="loading">提交</el-button>
          </el-form-item>
      </el-form>
  </div>
</template> 

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {updateOverDate} from '../../../api/modules/dispatch';
    export default {
        props:["taskDto"],
        data() {
            return {
                labelWidth: '120px',
                loading: false,
                requireDate: this.formatDate(this.taskDto.requireDate),
                overDate: this.taskDto.overDate,
                editForm: {
                    taskId: this.taskDto.id,
                    overDate: this.taskDto.overDate,
                    sealNo: this.taskDto.sealNo,
                    cabinetNo: this.taskDto.cabinetNo,
                    cabinetId: this.taskDto.cabinetId,
                    requireDate:this.formatDate(this.taskDto.requireDate)
                }
            }
        },
      watch: {
        taskDto: function () {
          this.editForm.taskId=this.taskDto.id;
          this.editForm.sealNo=this.taskDto.sealNo;
          this.editForm.cabinetNo=this.taskDto.cabinetNo;
          this.editForm.cabinetId=this.taskDto.cabinetId;
          this.editForm.requireDate=this.taskDto.requireDate;
          this.editForm.overDate=this.taskDto.overDate;
          this.requireDate= this.formatDate(this.taskDto.requireDate);
            this.overDate=this.taskDto.overDate;
        }
      },
        methods: { 
          handleSelectRequireDate(val){
            this.editForm.requireDate=val;
          },
          handleSelectOverDate(val){
                this.editForm.overDate=val;
            },
          formatDate(date){
            return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm:ss');
          },
          updateTask(){
            this.editForm.requireDate=this.formatDate(this.editForm.requireDate);
            updateOverDate(this.editForm).then((res) => {
              this.loading=false;
            let data = res.data;
            if (data.code == 1) {
              this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  this.$emit('closeEditTask');
            }
            });

            } else {
              this.$message({
                type: 'error',
                message: data.message
              });
            }
          }).catch((res)=>{
              this.loading=false;
          });
          },
            handleUpdateOverDate(){
              this.loading=true;
              if(this.editForm.cabinetNo&&!util.validation.checkCabinetNo(this.editForm.cabinetNo)){
                this.$confirm('箱号验证不通过, 是否继续保存?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'error'
                }).then(() => {
                  this.updateTask();
                }).catch(() => {
                    this.loading=false;
                });
              }else {
                this.updateTask();
              }

            }
        }

    }
</script>

<style  scoped lang="scss">

    .el-dialog__body{
        padding: 5px 20px;
    }
    .el-form-item{
        margin-bottom: 2px;
    }
</style>
