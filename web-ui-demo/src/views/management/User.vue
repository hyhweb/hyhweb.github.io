<template>
  <section>
    <el-form ref="form" :rules="formRules" :model="user" label-width="80px">
      <el-col :span="10">
        <el-form-item label="用户名">
          <el-input v-model="user.loginName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="部门">
          <el-input v-model="user.deptName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="联系电话">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
      </el-col>
     <!-- <el-col :span="10">
        <el-form-item label="性别">
          <el-select v-model="user.sex" placeholder="请选择" class="control-width">
            <el-option v-for="item in pickerOptions.sex" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>-->
    <!--  <el-col :span="10">
        <el-form-item label="生日">
          <el-date-picker v-model="birthday" @change="handleSelectDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-col>-->
      <el-col :span="10">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="user.confirmPassword"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </section>
</template>
<script>
  import { mapActions } from 'vuex';
  import { getById } from '../../api/modules/sys/userInfo';

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
//        birthday: null,
        user: {
          id: null,
//          birthday: null,
          deptName: '',
          deptId: null,
          email: '',
          loginName: '',
          phone: '',
          sex: 1,
          status: null
        },
        formRules: {
          confirmPassword: [
            { validator: validatePass, trigger: 'change' },
          ],
        },
        pickerOptions: {
          sex: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0,
            },
          ],
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      };
    },
    methods: {
      ...mapActions('user', [
        'updateUser',
        'getUser',
      ]),
     /* handleSelectDate(val){
        this.user.birthday=val;
      },*/
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.updateUser(this.user)
              .then(() => this.$message.success('用户修改成功'))
              .catch(err => this.$message.error(`用户修改失败${err}`));
            return true;
          }
          return false;
        });
      },
    },
    computed: {
      matchPassword() {
        return this.user.password === this.confirmPassword;
      },
    },
    mounted() {

      this.getUser()
        .then((res) => {

          this.user.id = res.id;
          this.user.loginName = res.loginName;
          this.user.deptName = res.deptName;
          this.user.deptId = res.deptId;
          this.user.email = res.email;
          this.user.phone = res.phone;
//          this.user.sex = res.sex;
//          this.user.birthday = res.birthday;
          this.user.status = res.status;
        })
        .catch((e) => {
          console.log(e)
        });
    },
  };
</script>
