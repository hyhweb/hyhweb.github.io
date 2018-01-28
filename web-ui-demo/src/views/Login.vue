<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
           :class="{'demo-ruleForm login-container login_bg login_bg_one':bgOne,'demo-ruleForm login-container login_bg login_bg_two':bgTwo,'demo-ruleForm login-container login_bg login_bg_three':bgThree,'demo-ruleForm login-container login_bg login_bg_four':bgFour }"
           style="width: 100%;height: 100%;z-index: 1;position:fixed;
  outline: 2px solid green; margin:0 auto;justify-content: center;align-content:center;display: flex; background:#0066A8;">
    <img class="logo_position logo_position_one" src="../assets/logo2.png">
    <img class="logo_position logo_position_two" src="../assets/logo3.png">
    <div class="select_bg">
      <p  :class="{'special_style':char_Swith, 'color_special':color_Swith1}"  class="select_bg_one"  @click.prevent="selectBgOne">蓝蓝天空&nbsp;/</p>
      <p  :class="{'special_style':char_Swith,'color_special':color_Swith2 }" class="select_bg_two"  @click.prevent="selectBgtwo">惊涛骇浪&nbsp;/</p>
      <p  :class="{'special_style':char_Swith, 'color_special':color_Swith3 }" class="select_bg_three" @click.prevent="selectBgthree">海港城镇&nbsp;/</p>
      <p  :class="{'special_style':char_Swith, 'color_special':color_Swith4 }"  class="select_bg_four" @click.prevent="selectBgfour">滔滔海洋</p>
    </div>
    <div class="account_interface">
      <!--<h3 class="title" style="color:white; width:100%;line-height: 20px;margin-bottom:10px; font-size: 20px; font-weight: 100;" CLASS>运柜宝物流管理系统</h3>-->
      <div class="account_botton">
        <div class="account_concent">
          <el-form-item prop="account" class="db_lingheight">
            <h3 class="title" style="color:white; width:100%;line-height: 20px;margin-bottom:10px; font-size: 20px; font-weight: 100; color:#ff4949;" >运柜宝物流管理系统</h3>
            <!--<p class="bdp">用户名：</p>-->
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass"  class="db_lingheight">
            <!--<p class="bdp">密码：</p>-->
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"  ></el-input>
          </el-form-item>
          <el-checkbox @change="changeRememberPassword" v-model="checked"  class="remember db_remember">记住密码</el-checkbox>

          <el-form-item style="width:100%; margin-bottom:0px;">
            <el-button  type="primary" style="width:100%;background:#42434A;border:#42434A 1px solid;   " @click.native.prevent="handleSubmit2" :loading="logining">登录
            </el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>

          <p class="db_btn_p">建议使谷歌浏览器</p>
        </div>

      </div>

    </div>

  </el-form>
</template>


<!--博博 编写代码-->
<style>
  .select_bg{
    display: flex;
    cursor: pointer;
    width:260px;
    position: fixed;
    right: 0.9%;
    top:3%;
  }
  .select_bg p{
    color:white;
    font-size:0.8rem;
    flex:1;
  }
  .account_interface{
    width: 375px;
    height: 300px;
    margin:auto;
    margin-top:7%;
  }

  .account_botton{
    background:rgba(255,255,255,0.8);
    display: flex;
    padding:10px 10px;
    border-radius: 6px;
    box-shadow: 0px 0px 13px 3px rgba(0,0,0,0.25);
  }

  .account_concent{
    flex: 0.8;
    padding:0 10px;
    padding-right: 20px;
    margin:20px auto;
  }

  p[ class="bdp"]{
    font-size: 14px;
    line-height: 16px;
  }
  .db_lingheight{
    line-height:20px;
    margin-bottom:6px;
  }
  .db_lingheight input{
    height: 28px;
    border-radius:2px;
  }
  .db_remember{
    margin-bottom:10px!important;
  }
  .db_btn_p{
    color:rgba(0,0,0,0.8);
    width: 100%;
    text-align: center;
    margin-top:10px;
    font-size: 0.5rem;
  }
  .el-input__inner[placeholder="账号"]{
    background:url("../../image/user.png")no-repeat;
    background-position: 96% 3px;
  }

  .el-input__inner[placeholder="密码"]{
    background:url("../../image/passwords.png")no-repeat;
    background-position: 96% 3px;
    background-size: 16px;
  }

  .login_bg{
    background-repeat: no-repeat !important;
    background-size: cover !important;
    margin: auto;
    display: block;
    background-attachment: fixed!important;
    position: fixed!important;
    width: 100%!important;
    height: 100%!important;
  }


  .login_bg_one{
    background-image: url(../assets/DL_08.jpg) !important;
  }
  .login_bg_two{
    background-image: url(../assets/DL_da_bei_jing.png) !important;
  }
  .login_bg_three{
    background-image: url(../assets/DL_12.jpg) !important;
  }
  .login_bg_four{
    background-image: url(../assets/DL_10.jpg) !important;
  }
  .special_style{
    color:#666666!important;
  }
  .color_special{
    color:red!important;
  }
  .logo_position{
    position: fixed;
    left: 2%;
    top: 4%;
    width: 220px;
  }

