<template>
<el-dialog
    title="编辑港口信息"
    v-model="newHarbordialogVisible">
  <el-form ref="form" :rules="addFormRules" :model="form"  label-width="150px">

    <el-form-item  label="港口(运柜宝)名称" prop="harborId">
      <el-select filterable clearable v-model="form.harborId" placeholder="请选择所属码头(运柜宝)" >
        <el-option v-for="item in harborBelongList"
                   :label="item.harborName"
                   :value="item.harborId"
                   :key="item.harborId">
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="港口(泛亚)编码"  prop="contrastcode">
      <el-input v-model="form.contrastcode"></el-input>
    </el-form-item>

    <el-form-item label="港口(泛亚)名称"  prop="contrastname">
      <el-input v-model="form.contrastname"></el-input>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</section>
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
        newHarbordialogVisible:false,
          addFormRules: {
            harborId: [
              { required: true, message: '请选择港口(运柜宝)名称',trigger:'blur,change' }
            ],
            contrastcode: [
              { required: true, message: '请输入港口(泛亚)编码',trigger:'blur,change' }
            ],
            contrastname: [
              { required: true, message: '请输入港口(泛亚)名称',trigger:'blur,change' }
            ],

          },

        detail:{},
        form:{
          id :'',
          harborId:'',
          harborName:'',
          contrastcode:'',
          contrastname:''
        }

      }
    },
    computed:{
        ...mapGetters([
            'harborBelongList'
        ])

    },

    methods: {
      ...mapActions([
        'getHarborFyList','updateHarborFy','HarborBelongList'
        ]),

      test(){
        console.log(this.form.harborname)
      },
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
      },
      closeDialog(){
        this.newHarbordialogVisible = false,
          this.$refs.form.resetFields();
      },
      onSubmit() {
          this.$refs.form.validate((valid) => {
              if(valid){
                this.form.harborName = this.harborBelongList.find(item => item.harborId === this.form.harborId)['harborName'];
                      this.updateHarborFy(this.form).then(res =>{
                          if(res.success){
                              this.$refs['form'].resetFields()
                              this.newHarbordialogVisible = false;
                                  this.getHarborFyList()
                              this.$message({
                                  message:'更新成功',
                                  type:'success'
                              })

                          }else{
                              let message=res.message
                              this.$message({
                                  message:message
                              })

                          }
                      });
              }
          })
      }
    },
    watch:{


    },
    created(){

      this.$store.dispatch('HarborBelongList')
//     //  this.$store.dispatch('RegionBelongCList')
//      Object.assign(this.form,this.detail);
//       if(this.form.isUnable){
//         this.form.isUnable = "1"
//       }else{
//          this.form.isUnable = "0"
//       }

          },
    mounted(){

    }
  }
</script>
