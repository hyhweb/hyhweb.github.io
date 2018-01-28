<template>
  <el-dialog title="修改用户" :visible.sync="showModel" id="departmentEdit">
    <el-form ref="form" :rules="formRules" :model="department" label-width="80px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="department.name"></el-input>
      </el-form-item>
      <el-form-item label="上级部门" prop="parentId" style="display: inline-block;">
        <el-cascader style="width: 240px;" :options="GET_DEPARTMENT_TREE" :show-all-levels="false" v-model="departmentChain" @change="onParentDepartmentChange" change-on-select></el-cascader>
      </el-form-item>
      <el-form-item label="客服电话" prop="customerServicePhone" style="display: inline-block; float: right;">
        <el-input v-model="department.customerServicePhone" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="部门描述" prop="description">
        <el-input v-model="department.description" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label-width="0" style="text-align: center;">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style>
  #departmentEdit .el-dialog {
    width: 750px;
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        showModel: false,
        formRules: {
          name: [
            { required: true, message: '部门名称不能为空' },
          ],
          parentId: [
            { required: true, message: '上级部门不能为空' },
          ]
        },
        department: {},
        departmentChain: [],
      };
    },
    computed: {
      ...mapGetters('departmentStore', [
        'GET_DEPARTMENT_TREE',
      ]),
    },
    methods: {
      ...mapActions('department', [
        'modifyDepartment',
      ]),
      ...mapActions('departmentStore', [
        'getChildDepartmentsByParentId',
        'getDepartmentChainByDepartmentId',
      ]),
      onParentDepartmentChange(val) {
        this.department.parentId = val[val.length - 1];
        this.getChildDepartmentsByParentId(val);
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
                if (valid) {
                    this.department.parentId = this.departmentChain[this.departmentChain.length - 1];
                    this.modifyDepartment(this.department)
                      .then(() => {
                        this.showModel = false;
                        this.$message.success('部门修改成功');
                      })
                      .catch((err) => {
                        if (err) {
                          this.$message.error('部门修改失败\n{errr}');
                        } else {
                          this.$message.error('部门修改失败');
                        }
                      });
                }
              })

      },
      closeDialog() {
        this.showModel = false;
      },
    },
    watch: {
      showModel(show) {
        if (show) {
          this.getDepartmentChainByDepartmentId(this.department.parentId)
            .then((res) => {
              this.departmentChain = res;
            })
            .catch();
        }
      },
    },
  };
</script>
