<template>
  <el-dialog id="centerDialogSaveCustomPrice" title="新增客户报价信息" v-model="newCustompricedialogVisible" :beforeClose="resetFormData" class="custom_save_windown">
    <el-form ref="form" :rules="addFormRules" :model="form" label-width="100px">

      <el-row :gutter="300" class="news_list_width three_special_width">
        <el-col :span="2">
          <el-form-item label="港口" prop="harborId">
            <el-select clearable filterable default-first-option v-model="form.harborId" placeholder="请选择港口" class='control-width' @change="handleHarborChange">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in harborBelongListByOrgCode"
                         :label="item.harborName+'('+(item.harborCode)+')'"
                         :value="item.harborId"
                         :key="item.harborId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="300" class="news_list_width three_special_width">
        <el-col :span="2">
          <el-form-item label="客户名称" prop="customerId">
            <el-select clearable filterable default-first-option v-model="form.customerId" placeholder="请选择用户" class='control-width'>
              <el-option value="">请选择</el-option>
              <el-option v-for="item in customListInCustom"
                         :label="item.customerName+'('+(item.customerCode)+')'"
                         :value="item.customerId"
                         :key="item.customerId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="300" class="news_list_width three_special_width">
        <el-col :span="2">
          <el-form-item class="vn-label-padding" label="船公司" label-width="70px" prop="shipCompanyId" >
            <el-select clearable filterable default-first-option v-model="form.shipCompanyId" placeholder="请选择船公司" class='control-width' style="width: 144px;">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in allshipcompanyList"
                         :label="item.shipCompanyName+'('+(item.shipCompanyCode)+')'"
                         :value="item.shipCompanyId"
                         :key="item.shipCompanyId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="200" class="news_list_width news_special_width">
        <el-col :span="2">
          <el-form-item label="地区" prop="regionOne" style="display: inline-block;">
            <el-select class='control-width' style="width: 143px;"
              clearable filterable default-first-option
              v-model="form.regionOne"
              placeholder="请选择"
              @change="changeRegionOne">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongPList.data"
                         :label="item.regionName+'('+(item.regionQrycode)+')'"
                         :value="item.regionCode "
                         :key="item.regionCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" label-width="0" prop="regionTow" style="display: inline-block;">
            <el-select class='control-width' style="width: 143px;"
                   clearable filterable default-first-option
                   v-model="form.regionTow"
                   placeholder="请选择"
                   @change="changeRegionTow">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongCityData"
                         :label="item.text"
                         :value="item.value"
                         :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" label-width="0" prop="regionThird" style="display: inline-block;">
            <el-select class='control-width' style="width: 143px;"
               clearable filterable default-first-option
               v-model="form.regionThird"
               placeholder="请选择"
               @change="changeRegionThird">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongDistrictData "
                         :label="item.text"
                         :value="item.value"
                         :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" label-width="0" prop="regionFourth" style="display: inline-block;">
            <el-select class='control-width' style="width: 143px;"
                 clearable filterable default-first-option
                 v-model="form.regionFourth"
                 placeholder="请选择"
                 @change="changeRegionFourth">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongStreetData"
                         :label="item.text"
                         :value="item.value"
                         :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <!--<el-col :span="2" >-->
          <!--<el-form-item label="" prop="regionTow">-->
            <!--<el-select class='control-width'-->
              <!--clearable filterable default-first-option-->
              <!--v-model="form.regionTow"-->
              <!--placeholder="请选择"-->
              <!--@change="changeRegionTow">-->
              <!--<el-option value="">请选择</el-option>-->
              <!--<el-option v-for="item in regionBelongCityData"-->
                <!--:label="item.text"-->
                <!--:value="item.value"-->
                <!--:key="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>

      <!--<el-row :gutter="200" class="news_list_width news_special_width">-->
        <!--<el-col :span="2">-->
          <!--<el-form-item label="" prop="regionThird">-->
            <!--<el-select class='control-width'-->
              <!--clearable filterable default-first-option-->
              <!--v-model="form.regionThird"-->
              <!--placeholder="请选择"-->
              <!--@change="changeRegionThird">-->
              <!--<el-option value="">请选择</el-option>-->
              <!--<el-option v-for="item in regionBelongDistrictData "-->
                <!--:label="item.text"-->
                <!--:value="item.value"-->
                <!--:key="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="2">-->
          <!--<el-form-item label="" prop="regionFourth">-->
            <!--<el-select class='control-width'-->
              <!--clearable filterable default-first-option-->
              <!--v-model="form.regionFourth"-->
              <!--placeholder="请选择"-->
              <!--@change="changeRegionFourth">-->
              <!--<el-option value="">请选择</el-option>-->
              <!--<el-option v-for="item in regionBelongStreetData"-->
                <!--:label="item.text"-->
                <!--:value="item.value"-->
                <!--:key="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->








      <el-row :gutter="300" class="news_list_width four_special_width">
        <el-col :span="2">
          <el-form-item label="是否专票" prop="isInvoice">
            <el-select clearable filterable default-first-option v-model="form.isInvoice" placeholder="是否专票" class='control-width'>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60" class="news_list_width five_special_width">
        <el-col class="special_el-col second_special_el-col" style="width:62% !important;">
          <el-form-item label="生效日期" prop="validityStartDate">
            <el-date-picker type="date" placeholder="生效日期" v-model="form.validityStartDate" @change="checkDate"></el-date-picker>
            <div v-show="validateTipsVisible" class="validateTips">生效日期小于当前日期</div>
          </el-form-item>
        </el-col>


        <el-col class="special_el-col three_special_el-col">
          <el-form-item prop="validityEndDate" label-width="0">
            <el-date-picker type="date" placeholder="失效日期" v-model="form.validityEndDate">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>



      <el-row :gutter="300" class="news_list_width news_special_width second_special_width">
        <el-col :span="2" class="special_el-col second_special_el-col">
          <el-form-item label="拖车费:20GP" prop="Z_20GP">
            <el-input v-model="form.Z_20GP" name="Z_20GP" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="2" class="special_el-col three_special_el-col ">
          <el-form-item label-width="0" prop="S_20GP">
            <el-input v-model="form.S_20GP" name="S_20GP" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="300" class="news_list_width news_special_width second_special_width">
        <el-col :span="2" class="special_el-col second_special_el-col">
          <el-form-item label="拖车费:20HQ" prop="Z_20HQ">
            <el-input v-model="form.Z_20HQ" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="special_el-col three_special_el-col">
          <el-form-item label-width="0" prop="S_20HQ">
            <el-input v-model="form.S_20HQ" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="300" class="news_list_width news_special_width second_special_width">
        <el-col :span="2" class="special_el-col second_special_el-col">
          <el-form-item label="拖车费:40GP" prop="Z_40GP">
            <el-input v-model="form.Z_40GP" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="special_el-col three_special_el-col">
          <el-form-item label-width="0" prop="S_40GP">
            <el-input v-model="form.S_40GP" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="300" class="news_list_width news_special_width second_special_width">
        <el-col :span="2" class="special_el-col second_special_el-col">
          <el-form-item label="拖车费:40HQ" prop="Z_40HQ">
            <el-input v-model="form.Z_40HQ" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="special_el-col three_special_el-col">
          <el-form-item label-width="0" prop="S_40HQ">
            <el-input v-model="form.S_40HQ" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="300" class="news_list_width news_special_width second_special_width" >
        <el-col :span="2" class="special_el-col second_special_el-col">
          <el-form-item label="拖车费:2*20GP" prop="Z_2x20GP" class="text_bo_bo">
            <el-input v-model="form.Z_2x20GP" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="special_el-col three_special_el-col">
          <el-form-item label-width="0" prop="S_2x20GP">
            <el-input v-model="form.S_2x20GP" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="300" class="news_list_width news_special_width second_special_width">
        <el-col :span="2" class="special_el-col second_special_el-col">
          <el-form-item label="拖车费:2*20HQ" prop="Z_2x20HQ" class="text_bo_bo">
            <el-input v-model="form.Z_2x20HQ" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="2" class="special_el-col three_special_el-col">
          <el-form-item label-width="0" prop="S_2x20HQ">
            <el-input v-model="form.S_2x20HQ" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="300" class="news_list_width news_special_width" >
        <el-col :span="2">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" style="width: 94.5%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

        <!-- <el-form-item label="是否禁用" prop="disabled">
        <el-radio-group v-model="form.disabled" >
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0" selected>否</el-radio>
        </el-radio-group>
          </el-form-item>  -->

      <el-row :gutter="300" class="">
        <el-col :span="24">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="primary" @click="onSubmitSave">提交保留地址</el-button>
            <el-button type="primary" @click="onSubmitAgin">提交再录入</el-button>
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

  /*二次修改*/
  .custom_save_windown .el-dialog{
    /*border: 1px solid red;*/
    min-width:760px;
  }
  .custom_save_windown .el-dialog .el-dialog__body .news_list_width{
    width: 45%;
    /*outline: 1px solid royalblue;*/
    margin:0!important;
    display: inline-block;
  }
  .custom_save_windown .el-dialog .el-dialog__body .news_special_width{
    width:100%!important;
  }
  .custom_save_windown .el-dialog .el-dialog__body .second_special_width{
    width:48%!important;
  }
  .custom_save_windown .el-dialog .el-dialog__body .three_special_width{
    width:32%!important;
  }
  .custom_save_windown .el-dialog .el-dialog__body .four_special_width{
    width:35%!important;
  }
  .custom_save_windown .el-dialog .el-dialog__body .five_special_width{
    width:60%!important;
  }



  .news_list_width .el-col{
    padding: 0 !important;
    /*outline: 2px solid #99ff62;*/
  }

