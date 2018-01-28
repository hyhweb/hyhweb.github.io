<!-- 地区管理 列表 -->
<template>
  <section>
    <el-col style="padding:10px 0;">
      <el-button-group>
        <el-button type="primary" icon="plus" size="small" @click="newRegion"  :disabled="this.$global.isDisabled(2)">新增</el-button>
        <el-button type="primary" icon="edit" size="small" @click="RegionFyUpdate" :disabled="this.$global.isDisabled(7)">修改</el-button>
        <el-button type="primary" icon="delete" size="small" @click.prevent="deleteRegionFyHandle" :disabled="this.$global.isDisabled(9)">删除</el-button>
      </el-button-group>
    </el-col>
    <form-box  title="查询">
      <el-form inline ref="form" :model="form" label-width="140px">
        <el-form-item label="地区(运柜宝)名称 ">
          <el-input v-model="form.regionName" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="地区(运柜宝)编码 ">
          <el-input v-model="form.regionCode" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="地区(泛亚)编码 ">
          <el-input v-model="form.contrastcode" class="control-width"></el-input>
        </el-form-item>

        <el-form-item label="地区(泛亚)名称 ">
          <el-input v-model="form.contrastname" class="control-width"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </form-box>
    <el-table ref="table"
      :data="regionFyList.data"
      style="width: 100%" @selection-change="handleSelectionChange" @row-click="handleRowClick">
      <el-table-column type="selection" width="50" >
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="地区(运柜宝)名称"
        >
        <template scope="scope">
          <a @click="getChild(scope.row)" class="c2">{{scope.row.regionName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="regionCode"
        label="地区(运柜宝)代码"
        >
      </el-table-column>

      <el-table-column
        prop="parentName"
        label="上级地区">
        <template scope="scope">
          <a @click="getParent(scope.row)" class="c2">{{scope.row.parentName}}</a>
        </template>
      </el-table-column>


      <el-table-column
        prop="contrastname"
        label="地区(泛亚)名称"
        >
      </el-table-column>

      <el-table-column
        prop="contrastcode"
        label="地区(泛亚)代码"
        >
      </el-table-column>


    </el-table>

    <el-table-column
      prop="level"
      label="地区级别"
      >
    </el-table-column>

    <el-table-column
      prop="contrastname"
      label="地区(泛亚)名称"
      >
    </el-table-column>
    <el-table-column
      prop="contrastcode"
      label="地区(泛亚)代码"
      >
    </el-table-column>

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

    <RegionFySave ref="RegionFySave" v-on:closeSave="getList"></RegionFySave>

    <RegionFyUpdate ref="RegionFyUpdate" v-on:closeUpdate="getList"></RegionFyUpdate>
  </section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import RegionFySave  from './RegionFySave.vue'
  import RegionFyUpdate  from './RegionFyUpdate.vue'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{RegionFySave,RegionFyUpdate},
    data() {
      return {
        newRegiondialogVisible:false,
        RegionFyUpdatedialogVisible:false,
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
        'regionFyList','regionBelongPList','regionBelongCList'
      ])
    },

    methods: {
      ...mapActions([
        'RegionBelongPList','deleteRegionFy','getRegionFyList','getParentId','RegionBelongCList'
      ]),
      handleSelectionChange(val){
        this.selectData =  val;
        console.log(val)
      },
      getList(){
        this.pageHandler(this.form,this.getRegionFyList);
      },
      getChild(row){
        this.pageNo=1;
        console.log(row);
        if (row.isEnd==false){
          Object.assign(this.form,{parentId:row.regionId});
          Object.assign(this.form,{regionName:""});
          this.regionSelectData.push(row.regionId)
          this.regionSelectName.push(row.regionName)
          console.log(this.regionSelectData)
          this.pageHandler(this.form,this.getRegionFyList);
        }else{
          this.$message({
            message:'无下级地区',
          });
        }
      },
      getParent(row){
        this.regionSelectData.pop(row.regionId);
        this.regionSelectName.pop(row.regionName);
        console.log(this.regionSelectData);
        this.pageNo=1
        let getParentParam=this.getParentId({id:row.parentId});
        getParentParam.then((res)=>{
          console.log(res)
          Object.assign(this.form,{parentId:res.data[0].parentId});
          Object.assign(this.form,{regionName:""});
          this.pageHandler(this.form,this.getRegionFyList)
        });

      },

      newRegion(){
        this.$refs.RegionFySave.newRegiondialogVisible = true;
      },
      RegionFyUpdate(){
        if(this.selectData.length == 1){
          this.$refs.RegionFyUpdate.newRegiondialogVisible = true;
          this.$refs.RegionFyUpdate.form.id = this.selectData[0].id;
          this.$refs.RegionFyUpdate.form.regionCode = this.selectData[0].regionCode;
          this.$refs.RegionFyUpdate.form.contrastcode = this.selectData[0].contrastcode;
          this.$refs.RegionFyUpdate.form.contrastname = this.selectData[0].contrastname;

          this.$refs.RegionFyUpdate.getRegionRecursiveByRegionId({id:this.selectData[0].regionId}).then((res)=> {
            this.$refs.RegionFyUpdate.newRegiondialogVisible = true;
            this.$refs.RegionFyUpdate.detail = this.selectData[0]
            if(this.selectData[0].level==1){
              this.$refs.RegionFyUpdate.regionBelongPList.data = res.data.levelRegionList[0];
              this.$refs.RegionFyUpdate.form.selectedRegion = res.data.regionList[0].regionId + "";
            }else if(this.selectData[0].level==2){
              this.$refs.RegionFyUpdate.regionBelongPList.data = res.data.levelRegionList[1];
              this.$refs.RegionFyUpdate.form.selectedRegion = res.data.regionList[1].regionId + "";

              this.$refs.RegionFyUpdate.form.selectedRegionSecond = res.data.regionList[0].regionId + "";
              this.$refs.RegionFyUpdate.regionBelongCityData = res.data.levelRegionList[0];
              this.$refs.RegionFyUpdate.second =true;


            }else if(this.selectData[0].level==3){
              this.$refs.RegionFyUpdate.regionBelongPList.data = res.data.levelRegionList[2];
              this.$refs.RegionFyUpdate.form.selectedRegion = res.data.regionList[2].regionId + "";

              this.$refs.RegionFyUpdate.form.selectedRegionSecond = res.data.regionList[1].regionId + "";
              this.$refs.RegionFyUpdate.regionBelongCityData = res.data.levelRegionList[1];
              this.$refs.RegionFyUpdate.second =true;

              this.$refs.RegionFyUpdate.form.selectedRegionThird = res.data.regionList[0].regionId + "";
              this.$refs.RegionFyUpdate.regionBelongDistrictData = res.data.levelRegionList[0];
              this.$refs.RegionFyUpdate.third =true;
            }else if(this.selectData[0].level==4){
              this.$refs.RegionFyUpdate.regionBelongPList.data = res.data.levelRegionList[3];
              this.$refs.RegionFyUpdate.form.selectedRegion = res.data.regionList[3].regionId + "";

              this.$refs.RegionFyUpdate.form.selectedRegionSecond = res.data.regionList[2].regionId + "";
              this.$refs.RegionFyUpdate.regionBelongCityData = res.data.levelRegionList[2];
              this.$refs.RegionFyUpdate.second =true;

              this.$refs.RegionFyUpdate.form.selectedRegionThird = res.data.regionList[1].regionId + "";
              this.$refs.RegionFyUpdate.regionBelongDistrictData = res.data.levelRegionList[1];
              this.$refs.RegionFyUpdate.third =true;

              this.$refs.RegionFyUpdate.form.selectedRegionFour = res.data.regionList[0].regionId + "";
              this.$refs.RegionFyUpdate.regionBelongTownData = res.data.levelRegionList[0];
              this.$refs.RegionFyUpdate.four =true;
            }
          });
          this.$refs.RegionFyUpdate.form.contrastcode = this.selectData[0].contrastcode;
          this.$refs.RegionFyUpdate.form.contrastname = this.selectData[0].contrastname;
          this.newDockdialogVisible = true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteRegionFyHandle(){
        if(this.selectData.length == 1){
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个地区, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.id).join("&");
              this.deleteRegionFy(ids).then((res)=>{
                if(res.success){
                  Object.assign(this.form,{parentId:0});
                  this.getList();
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

      resetForm() {
        this.form = {
          regionName: '',  // 地区(运柜宝)名称
          regionCode: '', // 地区(运柜宝)编码
          contrastcode: '', // 地区(泛亚)编码
          contrastname: ''  //地区(泛亚)名称
        };
      },

      onSubmit() {
        if(this.form.regionName=="")
        {this.form.parentId="0"

        }else{
          this.form.parentId=""
        }

        this.pageNo=1
        this.getList();
      }
    },
    created(){
      Object.assign(this.form,{parentId:0});
      this.getList();
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
