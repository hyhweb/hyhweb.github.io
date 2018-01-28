<template>
  <el-dialog title="指派司机"  v-model="driverVisible" size="thin" :before-close="handleClose">
    <el-form label-position="right" :rules="driverRules" label-width="90px" :model="driverForm" ref="driverForm">
     <!-- <el-form-item label="执行日期:"  prop="selectDate">
        <el-date-picker
          align="right"
          type="date"
          v-model="selectDate"
          @change="handleSelectDate"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label="车队:"  prop="carteamId">
        <el-select @change="handleCarTeamSelect" v-model="driverForm.carteamId" placeholder="请选择" filterable clearable default-first-option  style="width:200px;">
          <el-option v-for="item in carTeams"   :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="司机:" prop="trailerId">
        <el-select @change="handleTrailerSelect" v-model="driverForm.trailerId" placeholder="请选择" filterable clearable default-first-option  style="width:200px;">
          <el-option v-for="item in trailers"  :key="item.trailerId" :label="getDriverInfo(item)" :value="item.trailerId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="matexia" label="行程运费:" prop="scheduleFreight">
        <el-input v-model.number="driverForm.scheduleFreight" style="width:200px;"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;元
      </el-form-item>
      <el-form-item v-if="matexia" label="行程运费备注:" prop="scheduleFreightRemark">
        <el-input type="textarea" v-model="driverForm.scheduleFreightRemark" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item v-if="matexia" label="拖车报价参考:" prop="referQuotedPrice">{{referQuotedPrice}}&nbsp;元
      </el-form-item>
      <!-- <el-form-item label="是否发布:" prop="isPublish">
        <el-switch
          v-model="driverForm.isPublish"
          on-text="是"
          off-text="否"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="assignDriver('driverForm')">保存</el-button>
        <el-button type="primary" @click="batchPublish('driverForm')">保存并发布</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {assignDriver,batchPublish} from '../../../api/modules/dispatch';
    import {getListByCarTeamId}  from '../../../api/modules/logistics';
    export default {
        props:["scheduleDto","carTeams"],
        data() {
            return {
              referQuotedPrice:'',
                labelWidth: '120px',
              driverVisible: false,
              matexia:false,
              loading: false,
                trailers:[],
                driverRules:{
//                    executeDate: [{  required: true, message: '请选择执行日期', trigger: 'blur' }],
                    trailerId: [ {required: true, message: '请选择司机', trigger: 'blur' }],
                    carteamId: [ {required: true, message: '请选择车队', trigger: 'blur' }],
                    scheduleFreight: [ {type:'number',required: true, message: '请输入费用', trigger: 'blur' }]
                },
//              selectDate: '',
              driverForm: {
                referQuotedPrice:'',
                scheduleFreight:this.scheduleDto.scheduleFreight,
                scheduleFreightRemark:this.scheduleDto.scheduleFreightRemark,
//                executeDate: this.scheduleDto.executeDate,
                isPublish: false,
                trailerId: this.scheduleDto.trailerId,
                driverId:  this.scheduleDto.driverId,
                plateNumber: this.scheduleDto.plateNumber,
                carteamId: this.scheduleDto.carteamId,
                scheduleId: this.scheduleDto.id,
                driverType:  this.scheduleDto.driverType,
                driverPhone:  this.scheduleDto.driverPhone,
                driverName:  this.scheduleDto.driverName
        }
            }
        },
      watch:{
        scheduleDto: function () {
            this.init();
        }
      },
      methods: {
        handleClose(){
            this.driverVisible= false;
            for(let v in this.driverForm){
                this.driverForm[v]='';
            }
          },
            handleSelectDate(val){
//                this.driverForm.executeDate=val;
            },
            init(){

//              this.driverForm.executeDate=this.scheduleDto.executeDate;
              // this.driverForm.isPublish=false;
              this.driverForm.driverId=this.scheduleDto.driverId;
              this.driverForm.plateNumber=this.scheduleDto.plateNumber;
              this.driverForm.scheduleId=this.scheduleDto.id;
              this.driverForm.driverType=this.scheduleDto.driverType;
              this.driverForm.driverPhone=this.scheduleDto.driverPhone;
              this.driverForm.driverName=this.scheduleDto.driverName;
              this.driverForm.scheduleFreightRemark=this.scheduleDto.scheduleFreightRemark;
              this.driverForm.scheduleFreight=this.scheduleDto.scheduleFreight;
//              this.selectDate= this.scheduleDto.executeDate;
              if(this.scheduleDto.carteamId&&this.scheduleDto.trailerId){
                this.driverForm.carteamId=this.scheduleDto.carteamId;
                this.handleCarTeamSelect(this.scheduleDto.carteamId);
              }

            },
            handleCarTeamSelect(trailerId){
              var matexia = false;
              this.carTeams.forEach(function(el){
                if (el.id == trailerId) {
                  if (el.paymentMethod == 3) {
                    matexia = true;
                  }
                }
              })
              this.matexia = matexia;
              this.driverForm.trailerId=null;
              getListByCarTeamId(this.driverForm.carteamId).then((res) => {
                if(res.data.code==="1"){
                this.trailers=res.data.data;
                if(trailerId)
                  this.driverForm.trailerId=this.scheduleDto.trailerId;
              }else {
                this.trailers=[];
              }
            });
            },
            getDriverInfo (item) {
                return item.driverName+"/"+item.plateNumber;
            },
            handleTrailerSelect(){
                let trailer = null;
              this.trailers.forEach((res) => {
                if(res.trailerId==this.driverForm.trailerId){
                trailer = res;
              }
            });
                if(trailer){
                  this.driverForm.trailerId=trailer.trailerId;
                  this.driverForm.plateNumber=trailer.plateNumber;
                  this.driverForm.driverId=trailer.driverId;
                  this.driverForm.driverType = trailer.driverType;
                  this.driverForm.driverPhone = trailer.phone;
                  this.driverForm.driverName = trailer.driverName;
                }else {
                  this.driverForm.trailerId='';
                  this.driverForm.plateNumber='';
                  this.driverForm.driverId='';
                  this.driverForm.driverType = '';
                  this.driverForm.driverPhone = '';
                  this.driverForm.driverName = '';
                }

            },
            // 保存并发布
            batchPublish(formName){
              this.driverForm.isPublish=true;
              this.$refs[formName].validate((valid) => {
                    if (valid) {
                      this.driverForm.scheduleId=this.scheduleDto.id;
                      this.driverForm.referQuotedPrice = this.referQuotedPrice;
                      if (this.matexia == true) {
                        if (parseInt(this.driverForm.scheduleFreight) > parseInt(this.referQuotedPrice)) {
                          if (this.driverForm.scheduleFreightRemark == null || this.driverForm.scheduleFreightRemark == "") {
                            this.$message('运费大于参考价,备注为必填项')
                            return false
                          }
                        }
                      }
                      assignDriver(this.driverForm).then((res)=>{
                          if(res.data.success){
                              this.$alert('操作成功', '提示', {
                                  confirmButtonText: '确定',
                                  callback: action => {
                                    for(let v in this.driverForm) this.driverForm[v]='';
                                    this.driverVisible=false;
                                      this.$emit('closeEditDriver');
                                  }
                              });
                          }else {
                              this.$message({
                                  type: 'error',
                                  message: res.data.message
                              });
                          }
                      });
                    } else {
                        return false;
                    }
                });
            },
             // 保存不发布
            assignDriver(formName){
              this.driverForm.isPublish=false;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      this.driverForm.scheduleId=this.scheduleDto.id;
                      this.driverForm.referQuotedPrice = this.referQuotedPrice;
                      if (this.matexia == true) {
                        if (parseInt(this.driverForm.scheduleFreight) > parseInt(this.referQuotedPrice)) {
                          if (this.driverForm.scheduleFreightRemark == null || this.driverForm.scheduleFreightRemark == "") {
                            this.$message('运费大于参考价,备注为必填项')
                            return false
                          }
                        }
                      }
                      assignDriver(this.driverForm).then((res)=>{
                          if(res.data.success){
                              this.$alert('操作成功', '提示', {
                                  confirmButtonText: '确定',
                                  callback: action => {
                                    for(let v in this.driverForm) this.driverForm[v]='';
                                    this.driverVisible=false;
                                      this.$emit('closeEditDriver');
                                  }
                              });
                          }else {
                              this.$message({
                                  type: 'error',
                                  message: res.data.message
                              });
                          }
                      });

                    } else {
                        return false;
                    }
                });
            }
        },
      created(){
        this.init();
      }
    }
</script>

<style>

</style>
