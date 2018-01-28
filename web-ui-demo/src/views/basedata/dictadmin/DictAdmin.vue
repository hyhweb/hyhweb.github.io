  <!-- 字典管理 列表 -->
<template>
<section>
<el-col class="tool-bar">
    <el-button-group>
      <el-button type="primary" icon="plus" size="small" @click="newDict" :disabled="this.$global.isDisabled(2)">新增</el-button>
      <el-button type="primary" icon="edit" size="small" @click="updateDict" :disabled="this.$global.isDisabled(7)">修改</el-button>
      <el-button type="primary" icon="delete" size="small" @click.prevent="deleteDictHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
    </el-button-group>
    </el-col>
      <form-box  title="查询">
      <el-form inline ref="form" :model="form" label-width="80px">
        <el-form-item label="字典编码 ">
          <el-input v-model="form.code" class="control-width"></el-input>
        </el-form-item>
        <el-form-item label="字典名称 ">
          <el-input v-model="form.value" class="control-width"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
       </el-form-item>
      </el-form>
      </form-box>
      <el-table ref="table"
      :max-height="tableMaxHeight"
      :data="dictList.data"
       @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" width="40" >
      </el-table-column>
      <el-table-column
        prop="code"
        label="字典编码">
      </el-table-column>
      <el-table-column
        prop="value"
        label="字典名称">
       </el-table-column>
      <el-table-column
        prop="sequence"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="parentValue"
        label="上级字典编码">
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
<DictSave ref="Dictsave"></DictSave>
<DictUpdate ref="Dictupdate"></DictUpdate>

  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import DictSave  from './DictSave.vue'
  import DictUpdate from './DictUpdate.vue'
   import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{DictSave,DictUpdate},
    data() {
      return {
        newDictdialogVisible:false,
        updateDictdialogVisible:false,
        selectData:[],
        form: {
          code: '',
          value: ''

        }

      }
    },
    computed:{
      ...mapGetters([
        'dictList'
        ])
    },

    methods: {
      ...mapActions([
        'getDictList','deleteDict'
        ]),
      handleSelectionChange(val){
        this.selectData =  val;
          console.log(val)
      },
     getList(){
        this.pageHandler(this.form,this.getDictList)
      },
      newDict(){
        this.$refs.Dictsave.newDictdialogVisible = true;
      },
      updateDict(){
        if(this.selectData.length == 1){
           this.$refs.Dictupdate.newDictdialogVisible = true;
           this.$refs.Dictupdate.detail = this.selectData[0]
           this.getDictList()
           console.log(this.selectData[0])
          this.updateDictdialogVisible = true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteDictHandle(){
        if(this.selectData.length == 1){
           console.log(this.selectData[0])
           this.deleteDict({id:this.selectData[0].dictId}).then((res)=>{
              if(res.success){
               this.getDictList()
                this.$message({
                  message:'删除成功',
                  type:'success'
                })
              }else{
                 this.$message({
                  message:'删除失败',
                  type:'error'
                })
              }

           })
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }

         },

      onSubmit() {
          this.pageNo=1
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