</style>




<script>
  import api from '../api/api';
  // import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        bgOne:true,
        bgTwo: false,
        bgThree: false,
        bgFour: false,
        char_Swith:false,
        color_Swith1:true,
        color_Swith2:false,
        color_Swith3:false,
        color_Swith4:false,

        ruleForm2: {
          account: '',
          checkPass: '',
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
        },
        checked: false,
      };
    },
    methods: {
      changeRememberPassword(){
        console.log(this.checked)
        if(this.checked){
          console.log(this.ruleForm2)
        }
      },
      //博博写的代码
      selectBgOne(){
        this.bgOne = true;
        this.bgTwo = false;
        this.bgThree = false;
        this.bgFour = false;
        this.char_Swith = false;
        this.color_Swith1 = true;
        this.color_Swith2 = false;
        this.color_Swith3= false;
        this.color_Swith4 = false;
      },
      selectBgtwo(){
        this.bgOne = false;
        this.bgTwo = true;
        this.bgThree = false;
        this.bgFour = false;
        this.char_Swith = false;
        this.color_Swith1 = false;
        this.color_Swith2 = true;
        this.color_Swith3= false;
        this.color_Swith4 = false;

      },
      selectBgthree(){
        this.bgOne = false;
        this.bgTwo = false;
        this.bgThree = true;
        this.bgFour = false;
        this.char_Swith = true;
        this.color_Swith1 = false;
        this.color_Swith2 = false;
        this.color_Swith3= true;
        this.color_Swith4 = false;
      },
      selectBgfour(){
        this.bgOne = false;
        this.bgTwo = false;
        this.bgThree = false;
        this.bgFour = true;
        this.char_Swith =true;
        this.color_Swith1 = false;
        this.color_Swith2 = false;
        this.color_Swith3= false;
        this.color_Swith4 = true;
      },
      //博博代码到此为止


      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            // _this.$router.replace('/table');
            this.logining = true;
            // NProgress.start();
            const loginParams = {
              username: this.ruleForm2.account,
              password: this.ruleForm2.checkPass,
            };
            api.sys.auth.requestLogin(loginParams)
              .then((res) => {
                this.logining = false;
                if (!res.data.success) {
                  throw res.data.message;
                }
                /*记住密码*/
                if(this.checked){
                  this.$global.cookie.set('account',loginParams.username)
                  this.$global.cookie.set('checkP',loginParams.password)
                  this.$global.cookie.set('remember','1')
                }else{
                  this.$global.cookie.set('account',loginParams.username)
                  this.$global.cookie.del('checkP')
                  this.$global.cookie.set('remember','0')
                }
                const { id_token, permissions, user, menus } = res.data.data;
                sessionStorage.setItem('id_token', id_token);
                console.log('permissions', permissions);
                sessionStorage.setItem('permissions', JSON.stringify(permissions));
                sessionStorage.setItem('menus', JSON.stringify(menus));
                if (typeof user === 'object') {
                  sessionStorage.setItem('user', JSON.stringify(user));
                } else {
                  sessionStorage.setItem('user', JSON.stringify({ name: user }));
                }

                localStorage.clear();
                this.$router.push({ path: '/' });
              })
              .catch((error) => {
                console.log(error);
                this.logining = false;
                this.$message({
                  message: '用户名或密码错误',
                  type: 'error',
                });
              });
            return true;
          }
          console.log('error submit!!');
          return false;
        });
      },
    },
    mounted(){

      this.ruleForm2 = {
        account: this.$global.cookie.get('account'),
        checkPass: this.$global.cookie.get('checkP'),
      }
      if(this.$global.cookie.get('remember') == "1"){
        this.checked = true
      }else{
        this.checked = false
      }
      document.onkeydown=(e) => { if(e && e.keyCode==13 ){    this.handleSubmit2(e)}}


    }
  };

  //  $('.select_bg_one').click(
  //      function () {
  //        console.log(11);
  //        $('.login_bg').addClass('login_bg_two')
  //      }
  //  )



</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  }
</style>
