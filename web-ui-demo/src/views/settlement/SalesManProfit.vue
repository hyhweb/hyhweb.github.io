<template>
  <section>
    <el-col style="padding:0px;">

    </el-col>
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form.orderNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="导入单号" :label-width="labelWidth" prop="importNo">
              <el-input v-model="form.importNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="客户名称" :label-width="labelWidth" prop="customerName">
              <el-input v-model="form.customerName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="货物名称" :label-width="labelWidth" prop="goodsName">
              <el-input v-model="form.goodsName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="调度操作人" :label-width="labelWidth" prop="dispatcherName">
              <el-input v-model="form.dispatcherName" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="结算单位" :label-width="labelWidth" prop="settlementCompanyId">
              <el-select clearable filterable v-model="form.settlementCompanyId" placeholder="请选择结算单位" class='control-width'>
                <el-option v-for="item in customerSelectList" :key="item.id" :label="item.value"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="运输类型" :label-width="labelWidth" prop="orderType">
              <el-select clearable v-model="form.orderType" placeholder="请选择运输类型" class='control-width'>
                <el-option v-for="item in orderStatus.orderTypeList" :key="item.value" :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报价港口" :label-width="labelWidth" prop="harborId">
              <el-select clearable filterable v-model="form.harborId" placeholder="请选择报价港口" class='control-width'>
                <el-option v-for="item in orderStatus.harborList" :key="item.value" :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
              <el-select clearable filterable v-model="form.orgCode" placeholder="请选择子公司" class='control-width'>
                <el-option v-for="item in orderStatus.deptmentList" :key="item.value" :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <div style="display: inline-block;">
              <el-form-item label="结算日期" :label-width="labelWidth" prop="settlementDateStart" style="margin-right:2px">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.settlementDateStart" style="width:120px" @change="settlementDateStartChange"></el-date-picker>
              </el-form-item>
              <label style="padding-right:0;padding-top:11px;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="settlementDateEnd">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.settlementDateEnd" style="width:120px" @change="settlementDateEndChange"></el-date-picker>
              </el-form-item>
              <el-form-item label="业务员" :label-width="labelWidth" prop="salesmanId">
                <el-select clearable filterable default-first-option v-model="form.salesmanId" placeholder="请选择">
                  <el-option v-for="item in userList.userDropDwonList"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>

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
              <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm()" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>
    <!--功能按钮-->
    <el-col :span="24" class="toolbar">
      <el-button :disabled="this.$global.isDisabled(21)" type="primary" size="small" @click="exporCabinet">导出excel
      </el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        总应收(元)：<span style="color:red">{{incomeAmount}}</span>
        总应付(元)：<span style="color:red">{{payAmount}}</span>
        总利润(元)：<span style="color:red">{{profitAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" highlight-current-row :data="salesManProfitList.data" stripe
                @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" v-model="selectData" fixed width="40">
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" min-width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="orderTypeText" label="运输类型" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="cabinetType" label="箱型" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="cabinetNo" label="箱号" min-width="130" sortable align="center">
        </el-table-column>
        <el-table-column prop="bookSpaceNo" label="订舱单号" min-width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="salesmanName" label="业务员" min-width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="harborName" label="报价港口" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" min-width="150" align="center">
        </el-table-column>
        <el-table-column prop="settlementCusName" label="结算单位" min-width="150" align="center">
        </el-table-column>
        <el-table-column prop="childName" label="子公司" min-width="190" align="center">
        </el-table-column>
        <el-table-column prop="driverLicensePlate" label="司机/车牌" min-width="100" align="center">
          <template scope="scope">
            <el-row>{{mosaicDriver(scope.row)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column prop="logisticsName" label="物流公司名称" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="address" label="装送货地址" min-width="150" align="center">
        </el-table-column>
        <el-table-column prop="dispatchTypeText" label="调度类型" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="dispatcherName" label="调度操作人" min-width="150" sortable align="center">
        </el-table-column>
        <el-table-column prop="orderStatusStr" label="订单状态" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="endDate" label="完成日期" min-width="150" align="center">
        </el-table-column>

        <el-table-column label="应收" align="center">
          <el-table-column
            prop="receivableFreight"
            label="运费小计"
            width="120">
          </el-table-column>
          <el-table-column
            prop="receivableIncidentals"
            label="杂费"
            width="120">
          </el-table-column>
        </el-table-column>

        <el-table-column label="应付" align="center">
          <el-table-column
            prop="dealwithFreight"
            label="运费"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dealwithOvertime"
            label="超时费"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dealwithOvernight"
            label="压夜费"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dealwithUpdate"
            label="改送费"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dealwithCover"
            label="多门点服务费"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dealwithAdjustment"
            label="调整运费"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dealwithIncidentals"
            label="杂费"
            width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="profit"
          label="利润"
          width="120">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="180" align="center">
          <template scope="scope">
            <el-popover
              placement="left-end"
              trigger="hover"
              ref="popover"
              width="200"
            >
              <div>{{scope.row.remark}}</div>
            </el-popover>
            <span class="remark" v-popover:popover>
                {{scope.row.remark}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col style="padding:10px 0;text-align:center;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                     @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount"
                     :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import util from '../../common/js/util';
  import pagination from '../../common/mixins/pagination';
  import {getSalesManProfitExcelApi,getCustomerSelectListApi} from '../../api/modules/settlement';
  import Qs from 'qs';
  import ElCol from "element-ui/packages/col/src/col";
  import download from '../../common/mixins/download';
  import {getUserDropdownList} from '../../api/modules/customer'
  export default {
    components: {ElCol},
    mixins: [pagination,download],
    data() {
      return {
        classButton: {},
        labelWidth: '100px',
        newFormVisible: false,
        editLoading: false,
        editFormVisible: false,
        selectData: [],
        rowData: {},
        incomeAmount:"0.00",
        payAmount:"0.00",
        profitAmount:"0.00",
        customerSelectList:[],
        userList:{},
        statusToBtn: {
          edit: false,
          cancel: false,
          audit: false,
          cost: false,
        },
        form: {
          orderNo: '',  // 订单号
          bookSpaceNo: '', // 订舱单号
          importNo: '', // 导入单号
          endDateStart: '',//行程起始日期
          endDateEnd: '',//行程结束日期
          requireDateStart: '', // 要求装送货开始日期
          requireDateEnd: '', // 要求装送货结束日期
          createDateStart: '', // 下单开始日期
          createDateEnd: '', // 下单结束日期
          customerName: '', // 客户
          goodsName: '', // 货物名称
          orderStatus: '', // 订单状态
          orderType: '', // 订单类型
          harborId: '', // 港口
          orgCode: '', // 子公司编码
          cabinetNo: '', // 箱号
          Authorization: '',//token
          settlementDateStart:'',//结算开始日期
          settlementDateEnd:'',//结算结束日期
          settlementCompanyId:'',//结算单位id
          dispatcherName:''//调度操作人

        },
      };
    },
    computed: {
      ...mapGetters([
        'salesManProfitList', 'orderStatus','salesManProfitAmount'
      ]),
    },
    methods: {
      ...mapActions([
        'getSalesManProfitList', 'getOrderStatus','getSalesManProfitAmount'
      ]),
      init() {
        this.$store.dispatch('getOrderStatus');
        this.$global.recorderTableData(this);
        this.getCustomerSelectList();
      },
      // 获取下单开始日期
      createDateStartChange(val) {
        this.form.createDateStart = val;
      },
      //获取用户下拉框数据
      getUserList(){
        getUserDropdownList().then((res)=>{
          this.userList = res.data.data;
        })
      },
      //获取对应的杂费
      getPayAmount(list, code){
        if (list) {
          let item = list.filter((res) => {
            return res.costTypeCode == code;
          })
          if (item && item.length > 0){
            if(item[0]['payAmount'] == null){
              return '0.00'
            }
            return item[0]['payAmount'].toFixed(2)
          }
        }
        return "0.00";
      },
      //统计运费+杂费
      getFreight(list, code){
        let freight = 0;
        if (list) {
          let item = list.filter((res) => {
            return res.costTypeCode == 26 || res.costTypeCode == 2 || res.costTypeCode == 3
              || res.costTypeCode == 8 || res.costTypeCode == 9 || res.costTypeCode == 10
          });
          if (item && item.length > 0) {
            item.forEach((res) => {
              if (code == 1) {
                freight += res.incomeAmount;
              } else {
                freight += res.payAmount;
              }
            });
            if (freight != null && freight != undefined) {
              return freight.toFixed(2)
            }
          }
        }
        return "0.00";
      },
      //统计杂费
      getIncidental(list, code){
        let incidental = 0;
        if (list) {
          let item = list.filter((res) => {
            if (res.costTypeCode != 26 && res.costTypeCode != 2 && res.costTypeCode != 3
              && res.costTypeCode != 8 && res.costTypeCode != 9 && res.costTypeCode != 10) {
              return res
            }
          });
          if (item && item.length > 0) {
            item.forEach((res) => {
              if (code == 1) {
                incidental += res.incomeAmount;
              } else {
                incidental += res.payAmount;
              }
            });
            if (incidental != null && incidental != undefined) {
              return incidental.toFixed(2)
            }

          }
        }
        return "0.00"
      },

      // 获取下单结束日期
      createDateEndChange(val) {
        this.form.createDateEnd = val;
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
      //拼接司机车牌
      mosaicDriver(row){
        var itemStr = '';
        if (row) {
          if (row.driverName != null) {
            itemStr = row.driverName + "/";
          }
          if (row.plateNumber != null) {
            itemStr += row.plateNumber;
          }
        }
        return itemStr;
      },
      exporCabinet(){
        this.$confirm('确认要导出集装箱信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          this.download({
            params: params,
            handle: getSalesManProfitExcelApi,
            callback () {

            }
          });
        });
      },
      // 获取列表选中的数据
      handleSelectionChange(val) {
        this.selectData = val;
        if (this.selectData.length == 0) {
          this.statusToBtn = {
            edit: false,
            cancel: false,
            audit: false,
            cost: false,
          };
          return;
        }
      },
      //获取下单客户下拉框列表
      getCustomerSelectList(){
        getCustomerSelectListApi().then((res)=>{
          let data = res.data;
          if(data.code === '1'){
            this.customerSelectList = data.data;
          }
        });


      },
      // 获取列表
      getDataList(initpage) {
        //订单编号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //导入单号
        this.form.importNo= this.form.importNo ? this.form.importNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        //客户名称
        this.form.customerName= this.form.customerName ? this.form.customerName.trim() : '';
        //货物名称
        this.form.goodsName= this.form.goodsName ? this.form.goodsName.trim() : '';

        this.pageHandler(this.form, this.getSalesManProfitList,initpage);
        //   debugger
      },
      // 查询
      onSubmit() {
        this.getDataList(true);
        this.getSalesManProfitAmount(this.form).then((res) =>{
          this.incomeAmount = res.data.incomeAmount;
          this.payAmount = res.data.payAmount;
          this.profitAmount = res.data.profit
        });
      },
      // pageSize 改变时会触发
      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataList();
      },
      // currentPage 改变时会触发
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getDataList();
      },
      resetForm() {
        this.form = {
          orderNo: '',  // 订单号
          bookSpaceNo: '', // 订舱单号
          importNo: '', // 导入单号
          endDateStart: '',//行程起始日期
          endDateEnd: '',//行程结束日期
          requireDateStart: '', // 要求装送货开始日期
          requireDateEnd: '', // 要求装送货结束日期
          createDateStart: '', // 下单开始日期
          createDateEnd: '', // 下单结束日期
          customerName: '', // 客户
          goodsName: '', // 货物名称
          orderStatus: '', // 订单状态
          orderType: '', // 订单类型
          harborId: '', // 港口
          orgCode: '', // 子公司编码
          cabinetNo: '', // 箱号
          settlementDateStart:'',//结算开始日期
          settlementDateEnd:'',//结算结束日期
          settlementCompanyId:''//结算客户id
        };
      },
      /* resetForm(formName) {
       this.$refs[formName].resetFields();
       },*/
    },
    created() {
      this.getUserList();
      this.init();
    },
    mounted() {

    },

  };

</script>
<style>
  @import '../../styles/custom-theme/query-modal.css'
</style>
