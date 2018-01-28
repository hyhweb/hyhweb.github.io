<template>
  <el-dialog
    size="50%"
    title="新增申请单"
    v-model="addVisible" :before-close="closeDialog">
    <el-form ref="form" :rules="formRules" :model="form" label-width="100px">
      <el-form-item label="申请单编号" :label-width="labelWidth" v-if="false">
        <el-input :disabled="true" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="申请单公司" :label-width="labelWidth" prop="orgCode" v-if="form.showFlgB">
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
      <el-form-item label="付款对象" prop="payObjectFlg" :label-width="labelWidth">
        <el-select clearable filterable default-first-option @change="handleChange" v-model="form.payObjectFlg" placeholder="请选择付款对象" class='control-width3'>
          <el-option
            v-for="item in payObjectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办单员姓名" prop="payObj" v-if="form.showFlgA">
        <el-input v-model="form.payObj" class='control-width3'></el-input>
      </el-form-item>
      <el-form-item label="业务员姓名" prop="salesman" v-if="form.showFlgF">
        <el-input v-model="form.salesman" class='control-width3'></el-input>
      </el-form-item>
      <el-transfer
        v-if="form.showFlgC"
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

      <el-form-item label="码头" :label-width="labelWidth" prop="dock" v-if="form.showFlgD">
        <el-select clearable filterable default-first-option @change="handleChangeDock" v-model="form.dock" placeholder="请选择码头"
                   class='control-width3'>
          <el-option
            v-for="item in dockInitData.dockList"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="船公司" :label-width="labelWidth" prop="ship" v-if="form.showFlgE">
        <el-select clearable filterable default-first-option @change="handleChangeShip" v-model="form.ship" placeholder="请选择船公司"
                   class='control-width3'>
          <el-option
            v-for="item in shipInitData.shipList"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br/>
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
        <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(2)">确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import {getPayObjListApi,getDeptmentListApi,getUserLevel1Api} from '../../../api/modules/settlement';
  import {getShipListApi,getDockListApi} from '../../../api/modules/settlement';

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '100px',
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
          orgCode: [
            {required: true, message: '申请单公司不能为空', trigger: 'blur,change'}
          ],
          payObjId: [
            {required: true, message: '付款对象不能为空', trigger: 'blur,change'}
          ],
          payType: [
            {required: true, message: '付款方式不能为空', trigger: 'blur,change'}
          ],
          payObjectFlg: [
            {required: true, message: '付款对象不能为空', trigger: 'blur,change'}
          ],
          payObj: [
            {required: true, message: '办单员姓名不能为空', trigger: 'blur,change'}
          ],
          salesman: [
            {required: true,message:'业务员姓名不能为空', trigger: 'blur,change'}
          ]
