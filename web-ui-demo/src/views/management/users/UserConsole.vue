<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="newUser" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="modifyUser" :disabled="editDisabled || this.$global.isDisabled(7)">修改</el-button>
        <!--<el-button type="primary" icon="delete" size="small" @click.prevent="onClickDelete"
                      :disabled="deleteDisabled || this.$global.isDisabled(9)">删除
          </el-button>-->
        <el-button type="primary" icon="edit" size="small" @click="modifyUserRole" :disabled="editDisabled || this.$global.isDisabled(7)">权限配置</el-button>
        <!--<el-button type="primary" icon="edit" size="small" @click="modifyUserDepartment" :disabled="editDisabled || this.$global.isDisabled(7)">部门配置</el-button>-->
        <!--<el-button type="primary" icon="delete" size="small" @click.prevent="newUser" :disabled="true">导出</el-button>-->
        <el-button type="primary" icon="edit" size="small" @click="toResetPassword" :disabled="editDisabled || this.$global.isDisabled(66)">重置密码</el-button>
      </el-button-group>
      </el-col>
      <form-box title="查询">
        <el-form inline ref="form" :model="getSearch">
          <el-row>
            <el-form-item label="登录名">
              <el-input v-model="getSearch.loginName" class="control-width"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="getSearch.name" class="control-width"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="getSearch.deptName" class="control-width"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList">搜索</el-button>
            </el-form-item>
          </el-row>

        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table" :data="GET_USERS" :max-height="tableMaxHeight"
     @selection-change="setSelectedUsers" @row-click="handleRowClick">
      <el-table-column type="selection" min-width="40">
      </el-table-column>
      <el-table-column prop="loginName" label="登录名" min-width="120"></el-table-column>
      <el-table-column prop="name" label="用户名" min-width="120"></el-table-column>
      <el-table-column prop="phone" label="联系电话" min-width="120"></el-table-column>
      <el-table-column prop="deptName" label="部门" min-width="120"></el-table-column>
      <el-table-column prop="sexName" label="性别" min-width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
      <el-table-column prop="loginDate" label="最近登录时间" min-width="120"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="120">
        <template scope="scope">
          <span v-show="scope.row.status !== 1">禁用</span>
          <span v-show="scope.row.status === 1">启用</span>
        </template>
      </el-table-column>
    </el-table>
    </TableBox>

    <PaginationBox>
      <el-col style="text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>

    <UserAdd ref="UserAdd"></UserAdd>
    <UserModify ref="UserModify"></UserModify>
    <UserRole ref="UserRole"></UserRole>
    <UserDepartmentAuthorize ref="UserDepartmentAuthorize"></UserDepartmentAuthorize>

    <el-dialog title="重置密码" v-model="dialogVisible" size="tiny">
      <el-form :model="passwordForm" :rules="formRules" ref="passwordForm">
        <el-form-item label="密码" prop="password" :label-width="labelWidth">
          <el-input type="password" v-model="passwordForm.password" class="control-width2"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" :label-width="labelWidth">
          <el-input type="password" v-model="passwordForm.confirmPassword" class="control-width2"/>
        </el-form-item>
        <el-form-item label=""  label-width="100px">
          <el-button type="primary"  @click="resetPd"
                     :disabled="this.$global.isDisabled(66)">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import UserAdd from './UserAdd.vue';
  import UserModify from './UserModify.vue';
  import UserRole from './UserRole.vue';
  import UserDepartmentAuthorize from './UserDepartmentAuthorize.vue';
  import pagination from '../../../common/mixins/pagination';

  export default {
    mixins: [pagination],
    components: {
      UserAdd,
      UserModify,
      UserRole,
      UserDepartmentAuthorize,
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.passwordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelWidth:'80px',
        dialogVisible:false,
        passwordForm:{
          userId:'',
          password:''
        },
        formRules: {
          confirmPassword: [
            { validator: validatePass, trigger: 'change' },
          ],
        }
      }
    },
    computed: {
      ...mapGetters([
        'getSearch',
        'getSearchOptions',
        'GET_USERS',
        'getSelectedUsers',
        'editDisabled',
        'deleteDisabled',
      ]),
    },
    methods: {
      ...mapActions([
        'setSearch',
        'setSelectedUsers',
        'deleteUsers',
        'getUsers',
        'resetPassword'
      ]),
      newUser() {
        this.$refs.UserAdd.showModel = true;
      },
      modifyUser() {
        this.$refs.UserModify.user = Object.assign({}, this.getSelectedUsers[0]);
        this.$refs.UserModify.showModel = true;
      },
      modifyUserRole() {
        this.$refs.UserRole.user = Object.assign({}, this.getSelectedUsers[0]);
        this.$refs.UserRole.showModel = true;
      },
      modifyUserDepartment() {
        this.$refs.UserDepartmentAuthorize.user = Object.assign({}, this.getSelectedUsers[0]);
        this.$refs.UserDepartmentAuthorize.showModel = true;
      },
      getList() {
        this.pageHandler(this.getSearch, this.getUsers);
      },
      onClickDelete() {
        this.$alert('您确定要删除吗?', '', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              this.deleteUsers()
                .then(() => {
                  this.$message.success('成功删除');
                })
                .catch((error) => {
                  this.$message.error(`删除失败: ${error}`);
                });
            }
          },
        });
      },

      toResetPassword(){
          this.dialogVisible = true;
          this.passwordForm={
            userId : this.getSelectedUsers[0].userId
          }
      },
      resetPd(){
        let param = this.passwordForm;
        this.resetPassword(param).then((res)=>{
          if(res.success){
            this.$message({
              message:res.message,
              type:'success'
            })
            this.dialogVisible = false;
            this.getList();
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        })
      },
    },
    mounted() {
      this.getList();
    },
  };
</script>
