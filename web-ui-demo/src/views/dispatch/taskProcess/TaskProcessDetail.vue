<!-- 字典管理 列表 -->
<template>
  <el-dialog size="50%" title="任务流程详情" :visible.sync="taskModel">
    <section>
      <el-table
        :data="taskProcessDetailList.data"
        style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column width="300"
                         prop="processName"
                         label="流程名称">
        </el-table-column>
        <el-table-column width="300"
                         prop="nodeName"
                         label="任务节点名称">
        </el-table-column>
        <el-table-column width="200"
                         prop="seq"
                         label="序号">
        </el-table-column>

      </el-table>
      <el-col style="padding:10px 0;text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :current-page="pageNo"
                       :page-size="pageSize"
                       :total="pageCount"
                       :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
      <!--<TaskProcessDetailAdd ref="TaskProcessDetailAdd"></TaskProcessDetailAdd>-->
      <!--<UpdateTaskProcessDetail ref="UpdateTaskProcessDetail"></UpdateTaskProcessDetail>-->
    </section>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util';
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins: [pagination],
//    components: {TaskProcessDetailAdd, UpdateTaskProcessDetail},
    data() {
      return {
        selectData: [],
        taskModel: false,
        detail: {},
        form: {
          taskProcessId: '',
          code: '',
          processName: '',
          nodeName: ''
        },
      }
    },
    computed: {
      ...mapGetters([
        'taskProcessDetailList'
      ])
    },

    methods: {
      ...mapActions([
        'getTaskProcessDetailList'
      ]),
      handleSelectionChange(val){
        this.selectData = val;
      },
      //获取任务流程详情列表
      getList(){
        console.log(this.form.taskProcessId)
        this.pageHandler(this.form, this.getTaskProcessDetailList)
      },
    },
    mounted(){
      console.log(this.page)
    },
    watch: {
      detail(val){
        Object.assign(this.form, val)
        this.form.taskProcessId = val.id;
        this.getList();
      }
    },
  }
</script>
