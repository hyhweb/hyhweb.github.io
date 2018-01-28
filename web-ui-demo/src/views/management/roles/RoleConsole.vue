<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="newRole" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="modifyRole" :disabled="editDisabled || this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="onClickDelete" :disabled="deleteDisabled || this.$global.isDisabled(9)">删除</el-button>
      </el-button-group>
      </el-col>
      <form-box title="查询">
        <el-form inline ref="form" :model="getSearch" label-width="180px">
          <el-form-item label="角色名称">
            <el-input v-model="getSearch.name" class="control-width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">搜索</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table" :data="GET_ROLES"
    :max-height="tableMaxHeight"
     @selection-change="setSelectedRoles" @row-click="handleRowClick">
      <el-table-column type="selection" min-width="40">
      </el-table-column>
      <el-table-column prop="id" label="ID" min-width="150"></el-table-column>
      <el-table-column prop="code" label="角色编码" min-width="150"></el-table-column>
      <el-table-column prop="name" label="角色名称" min-width="150"></el-table-column>
      <el-table-column prop="description" label="角色描述" min-width="150"></el-table-column>
      <el-table-column label="权限配置" min-width="150">
        <template scope="scope">
          <el-button type="text" size="small" @click="authorizeRole(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="用户列" min-width="150">
        <template scope="scope">
          <el-button type="text" size="small" @click="onClickShowUsers(scope.row)">显示</el-button>
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

    <RoleAdd ref="RoleAdd"></RoleAdd>
    <RoleModify ref="RoleModify"></RoleModify>
    <RoleAuthorize ref="RoleAuthorize"></RoleAuthorize>

  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import RoleAdd from './RoleAdd.vue';
  import RoleModify from './RoleModify.vue';
  import RoleAuthorize from './RoleAuthorize.vue';
  import pagination from '../../../common/mixins/pagination';

  export default {
    mixins: [pagination],
    components: {
      RoleAdd,
      RoleModify,
      RoleAuthorize,
    },
    computed: {
      ...mapGetters('role', [
        'getSearch',
        'editDisabled',
        'deleteDisabled',
        'GET_ROLES',
        'getSelectedRoles',
      ]),
    },
    methods: {
      ...mapActions('role', [
        'setSelectedRoles',
        'deleteRoles',
        'getRoles',
        'getUserListByRole',
      ]),
      onClickShowUsers(role) {
        this.getUserListByRole(role)
          .then((roles) => {
            let message = '无已绑定用户';
            if (roles.length !== 0) {
              message = roles.toString();
            }
            this.$alert(message, '已绑定用户', {
              confirmButtonText: '确定',
            });
          })
          .catch((err) => {
            this.$message.err(err);
          });
      },
      authorizeRole(val) {
        console.log(val);
        this.$refs.RoleAuthorize.role = Object.assign({}, val);
        this.$refs.RoleAuthorize.showModel = true;
      },
      getList() {
        this.pageHandler(this.getSearch, this.getRoles);
      },
      newRole() {
        this.$refs.RoleAdd.showModel = true;
      },
      modifyRole() {
        this.$refs.RoleModify.role = Object.assign({}, this.getSelectedRoles[0]);
        this.$refs.RoleModify.showModel = true;
      },
      onClickDelete() {
        this.$alert('您确定要删除吗?', '', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              this.deleteRoles()
                .then(() => {
                  this.$message.success('成功删除');
                  this.getList();
                })
                .catch((error) => {
                  this.$message.error(`删除失败: ${error}`);
                });
            }
          },
        });
      },
    },
    mounted() {
      this.getList();
    },
  };
</script>
