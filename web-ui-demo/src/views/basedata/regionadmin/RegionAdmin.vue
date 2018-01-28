<!-- 地区管理 列表 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" @click="newRegion"  :disabled="this.$global.isDisabled(2)">新增</el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateRegion" :disabled="this.$global.isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteRegionHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
        </el-button-group>
      </el-col>
      <form-box  title="查询">
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="地区名称 ">
            <el-input v-model="form.regionName" class="control-width"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table"
              :data="regionList.data"
              :max-height="tableMaxHeight"
              @selection-change="handleSelectionChange"
              @row-click="handleRowClick">
      <el-table-column type="selection" width="50" >
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="地区名称"
        width="180">
        <template scope="scope">
          <a @click="getChild(scope.row)" class="c2">{{scope.row.regionName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="regionCode"
        label="地区代码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="地区全称">
      </el-table-column>
      <el-table-column
        prop="regionQrycode"
        label="地区全拼"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parentName"
        label="上级地区">
        <template scope="scope">
          <a @click="getParent(scope.row)" class="c2">{{scope.row.parentName}}</a>
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
    
    <RegionSave v-on:clearSelectRegion="clearSelectRegion" ref="regionsave"></RegionSave>

    <RegionUpdata v-on:clearSelectRegion="clearSelectRegion" ref="updateregion" ></RegionUpdata>
  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import RegionSave  from './RegionSave.vue'
  import RegionUpdata  from './RegionUpdata.vue'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{RegionSave,RegionUpdata},
    data() {
      return {
        newRegiondialogVisible:false,
        updateRegiondialogVisible:false,
        regionSelectData:[],
        regionSelectName:[],
        selectData:[],
        form: {
          regionName: '',
          parentId:''
        }

      }
    },
    computed:{
      ...mapGetters([
        'regionList','regionBelongPList','regionBelongCList'
      ])
    },

    methods: {
      ...mapActions([
        'RegionBelongPList','deleteRegion','getRegionList','getParentId','RegionBelongCList'
      ]),
      handleSelectionChange(val){
        this.selectData =  val;
        console.log(val)
      },
      clearSelectRegion(){
        this.regionSelectData=[]

      },
      getList(){

        this.pageHandler(this.form,this.getRegionList)
      },
      getChild(row){
        this.pageNo=1
        if (row.isEnd==false){
          Object.assign(this.form,{parentId:row.regionId});
          Object.assign(this.form,{regionName:""});
          this.regionSelectData.push(row.regionId)
          this.regionSelectName.push(row.regionName)
          console.log(this.regionSelectData)
          this.pageHandler(this.form,this.getRegionList)
        }else{this.$message({
          message:'无下级地区',
        })
        }
      },
      getParent(row){
        this.regionSelectData.pop(row.regionId)
        this.regionSelectName.pop(row.regionName)
        console.log(this.regionSelectData)
        this.pageNo=1
        let getParentParam=this.getParentId({id:row.parentId})
        getParentParam.then((res)=>{
          console.log(res)
          Object.assign(this.form,{parentId:res.data[0].parentId});
          Object.assign(this.form,{regionName:""});
          this.pageHandler(this.form,this.getRegionList)
        })

      },

      newRegion(){
      	console.log('nweRegion, selectData.length: '+ this.regionSelectData.length);
        this.$refs.regionsave.newRegiondialogVisible = true;
        if(undefined !=  this.regionSelectData && this.regionSelectData.length >0){
          if(this.regionSelectData.length==1){
            this.$refs.regionsave.form.selectedRegion=this.regionSelectData[0];
            this.$refs.regionsave.form.selectPrivate=true
            this.$refs.regionsave.form.fullName=this.regionSelectName[0]
          }
          else if(this.regionSelectData.length==2){
            console.log(this.regionSelectData)
            this.$refs.regionsave.form.selectedRegion=this.regionSelectData[0];
            this.$refs.regionsave.form.selectedRegionSecond=this.regionSelectData[1]
            console.log(this.regionSelectData[1])
            let param = {id:this.regionSelectData[0]}
            this.RegionBelongCList(param).then((res)=>{
              console.log(res.data)
              this.$refs.regionsave.regionBelongCityData=res.data
            })
            this.$refs.regionsave.second=true;
            this.$refs.regionsave.form.selectPrivate=true
            this.$refs.regionsave.form.selectCity=true
            this.$refs.regionsave.form.fullName=this.regionSelectName[0]+this.regionSelectName[1]
          }
          else if(this.regionSelectData.length==3){
            this.$refs.regionsave.form.selectedRegion=this.regionSelectData[0];
            this.$refs.regionsave.form.selectedRegionSecond=this.regionSelectData[1];
            this.$refs.regionsave.form.selectedRegionThird=this.regionSelectData[2];
            let param = {id:this.regionSelectData[0]}
            this.RegionBelongCList(param).then((res)=>{
              console.log(res.data)
              this.$refs.regionsave.regionBelongCityData=res.data
            })
            let paramsecond = {id:this.regionSelectData[1]}
            this.RegionBelongCList(paramsecond).then((res)=>{
              console.log(res.data)
              this.$refs.regionsave.regionBelongDistrictData=res.data
            })
            this.$refs.regionsave.second=true;
            this.$refs.regionsave.third=true;
            this.$refs.regionsave.form.selectPrivate=true
            this.$refs.regionsave.form.selectCity=true
            this.$refs.regionsave.form.selectDistrict=true
            this.$refs.regionsave.form.fullName=this.regionSelectName[0]+this.regionSelectName[1]+this.regionSelectName[2]
          }
        }
        // this.RegionBelongPList();
        //this.RegionBelongCList();
      },
      updateRegion(){
        if(this.selectData.length == 1){
          this.$refs.updateregion.getRegions({id:this.selectData[0].regionCode}).then((res)=> {
            console.log(res)
            console.log(this.selectData)
            console.log(this.selectData[0])
            this.$refs.updateregion.newRegiondialogVisible = true;
            this.$refs.updateregion.detail = this.selectData[0]
            if(this.selectData[0].level==1){
              this.$refs.updateregion.form.selectedRegion = ""

            }else if(this.selectData[0].level==2){
              this.$refs.updateregion.regionBelongPList.data = res.data.aPrivate
              this.$refs.updateregion.form.selectedRegion = res.data.aPrivateId + ""
              this.$refs.updateregion.regionBelongCityData = res.data.shi
              this.$refs.updateregion.regionBelongDistrictData = ""
              this.$refs.updateregion.form.selectedRegionThird = ""
              this.$refs.updateregion.form.selectedRegionSecond = ""
              this.$refs.updateregion.form.regionName1=res.data.shengName
              this.$refs.updateregion.form.regionName2=""
              this.$refs.updateregion.form.regionName3=""
            }else if(this.selectData[0].level==3){
              this.$refs.updateregion.regionBelongPList.data = res.data.aPrivate
              this.$refs.updateregion.regionBelongCityData = res.data.shi
              this.$refs.updateregion.form.selectedRegion = res.data.aPrivateId + ""
              this.$refs.updateregion.form.selectedRegionSecond = res.data.shiId + ""
              this.$refs.updateregion.regionBelongDistrictData = ""
              this.$refs.updateregion.form.selectedRegionThird = ""
              this.$refs.updateregion.second = true
              this.$refs.updateregion.form.regionName1=res.data.shengName
              this.$refs.updateregion.form.regionName2=res.data.shiName
              this.$refs.updateregion.form.regionName3=""
            }else if(this.selectData[0].level==4){
              this.$refs.updateregion.regionBelongPList.data = res.data.aPrivate
              this.$refs.updateregion.regionBelongCityData = res.data.shi
              this.$refs.updateregion.regionBelongDistrictData = res.data.qu
              this.$refs.updateregion.form.selectedRegion = res.data.aPrivateId + ""
              this.$refs.updateregion.form.selectedRegionSecond = res.data.shiId + ""
              this.$refs.updateregion.form.selectedRegionThird = res.data.quId + ""
              this.$refs.updateregion.second = true
              this.$refs.updateregion.third = true
              this.$refs.updateregion.form.regionName1=res.data.shengName
              this.$refs.updateregion.form.regionName2=res.data.shiName
              this.$refs.updateregion.form.regionName3=res.data.quName
            }
          })
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteRegionHandle(){
        console.log(11)
        if(this.selectData.length == 1){
          this.$confirm('此操作将永久删除这条记录是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData[0])
              this.deleteRegion({id:this.selectData[0].regionId}).then((res)=>{
                if(res.success){
                  this.getRegionList()
                  this.$message({
                    message:'删除成功',
                    type:'success'
                  })
                }else{
                  let message=res.message
                  this.$message({
                    message:message
                  })
                }

              })
            })
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      onSubmit() {
        this.regionSelectData=[]
        if(this.form.regionName=="")
        {this.form.parentId="0"

        }else{
          this.form.parentId=""
        }

        console.log('submit!');
        this.pageNo=1
        this.getList()
      }
    },
    created(){
      this.regionSelectData=[]
      Object.assign(this.form,{parentId:0});
      //this.$store.dispatch('getRegionList')
      this.getList();
    },
    mounted(){

    }
  }
</script>