.news_list_width .el-col-2{
    width:100%!important;
  }
  .news_list_width .special_el-col{
    width:50%!important;
  }
  .news_list_width .second_special_el-col{
    width:65%!important;
    }
  .news_list_width .three_special_el-col{
    width:35%!important;
  }
  .news_special_width .el-form-item__content{
    margin-left: 100px;
    /*border: 2px solid #cafff0;*/
    width: 86%;
  }

  .second_special_width .el-form-item__content{
    margin-left: 100px;
    /*border: 2px solid #cafff0;*/
    width:60%;
  }
  .second_special_width .el-form-item__content .el-input {
    width: 110px;
  }
  .custom_save_windown .el-dialog .el-dialog__body .five_special_width .el-date-editor.el-input {
    width: 160px;
  }



  /*.custom_save_windown .news_list_width .el-form-item__content .el-select{*/
    /*outline: 1px solid rgba(153, 255, 98, 0.83);*/
    /*width: 65%;*/
  /*}*/
  /*.custom_save_windown .news_special_width .el-form-item__content .el-select{*/
    /*outline: 1px solid rgba(153, 255, 98, 0.83);*/
    /*width: 21%;*/
  /*}*/

  /*.custom_save_windown .news_list_width .el-form-item__content .el-select .el-input{*/
    /*width: 100%!important;*/
  /*}*/




