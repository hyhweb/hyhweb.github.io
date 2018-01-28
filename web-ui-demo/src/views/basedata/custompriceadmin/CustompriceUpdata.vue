<template>
  <el-dialog id="centerDialogUpdateCustomPrice" title="编辑客户报价信息" v-model="newCustompricedialogVisible" class="custom_updata_windon">
    <el-form ref="form" :rules="updateFormRules" :model="form" label-width="80px" id="customPriceUpdate_form">

      <el-row :gutter="280" class="compile_list_width compile_three_width">
        <el-col :span="2">
          <el-form-item label="港口名称" prop="harborId">
            <el-select clearable filterable default-first-option v-model="form.harborName" placeholder="请选择所属港口" class='control-width' disabled @change="handleHarborChange">
              <el-option v-for="item in harborBelongListByOrgCode"
                         :label="item.harborName"
                         :value="item.harborId"
                         :key="item.harborId"
                         @change="test">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="280" class="compile_list_width compile_three_width">
        <el-col :span="2">
          <el-form-item label="用户" prop="customerId">
            <el-select clearable filterable default-first-option v-model="form.customerName" placeholder="请选择用户" class='control-width' disabled>
              <el-option v-for="item in customList"
                         :label="item.customerName"
                         :value="item.customerId"
                         :key="item.customerId"
                         @change="test">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="280" class="compile_list_width compile_three_width">
        <el-col :span="2">
          <el-form-item label="船公司" prop="shipCompanyId">
            <el-select clearable filterable default-first-option v-model="form.shipCompanyId" placeholder="请选择船公司"
                       class='control-width' disabled>
              <el-option v-for="item in allshipcompanyList"
                         :label="item.shipCompanyName"
                         :value="item.shipCompanyId"
                         :key="item.shipCompanyId"
                         @change="test">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="280" class="compile_list_width special_compile_width">
        <el-col :span="2">
          <el-form-item label="地区" prop="regionOne">
            <el-select clearable filterable default-first-option disabled
                      v-model="addressSelectedArr.regionOne"
                      placeholder="请选择"
                      @input="changeRegionOne">
              <el-option v-for="item in regionBelongPList.data"
                        :label="item.regionName"
                        :value="item.regionCode "
                        :key="item.regionCode">
              </el-option>
            </el-select>

            <el-select clearable filterable default-first-option disabled
                      v-model="addressSelectedArr.regionTow"
                      placeholder="请选择"
                      @input="changeRegionTow">
              <el-option v-for="item in regionBelongCityData"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
              </el-option>
            </el-select>

            <el-select clearable filterable default-first-option disabled
                      v-model="addressSelectedArr.regionThird"
                      placeholder="请选择"
                      @input="changeRegionThird">
              <el-option v-for="item in  regionBelongDistrictData "
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
              </el-option>
            </el-select>

            <el-select clearable filterable default-first-option disabled
                      v-model="addressSelectedArr.regionFourth"
                      placeholder="请选择"
                      @input="changeRegionFourth">
              <el-option v-for="item in regionBelongStreetData"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row :gutter="280" class="compile_list_width" style="width:32%;">
        <el-col :span="2">
          <el-form-item label="是否专票" prop="isInvoice">
            <el-select clearable filterable default-first-option v-model="form.isInvoice" placeholder="是否专票"
                       class='control-width' disabled>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="200" class="compile_list_width compile_four_width" style="width:64%;">
        <el-col :span="2" class="compile_special_el-col vn-input-width2">
          <el-form-item label="有效日期" prop="validityStartDate" class="my-el-form-item__error">
            <el-date-picker type="date" placeholder="生效日期" @change="checkDate" v-model="form.validityStartDate" style="width: 130px !important;"></el-date-picker>
            <div v-show="validateTipsVisible" class="validateTipsEdit">生效日期小于当前日期</div>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="compile_two_el-col vn-input-width3">
          <el-form-item>
            <el-date-picker type="date" placeholder="失效日期" v-model="form.validityEndDate" style="width: 130px !important;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="280" class="compile_list_width compile_five_width">
        <el-col :span="2" class="compile_special_el-col">
          <el-form-item label="拖车费:20GP" prop="Z_20GP">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.Z_20GP" placeholder="装货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="compile_two_el-col">
          <el-form-item label-width="0" prop="S_20GP">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.S_20GP" placeholder="送货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="280"class="compile_list_width compile_list_width2 compile_five_width">
        <el-col :span="2" class="compile_special_el-col">
          <el-form-item label="拖车费:20HQ" prop="Z_20HQ">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.Z_20HQ" placeholder="装货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="compile_two_el-col vn-input-width">
          <el-form-item label-width="0" prop="S_20HQ">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.S_20HQ" placeholder="送货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="280" class="compile_list_width compile_five_width">
        <el-col :span="2" class="compile_special_el-col">
          <el-form-item label="拖车费:40GP" prop="Z_40GP">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.Z_40GP" placeholder="装货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="compile_two_el-col">
          <el-form-item label-width="0" prop="S_40GP">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.S_40GP" placeholder="送货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="280" class="compile_list_width compile_list_width2 compile_five_width">
        <el-col :span="2" class="compile_special_el-col">
          <el-form-item label="拖车费:40HQ" prop="Z_40HQ">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.Z_40HQ" placeholder="装货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="compile_two_el-col vn-input-width">
          <el-form-item label-width="0" prop="S_40HQ">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.S_40HQ" placeholder="送货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="280" class="compile_list_width compile_five_width">
        <el-col :span="2" class="compile_special_el-col">
          <el-form-item label="拖车费:2*20GP" prop="Z_2x20GP">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.Z_2x20GP" placeholder="装货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="compile_two_el-col compile_five_width">
          <el-form-item label-width="0" prop="S_2x20GP">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.S_2x20GP" placeholder="送货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="280" class="compile_list_width compile_list_width2 compile_five_width">
        <el-col :span="2" class="compile_special_el-col">
          <el-form-item label="拖车费:2*20HQ" prop="Z_2x20HQ">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.Z_2x20HQ" placeholder="装货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col >
        <el-col :span="2" class="compile_two_el-col vn-input-width">
          <el-form-item label-width="0" prop="S_2x20HQ">
            <el-input v-if="form.cqdVoList != undefined" v-model="form.S_2x20HQ" placeholder="送货价格"
                      class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="280" class="compile_list_width special_compile_width">
        <el-col :span="2" >
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" style="width:85.5%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="280">
        <el-col :span="24">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<style>

  .el-form-item__error {
    white-space: nowrap;
  }
  .custom_updata_windon .el-dialog{
    min-width: 764px;
    /*border: 1px solid red;*/
  }
  .custom_updata_windon .el-dialog__body{
    /*outline: 2px solid #ff73e8;*/
    padding:30px 20px!important;
  }
  .custom_updata_windon .el-dialog  .compile_list_width{
    width: 49%;
    display: inline-block;
    /*outline: 1px solid royalblue;*/
    margin:0!important;
  }
  .custom_updata_windon .el-dialog .compile_list_width2{
    /*width: 44% !important;*/
    margin-left: -3px !important;
  }
  .custom_updata_windon .el-dialog .special_compile_width{
    width:100%!important;
  }
  .custom_updata_windon .el-dialog .compile_three_width{
    width: 32%!important;
  }
  .custom_updata_windon .compile_list_width .el-col{
    padding:0!important;
    /*outline: 2px solid #99ff62;*/
    width: 100%;
  }
  .custom_updata_windon .compile_list_width .compile_special_el-col{
    width:60%!important;
    /*border: 2px #ff16f0 solid;*/

  }
  .custom_updata_windon .compile_list_width .compile_two_el-col{
    width:40%!important;
    /*border: 2px red solid;*/
  }
  .custom_updata_windon .compile_list_width .el-form-item__content{
    margin: 0!important;
    /*outline: 1px solid mediumvioletred;*/
  }
  .custom_updata_windon .compile_list_width .el-form-item__content .el-select{
    /*outline: 1px solid rgba(153, 255, 98, 0.83);*/
    width: 65%;
  }
  .custom_updata_windon .special_compile_width .el-form-item__content .el-select{
    /*outline: 1px solid rgba(153, 255, 98, 0.83);*/
    width: 21%;
  }

  .custom_updata_windon .compile_list_width .el-form-item__content .el-select .el-input{
    width: 100%!important;
  }




  /*.custom_updata_windon .compile_list_width .el-form-item__content .el-input {*/
    /*width: 150px;*/
  /*}*/
  .custom_updata_windon .compile_list_width .el-form-item__content .el-input {
      width:65%;
    }

  .custom_updata_windon .special_compile_width .el-form-item__content .el-input {
    width:30%;
  }

  .custom_updata_windon .compile_four_width .el-form-item__content .el-input {
    width: 150px!important;
  }
  .custom_updata_windon .el-dialog .special_compile_width .compile_two_el-col .el-input{
    width: 130px!important;
  }
  .custom_updata_windon .compile_five_width .el-form-item__content .el-input {
    width: 130px!important;
  }
  .custom_updata_windon .compile_five_width .el-form-item__label{
    padding: 0px 12px 0px 0!important;
  }


