<template>
  <el-dialog title="集装箱费用修改日志" size="large" v-model="dialogVisible" top="10%" ref="newDialog">
    <!--列表-->
    <el-col>
      <el-table ref="table" :data="cabinetCostLogList.data" height="300" stripe  @row-click="handleRowClick">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column prop="displayname" label="修改字段" width="100" sortable>
        </el-table-column>
        <el-table-column prop="afterval" label="修改后值" width="130" sortable>
        </el-table-column>
        <el-table-column prop="beforeval" label="修改前值" sortable>
        </el-table-column>
        <el-table-column prop="username" label="修改人" sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="修改时间" sortable>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col style="padding:10px 0;text-align:center;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '../../../common/js/util'
import pagination from '../../../common/mixins/pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      dialogVisible: false,
      form: {
        cabinetCostId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'cabinetCostLogList'
    ])
  },
  methods: {
    ...mapActions([
      'getCabinetCostUpdateLog',
    ]),
    //初始化函数
    init() {
      this.getList()
    },
    //获取列表
    getList() {
      this.pageHandler(this.form, this.getCabinetCostUpdateLog)
    },
    dialogFormVisible() {
      this.dialogVisible = false
    }
  },
  created() {},
  mounted() {}
}

</script>
