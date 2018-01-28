<!-- 拖车报价日志 列表 -->
<template>
  <el-dialog
    size="large"
    title="报价日志"
    v-model="trailerLog">
    <section class="ke_hu_bao_jia">
      <form-box title="查询">
        <el-form :inline="true" ref="form" :model="form" label-width="100px">

          <el-form-item label="地区" prop="regionOne">
            <el-select
              clearable filterable default-first-option
              v-model="addressSelectedArr.regionOne"
              placeholder="请选择"
              @change="changeRegionOne">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongPList.data"
                         :label="item.regionName+'('+(item.regionQrycode)+')'"
                         :value="item.regionCode "
                         :key="item.regionCode"
              >
              </el-option>
            </el-select>

            <el-select
              clearable filterable default-first-option
              v-model="addressSelectedArr.regionTow"
              placeholder="请选择"
              @change="changeRegionTow"
            >
              <el-option value="">请选择</el-option>
              <el-option
                v-for="item in regionBelongCityData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select
              clearable filterable default-first-option
              v-model="addressSelectedArr.regionThird"
              placeholder="请选择"
              @change="changeRegionThird"
            >
              <el-option value="">请选择</el-option>
              <el-option
                v-for="item in  regionBelongDistrictData "
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select
              clearable filterable default-first-option
              v-model="addressSelectedArr.regionFourth"
              placeholder="请选择"
              @change="changeRegionFourth"
            >
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongStreetData"
                         :label="item.text"
                         :key="item.value"
                         :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="港口" prop="harborId">
            <el-select clearable filterable default-first-option v-model="form.harborId" placeholder="请选择港口" class='control-width'>
              <el-option value="">请选择</el-option>
              <el-option v-for="item in harborBelongList"
                         :label="item.harborName+'('+(item.harborCode)+')'"
                         :value="item.harborId"
                         :key="item.harborId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作人" prop="operUserId">
            <el-select  clearable filterable default-first-option v-model="form.operUserId" placeholder="请选择操作人" class='control-width'>
              <el-option value="">请选择</el-option>
              <el-option v-for="item in userInfoList"
                         :label="item.text"
                         :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </form-box>
      <el-table ref="table"
        highlight-current-row
        border
        :max-height="tableMaxHeight"
        :data="trailerPriceLogList.data"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
          prop="harborName"
          label="港口">
        </el-table-column>
        <el-table-column
          prop="regionFullName"
          label="地区" width="120">
        </el-table-column>

        <el-table-column
          prop="isInvoice"
          label="开发票" width="40">
          <template scope="scope">
            <span v-show="scope.row.isInvoice">是</span>
            <span v-show="!scope.row.isInvoice">否</span>
          </template>
        </el-table-column>

        <el-table-column class-name="cell-group"
                         prop="cqdlList._20GP"
                         label="类型" width="40">
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
                         prop="shipCompanyCode"
                         label="20GP报价" width="90">
          <template scope="scope">
            <div class="content-rowspan">
              <div>{{getShipmentDate(scope.row.tqdlList, 0, 0)}}</div>
              <div>{{getShipmentDate(scope.row.tqdlList, 0, 1)}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column class-name="cell-group"
                         prop="shipCompanyCode"
                         label="2*20GP报价" width="90">
          <template scope="scope">
            <div class="content-rowspan">
              <div>{{getShipmentDate(scope.row.tqdlList, 4, 0)}}</div>
              <div>{{getShipmentDate(scope.row.tqdlList, 4, 1)}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column class-name="cell-group"
                         prop="shipCompanyCode"
                         label="40GP报价" width="90">
          <template scope="scope">
            <div class="content-rowspan">
              <div>{{getShipmentDate(scope.row.tqdlList, 2, 0)}}</div>
              <div>{{getShipmentDate(scope.row.tqdlList, 2, 1)}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column class-name="cell-group"
                         prop="shipCompanyCode"
                         label="40HQ报价" width="90">
          <template scope="scope">
            <div class="content-rowspan">
              <div>{{getShipmentDate(scope.row.tqdlList, 3, 0)}}</div>
              <div>{{getShipmentDate(scope.row.tqdlList, 3, 1)}}</div>
            </div>
          </template>
        </el-table-column>


        <el-table-column class-name="cell-group"
                         prop="shipCompanyCode"
                         label="20HQ报价" width="90">
          <template scope="scope">
            <div class="content-rowspan">
              <div>{{getShipmentDate(scope.row.tqdlList, 1, 0)}}</div>
              <div>{{getShipmentDate(scope.row.tqdlList, 1, 1)}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column class-name="cell-group"
                         prop="shipCompanyCode"
                         label="2*20HQ报价" width="90">
          <template scope="scope">
            <div class="content-rowspan">
              <div>{{getShipmentDate(scope.row.tqdlList, 5, 0)}}</div>
              <div>{{getShipmentDate(scope.row.tqdlList, 5, 1)}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="validityStartDate"
          label="生效日期">
        </el-table-column>

        <el-table-column
          prop="validityEndDate"
          label="失效日期">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>

        <el-table-column
          prop="actiontypeName"
          label="操作">
        </el-table-column>

        <el-table-column
          prop="updateDate"
          label="操作时间">
        </el-table-column>

        <el-table-column
          prop="operateName"
          label="操作人">
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

    </section>
  </el-dialog>
</template>
<script>

  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import global  from '../../../common/global/global'
  import util from '../../../common/js/util'
  import '../../../styles/themes/blur-black.scss'


  export default {
    mixins: [pagination],
    data() {
      return {
        selectData: [],
        regionBelongCityData: [],
        regionBelongDistrictData: [],
        regionBelongStreetData: [],
        detail: {},
        trailerLog: false,
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
          trailerQuoteId: '',
          operUserId: ''
        }

      }
    },
    computed: {
      ...mapGetters([
        'allshipcompanyList',
        'userInfoList',
        'allRegionList',
        'harborBelongList',
        'regionBelongPList',
        'trailerPriceLogList'
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
        'HarborBelongList',
        'RegionBelongPList',
        'getTrailerPriceLogList',
        'getallShipcompanyList',
        'getAllRegionByRegionCode',
//        'getUserInfoListByDeptId',
        'getAreaInfoList'
      ]),

      init(){
        this.$store.dispatch('getUserInfoListByDeptId')
        this.$store.dispatch('HarborBelongList')
//        this.$store.dispatch('getallShipcompanyList')
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

      //装货对应的报价金额
      getShipmentDate(tqdlList, cabinetType, transportType){
        if (tqdlList) {
          let item = tqdlList.filter((res) => {
            if (res.cabinetType == cabinetType && res.transportType == transportType && res.price != 0) {
              return res.price;
            }
          });
          if (item && item.length > 0) {
            return item[0]['price'];
          }
          return '';
        }
      },

      //送货对应的报价信息
      getDeliveryDate(transportType, price){
        if (transportType == 1 && price != 0) {
          return price;
        }
        return '';
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
        this.form.updateTimeStart = (typeof(this.form.updateTimeStart) == "string" ? this.form.updateTimeStart : util.formatDate.format(this.form.updateTimeStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.updateTimeEnd = (typeof(this.form.updateTimeEnd) == "string" ? this.form.updateTimeEnd : util.formatDate.format(this.form.updateTimeEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityStartDateStart = (typeof(this.form.validityStartDateStart) == "string" ? this.form.validityStartDateStart : util.formatDate.format(this.form.validityStartDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityStartDateEnd = (typeof(this.form.validityStartDateEnd) == "string" ? this.form.validityStartDateEnd : util.formatDate.format(this.form.validityStartDateEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityEndDateStart = (typeof(this.form.validityEndDateStart) == "string" ? this.form.validityEndDateStart : util.formatDate.format(this.form.validityEndDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityEndDateEnd = (typeof(this.form.validityEndDateEnd) == "string" ? this.form.validityEndDateEnd : util.formatDate.format(this.form.validityEndDateEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.pageHandler(this.form, this.getTrailerPriceLogList);
      },

      onSubmit() {
        console.log('submit!');
        this.getList();
      }
    },

    created(){
      this.$store.dispatch('RegionBelongPList');
      this.$store.dispatch('getRegionList');
      this.init();
      this.showEdit = !global.isDisabled(7);
      console.log("===========>" + this.showEdit);
    },

    watch: {
      detail(val){
        if (val) {
          this.form.trailerQuoteId = val.id;
        } else {
          this.form.trailerQuoteId = ''
        }
        this.getList();
      }
    },

    mounted(){

    }
  }
</script>
