<template>
<el-dialog
    title="新增地区信息"
    v-model="newRegiondialogVisible" class="region_save_windown">

  <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">

  <el-form-item label="地区代码"  prop="regionCode" class="regionsave_list_width">
    <el-input v-model="form.regionCode"></el-input>
  </el-form-item>

  <el-form-item label="地区名称"  prop="regionName" class="regionsave_list_width regionsave_list3_width" >
    <el-input v-model="form.regionName"></el-input>
  </el-form-item>

<el-form-item label="地区全称" prop="fullName" v-show="false" class="regionsave_list_width">
    <el-input v-model="form.fullName"></el-input>
  </el-form-item>

  <el-form-item label="所属地区"  prop="selectedRegion" class="regionsave_list_width regionsave_list2_width">
    <el-select  :disabled="form.selectPrivate"
     v-model="form.selectedRegion"
     placeholder="请选择所属地区"
     @input="selectRegionaction">
      <el-option v-for="item in regionBelongPList.data"
        :value="item.regionId"
        :label="item.regionName"
        :key="item.regionId">
      </el-option>
    </el-select>
    <el-select v-show="second"
    v-model="form.selectedRegionSecond"
   :disabled="form.selectCity"
    placeholder="请选择所属地区"
    @input="selectRegionsecondaction" >
      <el-option v-for="item in regionBelongCityData"
        :value="item.regionId"
        :label="item.regionName"
        :key="item.regionId">
      </el-option>
    </el-select>
    <el-select v-show="third"
   :disabled="form.selectDistrict"
    v-model="form.selectedRegionThird"
    placeholder="请选择所属地区"
    @input="selectRegionthirdaction">
     <el-option v-for="item in regionBelongDistrictData"
       :value="item.regionId"
       :label="item.regionName"
       :key="item.regionId">
     </el-option>
        </el-select>
    </el-form-item>


  <el-form-item label="是否末级"   prop="isEnd" class="regionsave_list_width regionsave_list4_width">
    <el-select v-model="form.isEnd" placeholder="请选择是否末级">
      <el-option label="是" value="1"></el-option>
      <el-option label="否" value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item class="regionsave_list_width regionsave_list2_width">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<style>

  .region_save_windown .el-dialog{
    /*border: 3px solid red;*/
    min-width:664px;
  }
  .region_save_windown .el-dialog .el-dialog__body .regionsave_list_width{
    width: 48%;
    /*outline: 2px solid royalblue;*/
    margin:0!important;
    display: inline-block;
    padding-bottom: 20px;
  }
  .region_save_windown .el-dialog .el-dialog__body .regionsave_list2_width{
    width: 100%;
  }
  .region_save_windown .el-dialog .el-dialog__body .regionsave_list3_width{
    padding-left: 20px;
  }
  .region_save_windown .el-dialog .el-dialog__body .regionsave_list2_width>.el-form-item__content .el-select{
    width: 32%;
    padding-right: 6px;
  }
  .region_save_windown .el-dialog .el-dialog__body .regionsave_list2_width>.el-form-item__content .el-select:last-of-type{
    padding-right:0px;
  }
  .region_save_windown .el-dialog .el-dialog__body .regionsave_list4_width .el-form-item__content .el-select{
   width:80%!important;
  }
  .region_save_windown .el-dialog .el-dialog__body .el-form .regionsave_list_width:last-of-type{
    padding-bottom: 0px;
  }
  .region_save_windown .el-dialog .el-dialog__body .el-form .regionsave_list_width:last-of-type .el-form-item__content{
    width: 22%;
    margin: 0 auto!important;
  }



