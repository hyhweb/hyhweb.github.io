<template>
    <el-dialog title="新增用户" :visible.sync="showModel" id="departmentAdd">
        <el-form ref="form" :rules="formRules" :model="department" label-width="80px">
            <el-form-item label="部门代码" prop="orgCode">
                <el-input v-model="department.orgCode"></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="department.name"></el-input>
            </el-form-item>
            <el-form-item label="上级部门" prop="parentId" style="display: inline-block;">
                <el-cascader style="width: 240px;"
                    :options="GET_DEPARTMENT_TREE"
                    :show-all-levels="false"
                    @change="onParentDepartmentChange"
                    change-on-select>
                </el-cascader>
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
  #departmentAdd .el-dialog {
    width: 750px;
  }
</style>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
          let tel1 = true;
          let tel2 = true;
          let tel3 = true;
          const validateTel = (rule, value, callback) => {

            if(!(value == '') && !(/^0\d{2,3}-?\d{7,8}$/.test(value)) && !(/^1[3|4|5|7|8|9]\d{9}$/.test(value))){
              callback(new Error('电话号码格式不正确!'));
            } else {
              callback();
            }

//            if(!(/^[01]\d{2,3}-?\d{7,8}$/.test(value))){
//              callback(new Error('电话号码格式不正确!'));
//            } else {
//              callback();
//            }

//            if(!tel1 || !tel2){
//              callback(new Error('电话号码格式不正确!'));
//            } else {
//              callback();
//            }


//            if(!(/^0\d{2,3}-?\d{7,8}$/.test(value))){
//              callback(new Error('电话号码格式不正确!'));
//            } else {
//              callback();
//            }
//
//            if(!(/^1[3|4|5|7|8|9]\d{9}$/.test(value))){
//              callback(new Error('电话号码格式不正确!'));
//            } else {
//              callback();
//            }
          };

            return {
                showModel: false,
                department: {
                    orgType: '',
                    name: '',
                    orgCode: '',
                    description: '',
                    parentId: '',
                    customerServicePhone: ''
                },
                formRules: {
                    orgCode: [
                        { required: true, message: '部门代码不能为空' },
                    ],
                    name: [
                        { required: true, message: '部门名称不能为空' },
                    ],
                    parentId: [
                        { required: true, message: '上级部门不能为空' },
                    ],
                  customerServicePhone: [
                    {
                      validator: validateTel, trigger: 'change'
                    }
                  ]
                },
            };
        },
        computed: {
            ...mapGetters('departmentStore', [
                'GET_DEPARTMENT_TREE',
            ]),
        },
        methods: {
            ...mapActions('department', [
                'addDepartment',
            ]),
            ...mapActions('departmentStore', [
                'getChildDepartmentsByParentId',
            ]),
            onParentDepartmentChange(val) {
                this.department.parentId = val[val.length - 1];
                this.getChildDepartmentsByParentId(val)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                if (valid) {
                        this.addDepartment(this.department)
                    .then(() => {
                      this.$refs.form.resetFields();
                      this.showModel = false;
                      this.$message.success('部门添加成功');
                    })
                    .catch((err) => {
                        if (err) {
                            this.$message.error('部门添加失败\n'+err);
                        } else {
                            this.$message.error('部门添加失败');
                        }
                    });
                    }
                })

            },
            closeDialog() {
                this.showModel = false;
            },
        },
    };
</script>
