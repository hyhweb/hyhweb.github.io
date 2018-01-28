<template>
  <el-dialog
    size="50%"
    title="申请单修改"
    v-model="modifyVisible" :before-close="closeDialog">
    <el-form ref="form" :rules="modifyFormRules" :model="form" label-width="100px">
      <el-form-item label="申请单编号" prop="requisitionId" :label-width="labelWidth">
        <el-input v-model="form.requisitionId" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <!--总部登录才会显示-->
      <el-form-item label="申请单公司" :label-width="labelWidth" prop="orgCode" v-if="form.showFlgC">
        <el-select
          clearable
          filterable
          default-first-option
          v-model="form.orgCode" placeholder="请选择申请单公司" class='control-width3'>
          <el-option
            v-for="item in initChild.deptmentList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!--办单员以外场合显示-->
      <el-form-item label="付款对象" prop="payObj" v-if="form.showFlgA" :label-width="labelWidth">
        <el-input v-model="form.payObj" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <!--办单员场合显示-->
      <el-form-item label="付款对象" prop="payObjBDY" v-if="form.showFlgB" :label-width="labelWidth">
        <el-input v-model="form.payObjBDY" :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="办单员姓名" prop="payObj" v-if="form.showFlgB" :label-width="labelWidth">
        <el-input v-model="form.payObj" class='control-width3'></el-input>
      </el-form-item>
      <!--司机/车牌的场合显示-->
      <el-transfer
        v-if="form.showFlgD"
        filterable
        filter-placeholder="请输入司机或车牌"
        :titles="titles"
        v-model="transferSelected"
        @change="changeTransfer"
        :data="initData.payObjList"
        :props="{
key: 'value',
label: 'text'
}">
      </el-transfer>
      <el-form-item label="付款方式" prop="payType" :label-width="labelWidth">
        <el-select clearable filterable default-first-option v-model="form.payType" placeholder="请选择付款方式" class='control-width3'>
          <el-option label="支票" value="1">支票</el-option>
          <el-option label="现金" value="2">现金</el-option>
          <el-option label="银行转账" value="3">银行转账</el-option>
        </el-select>
      </el-form-item>
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
  import pagination from '../../../common/mixins/pagination'
  import {getPayObjListApi,getDeptmentListApi,getUserLevel1Api} from '../../../api/modules/settlement';

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        initData: {},
        transferSelected:[],
        labelWidth: '100px',
        modifyVisible: false,
        titles:['所有司机/车牌','选中的司机/车牌'],
        modifyFormRules: {
          orgCode: [
            {required: true, message: '申请单公司不能为空', trigger: 'blur,change'}
          ],
          payType: [
            {required: true, message: '付款方式不能为空', trigger: 'blur,change'}
          ],
          payObj: [
            {required: true, message: '办单员姓名不能为空', trigger: 'blur,change'}
          ]
        },
        detail: {},
        initChild:{},
        initLevel:0,
        form: {
          orgCode: '',
          payObj: '',
          payType: '',
          reqRemark: '',
          showFlgA: true,
          showFlgB: true,
          payObjBDY: '',
          showFlgC: false,
          showFlgD:false
        }
      }
    },
    computed: {},

    methods: {
      ...mapActions([
        'modifyPayCashRequest'
      ]),
      init(){
        this.getUserLevel()
      },
      getList(){
        let param = Object.assign(this.paginationParams(), this.form)
      },
      closeDialog(){
        this.modifyVisible = false;
        this.transferSelected = [];
        this.$refs['form'].resetFields();
      },
      changeTransfer(val){
// console.log(val)
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
        getUserLevel1Api().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initLevel = data.data;
//如果级别是运货柜总部则提供子公司下拉框选择功能
            if(this.initLevel == 1){
              this.form.showFlgC = true
              this.getChildCompany()
            }else{
              this.form.showFlgC = false
              this.form.subCode = ''
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
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
//付款对象：司机／车牌
            if (this.form.payObjectType==1) {
              if("" != this.form.payObjId){
                var temp = this.form.payObjId.split(",");
//选中的记录条数加上已经申请过的记录条数总数不能超过20条记录
                if(this.transferSelected.length>(20-temp.length)){
                  this.$confirm('您已经申请了'+temp.length+'条记录，一次性最多只能申请20条记录！')
                  return true
                }
//选中有记录条数的场合，则在已经申请的记录后面追加，没有选中记录则不管
                if(this.transferSelected.length>0){
                  this.form.payObjId = this.form.payObjId.concat(",",this.transferSelected.toString());
                }
              }else{
                if(this.transferSelected.length>20){
                  this.$confirm('一次性最多只能申请20条记录！')
                  return true
                }
                this.form.payObjId = this.transferSelected.toString();
              }
              this.form.payObj = '司机／车牌';
            }else{
//付款对象：司机以外的场合
              this.form.payObjId = null;
              this.transferSelected = [];
            }
            this.modifyPayCashRequest(this.form).then((res) => {
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
//Object.assign(this.form, val)
        /* //设置付款方式
         this.form.payType = this.form.payType.toString();
         var payObjectType = this.form.payObjectType;
         var payObjId = this.form.payObjId;
         var payObjIdDock = this.form.payObjIdDock;
         var payObjIdShip = this.form.payObjIdShip;

         if(payObjectType==1 || payObjId != ''){
         this.form.showFlgA = true;
         this.form.showFlgB = false;
         this.form.showFlgD = true;
         }else if(payObjectType==3 || payObjIdDock != ''){
         this.form.showFlgA = true;
         this.form.showFlgB = false;
         this.form.showFlgD = false;
         }else if(payObjectType==5 || payObjIdShip != ''){
         this.form.showFlgA = true;
         this.form.showFlgB = false;
         this.form.showFlgD = false;
         }else{
         this.form.showFlgA = false;
         this.form.showFlgB = true;
         this.form.showFlgD = false;
         this.form.payObjBDY = '办单元(BDY)';
         }
         this.form.reqTime = null
         this.form.status = null*/
      }
    },
    created(){
      this.init()
    },
    mounted(){
    }
  }
</script>
