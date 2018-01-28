<template>
    <el-dialog
            title="新增车队管理信息"
            v-model="newFleetdialogVisible" class="console_body"
            :before-close="closeDialog">
        <el-form ref="form" :rules="addFormRules" :model="form" label-width="80px" >


            <el-form-item label="部门名称" prop="orgCode" class="float_left_cont" >
                <el-select
                  clearable filterable default-first-option
                class='control-width'
                v-model="form.orgCode"
                placeholder="请选择部门" >
                    <el-option value="">请选择</el-option>
                    <el-option
                            v-for="item in allDeptList"
                            :label="item.text"
                            :value="item.other"
                            :key="item.text"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车队名称" prop="carteamName" class="float_left_cont">
          <el-input class='control-width' v-model="form.carteamName"></el-input>
            </el-form-item>

            <el-form-item label="车队类型" prop="carteamType" class="float_left_cont">
          <el-select   clearable filterable default-first-option  class='control-width' v-model="form.carteamType" placeholder="请选择车队类型">
              <el-option value="">请选择</el-option>
            <el-option label="自有" value="1"></el-option>
            <el-option label="挂靠" value="2"></el-option>
              <el-option label="协议" value="3"></el-option>
          </el-select>
            </el-form-item>

            <el-form-item label="地址" prop="carteamAddress" class="float_left_cont">
           <el-input class='control-width' v-model="form.carteamAddress"></el-input>
            </el-form-item>


            <el-form-item label="联系电话" prop="carteamPhone"class="float_left_cont">
                <el-input class='control-width' v-model="form.carteamPhone"></el-input>
            </el-form-item>



            <el-form-item label="传真" prop="carteamFax" class="float_left_cont">
                <el-input class='control-width' v-model="form.carteamFax"></el-input>
            </el-form-item>

            <el-form-item label="联系人" prop="carteamContacts" class="float_left_cont">
                <el-input class='control-width' v-model="form.carteamContacts"></el-input>
            </el-form-item>

            <el-form-item label="支付方式" prop="paymentMethod" class="float_left_cont">
                <el-select   clearable filterable default-first-option  class='control-width' v-model="form.paymentMethod" placeholder="请选支付方式">
                    <el-option value="">请选择</el-option>
                    <el-option label="预付" value="1"></el-option>
                    <el-option label="月结" value="2"></el-option>
                    <el-option label="现结" value="3"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="检查司机日程" prop="enableRepeat" class="float_left_cont">
                <el-select   clearable filterable default-first-option  class='control-width' v-model="form.enableRepeat" placeholder="请选择">
                    <el-option value="">请选择</el-option>
                    <el-option label="允许重复" value="1"></el-option>
                    <el-option label="禁止重复" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="描述" prop="descrip" class="float_left_cont">
                <el-input class='control-width' v-model="form.descrip"></el-input>
            </el-form-item>

          <el-form-item label="指派此车队时是否短信微信通知客户" label-width="" prop="descrip" class="float_left_cont">
            <el-select   clearable filterable default-first-option  class='control-width' v-model="form.smsWechatSwitch" placeholder="请选择">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>


          <!--  <el-form-item label="车队代码" prop="carteamCode">
              <el-input v-model="form.carteamCode"></el-input>
          </el-form-item> -->
            <el-form-item label-width="0" style="text-align: center; margin-right: 30px;">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<!--以下为博博写的代码-->
<style>
  .float_left_cont{
    width: 45%;
   display: inline-block;
  }
  .console_body .el-dialog{
    min-width: 664px;
    margin: 0 auto;
  }
  .console_body .el-dialog .el-dialog__body .el-form{
    margin: 0 auto;
    text-align:left;
    display: block;
    padding:0 0 0 50px;
  }

</style>
<!--博博代码到此为止-->



<script>
    import {mapGetters, mapActions} from 'vuex'
    //import {mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'
    import util from '../../../common/js/util'


    export default {
        mixins: [pagination],
        props: {
            label: {},
        },
        components: {},
        data() {
            return {
                newFleetdialogVisible: false,
                addFormRules: {
                  carteamPhone: [{validator:this.$global.validate.phone}],
                  carteamFax: [{validator:this.$global.validate.phone}],
                  carteamName:[{required:true,message:'车队名称不能为空'}],
                },
                form: {
                    orgCode:'',
                    carteamName:'',
                    carteamType:'',
                    carteamAddress:'',
                    carteamPhone:'',
                    carteamFax:'',
                    carteamContacts:'',
                    paymentMethod:'',
                    enableRepeat:'',
                    descrip:'',
                    carteamCode:'',
                    smsWechatSwitch:false
                }

            }
        },
        computed: {
            ...mapGetters([
                'fleetadminList','allDeptList'
            ])
        },
        methods: {
            ...mapActions([
                'getFleetadminList','saveFleet','getDept'
            ]),
            getList(){
                let param = Object.assign(this.paginationParams(), this.form)
            },
            closeDialog(){
                this.newFleetdialogVisible = false;
                this.$refs['form'].resetFields()
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.saveFleet(this.form).then(res => {
                            if (res.success) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$refs['form'].resetFields()
                                this.getFleetadminList()
                                this.newFleetdialogVisible = false;
                            } else {

                                this.$message({
                                    message:res.message,
                                    type: 'error'
                                })
                            }
                        });

                    }
                })
            }
        },
        created(){
          this.$store.dispatch('getDept');
        },
        mounted(){
        }
    }
</script>