</style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  //import {mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import util from '../../../common/js/util'


  export default {
    mixins: [pagination],
    props: {
      label: {},
    },
    components: {},
    data() {
      const validateDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('生效日期不能为空'));
        }
        let value_date = new Date(value);
        const now = new Date();
        const y = value_date.getFullYear();
        const m = value_date.getMonth();
        const d = value_date.getDate();
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
        addFormRules: {
          harborId: [{required: true, message: '请选择港口', trigger: 'blur,change'}],
          regionOne: [{required: true, message: '请选择地区', trigger: 'blur,change'}],
          regionFourth: [{required: true, message: '必须录入四级地址', trigger: 'blur,change'}],
          customerId: [{required: true, message: '请选择用户', trigger: 'blur,change'}],
          isInvoice: [{required: true, message: '请选择是否开发票', trigger: 'blur,change'}],
          validityStartDate: [{type: 'date', required: true, message: '请选择日期', trigger: 'blur,change'}],
//          validityStartDate: [
//            {validator: validateDate, trigger: 'blur, change'}
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

        // detail: {},
        // addressSelectedArr: {
        //   regionOne: '',
        //   regionTow: '',
        //   regionThird: '',
        //   regionFourth: ''
        // },

        regionBelongCityData: [],
        regionBelongDistrictData: [],
        regionBelongStreetData: [],

        form: {
          regionOne: '',
          regionTow: '',
          regionThird: '',
          regionFourth: '',
          harborId: '',
          customerId: '',
          regionId: '',
          regionCode: '',
          remark: '',
          shipCompanyId: '',
          validityStartDate: new Date(),
//        validityStartDate: '',
          validityEndDate: '',
          isInvoice: '1',
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
          S_2x20HQ: '',
          selectedRegion: '',
          selectedRegionSecond: '',
          selectedRegionThird: '',
          selectedRegionFourth: '',
          regionName1: '',
          regionName2: '',
          regionName3: '',
          regionName4: '',
          regionName: '',
        }

      }
    },

     watch: {
//       detail(val){
//         // this.form.harborId = val.harborId;
//         // this.form.customerId = val.customerId;
//         this.form.regionCode =  val.regionCode;
//         this.form.validityStartDate =  val.validityStartDate;
//         this.splitRegionCode();
//         if (this.form.disabled) {
//           this.form.disabled = "是"
//         } else {
//           this.form.disabled = "否"
//         }
//       }
       'form.customerId' (newValue) {
         if (!newValue) {
           return ;
         }
         for (let i = 0, len = this.customListInCustom.length; i < len; i++) {
           let item = this.customListInCustom[i];

           if (item.customerId === newValue && /普票/.test(item.customerName)) {
             this.form.isInvoice = '0';
             break;
           } else {
             this.form.isInvoice = '1'
           }
         }
       }
     },

    computed: {
      ...mapGetters([
        'harborBelongListByOrgCode',
        'getHarborBelongListByOrgCode',
        'customListInCustom',
        'regionBelongPList',
        'allshipcompanyList',
      ])
    },

    methods: {
      ...mapActions([
        'getCustompriceList',
        'saveCustomprice',
        'getRegionListByRegionCode',
        'getCustomListInCustom'
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
//        console.log(value)
//        console.log(typeof value)
//        console.log(this.form.validityStartDate)
//        console.log(typeof this.form.validityStartDate)
      },

      handleHarborChange(val) {
        for(let i = 0; i < this.harborBelongListByOrgCode.length; i++) {
          if (this.harborBelongListByOrgCode[i].harborId === val) {
            this.form.harborName = this.harborBelongListByOrgCode[i].harborName;
            break;
          }
        }
      },

      test(){
        //console.log(this.form.harborname),
        //console.log(this.form.shipCompanyName),
        //console.log(this.form.customerName)
      },
      debugInfo() {
        // console.log(this.regionBelongCityData);
        // console.log(this.regionBelongDistrictData);
        // console.log(this.regionBelongStreetData);
        console.log(this.form.regionOne+', '+this.form.regionTow+', '+this.form.regionThird);
        // console.log(this.addressSelectedArr.regionOne+', '+this.addressSelectedArr.regionTow+', '+this.addressSelectedArr.regionThird);
      },

      splitRegionCode() {
        let param1 = {regionCode: this.form.regionOne}
        this.getRegionListByRegionCode(param1).then((res) => {
          console.log('splitRegionCode-1()');
          this.regionBelongCityData = res.data
        })
        let param2 = {regionCode: this.form.regionTow}
        this.getRegionListByRegionCode(param2).then((res) => {
          console.log('splitRegionCode-2()');
          this.regionBelongDistrictData = res.data
        })
        let param3 = {regionCode: this.form.regionThird}
        this.getRegionListByRegionCode(param3).then((res) => {
          console.log('splitRegionCode-3()');
          this.regionBelongStreetData = res.data
        })
      },

      // splitRegionCode(){
      //   let regionCode = typeof(this.form.regionCode) == "undefined" ? "" : this.form.regionCode
      //   this.addressSelectedArr.regionOne = regionCode.substring(0, 2)
      //   this.addressSelectedArr.regionTow = regionCode.substring(0, 4)
      //   this.addressSelectedArr.regionThird = regionCode.substring(0, 6)
      //   this.addressSelectedArr.regionFourth = regionCode

      //   let param1 = {regionCode: this.addressSelectedArr.regionOne}
      //   this.getRegionListByRegionCode(param1).then((res) => {
      //     console.log('splitRegionCode-1()');
      //     this.debugInfo();
      //     this.regionBelongCityData = res.data
      //   })
      //   let param2 = {regionCode: this.addressSelectedArr.regionTow}
      //   this.getRegionListByRegionCode(param2).then((res) => {
      //     console.log('splitRegionCode-2()');
      //     this.debugInfo();
      //     this.regionBelongDistrictData = res.data
      //   })
      //   let param3 = {regionCode: this.addressSelectedArr.regionThird}
      //   this.getRegionListByRegionCode(param3).then((res) => {
      //     console.log('splitRegionCode-3()');
      //     this.debugInfo();
      //     this.regionBelongStreetData = res.data
      //   })
      // },

      changeRegionOne(val){
        console.log('changeRegionOne(): ' + val);
      	// debugger;
        this.form.regionOne = val
        // this.addressSelectedArr.regionOne = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongCityData = res.data
          this.regionBelongDistrictData = this.regionBelongStreetData = []
          // this.form.regionTow = ""
          // this.form.regionThird = ""
          // this.form.regionFourth = ""
          // this.addressSelectedArr.regionTow = ""
          // this.addressSelectedArr.regionThird = ""
          // this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionTow(val){
        console.log('changeRegionTwo(): ' + val);
        this.form.regionTow = val;
        // this.addressSelectedArr.regionTow = val;
        // console.log(this.addressSelectedArr.regionTow);
        let param = {regionCode: val};
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongDistrictData = res.data;
          this.regionBelongStreetData = [];
          // this.form.regionThird = "";
          // this.form.regionFourth = "";
          // this.addressSelectedArr.regionThird = "";
          // this.addressSelectedArr.regionFourth = "";
        })
      },

      changeRegionThird(val){
        console.log('changeRegionThree(): ' + val);
        this.form.regionThird = val
        // this.addressSelectedArr.regionThird = val
        // console.log(this.addressSelectedArr.regionThird);
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongStreetData = res.data
          // this.form.regionFourth = ""
          // this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionFourth(val){
        console.log('changeRegionFourth(): ' + val);
        this.form.regionFourth = val
      },

      getList(){
        let param = Object.assign(this.paginationParams(), this.form)
      },

      closeDialog(){
        this.newCustompricedialogVisible = false;
        this.$refs['form'].resetFields();
      },
      resetFormData() {
        this.newCustompricedialogVisible = false;
        this.$refs['form'].resetFields();
      },

