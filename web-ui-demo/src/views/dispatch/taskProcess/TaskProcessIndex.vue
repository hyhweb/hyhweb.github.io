<!-- 字典管理 列表 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" :disabled="this.$global.isDisabled(2)"
                     @click="addTask">新增
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateDict" :disabled="this.$global.isDisabled(7)">
            修改
          </el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteDictHandle" disabled>删除</el-button>
        </el-button-group>
      </el-col>
      <form-box title="查询">
        <el-form inline ref="form" :rules="formTask" :model="form" label-width="80px">
          <!-- <el-form-item label="编号" prop="code">
             <el-input v-model="form.code" class="control-width"></el-input>
           </el-form-item>-->
          <el-form-item label="流程名称 ">
            <el-input v-model="form.processName" class="control-width"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>
    <TableBox>
      <el-table ref="table"
        :data="taskProcessList.data"
        :max-height="tableMaxHeight"
         @selection-change="handleSelectionChange"
         @row-click="handleRowClick">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
                         prop="processName"
                         label="流程名称">
        </el-table-column>
        <el-table-column
                         prop="dispatchTypeText"
                         label="调度类型">
        </el-table-column>

        <el-table-column
                         prop="orderType"
                         label="任务节点">
          <template scope="scope">
            <span>{{scope.row.orderType == 0 ? '装货' : '送货'}}</span>
          </template>
        </el-table-column>

        <el-table-column
                         prop="set"
                         label="是否套箱">
          <template scope="scope">
            <span>{{scope.row.set ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="set"
                         label="版本号">
          <template scope="scope">
            <span>{{scope.row.version}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template scope="scope">
            <el-button size="small" type="primary" @click="goLookDetails(scope.row)" :disabled="isDisabled(29)">查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </TableBox>
   <PaginationBox>
        <el-col>
          <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
          </el-pagination>
        </el-col>
    </PaginationBox>
    <TaskProcessAdd ref="TaskProcessAdd"></TaskProcessAdd>
    <UpdateTaskProcess ref="UpdateTaskProcess"></UpdateTaskProcess>
    <TaskProcessDetail ref="TaskProcessDetail"></TaskProcessDetail>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util';
  import pagination  from '../../../common/mixins/pagination'
  import TaskProcessAdd from './TaskProcessAdd.vue'
  import UpdateTaskProcess from './UpdateTaskProcess.vue'
  import TaskProcessDetail from './TaskProcessDetail.vue'

  export default {
    mixins: [pagination],
    components: {TaskProcessAdd, UpdateTaskProcess,TaskProcessDetail},
    data() {
      return {
        newDictdialogVisible: false,
        updateDictdialogVisible: false,
        selectData: [],
        form: {
          code: '',
          processName: ''
        },
        formTask: {
          code: [
            {validator: this.$global.validate.number}
          ],
        },
      }
    },
    computed: {
      ...mapGetters([
        'taskProcessList'
      ])
    },

    methods: {
      ...mapActions([
        'getTaskProcessList'
      ]),
      handleSelectionChange(val){
        this.selectData = val;
        console.log(val)
      },
      getList(){
        this.pageHandler(this.form, this.getTaskProcessList)
      },
      newDict(){
        this.$refs.Dictsave.newDictdialogVisible = true;
      },
      //新增任务节点
      addTask(){
        this.$refs.TaskProcessAdd.taskModel = true;
      },
      //修改任务节点
      updateDict(){
        if (this.selectData.length == 1) {
          this.$refs.UpdateTaskProcess.taskModel = true;
          this.$refs.UpdateTaskProcess.update = this.selectData[0];
        } else {
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      //查看详情
      goLookDetails(val){
          this.$refs.TaskProcessDetail.taskModel = true
          console.log(val);
          this.$refs.TaskProcessDetail.detail = val;
        /*const id = val.id;
         this.$router.push(`/dispatch/taskProcess/detail/${id}`)*/
      },
      deleteDictHandle(){

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSubmit() {
        this.pageNo = 1
        console.log('submit!');
        this.getList();
      }
    },
    created(){

      this.getList();
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
