<template>
  <el-dialog id="centerDialogSave" title="新增报价" v-model="newTrailerpricedialogVisible" class="trail_save_windown">
    <el-form ref="form" :rules="addFormRules" :model="form" label-width="80px">

      <el-row :gutter="252" class="trailssave_list_width trailssave_list5_width">
        <el-col :span="2">
          <el-form-item label="港口" prop="harborId">
            <el-select  clearable filterable default-first-option
                        v-model="form.harborId" placeholder="请选择港口" class='control-width' @change="handleHarborChange">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in harborBelongListByOrgCode" :label="item.harborName+'('+(item.harborCode)+')'" :value="item.harborId"
                         :key="item.harborId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row :gutter="252"  class="trailssave_list_width trailssave_list4_width">
        <el-col :span="2" class="trailssave_el-col_width">
          <el-form-item label="生效日期" prop="validityStartDate">
            <el-date-picker
              @change="validityStartDateHandle"
              type="date"
              placeholder="生效日期"
              v-model="form.validityStartDate"
              style="width:160px"
              :default-value="currentTime">
            </el-date-picker>
            <div v-show="validateTipsVisible" class="validateTips">生效日期小于当前日期</div>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="trailssave_el-col2_width" >
          <el-form-item  prop="validityEndDate" label-width="0">
            <el-date-picker
              @change="validityEndDateHandle"
              type="date"
              placeholder="失效日期"
              v-model="form.validityEndDate"
              style="width:160px"
              class="today_bo_bo"
              :default-value="currentTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row :gutter="0"  class="trailssave_list_width trailssave_list2_width">
        <el-col :span="24">

          <el-form-item label="地区" prop="regionOne">
            <el-select
              clearable filterable default-first-option
              v-model="form.regionOne"
              placeholder="请选择"
              @change="changeRegionOne">
              <el-option value="">
                请选择
              </el-option>
              <el-option v-for="item in regionBelongPList.data"
                          :label="item.regionName+'('+(item.regionQrycode)+')'"
                          :value="item.regionCode "
                          :key="item.regionCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" label-width="0px" prop="regionTow">
            <el-select
              clearable filterable default-first-option
              v-model="form.regionTow"
              placeholder="请选择"
              @change="changeRegionTow">
              <el-option value="">
                请选择
              </el-option>
              <el-option
                v-for="item in regionBelongCityData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" label-width="0px" prop="regionThird">
            <el-select
              clearable filterable default-first-option
              v-model="form.regionThird"
              placeholder="请选择"
              @change="changeRegionThird">
              <el-option value="">
                请选择
              </el-option>
              <el-option
                v-for="item in  regionBelongDistrictData "
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" label-width="0px" prop="regionFourth">
            <el-select
              clearable filterable default-first-option
              v-model="form.regionFourth"
              placeholder="请选择"
              @change="changeRegionFourth">
              <el-option value="">
                请选择
              </el-option>
              <el-option
                v-for="item in regionBelongStreetData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>

        <!--<el-col :span="2"  class="trailssave_list_width">-->
        <!--<el-form-item label="" prop="regionTow">-->
        <!--<el-select-->
        <!--clearable filterable default-first-option-->
        <!--v-model="form.regionTow"-->
        <!--placeholder="请选择"-->
        <!--@change="changeRegionTow">-->
        <!--<el-option value="">-->
        <!--请选择-->
        <!--</el-option>-->
        <!--<el-option-->
        <!--v-for="item in regionBelongCityData"-->
        <!--:key="item.value"-->
        <!--:label="item.text"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>


      <!--<el-row :gutter="210"  class="trailssave_list_width">-->
      <!--<el-col :span="2">-->
      <!--<el-form-item label="" prop="regionThird">-->
      <!--<el-select-->
      <!--clearable filterable default-first-option-->
      <!--v-model="form.regionThird"-->
      <!--placeholder="请选择"-->
      <!--@change="changeRegionThird">-->
      <!--<el-option value="">-->
      <!--请选择-->
      <!--</el-option>-->
      <!--<el-option-->
      <!--v-for="item in  regionBelongDistrictData "-->
      <!--:key="item.value"-->
      <!--:label="item.text"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->

      <!--<el-col :span="2"  class="trailssave_list_width">-->
      <!--<el-form-item label="" prop="regionFourth">-->
      <!--<el-select-->
      <!--clearable filterable default-first-option-->
      <!--v-model="form.regionFourth"-->
      <!--placeholder="请选择"-->
      <!--@change="changeRegionFourth">-->
      <!--<el-option value="">-->
      <!--请选择-->
      <!--</el-option>-->
      <!--<el-option-->
      <!--v-for="item in regionBelongStreetData"-->
      <!--:key="item.value"-->
      <!--:label="item.text"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->



      <el-row :gutter="252"  class="trailssave_list_width trailssave_list7_width">
        <el-col :span="2" class="trailssave_el-col3_width">

          <el-form-item label="拖车费:20GP" prop="Z_20GP">
            <el-input v-model="form.Z_20GP" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="2"  class="trailssave_el-col4_width">

          <el-form-item label="" prop="S_20GP">
            <el-input v-model="form.S_20GP" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
      </el-row>



      <el-row :gutter="252"  class="trailssave_list_width trailssave_list7_width">
        <el-col :span="2" class="trailssave_el-col3_width">

          <el-form-item label="拖车费:20HQ" prop="Z_20HQ">
            <el-input v-model="form.Z_20HQ" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="2" class="trailssave_el-col4_width">

          <el-form-item label="" prop="S_20HQ" >
            <el-input v-model="form.S_20HQ" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
      </el-row>



      <el-row :gutter="252"  class="trailssave_list_width trailssave_list7_width">
        <el-col :span="2"  class="trailssave_el-col3_width">

          <el-form-item label="拖车费:40GP" prop="Z_40GP">
            <el-input v-model="form.Z_40GP" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="2" class="trailssave_el-col4_width">

          <el-form-item label="" prop="S_40GP">
            <el-input v-model="form.S_40GP" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row :gutter="252"  class="trailssave_list_width trailssave_list7_width">
        <el-col :span="2"  class="trailssave_el-col3_width">

          <el-form-item label="拖车费:40HQ" prop="Z_40HQ">
            <el-input v-model="form.Z_40HQ" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="2" class="trailssave_el-col4_width">

          <el-form-item label="" prop="S_40HQ">
            <el-input v-model="form.S_40HQ" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row :gutter="252"  class="trailssave_list_width trailssave_list7_width">
        <el-col :span="2" class="trailssave_el-col3_width">

          <el-form-item label="拖车费:2*20GP" prop="Z_2x20GP">
            <el-input v-model="form.Z_2x20GP" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col >
        <el-col :span="2" class="trailssave_el-col4_width">

          <el-form-item label="" prop="S_2x20GP">
            <el-input v-model="form.S_2x20GP" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row :gutter="252"  class="trailssave_list_width trailssave_list7_width">
        <el-col :span="2"  class="trailssave_el-col3_width">

          <el-form-item label="拖车费:2*20HQ" prop="Z_2x20HQ">
            <el-input v-model="form.Z_2x20HQ" placeholder="装货价格" class='control-width'></el-input>
          </el-form-item>


        </el-col>
        <el-col :span="2" class="trailssave_el-col4_width">

          <el-form-item label="" prop="S_2x20HQ">
            <el-input v-model="form.S_2x20HQ" placeholder="送货价格" class='control-width'></el-input>
          </el-form-item>

        </el-col>

      </el-row>

      <el-row :gutter="252"  class="trailssave_list2_width trailssave_list6_width">
        <el-col :span="2">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" style="width: 98.5%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="252"  class="trailssave_list2_width trailssave_list6_width" style="text-align: center;">
        <el-col :span="2">
          <el-form-item label-width="0">
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
  .trail_save_windown .el-dialog{
    /*border: 1px solid red;*/
    /*min-width:760px;*/
    min-width:664px;
  }
  .trail_save_windown .el-dialog .el-dialog__body .trailssave_list_width{
    width: 49%;
    /*outline: 1px solid royalblue;*/
    margin:0!important;
    display: inline-block;
  }
  .trail_save_windown .el-dialog .el-dialog__body .trailssave_list2_width{
    width: 100%!important;
  }
  .trail_save_windown .el-dialog .el-dialog__body .trailssave_list4_width{
    width:60%!important;
  }
  .trail_save_windown .el-dialog .el-dialog__body .trailssave_list5_width{
    width:38% !important;
  }
  .trail_save_windown .el-dialog .el-dialog__body .trailssave_list6_width{
    margin-left: 0px!important;
  }
  .trail_save_windown .el-form-item__content{
    /*margin-left: 100px;*/
    /*border: 2px solid #cafff0;*/
    /*width: 80%;*/
  }
  .trail_save_windown .el-dialog .el-dialog__body .trailssave_list5_width .el-form-item__content{
    width:86%!important;
  }


  .trail_save_windown .el-col{
    padding: 0 !important;
    /*outline: 2px solid #99ff62;*/
  }

  .trail_save_windown .el-col-2{
    width:100%!important;
  }

  .trail_save_windown .trailssave_list3_width .el-col-2{
    width:40%!important;
  }

  .trail_save_windown .trailssave_list_width .trailssave_el-col3_width{
    width:65%!important;
  }
  .trail_save_windown .trailssave_list_width .trailssave_el-col4_width{
    width:35%!important;
  }

  .trail_save_windown .trailssave_list_width .trailssave_el-col3_width .el-form-item__content{
    width:100%!important;
  }
  .trail_save_windown .trailssave_list_width .trailssave_el-col4_width .el-form-item__content{
    margin-left: 0px!important;
    width:100%!important;
}
  .trail_save_windown .trailssave_list_width .trailssave_el-col3_width .el-input{
    width: 53%!important;
  }
  .trail_save_windown .trailssave_list_width .trailssave_el-col4_width .el-input{
    width: 100%!important;
  }
  .trailssave_list7_width .el-form-item__label{
    padding-bottom: 0;
    padding-top: 0;
    padding-left: 10px;
  }




  .trail_save_windown .el-dialog__body .el-form .trailssave_list_width:nth-of-type(3) .el-form-item{
    /*width:21%;*/
    display: inline-block;
    /*border:1px solid red;*/
  }
  .trail_save_windown .el-dialog__body .el-form .trailssave_list_width:nth-of-type(3) .el-form-item__content .el-select{
    /*width:100%!important;*/
    width: 47% !important;
    /*width: 150px;*/
  }
  .trail_save_windown .el-dialog__body .el-form .trailssave_list_width:nth-of-type(3) .el-form-item:nth-of-type(1) .el-form-item__content{
    position: absolute;
    left: 0%;
    top: 0;

    width: 36% !important;
  }
  .trail_save_windown .el-dialog__body .el-form .trailssave_list_width:nth-of-type(3) .el-form-item:nth-of-type(2) .el-form-item__content{
    position: absolute;
    left: 32%;
    top: 0;

    width: 36% !important;
  }
  .trail_save_windown .el-dialog__body .el-form .trailssave_list_width:nth-of-type(3) .el-form-item:nth-of-type(3) .el-form-item__content{
    position: absolute;
    left: 58%;
    top: 0;

    width: 36% !important;
  }
  .trail_save_windown .el-dialog__body .el-form .trailssave_list_width:nth-of-type(3) .el-form-item:nth-of-type(4) .el-form-item__content{
    position: absolute;
    left: 81%;
    top: 0;

    width: 36% !important;
  }
  .trail_save_windown .trailssave_list4_width .trailssave_el-col_width{
    width:60%!important;
  }
  .trail_save_windown .trailssave_list4_width .trailssave_el-col2_width{
    width:40%!important;
  }



  .trail_save_windown .trailssave_list4_width .trailssave_el-col2_width .el-form-item__content{
    width:100%!important;
  }
  .trail_save_windown .trailssave_list4_width .trailssave_el-col_width .el-input{
    width:96%!important;
  }
  .trail_save_windown .trailssave_list4_width .trailssave_el-col2_width .el-input{
    width:99%!important;
  }
  .trail_save_windown .trailssave_list3_width .el-form-item{
    width:45%!important;
    display: inline-block;
  }

  .validateTips {
    position: absolute;
    top: 27px;
    left: 0;
    font-size: 12px;
    color: #ff4949;
  }

