<template>
  <!--客户利润-->
  <section>

    <el-col>
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">

            <el-form-item label="客户名称" :label-width="labelWidth" prop="customerName">
              <el-input v-model="form.customerName" class='control-width'></el-input>
            </el-form-item>



            <div style="display: inline-block; vertical-align: top;">
              <el-form-item label="结算日期" :label-width="labelWidth" prop="settlementDateStart" style="margin-right:2px;margin-left: 27px;">
                <el-date-picker size="middle" type="date" placeholder="选择日期" v-model="form.settlementDateStart" style="width:120px"
                                @change="settlementDateStartChange"></el-date-picker>
              </el-form-item>
              <label style="padding-right:0;padding-top:11px;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="endDateEnd">
                <el-date-picker type="date" size="middle" placeholder="选择日期" v-model="form.settlementDateEnd" style="width:120px"
                                @change="settlementDateEndChange"></el-date-picker>
              </el-form-item>
            </div>

            <br/>

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

            <div style="display: inline-block; vertical-align: top;">
	            <el-form-item label="行程结束日期" :label-width="labelWidth" prop="endDateStart" style="margin-right:2px;margin-left: 27px;">
	              <el-date-picker size="middle" type="date" placeholder="选择日期" v-model="form.endDateStart" style="width:120px"
	                              @change="endDateStartChange"></el-date-picker>
	            </el-form-item>
	            <label style="padding-right:0;padding-top:11px;">-</label>
	            <el-form-item label="" :label-width="labelWidth" prop="endDateEnd">
	              <el-date-picker type="date" size="middle" placeholder="选择日期" v-model="form.endDateEnd" style="width:120px"
	                              @change="endDateEndChange"></el-date-picker>
	            </el-form-item>
          	</div>
          </div>

          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
              <el-button type="success" @click="resetForm()" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>

    <!--功能按钮-->
    <el-col :span="24" class="toolbar">
      <el-button :disabled="this.$global.isDisabled(21)" type="primary" size="small" @click="exportCustomer">导出excel
      </el-button>
      <div style="float:right;margin-top:8px;margin-right:10px">
        总应收(元)：<span style="color:red">{{incomeAmount}}</span>
        总应付(元)：<span style="color:red">{{payAmount}}</span>
        总利润(元)：<span style="color:red">{{profitAmount}}</span>
      </div>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" highlight-current-row :data="customerProfitList.data" stripe
                @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" v-model="selectData" fixed width="40">
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" min-width="150" align="center">
        </el-table-column>
        <el-table-column prop="salesmanName" label="业务员" min-width="150" align="center">
        </el-table-column>
        <el-table-column prop="cabinetType20" label="20TU（箱量）" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="cabinetType40" label="40TU（箱量）" min-width="100" align="center">
        </el-table-column>
        <el-table-column label="应收" align="center">
          <el-table-column
            prop="incomeFreight"
            label="运费小计"
            width="120">
            <template scope="scope">
              <el-row>{{getFreight(scope.row.costDtoList, 1)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="incomeIncidental"
            label="杂费"
            width="120">
            <template scope="scope">
              <el-row>{{getIncidental(scope.row.costDtoList, 1)}}</el-row>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="应付" align="center">
          <el-table-column
            prop="payFreight"
            label="运费"
            width="120">
            <template scope="scope">
              <el-row>{{getPayAmount(scope.row.costDtoList, 26)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="payFreight"
            label="超时费"
            width="120">
            <template scope="scope">
              <el-row>{{getPayAmount(scope.row.costDtoList, 2)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="payFreight"
            label="压夜费"
            width="120">
            <template scope="scope">
              <el-row>{{getPayAmount(scope.row.costDtoList, 3)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="payFreight"
            label="改送费"
            width="120">
            <template scope="scope">
              <el-row>{{getPayAmount(scope.row.costDtoList, 8)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="payFreight"
            label="多门点服务费"
            width="120">
            <template scope="scope">
              <el-row>{{getPayAmount(scope.row.costDtoList, 9)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="payFreight"
            label="调整运费"
            width="120">
            <template scope="scope">
              <el-row>{{getPayAmount(scope.row.costDtoList, 10)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="payIncidental"
            label="杂费"
            width="120">
            <template scope="scope">
              <el-row>{{getIncidental(scope.row.costDtoList, 0)}}</el-row>
            </template>
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
  import {getCustomerProfitExcelApi,getUserDropdownListApi} from '../../api/modules/settlement'
  import Qs from 'qs';
  import download from '../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    data() {
      return {
        classButton: {},
        userSelect:[],
        labelWidth: '100px',
        newFormVisible: false,
        editLoading: false,
        editFormVisible: false,
        selectData: [],
        incomeAmount:"0.0",
        payAmount:"0.0",
        profitAmount:"0.0",
        rowData: {},
        statusToBtn: {
          edit: false,
          cancel: false,
          audit: false,
          cost: false,
        },
        form: {
          salesmanId:'',//业务员id
          endDateStart: '',//行程起始日期
          endDateEnd: '',//行程结束日期
          customerName: '', // 客户
          Authorization:'',//token
          settlementDateStart:'',//结算开始日期
          settlementDateEnd:''//结算结束日期
        },
      };
    },
    computed: {
      ...mapGetters([
        'customerProfitList', 'orderStatus',"customerProfitAmount"
      ]),
    },
    methods: {
      ...mapActions([
        'getCustomerProfitList', 'getOrderStatus',"getCustomerProfitAmount"
      ]),
      init() {
        this.$store.dispatch('getOrderStatus');
        this.$global.recorderTableData(this);
        this.getUserList();
        /* this.$global.recorderTableData(this);*/
      },
      // 获取下单开始日期
      createDateStartChange(val) {
        this.form.createDateStart = val;
      },
      //获取对应的杂费
      getPayAmount(list, code){
        if (list) {
          let item = list.filter((res) => {
            return res.costTypeCode == code;
          })
          if (item && item.length > 0) {
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
      // 获取要求装送货开始日期
      requireDateStartChange(val) {
        this.form.requireDateStart = val;
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
      //加载业务员列表数据
      getUserList(){
        getUserDropdownListApi().then((res)=>{
          this.userSelect = res.data.data
        })
      },
      exportCustomer(){
        this.$confirm('确认要导出客户利润信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);

        this.download({
          params: params,
          handle: getCustomerProfitExcelApi,
          callback () {

          }
        });
        });
      },
      // 获取要求装送货结束日期
      requireDateEndChange(val) {
        this.form.requireDateEnd = val;
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
      // 获取列表
      getDataList(initpage) {
        this.incomeAmount = "0.00";
        this.payAmount = '0.00';
        this.profitAmount = '0.00';
        let success = success =>{
          if(this.customerProfitAmount.incomeAmount != null){
            this.incomeAmount = this.customerProfitAmount.incomeAmount;
          }
          if(this.customerProfitAmount.payAmount != null){
            this.payAmount = this.customerProfitAmount.payAmount;
          }
          if(this.customerProfitAmount.profit != null){
            this.profitAmount = this.customerProfitAmount.profit;
          }
        };
        //客户名称
        this.form.customerName= this.form.customerName ? this.form.customerName.trim() : '';
        this.pageHandler(this.form, this.getCustomerProfitList,initpage,success);
        this.getCustomerProfitAmount(this.form);
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
      // 查询
      onSubmit() {
        this.getDataList(true);
      },
      resetForm() {
        this.form = {
          salesmanId:'',//业务员id
          endDateStart: '',//行程起始日期
          endDateEnd: '',//行程结束日期
          customerName: '', // 客户
          Authorization: '',//token
          settlementDateStart:'',//结算开始日期
          settlementDateEnd:''//结算结束日期
        };
      },
/*      resetForm(formName) {
        this.$refs[formName].resetFields();
      },*/
    },
    created() {
      this.init();
    },
    mounted() {
    },
  };
</script>

<style>
  @import '../../styles/custom-theme/query-modal.css'
</style>
