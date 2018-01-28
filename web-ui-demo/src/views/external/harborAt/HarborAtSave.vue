<template>
  <el-dialog
    title="新增港口信息"
    v-model="newHarbordialogVisible">
    <el-form ref="form" :rules="addFormRules" :model="form" label-width="150px">

      <el-form-item  label="港口(运柜宝)名称" prop="harborId">
        <el-select filterable clearable v-model="form.harborId" placeholder="请选择所属港口(运柜宝)" >
          <el-option v-for="item in harborBelongList"
                     :label="item.harborName"
                     :value="item.harborId"
                     :key="item.harborId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="港口(安通)编码" prop="contrastcode">
        <el-input v-model="form.contrastcode"></el-input>
      </el-form-item>

      <el-form-item label="港口(安通)名称" prop="contrastname">
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
  import {mapActions, mapGetters} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'


  export default {
    mixins: [pagination],
    props: {
      label: {},
    },
    components: {},
    data() {
      return {
        newHarbordialogVisible: false,
        addFormRules: {
          harborId: [
            { required: true, message: '请选择港口(运柜宝)名称',trigger:'blur,change' }
          ],
          contrastcode: [
            { required: true, message: '请输入港口(安通)编码',trigger:'blur,change' }
          ],
          contrastname: [
            { required: true, message: '请输入港口(安通)名称',trigger:'blur,change' }
          ],
        },
        regionBelongCityData: [],
        regionBelongDistrictData: [],

        second: false,
        third: false,
        fourth: false,
        form: {
          id: '',
          harborId: '',
          harborName: '',
          contrastcode: '',
          contrastname: ''


        }

      }
    },
    computed: {
      ...mapGetters([
        'harborBelongList'
      ])
    },

    methods: {
      ...mapActions([
        'getHarborAtList', 'saveHarborAt' ,'HarborBelongList'
      ]),

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
        let param = Object.assign(this.paginationParams(), this.form)
      },
      closeDialog(){
        this.$refs.form.resetFields(),
          this.newHarbordialogVisible = false;
      },

      onSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid){
            this.form.harborName = this.harborBelongList.find(item => item.harborId === this.form.harborId)['harborName'];
              this.saveHarborAt(this.form).then(res =>{
                if(res.success){
                  this.newHarbordialogVisible = false;
                  this.getHarborAtList();
                  this.$message({
                    message:'新增成功',
                    type:'success'
                  });
                }else{
                  let message=res.message
                  this.$message({
                    message:message
                  })

                }
              });
          }
        })
      },

      created(){
          this.$store.dispatch('HarborBelongList')
      }
    }
  }
</script>
