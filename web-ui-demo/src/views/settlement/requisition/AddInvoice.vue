<template>
  <el-dialog
    title="新增发票"
    :visible.sync="addVisible" append-to-body class="addDialog">
    <el-form class="formClass" ref="form" :rules="formRules" :model="form" label-width="100px">
      <el-form-item label="发票代码" :label-width="labelWidth" prop="invoiceCode" >
        <el-input v-model="form.invoiceCode" class='widthClass'></el-input>
      </el-form-item>
      <el-form-item label="发票号码" :label-width="labelWidth" prop="invoiceNo">
        <el-input v-model="form.invoiceNo" class='widthClass'></el-input>
      </el-form-item>
      <el-form-item label="付款单位(个人)名称"  :label-width="labelWidth" prop="payObj">
        <el-input v-model="form.payObjName" :disabled="true" class='widthClass'></el-input>
      </el-form-item>
      <el-form-item label="收款单位(个人)名称" :label-width="labelWidth" prop="receiveObj">
        <el-input v-model="form.receiveObjName" :disabled="true" class='widthClass'></el-input>
      </el-form-item>
      <el-form-item label="开票金额" :label-width="labelWidth" prop="invoiceAmount">
        <el-input v-model="form.invoiceAmount" class='widthClass'></el-input>
      </el-form-item>
      <el-form-item label="开票日期" :label-width="labelWidth" prop="invoiceDate">
        <el-date-picker
          size="small"
          v-model="form.invoiceDate"
          type="datetime"
          @change="changeInvoiceDate"
          placeholder="选择日期"
         >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发票税率" prop="taxRate" :label-width="labelWidth">
        <el-select clearable filterable default-first-option  v-model="form.taxRate" placeholder="请选择付款对象" class='widthClass'>
          <el-option
            v-for="item in taxRateList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
           >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="remark" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.remark" :rows='5' class='widthClass'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(2)">确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style>
  .addDialog .el-dialog{
    /*min-width: 664px;*/
    width: 600px;
  }
  .addDialog .formClass{
    width:100%;
    /*margin: 0!important;*/
    padding:20px;
  }
  .addDialog .el-form{
    margin: 0 auto;
    width: 85%;
  }
  .widthClass{
    width: 250px;
  }
</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {getPayObjListApi,getDeptmentListApi,getUserLevelApi,savePayableInvoiceApi} from '../../../api/modules/settlement';
  import {getShipListApi,getDockListApi} from '../../../api/modules/settlement';

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '140px',
        initData: {},
        initChild:{},
        shipInitData:{},
        dockInitData:{},
        initLevel:0,
        addVisible: false,
        item: null,
        transferSelected:[],
        payObjIdList:[],
        titles:['所有司机/车牌','选中的司机/车牌'],
        formRules: {
          invoiceCode: [
            {required: true, message: '发票代码不能为空', trigger: 'blur,change'}
          ],
          invoiceNo: [
            {required: true, message: '发票号码不能为空', trigger: 'blur,change'}
          ],
          invoiceAmount: [
            {required: true, message: '开票金额不能为空', trigger: 'blur,change'},
            {validator:this.$global.validate.number}
          ],
          invoiceDate: [
            {required: true, message: '开票日期不能为空', trigger: 'blur,change'}
          ],
          taxRate: [
            {required: true, message: '发票税率不能为空', trigger: 'blur,change'}
          ],
        },
        form: {
          payRequisitionId:'',//付款申请id
          invoiceCode:'',//发票代码
          invoiceNo:'',//发票号码
          invoiceDate:'',//开票日期
          payObjCode:'',//付款对象编码
          receiveObjId:'',//收款对象id
          payObjName:'',//付款对象名称
          receiveObjName:'',//收款对象名称
          invoiceAmount:'',//开票金额
          taxRate:'',//开票税率
          remark:'',//备注
        },
        taxRateList: [
          {value: '0',label: '普通发票'},
          {value: '1',label: '3%'},
          {value: '2',label: '6%'},
          {value: '3',label: '11%'},
          {value: '4',label: '17%'}],
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'getRequisitionList', 'addRequisition'
      ]),

      handleChangeDock(){
        this.form.payObjIdDock = this.form.dock.value;
        this.form.payObj = this.form.dock.text;
        this.form.payObjId = '';
        this.form.payObjIdShip = '';
      },
      handleChangeShip(){
        this.form.payObjIdShip = this.form.ship.value;
        this.form.payObj = this.form.ship.text;
        this.form.payObjId = '';
        this.form.payObjIdDock = '';
      },
      changeInvoiceDate(val){
        this.form.invoiceDate = val
      },
      changeTransfer(val){
      },
      init(){
        //获取付款对象
        this.getPayObjList();
        //获取当前登录用户的级别
        this.getUserLevel();
        //获取船公司下拉列表
        this.getShipList();
        //获取码头下拉列表
        this.getDockList()
      },
      getList(){
        let param = Object.assign(this.paginationParams(), this.form)
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
      closeDialog(){
        this.item = null;
        this.transferSelected = [];
        this.$refs['form'].resetFields();
        this.addVisible = false;
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            savePayableInvoiceApi({data:JSON.stringify(this.form)}).then(res => {
              let resultData = res.data;
              let fig = resultData.success;
              if (fig && resultData.code === '1') {
                this.$refs['form'].resetFields();
                this.addVisible = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.transferSelected=[];
                this.form.showFlgA = false;
                this.$parent.getList();
                return true;
              } else {
                this.addVisible = false;
                this.$refs['form'].resetFields();
                this.$message({
                  message: '新增失败',
                  type: 'error'
                });
                this.transferSelected=[];
                return false;
              }
            });
          }
        })
      },
      //付款对象下拉框
      getPayObjList(){
        var val = null;
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
              this.form.showFlgB = true
              this.getChildCompany()
            }else{
              this.form.showFlgB = false
              this.form.subCode = ''
            }
          }
        });
      },
      //船公司下拉框
      getShipList(){
        getShipListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.shipInitData = data.data;
          }
        });
      },
      //码头下拉框
      getDockList(){
        getDockListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.dockInitData = data.data;
          }
        });
      },
    },
    created(){
      this.init()
      this.getPayObjList()
    }
  }
</script>
