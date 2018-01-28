<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group >
        <el-button type="primary" icon="plus" size="small" @click="newMenu" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="modifyMenu" :disabled="editDisabled || this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="onClickDelete" :disabled="deleteDisabled || this.$global.isDisabled(9)">删除</el-button>
      </el-button-group>
      </el-col>
      <form-box title="查询">
        <el-form inline ref="form" :model="getSearch" label-width="180px">
          <el-form-item label="菜单名称">
            <el-input v-model="getSearch.menuName" class="control-width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">搜索</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table" :data="GET_MENUS" :max-height="tableMaxHeight"
     @selection-change="setSelectedMenus" @row-click="handleRowClick">
      <el-table-column type="selection" min-width="40"></el-table-column>
      <!--<el-table-column prop="id" label="ID" min-width="150"></el-table-column>-->
      <!--<el-table-column prop="funName" label="菜单编码" min-width="150"></el-table-column>-->
      <el-table-column prop="menuName" label="名称" min-width="150">
        <template scope="scope">
          <el-button @click.native.prevent="showChild(scope.row)" type="text" size="small">
            {{ scope.row.menuName }}
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column prop="funValue" label="菜单class属性值" min-width="150"></el-table-column>-->
      <el-table-column prop="menuUrl" label="链接" min-width="150"></el-table-column>
      <el-table-column prop="sortno" label="排序" min-width="150"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" min-width="150">
        <template scope="scope">
          <el-button @click.native.prevent="showParent(scope.row)" type="text" size="small">
            {{ GET_PARENT.menuName }}
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column prop="isShowing" label="菜单栏显示" min-width="150">
                      <template scope="scope">
                          <span v-show="!scope.row.notShowing">显示</span>
                          <span v-show="scope.row.notShowing">不显示</span>
                      </template>
                  </el-table-column>-->
      <!--<el-table-column prop="type" label="菜单类型" min-width="150"></el-table-column>-->
    </el-table>
    </TableBox>

    <PaginationBox>
      <el-col style="text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>

    <MenuAdd ref="MenuAdd"></MenuAdd>
    <MenuModify ref="MenuModify"></MenuModify>

  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import MenuAdd from './MenuAdd';
  import MenuModify from './MenuModify';
  import pagination from '../../../common/mixins/pagination';

  export default {
    mixins: [pagination],
    components: {
      MenuAdd,
      MenuModify,
    },
    computed: {
      ...mapGetters('menuConsole', [
        'getSearch',
        'editDisabled',
        'deleteDisabled',
        'GET_MENUS',
        'getSelectedMenus',
        'getSearchOptions',
        'GET_PARENT',
      ]),
    },
    methods: {
      ...mapActions('menuConsole', [
        'setSelectedMenus',
        'deleteMenus',
        'getMenus',
        'setParent',
        'popParent',
        'reset',
      ]),
      showParent() {
        this.popParent();
        this.getList();
      },
      showChild(child) {
        if (parseInt(child.pid, 10) !== 0) {
          this.$message.info('无下级节点数据');
        } else {
          this.setParent(child);
          this.getList();
        }
      },
      newMenu() {
        this.$refs.MenuAdd.showModel = true;
      },
      modifyMenu() {
        this.$refs.MenuModify.menu = Object.assign({}, this.getSelectedMenus[0]);
        this.$refs.MenuModify.showModel = true;
      },
      getList() {
        this.pageHandler(this.getSearch, this.getMenus);
      },
      onClickDelete() {
        this.$alert('您确定要删除吗?', '', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              this.deleteMenus()
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
    },
    mounted() {
      this.reset();
      this.getList();
    },
  };
</script>
