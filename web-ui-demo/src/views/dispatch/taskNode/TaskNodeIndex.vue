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
          <el-form-item label="编号" prop="code">
            <el-input v-model="form.code" class="control-width"></el-input>
          </el-form-item>
          <el-form-item label="节点名称 ">
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
      <el-table ref="table"
        :data="taskList.data"
        :max-height="tableMaxHeight"
        @row-click="handleRowClick"
       @selection-change="handleSelectionChange">
        <el-table-column type="selection" >
        </el-table-column>
        <el-table-column
                         prop="nodeName"
                         label="节点名称">
        </el-table-column>


        <el-table-column
                         prop="code"
                         label="编号">
        </el-table-column>

        <el-table-column
          prop="nodeDataTypeText"
          label="节点数据类型">
        </el-table-column>

        <el-table-column
          prop="jacktAble"
          label="可单拖套箱">
          <template scope="scope">
            <span>{{scope.row.jacktAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="doubleJacktAble"
                         label="可双拖套箱">
          <template scope="scope">
            <span>{{scope.row.doubleJacktAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="cancelJackAble"
                         label="可取消单拖套箱">
          <template scope="scope">
            <span>{{scope.row.cancelJackAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="cancelDoubleJackAble"
                         label="可取消双拖套箱">
          <template scope="scope">
            <span>{{scope.row.cancelDoubleJackAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="doubleAble"
                         label="可允许双拖">
          <template scope="scope">
            <span>{{scope.row.doubleAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="cancelDoubleAble"
                         label="可取消双拖">
          <template scope="scope">
            <span>{{scope.row.cancelDoubleAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="photoQuantityText"
                         label="要求拍照的类型">
          <!--<template scope="scope">
            <span>{{scope.row.jacktAble?'是':'否'}}</span>
          </template>-->
        </el-table-column>
        <el-table-column
                         prop="fillSealNo"
                         label="写入封号类型">
          <template scope="scope">
            <span>{{showSealNoType(scope.row.newFillSealNo)}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="fillCabinetNo"
                         label="是否写入箱号">
          <template scope="scope">
            <span>{{scope.row.fillCabinetNo ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="evaluate"
                         label="是否评价">
          <template scope="scope">
            <span>{{scope.row.evaluate ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="handUpAble"
                         label="可挂起">
          <template scope="scope">
            <span>{{scope.row.handUpAble ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
                         prop="photoContent"
                         label="拍照内容">
        </el-table-column>
      </el-table>
    </TableBox>
    <PaginationBox>
          <el-col>
            <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
            </el-pagination>
          </el-col>
        </PaginationBox>
    <TaskNodeAdd ref="taskNodeAdd"></TaskNodeAdd>
    <UpdateTaskNode ref="updateTaskNode"></UpdateTaskNode>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import TaskNodeAdd from './TaskNodeAdd.vue'
  import UpdateTaskNode from './UpdateTaskNode.vue'
  import util from '../../../common/js/util';
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins: [pagination],
    components: {TaskNodeAdd, UpdateTaskNode},
    data() {
      return {
        newDictdialogVisible: false,
        updateDictdialogVisible: false,
        selectData: [],
        form: {
          code: '',
          nodeName: ''
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
        'taskList'
      ])
    },

    methods: {
      ...mapActions([
        'getTaskList'
      ]),
      showSealNoType(i){
          return i==0 ? "不录" : (i==1 ? "必录" : "选录");
      },
      handleSelectionChange(val){
        this.selectData = val;
        console.log(val)
      },
      getList(){
        this.pageHandler(this.form, this.getTaskList)
      },
      newDict(){
        this.$refs.Dictsave.newDictdialogVisible = true;
      },
      //新增任务节点
      addTask(){
        this.$refs.taskNodeAdd.taskModel = true;
      },
      //修改任务节点
      updateDict(){
        if (this.selectData.length == 1) {
          this.$refs.updateTaskNode.taskModel = true;
          this.$refs.updateTaskNode.update = this.selectData[0];
        } else {
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteDictHandle(){
      },

      onSubmit() {
        this.pageNo = 1
        console.log('submit!');
        this.getList();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    created(){

      this.getList();
    },
    mounted(){
    }
  }
</script>
