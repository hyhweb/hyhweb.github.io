<template>
    <el-dialog class="trail_updata_windown" id="centerDialogUpdate" title="编辑拖车报价信息"
                v-model="newTrailerpricedialogVisible">

        <el-form ref="form" :rules="updateFormRules" :model="form"  label-width="80px">
          <el-row :gutter="212"  class="trailsupdata_list_width trailsupdata_list6_width">
            <el-col :span="2">
              <el-form-item label="港口" prop="harborId">
                <el-select filterable v-model="form.harborId" placeholder="请选择港口" class='control-width' disabled @change="handleHarborChange">
                  <el-option v-for="item in harborBelongList"
                              :label="item.harborName"
                              :value="item.harborId"
                              :key="item.harborId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="290" class="trailsupdata_list_width trailsupdata_list3_width">
            <el-col :span="2" class="trailsupdata_el-col_width trailsupdata_el-col2_width">
              <el-form-item label="生效日期" prop="validityStartDate">
                <el-date-picker
                  @change="validityStartDateHandle"
                  type="date"
                  placeholder="生效日期"
                  v-model="form.validityStartDate"
                  style="width:160px"
                  :default-value="currentTime">
                </el-date-picker>
                <div v-show="validateTipsVisible" class="validateTipsEdit">生效日期小于当前日期</div>
              </el-form-item>
            </el-col>

            <el-col :span="2" class="trailsupdata_el-col_width trailsupdata_el-col3_width">
              <el-form-item  prop="validityEndDate" label-width="0">
                <el-date-picker
                  @change="validityEndDateHandle"
                  type="datetime"
                  placeholder="失效日期"
                  v-model="form.validityEndDate"
                  style="width:160px"
                  class="today_bo_bo"
                  :default-value="currentTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="212" class="trailsupdata_list_width trailsupdata_list2_width">
            <el-col :span="2">
              <el-form-item label="地区" prop="regionOne">
                <el-select
                  disabled
                  v-model="addressSelectedArr.regionOne"
                  placeholder="请选择"
                  @change="changeRegionOne">
                  <el-option v-for="item in regionBelongPList.data"
                            :label="item.regionName"
                            :value="item.regionCode "
                            :key="item.regionCode">
                  </el-option>
                </el-select>

                <el-select
                  disabled
                  filterable
                  v-model="addressSelectedArr.regionTow"
                  placeholder="请选择"
                  @change="changeRegionTow">
                  <el-option
                    v-for="item in regionBelongCityData"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>

                <el-select
                  disabled
                  filterable
                  v-model="addressSelectedArr.regionThird"
                  placeholder="请选择"
                  @change="changeRegionThird">
                  <el-option
                    v-for="item in regionBelongDistrictData "
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>

                <el-select
                  disabled
                  filterable
                  v-model="addressSelectedArr.regionFourth"
                  placeholder="请选择"
                  @change="changeRegionFourth">
                  <el-option
                    v-for="item in regionBelongStreetData"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>



          <el-row :gutter="212" class="trailsupdata_list_width ">
            <el-col :span="2" class="trailsupdata_el-col4_width">
              <el-form-item label="拖车费:20GP" prop="Z_20GP">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.Z_20GP" placeholder="装货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" class="trailsupdata_el-col5_width">

              <el-form-item label="" prop="S_20GP">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.S_20GP" placeholder="送货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row :gutter="212" class="trailsupdata_list_width trailsupdata_list7_width">
            <el-col :span="2" class="trailsupdata_el-col4_width">

              <el-form-item label="拖车费:2*20GP" prop="Z_2x20GP">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.Z_2x20GP" placeholder="装货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" class="trailsupdata_el-col5_width">

              <el-form-item label="" prop="S_2x20GP">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.S_2x20GP" placeholder="送货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row :gutter="212" class="trailsupdata_list_width">
            <el-col :span="2" class="trailsupdata_el-col4_width">

              <el-form-item label="拖车费:40GP" prop="Z_40GP">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.Z_40GP" placeholder="装货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" class="trailsupdata_el-col5_width">

              <el-form-item label="" prop="S_40GP">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.S_40GP" placeholder="送货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row :gutter="212" class="trailsupdata_list_width trailsupdata_list7_width">
            <el-col :span="2" class="trailsupdata_el-col4_width">

              <el-form-item label="拖车费:40HQ" prop="Z_40HQ">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.Z_40HQ" placeholder="装货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" class="trailsupdata_el-col5_width">

              <el-form-item label="" prop="S_40HQ">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.S_40HQ" placeholder="送货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row :gutter="212" class="trailsupdata_list_width">
            <el-col :span="2" class="trailsupdata_el-col4_width">

              <el-form-item label="拖车费:20HQ" prop="Z_20HQ">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.Z_20HQ" placeholder="装货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" class="trailsupdata_el-col5_width">

              <el-form-item label="" prop="S_20HQ">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.S_20HQ" placeholder="送货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
          </el-row>


          <el-row :gutter="212" class="trailsupdata_list_width trailsupdata_list7_width">
            <el-col :span="2" class="trailsupdata_el-col4_width">

              <el-form-item label="拖车费:2*20HQ" prop="Z_2x20HQ">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.Z_2x20HQ" placeholder="装货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" class="trailsupdata_el-col5_width">

              <el-form-item label="" prop="S_2x20HQ">
                <el-input v-if="form.tqdVoList != undefined"  v-model="form.S_2x20HQ" placeholder="送货价格" class='control-width'></el-input>
              </el-form-item>

            </el-col>
          </el-row>


          <el-row :gutter="212"  class="trailsupdata_list_width trailsupdata_list2_width" >
            <el-col :span="2">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" style="width:86%;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        <el-row :gutter="212" class="trailsupdata_list_width trailsupdata_list2_width">
          <el-col :span="2">
            <el-form-item class="el_form_width">
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
  </el-dialog>
