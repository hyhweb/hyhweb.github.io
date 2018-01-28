<template>
  <section>
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
          <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
            <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
            <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="柜号" :label-width="labelWidth" prop="cabinetNo">
            <el-input v-model="form.cabinetNo" placeholder="请输入柜号" class='control-width'></el-input>
          </el-form-item>
          <br>
          <el-form-item label="司机" :label-width="labelWidth" prop="driver">
            <el-input v-model="form.driver" placeholder="请输入司机" class='control-width'></el-input>
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
          </div>
          <div class="query-btns">
          <el-form-item>
            <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="setting" @click="resetForm('form')">清空</el-button>
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
        :data="logisticsDetail.data" :maxHeight="tableMaxHeight" stripe
      >
        <el-table-column
          prop="subName"
          label="子公司" width="100">
        </el-table-column>
        <el-table-column
          prop="affName"
          label="物流公司" width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="完成日期" width="100">
        </el-table-column>
        <el-table-column
          prop="driver"
          label="司机" width="100">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="100">
        </el-table-column>
        <el-table-column
          prop="bookSpaceNo"
          label="订舱单号" width="100">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
        </el-table-column>
        <el-table-column
          prop="conType"
          label="箱型" width="100">
        </el-table-column>
        <el-table-column
          prop="orderType"
          label="任务类型" width="100">
        </el-table-column>

        <el-table-column
          prop="feeAmount"
          label="物流公司运费(元)" width="140">
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
          label="调整运费(元)" width="110">
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
          label="进出闸口费(元)" width="130">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 14)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="THC/THD(元)" width="130">
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
          label="其他费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 5)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="洗补柜费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 4)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="转栈费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 17)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="滞箱费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 19)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="堆存费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 20)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
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
          prop="total"
          label="总计(元)" width="110" sortable>
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
<!--    <el-col style="padding:10px 0;text-align:center;">
      <el-button type="primary" icon="arrow-up" style="margin-bottom:15px" @click="goBack">返回</el-button>
    </el-col>-->
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../api/api';
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getLogisticsDetailExcelApi} from '../../../api/modules/settlement';
  import Qs from 'qs'
  import download from '../../../common/mixins/download';
  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '100px',
        selectData: [],
        displayButtons: 'right',
        totalAmount:'0.00',
        form: {
          carteamId: '',//子公司orgCode
          endDate: '',//日期
          detailEndDate:'',//详情标注日期
          isRevise: '',//是否调
          orderNo: '',//订单号
          bookSpaceNo: '',//订舱单号
          cabinetNo: '',//箱号
          driver: '',//司机
          orderType: '',//任务类型
          Authorization: '',//token
          settlementDateStart:'',//结算开始日期
          settlementDateEnd:'',//结算结束日期
          endDateStart: '',//行程起始日期
          endDateEnd: ''//行程结束日期
        },
        ccompany: [
          {text: '清远骏鹏物流有限公司', value: 0}
        ],// 子公司名称
        orderType: [
          {text: '装货', value: 0},
          {text: '送货', value: 1}
        ],

      }
    },
    computed: {
      ...mapGetters([
        'logisticsDetail', 'logisticsDetailAmount'
      ]),
      total(){
        let alltotal = 0;
        if (this.logisticsDetail.data) {
          this.logisticsDetail.data.forEach((val, key) => {
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
        'getLogisticsDetail', 'getLogisticsDetailAmount'
      ]),
      init(){
        this.getList();
        this.getDetailAmount()
        //this.$store.dispatch('getOrderStatus')
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
          handle: getLogisticsDetailExcelApi,
          callback () {

          }
        });
        });
      },
      //获取结束日期
      createDateEndChange(val){
        this.form.createDateEnd = val
      },
      //查看详情
      goLookDetails(val){
        this.$router.push('/customerReceivablesDetail/12')
      },
      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      //返回
      goBack(){
        this.$router.back(-1)
      },
      //获取列表
      getList(initpage){
        let log = util.localStorage.get('logistics');
        this.form.carteamId = log.objectId;
        this.form.detailEndDate = log.endDate;
        this.form.costStatus = log.costStatus;

        this.form.settlementDateStart = log.settlementDateStart;
        this.form.settlementDateEnd = log.settlementDateEnd;
        this.form.endDateStart = log.endDateStart;
        this.form.endDateEnd = log.endDateEnd;

        let success = success =>{
          this.totalAmount = this.logisticsDetailAmount;
        };
        this.form.orderNo = this.form.orderNo ? this.form.orderNo.trim():'';
        this.form.bookSpaceNo = this.form.bookSpaceNo ? this.form.bookSpaceNo.trim():'';
        this.form.cabinetNo =this.form.cabinetNo ? this.form.cabinetNo.trim():'';
        this.form.driver = this.form.driver ? this.form.driver.trim():'';
        this.pageHandler(this.form, this.getLogisticsDetail,initpage,success);
      },
      //获取总金额
      getDetailAmount(){
        this.getLogisticsDetailAmount(this.form)
      },
      //查询
      onSubmit() {
        this.getList(true);
        this.getDetailAmount()
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
        for(var o in vm.form){
          vm.form[o]='';
        }
        vm.init()
      })
    }
  }

</script>

<style>
  /*@import '../../../styles/custom-theme/query-modal.css'*/
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>
