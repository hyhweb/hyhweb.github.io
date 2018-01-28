<template>
  <section>
    <ToolBarBox>
      <el-col>
        <form-box title="查询">
          <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
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

              <el-form-item label="客户名称" :label-width="labelWidth" prop="customerName">
                <el-input v-model="form.customerName" placeholder="请输入客户名称" class='control-width'></el-input>
              </el-form-item>

              <el-form-item label="业务员" :label-width="labelWidth" prop="salesmanId">
                <el-select
                  clearable
                  filterable
                  default-first-option
                  v-model="form.salesmanId" placeholder="请选择业务员" class='control-width'>
                  <el-option
                    v-for="item in userSelect"
                    :key="item.id"
                    :label="item.value"
                    :text="item.value"
                    :value="item.id"></el-option>
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

                <el-form-item class="combine-input" label="结算日期" :label-width="labelWidth" prop="settlementDateStart" >
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.settlementDateStart"  @change="settlementDateStartChange"></el-date-picker>
                  -
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.settlementDateEnd"  @change="settlementDateEndChange"></el-date-picker>
                </el-form-item>

                <el-form-item class="combine-input"  label="行程结束日期" :label-width="labelWidth" prop="endDateStart" >
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateStart" @change="endDateStartChange"></el-date-picker>
                  -
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateEnd"  @change="endDateEndChange"></el-date-picker>
                </el-form-item>

            </div>
            <div class="query-btns">
              <el-form-item>
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
        <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(60)" :disabled="selectData.length==0" @click="batchPutExcel" size="small">批量导出</el-button>
        <div style="display: inline-block;padding: 3px;border-radius: 8px;box-shadow: inset 1px 1px 1px #d1dbe5, inset 0 0 70px #d1dbe5;"><el-button type="primary" icon="document" v-if="!this.$global.isDisabled(73)" :disabled="selectData.length!=1" @click="onceAndReceiveExportExcel" size="small">三表合一客户账单</el-button>
        <el-checkbox v-model="isContainReceivableCost">包含已申请费用</el-checkbox></div>
        <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(223)" :disabled="selectData.length!=1" @click="addReceivableRequisition" size="small">生成收款单</el-button>
        <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(224)" :disabled="selectData.length!=1" @click="getCustomerReceivableDetail" size="small">收款单详情</el-button>
        <div style="float:right;margin-top:8px;margin-right:10px">
          当前页应收(元)：<span style="color:red">{{total}}</span> &nbsp;&nbsp;
          总应收(元)：<span style="color:red">{{totalAmount}}</span>
        </div>
      </el-col>
    </ToolBarBox>
    <TableBox>
      <!--列表-->
      <el-col>
        <el-table ref="table" @row-click="handleRowClick" :maxHeight="tableMaxHeight"
                  :data="customerReceivable.data" stripe @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" fixed v-model="selectData" width="50">
          </el-table-column>
          <el-table-column width="30">
            <template scope="scope">
              <el-badge :value="scope.row.costStatus==3?'调':''" class="item">
              </el-badge>
            </template>
          </el-table-column>
          <el-table-column sortable
                           prop="customerName"
                           label="客户名称" width="150">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="业务员名称" width="100">
          </el-table-column>
          <el-table-column
            prop="settleDay"
            label="结算天数(天)" width="100">
          </el-table-column>
          <el-table-column
            prop="receivableRequisitionId"
            label="申请单号" width="110">
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
            prop="endDate"
            label="完成日期" width="100">
          </el-table-column>
          <el-table-column
            prop="total"
            label="总计(元)" width="110" sortable>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="100">
            <template scope="scope">
              <el-button size="small" type="primary" :disabled="isDisabled(29)" @click="goCusDetails(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </TableBox>
    <PaginationBox>
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
    </PaginationBox>
    <!-- 客户应收_收款单详情-->
    <CustomerReceivableDetail ref="customerReceivableDetail"></CustomerReceivableDetail>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../api/api';
  import download from '../../../common/mixins/download';
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import CustomerReceivableDetail from './CustomerReceivableDetail.vue'
  import {getCustomerExcelApi, batchExportCustomerDetailApi,getCustomerBillApi,
    onceAndReceiveExportExcelApi,getDeptmentListApi,getUserDropdownListApi,addReceivableRequisitionApi} from '../../../api/modules/settlement';
  import Qs from 'qs';
  export default {
    mixins: [pagination,download],
    components: {
      CustomerReceivableDetail
    },
    data() {
      return {
        labelWidth: '80px',
        selectData: [],
        initData: {},
        displayButtons: 'right',
        totalAmount:'0.00',
        settlementDateStart_cache:'',//结算起始日期
        settlementDateEnd_cache:'',//结算结束日期
        endDateStart_cache:'',//行程日期（起始）
        endDateEnd_cache:'',//行程日期(结束)
        childCompanyCode_cache:'',//子公司编码
        userSelect:[],//业务员下拉框列表
        isContainReceivableCost:false, //是否已包含申请费用
        form: {
          customerName: '',//客户名称，支持模糊
          childCompanyCode:'',//子公司编码
          year: '',
          month: '',
          phbc: '',// 收/付款单状态
          should: '',// 应收/付单状态
          checkStatus: '',// 对账单状态，
          Authorization: '',
          yearTime: '',
          monthTime: [],
          settlementDateStart:'',//结算起始日期
          settlementDateEnd:'',//结算结束日期
          endDateStart:'',//行程日期（起始）
          endDateEnd:'',//行程日期(结束)
          salesmanId:''//业务员id

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
        // 对账类型
        checkStatus: [
          {text: '未对账', value: 0},
          {text: '已对账', value: 1}
        ],
        phbc: [
          {text: '未生成', value: 0},
          {text: '已生成', value: 1}
        ],// 收/付款单状态
        should: [
          {text: '未生成', value: 0},
          {text: '已生成', value: 1}
        ],// 应收/付单状态

      }
    },
    computed: {
      ...mapGetters([
        'customerReceivable', 'customerAmount'
      ]),
      //进行统计当页的总金额
      total(){
        if (JSON.stringify(this.customerReceivable.data) == "") {
          this.buttonStatus = true;
        }
        let alltotal = 0;
        if (this.customerReceivable.data) {
          this.customerReceivable.data.forEach((val, key) => {
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
        'getCustomerReceivable', 'getCustomerAmount'
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
      init(){
//        this.getList()
//        this.getCusAmount()
        //this.initYear();//初始化日期的下拉列表
//        const hash = location.hash;
//        if (typeof(this.$global.storeTable[hash]) === 'undefined') {
//
//        }
        this.getUserList();
        this.year();
        this.getChildCompany();
        //this.$store.dispatch('getCustomerAmount',Object.assign(this.form,this.$global.storeTable[hash] == undefined?{}:this.$global.storeTable[hash].form));
        this.$global.recorderTableData(this, 'customerReceivable',this.getCusAmount(this.form));

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

      //导出客户账单
      exportCustomerBill(){
        this.$confirm('确认要导出客户账单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          const param={
            customerId: "",
            costStatus: "",
            childCompanyCode:"",
            customerName:"",
            currentData: "",
            settlementDateStart:"",
            settlementDateEnd:"",
            endDateStart:"",
            endDateEnd:"",
          };
          param.costStatus = this.selectData[0].costStatus;
          param.customerId = this.selectData[0].objectId;
          param.currentData = this.selectData[0].endDate;
          param.customerName =  this.selectData[0].customerName;
          param.childCompanyCode = this.childCompanyCode_cache;
          param.settlementDateStart = this.settlementDateStart_cache;
          param.settlementDateEnd = this.settlementDateEnd_cache;
          param.endDateStart = this.endDateStart_cache;
          param.endDateEnd = this.endDateEnd_cache;
          let params = "Authorization=Bearer " + token + "&data=" + encodeURI(JSON.stringify(param));

          this.download({
            params: params,
            handle: getCustomerBillApi,
            callback () {
              this.init()
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
            handle: getCustomerExcelApi,
            callback () {
              this.onSubmit()
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
                customerId: data.objectId,
                costStatus: data.costStatus,
                currentData: data.endDate,
                settlementDateStart:this.settlementDateStart_cache,
                settlementDateEnd:this.settlementDateEnd_cache,
                childCompanyCode:this.childCompanyCode_cache,
                endDateStart:this.endDateStart_cache,
                endDateEnd:this.endDateEnd_cache
              });
            }));
            let params = "Authorization=" + requestParams.Authorization + "&data=" + encodeURI(JSON.stringify(requestParams.batchData));

            this.download({
              params: params,
              handle: batchExportCustomerDetailApi,
              callback () {

              }
            });

          });
        } else {
          this.$confirm('请选择一条数据进行修改')
        }
      },
      //三表合一客户账单导出
      onceAndReceiveExportExcel(){
        if (this.selectData.length >= 1) {
          this.$confirm('确认要导出三表合一客户账单吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const token = sessionStorage.getItem('id_token');
            this.form.Authorization = `Bearer ${token}`;
            const param={
              customerId: "",
              childCompanyCode:"",
              costStatus: "",
              currentData: "",
              settlementDateStart:"",
              settlementDateEnd:"",
              endDateStart:"",
              endDateEnd:"",
              customerName:"",
              isContainReceivableCost:"",
            };
            param.costStatus = null;
            param.isContainReceivableCost = this.isContainReceivableCost;
            param.customerId = this.selectData[0].objectId;
            param.currentData = this.selectData[0].endDate;
            param.customerName =  this.selectData[0].customerName;
            param.childCompanyCode = this.childCompanyCode_cache;
            param.settlementDateStart = this.settlementDateStart_cache;
            param.settlementDateEnd = this.settlementDateEnd_cache;
            param.endDateStart = this.endDateStart_cache;
            param.endDateEnd = this.endDateEnd_cache;
            let params = "Authorization=" + this.form.Authorization + "&data=" + encodeURI(JSON.stringify(param));
            this.download({
              params: params,
              handle: onceAndReceiveExportExcelApi,
              message: {
                message:"导出失败,所选的客户没有未申请费用",
                type:'warning'
              },
              callback () {
              }
            })
          });
        } else {
          this.$confirm('请至少选择一个客户进行导出！')
        }
      },
      //生成收款申请单
      addReceivableRequisition(){
        if (this.selectData.length === 1) {
          if(this.selectData[0].receivableRequisitionId !== null){
            this.$message({
              message:"选中的数据已经生成收款单，请重新选择",
              type:'warning'
            });
            return
          }
          this.$confirm('确认要生成收款单吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const param={
              customerId: "",
              childCompanyCode:"",
              costStatus: "",
              currentData: "",
              settlementDateStart:"",
              settlementDateEnd:"",
              endDateStart:"",
              endDateEnd:"",
              customerName:""
            };
            param.costStatus = null;
            param.customerId = this.selectData[0].objectId;
            param.currentData = this.selectData[0].endDate;
            param.customerName =  this.selectData[0].customerName;
            param.childCompanyCode = this.childCompanyCode_cache;
            param.settlementDateStart = this.settlementDateStart_cache;
            param.settlementDateEnd = this.settlementDateEnd_cache;
            param.endDateStart = this.endDateStart_cache;
            param.endDateEnd = this.endDateEnd_cache;
            addReceivableRequisitionApi({data:JSON.stringify(param)}).then(res=>{
              if(res.data.success && res.data.code === '1'){
                this.getList();
                this.$message({
                  message: '生成应收收款单成功',
                  type: 'success'
                })
              } else {
                let message = res.data.message;
                this.$message({
                  message: message !== null ? message:'生成应收收款单失败',
                  type: 'error'
                })
              }
            })
          })
        } else {
          this.$confirm('请选择一条数据进行生成收款单');
        }
      },
      //获取收款详情
      getCustomerReceivableDetail(){
        if (this.selectData.length === 1) {
          if(this.selectData[0].receivableRequisitionId === null){
            this.$message({
              message:"选中的数据未生成收款单，请重新选择",
              type:'warning'
            });
            return
          }
          this.$refs.customerReceivableDetail.detailVisible = true;
          this.$refs.customerReceivableDetail.form.showFlag=true;
          this.$refs.customerReceivableDetail.form.receivableRequisitionId = this.selectData[0].receivableRequisitionId;
          this.$refs.customerReceivableDetail.init()
        }else{
          this.$refs.customerReceivableDetail.detailVisible = false;
          this.$refs.customerReceivableDetail.form.showFlag=false;
          this.$confirm('请选择一条要查看的记录')
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
      //结算日期(开始)
      settlementDateStartChange(val){
        this.form.settlementDateStart = val;
      },
      //结算日期(结束）
      settlementDateEndChange(val){
        this.form.settlementDateEnd = val;
      },
      //行程结束日期(起始)
      endDateStartChange(val){
        this.form.endDateStart = val;
      },
      //行程结束日期(结束)
      endDateEndChange(val){
        this.form.endDateEnd = val;
      },

      //查看详情
      goCusDetails(res){
        res.orgCode = this.childCompanyCode_cache;
        res.settlementDateStart = this.settlementDateStart_cache;
        res.settlementDateEnd = this.settlementDateEnd_cache;
        res.endDateStart = this.endDateStart_cache;
        res.endDateEnd = this.endDateEnd_cache;
        util.localStorage.set('customer', res);
        this.$router.push('/accounting/customer/receivable/detail')
      },
      // 显示或隐藏操作按钮
      showButtons(){
        this.displayButtons = this.displayButtons === 'right' ? '' : "right";
      },
      //获取列表
      getList(initpage){
        this.settlementDateStart_cache = this.form.settlementDateStart;
        this.settlementDateEnd_cache = this.form.settlementDateEnd;
        this.endDateStart_cache = this.form.endDateStart;
        this.endDateEnd_cache = this.form.endDateEnd;
        this.childCompanyCode_cache = this.form.childCompanyCode;
        this.form.customerName= this.form.customerName ? this.form.customerName.trim() : '';
        this.form.childCompanyName = this.form.childCompanyName ? this.form.childCompanyName.trim():'';
        this.pageHandler(this.form, this.getCustomerReceivable, initpage);

      },
      //统计所以数据的总金额
      getCusAmount(val){
        this.getCustomerAmount(val).then(res=>{
          if(res.code === '1'){
            this.totalAmount = this.customerAmount;
          }
        })
      },

      //查询
      onSubmit() {
        this.getCusAmount(this.form);
        this.getList(true)

      },
      //获取业务员下拉列表
      getUserList(){
        getUserDropdownListApi().then((res)=>{
          this.userSelect = res.data.data
        })
      },

      //进行下拉框值的绑定
      year(){
        //获取当前时间
        var now = new Date();
        var currentYear = 2017;
        var currentMonth = now.getMonth() + 1;
        //设置data.form的 yearTime & monthTime
        this.form.yearTime = currentYear;
        this.form.monthTime[0] = this.getPreMonth();
//        this.yearSelect = this.BindSelect(currentYear - 4, currentYear, currentYear);
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
//        this.$refs[formName].resetFields();
            this.form.customerName='';
            this.form.childCompanyCode='';
            this.form.settlementDateStart='';//结算起始日期
            this.form.settlementDateEnd='';//结算结束日期
            this.form.endDateStart='';//行程日期（起始）
            this.form.endDateEnd='';//行程日期(结束)
            this.form.salesmanId = '';//业务id
      }
    },
    created(){
      this.init()
    },
  }

</script>

<style>
  /*@import '../../../styles/custom-theme/query-modal.css';*/
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>