</template>

<style  >
  .trail_updata_windown .el-dialog{
    /*border: 3px solid red;*/
    min-width:664px;
  }

  .trail_updata_windown .el-dialog .el-dialog__body .trailsupdata_list_width{
    width: 49%;
    /*outline: 2px solid royalblue;*/
    margin:0!important;
    display: inline-block;
  }
  .trail_updata_windown .el-dialog .el-dialog__body .trailsupdata_list2_width{
    width: 100%;
  }
  .trail_updata_windown .trailsupdata_list6_width{
    width: 35%!important;
  }
  .trail_updata_windown .trailsupdata_list6_width .control-width.el-select{
    width: 60%!important;
  }

  @media only screen and (max-width:1500px) {
    .trail_updata_windown .trailsupdata_list7_width{
      text-align: right;
    }
  }


  .trail_updata_windown .el-dialog .el-dialog__body .trailsupdata_list2_width .el-select{
    width: 21.2%;
  }

  .trail_updata_windown .trailsupdata_list_width .el-col{
    padding: 0 !important;
    /*outline: 2px solid #99ff62;*/
  }
  .trail_updata_windown .trailsupdata_list_width .el-col-2{
    width:100%!important;
  }
  .trail_updata_windown .trailsupdata_list3_width {
    width:64%!important;
  }
  .trail_updata_windown .trailsupdata_list3_width .trailsupdata_el-col2_width{
    width: 60%!important;
  }
  .trail_updata_windown .trailsupdata_list3_width .trailsupdata_el-col3_width{
    width: 40%!important;
  }
  .trail_updata_windown .trailsupdata_list3_width .trailsupdata_el-col2_width .el-input{
    width:60%!important;
  }


  .trail_updata_windown .trailsupdata_list_width .trailsupdata_el-col4_width{
    width: 60%!important;
  }
  .trail_updata_windown .trailsupdata_list_width .trailsupdata_el-col5_width{
    width: 40%!important;
  }

  .trail_updata_windown .control-width.el-input{
    width: 94px!important;
  }

  .trail_updata_windown .trailsupdata_list_width .el-form-item{
    width:100%!important;
    /*outline: 3px solid mediumvioletred;*/
  }
  .trail_updata_windown .trailsupdata_list_width .el-form-item__content{
    /*outline: 2px solid #3ac7c4;*/
   margin: 0!important;
    width:100%!important;
  }
  .trail_updata_windown .trailsupdata_list_width .el_form_width{
    width: 22%!important;
    margin: 0 auto;
  }

  .validateTipsEdit {
    position: absolute;
    top: 27px;
    left: 81px;
    font-size: 12px;
    color: #ff4949;
  }

