<template>
<el-dialog
    title="新增字典信息"
    v-model="newDictdialogVisible">
  <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">
  <el-form-item label="字典编码"  prop="code">
    <el-input v-model="form.code"></el-input>
  </el-form-item>

  <el-form-item label="字典名称"  prop="value">
    <el-input v-model="form.value"></el-input>
  </el-form-item>
  <el-form-item label="排序" prop="sequence">
    <el-input v-model.number="form.sequence"></el-input>
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
           value: [
            { required: true, message: '请输入字典名称',trigger:'blur,change' }
          ],
          sequence: [
            { type: 'number', message: '排序必须为数字值' }
          ],
         },
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
        'getDictList','saveDict',
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
             },
      closeDialog(){
        this.newDictdialogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {    
       this.$refs.form.validate((valid) => {
          if(valid){
        this.saveDict(this.form).then(res =>{
                 if(res.success){
                 this.$refs['form'].resetFields()
                 this.newDictdialogVisible = false;
                 this.getDictList()
                 this.$message({
                  message:'新增成功',
                  type:'success'
                 })
                 this.$refs['form'].resetFields()
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