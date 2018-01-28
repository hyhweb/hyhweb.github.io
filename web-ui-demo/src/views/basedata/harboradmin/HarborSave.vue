<template>
  <el-dialog
    title="新增港口信息"
    v-model="newHarbordialogVisible" class="harbor_save_windown">
    <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">
      <el-form-item label="港口名称"  prop="harborName"  class="harborsave_list_width">
        <el-input v-model="form.harborName"></el-input>
      </el-form-item>

      <el-form-item label="是否禁用"   prop="isUnable" class="harborsave_list_width harborsave_list3_width harborsave_list4_width">
        <el-select v-model="form.isUnable" placeholder="请选择是否禁用">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地区"  prop="regionName" class="harborsave_list_width harborsave_list2_width">
        <el-select
          v-model="form.selectedRegion"
          placeholder="请选择"
          @input="selectRegion">
          <el-option v-for="item in regionBelongPList.data"
                     :label="item.regionName"
                     :value="item.regionId"
                     :key="item.regionId">
          </el-option>
        </el-select>
        <el-select v-if="second"
                   v-model="form.selectedRegionSecond"
                   placeholder="请选择"
                   @input="selectRegionsecond">
          <el-option v-for="item in regionBelongCityData"
                     :value="item.regionId "
                     :label="item.regionName"
                     :key="item.regionId">
          </el-option>
        </el-select>
        <el-select v-if="third"
                   v-model="form.selectedRegionThird"
                   placeholder="请选择"
                   @input="selectRegionthird" >
          <el-option v-for="item in regionBelongDistrictData"
                     :value="item.regionId "
                     :label="item.regionName"
                     :key="item.regionId">
          </el-option>
        </el-select>
        <!--  <el-select v-if="fourth"
         placeholder="请选择"
         v-model="form.selectedRegionFourth"
         @change="selectedRegionfourth">
        <el-option v-for="item in regionBelongStreetData"
          :value="item.regionId "
          :label="item.regionName"
          :key="item">
        </el-option>
            </el-select>  -->
      </el-form-item>
      <el-form-item label="地址"  prop="address" class="harborsave_list_width harborsave_list2_width">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="longtitude" class="harborsave_list_width">
        <el-input v-model="form.longtitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude" class="harborsave_list_width harborsave_list3_width">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts" class="harborsave_list_width">
        <el-input v-model="form.contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone" class="harborsave_list_width harborsave_list3_width">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="secRegion" class="harborsave_list_width">
        <el-input v-model="form.regionName2" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="orgCode" class="harborsave_list_width harborsave_list3_width harborsave_list4_width">
        <el-select v-model="form.orgCode" placeholder="请选择所属部门" >
          <el-option v-for="item in harborBelongOrgList.data"
                     :label="item.orgName"
                     :value="item.orgCode"
                     :key="item.orgCode"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="harborsave_list_width harborsave_list2_width">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style>
  .harbor_save_windown .el-dialog{
    /*border: 3px solid red;*/
    min-width:664px;
    border-radius: 6px;
    padding-right: 14px;
  }
  .harbor_save_windown .el-dialog .el-dialog__body .harborsave_list_width{
    width:48%;
    /*outline: 2px solid royalblue;*/
    margin:0!important;
    display: inline-block;
    padding-bottom: 20px;
  }
  .harbor_save_windown  .el-dialog .el-dialog__body .el-form .harborsave_list_width:last-of-type{
    padding-bottom: 0px;
  }
  .harbor_save_windown .el-dialog .el-dialog__body .harborsave_list2_width{
    width: 100%;
  }
  .harbor_save_windown .el-dialog .el-dialog__body .harborsave_list2_width>.el-form-item__content .el-select{
    width: 32%;
    padding-right: 6px;
  }
  .harbor_save_windown .harborsave_list4_width .el-select{
    width:100%;
  }

  .harbor_save_windown .el-dialog .el-dialog__body  .harborsave_list2_width>.el-form-item__content .el-select:last-of-type{
    padding-right:0px;
  }
  .harbor_save_windown .el-dialog .el-dialog__body  .harborsave_list3_width{
    padding-left: 20px;
  }
  .harbor_save_windown  .el-dialog .el-dialog__body .el-form .harborsave_list_width:last-of-type .el-form-item__content{
    width: 22%;
    margin: 0 auto!important;
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
        newHarbordialogVisible:false,
        addFormRules: {
          harborName: [
            { required: true, message: '请输入港口名称',trigger:'blur,change' }
          ],
          OrgCode: [
            { required: true, message: '请选择所属部门',trigger:'blur,change' }
          ],

          isUnable: [
            { required: true, message: '请选择是否禁用',trigger:'blur,change' }
          ],

          regionName: [
            { required: true, message: '请选择所属地区',trigger:'blur,change' }
          ],
          longtitude: [
            {validator:this.$global.validate.number, required: true, message: '请选择所属地区',trigger:'blur,change' }
          ],
          latitude: [
            { validator:this.$global.validate.number,required: true, message: '请选择所属地区',trigger:'blur,change' }
          ],
          phone: [
            { validator:this.$global.validate.phone,required: true, message: '请选择所属地区',trigger:'blur,change' }
          ],
        },
        regionBelongCityData:[],
        regionBelongDistrictData:[],

        second:false,
        third:false,
        fourth:false,
        form: {
          harborName :'',
          selectedRegion:'',
          selectedRegionSecond:'',
          selectedRegionThird:'',
          regionName:'',
          address:'',
          longtitude :'',
          latitude:'',
          contacts:'',
          phone:'',
          secRegion:'',
          selectedOrg:'',
          isUnable:'0',
          regionId :'',
          regionCode:'',
          orgName:'',
          orgCode:'',
          regionName2:"",
          regionName1:"",
          regionName3:"",
          harborCode:""


        }

      }
    },
    computed:{
      ...mapGetters([
        'regionBelongPList','regionBelongCList','harborBelongOrgList'
      ])
    },

    methods: {
      ...mapActions([
        'getHarborList','saveHarbor','RegionBelongPList','RegionBelongCList','getRegionCode','HarborBelongOrgList'
      ]),

      selectRegion(){
        this.second = true;
        let param = {id:this.form.selectedRegion}
        this.RegionBelongCList(param).then((res)=> {
          this.regionBelongCityData = res.data
          console.log(this.regionBelongCityData)
          this.regionBelongPList.data.forEach((res) => {
            if (res.regionId === this.form.selectedRegion) {
              this.form.regionName1 = res.regionName
              this.form.regionName=res.regionName
            }
          })
        })
        this.form.selectedRegionSecond =""
        this.form.selectedRegionThird =""
        this.regionBelongDistrictData=""
      },
      selectRegionsecond(){
        this.third = true;
        let param = {id:this.form.selectedRegionSecond}
        this.RegionBelongCList(param).then((res)=>{
          this.regionBelongDistrictData=res.data
          this.regionBelongCityData.forEach((res)=>{
            if(res.regionId   === this.form.selectedRegionSecond){
              this.form.regionName2= res.regionName
              this.form.regionName+=res.regionName
            }
          })
        })
        this.form.selectedRegionThird =""
      },
      selectRegionthird(){
        let param = {id:this.form.selectedRegionThird}
        this.RegionBelongCList(param).then((res)=>{
          this.regionBelongStreetData=res.data
          this.regionBelongDistrictData.forEach((res)=>{
            if(res.regionId   === this.form.selectedRegionThird){
              this.form.regionName3= res.regionName
              this.form.regionName+=res.regionName
            }
          })
        })
      },
      /*selectedRegionfourth(){
       let param = {id:this.form.selectedRegionFourth}
       this.regionBelongCList.data.forEach((val,key)=>{
       if(val.regionId   === this.form.selectedRegionFourth){
       this.form.regionName4 = val.regionName
       }
       })
       console.log(this.form.selectedRegionFourth)
       },*/
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
      },
      closeDialog(){
        this.second=false,
          this.third=false,
          this.form.selectedRegion="",
          this.form.regionName2="",
          this.form.regionName1="",
          this.form.regionName3="",
          this.form.regionName="",
          this.form.OrgCode="",
          this.$refs.form.resetFields(),
          this.newHarbordialogVisible = false;
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid){
            let regionId =""
            if(this.form.selectedRegionSecond ==""){
              regionId =this.form.selectedRegion
            }
            else if(this.form.selectedRegionThird ==""){
              regionId =this.form.selectedRegionSecond
            }
            else {regionId =this.form.selectedRegionThird;}
            console.log(regionId)
            let getRegionCodeParam=this.getRegionCode({id:regionId})
            getRegionCodeParam.then((res)=>{
              Object.assign(this.form,{regionCode:res.data[0].regionCode})
              Object.assign(this.form,{secRegion:this.form.regionName2})
              Object.assign(this.form,{regionName:this.form.regionName});

              this.saveHarbor(this.form).then(res =>{
                if(res.success){
                  this.$refs.form.resetFields()
                  this.newHarbordialogVisible = false;
                  this.second=false,
                    this.third=false,
                    this.form.selectedRegion="",
                    this.form.regionName2="",
                    this.form.regionName1="",
                    this.form.regionName3="",
                    this.form.regionName="",
                    this.form.orgCode="",
                    this.getHarborList()
                  this.$message({
                    message:'新增成功',
                    type:'success'
                  })

                }else{
                  let message=res.message
                  this.$message({
                    message:message
                  })

                }
              });
            })
          }
        })
      }
    },
    created(){

      this.$store.dispatch('RegionBelongPList'),
        this.$store.dispatch('HarborBelongOrgList')

    }
  }
</script>
