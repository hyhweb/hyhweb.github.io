<template>
  <section>

    <el-col>
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="客户名称" :label-width="labelWidth" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请输入客户名称" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入定舱单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="年份" :label-width="labelWidth" prop="yearTime">
              <el-select size="10%" v-model="form.yearTime" class='control-width'>
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
          </div>
          <div class="query-btns">
            <el-form-item style="float:rigth">
              <el-button type="primary" @click="onSubmit" icon="search" :disabled="this.$global.isDisabled(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>
    <el-col :span="24" class="toolbar">
      <el-button type="primary" icon="document" @click="putDispatch" v-if="!this.$global.isDisabled(21)" :disabled="buttonStatus" size="small">导出excel</el-button>
      <el-button type="primary" icon="document" @click="exportCustomerBill" v-if="!this.$global.isDisabled(73)" :disabled="selectData.length!=1" size="small">导出客户账单</el-button>
      <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(60)" :disabled="selectData.length==0" @click="batchPutExcel" size="small">批量导出
      </el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        当前页应收(元)：<span style="color:red">{{pageTotal}}</span> &nbsp;&nbsp;
        总应收(元)：<span style="color:red">{{totalAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table ref="table" @row-click="handleRowClick" :maxHeight="tableMaxHeight"
                :data="shipCompanyList.data" stripe @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" fixed v-model="selectData" width="50">
        </el-table-column>
        <!--      <el-table-column width="30">
                <template scope="scope">
                  <el-badge :value="scope.row.costStatus==3?'调':''" class="item">
                  </el-badge>
                </template>
              </el-table-column>-->
        <el-table-column sortable
                         prop="customerName"
                         label="客户名称" width="150">
        </el-table-column>
        <el-table-column sortable
                         prop="objectId"
                         label="订舱单号" width="150">
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="超时费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 2)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="压夜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 3)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="改送费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 8)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="多门点服务费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 9)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="调整运费(元)" width="110">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 10)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="办单费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 1)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="洗补柜费(元)" width="110">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 4)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="其他费(元)" width="100">
          <template scope="scope">
            <el-row>{{getOther(scope.row.initCostDtoList)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="吊柜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 11)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="THC/THD(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 12)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="港建费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 13)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="进出闸口费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 14)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="打单费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 15)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="港杂费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 16)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="转栈费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 17)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="码头作业费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 18)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="滞箱费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 19)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="堆存费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 20)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomeAmount"
          label="带柜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 21)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="验柜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 22)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="堆场进出费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 23)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="运费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 26)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="下单日期" width="100">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总计(元)" width="110" sortable>
          <template scope="scope">
            <el-row>{{total(scope.row.initCostDtoList)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="100">
          <template scope="scope">
            <el-button size="small" type="primary" :disabled="isDisabled(29)" @click="goCusDetails(scope.row)">查看详情</el-button>
          </template>
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
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../api/api';
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getShipCompanyExcelApi, batchExportShipCompanyDetailApi,getShipCompanyBillApi} from '../../../api/modules/settlement';
  import Qs from 'qs';
  import download from '../../../common/mixins/download';
  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '80px',
        selectData: [],
        displayButtons: 'right',
        totalAmount:'0.00',
        form: {
          customerName: '',//客户名称，支持模糊
          bookSpaceNo:'',//定舱单号
          year: '',
          month: '',
          phbc: '',// 收/付款单状态
          should: '',// 应收/付单状态
          checkStatus: '',// 对账单状态，
          Authorization: '',
          yearTime: '',
          monthTime: []
        },
        formBatch: {
          Authorization: '',
          data: '',
        },
        buttonStatus: false,
        batchData: [],
        yearSelect: {},
        monthSelect: {},
        ccompany: [
          {text: '清远骏鹏物流有限公司', value: 0}
        ],// 子公司
      }
    },
    computed: {
      ...mapGetters([
        'shipCompanyList', 'shipCompanyAmount'
      ]),
      //进行统计当页的总金额
      pageTotal(){
        if (JSON.stringify(this.shipCompanyList.data) == "") {
          this.buttonStatus = true;
        }
        let alltotal = 0;
        if (this.shipCompanyList.data) {
          this.shipCompanyList.data.forEach((val, key) => {
            if (val.initCostDtoList != null) {
              val.initCostDtoList.filter((res)=>{
                alltotal += parseFloat(res.feeAmount)
              })
            }
          })
        }
        return alltotal.toFixed(2)
      }


    },
    methods: {
      ...mapActions([
        'getShipCompanyList', 'getShipCompanyAmount'
      ]),
      getAmount(list, code){
        if (list) {
          let items = list.filter((res) => {
            return res.costTypeCode == code;
          });
          if (items && items.length > 0) {
            return items[0]['feeAmount'];
          }
        }
        return "0.00";
      },
      //归类其它费用
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
      total(list){
        let total = 0;
        if(!list){
          return '0.00';
        } else {
          list.filter((res)=>{
            total += parseFloat(res.feeAmount);
          })
        }
        return total.toFixed(2);
      },
      init(){
//        this.getList()
//        this.getCusAmount()
        //this.initYear();//初始化日期的下拉列表
//        const hash = location.hash;
//        if (typeof(this.$global.storeTable[hash]) === 'undefined') {
//
//        }
        this.year();
        //this.$store.dispatch('getCustomerAmount',Object.assign(this.form,this.$global.storeTable[hash] == undefined?{}:this.$global.storeTable[hash].form));
        this.$global.recorderTableData(this, 'shipCompanyList');


      },
      //导出客户账单
      exportCustomerBill(){
        this.$confirm('确认要导出客户账单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          const param={
            bookSpaceNo: "",
            customerId:"",
            costStatus: "",
            currentData: "",
            customerName:""
          };
          param.costStatus = this.selectData[0].costStatus;
          param.bookSpaceNo = this.selectData[0].objectId;
          param.customerId = this.selectData[0].customerId;
          param.currentData = this.selectData[0].createDate;
          param.customerName =  this.selectData[0].customerName;
          let params = "Authorization=Bearer " + token + "&data=" + encodeURI(JSON.stringify(param));
          this.download({
            params: params,
            handle: getShipCompanyBillApi,
            callback () {

            }
          });
        });


      },
      // 获取列表选中的数据
      handleSelectionChange(val) {
        this.selectData = val;
        if (this.selectData.length == 0) {
          return;
        }
      },
      //导出excel
      putDispatch(){
        this.$confirm('确认要导出数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          this.download({
            params: params,
            handle: getShipCompanyExcelApi,
            callback () {

            }
          });

        });
      },
      //批量导出
      batchPutExcel(){
        if (this.selectData.length >= 1) {
          this.$confirm('确认要批量导出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const token = sessionStorage.getItem('id_token');
            this.form.Authorization = `Bearer ${token}`;
//            let params = Qs.stringify(this.form.Authorization);
            const requestParams = {
              Authorization: `Bearer ${token}`,
              batchData: [],
            };
            this.selectData.forEach((data => {
              requestParams.batchData.push({
                bookSpaceNo: data.objectId,
                costStatus: data.costStatus,
                currentData: data.createDate,
              })
            }));
            let params = "Authorization=" + requestParams.Authorization + "&data=" + encodeURI(JSON.stringify(requestParams.batchData));
            this.download({
              params: params,
              handle: batchExportShipCompanyDetailApi,
              callback () {

              }
            });
          });
        } else {
          this.$confirm('请选择一条数据进行修改')
        }
      },
      //获取开始日期
      reqSTimeChange(val){
        this.form.reqSTime = val
      },
      //获取结束日期
      reqETimeChange(val){
        this.form.reqETime = val
      },

      //查看详情
      goCusDetails(res){
        util.localStorage.set('shipCompany', res);
        this.$router.push('/accounting/shipCompany/receivable/detail')
      },
      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      //获取列表
      getList(initpage){
        let success = success =>{
          this.totalAmount = this.shipCompanyAmount;
        };
        this.form.customerName= this.form.customerName ? this.form.customerName.trim() : '';
        this.form.bookSpaceNo = this.form.bookSpaceNo ? this.form.bookSpaceNo.trim():'';
        this.pageHandler(this.form, this.getShipCompanyList, initpage,success);
        this.getShipCompanyAmount(this.form);
      },
      //统计所以数据的总金额
      getCusAmount(){
        this.getShipCompanyAmount(this.form)
      },

      //查询
      onSubmit() {
        this.getCusAmount();
        this.getList(true)

      },
      //进行下拉框值的绑定
      year(){
        //获取当前时间
        var now = new Date();
        var currentYear = 2017;
        var currentMonth = now.getMonth()+1;
        //设置data.form的 yearTime & monthTime
        this.form.yearTime = currentYear;
        this.form.monthTime[0] = currentMonth-1;
        this.yearSelect = this.BindSelect(currentYear, currentYear+5, currentYear);
        this.monthSelect = this.BindSelect(1, 12, currentMonth);
      },

      initYear(){
        var now = new Date();
        var currentYear = now.getFullYear();

      },
      //获取年月下拉框
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
      this.init()
    },
  }

</script>

<style>
  @import '../../../styles/custom-theme/query-modal.css'
</style>
