<!-- 字典管理 列表 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" :disabled="this.$global.isDisabled(2)"
                     @click="addTask">新增
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateDict" :disabled="this.$global.isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteDictHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
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

          <el-form-item label="任务节点名称 " label-width="100px">
            <el-input v-model="form.nodeName" class="control-width"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>
    <TableBox>
      <el-table
        :data="taskProcessDetailList.data"
        :max-height="tableMaxHeight"
        @selection-change="handleSelectionChange" ref="table" @row-click="handleRowClick">
        <el-table-column type="selection" width="80">
        </el-table-column>
        <el-table-column
                         prop="processName"
                         label="流程名称">
        </el-table-column>
        <el-table-column
                         prop="nodeName"
                         label="任务节点名称">
        </el-table-column>
        <el-table-column
          prop="taskNodeTypeText"
          label="任务节点类型">
        </el-table-column>
        <el-table-column
                         prop="seq"
                         label="序号">
        </el-table-column>

      </el-table>
    </TableBox>
    <PaginationBox>
          <el-col>
            <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
            </el-pagination>
          </el-col>
    </PaginationBox>
    <TaskProcessDetailAdd ref="TaskProcessDetailAdd"></TaskProcessDetailAdd>
    <UpdateTaskProcessDetail ref="UpdateTaskProcessDetail"></UpdateTaskProcessDetail>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util';
  import pagination  from '../../../common/mixins/pagination'
  import TaskProcessDetailAdd from './TaskProcessDetailAdd.vue'
  import UpdateTaskProcessDetail from './UpdateTaskProcessDetail.vue'
  import {deleteTaskProcessDetail} from '../../../api/modules/dispatch';

  export default {
    mixins: [pagination],
    components: {TaskProcessDetailAdd,UpdateTaskProcessDetail},
    data() {
      return {
        newDictdialogVisible: false,
        updateDictdialogVisible: false,
        selectData: [],
        form: {
          code: '',
          processName: '',
          nodeName:''
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
        this.pageHandler(this.form, this.getTaskProcessDetailList)
      },
      //新增任务节点
      addTask(){
        this.$refs.TaskProcessDetailAdd.taskModel = true;
      },
      //修改任务节点
      updateDict(){
        if (this.selectData.length == 1) {
          this.$refs.UpdateTaskProcessDetail.taskModel = true;
          this.$refs.UpdateTaskProcessDetail.update = this.selectData[0];
         } else {
         this.$confirm('请选择一条数据进行编辑')
         }
      },
      deleteDictHandle(){
        if (this.selectData.length!=1) {
          this.$message('请选择一条数据进行删除');
          return false;
        }else {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            deleteTaskProcessDetail(this.selectData[0].id).then((res) => {
              let data = res.data;
              if(data.code==1){
                this.getList();
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
              }else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });
          });
        }

      },

      onSubmit() {
        this.pageNo = 1
        console.log('submit!');
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