</style>



<script>

  import {mapActions,mapGetters} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'


  export default {
    mixins:[pagination],
    props: {
      label: {},
    },
    components:{},
    data() {
      return {
        validateTipsVisible: false,
        newTrailerpricedialogVisible:false,
        currentTime:this.$global.currentTime,
        addFormRules: {
          regionOne: [
            {required: true, message: '请选择地区', trigger: 'blur,change'}
          ],
          regionFourth: [
            {required: true, message: '必须录入四级地址', trigger: 'blur,change'}
          ],
          harborId: [
            {required: true, message: '请选择港口', trigger: 'blur,change'}
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
          regionBelongCityData:[],
          regionBelongDistrictData:[],
          regionBelongStreetData:[],
        addTrailer: false,
          regionList:this.allRegionList,

        second:false,
        third:false,
        fourth:false,
        form: {
          validityStartDate:  new Date(),
          validityEndDate:'',
          remark:'',
          regionOne:'',
          regionTow:'',
          regionThird:'',
          regionFourth:'',
                harborName :'',
                harborId:'',
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
            regionName:''

        }

      }
    },
    computed:{
      ...mapGetters([
        'harborBelongListByOrgCode',
        'regionBelongPList',
        'regionBelongCList',
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
        'getHarborBelongListByOrgCode',
        'saveTrailerprice',
        'RegionBelongPList',
        'RegionBelongCList',
        'getTrailerpriceList',
        'getAddOrderAllList',
        'getAllRegionByRegionCode',
        'getAreaInfoList'
        ]),

      handleHarborChange(val) {
        for(let i = 0; i < this.harborBelongListByOrgCode.length; i++) {
          if (this.harborBelongListByOrgCode[i].harborId === val) {
            this.form.harborName = this.harborBelongListByOrgCode[i].harborName;
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
      //新增港口选择
      test(){
        console.log(this.form.harborname)
      },
      // 地区选择
        changeRegionOne(val){

            this.second = true;
            this.form.regionOne = val
            let param = {code:val}
            this.getAreaInfoList(param).then((res)=>{
                this.regionBelongCityData = res.data
            this.regionBelongDistrictData=this.regionBelongStreetData=[]
            this.form.regionTow=""
            this.form.regionThird=""
            this.form.regionFourth=""
        })
        },
        changeRegionTow(val){
            this.form.regionTow = val

            let param = {code:val}
            this.getAreaInfoList(param).then((res)=>{
                this.regionBelongDistrictData = res.data
            this.regionBelongStreetData=[]
            this.form.regionThird=""
            this.form.regionFourth=""
        })
        },
        changeRegionThird(val){

            this.form.regionThird = val
            let param = {code:val}
            this.getAreaInfoList(param).then((res)=>{
                this.regionBelongStreetData = res.data
            this.form.regionFourth=""
        })
        },
        changeRegionFourth(val){
            this.form.regionFourth= val

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


      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
             },
      closeDialog(){
        this.second = false;
        this.third = false;
        this.fourth = false;
        //debugger;
        this.$refs['form'].resetFields()
        this.newTrailerpricedialogVisible = false;

      },
      onSubmit() {
          var temp;
          //debugger;

          if(this.form.regionTow==""){
              temp=this.form.regionOne;
          }

          else if(this.form.regionThird==""){
              temp=this.form.regionTow;
          }
          else if(this.form.regionFourth==""){
              temp=this.form.regionThird;
          }
          else {
              temp=this.form.regionFourth;
          }

          //regionId   regionIdt   temp
          this.form.regionCode=temp;
       this.$refs.form.validate((valid) => {
          if(valid){
           let tqdVoList= [
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
          Object.assign(this.form,{tqdVoList:tqdVoList});

        this.saveTrailerprice({data:JSON.stringify(this.form)}).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.newTrailerpricedialogVisible = false;
                 this.getTrailerpriceList()
                     this.$refs['form'].resetFields()
                 this.$message({
                  message:'新增成功',
                  type:'success'
                 })
               }else{
                  this.newTrailerpricedialogVisible = false;
                  this.$message({
                  message:'新增失败',
                  type:'error'
                 })
               }
           });

    }
  })
},
      onSubmitAgin() {
        var temp;
        //debugger;

        if(this.form.regionTow==""){
          temp=this.form.regionOne;
        }

        else if(this.form.regionThird==""){
          temp=this.form.regionTow;
        }
        else if(this.form.regionFourth==""){
          temp=this.form.regionThird;
        }
        else {
          temp=this.form.regionFourth;
        }

        //regionId   regionIdt   temp
        this.form.regionCode=temp;
        this.$refs.form.validate((valid) => {
          if(valid){
            let tqdVoList= [
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
            Object.assign(this.form,{tqdVoList:tqdVoList});

            this.saveTrailerprice({data:JSON.stringify(this.form)}).then(res =>{
              if(res.success){
                this.$refs['form'].resetFields()
                this.newTrailerpricedialogVisible = true;
                this.getTrailerpriceList()
                this.$refs['form'].resetFields()
                this.$message({
                  message:'新增成功',
                  type:'success'
                })
              }else{
                this.newTrailerpricedialogVisible = false;
                this.$message({
                  message:'新增失败',
                  type:'error'
                })
              }
            });

          }
        })
      },
      onSubmitSave() {
        var temp;
        //debugger;

        if(this.form.regionTow==""){
          temp=this.form.regionOne;
        }

        else if(this.form.regionThird==""){
          temp=this.form.regionTow;
        }
        else if(this.form.regionFourth==""){
          temp=this.form.regionThird;
        }
        else {
          temp=this.form.regionFourth;
        }

        //regionId   regionIdt   temp
        this.form.regionCode=temp;
        this.$refs.form.validate((valid) => {
          if(valid){
            let tqdVoList= [
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
            Object.assign(this.form,{tqdVoList:tqdVoList});

            this.saveTrailerprice({data:JSON.stringify(this.form)}).then(res =>{
              if(res.success){
                //this.$refs['form'].resetFields()
                this.newTrailerpricedialogVisible = true;
                this.getTrailerpriceList()
                //this.$refs['form'].resetFields()
                this.$message({
                  message:'新增成功',
                  type:'success'
                })
              }else{
                this.newTrailerpricedialogVisible = false;
                this.$message({
                  message:'新增失败',
                  type:'error'
                })
              }
            });

          }
        })
      }


    },
    created(){
      this.$store.dispatch('getAddOrderAllList')
      this.$store.dispatch('getHarborBelongListByOrgCode')
      this.$store.dispatch('RegionBelongPList')
      //this.$store.dispatch('saveTrailerprice');
    },
    mounted(){}
  }
</script>