// ship: [
// {required: true, message: '船公司不能为空', trigger: 'blur,change'}
// ],
// dock: [
// {required: true, message: '码头不能为空', trigger: 'blur,change'}
// ]
        },
        form: {
          orgCode:'',
          payObjectFlg:'',
          payObjId: '',
          payObj: '',
          payType: '',
          reqRemark: '',
          showFlgA: false,
          showFlgB: false,
          showFlgC: false,
          showFlgD: false,
          showFlgE: false,
          showFlgF: false,
          payObjIds:[],
          ship:[],
          dock:[],
          payObjectType:0,
          dockId:'',
          shipId:'',
          salesman:'',
        },
        payObjectList: [
          {value: '1',label: '司机/车牌'},
          {value: '2',label: '办单员'},
          {value: '3',label: '码头'},
          {value: '4',label: '船公司'},
          {value: '5',label: '业务员'}],
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'getPayCashRequestList', 'addPayCashReqest'
      ]),
      handleChange(){
        var flg = this.form.payObjectFlg
        if (flg == 1) {//司机
          this.form.showFlgA = false;//办单员姓名
          this.form.showFlgC = true;//司机车牌
          this.form.showFlgD = false;//码头
          this.form.showFlgE = false;//船公司
          this.form.showFlgF = false;//业务员姓名
          this.form.payObjectType=1;//应付对象类型
        } else if (flg == 2){//办单员
          this.form.showFlgA = true;//办单员姓名
          this.form.showFlgC = false;//司机车牌
          this.form.showFlgD = false;//码头
          this.form.showFlgE = false;//船公司
          this.form.showFlgF = false;//业务员姓名
          this.form.payObjectType=2;//应付对象类型
          this.form.payObj = '';
        }else if (flg == 3){//码头
          this.form.showFlgA = false;//办单员姓名
          this.form.showFlgC = false;//司机车牌
          this.form.showFlgD = true;//码头
          this.form.showFlgE = false;//船公司
          this.form.showFlgF = false;//业务员姓名
          this.form.payObjectType=3;//应付对象类型
        }else if (flg == 4){//船公司
          this.form.showFlgA = false;//办单员姓名
          this.form.showFlgC = false;//司机车牌
          this.form.showFlgD = false;//码头
          this.form.showFlgE = true;//船公司
          this.form.showFlgF = false;//业务员姓名
          this.form.payObjectType=5;//应付对象类型
        }else if(flg == 5){//业务员
          this.form.showFlgA = false;//办单员姓名
          this.form.showFlgC = false;//司机车牌
          this.form.showFlgD = false;//码头
          this.form.showFlgE = false;//船公司
          this.form.showFlgF = true;//业务员姓名
          this.form.payObjectType=6;//应付对象类型
          this.form.salesman = '';
        }else{
          this.form.showFlgA = false;//办单员姓名
          this.form.showFlgC = false;//司机车牌
          this.form.showFlgD = false;//码头
          this.form.showFlgE = false;//船公司
          this.form.showFlgF = false;//业务员姓名
          this.form.payObjectType=0;//应付对象类型
        }
      },
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
      changeTransfer(val){
// console.log(val)
      },
      init(){
//获取付款对象
        this.getPayObjList()
//获取当前登录用户的级别
        this.getUserLevel()
//获取船公司下拉列表
        this.getShipList()
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

//付款对象：司机／车牌
            if (this.form.payObjectFlg==1) {
// if(this.transferSelected.length==0){
// this.$confirm('至少要选择1条记录！')
// return true
// }
              if(this.transferSelected.length>20){
                this.$confirm('一次性最多只能申请20条记录！')
                return true
              }
              this.form.payObjId = this.transferSelected.toString();
              this.form.payObj = '司机／车牌';
              this.form.payObjIdDock = '';
              this.form.payObjIdShip = '';

            }else if(this.form.payObjectFlg==2){
//付款对象：办单员
              this.form.payObjId = null;
              this.form.payObjIdDock = '';
              this.form.payObjIdShip = '';
            }else if(this.form.payObjectFlg==3){
//付款对象：码头
              if (undefined == this.form.payObjIdDock || null == this.form.payObjIdDock || '' == this.form.payObjIdDock) {
                this.$confirm('码头不能为空！')
                return true
              }

            }else if(this.form.payObjectFlg==4){
//付款对象：船公司
              if (undefined == this.form.payObjIdShip || null == this.form.payObjIdShip || '' == this.form.payObjIdShip) {
                this.$confirm('船公司不能为空！')
                return true
              }
            }else if(this.form.payObjectFlg==5){
//付款对象：业务员
              this.form.payObjId = null;
              this.form.payObj = this.form.salesman;
              this.form.payObjIdDock = '';
              this.form.payObjIdShip = '';
            }

            this.addPayCashReqest(this.form).then(res => {
              if (res.success) {
                this.$refs.form.resetFields()
                this.item = null;
                this.addVisible = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.transferSelected=[];
                this.form.showFlgA = false;
                this.$parent.getList();
                return true;
              } else {
                this.addVisible = false;
                this.$message({
                  message: '新增失败',
                  type: 'error'
                })
                this.transferSelected=[]
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
        getUserLevel1Api().then((res) => {
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
