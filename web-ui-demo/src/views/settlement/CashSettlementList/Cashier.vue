<template>
	<el-dialog
    id="cashierVisible"
    size="thin"
    :title="titles"
    v-model="cashierVisible" :before-close="closeDialog">
		<div v-if="examine">
      <el-form :model="form" label-width="80px"  ref="form">
        <el-form-item label="本次确认现结单笔数:" :label-width="labelWidth" v-if="examinesign">
          <span>{{singular}}</span>
        </el-form-item>
        <el-form-item label="转账支付总金额:" :label-width="labelWidth">
          <span>{{totals}}</span>
        </el-form-item>
        <el-form-item label="支付时间：" prop="payTime" :label-width="labelWidth">
          <el-date-picker type="datetime" icon="" v-model.trim="form.payTime" class='input-width'></el-date-picker>
        </el-form-item>
        <el-form-item label="备注:"  prop="payRemark" :label-width="labelWidth">
            <el-input type="textarea" :rows="4" v-model="form.payRemark"  class='input-width'></el-input>
        </el-form-item>
        </el-form-item label=" " :label-width="labelWidth">
          <span style="color:red;display:block;margin-bottom: 18px;margin-left:50px;">（注：转账给司机后，系统将会自动发送短信通知司机！）</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cashierPay('form')">确认支付</el-button>
          <el-button type="primary" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
		</div>
    <div v-if="examinesss">
      <el-form :model="examineForm" label-width="80px"  ref="examineForm" :rules="examineForms">
        <el-form-item label="审核意见:" :label-width="labelWidth"  prop="examineAndVerifyResult">
          <el-select v-model="examineForm.examineAndVerifyResult" placeholder="请选择" class='input-width'>
            <el-option label="请选择" value=""></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:"  prop="payRemark" :label-width="labelWidth">
          <el-input type="textarea" :rows="4" v-model="examineForm.remark"  class='input-width'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="examineAndVerify('examineForm')">确认</el-button>
          <el-button type="primary" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
	</el-dialog>
</template>
<style scoped>
  .input-width{
    width: 250px;
  }
</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
  import {examineAndVerify} from '../../../api/modules/settlement'
	export default {
    	mixins: [pagination],
    	components: {},
    	data(){
      		return {
            examinesign:false,
            titles:'',
            examine:false,
            examinesss:true,
            examineForm:{
              examineAndVerifyResult:'1',
              remark:'',
              id:'',
              settleStatus:''
            },
            examineForms:{
              examineAndVerifyResult: [
                { required: true, message: '请选择审核意见', trigger: 'change' }
              ],
            },
            labelWidth: '120px',
      			cashierVisible:false,
            singular:'',
            totals:'',
            form:{
              payTime:'',
              payRemark:'',
              ids:'',
            },
      		}
  		},
      methods: {
        ...mapActions([
            'getcashierPays',
          ]),
        closeDialog() {
          this.$parent.getList();
          this.cashierVisible = false;
          this.$refs['form'].resetFields();
          this.$refs['examineForm'].resetFields();
        },
        examineAndVerify(formName){
          if (this.examineForm.examineAndVerifyResult == 0) {
            if (this.examineForm.remark == '') {
              this.$message('请填写备注')
              return false
            }
          }
           this.$refs[formName].validate((valid) => {
              if (valid) {
                examineAndVerify(this.examineForm).then((res)=>{
                  if (res.data.code == 1) {
                    this.$message({
                          message: '操作成功',
                          type: 'success'
                        })
                    this.cashierVisible = false;
                    this.$parent.closeDialog();
                    this.$refs['form'].resetFields();
                    this.$refs['examineForm'].resetFields();
                  }else{
                    this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    this.cashierVisible = false;
                    this.$parent.closeDialog();
                    this.$refs['form'].resetFields();
                    this.$refs['examineForm'].resetFields();
                  }
                })
              }
           })

        },
        // 保存
        cashierPay(formName){
          if (!this.form.payTime) {
            this.$message('请填写时间')
            return false;
          }
          this.form.payTime = this.dateFormatHandle(this.form.payTime,'yyyy-MM-dd hh:mm:ss');
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.getcashierPays(this.form).then((res)=>{
                if (this.examinesign == true) {
                  if (res.success) {
                    this.$message({
                          message: '操作成功',
                          type: 'success'
                        })
                    this.cashierVisible = false;
                    this.$parent.getList();
                    this.$refs['form'].resetFields();
                    this.$refs['examineForm'].resetFields();
                  }else{
                    this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    this.cashierVisible = false;
                    this.$parent.getList();
                    this.$refs['form'].resetFields();
                    this.$refs['examineForm'].resetFields();
                  }
                }else{
                  if (res.success) {
                    this.$message({
                          message: '操作成功',
                          type: 'success'
                        })
                    this.cashierVisible = false;
                    this.$parent.getList();
                    this.$parent.closeDialog();
                    this.$refs['form'].resetFields();
                    this.$refs['examineForm'].resetFields();
                  }else{
                    this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    this.cashierVisible = false;
                    this.$parent.getList();
                    this.$parent.closeDialog();
                    this.$refs['form'].resetFields();
                    this.$refs['examineForm'].resetFields();
                  }
                }
              })
            }
          })

        }
      }
  	}
</script>
