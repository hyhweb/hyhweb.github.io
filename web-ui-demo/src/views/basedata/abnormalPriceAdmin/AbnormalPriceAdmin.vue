<!-- 客户报价管理 列表 -->
<template>
  <section class="ke_hu_bao_jia">
    <ToolBarBox>
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" ref="form" :model="form">
          <div class="query-params">
            <el-form-item label="地区" :label-width="labelWidth">
              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionOne" placeholder="请选择省级地区" @change="changeRegionOne">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in regionBelongPList.data"
                           :label="item.regionName+'('+(item.regionQrycode)+')'"
                           :value="item.regionCode "
                           :key="item.regionCode">
                </el-option>
              </el-select>
              -
              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionTow" placeholder="请选择市级地区" @change="changeRegionTow">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in regionBelongCityData"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value">
                </el-option>
              </el-select>
              -
              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionThird" placeholder="请选择县级地区" @change="changeRegionThird">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in  regionBelongDistrictData "
                           :key="item.value"
                           :label="item.text"
                           :value="item.value">
                </el-option>
              </el-select>
              -
              <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionFourth" placeholder="请选择镇级地区" @change="changeRegionFourth">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in regionBelongStreetData"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="客户名称" prop="customerId" :label-width="labelWidth">
              <el-select  clearable filterable default-first-option  v-model="form.customerId" placeholder="请选择用户">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in customList"
                           :label="item.customerName+'('+(item.customerCode)+')'"
                           :value="item.customerId"
                           :key="item.customerId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="港口" prop="harborId" :label-width="labelWidth">
              <el-select  clearable filterable default-first-option v-model="form.harborId" placeholder="请选择港口">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in harborBelongList" :label="item.harborName+'('+(item.harborCode)+')'"
                           :value="item.harborId"
                           :key="item.harborId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="业务员" prop="salesmanName" label-width="68px">
              <el-input v-model="form.salesmanName" class="control-width"></el-input>
            </el-form-item>

            <el-form-item label="生效日期" prop="validityStartDate" label-width="84px">
              <el-date-picker type="date" placeholder="生效日期" v-model="form.validityStartDate"/>
            </el-form-item>

            <el-form-item label="报价状态" :label-width="labelWidth" prop="auditStatus">
              <el-select clearable filterable default-first-option v-model="form.auditStatus" placeholder="请选择" class='control-width'>
                <el-option label="已审核" :key="form.auditStatus" :value="0"></el-option>
                <el-option label="待审核" :key="form.auditStatus" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('form')">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table" highlight-current-row border :max-height="460"
                :data="abnormalPriceList.data"
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick">

        <el-table-column type="selection">
        </el-table-column>

        <el-table-column
          prop="customerName"
          label="客户名称" width="110">
        </el-table-column>

        <el-table-column
          prop="salesmanName"
          label="业务员">
        </el-table-column>

        <el-table-column
          prop="harborName"
          label="港口">
        </el-table-column>

        <el-table-column
          prop="regionFullName"
          label="运输地区" width="120">
        </el-table-column>

        <el-table-column
          prop="validityStartDate"
          label="生效日期" width="90">
        </el-table-column>

        <el-table-column
          prop="validityEndDate"
          label="失效日期">
        </el-table-column>

        <!--<el-table-column class-name="cell-group"-->
          <!--prop="isInvoice"-->
          <!--label="开发票" width="50">-->
          <!--<template scope="scope">-->
            <!--<span v-show="scope.row.isInvoice">是</span>-->
            <!--<span v-show="!scope.row.isInvoice">否</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column label="装/送" class-name="cell-group" prop="transportType" width="40">
          <!--<span v-if="transportType === 0">装</span>-->
          <!--<span v-if="transportType === 1">送</span>-->
          <template scope="scope">
            <span v-if="scope.row.transportType === 0">装</span>
            <span v-if="scope.row.transportType === 1">送</span>
          </template>
        </el-table-column>

        <el-table-column label="箱型" prop="cabinetType">
          <template scope="scope">
            <span v-if="scope.row.cabinetType === 0">20GP</span>
            <span v-if="scope.row.cabinetType === 1">20HQ</span>
            <span v-if="scope.row.cabinetType === 2">40GP</span>
            <span v-if="scope.row.cabinetType === 3">40HQ</span>
            <span v-if="scope.row.cabinetType === 4">2*20GP</span>
            <span v-if="scope.row.cabinetType === 5">2*20HQ</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>

        <el-table-column label="状态" prop="auditStatus" >
          <template scope="scope">
            <span v-if="scope.row.auditStatus === 0">正常</span>
            <span v-if="scope.row.auditStatus === 1">待审核</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="auditerName"
          label="审核人">
        </el-table-column>

        <el-table-column
          prop="auditDate"
          label="审核日期" width="140">
        </el-table-column>

        <el-table-column label="操作" v-if="showEdit" prop="contactInfo" width="80" fixed="right">
          <template scope="scope">
            <el-button size="small" type="primary" @click="audit(scope.row)" :disabled="auditAuthority || scope.row.auditStatus === 0">
              确认
            </el-button>
          </template>
        </el-table-column>

        <!--<el-table-column label="20GP报价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._20GPStatus}">{{scope.row.cqdVoList[0]._20GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._20GP=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._20GPStatus}">{{scope.row.cqdVoList[1]._20GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20GP=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="20GP拖车价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._20GPStatus}">{{scope.row.cqdVoList[0]._20GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._20GP=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._20GPStatus}">{{scope.row.cqdVoList[1]._20GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20GP=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="20HQ报价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._20HQStatus}">{{scope.row.cqdVoList[0]._20HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._20HQ=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._20HQStatus}">{{scope.row.cqdVoList[1]._20HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20HQ=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="20HQ拖车价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._20HQStatus}">{{scope.row.cqdVoList[0]._20HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._20HQ=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._20HQStatus}">{{scope.row.cqdVoList[1]._20HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._20HQ=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="2*20GP报价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._2x20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._2x20GPStatus}">{{scope.row.cqdVoList[0]._2x20GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._2x20GP=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._2x20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._2x20GPStatus}">{{scope.row.cqdVoList[1]._2x20GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._2x20GP=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="2*20HQ报价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._2x20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._2x20HQStatus}">{{scope.row.cqdVoList[0]._2x20HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._2x20HQ=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._2x20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._2x20HQStatus}">{{scope.row.cqdVoList[1]._2x20HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._2x20HQ=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="40GP报价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._40GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._40GPStatus}">{{scope.row.cqdVoList[0]._40GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._40GP=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._40GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._40GPStatus}">{{scope.row.cqdVoList[1]._40GP}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._40GP=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="40HQ报价" class-name="cell-group" prop="shipCompanyCode" width="60">-->
          <!--<template scope="scope">-->
            <!--<div class="content-rowspan">-->
              <!--<div v-if="scope.row.cqdVoList[0]._40HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._40HQStatus}">{{scope.row.cqdVoList[0]._40HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[0]._40HQ=='0'">&nbsp</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._40HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._40HQStatus}">{{scope.row.cqdVoList[1]._40HQ}}</div>-->
              <!--<div v-if="scope.row.cqdVoList[1]._40HQ=='0'">&nbsp</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
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

  </section>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex';
  import pagination from '../../../common/mixins/pagination';
  import global from '../../../common/global/global';
  import util from '../../../common/js/util';
  import '../../../styles/themes/blur-black.scss';
  import {auditAbnormalPriceApi} from '../../../api/modules/basedata';


  const token = sessionStorage.getItem('id_token');
  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        auditAuthority: this.$global.isDisabled(5),
//        auditAuthority: true,
        labelWidth: '90px',
        showEdit: false,
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
//          // 客户报价明细ID*/
//          customerQuoteDetailId: '',
//          // 客户报价ID*/
//          customerQuoteId: '',
//          // 箱型(0:20GP,1:20HQ,2:40GP,3:40HQ,4:2*20GP,5:2*20HQ)*/
//          cabinetType: '',
//          // 价格*/
//          price: '',
//          // 运输类型（0装货，1送货）*/
//          transportType: '',
//          // 审核人ID*/
//          auditerId: '',
//          // 审核人姓名*/
//          auditerName: '',
//          // 审核日期*/
//          auditDate: '',
          // 报价状态。0：正常，1：待审核*/
          auditStatus: '',
//          // 客户ID*/
          customerId: '',
          // 客户名称*/
//          customerName: '',
//          // 业务员ID*/
//          salesmanId: '',
          // 业务员名称*/
          salesmanName: '',
//          // 港口ID*/
          harborId: '',
          // 港口名称*/
//          harborName: '',
          // 地区编码*/
          regionCode: '',
//          // 地区全称*/
//          regionFullName: '',
          // 生效日期*/
          validityStartDate: ''
//          // 失效日期*/
//          validityEndDate: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'abnormalPriceList',
        'custompriceList',
        'harborBelongList',
        'regionBelongPList',
        'customList',
        'allshipcompanyList',
        'userInfoList',
        'allRegionList'
      ])
//      auditAuthority() {
//        console.log(this.abnormalPriceList.data)
//        let bp = 0;
//        if(!global.isDisabled(5)) {
////          for(let i = bp; i < this.abnormalPriceList.data.length; i++) {
////            if(this.abnormalPriceList.data[i].auditStatus === 1) {
////              bp = i+1;
////              return false;
////            }
////          }
//
//          this.abnormalPriceList.data.forEach(function(item) {
//            return item.auditStatus === 0;
//          });
//
////          return false;
//        }
//        return true;
//      }
    },

    methods: {
      ...mapActions([
        'getAbnormalPriceList',
        'getRegionListByRegionCode',
        'HarborBelongList',
        'getallShipcompanyList',
        'getAllRegionByRegionCode',
      ]),

      init() {
        this.$store.dispatch('RegionBelongPList');          //地区-省级下拉列表数据
        this.$store.dispatch('HarborBelongList');           //所有港口列表
        this.$store.dispatch('getCustomList');               //客户名称下拉列表
      },

      handleSelectionChange(val){
        this.selectData = val;
      },

      changeRegionOne(val){
        this.addressSelectedArr.regionOne = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongCityData = res.data
          this.regionBelongDistrictData = this.regionBelongStreetData = []
          this.addressSelectedArr.regionTow = ""
          this.addressSelectedArr.regionThird = ""
          this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionTow(val){
        this.addressSelectedArr.regionTow = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongDistrictData = res.data
          this.regionBelongStreetData = []
          this.addressSelectedArr.regionThird = ""
          this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionThird(val){
        this.addressSelectedArr.regionThird = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongStreetData = res.data
          this.addressSelectedArr.regionFourth = ""
        })
      },

      //查看客户报价日志
      queryCustomerLog(){
        if(this.selectData.length<=1){
          this.$refs.CustompriceLog.customerLog = true;
          this.$refs.CustompriceLog.detail = this.selectData[0];
        } else {
          this.$confirm('只能选中0或者1条')
        }
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

      getList() {
        var temp;
        if (this.addressSelectedArr.regionTow == "") {
          temp = this.addressSelectedArr.regionOne;
        } else if (this.addressSelectedArr.regionThird == "") {
          temp = this.addressSelectedArr.regionTow;
        } else if (this.addressSelectedArr.regionFourth == "") {
          temp = this.addressSelectedArr.regionThird;
        } else {
          temp = this.addressSelectedArr.regionFourth;
        }
        this.form.regionCode = temp;
        this.form.validityStartDate = (typeof (this.form.validityStartDate) === 'string' ? this.form.validityStartDate : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd hh:mm:ss'));
        this.pageHandler(this.form, this.getAbnormalPriceList);
      },

      audit(row) {
//        if(row.auditStatus === 0) {
//          this.$message({
//            message: '审核状态已正常',
//            type: 'warning'
//          });
//          return false;
//        }
        this.$confirm('是否确认?', '提示', {type: 'warning'}).then(() => {
          auditAbnormalPriceApi({ cqdIds: row.customerQuoteDetailId }).then((res) => {
            if (res.data.success) {
//            this.$refs['form1'].resetFields();
              this.getList();
              this.$message({
                message: '审核成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '审核失败',
                type: 'error'
              });
            }
          });
        });


//        this.$refs.custompriceupdata.newCustompricedialogVisible = true;
//        this.$refs.custompriceupdata.detail = row
//        this.getCustompriceList()
//        console.log(this.selectData[0])
//        this.updateCustompricedialogVisible = true;
      },

      //查询
      onSubmit() {
        this.pageNo=1;
        //console.log('submit!');
        this.getList();
      },

      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
//        this.form.auditStatus = '';
        this.addressSelectedArr.regionOne = '';
        this.addressSelectedArr.regionTow = '';
        this.addressSelectedArr.regionThird = '';
        this.addressSelectedArr.regionFourth = '';

//          this.form.regionCode = '',
//          this.form.customerId='',
//          this.form.harborId = '',
//          this.form.harborName = '',
//          this.form.shipCompanyId = '',
//          this.form.operUserId = '',
//          this.form.updateTimeStart = '',
//          this.form.updateTimeEnd = '',
//          this.form.validityStartDateStart = '',
//          this.form.validityStartDateEnd = '',
//          this.form.validityEndDateStart = '',
//          this.form.validityEndDateEnd = ''
      }
    },

    created(){
      this.getList();
      this.init();
      this.showEdit = !global.isDisabled(5);
      //console.log("===========>" + this.showEdit);
    },

    mounted(){
     // this.selectDept();
    }
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal.css';
  .query-modal .query-params> .el-form-item:first-of-type> .el-form-item__content {
    width: auto;
  }
  .query-modal .query-params> .el-form-item:first-of-type> .el-form-item__content> .el-select {
    width: 150px;
  }
  .warning-text {
    color: red;
  }
</style>
