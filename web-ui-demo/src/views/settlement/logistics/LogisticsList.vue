<template>
  <section>

    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
              <el-select
                clearable
                filterable
                default-first-option
                @input="selectChild"
                v-model="form.orgCode" placeholder="请选择子公司" class='control-width'>
                <el-option
                  v-for="item in initChild.deptmentList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流公司" :label-width="labelWidth" prop="affCode">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.affCode" placeholder="请选择物流公司" class='control-width'>
                <el-option
                  v-for="item in initLogistic.logisticsList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
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
              <el-select v-model="form.monthTime" multiple placeholder="请选择" class='control-width'>
                <el-option
                  v-for="(item,index) in monthSelect"
                  :key="index"
                  :value="item">
                  <span style="float: left">{{ item }}月</span>
                </el-option>
              </el-select>
            </el-form-item>

              <el-form-item class="combine-input"  label="结算日期" :label-width="labelWidth" prop="settlementDateStart" >
                <el-date-picker type="date" placeholder="选择日期" v-model="form.settlementDateStart" @change="settlementDateStartChange"></el-date-picker>
                -
                <el-date-picker type="date" placeholder="选择日期" v-model="form.settlementDateEnd"  @change="settlementDateEndChange"></el-date-picker>
              </el-form-item>

              <el-form-item class="combine-input" :label-width="labelWidth" label="行程结束日期" prop="endDateStart" >
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateStart"  @change="endDateStartChange"></el-date-picker>
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
      <el-button type="primary" icon="document" @click="putDispatch" size="small" :disabled="this.$global.isDisabled(21)">导出Excel
      </el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        当前页应付(元)：<span style="color:red">{{total}}</span> &nbsp;&nbsp;
        总应付(元)：<span style="color:red">{{totalAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table
        ref="table" @row-click="handleRowClick" :maxHeight="tableMaxHeight" :data="logisticsList.data" stripe
      >
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column width="30">
          <template scope="scope">
            <el-badge :value="scope.row.costStatus==3?'调':''" class="item">
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="childCompany"
          label="子公司" width="150">
        </el-table-column>
        <el-table-column
          prop="carteamName"
          label="物流公司" width="150">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="完成日期" width="100">
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
          label="多门点服务费(元)" width="140">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 9)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="调整运费(元)" width="150">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 10)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="办单费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 1)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="码头作业费(元)" width="140">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 18)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="港杂费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 16)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="打单费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 15)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="吊柜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 11)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="进出闸口费(元)" width="140">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 14)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="THC/THD(元)" width="110">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 12)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="港建费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 13)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="其他费(元)" width="110">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 5)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="洗补柜费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 4)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="转栈费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 17)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="滞箱费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 19)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="堆存费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 20)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="带柜费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 21)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="验柜费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 22)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="堆场进出费(元)" width="130">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 23)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="总计(元)" width="100">
        </el-table-column>
        <el-table-column
          prop="logisticsRate"
          label="结算比例(%)" width="120">
        </el-table-column>
        <el-table-column
          prop="afterTotal"
          label="实际应付(元)" width="120" sortable>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="100">
          <template scope="scope">
            <el-button size="small" type="primary" :disabled="isDisabled(29)" @click="goLookDetails(scope.row)">查看详情
            </el-button>
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
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../api/api'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getLogisticsExcelApi, getDeptmentListApi, getLogisticListApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '85px',
        selectData: [],
        initData: {},
        initChild: {},
        initLogistic: {},
        displayButtons: 'right',
        totalAmount:'0.00',
        form: {
          orgCode: '',//子公司
          affCode: '',//物流公司
          Authorization: '',//token
          yearTime: '',//年份
          monthTime: [], //月份-支持多选
          date: '',
          settlementDateStart:'',//结算开始日期
          settlementDateEnd:'',//结算结束日期
          endDateStart: '',//行程起始日期
          endDateEnd: '',//行程结束日期
          settlementDateStart_bak:'',//结算开始日期
          settlementDateEnd_bak:'',//结算结束日期
          endDateStart_bak: '',//行程起始日期
          endDateEnd_bak: ''//行程结束日期
        },
        yearSelect: {},
        monthSelect: {},
        ccompany: [
          {text: '清远骏鹏物流有限公司', value: 0}
        ],
      }
    },
    computed: {
      ...mapGetters([
        'logisticsList', 'logisticsAmount'
      ]),
      total(){
        let alltotal = 0;
        if (this.logisticsList.data) {
          this.logisticsList.data.forEach((val, key) => {
            if (val.total != null) {
              alltotal += parseFloat(val.total)
            }
          })
        }
        return alltotal.toFixed(2)
      }

    },
    methods: {
      ...mapActions([
        'getLogisticsList', 'getLogisticsAmount'
      ]),
      init(){
        this.year();
//        this.getList()
//        this.getInitiAmount()
        this.getChildCompany();
        this.$global.recorderTableData(this, 'logisticsList');
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
      selectChild(val){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val};
          getLogisticListApi(param).then((res) => {
            let data = res.data;
          if (data.code == 1) {
            this.initLogistic = data.data;
            this.form.affCode = ''
          }
        })
        }
      },
      //进行下拉框值得绑定
      year(){
        var now = new Date();
        var currentYear = 2017;
        var currentMonth = now.getMonth() + 1;
        this.form.yearTime = currentYear;
        this.form.monthTime[0] = this.getPreMonth();
        this.yearSelect = this.BindSelect(currentYear+5, currentYear, currentYear);
        this.monthSelect = this.BindSelect(1, 12, currentMonth);
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
      //获取开始日期
      createDateStartChange(val){
        this.form.reqSTime = val
      },
      //获取结束日期
      createDateEndChange(val){
        this.form.reqETime = val
      },
      // 获取结算开始日期
      settlementDateStartChange(val) {
        this.form.settlementDateStart = val;
      },
      // 获取结算结束日期
      settlementDateEndChange(val) {
        this.form.settlementDateEnd = val;
      },
      // 获取行程开始日期
      endDateStartChange(val) {
        this.form.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form.endDateEnd = val;
      },
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
            handle: getLogisticsExcelApi,
            callback () {

            }
          });
        });
      },
      //查看详情
      goLookDetails(res){
        res.settlementDateStart = this.form.settlementDateStart_bak;//结算开始日期
        res.settlementDateEnd=this.form.settlementDateEnd_bak;//结算结束日期
        res.endDateStart=this.form.endDateStart_bak;//行程起始日期
        res.endDateEnd=this.form.endDateEnd_bak;//行程结束日期

        util.localStorage.set('logistics', res);
        this.$router.push('/accounting/logistics/payable/detail');
      },
      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      //获取总额
      getInitiAmount(){
        this.getLogisticsAmount(this.form)
      },
      //获取列表
      getList(initpage){
        let success = success =>{
          this.totalAmount = this.logisticsAmount;
        };
        this.pageHandler(this.form, this.getLogisticsList, initpage,success);
        this.getLogisticsAmount(this.form)
      },
      //查询
      onSubmit() {
        this.form.settlementDateStart_bak = this.form.settlementDateStart;
        this.form.settlementDateEnd_bak = this.form.settlementDateEnd;
        this.form.endDateStart_bak = this.form.endDateStart;
        this.form.endDateEnd_bak = this.form.endDateEnd;
        this.getList(true);
        this.getInitiAmount();
      },
      resetForm(formName) {
        this.form.orgCode='';
        this.form.affCode='';
        this.form.settlementDateStart='';
        this.form.settlementDateEnd='';
        this.form.endDateStart='';
        this.form.endDateEnd='';
      }
    },
    created(){
      this.init()
    },
  }

</script>

<style>
  /*@import '../../../styles/custom-theme/query-modal.css'*/
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>

