<template>
<el-dialog
    title="新增码头信息"
    v-model="newDockdialogVisible" class="dock_save_windown">
  <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">
  <el-form-item label="码头名称"  prop="name"  class="docksave_list_width">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="码头公司"  prop="thirdPartCompany" class="docksave_list_width">
    <el-input v-model="form.thirdPartCompany"></el-input>
  </el-form-item>
  <el-form-item  label="所属港口" prop="harborId" class="docksave_list_width">
      <el-select filterable clearable v-model="form.harborId" placeholder="请选择所属港口" >
      <el-option v-for="item in harborBelongList"
      :label="item.harborName+'('+(item.harborCode)+')'"
      :value="item.harborId"
      :key="item.harborId">
      </el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="码头类型" prop="dockType" class="docksave_list_width">
   <el-select v-model="form.dockType" placeholder="选择码头类型">
     <el-option label="驳船码头" value="1"></el-option>
     <el-option label="大船码头" value="2"></el-option>
   </el-select>
   </el-form-item>
  <el-form-item label="经度" prop="longitude" class="docksave_list_width">
    <el-input v-model="form.longitude"></el-input>
  </el-form-item>
  <el-form-item label="纬度" prop="latitude" class="docksave_list_width">
    <el-input v-model="form.latitude"></el-input>
  </el-form-item>
  </el-form-item>
    <el-form-item label="地区"  prop="regionName" class="docksave_list_width docksave_list2_width">
    <el-select
     v-model="form.selectedRegion"
     placeholder="请选择"
     @input="selectRegion">
      <el-option v-for="item in regionBelongPList.data"
        :label="item.regionName"
        :value="item.regionId"
        :key="item.harborId">
      </el-option>
    </el-select>
    <!--</el-form-item>
        <el-form-item>-->
        <el-select v-if="second"
    v-model="form.selectedRegionSecond"
    placeholder="请选择"
    @input="selectRegionsecond">
      <el-option v-for="item in regionBelongCityData"
        :value="item.regionId "
        :label="item.regionName"
        :key="item.harborId">
      </el-option>
    </el-select>
    <el-select v-if="third"
    v-model="form.selectedRegionThird"
    placeholder="请选择"
    @input="selectRegionthird" >
     <el-option v-for="item in regionBelongDistrictData"
       :value="item.regionId "
       :label="item.regionName"
       :key="item.harborId">
     </el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="地址" prop="address" class="docksave_list_width docksave_list2_width docksave_list4_width">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
  <el-form-item label="联系人" prop="contacts" class="docksave_list_width">
    <el-input v-model="form.contacts"></el-input>
  </el-form-item>
   <el-form-item label="联系方式" prop="phone" class="docksave_list_width">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="是否电子入闸" prop="isElecgate" class="docksave_list_width docksave_list3_width">
   <el-select v-model="form.isElecgate" placeholder="是否电子入闸">
     <el-option label="是" value="1"></el-option>
     <el-option label="否" value="0"></el-option>
   </el-select>
     </el-form-item>
   <el-form-item label="第三方码头系统代码" prop="thirdPartCode" class="docksave_list_width docksave_list3_width">
    <el-input v-model="form.thirdPartCode"></el-input>
  </el-form-item>
  </el-form-item>
  <el-form-item label="是否禁用" prop="isUnable" class="docksave_list_width">
   <el-select v-model="form.isUnable" placeholder="请选择是否禁用">
     <el-option label="是" value="1"></el-option>
     <el-option label="否" value="0"></el-option>
   </el-select>
     </el-form-item>
  <el-form-item class="docksave_list_width docksave_list2_width">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>

