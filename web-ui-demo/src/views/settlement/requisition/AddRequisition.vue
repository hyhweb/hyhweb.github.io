<template>
  <el-dialog
    size="50%"
    title="新增申请单"
    v-model="addVisible" :before-close="closeDialog">
    <el-form ref="form" :rules="formRules" :model="form" label-width="100px">
      <!--共通_默认显示当前登录者所在部门-->
        <el-form-item label="申请公司Code" prop="orgCode" :label-width="labelWidth" v-if="false">
          <el-input v-model="form.orgCode" :disabled="true" class='control-width3'></el-input>
        </el-form-item>
        <el-form-item label="申请公司名称" prop="subsidiary" :label-width="labelWidth">
          <el-input v-model="form.subsidiary" :disabled="true" class='control-width3'></el-input>
        </el-form-item>
      <!--总公司登录场合-->
      <el-form-item label="付款对象" prop="payObjFlgA" :label-width="labelWidth" v-if="form.showFlgA">
        <el-select clearable filterable default-first-option @change="changeObjA" v-model="form.payObjFlgA" placeholder="请选择付款对象" class='control-width3'>
          <el-option
            v-for="item in payObjListA"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子公司(A类)" :label-width="labelWidth" prop="childCompany" v-if="form.showFlgA1">
        <el-select
          clearable
          filterable
          default-first-option
          @change="changeChildCompany"
          v-model="form.childCompany" placeholder="请选择子公司" class='control-width3'>
          <el-option
            v-for="item in initChildCompanyA.childCompanyAList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子公司(B类)" :label-width="labelWidth" prop="mGLogistics" v-if="form.showFlgA2">
        <el-select
          clearable
          filterable
          default-first-option
          @input="selectChild"
          @change="changeMGLogistics"
          v-model="form.mGLogistics" placeholder="请选择子公司" class='control-width3'>
          <el-option
            v-for="item in initChildCompanyB.childCompanyBList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物流公司" :label-width="labelWidth" prop="logisticCode" v-if="form.showFlgA2">
        <el-select
          clearable
          filterable
          default-first-option
          v-model="form.logisticCode" placeholder="请选择物流公司" class='control-width3'>
          <el-option
            v-for="item in initLogisticsB.logisticsList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <!--子公司登录场合-->
      <el-form-item label="物流公司" :label-width="labelWidth" prop="noMglogistics" v-if="form.showFlgB1">
        <el-select
          clearable
          filterable
          default-first-option
          @change="changeNoMglogistics"
          v-model="form.noMglogistics" placeholder="请选择物流公司" class='control-width3'>
          <el-option
            v-for="item in initLogisticsList.logisticsList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <br/>
      <!--共通_备注-->
      <el-form-item label="备注" prop="reqRemark" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.reqRemark" class='control-width2'></el-input>
      </el-form-item>
      <!--共通_按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(2)">确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getChildCompanyAApi,getChildCompanyBApi,getLogisticsListAApi,getLogisticListApi} from '../../../api/modules/settlement';
  import {getCurrentDeptInfoApi} from '../../../api/modules/settlement';

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '130px',
        initData: {},
        initChildCompanyA:{},
        initChildCompanyB:{},
        initLogisticsList:{},
        initLogisticsB:{},
        shipInitData:{},
        dockInitData:{},
        initLevel:0,
        addVisible: false,
        item: null,
        transferSelected:[],
        payObjIdList:[],
        formRules: {
          orgCode: [
            {required: true, message: '申请公司不能为空', trigger: 'blur,change'}
          ],
          subsidiary: [
            {required: true, message: '申请公司不能为空', trigger: 'blur,change'}
          ],
          payObjFlgA: [
            {required: true, message: '付款对象不能为空', trigger: 'blur,change'}
          ],
          childCompany : [
            {required: true, message: '子公司不能为空', trigger: 'blur,change'}
          ],
          mGLogistics:[
            {required: true, message: '物流公司不能为空', trigger: 'blur,change'}
          ],
          noMglogistics : [
            {required: true, message: '物流公司不能为空', trigger: 'blur,change'}
          ]
        },
        form: {
          orgCode:'',    //申请公司Code
          subsidiary:'', //申请公司名称
          payObjFlgA:'', //付款对象(总公司)
          payObjFlgB:'', //付款对象(子公司)
          childCompany:'',//子公司
          mGLogistics:'',//保底物流公司
          noMglogistics:'',//不保底物流公司
          logisticCode:'',//总公司付B类子公司的物流公司
          reqRemark: '',//备注
          payObjectType:0,//应付对象类型
          payObjId: '',  //付款对象Id
          payObj: '',    //付款对象
          showFlgA: false,//付款对象(总公司)
          showFlgA1: false,//子公司
          showFlgA2: false,//物流公司(保底)
          showFlgB1: false,//物流公司(不保底)
        },
        payObjListA: [
          {value: '7',label: '子公司(A类)'},
          {value: '8',label: '子公司(B类)'}]
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'getRequisitionList', 'addRequisition'
      ]),
      //画面初始化
      init(){
        //检验登录者级别
        this.checkLever();
        //获取当前登录者所在部门信息
        this.getCurrentDeptInfo();
        //获取总公司-->子公司下拉框
        this.getChildCompanyA();
        //获取总公司-->保底物流公司下拉框
        this.getChildCompanyB();
        //获取子公司-->不保底物流公司下拉框
        this.getLogisticsList();
      },
      //检验登录者级别
      checkLever(){
        //总公司登录者
        if(this.initLevel==1){
          this.form.showFlgA = true;//付款对象(总公司)21
          this.form.showFlgA1 = false;//子公司
          this.form.showFlgA2 = false;//物流公司
          this.form.showFlgB = false;//付款对象(子公司)
          this.form.showFlgB1 = false;//物流公司(不保底)
        }else{
            //子公司登录者
          this.form.showFlgA = false;//付款对象(总公司)
          this.form.showFlgA1 = false;//子公司
          this.form.showFlgA2 = false;//物流公司
          this.form.showFlgB1 = true;//物流公司(不保底)
          this.form.payObjectType=9;//应付对象类型
        }
      },
      //付款对象(总公司)下拉框
      changeObjA(){
        let flg = this.form.payObjFlgA;
        if(flg == 7){
          this.form.showFlgA = true;//付款对象(总公司)
          this.form.showFlgA1 = true;//子公司
          this.form.showFlgA2 = false;//物流公司
          this.form.showFlgB1 = false;//物流公司(不保底)
          this.form.payObjectType=7;//应付对象类型
          this.form.mGLogistics = '';//清除保底物流公司信息
        }else if(flg == 8){
          this.form.showFlgA = true;//付款对象(总公司)
          this.form.showFlgA1 = false;//子公司
          this.form.showFlgA2 = true;//物流公司
          this.form.showFlgB1 = false;//物流公司(不保底)
          this.form.payObjectType=8;//应付对象类型
          this.form.childCompany = '';//清除子公司信息
        }
      },
      //子公司登录场合
