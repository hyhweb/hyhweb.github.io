<template>
  <el-dialog
    size="50%"
    title="申请单修改"
    v-model="modifyVisible" :before-close="closeDialog">
    <el-form ref="form" :rules="modifyFormRules" :model="form" label-width="100px">
      <el-form-item label="申请单编号" prop="requisitionId" :label-width="labelWidth">
        <el-input v-model="form.requisitionId" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <!--共通_默认显示当前登录者所在部门-->
      <el-form-item label="申请公司Code" prop="orgCode" :label-width="labelWidth" v-if="false">
        <el-input v-model="form.orgCode" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="申请公司" prop="subsidiary" :label-width="labelWidth">
        <el-input v-model="form.subsidiary" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <!------------------------------------------------------------------------------------------>
      <!--总公司登录场合-->
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(7)">确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {getChildCompanyAApi,getChildCompanyBApi,getLogisticsListAApi,getLogisticListApi} from '../../../api/modules/settlement';
  import {getCurrentDeptInfoApi} from '../../../api/modules/settlement';

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        payObjType:0,
        initData: {},
        transferSelected:[],
        labelWidth: '100px',
        modifyVisible: false,
        modifyFormRules: {
          orgCode: [
            {required: true, message: '申请公司不能为空', trigger: 'blur,change'}
          ],
          subsidiary: [
            {required:true,message:'申请公司不能为空',trigger:'blur,change'}
          ]
        },
        detail: {},
        initChild:{},
        initLevel:0,
        initChildCompany2:{},
        initMgLogistics:{},
        initLogisticsList:{},
        initLogisticsB:{},
        shipInitData:{},
        dockInitData:{},
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
          dockId:'',//码头Id
          shipId:'',//船公司Id
          payObjId: '',  //付款对象Id
          payObj: '',    //付款对象
          showFlgA: false,//付款对象(总公司)
          showFlgA1: false,//子公司
          showFlgA2: false,//物流公司(保底)
          showFlgB: false,//付款对象(子公司)
          showFlgB1: false,//物流公司(不保底)

          disabledA1: false,//子公司
          disabledA2: false,//物流公司(保底)
          disabledB1: false,//物流公司(不保底)
        }
      }
    },
    computed: {},

    methods: {
      ...mapActions([
        'getRequisitionList', 'modifyRequisition'
      ]),
      init(){
        //获取总公司-->A类子公司下拉框
        this.getChildCompanyA();
        //获取总公司-->B类子公司
        this.getChildCompanyB();
        //获取保底子公司-->物流公司下拉框
        this.getLogisticsList();
      },
      getList(){
        let param = Object.assign(this.paginationParams(), this.form)
      },
      closeDialog(){
        this.modifyVisible = false;
        this.transferSelected = [];
        this.$refs['form'].resetFields();
      },
      //总公司：子公司下拉框
      changeChildCompany(val){
      },
      //总公司：保底物流公司下拉框
      changeMGLogistics(val){
      },
      //子公司：不保底物流公司下拉框
      changeNoMglogistics(val){
        this.form.noMgLogistics = val;
      },
      changeTransfer(val){
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
      //付款对象下拉框
      getPayObjList(val){
        if(undefined == val || null == val || '' == val){
          var val = null;
        }
        let param = {driverIds: val};
        getPayObjListApi(param).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initData = data.data;
          }
        });
      },
      //获取当前登录用户的级别
      getUserLevel(){
        getUserLevelApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initLevel = data.data;
            //如果级别是运货柜总部则提供子公司下拉框选择功能
            if(this.initLevel == 1){
              this.form.showFlgC = true;
            }else{
              this.form.showFlgC = false;
              this.form.subCode = '';
            }
          }
        });
      },
      //子公司下拉框
      getChildCompany(){
        getDeptmentListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initChild = data.data;
          }
        });
      },
      //子公司下拉框联动(获取物流公司下拉框)
      selectChild(val,source){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val}
          getLogisticListApi(param).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              this.initLogisticsB = data.data;
              if(null == source || source!=1){
                this.form.logisticCode='';
              }
            }
          })
        }
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var payObjType = this.form.payObjectType;
            if(payObjType==7){////总公司--->子公司
              if (undefined == this.form.childCompany || null == this.form.childCompany || '' == this.form.childCompany) {
                this.$confirm('子公司不能为空！');
                return true;
              }
              this.form.logisticCode='';
              this.form.payObjId = this.form.childCompany;//DB.付款对象Id-->子公司下拉框Code
              this.form.reqRemark = this.form.reqRemark;//DB.申请备注-->画面.申请备注
            }else if(payObjType==8){//总公司--->保底物流公司
              if (undefined == this.form.mGLogistics || null == this.form.mGLogistics || '' == this.form.mGLogistics) {
                this.$confirm('保底物流公司不能为空！');
                return true;
              }
              this.form.payObjId = this.form.mGLogistics;//DB.付款对象Id-->子公司下拉框Code
              this.form.logisticCode = this.form.logisticCode;//DB.付款对象Id-->子公司下拉框Code
            }else if(payObjType==9){//子公司--->不保底物流公司
              if (undefined == this.form.noMgLogistics || null == this.form.noMgLogistics || '' == this.form.noMgLogistics) {
                this.$confirm('不保底物流公司不能为空！');
                return true;
              }
              this.form.logisticCode='';
              this.form.payObjId = this.form.noMgLogistics;//DB.付款对象Id-->子公司下拉框Code
            }
            this.modifyRequisition(this.form).then((res) => {
              if (res.success) {
                this.transferSelected = [];
                this.$refs['form'].resetFields();
                this.modifyVisible = false;
                this.$parent.getList();
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
              } else {
                this.modifyVisible = false;
                this.transferSelected = [];
                this.$message({
                  message: '更新失败',
                  type: 'error'
                })
              }
            });
          }
        })
      },
    },
    watch: {
      detail(val){
      }
    },
    created(){
      this.init()
    },
    mounted(){
    }
  }
</script>
