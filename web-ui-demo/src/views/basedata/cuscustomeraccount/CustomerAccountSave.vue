<template>
  <el-dialog
    title="新增客户帐户信息"
    v-model="newAddCustomerAccountdialogVisible">
    <el-form ref="form" :rules="addFormRules" :model="form"  label-width="80px">
      <el-form-item label="用户名称"  prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginName"    >
        <el-input v-model="form.loginName"  ></el-input>
      </el-form-item>
      <el-form-item label="登陆用户密码" prop="password">
        <el-input v-model="form.password"   type="password"  ></el-input>
      </el-form-item>
      <el-form-item label="确认用户密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword"   type="password" ></el-input>
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

      <el-form-item label="是否可用" prop="available">
        <el-select v-model="form.available" placeholder="请选择是否可用">
          <el-option label="可用" value="1" ></el-option>
          <el-option label="不可用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item  label="用户所属客户" prop="customerId">
        <el-select clearable filterable default-first-option v-model="form.customerId" placeholder="选择客户" >
          <el-option v-for="item in customList"
                     :label="item.customerName"
                     :value="item.customerId"
                     :key="item.customerId">
          </el-option>
        </el-select>
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
//  import   {checkLoginNameApi}           from '../../../api/modules/customer'

  export default {
    mixins:[pagination],
    props: {
      label: {},
    },
    components:{},
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      const checkLogNames = (rule,value,callback) => {
        this.checkloginName(this.form).then((res)=>{
            if(res.success){
              callback(new Error('用户名已被注册!'));
            }else{
                callback();
            }
        })
      };
      return {
        newAddCustomerAccountdialogVisible:false,
        //newDictdialogVisible:false,
        addFormRules: {
          phone: [
            { validator:this.$global.validate.phone, required:true, trigger:'blur,change' }
          ],
          email: [
            { validator:this.$global.validate.email, required:true, trigger:'blur,change' }
          ],
          username: [
            { required: true, message: '用户名长度至少为2', trigger: 'blur, change', min: 2 }
          ],
          password: [
            { required: true, message: '密码需要至少5位', trigger: 'blue, change', min: 5 },
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' },
          ],
          customerId: [
            { required: true, message: '请选择用户所属客户', trigger: 'blue, change' },
          ],
          loginName: [
            { required: true, message: '登录名长度至少为4', trigger: 'blur, change', min: 4 },
           {validator:checkLogNames,trigger: 'blur'}
          ],
          available: [
            { required: true, message: '请选择是否禁用', trigger: 'blue, change' },
          ],

        },
        form: {
          username:'',
          email:'',
          phone:'',
          qqNumber:'',
          wechat:'',
          available:'',
          loginName:'',
          password:'',
          customerId:'',
          confirmPassword:'',

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
        'getCustomList','customerAccountSave','checkloginName'
      ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
      },
      closeDialog(){
        this.newAddCustomerAccountdialogVisible = false;
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid){
            this.customerAccountSave(this.form).then(res =>{
                  if(res.success){
                    this.$refs['form'].resetFields()
                    this.newAddCustomerAccountdialogVisible = false;
                    this.$emit('closeUpdate');
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
    watch:{
      detail(val){
        val.orgId = parseInt(val.orgId)
        Object.assign(this.form,val)
        if(this.form.available){
          this.form.available = "1"
        }else{
          this.form.available = "0"
        }
      }
    },

    mounted(){
      this.getCustomList()
    }
  }
</script>