//      changeObjB(){
//        let flg = this.form.payObjFlgB;
//       if(flg == 9){//不保底物流公司
//          this.form.showFlgA = false;//付款对象(总公司)
//          this.form.showFlgA1 = false;//子公司
//          this.form.showFlgA2 = false;//物流公司
//          this.form.showFlgB1 = true;//物流公司(不保底)
//          this.form.payObjectType=9;//应付对象类型
//
//          //清除其他选项内容
//          this.form.payObjId =  '';  //付款对象Id
//          this.form.payObj =  '';    //付款对象
//        }else{
//          this.form.showFlgA = false;//付款对象(总公司)
//          this.form.showFlgA1 = false;//子公司
//          this.form.showFlgA2 = false;//物流公司
//          this.form.showFlgB1 = false;//物流公司(不保底)
//          this.form.payObjectType=0;//应付对象类型
//
//          //清除其他选项内容
//          this.form.noMglogistics = '';//不保底物流公司
//          this.form.payObjId =  '';  //付款对象Id
//          this.form.payObj =  '';    //付款对象
//        }
//      },
      //总公司：子公司下拉框
      changeChildCompany(val){
      },
      //总公司：保底物流公司下拉框
      changeMGLogistics(val){
      },
      //子公司：不保底物流公司下拉框
      changeNoMglogistics(val){
      },
      //新增确认
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            //总公司登录场合
            if(this.initLevel == 1){
                //总公司--->A类子公司
                if(this.form.payObjFlgA == 7){
                  this.form.orgCode = this.form.orgCode;//DB.机构Code-->画面.申请公司Code
                  this.form.subsidiary = this.form.subsidiary;//DB.申请单公司名称-->画面.申请公司名称
                  this.form.payObjId = this.form.childCompany;//DB.付款对象Id-->子公司下拉框Code
                  this.form.payObj = '';//DB.付款对象-->子公司下拉框OrgName(通过上面的Code传入后台进行获取)
                  this.form.reqRemark = this.form.reqRemark;//DB.申请备注-->画面.申请备注
                  this.form.payObjectType = 7;//DB.付款对象类型-->7(总公司应付子公司)
                  this.form.logisticCode='';//清空物流公司Code
                }else if(this.form.payObjFlgA == 8){
                    //总公司--->B类子公司
                  this.form.orgCode = this.form.orgCode;//DB.机构Code-->画面.申请公司Code
                  this.form.subsidiary = this.form.subsidiary;//DB.申请单公司名称-->画面.申请公司名称
                  this.form.payObjId = this.form.mGLogistics;//DB.付款对象Id-->子公司下拉框Code
                  this.form.payObj = '';//DB.付款对象-->子公司下拉框OrgName(通过上面的Code传入后台进行获取)
                  this.form.reqRemark = this.form.reqRemark;//DB.申请备注-->画面.申请备注
                  this.form.payObjectType = 8;//DB.付款对象类型-->7(总公司应付保底物流公司)
                }else{
                  this.$confirm('信息录入异常！');
                  return true;
                }
            }else if(this.initLevel == 2){//子公司登录场合
              if(this.form.payObjectType==9){
                //子公司--->不保底物流公司
                this.form.orgCode = this.form.orgCode;//DB.机构Code-->画面.申请公司Code
                this.form.subsidiary = this.form.subsidiary;//DB.申请单公司名称-->画面.申请公司名称
                this.form.payObjId = this.form.noMglogistics;//DB.付款对象Id-->物流公司下拉框OrgCode
                this.form.payObj = '';//DB.付款对象-->物流公司下拉框OrgName(通过上面的Code传入后台进行获取)
                this.form.reqRemark = this.form.reqRemark;//DB.申请备注-->画面.申请备注
                this.form.payObjectType = 9;//DB.付款对象类型-->9(子公司应付不保底物流公司)
              }else{
                  this.$confirm('信息录入异常！');
                  return true;
              }
            }else{
                this.$confirm('信息录入异常！');
                return true;
            }

            this.addRequisition(this.form).then(res => {
              if (res.success) {//新增成功
                this.$refs.form.resetFields();//清空录入项目
                this.item = null;
                this.addVisible = false;//关闭新增对话框
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.transferSelected=[];//清空司机车牌
                this.$parent.getList();//刷新主画面列表
                return true;
              } else {//新增失败
                this.addVisible = false;
                this.$message({
                  message: '新增失败',
                  type: 'error'
                })
                this.transferSelected=[];//清空司机车牌
                return false;
              }
            });
          }
        })
      },
      //关闭新增画面
      closeDialog(){
        this.item = null;
        this.transferSelected = [];
        this.$refs['form'].resetFields();
        this.addVisible = false;
      },
      //获取系统当前用户所在部门信息
      getCurrentDeptInfo(){
        getCurrentDeptInfoApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.form.orgCode = data.data.orgCode;
            this.form.subsidiary = data.data.orgName;
          }
        });
      },
      //获取总公司-->子公司下拉框
      getChildCompanyA(){
        getChildCompanyAApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initChildCompanyA = data.data;
          }
        });
      },
      //获取总公司-->保底物流公司下拉框
      getChildCompanyB(){
        getChildCompanyBApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initChildCompanyB = data.data;
          }
        });
      },
      //获取子公司-->不保底物流公司下拉框
      getLogisticsList(){
        getLogisticsListAApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initLogisticsList = data.data;
          }
        });
      },
      //子公司下拉框联动(获取物流公司下拉框)
      selectChild(val){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val}
          getLogisticListApi(param).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              this.initLogisticsB = data.data;
              this.form.logisticCode='';
            }
          })
        }
      },
    },
    created(){
    }
  }
</script>
