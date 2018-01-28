<template>
<el-dialog
    title="编辑字典信息"
    v-model="newDictdialogVisible">
  <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">
  <el-form-item label="字典编码"  prop="code">
    <el-input v-model="form.code"></el-input>
  </el-form-item>
  <el-form-item label="字典名称"  prop="value">
    <el-input v-model="form.value"></el-input>
  </el-form-item>
  <el-form-item label="排序" prop="sequence">
    <el-input v-model="form.sequence"></el-input>
  </el-form-item>
  <el-form-item label="上级字典编码" prop="parentCode">
    <el-input v-model="form.parentCode"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
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
        newDictdialogVisible:false,
        addFormRules: {
          code: [
            { required: true, message: '请输入字典名称',trigger:'blur,change' }
          ],
         },
        detail:{},
        form: {
                code:'',  
                value:'', 
                sequence:'',
                parentCode:'', 
        }
         
      }
    },
    computed:{
      
    },
      
    methods: {
      ...mapActions([
        'getDictList','updateDict'
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
             },
      closeDialog(){
        this.newDictdialogVisible = false;
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid){
            
             this.updateDict(this.form).then(res =>{
               if(res.success){
                 this.$refs['form'].resetFields()
                 this.newDictdialogVisible = false;
                 this.getDictList()
                 this.$message({
                  message:'更新成功',
                  type:'success'
                 })
               }else{
                this.newDictdialogVisible = false;
                this.$message({
                  message:'更新失败',
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
        
      }
    },
    created(){
      //this.$store.dispatch('RegionBelongList')
       Object.assign(this.form,this.detail);
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>