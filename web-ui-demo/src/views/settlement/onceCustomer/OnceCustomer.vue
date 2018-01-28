<template>
  <section>
    <!--一次性客户报表-->
    <!--查询条件-->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form">
          <div class="query-params">
            <el-form-item label="子公司" :label-width="labelWidth" prop="subCode">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.subCode" placeholder="请选择子公司" class='control-width'>
                <el-option
                  v-for="item in initData.deptmentList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="指定客户名称" :label-width="labelWidth" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请输入客户名称" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="跟单员名称" :label-width="labelWidth" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入跟单员名称" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="年份" :label-width="labelWidth" prop="yearTime">
              <el-select
                clearable
                filterable
                default-first-option
                size="10%" v-model="form.yearTime" class='control-width'>
                <el-option
                  v-for="(item,index) in yearSelect"
                  :key="index"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="月份" :label-width="labelWidth" prop="monthTime">
              <el-select size="20%" v-model="form.monthTime" multiple placeholder="请选择" class='control-width'>
                <el-option
                  v-for="(item,index) in monthSelect"
                  :key="index"
                  :value="item">
                  <span style="float: left">{{ item }}月</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态" :label-width="labelWidth" prop="status">
              <el-select
                clearable
                filterable
                default-first-option
                size="20%" v-model="form.status"  placeholder="请选择" class='control-width'>
                <el-option label="未收到" value="0"></el-option>
                <el-option label="已收到" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发票申请状态" :label-width="labelWidth" prop="status">
              <el-select
                clearable
                filterable
                default-first-option
                size="20%" v-model="form.invoiceStatus"  placeholder="请选择" class='control-width'>
                <el-option label="未申请" value="3"></el-option>
                <el-option label="已申请" value="0"></el-option>
                <el-option label="已确认" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发票申请单号" :label-width="labelWidth" prop="invoiceApplyNo">
              <el-input v-model="form.invoiceApplyNo" placeholder="请输入发票申请单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="发票申请抬头" :label-width="labelWidth" prop="invoiceTitle">
              <el-input v-model="form.invoiceTitle" placeholder="请输入发票申请抬头" class='control-width'></el-input>
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
    <!--功能按钮-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" icon="document" @click="putDispatch" size="small" :disabled="this.$global.isDisabled(21)">导出Excel</el-button>
      <el-button type="primary" icon="circle-check" size="small" @click="comfirmIn" :disabled="this.$global.isDisabled(19)">确认收到</el-button>
      <el-button type="primary" icon="circle-close" size="small" @click="cancel" :disabled="this.$global.isDisabled(20)">取消收到</el-button>
      <el-button type="primary" icon="document" size="small" @click="addInvoiceApply" :disabled="this.$global.isDisabled(221)">发票申请</el-button>
      <el-button type="primary" icon="check" size="small" @click="confirmationInvoice" :disabled="this.$global.isDisabled(222)">发票确认</el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        总应收(元)：<span style="color:red">{{totalAmount}}</span>
      </div>
    </el-col>

    <!--查询结果一览-->
    <el-col>
      <el-table
        ref="table" @row-click="handleRowClick" :maxHeight="tableMaxHeight" :data="onceCustomerList.data" @selection-change="handleSelectionChange" stripe>
        <el-table-column type="selection" fixed width="50">
        </el-table-column>
        <el-table-column width="30">
          <template scope="scope">
            <el-badge :value="scope.row.costStatus==3?'调':''" class="item">
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="object"
          label="对象" width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="ordCustomerName"
          label="下单客户" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="指定客户" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="跟单员" width="90" align="center">
        </el-table-column>
        <el-table-column
          prop="childCompany"
          label="子公司" width="130" align="center">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="170" align="center">
        </el-table-column>
        <el-table-column
          prop="bookSpaceNo"
          label="订舱单号" width="130" align="center">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="cabinetType"
          label="箱型" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="orderTypeText"
          label="运输类型" width="40" align="center">
        </el-table-column>

        <el-table-column
          prop="costTypeName"
          label="费用类型" width="80" align="center">
        </el-table-column>

        <el-table-column
          prop="incomeAmount"
          label="费用金额" width="60" align="center">
        </el-table-column>

        <el-table-column
          prop="endDate"
          label="结束日期" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="amountIn"
          label="收到金额(元)" width="60" align="center">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="notReceived"-->
        <!--label="未收到金额(元)" width="100">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="cabinetId"-->
        <!--label="集装箱ID" width="100">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="operTime"
          label="确认时间" width="90" align="center">
        </el-table-column>
        <el-table-column
          prop="confirmer"
          label="确认人" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="确认备注" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="settlementTypeText"
          label="结算方式" width="100" align="center">
        </el-table-column>

        <el-table-column
          prop="invoiceApplyNo"
          label="发票申请单号" width="130">
        </el-table-column>

        <el-table-column
          prop="invoiceTypeText"
          label="发票类型" width="40">
        </el-table-column>

        <el-table-column
          prop="invoiceNo"
          label="发票号" width="100">
        </el-table-column>

        <el-table-column
          prop="invoiceTitle"
          label="发票抬头" width="100">
        </el-table-column>

        <el-table-column
          prop="invoiceRemark"
          label="发票备注" width="100">
        </el-table-column>

        <el-table-column
          prop="applyAmount"
          label="开票申请金额" width="60">
        </el-table-column>

        <el-table-column
          prop="invoiceApplicantName"
          label="发票申请人名称" width="100">
        </el-table-column>

        <el-table-column
          prop="invoiceApplyTime"
          label="发票申请时间" width="100">
        </el-table-column>

        <el-table-column
          prop="invoiceConfirmationName"
          label="发票确认人名称" width="100">
        </el-table-column>

        <el-table-column
          prop="invoiceConfirmationTime"
          label="发票确认时间" width="100">
        </el-table-column>

        <el-table-column
          prop="address"
          label="装送货地址" width="140">
        </el-table-column>

      </el-table>
    </el-col>
    <!--分页-->
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
    <OnceCustomerUpdate ref="onceCustomerUpdate"></OnceCustomerUpdate>
    <OnceCustomerInvoiceApply ref="onceCustomerInvoiceApply"></OnceCustomerInvoiceApply>
    <OnceCustomerInvoiceConfirmation ref="onceCustomerInvoiceConfirmation"></OnceCustomerInvoiceConfirmation>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import OnceCustomerUpdate  from './OnceCustomerUpdate.vue'
  import OnceCustomerInvoiceApply from './OnceCustomerInvoiceApply.vue'
  import OnceCustomerInvoiceConfirmation from './OnceCustomerInvoiceConfirmation.vue'
  import pagination  from '../../../common/mixins/pagination'
  import {getOnceCustomerListExcelApi, getDeptmentListApi, cancelApi} from '../../../api/modules/settlement';
  import Qs from 'qs';
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    components: {OnceCustomerUpdate,OnceCustomerInvoiceApply,OnceCustomerInvoiceConfirmation},
    data() {
      return {
        labelWidth: '120px',
        selectData: [],
        incomeAmounts: [],
        initData: {},
        totalAmount:'0.00',
        form: {
          subCode: '',// 子公司
          orderNo: '',  //订单号
          customerName:'',//指定客户名称
          userName:'',//跟单员名称
          bookspaceNo: '',//订舱单号
          cabinetNo: '',  //箱号
          isCheck: '',// 自营/他营
          endDateStart:'',//行程结束日期（起始)
          endDateEnd:'',//行程结束日期(截止)
          settlementDateStart:'',//结算日期(起始)
          settlementDateEnd:'',//结算日期(截止)
          Authorization: '',  //token
          yearTime: '',
          monthTime: [],
          status:'',
          invoiceStatus:'',//发票申请状态
          invoiceApplyNo:'',//发票申请单号
          invoiceTitle:'',//发票申请抬头
        },
        yearSelect: {},
        monthSelect: {},
        //[子公司]下拉框
        subCode: [
          {text: '广州凰浦运柜宝物流有限公司', value: 0},
          {text: '清远运柜宝物流有限公司', value: 0}
        ],
        //[是否收到]下拉框
        isCheck: [
          {text: '已收到', value: 1},
          {text: '未收到', value: 2},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'onceCustomerList', 'onceCustomerSumAmount', 'orderStatus'
      ]),

    },
    methods: {
      ...mapActions([
        'getOnceCusList', 'getOnceCustomerSumAmount', 'getOrderStatus'
      ]),

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
      getOther(list){
        let other = 0.00;
        if (list) {
          list.filter((res) => {
            if (res.costTypeCode == 6 || res.costTypeCode == 7 || res.costTypeCode == 5) {
              if (res.feeAmount != null) {
                other += parseFloat(res.feeAmount);
              }
            }
          })
        }
        return other.toFixed(2);
      },
      //统计费用总计
      getTotal(list){
        let total = 0;
        list.filter((res) => {
          if(res.feeAmount != null){
            total += parseFloat(res.feeAmount);
          }
        });
        return total.toFixed(2);
      },
      init(){
        this.year();
//        this.getList()
//        this.getSumAmount()
        this.getChildCompany();
        this.$global.recorderTableData(this, 'getOnceCusList');
      },
      //进行下拉框值得绑定
      year(){
        var now = new Date();
        var currentYear = 2017;
        var currentMonth = now.getMonth() + 1;
//        this.form.yearTime = currentYear;
      //  this.form.monthTime[0] = this.getPreMonth();
        this.yearSelect = this.BindSelect(currentYear , currentYear+5, currentYear);
        this.monthSelect = this.BindSelect(1, 12, currentMonth);
      },
      //获取年份下拉框
      BindSelect(startValue, endValue, selectedValue){
        var i = 0;
        var yearAarr = new Array();
        for (var val = startValue; val <= endValue; val++) {
          yearAarr[i] = val < 10 ? '0' + val : val;
          i++;
        }
        return yearAarr;
      },
      /**
       * 获取上一个月
       *
       * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
       */
      getPreMonth(){
        var curYear = new Date().getFullYear();
        var curMonth = new Date().getMonth() + 1;
        var curDate = curYear + "-" + curMonth;

        var arr = curDate.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {//如果是1月份，则取上一年的12月份
          year2 = parseInt(year2) - 1;
          month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;//月份填补成2位。
        }
        var t2 = month2;
        return t2;
      },

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


      //子公司下拉框
      getChildCompany(){
        getDeptmentListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initData = data.data;
          }
        });
      },
      //导出excel
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
          handle: getOnceCustomerListExcelApi,
          callback () {

          }
        });
        });
      },
      //确认收到
      comfirmIn(){
        if (this.selectData.length != 0) {
          let selectData = this.selectData;
          let confirmerStatus = '';
          selectData.filter((res)=>{
             if(!this.isNull(res.confirmer)){
               confirmerStatus = 0;
               return
             }
            confirmerStatus = 1;
          });
          if(confirmerStatus === 0){
            this.$confirm('该条记录已经确认收到，不能再确认！');
            return
          }
          this.$refs.onceCustomerUpdate.detailDialogVisible = true;
          this.$refs.onceCustomerUpdate.params = selectData


        } else {
          this.$confirm('请选择一条数据进行确认')
        }
      },
      //判断对象是否为空
      isNull(data){
        if (undefined == data || null == data || "" == data) {
          return true
        }
        return false
      },
      //取消收到
      cancel(){
        if (this.selectData.length >= 1) {
          let confirmerStatus = '';
          this.selectData.filter((res)=>{
            if(this.isNull(res.confirmer)){
              confirmerStatus = 0;
              return
            }
            confirmerStatus = 1;
          });
          if(confirmerStatus === 0){
            this.$confirm('该条记录未进行确认收到，无需取消！');
            return
          }
          this.$confirm('确认要取消吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let cabinetCostIds = this.selectData.map(item=> item.cabinetCostId);
            cancelApi({cabinetCostIds:cabinetCostIds.toString()}).then((res) => {
              if (res.data.success) {
                this.getList();
                this.$message({
                  message: '取消成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '取消失败',
                  type: 'error'
                })
              }
            });
          });

        } else {
          this.$confirm('请选择一条数据进行取消')
        }
      },

      //开票申请
      addInvoiceApply(){
        if (this.selectData.length !== 0) {
          let user = JSON.parse(sessionStorage.getItem('user'));
          let selectData = this.selectData;
          let invoiceStatus = [];
          let invoiceApplyNo = [];
          let customerId = [];
          selectData.forEach(res=>{
              if(res.invoiceStatus !== null && res.invoiceStatus === 1){
                invoiceStatus.push(res.invoiceStatus);
              }
              if(res.customerId !== null){
                customerId.push(res.customerId);
              }
              if(res.invoiceApplyNo !== null){
                invoiceApplyNo.push(res.invoiceApplyNo);
              }
          });
          if(customerId.length !== 0){
            this.$message({
              message:"所选的数据包含有指定客户不能进行发票申请,请重新选择",
              type:'warning'
            });
            return
          }
//          if(invoiceStatus.length !== 0){
//            this.$message({
//              message:"所选的数据包含已确认发票,请重新选择",
//              type:'warning'
//            });
//            return
//          }
          if(invoiceApplyNo.length > 1 && !this.isRepeat(invoiceApplyNo)){
            this.$message({
              message:"所选的数据不是同一个发票申请号,请重新选择",
              type:'warning'
            });
            return ;
          }

          this.$refs.onceCustomerInvoiceApply.invoiceApplyLogVisible = true;
          this.$refs.onceCustomerInvoiceApply.params = selectData;
          let incomeAmount = 0;
          selectData.forEach(res=>{
            incomeAmount += parseFloat(res.incomeAmount);
          });

          this.$refs.onceCustomerInvoiceApply.invoiceStatus = invoiceStatus.length !== 0 ? invoiceStatus[0]:0;
          this.$refs.onceCustomerInvoiceApply.form.invoiceApplicantId = user.id;
          this.$refs.onceCustomerInvoiceApply.form.invoiceApplicantName = user.loginName;
          this.$refs.onceCustomerInvoiceApply.form.applyAmount = selectData[0].applyAmount !== null ? selectData[0].applyAmount : incomeAmount;
          this.$refs.onceCustomerInvoiceApply.form.invoiceApplyNo = selectData[0].invoiceApplyNo;
          this.$refs.onceCustomerInvoiceApply.form.invoiceApplyTime = selectData[0].invoiceApplyTime;
          this.$refs.onceCustomerInvoiceApply.form.invoiceTitle = selectData[0].invoiceTitle;
          this.$refs.onceCustomerInvoiceApply.form.invoiceRemark = selectData[0].invoiceRemark;
          this.$refs.onceCustomerInvoiceApply.form.invoiceNo = selectData[0].invoiceNo;

          this.$refs.onceCustomerInvoiceApply.init();
        } else {
          this.$confirm('请选择一条数据进行确认')
        }
      },

      //发票确认
      confirmationInvoice(){
        if (this.selectData.length === 1) {
          if(this.selectData[0].invoiceApplyNo === null ){
            this.$message({
              message:"所选的数据还没有进行发票申请,请重新选择",
              type:'warning'
            });
            return ;
          }
          if(this.selectData[0].invoiceStatus === 1){
            this.$message({
              message:"所选的数据已经确认,请重新选择",
              type:'warning'
            });
            return ;
          }
          this.$refs.onceCustomerInvoiceConfirmation.invoiceConfirmationLogVisible = true;
          Object.assign( this.$refs.onceCustomerInvoiceConfirmation.form, this.selectData[0]);
          this.$refs.onceCustomerInvoiceConfirmation.form.invoiceType =  String(this.selectData[0].invoiceType);
        } else {
          this.$confirm('请选择一条数据')
        }
      },

      //验证确认发票参数
      confirmationInvoiceCheck(invoiceApplyNo,selectData){
          if(invoiceApplyNo.length === 0 ){
            this.$message({
              message:"所选的数据还没有进行发票申请,请重新选择",
              type:'warning'
            });
            return false;
          }
          return true;

      },

      //验证是否有不一样的数据
      isRepeat(arr){
        var hash = {};
        for(var i in arr) {
          if(hash[arr[i]])
            return true;
          hash[arr[i]] = true;

        }
        return false;
      },

      //判断对象是否为空
      isNull(data){
        if (undefined == data || null == data || "" == data) {
          return true
        }
        return false
      },
      //获取结束日期
      reqETimeChange(val){
        this.form.reqETime = val
      },
      //获取列表
      getList(initpage){
        let success = success =>{
          this.totalAmount = this.onceCustomerSumAmount;
        };

        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        //指定客户名称
        this.form.customerName= this.form.customerName ? this.form.customerName.trim() : '';
        //跟单员名称
        this.form.userName= this.form.userName ? this.form.userName.trim() : '';
        this.pageHandler(this.form, this.getOnceCusList,initpage,success);
        this.getOnceCustomerSumAmount(this.form);
      },
      //选中复选框
      handleSelectionChange(val){
        this.selectData = val;
      },
      onSubmit() {
        this.getList(true);
        this.getSumAmount()
      },
      resetForm(formName) {
        for(var o in this.form){
          this.form[o]='';
        }
      },
      //获取总的金额
      getSumAmount(){
        this.getOnceCustomerSumAmount(this.form)
      }
    },
    created(){
      this.init()
    },
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>
