<template>
<el-dialog
    title="编辑船公司信息"
    v-model="newShipcompanydialogVisible" class="shipcimany_updata_windown">
  <el-form ref="form" :rules="updateFormRules" :model="form"  label-width="80px">
  <el-form-item label="船公司名称"  prop="shipCompanyName" class="shipcompanydata_list_width shipcompanydata_list3_width">
    <el-input v-model="form.shipCompanyName"></el-input>
  </el-form-item>
  <el-form-item label="船公司简称"  prop="simpleName" class="shipcompanydata_list_width shipcompanydata_list3_width">
    <el-input v-model="form.simpleName"></el-input>
  </el-form-item>
  <el-form-item label="联系人" prop="contacts" class="shipcompanydata_list_width">
    <el-input v-model="form.contacts"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="contactInfo" class="shipcompanydata_list_width">
    <el-input v-model="form.contactInfo"></el-input>
  </el-form-item>
    <el-form-item label="是否禁用"   prop="disabled" class="shipcompanydata_list_width shipcompanydata_list4_width">
    <!-- <el-radio class="radio" v-model="form.radio" label="1">是</el-radio>
    <el-radio class="radio" v-model="form.radio" label="2">否</el-radio> -->
 <el-select v-model="form.disabled" placeholder="请选择是否禁用">
     <el-option label="是" value="1"></el-option>
     <el-option label="否" value="0"></el-option>
   </el-select>
  </el-form-item>
  <el-form-item class="shipcompanydata_list_width shipcompanydata_list2_width">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>

<style>
  .shipcimany_updata_windown .el-dialog{
    /*border: 3px solid red;*/
    min-width:664px!important;
    border-radius: 6px;
    padding-right: 14px;
  }

  .shipcimany_updata_windown .el-dialog .el-dialog__body .shipcompanydata_list_width{
    width:48%;
    /*outline: 2px solid royalblue;*/
    margin:0!important;
    display: inline-block;
    padding-bottom: 20px;
  }



  .shipcimany_updata_windown .el-dialog .el-dialog__body .shipcompanydata_list2_width{
    width: 100%;
  }
  .shipcimany_updata_windown .el-dialog .el-dialog__body .shipcompanydata_list_width:last-of-type{
    padding-bottom: 0px;
  }
  .shipcimany_updata_windown  .el-dialog .el-dialog__body .el-form .shipcompanydata_list_width:last-of-type .el-form-item__content{
    width: 23%;
    margin: 0 auto!important;
  }
  .shipcimany_updata_windown .shipcompanydata_list3_width .el-form-item__label{
    padding: 5px 12px 0px 0;
  }
  .shipcimany_updata_windown .shipcompanydata_list4_width .el-select{
    width:100%;
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
        newShipcompanydialogVisible:false,
        updateFormRules: {
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
        detail:{},

        form: {
                shipCompanyName :'',
                simpleName:'',
                contacts:'',
                contactInfo :'',
                shipCompanyCode:'',
                disabled:'',
                orgCode:'',
        }

      }
    },
    computed:{

    },

    methods: {
      ...mapActions([
        'getShipcompanyList','updateShipcompany'
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
              if (valid) {
                  this.updateShipcompany(this.form).then((res) => {
                      if (res.success) {
                          this.$refs['form'].resetFields()
                          this.newShipcompanydialogVisible = false;
                          this.getShipcompanyList()
                          this.$message({
                              message: '更新成功',
                              type: 'success'
                          })
                      } else {
                          this.newShipcompanydialogVisible = false;
                          this.$message({
                              message: '更新失败',
                              type: 'error'
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
        if(this.form.disabled){
         this.form.disabled = "1"
       }else{
          this.form.disabled = "0"
       }
      }
    },
    created(){
          },
    mounted(){
      console.log(this.page)
    }
  }
</script>
