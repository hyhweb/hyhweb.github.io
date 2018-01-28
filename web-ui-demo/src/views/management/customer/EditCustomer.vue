<template>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" id="SysAdminEditCustomer">
    <el-form inline :model="form" ref="editform" :rules="rules">
      <el-col>
        <el-form-item label="客户名称:" prop="customerName" :label-width="labelWidth">
          <el-input v-model="form.customerName" style="width: 300px;"></el-input>
        </el-form-item>
      </el-col>
      <!--		<el-col>
                    <el-form-item label="客户编码:" prop="customerCode" :label-width="labelWidth">
                        <el-input v-model="form.customerCode"></el-input>
                    </el-form-item>
                </el-col>-->
      <el-col>
        <el-form-item label="邮箱:" prop="email" :label-width="labelWidth">
          <el-input v-model="form.email" style="width: 300px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="客户联系人" prop="linkman" :label-width="labelWidth">
            <el-input v-model="form.linkman" style="width:300px;"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="电话:" prop="phone" :label-width="labelWidth">
          <el-input v-model="form.phone" style="width: 300px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="备注" prop="remark" :label-width="labelWidth">
          <el-input v-model="form.remark" style="width:300px;"/>
        </el-form-item>
      </el-col>
      <!--		<el-col>
                    <el-form-item label="QQ号:" prop="qqNumber" :label-width="labelWidth">
                        <el-input v-model="form.qqNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="微信号:" prop="wechat" :label-width="labelWidth">
                        <el-input v-model="form.wechat"></el-input>
                    </el-form-item>
                </el-col>-->
      <el-col>
        <el-form-item label="业务员" prop="salesmanId" :label-width="labelWidth">
          <el-select
            clearable
            filterable
            default-first-option
            v-model="form.salesmanId" placeholder="请选择">
            <el-option
              v-for="item in selectData.userDropDwonList"
              :key="item.value"
              :label="item.text"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="客户类型" prop="customerType" :label-width="labelWidth">
          <el-select clearable filterable default-first-option v-model="form.customerType" placeholder="请选择">
            <el-option label="A" :value="0"/>
            <el-option label="B" :value="1"/>
            <el-option label="C" :value="2"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="结算天数(天)" prop="settleDay" :label-width="labelWidth">
          <el-select
            clearable
            filterable
            default-first-option
            allow-create
            v-model="form.settleDay" placeholder="请选择">
            <el-option
              v-for="item in settleDaySelect"
              :key="item.value"
              :label="item.text"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="是否专票:" prop="invoicing" :label-width="labelWidth">
          <el-switch
            v-model="form.invoicing"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="是"
            off-text="否">
          </el-switch>
        </el-form-item>

        <el-form-item label="改送费税点" prop="taxRate" style="margin-left: -6px">
          <el-input v-model="form.taxRate" style="width: 150px;"/>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="是否结算:" prop="settleAccounts" :label-width="labelWidth">
          <el-switch
            v-model="form.settleAccounts"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="是"
            off-text="否">
          </el-switch>
        </el-form-item>

        <el-form-item label="开票性质" prop="invoiceProperties" style="margin-left: 8px">
          <el-select style="width: 150px;"
            clearable
            filterable
            default-first-option
            v-model="form.invoiceProperties" placeholder="请选择">
            <el-option
              v-for="item in invoicePropertiesList"
              :key="item.value"
              :label="item.text"
              :value="item.text">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="是否可用:" prop="available" :label-width="labelWidth">
          <el-switch
            v-model="form.available"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="是"
            off-text="否">
          </el-switch>
        </el-form-item>

        <el-form-item label="运费税点" prop="customerTaxRate" style="margin-left: 8px">
          <el-input v-model="form.customerTaxRate" style="width: 150px;"/>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="是否扣货:" prop="isDetainingCargo" :label-width="labelWidth">
          <el-switch
            v-model="form.isDetainingCargo"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="是"
            off-text="否">
          </el-switch>
        </el-form-item>

        <el-form-item label="杂费税点" prop="invoiceRemark" style="margin-left: 8px">
          <el-input v-model="form.invoiceRemark" style="width: 150px;"/>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="是否票结:" prop="isTicket" :label-width="labelWidth">
          <el-switch
            v-model="form.isTicket"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="是"
            off-text="否">
          </el-switch>
        </el-form-item>
      </el-col>

      <el-form-item label="派车短信提醒对象:" prop="isMessage" :label-width="labelWidth">
        <el-checkbox-group v-model="elCheckboxList1" @change="showSendcarSmsObj1">
          <el-checkbox label="0">联系电话</el-checkbox>
          <el-checkbox label="1">联系人</el-checkbox>
          <el-checkbox label="2">货主</el-checkbox>
          <el-checkbox label="3">代理</el-checkbox>
          <el-checkbox label="4">收货人</el-checkbox>
        </el-checkbox-group>
        <span class="editCustomerTpis">(注：以上联系电话为本页面配置的客户联系电话，后4项为订单中录入的联系电话)</span>
      </el-form-item>

      <el-form-item label="物流跟踪微信提醒开关:" prop="isWechat" :label-width="labelWidth">
        <el-checkbox-group v-model="elCheckboxList2" @change="showSendcarSmsObj2">
          <el-checkbox label="0">企业账号</el-checkbox>
          <el-checkbox label="1">联系人</el-checkbox>
          <el-checkbox label="2">货主</el-checkbox>
          <el-checkbox label="3">代理</el-checkbox>
          <el-checkbox label="4">收货人</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-col>
      <el-form-item label="短信通知企业专属黑名单" prop="enterpriseSmsBlacklist" :label-width="labelWidth" style="margin-bottom: 60px;">
        <el-input v-model="form.enterpriseSmsBlacklist" type="textarea" :rows="5" style="width: 393px;"></el-input>
        <span class="editCustomerTpis">(注：设置企业专属黑名单，将收不到此客户订单的提醒，但不影响收取其他客户的提醒，多个手机以逗号分隔)</span>
      </el-form-item>
      </el-col>

      <el-col>
        <el-form-item style="display: block; text-align: center">
          <el-button type="primary" @click="customerSave">提交
          </el-button>
        </el-form-item>
      </el-col>

    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import {getUserDropdownList, getInvoicePropertiesList} from '../../../api/modules/customer'
  export default{
    data() {
      const floatOnly = (rule, value, callback) => {
        if (value) {
          if (isNaN(value)) {
            callback(new Error('税点格式不正确'));
          } else if (value < 0 || value > 1) {
            callback(new Error('税点为0-1之间的小数'));
          }
        }
        callback();

//        if (!value) {
//          return callback(new Error('未定义'));
//        }
//        if (isNaN(value)) {
//          return callback(new Error('非数字'));
//        }
//        if (String(value).indexOf('%')) {
//          return callback(new Error('带百分号'));
//        }
      };
      return{
        dialogVisible:false,
        mode:"add",
        labelWidth:'100px',
        selectData:{},
        invoicePropertiesList:{},
        rules:{
          customerName: [{ required: true, message: '客户名称不能为空' }]
//          taxRate: [{ validator: floatOnly, trigger: 'blur,change' }]
        },
        settleDaySelect: [
          {text: '30', value: 30},
          {text: '45', value: 45},
          {text: '60', value: 60},
          {text: '75', value: 75},
          {text: '90', value: 90}
        ],
        form:{
          salesmanId:"",
          customerName:"",
          email:"",
          phone:"",
          available:true,
          settleAccounts:true,
          customerType:"",
          settleDay:0,
          invoicing:true,
          isDetainingCargo:false,
          isTicket: false,
          linkman:'',
          remark:'',
          taxRate: '0.06',
          invoiceProperties: '',
          customerTaxRate: '',
          invoiceRemark: '',
          sendcarSmsObj: [],
          logisticsWechatSwitch: [],
          enterpriseSmsBlacklist: ''
        },
        elCheckboxList1: [],
        elCheckboxList2: [],
        elCheckboxList11: ['0','0','0','0','0'],
        elCheckboxList22: ['0','0','0','0','0']
      }
    },
    computed:{
      dialogTitle(){
        this.form.salesmanId = this.form.salesmanId != null ? this.form.salesmanId.toString():"";
        if(this.mode == "add"){
          return "新增客户"
        }else if(this.mode == "edit"){
          return "修改客户信息"
        }
      }
    },
    methods:{
      ...mapActions(['customerInfoSave','customerUpdate']),
      showSendcarSmsObj1 (val) {
//        this.elCheckboxList11 = ['0','0','0','0','0'];
//        console.log(val)
//        console.log(this.elCheckboxList11)
      },
      showSendcarSmsObj2 (val) {
//        this.elCheckboxList22 = ['0','0','0','0','0'];
//        console.log(val)
//        console.log(this.elCheckboxList22)

      },

      customerSave(){
        this.$refs.editform.validate((valid)=>{
          if(valid){
            //提交之前先对数组11、数组22进行重置
            this.elCheckboxList11 = ['0','0','0','0','0'];
            this.elCheckboxList22 = ['0','0','0','0','0'];

            //对 sendcarSmsObj, logisticsWechatSwitch 做转换
            //根据数组1，对数组11做替换,将替换后的数组11赋值给字符串1
            if (this.elCheckboxList1.length > 0) {
              this.elCheckboxList1.forEach(item => {
                this.elCheckboxList11.splice(item,1,'1');
              })
              this.form.sendcarSmsObj = this.elCheckboxList11.join();
            }
            //根据数组2，对数组2做替换,将替换后的数组22赋值给字符串2
            if (this.elCheckboxList2.length > 0) {
              this.elCheckboxList2.forEach(item => {
                this.elCheckboxList22.splice(item,1,'1');
              })
              this.form.logisticsWechatSwitch = this.elCheckboxList22.join();
            }


            if(this.mode == "add"){
              this.customerInfoSave(this.form).then((res)=>{
                if(res.success){
                  this.$message({
                    message:'添加成功',
                    type:'success'
                  })

                  this.elCheckboxList1 = [];
                  this.elCheckboxList2 = [];
                  this.elCheckboxList11 = ['0','0','0','0','0'];
                  this.elCheckboxList22 = ['0','0','0','0','0'];

                  this.$refs.editform.resetFields()
                  this.$parent.getList()
                  this.dialogVisible = false
                }else{
                  this.$message({
                    message:res.message,
                    type:'warning'
                  })
                }
              })
            }else if(this.mode == "edit"){
              delete this.form.createDate;
              delete this.form.updateDate;
              this.customerUpdate(this.form).then((res)=>{
                if(res.success){
                  this.$message({
                    message:'修改成功',
                    type:'success'
                  })

                  this.elCheckboxList1 = [];
                  this.elCheckboxList2 = [];
                  this.elCheckboxList11 = ['0','0','0','0','0'];
                  this.elCheckboxList22 = ['0','0','0','0','0'];

                  this.$refs.editform.resetFields()
                  this.$parent.getList()
                  this.dialogVisible = false
                }else{
                  this.$message({
                    message:res.message,
                    type:'warning'
                  })
                }
              })
            }
          }
        })
      },
      //获取用户下拉框数据
      getSelectData(){
        getUserDropdownList().then((res)=>{
          this.selectData = res.data.data;
        }),

          getInvoicePropertiesList().then((res)=>{
          this.invoicePropertiesList = res.data.data;
        })
      }
    },

    created(){
      this.getSelectData();

    },
    mounted(){

    }

  }
</script>

<style>
  #SysAdminEditCustomer .el-dialog {
    width: 550px;
  }
  #SysAdminEditCustomer .el-select {
    width: 300px;
  }
  #SysAdminEditCustomer .editCustomerTpis {
    position: absolute;
    left: 3px;
    line-height: 1.5;
    font-size: 12px;
    color: red;
  }

</style>
