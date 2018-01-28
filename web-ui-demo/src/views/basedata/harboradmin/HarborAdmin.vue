<!-- 港口管理 列表 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" @click="newHarbor" :disabled="this.$global.isDisabled(2)">新增</el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateHarbor" :disabled="this.$global.isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteHarborHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
        </el-button-group>
      </el-col>
      <form-box  title="查询">
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="港口名称 ">
            <el-input v-model="form.harborName" class="control-width"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table"
      :data="harborList.data"
      :max-height="tableMaxHeight"
       @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" width="40" >
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="所属部门"
        width="280">
      <el-table-column
        prop="harborName"
        label="港口名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="harborCode"
        label="港口代码"
        width="130">
      </el-table-column>
      <el-table-column
        prop="regionName"
        label="地区"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="280">
      </el-table-column>
      <el-table-column
        prop="longtitude"
        label="经度"
        width="80">
      </el-table-column>
      <el-table-column
        prop="latitude"
        label="纬度"
        width="80">
      </el-table-column>
      <el-table-column
        prop="contacts"
        label="联系人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="secRegion"
        label="城市"
        width="180">
      </el-table-column>

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

    <HarborSave ref="harborsave"></HarborSave>
    <HarborUpdate ref="harborupdate"></HarborUpdate>

  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import HarborSave  from './HarborSave.vue'
  import HarborUpdate from './HarborUpdate.vue'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{HarborSave,HarborUpdate},
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
        'harborList',
      ])
    },

    methods: {
      ...mapActions([
        'getHarborList','deleteHarbor','RegionBelongPList','HarborBelongOrgList'
      ]),
      handleSelectionChange(val){
        this.selectData =  val;
        console.log(val)
      },
      getList(){
        this.pageHandler(this.form,this.getHarborList)
      },
      newHarbor(){
        this.$refs.harborsave.newHarbordialogVisible = true;
      },
      Isnull(data){
        if(null==data || undefined==data || ""==data) {
          return true
        }
        else return false
      },
      updateHarbor(){

        if(this.selectData.length == 1){


          this.$refs.harborupdate.getRegions({id:this.selectData[0].regionCode}).then((res)=>{
            this.$refs.harborupdate.newHarbordialogVisible = true;
            this.$refs.harborupdate.regionCode = this.selectData[0].regionCode;
            this.$refs.harborupdate.detail = this.selectData[0]
            this.$refs.harborupdate.regionBelongPList.data = res.data.aPrivate
            this.$refs.harborupdate.regionBelongCityData = res.data.shi
            this.$refs.harborupdate.form.selectedRegion=res.data.aPrivateId+""
            this.$refs.harborupdate.form.selectedRegionSecond=res.data.shiId+""
            if(this.Isnull(res.data.quId)&&this.Isnull(res.data.qu)){
              this.$refs.harborupdate.form.selectedRegionThird=""
              this.$refs.harborupdate.regionBelongDistrictData =""
              this.$refs.harborupdate.form.regionName=res.data.shengName+res.data.shiName
              this.$refs.harborupdate.form.regionName1 =res.data.shengName
              this.$refs.harborupdate.form.regionName2 =this.selectData[0].secRegion
              this.$refs.harborupdate.form.regionName3 =""
            }else{
              this.$refs.harborupdate.form.selectedRegionThird=res.data.quId+""
              this.$refs.harborupdate.regionBelongDistrictData = res.data.qu
              this.$refs.harborupdate.form.regionName=res.data.shengName+res.data.shiName+res.data.quName
              this.$refs.harborupdate.form.regionName1 =res.data.shengName
              this.$refs.harborupdate.form.regionName2 =this.selectData[0].secRegion
              this.$refs.harborupdate.form.regionName3 =res.data.quName
            }


          })
          console.log(this.selectData[0])

        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteHarborHandle(){
        if(this.selectData.length >= 1){
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.harborId).join("&");
              this.deleteHarbor(ids).then(res =>{
                if(res.success){
                  this.$refs['form'].resetFields()
                  this.getHarborList()
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

    }
  }
</script>
