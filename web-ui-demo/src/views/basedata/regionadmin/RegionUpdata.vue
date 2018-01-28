<template>
  <el-dialog
    title="编辑地区信息"
    v-model="newRegiondialogVisible" class="region_updata_windown">
  	<el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">
	  <el-form-item label="地区代码"  prop="regionCode" class="regionupdata_list_width">
	    <el-input v-model="form.regionCode"></el-input>
	  </el-form-item>

	  <el-form-item label="地区名称"  prop="regionName" class="regionupdata_list_width regionupdata_list3_width">
	    <el-input v-model="form.regionName"></el-input>
	  </el-form-item>

	  <el-form-item label="地区全称" v-show="false" class="regionupdata_list_width">
	    <el-input v-model="form.fullName" ></el-input>
	  </el-form-item>

	  <el-form-item label="所属地区"  prop="selectedRegion" class="regionupdata_list_width regionupdata_list2_width">
	    <el-select
	     v-model="form.selectedRegion"
	     placeholder="请选择所属地区"
	     @input="selectRegionfirst">
	      <el-option v-for="item in regionBelongPList.data"
	        :value="item.regionId"
	        :label="item.regionName"
	        :key="item.regionId">
	      </el-option>
	    </el-select>
	    <el-select
	   v-show="second"
	   v-model="form.selectedRegionSecond"
	   placeholder="请选择所属地区"
	   @input="selectRegionsecond" >
	     <el-option v-for="item in regionBelongCityData"
	       :value="item.regionId"
	       :label="item.regionName"
	       :key="item.regionId">
	     </el-option>
	   </el-select>
	    <el-select
	    v-show="third"
	   v-model="form.selectedRegionThird"
	   placeholder="请选择所属地区" >
	    <el-option v-for="item in regionBelongDistrictData"
	      :value="item.regionId"
	      :label="item.regionName"
	      :key="item.regionId">
	    </el-option>
	    </el-select>
	  </el-form-item>

	  <el-form-item label="是否末级"   prop="isEnd" class="regionupdata_list_width regionupdata_list4_width">
	    <el-select v-model="form.isEnd" :value="form.isEnd" placeholder="请选择是否末级">
	      <el-option label="是" value="1"></el-option>
	      <el-option label="否" value="0"></el-option>
	    </el-select>
	  </el-form-item>

  	  <el-form-item class="regionupdata_list_width regionupdata_list2_width">
	    <el-button type="primary" @click="onSubmit">提交</el-button>
	    <el-button @click="closeDialog">取消</el-button>
	  </el-form-item>

	</el-form>
  </el-dialog>
</template>
<style>
.region_updata_windown .el-dialog{
/*border: 3px solid red;*/
min-width:664px;
}
.region_updata_windown .el-dialog .el-dialog__body .regionupdata_list_width{
width: 48%;
/*outline: 2px solid royalblue;*/
margin:0!important;
display: inline-block;
padding-bottom: 20px;
}
.region_updata_windown .el-dialog .el-dialog__body .regionupdata_list2_width{
width: 100%;
}
.region_updata_windown .el-dialog .el-dialog__body .regionupdata_list3_width{
padding-left: 20px;
}
.region_updata_windown .el-dialog .el-dialog__body .regionupdata_list2_width>.el-form-item__content .el-select{
width: 32%;
padding-right: 6px;
}
.region_updata_windown .el-dialog .el-dialog__body .regionupdata_list2_width>.el-form-item__content .el-select:last-of-type{
padding-right:0px;
}
.region_updata_windown .el-dialog .el-dialog__body .regionupdata_list4_width .el-form-item__content .el-select{
width:80%!important;
}
.region_updata_windown .el-dialog .el-dialog__body .el-form .regionupdata_list_width:last-of-type{
padding-bottom: 0px;
}
.region_updata_windown .el-dialog .el-dialog__body .el-form .regionupdata_list_width:last-of-type .el-form-item__content{
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
      return {
        newRegiondialogVisible:false,
        addFormRules: {
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
          ]
        },
        detail:{},
        selectData:[],
        regionBelongCityData:[],
        regionBelongDistrictData:[],
        second:false,
        third:false,
        form: {
                fullName :'',
                isEnd:'',
                level:'',
                parentId :'',
                regionCode:'',
                regionName:'',
                spellName:'',
                orgCode:'',
                selectedRegion:'',
                selectedRegionSecond:'',
                selectedRegionThird:'',
                regionId:'',
                regionQrycode:'',
                selectPrivate:false,
                selectCity:false,
                selectDistrict:false,
                regionName1:"",
                regionName2:"",
                regionName3:"",
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
        'RegionBelongPList','getRegionList','updateRegion','RegionBelongCList','getRegions'
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
        this.RegionBelongPList(param)
      },
       selectRegionfirst(val){
        console.log(val)
        let param = {id:val}
        this.RegionBelongCList(param).then((res)=>{
        this.regionBelongCityData=res.data
        })
        this.form.selectedRegionSecond =""
        this.form.selectedRegionThird =""
        this.regionBelongDistrictData=""
         this.regionBelongPList.data.forEach((res) => {
           if (res.regionId === this.form.selectedRegion) {
            this.form.regionName1=res.regionName
           }
         })
      },
      selectRegionsecond(){
        console.log(this.form.selectedRegionSecond)
        let param = {id:this.form.selectedRegionSecond}
         this.RegionBelongCList(param).then((res)=>{
          console.log(res.data)
          this.regionBelongDistrictData=res.data
        })
        this.form.selectedRegionThird =""
        this.regionBelongCityData.forEach((res)=>{
          if(res.regionId   === this.form.selectedRegionSecond){
           this.form.regionName2=res.regionName
          }
        })
      },
      selectRegionthird(){
        console.log(this.form.selectedRegionThird)
        let param = {id:this.form.selectedRegionThird}
       this.RegionBelongCList(param).then((res)=>{
          console.log(res.data)
        })
        this.regionBelongDistrictData.forEach((res)=>{
            console.log(res)
          if(res.regionId   === this.form.selectedRegionThird){
            this.form.regionName3=res.regionName
          }
        })
      },
      closeDialog(){
        this.newRegiondialogVisible = false;
      },
      onSubmit() {
        this.$emit('clearSelectRegion')
          console.log(JSON.stringify(this.form.selectedRegion));
          this.$refs.form.validate((valid) => {
          if(valid){
            let parentId =""
            let level=""
            let fullName=""
            if(this.form.selectedRegion==""){
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
            fullName=this.form.regionName1+this.form.regionName2+this.form.regionName3+this.form.regionName
            Object.assign(this.form,{parentId:parentId});
            Object.assign(this.form,{level:level});
            Object.assign(this.form,{fullName:fullName});

              console.log(parentId)
              console.log(this.form);
             this.updateRegion(this.form).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.newRegiondialogVisible = false;
                 this.getRegionList()
                 this.$message({
                  message:'修改成功',
                  type:'success'
                 })
               }else{
                  this.newRegiondialogVisible = false;
                  this.$message({
                  message:'修改失败',
                  type:'error'
                 })
               }
           });

      }

       })
      }
    },
    watch:{
      detail(val){

        Object.assign(this.form,val)
        if(this.form.isEnd){
         this.form.isEnd = "1"
       }else{
          this.form.isEnd = "0"
       }
      }
    },
    created(){

    //
     // this.form.selectedRegion=param
    Object.assign(this.form,this.detail);
       if(this.form.isEnd){
         this.form.isEnd = "1"
       }else{
          this.form.isEnd = "0"
       }

    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
