<!-- 港口管理 列表 -->
<template>
  <section>
    <el-col style="padding:10px 0;">
      <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="newHarbor" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="updateHarbor" :disabled="this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="deleteHarborAtHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
      </el-button-group>
    </el-col>
    <form-box  title="查询">
      <el-form inline ref="form" :model="form" label-width="140px">
        <el-form-item label="港口(运柜宝)名称 ">
          <el-input v-model="form.harborName" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="港口(安通)编码 ">
          <el-input v-model="form.contrastcode" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="港口(安通)名称 ">
          <el-input v-model="form.contrastname" class="control-width"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </form-box>
    <el-table ref="table"
      :data="harborAtList.data"
       @selection-change="handleSelectionChange" @row-click="handleRowClick">
      <el-table-column type="selection" width="40" >
      </el-table-column>

      <el-table-column
        prop="harborName"
        label="港口名称"
        >
      </el-table-column>
      <el-table-column
        prop="contrastcode"
        label="港口(安通)代码"
        >
      </el-table-column>

      <el-table-column
        prop="contrastname"
        label="港口(安通)名称"
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
    <HarborAtSave ref="HarborAtSave"></HarborAtSave>
    <HarborAtUpdate ref="HarborAtUpdate"></HarborAtUpdate>

  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import HarborAtSave  from './HarborAtSave.vue'
  import HarborAtUpdate from './HarborAtUpdate.vue'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{HarborAtSave,HarborAtUpdate},
    data() {
      return {
        newHarbordialogVisible:false,
        updateHarbordialogVisible:false,
        selectData:[],
        form: {
          harborName: '',
          isUnable: '',
          orgName:""
        }

      }
    },
    computed:{
      ...mapGetters([
        'harborAtList',
      ])
    },

    methods: {
      ...mapActions([
        'getHarborAtList','deleteHarborAt','RegionBelongPList','HarborBelongOrgList'
      ]),
      handleSelectionChange(val){
        this.selectData =  val;
        console.log(val)
      },
      getList(){
        this.pageHandler(this.form,this.getHarborAtList)
      },
      newHarbor(){
        this.$refs.HarborAtSave.newHarbordialogVisible = true;
      },
      Isnull(data){
        if(null==data || undefined==data || ""==data) {
          return true
        }
        else return false
      },
      updateHarbor(){

        if(this.selectData.length == 1){

          this.$refs.HarborAtUpdate.newHarbordialogVisible = true;
          this.$refs.HarborAtUpdate.form.id = this.selectData[0].id;
          this.$refs.HarborAtUpdate.form.harborId = this.selectData[0].harborId + "";
          this.$refs.HarborAtUpdate.form.contrastcode = this.selectData[0].contrastcode;
          this.$refs.HarborAtUpdate.form.contrastname = this.selectData[0].contrastname;
          console.log(this.selectData[0]);
          console.log(this.$refs.HarborAtUpdate);
          this.newHarbordialogVisible = true;

        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteHarborAtHandle(){
        if(this.selectData.length >= 1){
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个港口, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.id).join("&");
              this.deleteHarborAt(ids).then(res =>{
                if(res.success){
                  this.$refs['form'].resetFields()
                  this.getHarborAtList()
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
          harborName: '',  // 港口(运柜宝)名称
          contrastcode: '', // 港口(安通)编码
          contrastname: ''  //港口(安通)名称
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

    }
  }
</script>
