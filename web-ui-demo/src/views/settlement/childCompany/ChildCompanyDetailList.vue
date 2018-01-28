<template>
  <section>
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
          <el-form-item label="物流公司" :label-width="labelWidth" prop="affiliate">
            <el-select
              clearable
              filterable
              default-first-option
              v-model="form.affiliate" placeholder="请输入物流公司名称" class='control-width'>
              <el-option
                v-for="item in initData.logisticsList"
                :key="item.value"
                :label="item.text"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
            <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookspaceNo">
            <el-input v-model="form.bookspaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
          </el-form-item>
          <br>
          <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
            <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
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
          <el-form-item label="司机" :label-width="labelWidth" prop="driver">
            <el-input v-model="form.driver" placeholder="请输入司机" class='control-width'></el-input>
          </el-form-item>
          </div>
          <div class="query-btns">
          <el-form-item >
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
      <el-button type="primary" icon="document" @click="putDispatch" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>
      <el-button type="primary" icon="document" @click="exportChildCompanyDetailTemplate" size="small" :disabled="this.$global.isDisabled(21)">导出Excel(应付匹配用)</el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        当前页应付(元)：<span style="color:red">{{total}}</span> &nbsp;&nbsp;
        总应付(元)：<span style="color:red">{{totalAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table
        :data="childCompanyDetail.data" stripe :maxHeight="tableMaxHeight"
      >
        <el-table-column
          prop="childCompany"
          label="子公司" width="150">
        </el-table-column>
        <el-table-column
          prop="affiliated"
          label="物流公司" width="150">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="下单用户" width="100">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="100">
        </el-table-column>
        <el-table-column
          prop="bookspaceNo"
          label="订舱单号" width="100">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
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
          prop="endDate"
          label="完成日期" width="100">
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
          label="多门点服务费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 9)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="feeAmount"
          label="调整运费(元)" width="100">
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
          label="洗补柜费(元)" width="110">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 4)}}</el-row>
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
          label="THC/THD(元)" width="120">
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
          label="进出闸口费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 14)}}</el-row>
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
          label="港杂费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 16)}}</el-row>
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
          label="码头作业费(元)" width="120">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 18)}}</el-row>
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
          prop="feeAmount"
          label="运费(元)" width="100">
          <template scope="scope">
            <el-row>{{getAmount(scope.row.initCostDtoList, 26)}}</el-row>
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
  import {getChildCompanyDetailExcelApi, getLogisticListApi,exportChildCompanyDetailRequisitionTemplate} from '../../../api/modules/settlement';
  import Qs from 'qs';
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    data() {
      return {
        labelWidth: '100px',
        selectData: [],
        initData: {},
        displayButtons: 'right',
        totalAmount:'0.00',
//        tableHeigh:'',
        form: {
          orgCode: '',//子公司id
          currentData: '',//上一层的日期
          isRevise: '', //是否调
          affiliate: '',//物流公司
          orderNo: '',//订单号
          bookspaceNo: '',//订单舱号
          cabinetNo: '',//箱号
          orderType: '',//任务类型
          driver: '',//司机名称
          date: '',
          Authorization: '',
          createDateEnd: '',
          createDateStart: '',
          settlementDateStart:'',//结算日期（开始）
          settlementDateEnd:'',//结算日期(结束)
          endDateStart:'',//行程结束日期（起始）
          endDateEnd:''//行程结算日期（结束）
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
        'childCompanyDetail', 'childCompanyDetailAmount'
      ]),
      //进行统计当页的总金额
      total(){
        let alltotal = 0;
        if (this.childCompanyDetail.data) {
          this.childCompanyDetail.data.forEach((val, key) => {
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
        'getChildCompanyDetail', 'getChildCompanyDetailAmount'
      ]),
      init(){
        this.getList();
        this.getDatailAmount()
      },
      //物流公司下拉框
      getChildCompany(childName){
        getLogisticListApi(childName).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initData = data.data;
          }
        });
      },
      //获取开始日期
      createDateStartChange(val){
        this.form.createDateStart = val
      },
      //获取结束日期
      createDateEndChange(val){
        this.form.createDateEnd = val
      },
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
          handle: getChildCompanyDetailExcelApi,
          callback () {

          }
        });
        });
      },
      //导出Excel(应付匹配用)
      exportChildCompanyDetailTemplate(){
        this.$confirm('确认要导出应付匹配模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          this.download({
            params: params,
            handle: exportChildCompanyDetailRequisitionTemplate,
            callback () {

            }
          });
        });
      },

      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.init();
        })
      },
      //获取列表
      getList(initpage){
        let childCompany = util.localStorage.get("childCompany");
        this.form.orgCode = childCompany.objectId;
        this.form.currentData = childCompany.endDate;
        this.form.costStatus = childCompany.costStatus;
        this.form.settlementDateStart = childCompany.settlementDateStart;
        this.form.settlementDateEnd = childCompany.settlementDateEnd;
        this.form.endDateStart = childCompany.endDateStart;
        this.form.endDateEnd = childCompany.endDateEnd;
        let param = {strCode: ''};
        param.strCode =  childCompany.orgCode;
        this.getChildCompany(param);
        let success = success =>{
          this.totalAmount = this.childCompanyDetailAmount;
        };
        this.form.orderNo = this.form.orderNo ? this.form.orderNo.trim():'';
        this.form.bookspaceNo = this.form.bookspaceNo ? this.form.bookspaceNo.trim():'';
        this.form.cabinetNo = this.form.cabinetNo ? this.form.cabinetNo.trim():'';
        this.form.driver = this.form.driver ? this.form.driver.trim():'';
        this.pageHandler(this.form, this.getChildCompanyDetail,initpage,success)
      },
      goBack(){
        this.$router.back(-1)
      },
      getDatailAmount(){
        this.getChildCompanyDetailAmount(this.form)
      },

      //查询
      onSubmit() {
        this.getList(true);
        this.getDatailAmount()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){

    },
    mounted() {

    },
   /* activated(){
      this.tableHeigh = window.screen.availHeight-290;
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
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>