//    提交
      onSubmit() {
        //alert('submit begin')
        this.addFormRules.regionFourth[0].required = true;
        var temp;
        if (this.form.regionTow == "") {
          temp = this.form.regionOne;
        } else if (this.form.regionThird == "") {
          temp = this.form.regionTow;
        } else if (this.form.regionFourth == "") {
          temp = this.form.regionThird;
        } else {
          temp = this.form.regionFourth;
        }
        this.form.regionCode = temp;

//        console.log(this.form.validityStartDate)
//        console.log(typeof this.form.validityStartDate)
        this.$refs.form.validate((valid) => {
          if (valid) {
//            console.log('validate pass')
//            this.form.validityStartDate = (typeof(this.form.validityStartDate) == "string" ? this.form.validityStartDate : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd hh:mm:ss'));
            this.form.validityStartDate = (typeof(this.form.validityStartDate) == "string" ? this.form.validityStartDate : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd 00:00:00'));
            if (this.form.validityEndDate) {
              this.form.validityEndDate = (typeof(this.form.validityEndDate) == "string" ? this.form.validityEndDate : util.formatDate.format(this.form.validityEndDate, 'yyyy-MM-dd 00:00:00'));
            }
            let cqdVoList = [
              {
                "transportType": 1,
                "_20GP": this.form.S_20GP,
                "_20HQ": this.form.S_20HQ,
                "_40GP": this.form.S_40GP,
                "_40HQ": this.form.S_40HQ,
                "_2x20GP": this.form.S_2x20GP,
                "_2x20HQ": this.form.S_2x20HQ
              },
              {
                "transportType": 0,
                "_20GP": this.form.Z_20GP,
                "_20HQ": this.form.Z_20HQ,
                "_40GP": this.form.Z_40GP,
                "_40HQ": this.form.Z_40HQ,
                "_2x20GP": this.form.Z_2x20GP,
                "_2x20HQ": this.form.Z_2x20HQ
              }
            ]
            //alert('submit before assign')
            Object.assign(this.form, {cqdVoList: cqdVoList});
            //alert('submit before request')
            this.saveCustomprice({data: JSON.stringify(this.form)}).then(res => {
              if (res.success) {
                this.$refs['form'].resetFields()
                this.newCustompricedialogVisible = false;
                this.getCustompriceList()
                this.$message({
                  message: '新增成功',
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
      },

//      提交保留地址
      onSubmitSave() {
        this.addFormRules.regionFourth[0].required = true;
        var temp;
        //debugger;
        if (this.form.regionTow == "") {
          temp = this.form.regionOne;
        } else if (this.form.regionThird == "") {
          temp = this.form.regionTow;
        } else if (this.form.regionFourth == "") {
          temp = this.form.regionThird;
        } else {
          temp = this.form.regionFourth;
        }
        //regionId   regionIdt   temp
        this.form.regionCode = temp;

        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.validityStartDate = (typeof(this.form.validityStartDate) == "string" ? this.form.validityStartDate : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd 00:00:00'));
            if (this.form.validityEndDate) {
              this.form.validityEndDate = (typeof(this.form.validityEndDate) == "string" ? this.form.validityEndDate : util.formatDate.format(this.form.validityEndDate, 'yyyy-MM-dd 00:00:00'));
            }

             let cqdVoList = [
               {
                 "transportType": 1,
                 "_20GP": this.form.S_20GP,
                 "_20HQ": this.form.S_20HQ,
                 "_40GP": this.form.S_40GP,
                 "_40HQ": this.form.S_40HQ,
                 "_2x20GP": this.form.S_2x20GP,
                 "_2x20HQ": this.form.S_2x20HQ
               },
               {
                 "transportType": 0,
                 "_20GP": this.form.Z_20GP,
                 "_20HQ": this.form.Z_20HQ,
                 "_40GP": this.form.Z_40GP,
                 "_40HQ": this.form.Z_40HQ,
                 "_2x20GP": this.form.Z_2x20GP,
                 "_2x20HQ": this.form.Z_2x20HQ
               }
             ]
//            let reset_cqdVoList = [
//              {
//                "transportType": 1,
//                "_20GP": '',
//                "_20HQ": '',
//                "_40GP": '',
//                "_40HQ": '',
//                "_2x20GP": '',
//                "_2x20HQ": ''
//              },
//              {
//                "transportType": 0,
//                "_20GP": '',
//                "_20HQ": '',
//                "_40GP": '',
//                "_40HQ": '',
//                "_2x20GP": '',
//                "_2x20HQ": ''
//              }
//            ]
            Object.assign(this.form, {cqdVoList: cqdVoList});
            this.saveCustomprice({data: JSON.stringify(this.form)}).then(res => {
              if (res.success) {
//                this.$refs['form'].resetFields()

                this.form.Z_20GP = ''
                this.form.Z_2x20GP =  ''
                this.form.Z_40GP = ''
                this.form.Z_40HQ = ''
                this.form.Z_20HQ =  ''
                this.form.Z_2x20HQ =  ''
                this.form.S_20GP =  ''
                this.form.S_2x20GP =  ''
                this.form.S_40GP =  ''
                this.form.S_40HQ =  ''
                this.form.S_20HQ =  ''
                this.form.S_2x20HQ =  ''



                console.log(this.form)
                this.newCustompricedialogVisible = true;
                this.getCustompriceList()
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
              } else {
                this.newCustompricedialogVisible = false;
                this.$message({
                  message: '新增失败，' + res.message,
                  type: 'error'
                })
              }
            });
          }
        })
      },

//      提交再录入
      onSubmitAgin() {
//        this.addFormRules.regionFourth[0].required = false;
        // addFormRules: {
        //   regionFourth: [{required: true, message: '必须录入四级地址', trigger: 'blur,change'}]
        // },
        var temp;
        //debugger;
        if (this.form.regionTow == "") {
          temp = this.form.regionOne;
        } else if (this.form.regionThird == "") {
          temp = this.form.regionTow;
        } else if (this.form.regionFourth == "") {
          temp = this.form.regionThird;
        } else {
//          temp = this.form.regionThird;
          temp = this.form.regionFourth;
        }
        //regionId   regionIdt   temp
        this.form.regionCode = temp;

        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.validityStartDate = (typeof(this.form.validityStartDate) == "string" ? this.form.validityStartDate : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd 00:00:00'));
            if (this.form.validityEndDate) {
              this.form.validityEndDate = (typeof(this.form.validityEndDate) == "string" ? this.form.validityEndDate : util.formatDate.format(this.form.validityEndDate, 'yyyy-MM-dd 00:00:00'));
            }
            let cqdVoList = [
              {
                "transportType": 1,
                "_20GP": this.form.S_20GP,
                "_20HQ": this.form.S_20HQ,
                "_40GP": this.form.S_40GP,
                "_40HQ": this.form.S_40HQ,
                "_2x20GP": this.form.S_2x20GP,
                "_2x20HQ": this.form.S_2x20HQ
              },
              {
                "transportType": 0,
                "_20GP": this.form.Z_20GP,
                "_20HQ": this.form.Z_20HQ,
                "_40GP": this.form.Z_40GP,
                "_40HQ": this.form.Z_40HQ,
                "_2x20GP": this.form.Z_2x20GP,
                "_2x20HQ": this.form.Z_2x20HQ
              }
            ]
            Object.assign(this.form, {cqdVoList: cqdVoList});
            // this.form.regionFourth = '';
            this.saveCustomprice({data: JSON.stringify(this.form)}).then(res => {
              if (res.success) {
//                this.$refs['form'].resetFields()
                this.form.regionFourth = '';
//                this.newCustompricedialogVisible = false;
                this.getCustompriceList()
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
              } else {
                this.newCustompricedialogVisible = false;
                this.$message({
                  message: '新增失败，' + res.message,
                  type: 'error'
                })
              }
            });
          }
        })
      }
    },

    created(){
      //this.$store.dispatch('getCustomListInCustom');
    },

    mounted(){
      console.log(this.page)
    }
  }
</script>

<style>
  .vn-label-padding label {
    padding-right: 5px;
  }

  .validateTips {
    position: absolute;
    top: 27px;
    left: 0;
    font-size: 12px;
    color: #ff4949;
  }
</style>
