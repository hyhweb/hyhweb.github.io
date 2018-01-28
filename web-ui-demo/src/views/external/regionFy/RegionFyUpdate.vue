<template>
  <el-dialog
    title="编辑地区信息"
    v-model="newRegiondialogVisible">
    <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">

      <!--<el-form-item  label="地区(运柜宝)名称" prop="regionCode">-->
      <!--<el-select filterable clearable v-model="form.regionCode" placeholder="请选择地区地区(运柜宝)" >-->
      <!--<el-option v-for="item in regionAllList"-->
      <!--:label="item.regionName"-->
      <!--:value="item.regionCode"-->
      <!--:key="item">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->

      <el-form-item label="地区(运柜宝)地区"  prop="selectedRegion">
        <el-select  :disabled="form.selectPrivate"
                    v-model="form.selectedRegion"
                    placeholder="请选择地区(运柜宝)一级地区"
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
                   placeholder="请选择地区(运柜宝)二级地区"
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
                   placeholder="请选择地区(运柜宝)三级地区"
                   @input="selectRegionthirdaction">
          <el-option v-for="item in regionBelongDistrictData"
                     :value="item.regionId"
                     :label="item.regionName"
                     :key="item.regionId">
          </el-option>
        </el-select>

        <el-select v-show="four"
                   :disabled="form.selectTown"
                   v-model="form.selectedRegionFour"
                   placeholder="请选择地区(运柜宝)四级地区">
          <el-option v-for="item in regionBelongTownData"
                     :value="item.regionId"
                     :label="item.regionName"
                     :key="item.regionId">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="地区(泛亚)编码"  prop="contrastcode">
        <el-input v-model="form.contrastcode"></el-input>
      </el-form-item>
      <el-form-item label="地区(泛亚)名称"  prop="contrastname">
        <el-input v-model="form.contrastname"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
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
        newRegiondialogVisible:false,
        addFormRules: {
          selectedRegion: [
            { required: true, message: '请选择地区(运柜宝)名称',trigger:'blur,change' }
          ],
          contrastcode: [
            { required: true, message: '请输入地区(泛亚)编码',trigger:'blur,change' }
          ],
          contrastname: [
            { required: true, message: '请输入地区(泛亚)名称',trigger:'blur,change' }
          ],
        },
        detail:{},
        selectData:[],
        regionBelongCityData:[],
        regionBelongDistrictData:[],
        regionBelongTownData:[],
        second:false,
        third:false,
        four:false,
        form: {
          id :'',
          regionCode:'',
          regionId:'',
          contrastcode:'',
          selectedRegion:'',
          selectedRegionSecond:'',
          selectedRegionThird:'',
          selectedRegionFour:'',
          fullName:'',
          contrastname :''
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
        'updateRegionFy', 'getRegionFyList','getRegions','RegionBelongPList','RegionBelongCList','getRegionRecursiveByRegionId'
      ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form);
        this.RegionBelongPList(param);
      },

      selectRegionaction(){
        let param = {id:this.form.selectedRegion}
        this.second=true;
        this.RegionBelongCList(param).then((res)=>{
          this.regionBelongCityData=res.data;
      });
        this.form.selectedRegionSecond ="";
        this.form.selectedRegionThird ="";
        this.form.selectedRegionFour = "";
      },
      selectRegionsecondaction(){
        this.third=true;
        let param = {id:this.form.selectedRegionSecond}
        this.RegionBelongCList(param).then((res)=>{
          this.regionBelongDistrictData=res.data;
      });
        this.form.selectedRegionThird ="";
        this.form.selectedRegionFour = "";
//
      },
      selectRegionthirdaction(){
        this.four=true;
        let param = {id:this.form.selectedRegionThird};
        this.form.selectedRegionFour = "";
        this.RegionBelongCList(param).then((res)=>{
          this.regionBelongTownData=res.data;
      });
      },

      closeDialog(){
        this.newRegiondialogVisible = false;
        this.$refs.form.resetFields();
        this.second = false;
        this.third = false;
        this.four = false;
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid){

            if(this.form.selectedRegionFour){
              this.form.regionId = this.form.selectedRegionFour;
            }else if(this.form.selectedRegionThird){
              this.form.regionId = this.form.selectedRegionThird;
            }else if(this.form.selectedRegionSecond){
              this.form.regionId = this.form.selectedRegionSecond;
            }else if(this.form.selectedRegion){
              this.form.regionId = this.form.selectedRegion;
            }

            this.updateRegionFy(this.form).then(res =>{
              if(res.success){
              this.$refs['form'].resetFields();
              this.newRegiondialogVisible = false;
              this.$emit('closeUpdate');
              this.$message({
                message:'修改成功',
                type:'success'
              });
            }else{
              this.newRegiondialogVisible = false;
              this.$message({
                message:'修改失败',
                type:'error'
              })
            }
          });
          }
        });
      }
    },
    watch:{
    },
    created(){
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
