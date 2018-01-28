<style>
  .el-form-item {
    display: inline-block;
  }
  .col-align_right {
    text-align: right;
  }
  .four-region .el-form-item__content {
    width:150px;
  }
</style>



<template>
  <el-dialog id="centerDialogSave" title="新增报价" v-model="newTrailerpricedialogVisible" class="trail_save_windown">
    <el-form ref="form" :rules="addFormRules" :model="form" label-width="80px">
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="港口" prop="harborId">
            <el-select  clearable filterable default-first-option v-model="form.harborId" placeholder="请选择港口" class='control-width'>
              <el-option value="">请选择</el-option>
              <el-option v-for="item in harborBelongList" :label="item.harborName+'('+(item.harborCode)+')'" :value="item.harborId" :key="item.harborId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="16" class="col-align_right">
          <el-form-item label="生效日期" prop="validityStartDate">
            <el-date-picker @change="validityStartDateHandle" type="date" placeholder="生效日期" :default-value="currentTime"
              v-model="form.validityStartDate"
              style="width:160px">
            </el-date-picker>
          </el-form-item>
          <el-form-item  prop="validityEndDate" label-width="0">
            <el-date-picker @change="validityEndDateHandle" type="date" placeholder="失效日期" :default-value="currentTime"
              v-model="form.validityEndDate"
              style="width:160px">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row class="four-region" :gutter="0">
        <el-col :span="8">
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
        </el-col>

        <el-col :span="6">
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
        </el-col>

        <el-col :span="6">
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
        </el-col>

        <el-col :span="6">
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
        'harborBelongList',
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
        'HarborBelongList',
          'saveTrailerprice',
          'RegionBelongPList',
          'RegionBelongCList',
          'getTrailerpriceList',
          'getAddOrderAllList',
          'getAllRegionByRegionCode',
          'getAreaInfoList'
        ]),
      //有效时间
      validityStartDateHandle(val){
      		this.form.validityStartDate = val
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
      this.$store.dispatch('HarborBelongList')
      this.$store.dispatch('RegionBelongPList')
      //this.$store.dispatch('saveTrailerprice');
          },
    mounted(){
    }
  }
</script>

