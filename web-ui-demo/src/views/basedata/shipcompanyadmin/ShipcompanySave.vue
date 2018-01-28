<template>
<el-dialog
    title="新增船公司信息"
    v-model="newShipcompanydialogVisible" class="shipcimany_save_windown">
  <el-form ref="form" :rules="addFormRules" :model="form"  label-width="100px">
  <el-form-item label="船公司名称" label-width="120px" prop="shipCompanyName" class="shipcompanysave_list_width shipcompanysave_list3_width">
    <el-input v-model="form.shipCompanyName"></el-input>
  </el-form-item>
  <el-form-item label="船公司简称"  label-width="130px" prop="simpleName" class="shipcompanysave_list_width shipcompanysave_list3_width">
    <el-input v-model="form.simpleName"></el-input>
  </el-form-item>
  <el-form-item label="联系人" prop="contacts" class="shipcompanysave_list_width">
    <el-input v-model="form.contacts"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="contactInfo" class="shipcompanysave_list_width">
    <el-input v-model="form.contactInfo"></el-input>
  </el-form-item>
  <!-- <el-form-item label="是否禁用" prop="disabled">
   <el-radio-group v-model="form.disabled" >
     <el-radio :label="1">是</el-radio>
     <el-radio :label="0" selected>否</el-radio>
   </el-radio-group>
    </el-form-item>  -->
 <el-form-item label="是否禁用"   prop="disabled" class="shipcompanysave_list_width">
   <el-select v-model="form.disabled" placeholder="请选择是否禁用">
     <el-option label="是" value="1"></el-option>
     <el-option label="否" value="0"></el-option>
   </el-select>
     </el-form-item>
  <el-form-item class="shipcompanysave_list_width shipcompanysave_list2_width">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<style>
  .shipcimany_save_windown .el-dialog{
    /*border: 3px solid red;*/
    min-width:664px!important;
    border-radius: 6px;
    padding-right: 14px;
  }

  .shipcimany_save_windown .el-dialog .el-dialog__body .shipcompanysave_list_width{
    width:48%;
    /*outline: 2px solid royalblue;*/
    margin:0!important;
    display: inline-block;
    padding-bottom: 20px;
  }
  .shipcimany_save_windown .el-dialog .el-dialog__body .shipcompanysave_list_width:last-of-type{
    padding-bottom: 0px;
  }
  .shipcimany_save_windown .shipcompanysave_list3_width .el-form-item__content{
    margin-left: 98px!important;
  }
  .shipcimany_save_windown .shipcompanysave_list3_width .el-form-item__label{
    width: 98px!important;
  }
  .shipcimany_save_windown .el-dialog .el-dialog__body .shipcompanysave_list2_width{
    width: 100%;
  }
  .shipcimany_save_windown  .el-dialog .el-dialog__body .el-form .shipcompanysave_list_width:last-of-type .el-form-item__content{
    width: 23%;
    margin: 0 auto!important;
  }

</style>



<script>
  import {mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'


  export default {
    mixins:[pagination],
    props: {
  label: {},
},
    components:{},
    data() {
      return {
        newShipcompanydialogVisible:false,
        addFormRules: {
          shipCompanyName: [
            { required: true, message: '请输入船公司名称',trigger:'blur,change' }
          ],
          simpleName: [
            { required: true, message: '请输入船公司简称',trigger:'blur,change' }
          ],
          contactInfo:[
            { validator:this.$global.validate.phone, required:true, trigger:'blur,change'}
          ]
        },

        form: {
                shipCompanyName :'',
                simpleName:'',
                contacts:'',
                contactInfo :'',
                shipCompanyCode:'',
                disabled:'0',
                orgCode:'',
        }

      }
    },
    computed:{

    },

    methods: {
      ...mapActions([
        'getShipcompanyList','saveShipcompany'
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
             },
      closeDialog(){
        this.newShipcompanydialogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
          this.$refs.form.validate((valid) => {
          if(valid){
              this.saveShipcompany(this.form).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.newShipcompanydialogVisible = false;
                 this.getShipcompanyList()
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
        }
      })
    }
    },
    created(){
          },
    mounted(){
      console.log(this.page)

    }
  }
</script>
