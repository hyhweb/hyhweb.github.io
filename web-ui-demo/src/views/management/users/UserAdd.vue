<template>
  <el-dialog title="新增用户" :visible.sync="showModel">
    <el-form ref="form" :rules="formRules" :model="user" label-width="80px">
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="user.loginName"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="user.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-cascader :options="GET_DEPARTMENT_TREE" :show-all-levels="false" @change="onParentDepartmentChange" change-on-select>
        </el-cascader>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select   clearable filterable default-first-option  v-model="user.sex" placeholder="请选择" class="control-width">
          <el-option v-for="item in getSearchOptions.sex" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select   clearable filterable default-first-option  v-model="user.status" placeholder="请选择" class="control-width">
          <el-option v-for="item in getSearchOptions.status" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

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
        showModel: false,
        user: {
          loginName: '',
          name: '',
          password: '',
          confirmPassword: '',
          phone: '',
          email: '',
          deptId: '',
          sex: 1,
          status: 1,
        },
        formRules: {
          loginName: [
            { required: true, message: '登录名长度至少为4', trigger: 'blur, change', min: 4 },
          ],
          name: [
            { required: true, message: '用户名长度至少为2', trigger: 'blur, change', min: 2 },
          ],
          password: [
            { required: true, message: '密码需要至少5位', trigger: 'blue, change', min: 5 },
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'change' },
          ],
          email: [
            { required: false, type: 'email', trigger: 'blue, change', message: '请输入有效的email地址' },
          ],
          deptId: [
            { required: true, message: '请选择部门', trigger: 'blue, change' },
          ],
        },
      };
    },
    computed: {
      ...mapGetters([
        'getSearchOptions',
        'GET_DEPARTMENTS',
        'GET_ROLES',
      ]),
      ...mapGetters('departmentStore', [
        'GET_DEPARTMENT_TREE',
      ]),
    },
    methods: {
      ...mapActions([
        'addUser',
        'getDepartments',
        'getRoles',
      ]),
      ...mapActions('departmentStore', [
        'getChildDepartmentsByParentId',
      ]),
      onParentDepartmentChange(val) {
        this.user.deptId = val[val.length - 1];
        this.getChildDepartmentsByParentId(val)
          .then(() => {
          })
          .catch(() => {
          });
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.addUser(this.user)
              .then(() => {
                this.showModel = false;
                this.$message.success('用户添加成功');
              })
              .catch((err) => {
                this.$message.error(`用户添加失败\n${err || ''}`);
              });
            return true;
          }
          return false;
        });
      },
      closeDialog() {
        this.showModel = false;
      },
    },
    watch: {
      showModel(newValue) {
        if (!newValue) {
          this.$refs.form.resetFields();
        }
      },
    },
  };
</script>