</style>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{},
    data() {
      //options:[regionBelongPList.data]
      return {
        newRegiondialogVisible:false,
        addFormRules: {
          regionCode: [
            { required: true, message: '请输入地区代码',trigger:'blur,change' }
          ],
          regionName: [
            { required: true, message: '请输入地区名称',trigger:'blur,change' }
          ],
         /* selectedRegion: [
            {  required: true, message: '请输入所属地区',trigger:'blur,change' }
          ],*/
          isEnd: [
            { required: true, message: '请选择是否末级',trigger:'blur,change' }
          ]
        },

        second:false,
        third:false,
        regionBelongCityData:[],
        regionBelongDistrictData:[],
        detail:{},
        form: {
                selectPrivate:false,
                selectCity:false,
                selectDistrict:false,
                fullName :'',
                isEnd:'',
                level:'',
                selectedRegion:'',
                selectedRegionSecond:'',
                selectedRegionThird:'',
                regionCode:'',
                regionName:'',
                spellName:'',
                orgCode:'',

        }

      }
    },
    computed:{
      ...mapGetters([
        'regionBelongPList','regionBelongCList'
        ])
    },

    methods: {
      ...mapActions([
        'RegionBelongPList','RegionBelongCList','saveRegion','getRegionList'
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
       // this.RegionBelongPList(param);
      //  this.RegionBelongCList(param)
      },
      selectRegionaction(val){
      	//alert(this.form.selectedRegionSecond)
        let param = {id:this.form.selectedRegion}
        console.log(param);
         this.second=true;
         this.RegionBelongCList(param).then((res)=>{
          console.log(res.data)
          this.regionBelongCityData=res.data
          //alert(this.form.selectedRegionSecond)
        })
        this.regionBelongDistrictData=""
        this.form.selectedRegionSecond =""
        this.regionBelongPList.data.forEach((res) => {
          if (res.regionId === this.form.selectedRegion) {
          this.form.fullName=res.regionName
          //alert(this.form.selectedRegionSecond)
        }
      })
      },
      selectRegionsecondaction(){
      	//alert(this.form.selectedRegionSecond)
        console.log(this.form.selectedRegionSecond)
        this.third=true;
        let param = {id:this.form.selectedRegionSecond}
        this.RegionBelongCList(param).then((res)=>{
          console.log(res.data)
          this.regionBelongDistrictData=res.data
        })
        this.form.selectedRegionThird =""
        this.regionBelongCityData.forEach((res)=>{
          if(res.regionId   === this.form.selectedRegionSecond){
          this.form.fullName+=res.regionName
        }
      })
      },
      selectRegionthirdaction(){
        console.log(this.form.selectedRegionThird)
        let param = {id:this.form.selectedRegionThird}
        this.RegionBelongCList(param).then((res)=>{
          console.log(res.data)
        })
        this.regionBelongDistrictData.forEach((res)=>{
          if(res.regionId   === this.form.selectedRegionThird){
          this.form.fullName+=res.regionName
        }
      })
      },
      closeDialog(){
        this.second = false;
        this.third = false;
        this.$refs['form'].resetFields()
        this.newRegiondialogVisible = false;

      },
      onSubmit() {
        this.$emit('clearSelectRegion');
        this.second = false;
          this.third = false;
          console.log(JSON.stringify(this.form.selectedRegion));
          this.$refs.form.validate((valid) => {
          if(valid){
            let parentId =""
            let level=""
            let fullName=""
            if(this.form.selectedRegion ==""){
              parentId =0
              level=1
            }
               else if(this.form.selectedRegionSecond ==""){
                 parentId =this.form.selectedRegion
                 level=2
                }
                else if(this.form.selectedRegionThird ==""){
                 parentId =this.form.selectedRegionSecond
                 level=3
                }
                else {
                    parentId =this.form.selectedRegionThird
                    level=4
            }
            fullName=this.form.fullName+this.form.regionName
              Object.assign(this.form,{parentId:parentId});
            Object.assign(this.form,{level:level});
            Object.assign(this.form,{fullName:fullName});
              console.log(parentId)
             this.saveRegion(this.form).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.newRegiondialogVisible = false;
                 this.getRegionList()
                 this.form.selectPrivate=false,
                 this.form.selectedRegion=""
                 this.$message({
                  message:'新增成功',
                  type:'success'
                 })
               }else{
                  this.newRegiondialogVisible = false;
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
      this.$store.dispatch('RegionBelongPList');

   },
    mounted(){
    }
  }
</script>