</style>



<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import util from '../../../common/js/util'

  export default {
    mixins: [pagination],
    components: {},
    data() {
      const validateDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('生效日期不能为空'));
        }
        const now = new Date();
        const y = value.getFullYear();
        const m = value.getMonth();
        const d = value.getDate();
        //if (y <= now.getFullYear() && m <= now.getMonth() && d < now.getDate()) {
        if (y < now.getFullYear()) {
          return callback(new Error('生效日期小于当前日期'));
        } else if (y === now.getFullYear() && m < now.getMonth()) {
          return callback(new Error('生效日期小于当前日期'));
        } else if (m === now.getMonth() && d < now.getDate()) {
          return callback(new Error('生效日期小于当前日期'));
        }

//        return callback(new Error('生效日期大于等于当前日期'));
        return callback();
      };

      return {
        validateTipsVisible: false,
        newCustompricedialogVisible: false,
        updateFormRules: {
          validityStartDate: [{type: 'date', required: true, message: '请选择日期', trigger: 'blur,change'}],
//          validityStartDate: [
//            { validator: validateDate, trigger: 'blur, change' }
//          ],
          Z_20GP: [{validator: this.$global.validate.number}],
          S_20GP: [{validator: this.$global.validate.number}],
          Z_2x20GP: [{validator: this.$global.validate.number}],
          S_2x20GP: [{validator: this.$global.validate.number}],
          Z_40GP: [{validator: this.$global.validate.number}],
          S_40GP: [{validator: this.$global.validate.number}],
          Z_40HQ: [{validator: this.$global.validate.number}],
          S_40HQ: [{validator: this.$global.validate.number}],
          Z_20HQ: [{validator: this.$global.validate.number}],
          S_20HQ: [{validator: this.$global.validate.number}],
          Z_2x20HQ: [{validator: this.$global.validate.number}],
          S_2x20HQ: [{validator: this.$global.validate.number}],
        },
        detail: {},
        regionNameSplit: [],
        regionBelongCityData: [],
        regionBelongDistrictData: [],
        regionBelongStreetData: [],
//        regionList: this.allRegionList,
        addressSelectedArr: {
          regionOne: '',
          regionTow: '',
          regionThird: '',
          regionFourth: ''
        },
        second: false,
        third: false,
        fourth: false,
        form: {
          harborId: '',
          harborName: '',
          customerId: '',
          customerName: '',
          remark: '',
          regionCode: '',
          shipCompanyName: '',
          shipCompanyId: '',
          validityStartDate: '',
          validityEndDate: '',
          isInvoice: '',
          Z_20GP: '',
          Z_2x20GP: '',
          Z_40GP: '',
          Z_40HQ: '',
          Z_20HQ: '',
          Z_2x20HQ: '',
          S_20GP: '',
          S_2x20GP: '',
          S_40GP: '',
          S_40HQ: '',
          S_20HQ: '',
          S_2x20HQ: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'harborBelongList',
        'harborBelongListByOrgCode',
        'customList',
        'regionBelongPList',
//        'regionBelongCList',
        'allshipcompanyList',
//        'addOrderAllList',
//        'allRegionList',
//        'areaInfoList'
      ])
      /*      currentRegionList(){
       return {
       '1': this.regionBelongPList.data,
       '2': [],
       '3': [],
       '4': []
       }
       }*/
    },

    methods: {
      ...mapActions([
//        'getallShipcompanyList',
        'getCustompriceList',
//        'saveCustomprice',
//        'getCustomList',
//        'HarborBelongList',
//        'getHarborBelongListByOrgCode',
//        'RegionBelongPList',
//        'RegionBelongCList',
        'updateCustomprice',
//        'getCustomList',
//        'getAllRegionByRegionCode',
//        'getAreaInfoList',
//        'getCustompriceuList',
        'getRegionListByRegionCode'
      ]),

      checkDate(value) {
        let value_date = new Date(value);
        const now = new Date();
        const y = value_date.getFullYear();
        const m = value_date.getMonth();
        const d = value_date.getDate();
        if (y < now.getFullYear()) {
          this.validateTipsVisible = true;
        } else if (y === now.getFullYear() && m < now.getMonth()) {
          this.validateTipsVisible = true;
        } else if (m === now.getMonth() && d < now.getDate()) {
          this.validateTipsVisible = true;
        } else {
          this.validateTipsVisible = false;
        }
      },

//      handleHarborChange(val) {
//        for(let i = 0; i < this.harborBelongList.length; i++) {
//          if (this.harborBelongList[i].harborId === val) {
//            this.form.harborName = this.harborBelongList[i].harborName;
//            break;
//          }
//        }
//      },
      handleHarborChange(val) {
        for(let i = 0; i < this.harborBelongListByOrgCode.length; i++) {
          if (this.harborBelongListByOrgCode[i].harborId === val) {
            this.form.harborName = this.harborBelongListByOrgCode[i].harborName;
            break;
          }
        }
      },

      splitRegionCode(){
        //console.log("harborId=" + this.form.harborId + "---harborName=" + this.form.harborName);
        //console.log("this.from.cqdVoList[0]._20GP="+this.form.cqdVoList[0]._20GP);
        this.form.Z_20GP = this.form.cqdVoList[0]._20GP == 0 ? "" : this.form.cqdVoList[0]._20GP;
        this.form.S_20GP = this.form.cqdVoList[1]._20GP == 0 ? "" : this.form.cqdVoList[1]._20GP;

        this.form.Z_2x20GP = this.form.cqdVoList[0]._2x20GP == 0 ? "" : this.form.cqdVoList[0]._2x20GP;
        this.form.S_2x20GP = this.form.cqdVoList[1]._2x20GP == 0 ? "" : this.form.cqdVoList[1]._2x20GP;

        this.form.Z_40GP = this.form.cqdVoList[0]._40GP == 0 ? "" : this.form.cqdVoList[0]._40GP;
        this.form.S_40GP = this.form.cqdVoList[1]._40GP == 0 ? "" : this.form.cqdVoList[1]._40GP;

        this.form.Z_40HQ = this.form.cqdVoList[0]._40HQ == 0 ? "" : this.form.cqdVoList[0]._40HQ;
        this.form.S_40HQ = this.form.cqdVoList[1]._40HQ == 0 ? "" : this.form.cqdVoList[1]._40HQ;

        this.form.Z_20HQ = this.form.cqdVoList[0]._20HQ == 0 ? "" : this.form.cqdVoList[0]._20HQ;
        this.form.S_20HQ = this.form.cqdVoList[1]._20HQ == 0 ? "" : this.form.cqdVoList[1]._20HQ;

        this.form.Z_2x20HQ = this.form.cqdVoList[0]._2x20HQ == 0 ? "" : this.form.cqdVoList[0]._2x20HQ;
        this.form.S_2x20HQ = this.form.cqdVoList[1]._2x20HQ == 0 ? "" : this.form.cqdVoList[1]._2x20HQ;

        let regionCode = typeof(this.form.regionCode) == "undefined" ? "" : this.form.regionCode
        this.addressSelectedArr.regionOne = regionCode.substring(0, 2)
        this.addressSelectedArr.regionTow = regionCode.substring(0, 4)
        this.addressSelectedArr.regionThird = regionCode.substring(0, 6)
        // this.addressSelectedArr.regionFourth = regionCode
        this.addressSelectedArr.regionFourth =  regionCode.length>6?regionCode:'';

        let param1 = {regionCode: this.addressSelectedArr.regionOne}
        this.getRegionListByRegionCode(param1).then((res) => {
          this.regionBelongCityData = res.data
        })
        let param2 = {regionCode: this.addressSelectedArr.regionTow}
        this.getRegionListByRegionCode(param2).then((res) => {
          this.regionBelongDistrictData = res.data
        })
        let param3 = {regionCode: this.addressSelectedArr.regionThird}
        this.getRegionListByRegionCode(param3).then((res) => {
          this.regionBelongStreetData = res.data
        })
      },

      getList(){
        let param = Object.assign(this.paginationParams(), this.form)
      },

      test(){
          console.log(this.form.harborname),
          console.log(this.form.shipCompanyName),
          console.log(this.form.customerName)
      },

      changeRegionOne(val){
        this.second = true;
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

      changeRegionFourth(val){
        this.addressSelectedArr.regionFourth = val
      },

      /*     selectRegion(val){
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
       },*/

      /*      selectRegionsecond(val){
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
       },*/

      closeDialog(){
        this.newCustompricedialogVisible = false;
      },

//            returnshow(){
//                debugger;
//                    var regionIds=this.form.regionIds;
//                console.log("__________________"+regionIds);
////                var myArray=new Array();
////                myArray=regionIds.split(",");
////                for(int i=0;i<myArray.length;i++){
////                    console.log(myArray[i]);
////                }
//
//            },
      onSubmit() {
        var temp;
        //debugger;
        if (this.addressSelectedArr.regionTow == "") {
          temp = this.addressSelectedArr.regionOne;
        } else if (this.addressSelectedArr.regionThird == "") {
          temp = this.addressSelectedArr.regionTow;
        } else if (this.addressSelectedArr.regionFourth == "") {
          temp = this.addressSelectedArr.regionThird;
        } else {
          temp = this.addressSelectedArr.regionFourth;
        }
        //console.log("____1______________:"+this.form.validityStartDate);
        //console.log("_____2_____________:"+this.form.validityEndDate);
        //regionId   regionIdt   temp
        this.form.regionCode = temp;

        this.$refs.form.validate((valid) => {
          if (valid) {
            if (typeof(this.form.validityStartDate) != "undefined" && typeof(this.form.validityStartDate) != "") {
              this.form.validityStartDate = (typeof(this.form.validityStartDate) == "string" ? this.form.validityStartDate + " 00:00:00" : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd 00:00:00'));
            } else {
              this.form.validityStartDate = "";
            }
            if (typeof(this.form.validityEndDate) != "undefined" && typeof(this.form.validityEndDate) != "") {
              this.form.validityEndDate = (typeof(this.form.validityEndDate) == "string" ? this.form.validityEndDate + " 00:00:00" : util.formatDate.format(this.form.validityEndDate, 'yyyy-MM-dd 00:00:00'));
            } else {
              this.form.validityEndDate = "";
            }

//        let cqdVoList = this.form.cqdVoList;
            let cqdVoList = [
              {
                "transportType": 0,
                "_20GPId": this.form.cqdVoList[0]._20GPId,
                "_20GP": this.form.Z_20GP,
                "_20HQId": this.form.cqdVoList[0]._20HQId,
                "_20HQ": this.form.Z_20HQ,
                "_40GPId": this.form.cqdVoList[0]._40GPId,
                "_40GP": this.form.Z_40GP,
                "_40HQId": this.form.cqdVoList[0]._40HQId,
                "_40HQ": this.form.Z_40HQ,
                "_2x20GPId": this.form.cqdVoList[0]._2x20GPId,
                "_2x20GP": this.form.Z_2x20GP,
                "_2x20HQId": this.form.cqdVoList[0]._2x20HQId,
                "_2x20HQ": this.form.Z_2x20HQ
              }, {
                "transportType": 1,
                "_20GPId": this.form.cqdVoList[1]._20GPId,
                "_20GP": this.form.S_20GP,
                "_20HQId": this.form.cqdVoList[1]._20HQId,
                "_20HQ": this.form.S_20HQ,
                "_40GPId": this.form.cqdVoList[1]._40GPId,
                "_40GP": this.form.S_40GP,
                "_40HQId": this.form.cqdVoList[1]._40HQId,
                "_40HQ": this.form.S_40HQ,
                "_2x20GPId": this.form.cqdVoList[1]._2x20GPId,
                "_2x20GP": this.form.S_2x20GP,
                "_2x20HQId": this.form.cqdVoList[1]._2x20HQId,
                "_2x20HQ": this.form.S_2x20HQ
              }
            ]
//        [
//          {
//
//              "transportType": 1,
//              "_20GP": this.form.cqdVoList[1]._20GP,
//              "_20HQ": this.form.cqdVoList[1]._20HQ,
//              "_40GP": this.form.cqdVoList[1]._40GP,
//              "_40HQ": this.form.cqdVoList[1]._40HQ,
//              "_2x20GP": this.form.cqdVoList[1]._2x20GP,
//              "_2x20HQ": this.form.cqdVoList[1]._2x20HQ
//          },
//          {
//              "transportType": 0,
//              "_20GP": this.form.cqdVoList[0]._20GP,
//              "_20HQ": this.form.cqdVoList[0]._20HQ,
//              "_40GP": this.form.cqdVoList[0]._40GP,
//              "_40HQ": this.form.cqdVoList[0]._40HQ,
//              "_2x20GP": this.form.cqdVoList[0]._2x20GP,
//              "_2x20HQ": this.form.cqdVoList[0]._2x20HQ
//          }
//      ]
            let params = {
              id: this.form.id,
              remark: this.form.remark,
              validityStartDate: this.form.validityStartDate,
              validityEndDate: this.form.validityEndDate,
              cqdVoList: cqdVoList,
              harborId: this.form.harborId,
              regionCode: this.form.regionCode,
              customerId: this.form.customerId,
              isInvoice: this.form.isInvoice
            }

            this.updateCustomprice({data: JSON.stringify(params)}).then(res => {
              console.log("_______________________" + res);
              if (res.success) {
                this.$refs['form'].resetFields();
                this.newCustompricedialogVisible = false;
                this.getCustompriceList();
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
              } else {
                this.newCustompricedialogVisible = false;
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            });

          }
        })
        /*       this.$refs.form.validate((valid) => {
         if(valid){
         this.$confirm('确定更新船公司？').then(()=>{
         this.updateShipcompany(this.form).then(res =>{
         if(res.success){
         this.$refs['form'].resetFields()
         this.newShipcompanydialogVisible = false;
         this.getShipcompanyList()
         this.$message({
         message:'更新成功',
         type:'success'
         })
         }else{
         this.newShipcompanydialogVisible = false;
         this.$message({
         message:'更新失败',
         type:'error'
         })
         }
         });
         })
         }

         })*/
      }
    },

    watch: {
      detail(val){
        console.log(val, '----val---');
        Object.assign(this.form, val);
        this.form.validityStartDate = new Date(this.form.validityStartDate)
        //console.log(this.form,"=this.form");
        this.splitRegionCode();
        if (this.form.disabled) {
          this.form.disabled = "是"
        } else {
          this.form.disabled = "否"
        }
      }
    },
    created(){
      //this.returnshow()
      //this.RegionBelongPList()
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>

<style>
  #customPriceUpdate_form .vn-input-width{
    width: 32% !important;
  }
  #customPriceUpdate_form .vn-input-width2{
    width: 71.5% !important;
    padding-left: 120px !important;
  }
  #customPriceUpdate_form .vn-input-width3{
    width: 28.5% !important;
  }
  #customPriceUpdate_form .my-el-form-item__error .el-form-item__error{
    margin-left:82px;
  }


  .validateTipsEdit {
    position: absolute;
    top: 27px;
    left: 81px;
    font-size: 12px;
    color: #ff4949;
  }
</style>

