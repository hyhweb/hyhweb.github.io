<template>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" class="driver_window_body">
    <el-form inline :model="form" ref="editform" :rules="rules">
      <el-row>
        <el-col class="float_driver_cont">
          <el-form-item label="姓名:" prop="driverName" :label-width="labelWidth" >
            <el-input v-model="form.driverName" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="登录名:" prop="loginName" :label-width="labelWidth">
            <el-input v-model="form.loginName" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col v-if="mode=='add'" class="float_driver_cont">
          <el-form-item label="密码:" prop="password" :label-width="labelWidth">
            <el-input v-model="form.password" class='control-width' type="password"></el-input>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="性别" :label-width="labelWidth" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio :label="2">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="邮箱:" prop="email" :label-width="labelWidth">
            <el-input v-model="form.email" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="电话:" prop="phone" :label-width="labelWidth">
            <el-input v-model="form.phone" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="身份证号:" prop="identificationCard" :label-width="labelWidth">
            <el-input v-model="form.identificationCard" class='control-width' :maxlength="18"
                      placeholder="最多可输入18个字符"></el-input>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="生日" prop="birthday" :label-width="labelWidth">
            <el-date-picker class='control-width' v-model="form.birthday" placeholder="请输入日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="所属部门" :label-width="labelWidth" prop="orgCode">
            <el-select
              clearable filterable default-first-option
              v-model="form.orgCode"
              class='control-width'>
              <el-option v-for="item in departmentDataList"
                         :key="item.value"
                         :label="item.text"
                         :value="item.other">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="是否禁用:" prop="status" :label-width="labelWidth">
            <el-select
              clearable filterable default-first-option
              class='control-width'
              v-model="form.status">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col class="float_driver_cont">
          <el-form-item label="司机类型" :label-width="labelWidth" prop="driverType">
            <el-select
              clearable filterable default-first-option
              class='control-width'
              v-model="form.driverType">
              <el-option label="专职" :value="1"></el-option>
              <el-option label="兼职" :value="2"></el-option>
              <el-option label="协议" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="收款帐号:" prop="bankAccount" :label-width="labelWidth" class="fullwidth-input">
            <el-input v-model="form.bankAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="开户人:" prop="bankAccountOwner" :label-width="labelWidth">
            <el-input v-model="form.bankAccountOwner" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="开户银行:" prop="openAccountBankName" :label-width="labelWidth">
            <el-select clearable filterable default-first-option class='control-width'
              v-model="form.openAccountBankName">
              <el-option v-for="item in bankList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="开户网点:" prop="openAccountBankAddress" :label-width="labelWidth" class="fullwidth-input">
            <el-input v-model="form.openAccountBankAddress" class='control-width' style="width: 438px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-col>
        <el-form-item label="" :label-width="labelWidth">
          <el-button type="primary" @click="customerSave">提交
          </el-button>
        </el-form-item>
      </el-col>

    </el-form>
  </el-dialog>
</template>

<!--以下为博博写的代码-->
<style>
  .float_driver_cont{
    width: 50%;
    display: inline-block;
  }
  .driver_window_body .el-dialog{
    min-width: 664px;
    margin: 0 auto;
  }
  .driver_window_body .el-dialog .el-dialog__body .el-form{
    margin: 0 auto;
    text-align:left;
    display: block;
    padding:0 0 0 50px;
  }



</style>
<!--博博代码到此为止-->

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  export default{
    data(){
      return {
        dialogVisible: false,
        mode: "add",
        labelWidth: '80px',
        rules: {
          driverName: [{required: true, message: '姓名不能为空'}],
          loginName: [{required: true, message: '登录名不能为空'}],
          password: [{required: true, message: '密码不能为空'}],
          phone: [{required: true, message: '电话不能为空'}, {validator: this.$global.validate.phone}],
          orgCode: [{required: true, message: '所属部门不能为空'}],
          driverType: [{required: true, message: '司机类型不能为空'}]
        },
        form: {
          driverName: "",
          loginName: "",
          password: "",
          gender: "",
          email: "",
          phone: "",
          identificationCard: "",
          birthday: "",
          orgCode: "",
          status: "1",
          driverType: "",

          bankAccount: '',
          bankAccountOwner: '',
          openAccountBankName: '',
          openAccountBankAddress: ''
        }
      }
    },

    computed: {
      ...mapGetters(['departmentDataList','bankList']),
      dialogTitle(){
        if (this.mode == "add") {
          return "新增司机"
        } else if (this.mode == "edit") {
          return "修改司机信息"
        }
      }
    },

    methods: {
      ...mapActions(['driverInfoSave', 'driverInfoUpdate','getBankList']),
      customerSave(){
        this.$refs.editform.validate((valid) => {
          if (valid) {
            this.form.birthday = (typeof(this.form.birthday) == "undefined") ? '' : (typeof(this.form.birthday) == "string" ? this.form.birthday : util.formatDate.format(this.form.birthday, 'yyyy-MM-dd'));
            if (this.mode == "add") {
              this.driverInfoSave(this.form).then((res) => {
                if (res.success) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
                  this.$refs.editform.resetFields()
                  this.$parent.getList()
                  this.dialogVisible = false

                } else {
                  this.$message({
                    message: res.message,
                    type: 'warning'
                  })
                }
              })
            } else if (this.mode == "edit") {
              this.driverInfoUpdate(this.form).then((res) => {
                if (res.success) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$parent.getList()
                  this.dialogVisible = false
                } else {
                  this.$message({
                    message: res.message,
                    type: 'warning'
                  })
                }
              })
            }
          }
        })

      }
    },

    created(){

    },
    mounted(){

    }

  }
</script>



<style>
  .fullwidth-input {
    display: block !important;
  }
  .fullwidth-input> label {
    float: left !important;
  }
  .fullwidth-input> .el-form-item__content {
    display: block !important;
    margin-left:80px !important;
  }
  .fullwidth-input> .el-form-item__content> .el-input {
    width: 75% !important;
    min-width: 438px !important;
  }
</style>
