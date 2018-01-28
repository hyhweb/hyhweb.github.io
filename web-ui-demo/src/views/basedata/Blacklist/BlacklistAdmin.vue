  <!-- 字典管理 列表 -->
<template>
  <section>
    <el-col class="tool-bar">
      <ToolBarBox>
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" @click="newDict" :disabled="this.$global.isDisabled(2)">新增</el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateDict" :disabled="this.$global.isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteDictHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
        </el-button-group>
        <form-box  title="查询">
          <el-form inline ref="form" :model="form" label-width="80px">
            <el-form-item label="手机号码 ">
              <el-input v-model="form.phone" class="control-width"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
           </el-form-item>
          </el-form>
        </form-box>
      </ToolBarBox>
    </el-col>
    <TableBox>
        <el-table ref="table"
        :max-height="tableMaxHeight"
        :data="blackList.data"
         @selection-change="handleSelectionChange"
        @row-click="handleRowClick">
        <el-table-column type="selection" width="40" >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="operaterName"
          label="操作人">
         </el-table-column>
        <el-table-column
          prop="createDate"
          label="操作时间">
        </el-table-column>
      </el-table>
    </TableBox>
    <PaginationBox>
          <el-col>
            <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
            </el-pagination>
          </el-col>
    </PaginationBox>
    <el-col>
      <el-dialog title="修改手机号码"   v-model="updateDictdialogVisible">
        <v-updatePhone :taskDto="taskDto"  v-on:closePhone="closePhone"></v-updatePhone>
      </el-dialog>
    </el-col>
  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
   import pagination  from '../../../common/mixins/pagination'
   import updatePhone from './updatePhone.vue';
   import {deleteBlackListApi,saveBlackListApi} from '../../../api/modules/basedata';
  export default {
    mixins:[pagination],
    data() {
      return {
        taskDto:{},
        updateDictdialogVisible:false,
        selectData:[],
        form: {
          phone: ''
        }

      }
    },
    components: {
      'v-updatePhone': updatePhone,
    },
    computed:{
      ...mapGetters([
        'blackList'
        ])
    },

    methods: {
      ...mapActions([
        'getBlackList'
        ]),
      handleSelectionChange(val){
        this.selectData =  val;
      },
     getList(){
        this.pageHandler(this.form,this.getBlackList)
      },
      newDict(){
        this.$prompt('请输入手机号码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^1[3|4|5|7|8][0-9]{9}$/,
          inputErrorMessage: '手机号码格式不正确'
        }).then((value)=>{
          saveBlackListApi({phone:value.value}).then((res)=>{
              if(res.data.code == 1){
                this.$message({
                  message:'新增成功',
                  type:'success',
                })
                this.getList();
              }else{
                 this.$message({
                  message:'新增失败',
                  type:'error'
                })
               this.getList();
              }
          })
        })

      },
      updateDict(){
        if(this.selectData.length == 1){
          this.taskDto.blacklistId = this.selectData[0].blacklistId;
          this.taskDto.phone = this.selectData[0].phone
          this.updateDictdialogVisible=true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      closePhone(){
        this.updateDictdialogVisible=false;
        this.getList();
      },
      deleteDictHandle(){
        if(this.selectData.length == 1){
          this.$confirm('确认删除？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(()=>{
            deleteBlackListApi({id:this.selectData[0].blacklistId}).then((res)=>{
              if(res.data.code == 1){
                this.$message({
                  message:'删除成功',
                  type:'success'
                })
                this.getList();
              }else{
                 this.$message({
                  message:'删除失败',
                  type:'error'
                })
                 this.getList();
              }

           })
          })

        }else{
          this.$confirm('请选择一条数据进行编辑')
        }

         },

      onSubmit() {
          this.pageNo=1
         this.getList();
      }
    },
    created(){

     this.getList();
    },
    mounted(){

    }
  }
</script>
