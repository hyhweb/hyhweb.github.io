<template>
  <section>
    <ToolBarBox>
     <el-col class="tool-bar" >
     <el-button-group>
       <el-button type="primary" icon="edit" @click="cashApplication" size="small" :disabled="this.$global.isDisabled(220) ">申请现结</el-button>
        <el-button type="primary" icon="document" @click="exportExcel" size="small" :disabled="this.$global.isDisabled(21)">导出</el-button>
    </el-button-group>
     </el-col>
      <el-col>
        <form-box title="查询">
          <el-form class="query-modal query-modal-sm" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
            <div class="query-params">
              <el-form-item label="子公司" :label-width="labelWidth" prop="subCode">
                <el-select clearable filterable default-first-option
                @change="handleOrderSelect"
                v-model="form.subCode"
                placeholder="请选择子公司"
                class='control-width'>
                  <el-option v-for="item in cashSettlementQuery.childCompanys"
                  :label="item.value"
                  :key="item.code"
                  :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物流公司" :label-width="labelWidth" prop="logisticsCode">
                <el-select clearable filterable default-first-option v-model="form.logisticsCode" placeholder="请选择物流公司" class='control-width'>
                  <el-option v-for="(item, index) in logisticsList"  :key="item.id" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="司机" :label-width="labelWidth" prop="driver">
                <el-input v-model="form.driver" placeholder="请输入司机名称" class='control-width'></el-input>
              </el-form-item>

              <el-form-item  label="结算单状态" :label-width="labelWidth" prop="settleStatus">
                <el-select clearable filterable default-first-option v-model="form.settleStatus" placeholder="请选择" class='control-width'>
                  <el-option v-for="item in cashSettlementQuery.cashSettleStatusList"
                   :label="item.text"
                  :key="item.value"
                  :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
                <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
              </el-form-item>

              <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
                <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
                <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="结算单号" :label-width="labelWidth" prop="cashSettlementNo">
                <el-input v-model="form.cashSettlementNo" placeholder="请输入结算单号" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="完成日期" :label-width="labelWidth" style="width:490px">
              <el-col :span="10">
                <el-form-item prop="startDate">
                  <el-date-picker type="date" icon="" placeholder="年-月-日" v-model="form.startDate" @change="startDateChange" style="width:150px"></el-date-picker>
              </el-form-item>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="10">

              <el-form-item label="" :label-width="labelWidth" prop="endDate" style="width:150px">
                <el-date-picker type="date" placeholder="年-月-日" v-model="form.endDate" @change="endDateChange" style="width:150px"></el-date-picker>
              </el-form-item>
              </el-col>
              </el-form-item>

              <el-form-item label="付款时间" label-width="85px" style="width:490px">
                 <el-col :span="10">
                    <el-form-item  prop="startPayTime" style="margin-right:2px">
                      <el-date-picker type="date" icon="" placeholder="年-月-日" v-model="form.startPayTime" @change="startPayTimeChange" style="width:150px"></el-date-picker>
                    </el-form-item>
                 </el-col>
                 <el-col class="line" :span="1">-</el-col>
              <el-col :span="10">
                  <el-form-item label="" :label-width="labelWidth" prop="endPayTime" style="width:150px">
                <el-date-picker type="date" placeholder="年-月-日" v-model="form.endPayTime" @change="endPayTimeChange" style="width:150px"></el-date-picker>
              </el-form-item>
              </el-col>


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
    </ToolBarBox>
    <TableBox>
      <el-col>
        <el-table ref="table" :maxHeight="tableMaxHeight - 58" @row-click="handleRowClick" :data="cashSettlementListData" @selection-change="handleSelectionChange"
         stripe
         :default-sort = "{prop: 'endDate', order: 'descending'}"
         @sort-change="sortChange">
          <el-table-column type="selection" fixed width="50">
          </el-table-column>
          <el-table-column prop="subName" label="子公司" width="100">
          </el-table-column>
          <el-table-column prop="affName" label="物流公司" width="100">
          </el-table-column>
          <el-table-column prop="endDate" sortable label="完成日期" width="90">
          </el-table-column>
          <el-table-column prop="orderTypeText" label="任务类型" width="90">
          </el-table-column>
          <el-table-column prop="conType" label="箱型" width="90">
          </el-table-column>
          <el-table-column prop="driverName" label="司机" width="90">
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号" width="90">
          </el-table-column>
          <el-table-column prop="bookSpaceNo" label="订舱单号" width="90">
          </el-table-column>
          <el-table-column prop="cabinetNo" label="箱号" width="100">
          </el-table-column>
          <el-table-column prop="referQuotedPrice" label="拖车报价参考" width="100">
          </el-table-column>
          <el-table-column prop="scheduleFreight" label="行程运费" width="100">
          </el-table-column>
          <el-table-column prop="superPrice" sortable label="超价金额" width="100">
          <template scope="scope">
            <span :class="{'c1':scope.row.superPrice >= 0}" >{{scope.row.superPrice}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="remark" label="行程运费备注" width="100">
          </el-table-column>
          <el-table-column prop="total" label="运费小计" width="100">
          <template scope="scope">
          <el-popover
          ref="popover"
          placement="right-start"
          trigger="hover">
            <el-table :data="scope.row.totalList">
              <el-table-column prop="text" label="费用类型"></el-table-column>
              <el-table-column prop="value" label="费用金额"></el-table-column>
            </el-table>
        </el-popover>
              <div v-popover:popover>{{scope.row.total}}</div>
          </template>
          </el-table-column>
          <el-table-column prop="isUploadSignedBill" label="签收单是否已上传" width="80">
          </el-table-column>
          <el-table-column prop="cashSettlementNo" label="结算单号" width="100">
          </el-table-column>
          <el-table-column prop="settleStatusText" label="结算状态" width="100">
          </el-table-column>
          <el-table-column prop="settleType" label="结算方式" width="100">
          </el-table-column>
          <el-table-column prop="payTime" label="支付时间" width="100">
          </el-table-column>
        </el-table>
      </el-col>
    </TableBox>
    <PaginationBox>
      <!-- 分页模块 -->
      <el-col style="padding:10px 0;text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>
    <CashApplication ref="cashApplication"></CashApplication>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '../../../common/js/util'
import pagination from '../../../common/mixins/pagination'
import CashApplication from './CashApplication.vue'
import { getPayObjListApi, exportCashContainer, getListByStrCode } from '../../../api/modules/settlement';
import Qs from 'qs'


export default {
  mixins: [pagination],
  components: {
    CashApplication
  },
  data() {
    return {
      labelWidth: '90px',
      selectData: [],
      logisticsList:[],
      form: {
        subCode:'',   // 子公司
        logisticsCode:'', //物流公司
        driver:'', //司机
        startDate:'',
        endDate:'', //完成日期
        settleStatus:'3',  //结算单状态
        cabinetNo:'', //箱号
        startPayTime:'',
        endPayTime:'',//付款时间
        orderNo:'',  //订单号
        bookSpaceNo:'', //订舱单号
        cashSettlementNo:'', //结算单号
        superPriceSort:'0'
      },
      totalData:[]

    }
  },
  computed: {
    ...mapGetters([
      'cashSettlementList',
      'cashSettlementQuery'
    ]),
    cashSettlementListData(){
      if(this.cashSettlementList == null){
          return [];
      }else{
          return this.cashSettlementList.data;
      }
    }
  },
  methods: {
    ...mapActions([
      'getCashSettlement',
      'getCabinetQuery',
      'getCostListByCabinetId',
      'saveApplyCashSettled'

    ]),
    init() {
      this.getCabinetQuery()

    },
    getList() {
      this.pageHandler(this.form, this.getCashSettlement)
    },

    startDateChange(val){
      this.form.startDate = val;
    },
    endDateChange(val){
      this.form.endDate = val;
    },
    startPayTimeChange(val){
      this.form.startPayTime = val;
    },
    endPayTimeChange(val){
       this.form.endPayTime = val;
     },
     sortChange(column, prop, order){
      if(column.prop =="superPrice"){
        if(column.order=="ascending"){
          this.form.superPriceSort = "1";
        }else{
          this.form.superPriceSort = "0";
        }
      }
       this.getList();
     },
    handleOrderSelect(strCode){
      this.form.logisticsCode="";
        if (strCode) {
          let param = {strCode: strCode};
          getListByStrCode(param).then((res) => {
            if (res.data.code==="1") {
              this.logisticsList = res.data.data.logisticsList
            }
          })
        }
      },
    onSubmit() {
      this.getList();
    },

    cashApplication() {
     if (this.selectData.length >0) {
        if(this.selectData.length == 1){
            if(this.selectData[0].settleStatus !=3){
              this.$message({
                message:'请选择待申请结算状态的数据进行申请现结',
                type:'warning'
              })
              return;
            }
        }
        if(this.selectData.length > 1){

            let IsSameSettleStatus = true,
                IsSameDriverInfoId = true,
                IsSameEndDate = true;
            this.selectData.filter((item,key)=>{
              if(this.selectData[0].settleStatus !=item.settleStatus && item.settleStatus !=3){
                IsSameSettleStatus = false;
                return false;
              }
              if(this.selectData[0].driverInfoId !=item.driverInfoId){
                IsSameDriverInfoId = false;
                 return false;
              }
              if((this.selectData[0].endDate).substr(0,7) != (item.endDate).substr(0,7)){
                IsSameEndDate = false;
                 return false;
              }
            })
            if(!IsSameSettleStatus){
              this.$message({
                message:'请选择待申请结算状态的数据进行申请现结',
                type:'warning'
              })
              return;
            }
            if(!IsSameDriverInfoId){
              this.$message({
                message:'请选择同一个司机的数据进行申请现结',
                type:'warning'
              })
              return;
            }
            if(!IsSameEndDate){
              this.$message({
                message:'请选择同一个月份的数据进行申请现结',
                type:'warning'
              })
              return;
            }

        }

        this.$refs.cashApplication.cashApplicationVisible = true;
        this.$refs.cashApplication.detail = this.selectData[0];
        this.$refs.cashApplication.cabinetList =  this.selectData;
        this.$refs.cashApplication.form.cabinetCount = this.selectData.length;
        this.$refs.cashApplication.getApplyCashSettleDetailDatat();

        this.$refs.cashApplication.fileList=[];
        this.$refs.cashApplication.form.uploadUrl="";
        console.log(this.selectData[0],'this.selectData[0]')
      } else {
        this.$confirm('请选择数据再进行操作！')
        this.$refs.cashApplication.cashApplicationVisible = false;
      }
    },

    exportExcel() {
      this.$confirm('确认要导出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = sessionStorage.getItem('id_token');
        this.form.Authorization = `Bearer ${token}`;
        let params = Qs.stringify(this.form);
        exportCashContainer(params)
      });
    },




    handleSelectionChange(val) {
      this.selectData = val;
    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

  created() {
    this.init()
  },
}

</script>
<style scoped lang="css">




  .long-label label {
    padding-left: 0 !important;
    padding-right: 12px !important;
  }

  .toolbarTips div {
    display: inline-block;
    margin-right: 18px;
  }
  .toolbarTips div span:last-child {
    color: red;
  }

  .query-modal-sm .query-params .el-form-item {
    width: 240px;
    margin-right: 0px;
  }
  .query-modal{
    display:flex;
  }
  .query-modal .query-params {
    flex: 1;
  }
  .query-modal .query-btns {
        display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
}
</style>


