<template>
  <el-dialog title="港口信息" :visible.sync="showModel">
    <el-row>
      <el-button-group style="padding-bottom:10px">
        <el-button type="primary" icon="plus" size="small" @click="onClickNew">新增</el-button>
        <el-button type="primary" icon="delete" size="small" @click="onClickDelete" :disabled="!this.selectedCurrentHarbour">删除</el-button>
      </el-button-group>
    </el-row>
    <el-row v-if="showAddHarbour">
      <el-select   clearable filterable default-first-option  v-model="selectedHarbour" placeholder="请选择" >
        <el-option v-for="item in GET_ORPHAN_HARBOURS" :key="item.value" :label="item.text" :value="item.value"></el-option>
      </el-select>
      <el-button-group style="padding-left:10px">
        <el-button type="primary" icon="plus" size="small" @click="onClickSubmit" :disabled="!Object.keys(this.selectedHarbour).length">提交</el-button>
        <el-button type="primary" icon="delete" size="small" @click="onClickCancel">取消</el-button>
      </el-button-group>
    </el-row>
    <el-row style="padding-top:10px">
      <el-table ref="table" :data="GET_HARBOURS" style="width: 100%" max-height="250" highlight-current-row @current-change="handleRowChange"
      @row-click="handleRowClick">
        <el-table-column prop="harborId" label="ID" min-width="60"></el-table-column>
        <el-table-column prop="harborName" label="港口名称" min-width="50"></el-table-column>
        <el-table-column prop="regionName" label="地区名称" min-width="80"></el-table-column>
        <el-table-column prop="secRegion" label="城市" min-width="50"></el-table-column>
        <el-table-column prop="address" label="地址" min-width="100"></el-table-column>
        <el-table-column prop="longtitude" label="经度" min-width="30"></el-table-column>
        <el-table-column prop="latitude" label="纬度" min-width="30"></el-table-column>
      </el-table>
      <el-col style="padding:10px 0;text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import pagination from '../../../common/mixins/pagination';

  export default {
    mixins: [pagination],
    data() {
      return {
        showModel: false,
        showAddHarbour: false,
        currentDepartment: {
        },
        selectedHarbour: {},
        selectedCurrentHarbour: {},
      };
    },
    computed: {
      ...mapGetters('department/harbour', [
        'GET_HARBOURS',
        'GET_ORPHAN_HARBOURS',
      ]),
    },
    watch: {
      currentDepartment(newValue) {
        if (newValue) {
          this.getList();
        }
      },
      showModel(newValue) {
        if (!newValue) {
          this.selectedCurrentHarbour = null;
        }
      },
    },
    methods: {
      ...mapActions('department/harbour', [
        'getHarboursOfDepartment',
        'refreshOrphanHarbourList',
        'addHarbour',
        'deleteHarbour',
      ]),
      getList() {
        this.pageHandler(this.currentDepartment, this.getHarboursOfDepartment);
      },
      handleRowChange(val) {
        this.selectedCurrentHarbour = val;
      },
      onClickNew() {
        this.showAddHarbour = true;
        this.refreshOrphanHarbourList();
      },
      onClickDelete() {
        this.deleteHarbour({ harbourId: this.selectedCurrentHarbour.harborId, department: this.currentDepartment })
        .then(() => {
          this.$message.success('删除港口成功');
          this.showAddHarbour = false;
          this.selectedHarbour = {};
          this.getList();
        })
        .catch((err) => {
          this.$message.error(`删除港口失败\n${err}`);
        });
      },
      onClickCancel() {
        this.selectedHarbour = {};
        this.showAddHarbour = false;
      },
      onClickSubmit() {
        this.addHarbour({ harbourId: this.selectedHarbour, department: this.currentDepartment })
        .then(() => {
          this.$message.success('添加港口成功');
          this.showAddHarbour = false;
          this.selectedHarbour = {};
          this.getList();
        })
        .catch((err) => {
          this.$message.error(`添加港口失败\n${err}`);
        });
      },
    },
  };
</script>
