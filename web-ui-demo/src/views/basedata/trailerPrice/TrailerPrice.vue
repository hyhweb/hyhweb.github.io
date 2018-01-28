<!-- 拖车报价管理 列表 -->
<template>
  <section class="tuo_che_bao_jia_guang_li">
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" @click="newTrailerprice"  :disabled="isDisabled(2)">新增</el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateTrailerprice" :disabled="isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteTrailerpriceHandle" :disabled="isDisabled(9)">删除
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="queryTrailerPriceLog" :disabled="this.$global.isDisabled(62)">查看日志
          </el-button>
        </el-button-group>
      </el-col>
      <form-box title="查询">
        <el-form class="query-modal1" :inline="true" ref="form" :model="form" label-width="85px">
          <div class="query-params1">
            <el-form-item label="地区" prop="regionOne">
              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionOne" placeholder="请选择" @change="changeRegionOne">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in regionBelongPList.data"
                          :label="item.regionName+'('+(item.regionQrycode)+')'"
                          :value="item.regionCode "
                          :key="item.regionCode">
                </el-option>
              </el-select>

              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionTow" placeholder="请选择" @change="changeRegionTow">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in regionBelongCityData"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                </el-option>
              </el-select>

              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionThird" placeholder="请选择" @change="changeRegionThird">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in  regionBelongDistrictData "
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                </el-option>
              </el-select>

              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionFourth" placeholder="请选择" @change="changeRegionFourth">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in regionBelongStreetData"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="港口" prop="harborId">
              <el-select  clearable filterable default-first-option v-model="form.harborId" placeholder="请选择港口" class='control-width'>
                <el-option value="">请选择</el-option>
                <el-option v-for="item in harborBelongListByOrgCode"
                          :label="item.harborName+'('+(item.harborCode)+')'"
                          :value="item.harborId"
                          :key="item.harborId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="操作人" prop="operUserId">
              <el-select  clearable filterable default-first-option v-model="form.operUserId" placeholder="请选择操作人" class='control-width'>
                <el-option value="">请选择</el-option>
                <el-option v-for="item in userInfoList"
                          :label="item.text"
                          :key="item.value"
                          :value="item.value"/>
              </el-select>
            </el-form-item>

            <el-form-item label="更新日期" prop="updateDate">
              <el-date-picker type="datetime" placeholder="更新日期" v-model="form.updateDateStart" style="width:150px"/>
              至
              <el-date-picker type="datetime" placeholder="更新日期" v-model="form.updateDateEnd" style="width:150px"/>
            </el-form-item>
            <br/>
          </div>

          <div class="query-btns1">
            <el-form-item >
              <el-button type="primary" @click="onSubmit" :disabled="isDisabled(1)">查询</el-button>
            </el-form-item>
            <el-form-item >
              <el-button  @click="resetForm" :disabled="isDisabled(1)">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-col>
        <el-table ref="table"
          highlight-current-row
          border
          :max-height="tableMaxHeight"
          :data="trailerpriceList.data"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick">
          <el-table-column type="selection" fixed>
          </el-table-column>
          <el-table-column
            prop="harborName"
            label="港口">
          </el-table-column>
          <el-table-column
            prop="regionName"
            label="地区">
          </el-table-column>

          <el-table-column class-name="cell-group"
            label="类型" width="100">
            <template scope="scope">
              <div class="fullwith">
                <div class="content-rowspan">
                  <div>装</div>
                  <div>送</div>
                </div>
              </div>
            </template>
          </el-table-column>


          <el-table-column class-name="cell-group"
            prop="regionName" label-class-name="line-wrap"
            label="20GP报价" width="60">
            <template scope="scope">
              <div class="content-rowspan">
                <div v-if="scope.row.tqdVoList[0]._20GP!='0'">{{scope.row.tqdVoList[0]._20GP}}</div>
                <div v-if="scope.row.tqdVoList[0]._20GP=='0'">&nbsp</div>
                <div v-if="scope.row.tqdVoList[1]._20GP!='0'">{{scope.row.tqdVoList[1]._20GP}}</div>
                <div v-if="scope.row.tqdVoList[1]._20GP=='0'">&nbsp</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column class-name="cell-group"
            prop="regionName"
            label="2*20GP报价" width="55">
            <template scope="scope">
              <div class="content-rowspan">
                <div v-if="scope.row.tqdVoList[0]._2x20GP!='0'">{{scope.row.tqdVoList[0]._2x20GP}}</div>
                <div v-if="scope.row.tqdVoList[0]._2x20GP=='0'">&nbsp</div>
                <div v-if="scope.row.tqdVoList[1]._2x20GP!='0'">{{scope.row.tqdVoList[1]._2x20GP}}</div>
                <div v-if="scope.row.tqdVoList[1]._2x20GP=='0'">&nbsp</div>
              </div>
            </template>
          </el-table-column>


          <el-table-column class-name="cell-group"
            prop="regionName" label-class-name="line-wrap"
            label="40GP报价" width="60">
            <template scope="scope">
              <div class="content-rowspan">
                <div v-if="scope.row.tqdVoList[0]._40GP!='0'">{{scope.row.tqdVoList[0]._40GP}}</div>
                <div v-if="scope.row.tqdVoList[0]._40GP=='0'">&nbsp</div>
                <div v-if="scope.row.tqdVoList[1]._40GP!='0'">{{scope.row.tqdVoList[1]._40GP}}</div>
                <div v-if="scope.row.tqdVoList[1]._40GP=='0'">&nbsp</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column class-name="cell-group"
            prop="regionName" label-class-name="line-wrap"
            label="40HQ报价" width="60">
            <template scope="scope">
              <div class="content-rowspan">
                <div v-if="scope.row.tqdVoList[0]._40HQ!='0'">{{scope.row.tqdVoList[0]._40HQ}}</div>
                <div v-if="scope.row.tqdVoList[0]._40HQ=='0'">&nbsp</div>
                <div v-if="scope.row.tqdVoList[1]._40HQ!='0'">{{scope.row.tqdVoList[1]._40HQ}}</div>
                <div v-if="scope.row.tqdVoList[1]._40HQ=='0'">&nbsp</div>
              </div>
            </template>
          </el-table-column>


          <el-table-column class-name="cell-group"
            prop="regionName" label-class-name="line-wrap"
            label="20HQ报价" width="60">
            <template scope="scope">
              <div class="content-rowspan">
                  <div v-if="scope.row.tqdVoList[0]._20HQ!='0'">{{scope.row.tqdVoList[0]._20HQ}}</div>
                  <div v-if="scope.row.tqdVoList[0]._20HQ=='0'">&nbsp</div>
                  <div v-if="scope.row.tqdVoList[1]._20HQ!='0'">{{scope.row.tqdVoList[1]._20HQ}}</div>
                  <div v-if="scope.row.tqdVoList[1]._20HQ=='0'">&nbsp</div>
                </div>

        </template>
          </el-table-column>


          <el-table-column class-name="cell-group"
            prop="regionName"
            label="2*20HQ报价" width="60">
            <template scope="scope">
              <div class="content-rowspan">
                <div v-if="scope.row.tqdVoList[0]._2x20HQ!='0'">{{scope.row.tqdVoList[0]._2x20HQ}}</div>
                <div v-if="scope.row.tqdVoList[0]._2x20HQ=='0'">&nbsp</div>
                <div v-if="scope.row.tqdVoList[1]._2x20HQ!='0'">{{scope.row.tqdVoList[1]._2x20HQ}}</div>
                <div v-if="scope.row.tqdVoList[1]._2x20HQ=='0'">&nbsp</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="validityStartDate" label="生效日期"/>

          <el-table-column prop="validityEndDate" label="失效日期"/>

          <el-table-column prop="remark" label="备注"/>

          <el-table-column prop="operUserName" label="操作人"/>

          <el-table-column prop="updateDate" label="最后更新时间" width="200"/>

        </el-table>
      </el-col>
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
    <TrailerpriceSave ref="trailerpricesave"></TrailerpriceSave>
    <TrailerpriceUpdata ref="trailerpriceupdata"></TrailerpriceUpdata>
    <TrailerPriceLog ref="trailerPriceLog"></TrailerPriceLog>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import TrailerpriceSave  from './TrailerPriceSave.vue'
  import TrailerpriceUpdata  from './TrailerPriceUpdata.vue'
  import TrailerPriceLog from '../trailerpricelog/trailerPriceLog.vue'
  import util from '../../../common/js/util'

  export default {
    mixins: [pagination],
    components: {TrailerpriceSave, TrailerpriceUpdata,TrailerPriceLog},
    data() {
      return {
        newTrailerpricedialogVisible: false,
        selectData: [],
        regionBelongCityData: [],
        regionBelongDistrictData: [],
        regionBelongStreetData: [],
        regionList: this.allRegionList,
        addressSelectedArr: {
          regionOne: '',
          regionTow: '',
          regionThird: '',
          regionFourth: ''
        },
        form: {
          regionCode: '',
          harborId: '',
          updateDateStart: '',
          updateDateEnd: '',
          operUserId: ''
        }

      }
    },
    computed: {
      ...mapGetters([
        'regionBelongPList',
        'allRegionList',
        'trailerpriceList',
        'harborBelongListByOrgCode',
        'customList',
        'shipcompanyList',
        'userInfoList'
      ]),

      currentRegionList(){
        return {
          '1': this.regionBelongPList.data,
          '2': [],
          '3': [],
          '4': []
        }
      }

    },

    methods: {
      ...mapActions([
        'RegionBelongPList',
        'getAreaInfoList',
        'getTrailerpriceList',
        'deleteTrailerprice',
        'getHarborBelongListByOrgCode',
        'getCustomList',
        'getShipcompanyList'
//        'getUserInfoListByDeptId'
      ]),

      init(){
        this.$store.dispatch('getUserInfoListByDeptId');
        this.$store.dispatch('getHarborBelongListByOrgCode');
        this.$store.dispatch('getCustomList');
        this.$store.dispatch('getShipcompanyList');
      },

      handleSelectionChange(val){
        this.selectData = val;
        console.log(val)
      },

      changeRegionOne(val){
        this.second = true;
        this.addressSelectedArr.regionOne = val
        let param = {code: val}
        this.getAreaInfoList(param).then((res) => {
          this.regionBelongCityData = res.data
          this.regionBelongDistrictData = this.regionBelongStreetData = []
          this.addressSelectedArr.regionTow = ""
          this.addressSelectedArr.regionThird = ""
          this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionTow(val){
        this.addressSelectedArr.regionTow = val
        let param = {code: val}
        this.getAreaInfoList(param).then((res) => {
          this.regionBelongDistrictData = res.data
          this.regionBelongStreetData = []
          this.addressSelectedArr.regionThird = ""
          this.addressSelectedArr.regionFourth = ""
        })
      },

      //查看拖车报价日志
      queryTrailerPriceLog(){
          this.$refs.trailerPriceLog.trailerLog = true;
          this.$refs.trailerPriceLog.detail = this.selectData[0];
      },

      changeRegionThird(val){
        this.addressSelectedArr.regionThird = val
        let param = {code: val}
        this.getAreaInfoList(param).then((res) => {
          this.regionBelongStreetData = res.data
          this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionFourth(val){
        this.addressSelectedArr.regionFourth = val
      },

      selectRegion(val){
        this.second = true;
        let param = {regionCode: val}
        this.getAllRegionByRegionCode(param).then((res) => {
          console.log(res.data)
          this.regionBelongCityData = res.data
        })
        this.allRegionList.data.forEach((val, key) => {
          if (val.value === this.form.regionCode) {
            this.form.regionName1 = val.regionName
          }
        })
        this.form.selectedRegionSecond = ""
      },

      selectRegionsecond(val){
        console.log(this.form.selectedRegionSecond)
        this.third = true;
        let param = {regionCode: val}
        this.getAllRegionByRegionCode(param).then((res) => {
          console.log(res.data)
          this.regionBelongDistrictData = res.data
        })
        this.regionBelongCList.data.forEach((val, key) => {
          if (val.regionId === this.form.selectedRegionSecond) {
            this.form.regionName2 = val.regionName
          }
        })
        this.form.selectedRegionThird = ""
      },

      getList(){
        var temp;
        if (this.addressSelectedArr.regionTow == "") {
          temp = this.addressSelectedArr.regionOne;
        }
        else if (this.addressSelectedArr.regionThird == "") {
          temp = this.addressSelectedArr.regionTow;
        }
        else if (this.addressSelectedArr.regionFourth == "") {
          temp = this.addressSelectedArr.regionThird;
        }
        else {
          temp = this.addressSelectedArr.regionFourth;
        }
        this.form.regionCode = temp;
        this.form.updateDateStart = (typeof(this.form.updateDateStart) == "string" ? this.form.updateDateStart : util.formatDate.format(this.form.updateDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.updateDateEnd = (typeof(this.form.updateDateEnd) == "string" ? this.form.updateDateEnd : util.formatDate.format(this.form.updateDateEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.pageHandler(this.form, this.getTrailerpriceList);
      },

      newTrailerprice(){
        let param1 = {code: this.addressSelectedArr.regionOne}
        this.getAreaInfoList(param1).then((res) => {
          this.$refs.trailerpricesave.regionBelongCityData = res.data
        })
        let param2 = {code: this.addressSelectedArr.regionTow}
        this.getAreaInfoList(param2).then((res) => {
          this.$refs.trailerpricesave.regionBelongDistrictData = res.data
        })
        let param3 = {code: this.addressSelectedArr.regionThird}
        this.getAreaInfoList(param3).then((res) => {
          this.$refs.trailerpricesave.regionBelongStreetData = res.data
        })
        this.$refs.trailerpricesave.form ={
          regionOne:this.addressSelectedArr.regionOne,
          regionTow:this.addressSelectedArr.regionTow,
          regionThird:this.addressSelectedArr.regionThird,
          regionFourth:this.addressSelectedArr.regionFourth,
          harborId:this.form.harborId,
          harborName :'',
          regionId:'',
          regionCode:'',
          regionIdt:'',
          selectedRegion:'',
          selectedRegionSecond:'',
          selectedRegionThird:'',
          selectedRegionFourth:'',
          regionName:'',
          Z_20GP:'',
          Z_2x20GP:'',
          Z_40GP:'',
          Z_40HQ:'',
          Z_20HQ:'',
          Z_2x20HQ:'',
          S_20GP:'',
          S_2x20GP:'',
          S_40GP:'',
          S_40HQ:'',
          S_20HQ:'',
          S_2x20HQ:'',
          address:'',
          longtitude :'',
          latitude:'',
          contacts:'',
          phone:'',
          secRegion:'',
          isUnable:'',
          regionName1:'',
          regionName2:'',
          regionName3:'',
          regionName4:'',
          regionCode:'',
          regionName:'',
          validityStartDate:  new Date(),
          validityEndDate:'',
          remark:'',
        }
        this.$refs.trailerpricesave.newTrailerpricedialogVisible = true;
      },

      updateTrailerprice(){
        if (this.selectData.length == 1) {
          this.$refs.trailerpriceupdata.newTrailerpricedialogVisible = true;
          this.$refs.trailerpriceupdata.detail = this.selectData[0]
          console.log(this.selectData[0])
          this.newTrailerpricedialogVisible = true;
        } else {
          this.$confirm('请选择一条数据进行编辑')
        }
      },

      deleteTrailerpriceHandle(){
        if (this.selectData.length >= 1) {
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', {type: 'warning'})
            .then(() => {
              console.log(this.selectData);
              var ids = "ids=" + this.selectData.map(item => item.id).join(",");
              this.deleteTrailerprice({id: ids}).then(res => {
                if (res.success) {
                  this.$refs['form'].resetFields()
                  this.getTrailerpriceList()
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '删除失败',
                    type: 'error'
                  })
                }
              });
            })
        } else {
          this.$confirm('请选择删除数据')
        }
      },

      //查询
      onSubmit() {
        console.log('submit!');
        this.getList();
      },

      //清空
      resetForm(){
          this.addressSelectedArr.regionOne = '',
          this.addressSelectedArr.regionTow = '',
          this.addressSelectedArr.regionThird = '',
          this.addressSelectedArr.regionFourth = '',
          this.form.regionCode = '',
          this.form.harborId = '',
          this.form.updateDateStart = '',
          this.form.updateDateEnd = '',
          this.form.operUserId = ''
      }

    },
    created(){
      this.$store.dispatch('getRegionList')
      this.getList()
      this.init()
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>

<style>
  .line-wrap {
    padding-right: 10px !important;
    margin-left: 0px !important;
    text-align: center !important;
  }
</style>
<style scoped>
  /* @import '../../../styles/custom-theme/query-modal.css' */
  .query-modal1 {
    display: flex;
    flex-flow: row nowrap;
  }
  .query-modal1 .el-form-item {
    margin-top: 10px;
    margin-bottom: 8px !important;
  }
  .query-params1 {
    flex: 1;
  }
  .query-params1 .el-select {
    width: 150px;
  }
  .query-btns1 {
    display: flex;
    flex-flow: column nowrap;
  }
  .query-btns1 .el-button {
    width: 90px;
  }
</style>
