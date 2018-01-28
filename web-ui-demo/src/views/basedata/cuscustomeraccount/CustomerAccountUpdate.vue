<template>
  <el-dialog
    title="编辑客户帐户信息"
    v-model="newACustomerAccountdialogVisible">
    <el-form ref="form" :rules="updateFormRules" :model="form"  label-width="80px">
      <el-form-item label="登录账号" prop="loginName">
        <el-input v-model="form.loginName"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属客户名称"  prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="qq" prop="qqNumber">
        <el-input v-model="form.qqNumber"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input v-model="form.wechat"></el-input>
      </el-form-item>
      <el-form-item label="是否启用"   prop="available">
        <!-- <el-radio class="radio" v-model="form.radio" label="1">是</el-radio>
        <el-radio class="radio" v-model="form.radio" label="2">否</el-radio> -->
        <el-select clearable filterable default-first-option v-model="form.available"    placeholder="请选择是否启用">
          <el-option label="不可用" value="0"></el-option>
          <el-option label="可用" value="1"></el-option>
        </el-select>
      </el-form-item>
        <!--<el-form-item label="客户名称" prop="customerName">-->
          <!--<el-input v-model="form.customerName"  ></el-input>-->
        <!--</el-form-item>-->



        <!--<el-form-item label="用户" prop="customerId" >-->
          <!--<el-select v-model="form.customerId" placeholder="请选择用户" disabled>-->
            <!--<el-option v-for="item in customList"-->
                       <!--:label="item.customerName"-->
                       <!--:value="item.customerId"-->
                       <!--:key="item"-->
                       <!--@change="test"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->


      <el-form-item  label="用户所属客户" prop="customerId">
        <el-select clearable filterable default-first-option v-model="form.customerId" placeholder="选择客户"  class='control-width' >
          <el-option v-for="item in customList"
                     :label="item.customerName"
                     :value="item.customerId"
                     :key="item.customerId">
          </el-option>
        </el-select>
        <!--<el-form-item label="客户所属名称" prop="name"    >-->
        <!--<el-input v-model="form.name"  :disabled="true"></el-input>-->
        <!--</el-form-item>-->
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
    components:{},
    data() {
      return {
        newACustomerAccountdialogVisible:false,
        updateFormRules: {
          username: [
            { required: true, message: '请输入船客户名称',trigger:'blur,change' }
          ],
          email: [
            { validator:this.$global.validate.email, required:true, trigger:'blur,change' }
          ],
          phone:[
            { validator:this.$global.validate.phone, required:true, trigger:'blur,change'}
          ],
          qqNumber:[
            { validator:this.$global.validate.number, required:true, trigger:'blur,change'}
          ],
          customerId: [
            { required: true, message: '请选择用户所属客户',trigger:'blur,change' }
          ],
        },
        detail:{},

        form: {
          username :'',
          email:'',
          phone:'',
          qqNumber :'',
          wechat:'',
          name:'',
          available:'',
          customerId:'',

        }

      }
    },
    computed:{
      ...mapGetters([
        'customList',
      ])
    },

    methods: {
      ...mapActions([
        'CustomerAccountUpdate','getCustomList'
      ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
      },
      closeDialog(){
        this.newACustomerAccountdialogVisible = false;
//        this.$refs['form'].resetFields()
      },
      onSubmit() {

        this.$refs.form.validate((valid) => {
          if (valid) {
            this.CustomerAccountUpdate(this.form).then((res) => {
              if (res.success) {
                this.$refs['form'].resetFields()
                this.newACustomerAccountdialogVisible = false;
                this.$alert('更新成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$emit('closeUpdate');
                  }
                });
              } else {
                this.newACustomerAccountdialogVisible = false;
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
//        val.available = parseInt(val.available)
        Object.assign(this.form,val)
        if(this.form.available){
          this.form.available = "1"
        }else{
          this.form.available = "0"
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
