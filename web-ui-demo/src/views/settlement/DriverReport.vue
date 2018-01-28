<template>
  <section>
    <!--司机报表-->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="订单号" :label-width="labelWidth1" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="柜号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入柜号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="下单用户" :label-width="labelWidth">
              <el-autocomplete
                class="inline-input input-width"
                v-model="userName"
                :fetch-suggestions="queryCustomer"
                placeholder="请选择下单用户名称"
                @select="handleSelectCustomer"
                :icon="userIcon"
                :on-icon-click="handCloseUser"
                :trigger-on-focus="true"></el-autocomplete>
            </el-form-item>

            <el-form-item label="任务类型" :label-width="labelWidth" prop="orderType">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.orderType" placeholder="请选择" class='control-width'>
                <el-option v-for="item in orderType"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="子公司" :label-width="labelWidth">
              <el-autocomplete
                class="inline-input input-width"
                v-model="childName"
                :fetch-suggestions="queryChildCompany"
                placeholder="请选择子公司"
                @select="handleSelectChildCompany"
                :icon="childIcon"
                :on-icon-click="handCloseChild"
                :trigger-on-focus="true"></el-autocomplete>
            </el-form-item>
            <el-form-item label="物流公司" :label-width="labelWidth" prop="logisticsCode">
              <el-select
                clearable
                filterable
                default-first-option
                  v-model="form.logisticsCode" placeholder="请选择物流公司" class='control-width'>
                <el-option
                  v-for="item in initLogistic.logisticsList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车牌" :label-width="labelWidth">
              <el-autocomplete
                class="inline-input input-width"
                v-model="driverName"
                :fetch-suggestions="queryPlateNumber"
                placeholder="请选择车牌"
                @select="handleSelectPlateNumber"
                :icon="PlateNumberIcon"
                :on-icon-click="handClosePlateNumber"
                :trigger-on-focus="true"></el-autocomplete>
            </el-form-item>

            <!--<el-form-item label="结束日期" :label-width="labelWidth" prop="startDate" style="margin-right:2px">
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.startDate" @change="startDateChange" style="width:150px"></el-date-picker>
            </el-form-item>
            <label style="padding-right:0;padding-top:11px;">-</label>
            <el-form-item label="" :label-width="labelWidth" prop="endDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width:150px" @change="endDateChange"></el-date-picker>
            </el-form-item>-->
            <el-form-item class="combine-input" label="行程结束日期" prop="endDateStart" :label-width="labelWidth">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateStart" @change="endDateStartChange"></el-date-picker>
            -
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateEnd"  @change="endDateEndChange"></el-date-picker>
            </el-form-item>
          </div>
          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" icon="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>
    <el-col :span="24" class="toolbar">
      <el-button type="primary" icon="document" @click="putDispatch" size="small" :disabled="this.$global.isDisabled(21)">导出Excel</el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        当前页应付(元)：<span style="color:red">{{total}}</span> &nbsp;&nbsp;
        总应付(元)：<span style="color:red">{{totalAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table
        :data="driverReport.data" :maxHeight="tableMaxHeight" stripe
      >
        <el-table-column
          prop="subName"
          label="子公司" width="150">
        </el-table-column>
        <el-table-column
          prop="affName"
          label="物流公司" width="150">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束日期" width="100">
        </el-table-column>
        <el-table-column
          prop="driver"
          label="司机/车牌" width="100">
        </el-table-column>
        <el-table-column
          prop="orderTypeText"
          label="任务类型" width="100">
        </el-table-column>
        <el-table-column
          prop="dispatchTypeText"
          label="调度类型" width="100">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="100">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="下单用户" width="100">
        </el-table-column>
        <el-table-column
          prop="bookSpaceNo"
          label="订舱单号" width="100">
        </el-table-column>
        <el-table-column
          prop="conType"
          label="箱型" width="100">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="调度备注" width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="装货送货地址" width="120">
        </el-table-column>

        <el-table-column
          prop="feeAmount"
          label="运费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 26)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="超时费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 2)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="压夜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 3)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="改送费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 8)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="多门点服务费(元)" width="130">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 9)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="调整运费(元)" width="110">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 10)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="总计(元)" width="100">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col style="padding:10px 0;text-align:center;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :total="pageCount"
                     :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
  import util from '../../common/js/util'
  import pagination  from '../../common/mixins/pagination'
  import {getDriverReportExcelApi} from '../../api/modules/settlement';
  import {getDeptmentListApi,getLogisticListApi} from '../../api/modules/settlement';
  import {getDriverReportListInitApi} from '../../api/modules/settlement';
  import Qs from 'qs';
  import download from '../../common/mixins/download';
  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '90px',
        labelWidth1: '90px',
        selectData: [],
        initChild: {},
        initLogistic:{},
        initPlateNum:{},
        initCustomer:{},
        displayButtons: 'right',
        totalAmount:'0.00',
        userName:'',
        userIcon:'',
        driverName:'',
        PlateNumberIcon:'',
        childName:'',
        childIcon:'',
        closeIcon: 'circle-close',
        form: {
          orderNo: '',//订单号
          bookSpaceNo: '',//订舱单号
          cabinetNo: '',//箱号
          customerId:'',//下单用户
          subCode:'',//子公司
          logisticsCode:'',//物流公司
          plateNumber:'',//车牌
          orderType: '',//任务类型
          carteamId: '',//物流公司id
          startDate:'',//起始日期
          endDate: '',//结束日期
          isRevise: '',//是否调
          driver: '',//司机
          Authorization:'',//token
          endDateStart:'',
          endDateEnd:''

        },
        orderType: [
          {text: '装货', value: 0},
          {text: '送货', value: 1}
        ],
        initData:{},
      }
    },
    computed: {
      ...mapGetters([
        'driverReport', 'driverReportAmount'
      ]),
      total(){
        let alltotal = 0
        if (this.driverReport.data) {
          this.driverReport.data.forEach((val, key) => {
            if (val.total != null) {
              alltotal += parseFloat(val.total)
            }
          })
        }
        return alltotal.toFixed(2)
      }
    },
    watch: {
      userName: function () {
        if(!this.userName){
          this.form.customerId=null;
          this.userIcon='';
        }else {
          this.userIcon=this.closeIcon;
        }
      },
      driverName: function () {
        if(!this.driverName){
          this.form.plateNumber=null;
          this.PlateNumberIcon='';
        }else {
          this.PlateNumberIcon=this.closeIcon;
        }
      },
      childName: function () {
        if(!this.childName){
          this.form.subCode=null;
          this.childIcon='';
        }else {
          this.childIcon=this.closeIcon;
        }
      },
    },
    methods: {
      ...mapActions([
        'getDriverReport', 'getDriverReportAmount'
      ]),
      // 获取行程开始日期
      endDateStartChange(val) {
        this.form.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form.endDateEnd = val;
      },
      // 获取结算开始日期
      settlementDateStartChange(val) {
        this.form.settlementDateStart = val;
      },
      // 获取结算结束日期
      settlementDateEndChange(val) {
        this.form.settlementDateEnd = val;
      },
      init(){
        this.getList();
        this.getDetailAmount();
        this.getChildCompany();
      },
      //获取司机报表下拉列表
      getDriverReportListInit(){
        getDriverReportListInitApi().then((res) =>{
          let data = res.data;
          if(data.code==1){
            this.initData=data.data;
          }
        });
      },
      //子公司下拉框(初期化)
      getChildCompany(){
        getDeptmentListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initChild = data.data;
          }
        });
      },
      queryCustomer(queryString, cb){
        let data = this.initData.users;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        cb(results);
      },
      queryPlateNumber(queryString, cb){
        let data = this.initData.plateNumbers;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        cb(results);
      },
      queryChildCompany(queryString, cb){
        let data = this.initData.childCompanys;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        cb(results);
      },
      createFilter(queryString) {
        return (item) => {
          return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
        };
      },
      handleSelectCustomer(item){
        this.form.customerId=item.id;
      },
      handleSelectChildCompany(item){
        this.form.subCode=item.code;
        this.selectChild(item.code);
      },

      //子公司下拉框联动(获取物流公司下拉框)
      selectChild(val){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val};
          getLogisticListApi(param).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              this.initLogistic = data.data;
              this.form.logisticsCode=''
            }
          })
        }
      },
      handleSelectPlateNumber(item){
        this.form.plateNumber=item.code;
      },
      handCloseUser(){
        this.userName='';
      },
      handCloseChild(){
        this.childName='';
        this.initLogistic={};
        this.form.logisticsCode='';
      },
      handClosePlateNumber(){
        this.driverName='';
      },
      //获取开始日期
      createDateStartChange(val){
        this.form.createDateStart = val
      },
      //加载对应的费用
      getAmount(list, code){
        if (list) {
          let items = list.filter((res) => {
            return res.costTypeCode == code;
          });
          if (items && items.length > 0)
            return items[0]['feeAmount'];
        }
        return "0.00";
      },
      //导出excel表
      putDispatch(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          this.download({
            params: params,
            handle: getDriverReportExcelApi,
            callback () {

            }
          });
        });
      },
      //获取起始日期
      startDateChange(val){
        this.form.startDate = val
      },
      //获取结束日期
      endDateChange(val){
        this.form.endDate = val
      },
      //查看详情
      goLookDetails(val){
        this.$router.push('/customerReceivablesDetail/12')
      },
      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      //获取列表
      getList(initpage){
        let log = util.localStorage.get('logistics');
        let success = success =>{
          this.totalAmount = this.driverReportAmount;
        };

        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //柜号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getDriverReport,initpage,success)
      },
      //获取总金额
      getDetailAmount(){
        this.getDriverReportAmount(this.form)
      },
      //查询
      onSubmit() {
        this.getList(true);
        this.getDetailAmount()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.initLogistic={};
        this.userName='';
        this.driverName='';
        this.childName='';
      }
    },
    mounted(){
        //获取司机报表下拉列表初始化数据
      this.getDriverReportListInit();
    },
    created(){
      this.init()
    },
  }
</script>
<style>
  @import '../../styles/custom-theme/query-modal-lg.css'
</style>