</style>




<script>
    import {mapGetters,mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'


    export default {
        mixins:[pagination],
        components:{},
        data() {
            return {
                validateTipsVisible: false,
                newTrailerpricedialogVisible:false,
                currentTime:this.$global.currentTime,
                updateFormRules: {
                    regionCode: [
                        { required: true, message: '请输入地区代码',trigger:'blur,change' }
                    ],
                    regionName: [
                        { required: true, message: '请输入地区名称',trigger:'blur,change' }
                    ],
                    parentId: [
                        {  required: true, message: '请输入所属地区' }
                    ],
                    isEnd: [
                        { required: true, message: '请选择是否末级',trigger:'blur,change' }
                    ],
                  Z_20GP: [
                    {validator:this.$global.validate.number}
                  ],
                  S_20GP: [
                    {validator:this.$global.validate.number}
                  ],
                  Z_2x20GP: [
                    {validator:this.$global.validate.number}
                  ],
                  S_2x20GP: [
                    {validator:this.$global.validate.number}
                  ],
                  Z_40GP: [
                    {validator:this.$global.validate.number}
                  ],
                  S_40GP: [
                    {validator:this.$global.validate.number}
                  ],
                  Z_40HQ: [
                    {validator:this.$global.validate.number}
                  ],
                  S_40HQ: [
                    {validator:this.$global.validate.number}
                  ],
                  Z_20HQ: [
                    {validator:this.$global.validate.number}
                  ],
                  S_20HQ: [
                    {validator:this.$global.validate.number}
                  ],
                  Z_2x20HQ: [
                    {validator:this.$global.validate.number}
                  ],
                  S_2x20HQ: [
                    {validator:this.$global.validate.number}
                  ],
                },
                detail:{},
                second: false,
                third: false,
                fourth: false,
                regionList:this.allRegionList,
                addressSelectedArr:{
                    regionOne:'',
                    regionTow:'',
                    regionThird:'',
                    regionFourth:''
                },
                regionBelongCityData:[],
                regionBelongDistrictData:[],
                regionBelongStreetData:[],
                form: {
                    validityStartDate:'',
                    validityEndDate:'',
                    remark:'',
                    harborId: '',
                    customerId: '',
                    regionId:'',
                    shipCompanyId:'',
                    regionCode:'',
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
                    selectedRegion: '',
                    selectedRegionSecond: '',
                    selectedRegionThird: '',
                    selectedRegionFourth: '',
                    regionName1:'',
                    regionName2:'',
                    regionName3:'',
                    regionName4:'',
                    regionCode:'',
                    regionName:'',
                }
            }
        },
        computed:{
            ...mapGetters([
                'harborBelongList',
                'regionBelongPList',
                'regionBelongCList',
                'customList',
                'shipcompanyList',
                'addOrderAllList',
                'allRegionList'
            ]),
            currentRegionList(){
                return {
                    '1':this.regionBelongPList.data,
                    '2':[],
                    '3':[],
                    '4':[]
                }
            }
    },

    methods: {
    ...mapActions([
        'getShipcompanyList',
        'getTrailerpriceList',
        'saveCustomprice',
        'getCustomList',
        'HarborBelongList',
        'RegionBelongPList',
        'RegionBelongCList',
        'updateTrailerprice',
        'getCustomList',
        'getAllRegionByRegionCode',
        'getAreaInfoList'
        ]),

      handleHarborChange(val) {
        for(let i = 0; i < this.harborBelongList.length; i++) {
          if (this.harborBelongList[i].harborId === val) {
            this.form.harborName = this.harborBelongList[i].harborName;
            break;
          }
        }
      },

     //有效时间
      validityStartDateHandle(value){
      		this.form.validityStartDate = value

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
       validityEndDateHandle(val){
      		this.form.validityEndDate = val
      },
            getList(){
            let param = Object.assign(this.paginationParams(),this.form)
        },
        splitRegionCode(){

          this.form.Z_20GP=this.form.tqdVoList[0]._20GP == 0 ? "" : this.form.tqdVoList[0]._20GP;
          this.form.S_20GP=this.form.tqdVoList[1]._20GP == 0 ? "" : this.form.tqdVoList[1]._20GP;

          this.form.Z_2x20GP=this.form.tqdVoList[0]._2x20GP == 0 ? "" : this.form.tqdVoList[0]._2x20GP;
          this.form.S_2x20GP=this.form.tqdVoList[1]._2x20GP == 0 ? "" : this.form.tqdVoList[1]._2x20GP;

          this.form.Z_40GP=this.form.tqdVoList[0]._40GP == 0 ? "" : this.form.tqdVoList[0]._40GP;
          this.form.S_40GP=this.form.tqdVoList[1]._40GP == 0 ? "" : this.form.tqdVoList[1]._40GP;


          this.form.Z_40HQ=this.form.tqdVoList[0]._40HQ == 0 ? "" : this.form.tqdVoList[0]._40HQ;
          this.form.S_40HQ=this.form.tqdVoList[1]._40HQ == 0 ? "" : this.form.tqdVoList[1]._40HQ;

          this.form.Z_20HQ=this.form.tqdVoList[0]._20HQ == 0 ? "" : this.form.tqdVoList[0]._20HQ;
          this.form.S_20HQ=this.form.tqdVoList[1]._20HQ == 0 ? "" : this.form.tqdVoList[1]._20HQ;

          this.form.Z_2x20HQ=this.form.tqdVoList[0]._2x20HQ == 0 ? "" : this.form.tqdVoList[0]._2x20HQ;
          this.form.S_2x20HQ=this.form.tqdVoList[1]._2x20HQ == 0 ? "" : this.form.tqdVoList[1]._2x20HQ;


          let regionCode = typeof(this.form.regionCode)=="undefined"?"":this.form.regionCode
          this.addressSelectedArr.regionOne = regionCode.substring(0,2)
          this.addressSelectedArr.regionTow = regionCode.substring(0,4)
          this.addressSelectedArr.regionThird = regionCode.substring(0,6)
          this.addressSelectedArr.regionFourth = regionCode


          let param1 = {code: this.addressSelectedArr.regionOne}
          this.getAreaInfoList(param1).then((res) => {
            this.regionBelongCityData = res.data
        })

          let param2 = {code: this.addressSelectedArr.regionTow}
          this.getAreaInfoList(param2).then((res) => {
            this.regionBelongDistrictData = res.data
        })

          let param3 = {code: this.addressSelectedArr.regionThird}
          this.getAreaInfoList(param3).then((res) => {
            this.regionBelongStreetData = res.data
        })
//
//            let regionName = typeof(this.form.regionName) == "undefined" ? "" : this.form.regionName;
//
//            this.regionNameSplit = regionName.split(" ");
//
//
//            for (var i in this.regionNameSplit) {
//                if(i==0){
//                    this.addressSelectedArr.regionOne = this.regionNameSplit[i];
//                }
//                if(i==1){
//                    this.addressSelectedArr.regionTow = this.regionNameSplit[i];
//                }
//                if(i==2){
//                    this.addressSelectedArr.regionThird = this.regionNameSplit[i];
//                }
//                if(i==3){
//                    this.addressSelectedArr.regionFourth = this.regionNameSplit[i];
//                }
//
//
//            }


            /*      for(int i=0;i<regionNameSplit.length;i++){
             console.log(regionNameSplit[i]);
             }*/


//                let regionCode = typeof(this.form.regionCode)=="undefined"?"":this.form.regionCode
//                this.addressSelectedArr.regionOne = regionCode.substring(0,2)
//                this.addressSelectedArr.regionTow = regionCode.substring(0,4)
//                this.addressSelectedArr.regionThird = regionCode.substring(0,6)
//                this.addressSelectedArr.regionFourth = regionCode


//                //处理二级菜单
//                let param = {code:this.addressSelectedArr.regionTow}
//                this.getAreaInfoList(param).then((res)=> {
//                    this.regionBelongCityData = res.data
//
//                })
//
//                //处理三级菜单
//                let param2 = {code:this.addressSelectedArr.regionThird}
//                this.getAreaInfoList(param2).then((res)=> {
//                    this.regionBelongDistrictData = res.data
//
//                })
//                //处理四级菜单
//                let param3 = {code:this.addressSelectedArr.regionFourth}
//                this.getAreaInfoList(param3).then((res)=>{
//                    this.regionBelongStreetData = res.data
//
//                })


        },
        test(){
            console.log(this.form.harborname),
                console.log(this.form.shipCompanyName),
                console.log(this.form.customerName)
        },
//        splitRegionCode(){
//            let regionCode = typeof(this.form.regionCode)=="undefined"?"":this.form.regionCode
//            this.addressSelectedArr.regionOne = regionCode.substring(0,2)
//            this.addressSelectedArr.regionTow = regionCode.substring(0,4)
//            this.addressSelectedArr.regionThird = regionCode.substring(0,6)
//            this.addressSelectedArr.regionFourth = regionCode
//            //处理二级菜单
//            let param = {code:this.addressSelectedArr.regionTow}
//            this.getAreaInfoList(param).then((res)=> {
//                this.regionBelongDistrictData = res.data
//            })
//            //处理三级菜单
//            let param1 = {code:this.addressSelectedArr.regionThird}
//            this.getAreaInfoList(param1).then((res)=>{
//                this.regionBelongStreetData = res.data
//
//            })
//
//
//        },
        changeRegionOne(val){
//            this.second = true;
//            this.addressSelectedArr.regionOne = val
//            let param = {code:val}
//            this.getAreaInfoList(param).then((res)=>{
//              this.regionBelongCityData = res.data
//              this.regionBelongDistrictData=this.regionBelongStreetData=[]
//              this.addressSelectedArr.regionTow=""
//              this.addressSelectedArr.regionThird=""
//              this.addressSelectedArr.regionFourth=""
//          })
        },
        changeRegionTow(val){
//            this.addressSelectedArr.regionTow = val
//            let param = {code:val}
//            this.getAreaInfoList(param).then((res)=>{
//              this.regionBelongDistrictData = res.data
//              this.regionBelongStreetData=[]
//              this.addressSelectedArr.regionThird=""
//              this.addressSelectedArr.regionFourth=""
//          })
        },
        changeRegionThird(val){
//            this.addressSelectedArr.regionThird = val
//            let param = {code:val}
//            this.getAreaInfoList(param).then((res)=>{
//              this.regionBelongStreetData = res.data
//              this.addressSelectedArr.regionFourth=""
//          })
        },
        changeRegionFourth(val){
//            this.addressSelectedArr.regionFourth= val
        },
        selectRegion(val){
            //debugger;
            this.second = true;
            let param = {regionCode:val}
            this.getAllRegionByRegionCode(param).then((res)=>{
                console.log(res.data)
                this.regionBelongCityData=res.data
            })
            this.allRegionList.data.forEach((val,key)=>{
                if(val.value   === this.form.regionCode){
                    this.form.regionName1 = val.regionName
                }
            })
            this.form.selectedRegionSecond =""
        },
        selectRegionsecond(val){
            console.log(this.form.selectedRegionSecond)
            this.third = true;
            let param = {regionCode:val}
            this.getAllRegionByRegionCode(param).then((res)=>{
                console.log(res.data)
                this.regionBelongDistrictData=res.data

            })
            this.regionBelongCList.data.forEach((val,key)=>{
                if(val.regionId   === this.form.selectedRegionSecond){
                    this.form.regionName2 = val.regionName
                }
            })
            this.form.selectedRegionThird =""
        },
        closeDialog(){
            //debugger;
            this.newTrailerpricedialogVisible = false;
        },
        onSubmit() {
            var temp;
            //debugger;

            if(this.addressSelectedArr.regionTow==""){
                temp=this.addressSelectedArr.regionOne;
            }

            else if(this.addressSelectedArr.regionThird==""){
                temp=this.addressSelectedArr.regionTow;
            }
            else if(this.addressSelectedArr.regionFourth==""){
                temp=this.addressSelectedArr.regionThird;
            }
            else {
                temp=this.addressSelectedArr.regionFourth;
            }

            //regionId   regionIdt   temp
            this.form.regionCode=temp;

          if(typeof(this.form.validityStartDate)!="undefined"&&typeof(this.form.validityStartDate)!="") {
            //console.log("____3______________");
            this.form.validityStartDate = (typeof(this.form.validityStartDate) == "string" ? this.form.validityStartDate+" 00:00:00" : util.formatDate.format(this.form.validityStartDate, 'yyyy-MM-dd hh:mm:ss'));
          }else{
            this.form.validityStartDate ="";
          }
          if(typeof(this.form.validityEndDate)!="undefined"&&typeof(this.form.validityStartDate)!=""){
            //console.log("____4______________");
            this.form.validityEndDate = (typeof(this.form.validityEndDate) == "string" ? this.form.validityEndDate+" 00:00:00" : util.formatDate.format(this.form.validityEndDate, 'yyyy-MM-dd hh:mm:ss'));
          }else{
            this.form.validityEndDate="";
          }

//            let tqdVoList= [
//                {
//
//                    "transportType": 1,
//                    "_20GP": this.form.tqdVoList[1]._20GP,
//                    "_20HQ": this.form.tqdVoList[1]._20HQ,
//                    "_40GP": this.form.tqdVoList[1]._40GP,
//                    "_40HQ": this.form.tqdVoList[1]._40HQ,
//                    "_2x20GP": this.form.tqdVoList[1]._2x20GP,
//                    "_2x20HQ": this.form.tqdVoList[1]._2x20HQ
//                },
//                {
//                    "transportType": 0,
//                    "_20GP": this.form.tqdVoList[0]._20GP,
//                    "_20HQ": this.form.tqdVoList[0]._20HQ,
//                    "_40GP": this.form.tqdVoList[0]._40GP,
//                    "_40HQ": this.form.tqdVoList[0]._40HQ,
//                    "_2x20GP": this.form.tqdVoList[0]._2x20GP,
//                    "_2x20HQ": this.form.tqdVoList[0]._2x20HQ
//                }
//            ]
//          Object.assign(this.form,{tqdVoList:tqdVoList});
          this.form.tqdVoList[0]._20GP=this.form.Z_20GP;
          this.form.tqdVoList[1]._20GP=this.form.S_20GP;

          this.form.tqdVoList[0]._2x20GP=this.form.Z_2x20GP;
          this.form.tqdVoList[1]._2x20GP=this.form.S_2x20GP;

          this.form.tqdVoList[0]._40GP=this.form.Z_40GP;
          this.form.tqdVoList[1]._40GP=this.form.S_40GP;


          this.form.tqdVoList[0]._40HQ=this.form.Z_40HQ;
          this.form.tqdVoList[1]._40HQ=this.form.S_40HQ;

          this.form.tqdVoList[0]._20HQ=this.form.Z_20HQ;
          this.form.tqdVoList[1]._20HQ=this.form.S_20HQ;

          this.form.tqdVoList[0]._2x20HQ=this.form.Z_2x20HQ;
          this.form.tqdVoList[1]._2x20HQ=this.form.S_2x20HQ;


          let tqdVoList =this.form.tqdVoList

            this.updateTrailerprice({data:JSON.stringify(this.form)}).then(res =>{
                if(res.success){
                this.$refs['form'].resetFields()
                this.newTrailerpricedialogVisible = false;
                this.getTrailerpriceList()
                this.$message({
                    message:'更新成功',
                    type:'success'
                })
            }else{
                this.newTrailerpricedialogVisible = false;
                this.$message({
                    message:'更新失败',
                    type:'error'
                })
            }
        });

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
    watch:{
        detail(val){
            Object.assign(this.form,val)
            this.splitRegionCode()
//            console.log(this.form)
            if(this.form.disabled){
                this.form.disabled = "1"
            }else{
                this.form.disabled = "0"
            }
        }
    },
    created(){
        //this.splitRegionCode();
        this.RegionBelongPList()
    },
    mounted(){

        console.log(this.page)
    }
    }
</script>