<style>
  .dock_save_windown .el-dialog{
    /*border: 3px solid red;*/
    min-width:664px;
    border-radius: 6px;
    padding-right: 14px;
  }
  .dock_save_windown .el-dialog .el-dialog__body .docksave_list_width{
    width:48%;
    /*outline: 2px solid royalblue;*/
    margin:0!important;
    display: inline-block;
    padding-bottom: 20px;
  }
  .dock_save_windown .el-dialog .el-dialog__body .docksave_list2_width{
    width: 100%;
  }
  .dock_save_windown .docksave_list_width .el-select{
    width:100%;
  }
  .dock_save_windown .el-dialog .el-dialog__body .docksave_list2_width>.el-form-item__content .el-select{
    width: 31%;
    padding-right: 6px;
  }
  .dock_save_windown .el-dialog .el-dialog__body  .docksave_list2_width>.el-form-item__content .el-select:last-of-type{
    padding-right:0px;
  }
  .dock_save_windown .el-dialog .el-dialog__body .el-form .docksave_list_width:last-of-type .el-form-item__content{
    width: 22%;
    margin: 0 auto!important;
  }
  .dock_save_windown .el-dialog .el-dialog__body .el-form .docksave_list3_width .el-form-item__label{
    padding:0px 12px 0 0!important;
  }
  .dock_save_windown .el-dialog .el-dialog__body .el-form .docksave_list3_width{
    padding-bottom: 15px;
  }
  .dock_save_windown .el-dialog .el-dialog__body .docksave_list4_width .el-input{
    width: 96.5%;
  }


</style>



<script>
  import {mapGetters,mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'


  export default {
    mixins:[pagination],
    props: {
  label: {},
},
    components:{},
    data() {
      return {
        regionBelongCityData:[],
        regionBelongDistrictData:[],
        newDockdialogVisible:false,
        addFormRules: {
          name: [
            { required: true, message: '请输入码头名称',trigger:'blur,change' }
          ],
            harborId: [
                { required: true, message: '请选择港口',trigger:'blur,change' }
            ],
            address: [
                { required: true, message: '请输入码头地址',trigger:'blur,change' }
            ],
            regionName: [
                { required: true, message: '请选择地区',trigger:'blur,change' }
            ],
          longitude: [
            {validator:this.$global.validate.number, required: true, trigger:'blur,change' }
          ],
          latitude: [
            {validator:this.$global.validate.number,required: true, trigger:'blur,change' }
          ],
          phone: [
            { validator:this.$global.validate.phone,required: true,trigger:'blur,change' }
          ],
         },
        second:false,
        third:false,
        form: {
                name :'',
                harborId:'',
                dockType:'',
                address:'',
                longitude :'',
                latitude:'',
                contacts:'',
                phone:'',
                regionId:'',
                isElecgate:'0',
                thirdPartCode:'',
                isUnable:'0',
                selectedRegion:'',
                selectedRegionSecond:'',
                selectedRegionThird:'',
                harborName:'',
                regionCode:'',
                selectedharbor:"",
                regionName:"",
                dockCode:""
        }
      }
    },
    computed:{
     ...mapGetters([
        'harborBelongList','regionBelongPList','regionBelongCList'
        ])
  },

    methods: {
      ...mapActions([
        'getDockList','saveDock','HarborBelongList','RegionBelongPList','RegionBelongCList','getRegionCode'
        ]),
      test(){
        console.log(this.form.harborname)
      },
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
             },

        selectRegion(){
            this.second = true;
            let param = {id:this.form.selectedRegion}
            this.RegionBelongCList(param).then((res)=> {
                this.regionBelongCityData = res.data
                console.log(this.regionBelongCityData)
                this.regionBelongPList.data.forEach((res) => {
                    if (res.regionId === this.form.selectedRegion) {
                        this.form.regionName= res.regionName
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
                        this.form.regionName= this.form.regionName+res.regionName
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
                        this.form.regionName = this.form.regionName+res.regionName
                    }
                })
            })
        },
      closeDialog(){
          this.newDockdialogVisible = false,
          this.second=false,
          this.third=false,
          this.form.selectedRegion="",
          this.form.regionName="",
          this.form.harborId="",
          this.$refs.form.resetFields()
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
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
                        console.log(this.form)
                        Object.assign(this.form,{regionCode:res.data[0].regionCode})
                        Object.assign(this.form,{OrgCode:this.form.OrgCode})
                        console.log(this.form.regionName)
                        Object.assign(this.form,{regionName:this.form.regionName});

                        this.saveDock(this.form).then(res =>{
                            if(res.success){
                                this.$refs.form.resetFields()
                                this.newDockdialogVisible = false;
                                this.second=false,
                                this.third=false,
                                this.form.selectedRegion="",
                                this.form.regionName1="",
                                this.form.regionName3="",
                                this.form.regionName2="",
                                this.form.regionName="",
                                this.form.harborId="",
                                this.getDockList()
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
          })
          }
    },


    created(){
      this.$store.dispatch('RegionBelongPList'),
      this.$store.dispatch('HarborBelongList')
          },
    mounted(){
      console.log(this.page)
    }
  }
</script>
