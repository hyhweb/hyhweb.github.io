<!-- 船公司管理 列表 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="newShipcompany" :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="updateShipcompany" :disabled="this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="deleteShipcompanyHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
       </el-button-group>
      </el-col>
      <form-box  title="查询">
        <el-form :inline="true" ref="form" :model="form" label-width="100px">
          <el-form-item label="船公司名称 ">
            <el-input v-model="form.shipCompanyName" class="control-width"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.contacts" class="control-width"></el-input>
          </el-form-item>
          <el-form-item label="联系电话 ">
            <el-input v-model="form.contactInfo" class="control-width"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
         </el-form-item>
        </el-form>
        </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table"
          :data="shipcompanyList.data"
          :max-height="tableMaxHeight"
           @selection-change="handleSelectionChange"
          @row-click="handleRowClick">
          <el-table-column type="selection" width="50" >
          </el-table-column>
          <el-table-column
            prop="shipCompanyName"
            label="船公司名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="simpleName"
            label="船公司简称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="contacts"
            label="联系人"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contactInfo"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="shipCompanyCode"
            label="船公司代码"
            width="150">
          </el-table-column>
          <el-table-column
            prop="disabled"
            label="是否禁用">
            <template scope="scope">
                <span v-show="scope.row.disabled">是</span>
                <span v-show="!scope.row.disabled">否</span>
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

<ShipcompanySave ref="shipcompanysave"></ShipcompanySave>
<ShipcompanyUpdata ref="shipcompanyupdata"></ShipcompanyUpdata>

  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import ShipcompanySave  from './ShipcompanySave.vue'
  import ShipcompanyUpdata  from './ShipcompanyUpdata.vue'

  export default {
    mixins:[pagination],
    components:{ShipcompanySave,ShipcompanyUpdata},
    data() {
      return {
        newShipcompanydialogVisible:false,
        selectData:[],
        form: {
          shipCompanyName: '',
          contacts:'',
          contactInfo:'',

        }

      }
    },
    computed:{
      ...mapGetters([
        'shipcompanyList'
        ])
    },

    methods: {
      ...mapActions([
        'getShipcompanyList','deleteShipcompany'
        ]),
      handleSelectionChange(val){
        this.selectData =  val;
          console.log(val)
      },
     getList(){
        this.pageHandler(this.form,this.getShipcompanyList)
      },
      newShipcompany(){
        this.$refs.shipcompanysave.newShipcompanydialogVisible = true;
      },
      updateShipcompany(){
        if(this.selectData.length == 1){
           this.$refs.shipcompanyupdata.newShipcompanydialogVisible = true;
           this.$refs.shipcompanyupdata.detail = this.selectData[0]
           this.getShipcompanyList()
           console.log(this.selectData[0])
           this.updateShipcompanydialogVisible = true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteShipcompanyHandle(){
       if(this.selectData.length >= 1){
        this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.shipCompanyId).join("&");
              this.deleteShipcompany(ids).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.getShipcompanyList()
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

         // console.log(11)
         /*if(this.selectData.length >= 1){
          // console.log(JSON.stringify(this.selectData));
          var ids = this.selectData.map(item => "ids="+item.shipCompanyId).join("&");
           console.log("ids=============>"+ids)
           // console.log(11)
           this.deleteShipcompany(ids).then((res)=>{
              if(res.success){
               this.getShipcompanyList()
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
          this.$confirm('请选择一条或多条数据操作')
        }
      },     */
      onSubmit() {
          this.pageNo=1
        console.log('submit!');
         this.getList();
       }
    },
    created(){

     // this.$store.dispatch('getRegionList')
     this.getList();
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
