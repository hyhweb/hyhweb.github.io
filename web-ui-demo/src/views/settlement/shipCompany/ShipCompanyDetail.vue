<template>
  <section>
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
          <el-form-item label="子公司" :label-width="labelWidth" prop="childCompanyCode">
            <el-select
              clearable
              filterable
              default-first-option
              v-model="form.childCompanyCode" placeholder="请选择子公司" class='control-width'>
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
          </div>
          <div class="query-btns">
            <el-form-item style="float:rigth">
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
      <div style="float:right;margin-top:8px;margin-right:10px">
        当前页应收(元)：<span style="color:red">{{pageTotal}}</span> &nbsp;&nbsp;
        总应收(元)：<span style="color:red">{{detailTotalAmount}}</span>
      </div>
    </el-col>
    <!--列表-->
    <el-col>
      <el-table
        ref="table" @row-click="handleRowClick" :maxHeight="tableMaxHeight" :data="shipCompanyDetailList.data" stripe
      >
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户名称" width="100">
        </el-table-column>
        <el-table-column
          prop="bookspaceNo"
          label="订舱单号" width="100">
        </el-table-column>
        <el-table-column
          prop="childCompany"
          label="子公司" width="100">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号" width="100">
        </el-table-column>
        <el-table-column
          prop="orderTypeText"
          label="类型" width="90">
        </el-table-column>
        <el-table-column
          prop="cabinetNo"
          label="箱号" width="100">
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
          label="其他费(元)" width="100">
          <template scope="scope">
            <el-row>{{getOther(scope.row.initCostDtoList)}}</el-row>
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
          prop="createDate"
          label=" 下单日期" width="100">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总计(元)" width="110" sortable>
          <template scope="scope">
            <el-row>{{total(scope.row.initCostDtoList)}}</el-row>
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
  import {getShipCompanyDetailExcelApi, getDeptmentListApi} from '../../../api/modules/settlement';
  import Qs from 'qs';
  export default {
    mixins: [pagination],
    data() {
      return {
        labelWidth: '80px',
        selectData: [],
        initData: {},
        detailTotalAmount:'0.00',
        form: {
          costStatus: '',//费用状态
          customerId: '',//客户id
          childCompanyCode:'',
          orderNo: '',  //订单号
          currentData:'',//详情查询日期
          cabinetNo: '',  //箱号
          bookSpaceNo: '',//订舱单号
          orderType: '',//任务类型
          checkStatus: '',// 对账单状态
          Authorization: ''//token
        },// 子公司
        // 对账类型
        checkStatus: [
          {text: '未对账', value: 0},
          {text: '已对账', value: 1}
        ],
        orderType: [
          {text: '装货', value: 0},
          {text: '送货', value: 1}
        ],


      }
    },
    computed: {
      ...mapGetters([
        'shipCompanyDetailList', 'shipCompanyDetailAmount'
      ]),
      //进行统计当页的总金额
      pageTotal(){
        let alltotal = 0;
        if (this.shipCompanyDetailList.data) {
          if (this.shipCompanyDetailList.data) {
            this.shipCompanyDetailList.data.forEach((val, key) => {
              if (val.initCostDtoList != null) {
                val.initCostDtoList.filter((res)=>{
                  alltotal += parseFloat(res.feeAmount)
                })
              }
            })
          }
        }
        return alltotal.toFixed(2)
      }
    },
    methods: {
      ...mapActions([
        'getShipCompanyDetailList', 'getShipCompanyDetailAmount'
      ]),
      init(){
        this.getList();
        this.getCusAmount();
        this.getChildCompany()
        //this.$store.dispatch('getOrderStatus')
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
      //子公司下拉框(初期化)
      getChildCompany(){
        getDeptmentListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initData = data.data;
          }
        });
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
      //获取列表
      getList(initpage){
        let user = util.localStorage.get('shipCompany');
        this.form.bookSpaceNo = user.objectId;
        this.form.costStatus = user.costStatus;
        this.form.currentData = user.createDate;
        this.form.customerId = user.customerId;
        let success = success =>{
          this.detailTotalAmount = this.shipCompanyDetailAmount;
        };
        this.form.orderNo = this.form.orderNo ? this.form.orderNo.trim():'';
        this.form.cabinetNo = this.form.cabinetNo ? this.form.cabinetNo.trim():'';
        this.form.bookspaceNo = this.form.bookspaceNo ? this.form.bookspaceNo.trim():'';
        this.pageHandler(this.form, this.getShipCompanyDetailList,initpage,success)
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
          getShipCompanyDetailExcelApi(params)
        });
      },
      //对应杂费详情
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
      //统计所以数据的总金额
      getCusAmount(){
        this.getShipCompanyDetailAmount(this.form)
      },
      goBack(){
        this.$router.back(-1)
      },
      onSubmit() {
        this.getList(true);
        this.getCusAmount()
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
