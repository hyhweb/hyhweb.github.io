<template>
  <section>

    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="子公司" :label-width="labelWidth" prop="deptCode">
              <el-select
                clearable
                filterable
                default-first-option
                @input="selectChild"
                v-model="form.deptCode" placeholder="请选择子公司" class='control-width'>
                <el-option
                  v-for="item in initChild.deptmentList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流公司" :label-width="labelWidth" prop="obj">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.obj" placeholder="请选择物流公司" class='control-width'>
                <el-option
                  v-for="item in initLogistic.logisticsList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="请输入订单编号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
            </el-form-item>



            <el-form-item label="自营/他营" :label-width="labelWidth" prop="operMode">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.operMode" placeholder="请选择" class='control-width'>
                <el-option v-for="item in operMode"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"></el-option>
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
                v-model="form.status" placeholder="请选择" class='control-width'>
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <div style="display: inline-block;">
              <el-form-item label="行程结束日期" prop="endDateStart" style="margin-right:2px">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateStart" style="width:120px" @change="endDateStartChange"></el-date-picker>
              </el-form-item>
              <label style="padding-right:0;padding-top:11px;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="endDateEnd">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateEnd" style="width:120px" @change="endDateEndChange"></el-date-picker>
              </el-form-item>
            </div>
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
      <el-button type="primary" icon="document" @click="exportExcel" size="small" :disabled="this.$global.isDisabled(21)">导出Excel</el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        确认收到总额(元)：<span style="color:red">{{confirmInTotalAmount}}</span> &nbsp;&nbsp;
        待确认收到总额(元)：<span style="color:red">{{stayConfirmInTotalAmount}}</span> &nbsp;&nbsp;
        确认付出总额(元)：<span style="color:red">{{confirmOutTotalAmount}}</span> &nbsp;&nbsp;
        待确认付出总额(元)：<span style="color:red">{{stayConfirmOutTotalAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table
        ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" :data="driverAgencyfundlist.data" stripe
      >
        <el-table-column type="selection" fixed width="50">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="子公司名称" width="150">
        </el-table-column>
        <el-table-column
          prop="operMode"
          label="自营他营" width="80">
        </el-table-column>
        <el-table-column
          prop="obj"
          label="对象" width="150">
        </el-table-column>
        <el-table-column
          prop="customer"
          label="客户" width="150">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="150">
        </el-table-column>
        <el-table-column
          prop="bookSpaceNo"
          label="订舱单号" width="150">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
        </el-table-column>
        <el-table-column
          prop="costTypeName"
          label="费用类型" width="100">
        </el-table-column>
        <el-table-column style="float:rigth"
           prop="amount"
           label="费用金额(元)" width="120">
        </el-table-column>
        <el-table-column
          prop="agencyPerson"
          label="代收人" width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="完成时间" width="150">
        </el-table-column>
        <el-table-column
          prop="confirmTimeIn"
          label="确认收到时间" width="130">
        </el-table-column>
        <el-table-column
          prop="amountIn"
          label="确认收到金额(元)" width="150">
        </el-table-column>
        <el-table-column
          prop="confirmer"
          label="确认人" width="100">
        </el-table-column>
        <el-table-column
          prop="remarkIn"
          label="确认收到备注" width="150">
        </el-table-column>
        <el-table-column
          prop="confirmTimeOut"
          label="确认付出时间" width="130">
        </el-table-column>
        <el-table-column
          prop="amountOut"
          label="确认付出金额(元)" width="150">
        </el-table-column>
        <el-table-column
          prop="payoutPerson"
          label="付出人" width="100">
        </el-table-column>
        <el-table-column
          prop="remarkOut"
          label="确认付出备注" width="150">
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="120">
          <template scope="scope">
            <div v-if="scope.row.status != 2">
              <el-button size="small" type="primary" v-if="!isDisabled(22)" :disabled="scope.row.status==1" @click="goDriverIn(scope.row)">收到
              </el-button>
              <el-button size="small" v-if="!isDisabled(22)" :disabled="scope.row.status!=1"
                         type="primary" @click="goDriverOut(scope.row)">付出
              </el-button>
            </div>
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
      <!--编辑界面-->
      <el-dialog size="0%"
                 title="确认" v-model="driverFormVisible" :close-on-click-modal="false">
        <el-form :model="operationForm" label-width="80px" ref="remark" :inline="true">
          <el-form-item label="备注" :label-width="labelWidth">
            <el-input type="textarea" v-model="operationForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="driverFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="driverSubmit" :loading="driverLoading">提交</el-button>
        </div>
      </el-dialog>
    </el-col>


  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
  import util from '../../common/js/util'
  import pagination  from '../../common/mixins/pagination'
  import {getAgencyfundExcelApi, getDeptmentListApi,getLogisticListApi} from '../../api/modules/settlement';
  import Qs from 'qs';
  import download from '../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '80px',
        selectData: [],
        initData: {},
        initChild:{},
        initLogistic:{},
        displayButtons: 'right',
        obj: '',//对象
        driverFormVisible: false,
        driverLoading: false,
        confirmInTotalAmount:'0.00',
        confirmOutTotalAmount:'0.00',
        stayConfirmInTotalAmount:'0.00',
        stayConfirmOutTotalAmount:'0.00',
        form: {
          deptCode: '',// 子公司
          orderNo: '',  //订单号
          cabinetNo: '',  //箱号
          bookSpaceNo: '',//订舱单号
          operMode: '',// 自营/他营
          obj: '',//对象
          status: '',// 状态
          paySTimeIn: '', //确认收到时间 的起始时间
          payETimeIn: '', //确认收到时间 的结束时间
          paySTimeOut: '',//确认付出的起始时间
          payETimeOut: '',//确认付出的结束时间
          createDateEnd: '',
          agencyType: 2,
          createDateStart: '',
          Authorization:'',//token
          yearTime: '',//年份
          monthTime: [],//月份-支持多选
          endDateStart:'',
          endDateEnd:''
        },
        operationForm: {
          cabcostId: '',//集装箱费用id
          cabinetId: '',//集装箱id
          costType: '',//costType
          remark: '',//备注
          amount: '',//金额
          agencyType: 2,
          flag: 'in'//请求方式

        },
        yearSelect: {},
        monthSelect: {},
        deptCode: [
          {text: '宁波芋头天使子公司', value: 0}
        ],// 子公司
        // 状态
        status: [
          {text: '未收到', value: 0},
          {text: '已收到', value: 1},
          {text: '已付出', value: 2}
        ],
        operMode: [
          {text: '自营', value: 1},
          {text: '他营', value: 0},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'driverAgencyfundlist', 'driverAmount', 'driverInAndOut'
      ])
    },
    methods: {
      ...mapActions([
        'getDriverAgencyfundList', 'getDriverAmount', 'getDrivertInAndOut'
      ]),
      // 获取行程开始日期
      endDateStartChange(val) {
        this.form.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form.endDateEnd = val;
      },
      init(){
        this.year();
        this.getList();
        this.getAmount();
        this.getChildCompany()
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
              this.form.obj=''
            }
          })
        }
      },
      //确认收到操作
      goDriverIn(row){
        this.driverFormVisible = true;
        this.operationForm = Object.assign({}, row);
        this.operationForm.agencyType = 2;
        this.operationForm.flag = 'in'
      },
      //确认付出操作
      goDriverOut(row){
        this.driverFormVisible = true;
        this.operationForm = Object.assign({}, row);
        this.operationForm.agencyType = 2;
        this.operationForm.flag = 'out'
      },
      /*//获取开始日期
       createDateStartChange(val){
       this.form.createDateStart = val
       },
       //获取结束日期
       createDateEndChange(val){
       this.form.createDateEnd = val
       },*/
      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      driverSubmit(){
        this.getDrivertInAndOut(this.operationForm).then(res => {
          if (res.data) {
            //this.$refs['operationForm'].resetFields()
            this.driverFormVisible = false;
            this.getList();
            this.getAmount();
            this.$message({
              message: '确认成功',
              type: 'success'
            })
          } else {
            this.driverFormVisible = false;
            this.$message({
              message: '确认失败',
              type: 'error'
            })
          }
        })
      },
      //获取列表
      getList(initpage){
        let success = success =>{
          if(this.driverAmount.receiptAmount != null){
            this.confirmInTotalAmount = this.driverAmount.receiptAmount;
          }
          if(this.driverAmount.stayReceiptAmount != null){
            this.stayConfirmInTotalAmount = this.driverAmount.stayReceiptAmount;
          }
          if(this.driverAmount.payAmount != null){
            this.confirmOutTotalAmount = this.driverAmount.payAmount;
          }
          if(this.driverAmount.stayPayamount != null){
            this.stayConfirmOutTotalAmount = this.driverAmount.stayPayamount;
          }
        };

        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';

        this.pageHandler(this.form, this.getDriverAgencyfundList,initpage,success)
      },
      //获取总的金额
      getAmount(){
        this.getDriverAmount(this.form)
      },
      //进行下拉框值得绑定
      year(){
        var now = new Date();
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth() + 1;
        //this.form.yearTime = currentYear;
        //this.form.monthTime[0] = this.getPreMonth()
        this.yearSelect = this.BindSelect(currentYear, currentYear+5, currentYear);
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
      goBack(){
        this.$router.back(-1)
      },

      onSubmit() {
        this.getList(true);
        this.getAmount()
      },
      //导出excel表
      exportExcel(){
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
            handle: getAgencyfundExcelApi,
            callback () {

            }
          });
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    /*created(){
      this.init()
    },*/
    beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.init()
      })
    }
  }

</script>

<style>
  @import '../../styles/custom-theme/query-modal-lg.css'
</style>
