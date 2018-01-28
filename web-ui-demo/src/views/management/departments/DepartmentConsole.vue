<!-- 系统管理——部门管理 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group >
          <el-button type="primary" icon="plus" size="small" @click="newDepartment" :disabled="this.$global.isDisabled(2)">新增</el-button>
          <el-button type="primary" icon="edit" size="small" @click="modifyDepartment" :disabled="editDisabled || this.$global.isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="arrow-up" size="small" :disabled="showParentDisabled" @click="showParent">返回上级</el-button>
          <!--<el-button type="primary" icon="delete" size="small" @click.prevent="onClickDelete" :disabled="deleteDisabled || this.$global.isDisabled(9)">删除</el-button>-->
        </el-button-group>
      </el-col>
      <form-box title="查询">
        <el-form inline ref="form" :model="getSearch" label-width="180px">
          <el-form-item label="部门名称">
            <el-input v-model="getSearch.name" class="control-width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table" :data="GET_DEPARTMENTS"
    :max-height="tableMaxHeight" border
     @selection-change="setSelectedDepartments" @row-click="handleRowClick">
      <el-table-column type="selection" min-width="40">
      </el-table-column>
      <el-table-column prop="name" label="部门名称" min-width="150">
        <template scope="scope">

          <el-button v-if="scope.row.level!=3" @click.native.prevent="showChild(scope.row)" type="text" size="small">
            {{ scope.row.name }}
          </el-button>
          <span v-else=""> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orgCode" label="代码" min-width="150"></el-table-column>

      <el-table-column prop="customerServicePhone" label="客服电话" min-width="150"></el-table-column>

      <el-table-column prop="description" label="描述" min-width="150"></el-table-column>
      <el-table-column prop="level" label="级别" min-width="150"></el-table-column>
      <el-table-column prop="pname" label="上级部门" min-width="150">
      </el-table-column>
      <el-table-column prop="pname" label="操作" min-width="150">
        <template scope="scope">
          <el-button @click="onClickShowHarbour(scope.row)" type="text" size="small">
            查看港口
          </el-button>
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

    <DepartmentAdd ref="DepartmentAdd"></DepartmentAdd>
    <DepartmentModify ref="DepartmentModify"></DepartmentModify>
    <DepartmentHarbour ref="DepartmentHarbour"></DepartmentHarbour>

  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import DepartmentAdd from './DepartmentAdd';
  import DepartmentModify from './DepartmentModify';
  import DepartmentHarbour from './DepartmentHarbour';
  import pagination from '../../../common/mixins/pagination';

  export default {
    mixins: [pagination],
    components: {
      DepartmentAdd,
      DepartmentModify,
      DepartmentHarbour,
    },
    computed: {
      ...mapGetters('department', [
        'getSearch',
        'editDisabled',
        'deleteDisabled',
        'GET_DEPARTMENTS',
        'getSelectedDepartments',
        'GET_PARENT',
      ]),
      showParentDisabled:function () {
        return this.GET_DEPARTMENTS !=null && this.GET_DEPARTMENTS.length>0 ? this.GET_DEPARTMENTS[0].level==1 : false;
      }
    },
    methods: {
      ...mapActions('department', [
        'setSelectedDepartments',
        'deleteDepartments',
        'getDepartments',
        'setParent',
        'popParent',
        'reset',
      ]),
      showParent() {
        this.popParent();
        this.pageNo=1;
        this.getSearch.name='';
        this.getList();
      },
      showChild(child) {
        if (child.level >= 3) {
          this.$message.info('无下级节点数据');
        } else {
          this.setParent(child);
          this.pageNo=1;
          this.getSearch.name='';
          this.getSearch.deptId=child.id;
          this.getList();
        }
      },
      search(){
        this.pageNo=1;
        this.getList();
      },
      getList() {
        if (this.$global.isDisabled('1')) {
          return;
        }
        this.pageHandler(this.getSearch, this.getDepartments);
      },
      newDepartment() {
        this.$refs.DepartmentAdd.showModel = true;
      },
      modifyDepartment() {
        this.$refs.DepartmentModify.department = Object.assign(
          {},
          this.getSelectedDepartments[0],
        );
        this.$refs.DepartmentModify.showModel = true;
      },
      onClickDelete() {
        this.$alert('您确定要删除吗?', '', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              this.deleteDepartments()
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
      onClickShowHarbour(department) {
        this.$refs.DepartmentHarbour.currentDepartment = department;
        this.$refs.DepartmentHarbour.showModel = true;
      },
    },
    mounted() {
      this.reset();
      this.getList();
    },
  };
</script>
