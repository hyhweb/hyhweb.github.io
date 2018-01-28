<!-- 码头(泛亚)管理 列表 -->
<template>
  <section>
    <el-col style="padding:10px 0;">
      <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="addDockFy" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="updateDockFy" :disabled="this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="deleteDockFyHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
      </el-button-group>
    </el-col>
    <form-box  title="查询">
      <el-form :inline="true" ref="form" :model="form" label-width="140px">
        <el-form-item label="码头(运柜宝)名称 ">
          <el-input v-model="form.dockName" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="码头(泛亚)编码">
          <el-input v-model="form.contrastcode" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="码头(泛亚)名称 ">
          <el-input v-model="form.contrastname" class="control-width"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </form-box>
    <el-table ref="table"
      :data="dockFyList.data"
       @selection-change="handleSelectionChange" @row-click="handleRowClick">
      <el-table-column type="selection" width="40" >
      </el-table-column>
      <el-table-column
        prop="dockName"
        label="码头(运柜宝)名称"
        >
      </el-table-column>

      <el-table-column
        prop="contrastcode"
        label="码头(泛亚)编码"
        >
      </el-table-column>

      <el-table-column
        prop="contrastname"
        label="码头(泛亚)名称"
        >
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
    <DockFySave ref="DockFySave"></DockFySave>
    <DockFyUpdate ref="DockFyUpdate"></DockFyUpdate>

  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import DockFySave  from './DockFySave.vue'
  import DockFyUpdate from './DockFyUpdate.vue'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{DockFySave,DockFyUpdate},
    data() {
      return {
        newDockdialogVisible:false,
        updateDockdialogVisible:false,
        selectData:[],
        form: {
          name: '',
          harborId:"",
          dockCode:""
        }

      }
    },
    computed:{
      ...mapGetters([
        'dockFyList'
      ])
    },

    methods: {
      ...mapActions([
        'getDockFyList','deleteDockFy'
      ]),
      handleSelectionChange(val){
        this.selectData =  val;
        console.log(val)
      },

      getList(){
        this.pageHandler(this.form,this.getDockFyList);
      },
      addDockFy(){
        this.$refs.DockFySave.newDockdialogVisible = true;
      },
      updateDockFy(){
        if(this.selectData.length == 1){
            this.$refs.DockFyUpdate.newDockdialogVisible = true;
            this.$refs.DockFyUpdate.form.id = this.selectData[0].id;
            this.$refs.DockFyUpdate.form.dockId = this.selectData[0].dockId + "";
            this.$refs.DockFyUpdate.form.contrastcode = this.selectData[0].contrastcode;
            this.$refs.DockFyUpdate.form.contrastname = this.selectData[0].contrastname;

          this.newDockdialogVisible = true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteDockFyHandle(){
        if(this.selectData.length == 1){
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个码头, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.id).join("&");
              this.deleteDockFy(ids).then(res =>{
                if(res.success){
                  this.$refs['form'].resetFields();
                  this.getDockFyList();
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
              });
            })
        }else{
          this.$confirm('请选择删除数据')
        }
      },

      resetForm() {
        this.form = {
          dockName: '',  // 码头(运柜宝)名称
          contrastcode: '', // 码头(泛亚)编码
          contrastname: ''  //码头(泛亚)名称
        };
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
