<!-- 码头管理 列表 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="newDock" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="updateDock" :disabled="this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="deleteDockHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
      </el-button-group>
      </el-col>
      <form-box  title="查询">
        <el-form :inline="true" ref="form" :model="form" label-width="180px">
          <el-form-item label="码头名称 ">
            <el-input v-model="form.name" class="control-width"></el-input>
          </el-form-item>
          <el-form-item label="所属港口" prop="harborId">
                <el-select v-model="form.harborId"  filterable clearable placeholder="请选择所属港口" >
                    <el-option v-for="item in harborBelongList"
                               :label="item.harborName"
                               :value="item.harborId"
                               :key="item.harborId">
                    </el-option>
                </el-select>
            </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
         </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table"
      :data="dockList.data"
      :max-height="tableMaxHeight"
       @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" width="40" >
      </el-table-column>
      <el-table-column
        prop="name"
        label="码头名称"
        width="190">
      </el-table-column>
      <el-table-column
        prop="thirdPartCompany"
        label="码头公司"
        width="180">
      </el-table-column>
      <el-table-column
        prop="harborName"
        label="港口名称"
        width="180">
      </el-table-column>
          <el-table-column
                  prop="dockType"
                  label="码头类型">
              <template scope="scope">
                  <span v-show="scope.row.dockType==1">驳船码头</span>
                  <span v-show="scope.row.dockType==2">大船码头</span>
              </template>
          </el-table-column>
      <el-table-column
        prop="regionName"
        label="地区">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="contacts"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式">
      </el-table-column>

      <el-table-column
        prop="isElecgate"
        label="是否电子入闸">
        <template scope="scope">
            <span v-show="scope.row.isElecgate">是</span>
            <span v-show="!scope.row.isElecgate">否</span>
        </template>
      </el-table-column>
       <el-table-column
        prop="thirdPartCode"
        label="第三方码头系统代码"
        width="180">
      </el-table-column>
       <el-table-column
        prop="isUnable"
        label="是否禁用">
        <template scope="scope">
            <span v-show="scope.row.isUnable">是</span>
            <span v-show="!scope.row.isUnable">否</span>
        </template>
      </el-table-column>
    </el-table>
    </TableBox>

    <PaginationBox>
      <el-col style="text-align:center;">
          <el-pagination layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageNo"
          :page-size="pageSize"
          :total="pageCount"
          :page-sizes="pagesizes">
          </el-pagination>
      </el-col>
    </PaginationBox>

<DockSave ref="Docksave"></DockSave>
<Dockupdate ref="Dockupdate"></Dockupdate>

  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import DockSave  from './DockSave.vue'
  import Dockupdate from './DockUpdate.vue'
   import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{DockSave,Dockupdate},
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
        'dockList','harborBelongList'
        ])
    },

    methods: {
      ...mapActions([
        'getDockList','deleteDock','HarborBelongList','RegionBelongPList','HarborBelongList'
        ]),
      handleSelectionChange(val){
        this.selectData =  val;
          console.log(val)
      },
     getList(){
        this.pageHandler(this.form,this.getDockList)
      },
      newDock(){
        this.$refs.Docksave.newDockdialogVisible = true;
      },
      updateDock(){
          if(this.selectData.length == 1){


              this.$refs.Dockupdate.getRegions({id:this.selectData[0].regionCode}).then((res)=>{
                  console.log(res)
              this.$refs.Dockupdate.newDockdialogVisible = true;
              this.$refs.Dockupdate.regionCode = this.selectData[0].regionCode;
              this.$refs.Dockupdate.detail = this.selectData[0]
              this.$refs.Dockupdate.form.selectedRegion=res.data.aPrivateId+""
              this.$refs.Dockupdate.form.selectedRegionSecond=res.data.shiId+""
              this.$refs.Dockupdate.form.selectedRegionThird=res.data.quId+""
              this.$refs.Dockupdate.form.regionName1=res.data.shengName+res.data.shiName+res.data.quName

              this.$refs.Dockupdate.regionBelongPList.data = res.data.aPrivate
              this.$refs.Dockupdate.regionBelongCityData = res.data.shi
              this.$refs.Dockupdate.regionBelongDistrictData = res.data.qu
              console.log(this.selectData[0])

              this.$refs.Dockupdate.form.harborId =this.selectData[0].harborId+""


          })
              this.newDockdialogVisible = true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteDockHandle(){
        if(this.selectData.length >= 1){
        this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.dockId).join("&");
              this.deleteDock(ids).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.getDockList()
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
