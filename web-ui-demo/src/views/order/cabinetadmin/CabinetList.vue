<template>
  <section>
    <el-col style="text-align: right"><el-checkbox v-model="isChecked" @change="isSort">查看预警</el-checkbox></el-col>
    <ToolBarBox>
    <el-col class="tool-bar">
      <el-button-group>
        <el-button :disabled="this.$global.isDisabled(7) || selectData.length!=1" type="primary" size="small" @click="showUpdate">修改</el-button>
        <el-button :disabled="this.$global.isDisabled(7) || selectData.length < 2" type="primary" size="small" @click="batchUpdate">批量修改</el-button>
      </el-button-group>
      <el-button :disabled="this.$global.isDisabled(21)" type="primary" size="small" @click="exportCabinet">导出excel</el-button>
    </el-col>

    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model.trim="form.orderNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model.trim="form.bookSpaceNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="导入单号" :label-width="labelWidth" prop="importNo">
              <el-input v-model.trim="form.importNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model.trim="form.cabinetNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="客户名称" :label-width="labelWidth" prop="customerName">
              <el-input v-model.trim="form.customerName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="货物名称" :label-width="labelWidth" prop="goodsName">
              <el-input v-model.trim="form.goodsName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="集装箱状态" :label-width="labelWidth" prop="scheduleStatus">
              <el-select clearable filterable v-model.trim="form.scheduleStatus" placeholder="请选择箱子状态" class='control-width'>
                <el-option v-for="item in scheduleStatus" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运输类型" :label-width="labelWidth" prop="orderType">
              <el-select clearable v-model.trim="form.orderType" placeholder="请选择运输类型" class='control-width'>
                <el-option v-for="item in orderStatus.orderTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报价港口" :label-width="labelWidth" prop="harborId">
              <el-select clearable filterable v-model.trim="form.harborId" placeholder="请选择报价港口" class='control-width'>
                <el-option v-for="item in orderStatus.harborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
              <el-select clearable filterable v-model.trim="form.orgCode" placeholder="请选择子公司" class='control-width'>
                <el-option v-for="item in orderStatus.deptmentList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="船公司" :label-width="labelWidth" prop="shipCompanyId">
              <el-select ref="shipCompanyId"  clearable filterable default-first-option  v-model.trim="form.shipCompanyId"  class='control-width' v-if="lazySwitch">
                <el-option v-for="item in orderStatus.shipCompanyList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟单员" :label-width="labelWidth" prop="userName">
              <el-input v-model.trim="form.userName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="业务员" :label-width="labelWidth" prop="salesmanName">
              <el-input v-model.trim="form.salesmanName" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="船名航次" :label-width="labelWidth" prop="voyageName">
              <el-input v-model.trim="form.voyageName" class='control-width'></el-input>
            </el-form-item>

            <el-form-item class="combine-input" label="要求装送货日期" :label-width="labelWidth" prop="requireDateStart">
              <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="form.requireDateStart" @change="requireDateStartChange"></el-date-picker>
              -
            <!--</el-form-item>-->
            <!--<label style="padding-right:0;padding-top:11px;">-</label>-->
            <!--<el-form-item label="" :label-width="labelWidth" prop="requireDateEnd">-->
              <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="form.requireDateEnd" @change="requireDateEndChange"></el-date-picker>
            </el-form-item>

            <el-form-item class="combine-input" label="下单日期" :label-width="labelWidth" prop="createDateStart">
              <el-date-picker type="date" icon="" placeholder="选择开始日期" v-model.trim="form.createDateStart" @change="createDateStartChange"></el-date-picker>
              -
            <!--</el-form-item>-->
            <!--<label style="padding-right:0;padding-top:11px;">-</label>-->
            <!--<el-form-item label="" :label-width="labelWidth" prop="createDateEnd">-->
              <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="form.createDateEnd" @change="createDateEndChange"></el-date-picker>
            </el-form-item>

            <el-form-item class="combine-input" label="行程结束日期" :label-width="labelWidth" prop="endDateStart">
              <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="form.endDateStart" @change="endDateStartChange"></el-date-picker>
              -
            <!--</el-form-item>-->
            <!--<label style="padding-right:0;padding-top:11px;">-</label>-->
            <!--<el-form-item label="" :label-width="labelWidth" prop="endDateEnd">-->
              <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="form.endDateEnd" @change="endDateEndChange"></el-date-picker>
            </el-form-item>
            <el-form-item class="combine-input" label="实际到港日期" :label-width="labelWidth" prop="endDateStart">
              <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="form.shipDateStart" @change="shipDateStartChange"></el-date-picker>
              -
              <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="form.shipDateEnd" @change="shipDateEndChange"></el-date-picker>
            </el-form-item>
          </div>

          <div class="query-btns">
            <el-form-item>
              <el-button  type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button  @click="resetForm('form')">清空</el-button>
            </el-form-item>

          </div>
        </el-form>
      </form-box>
    </el-col>
    </ToolBarBox>
    <TableBox>
    <!--列表-->
    <el-col>
      <el-table border ref="table" :max-height="tableMaxHeight" highlight-current-row :data="cabinetList.data" stripe
      @selection-change="handleSelectionChange"
       @row-click="handleRowClick"
      >

        <el-table-column type="selection" v-model="selectData" fixed width="40">
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" min-width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="orderTypeText" label="运输类型" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="cabinetTypeText" label="箱型" min-width="80" sortable align="center">
        </el-table-column>
        <el-table-column prop="shipCompanyName" label="船公司" min-width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="bookSpaceNo" label="订舱单号" min-width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="cabinetNo" label="箱号" min-width="130" sortable align="center">
        </el-table-column>
        <el-table-column prop="scheduleStatusText" label="箱子状态" min-width="130" sortable align="center">

        </el-table-column>
        <el-table-column prop="harborName" label="报价港口" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" min-width="150" align="center">
        </el-table-column>

        <el-table-column  prop="storageDays" align="center" label="堆存天数"  min-width="80">
          <template scope="scope">
            <el-row>
              <span v-if="scope.row.storageDays>=scope.row.freeStorageDays" style="color:red;">{{scope.row.storageDays}}</span>
              <span v-else>{{scope.row.storageDays}}</span>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column prop="shipDate" label="实际到港日期" min-width="150" align="center">
          <template scope="scope">
            <el-row>
              <span v-if="scope.row.storageDays>=scope.row.freeStorageDays" style="color:red;">{{scope.row.shipDate}}</span>
              <span v-else>{{scope.row.shipDate}}</span>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column prop="driverPlateNumber" label="司机/车牌" min-width="140" sortable align="center">
        </el-table-column>
        <el-table-column prop="logisticsMosaic" label="物流公司" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="dispatchTypeText" label="调度类型" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="childName" label="子公司" min-width="190" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="跟单员" min-width="130" align="center">
        </el-table-column>
        <el-table-column prop="salesmanName" label="业务员" min-width="150" align="center">
        </el-table-column>
        <el-table-column prop="address" label="装送货明细地址" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="receiveTime" label="接收时间" min-width="130" align="center">
        </el-table-column>
        <el-table-column prop="contactTime" label="联系客户时间" min-width="150" sortable align="center">
       </el-table-column>
       <el-table-column prop="requireDate" label="要求装送货时间" min-width="150" sortable align="center">
        </el-table-column>
        <el-table-column prop="assignDate" label="派车时间" min-width="150" sortable align="center">
        </el-table-column>
        <el-table-column prop="actualTime" label="实际作业时间" min-width="150" sortable align="center">
        </el-table-column>
        <el-table-column prop="arrivalTime" label="到厂时间" min-width="150" sortable align="center">
        </el-table-column>
        <el-table-column prop="leavingTime" label="装/卸货完成时间" min-width="150" sortable align="center">
        </el-table-column>

        <el-table-column prop="completeTime" label="还柜时间" min-width="150" sortable align="center">
        </el-table-column>
        <el-table-column prop="urgencyText" label="紧急性状态" min-width="120"  align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="120"  align="center" >
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
    </TableBox>
    <PaginationBox>
    <el-col>
      <span style="padding-top: 6px;display: inline-block;" >集装箱统计：
      <span v-for="item in CabinetStatistics" class="cab-total">{{item}}</span>

      </span>
      <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
    </PaginationBox>
    <UpdateCabinet ref="updateCabinet" ></UpdateCabinet>
    <BatchUpadteCabinet ref="batchUpadteCabinet" ></BatchUpadteCabinet>
  </section>
</template>
<style>
  .cab-total{
    padding: 5px 10px;
    display: inline-block;
    background-color: #0283e6;
    color: white;
    margin-left: 5px;
    font-size: 12px;
  }
</style>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';
  import download from '../../../common/mixins/download';
  import UpdateCabinet from './UpadteCabinet.vue'
  import BatchUpadteCabinet from './BatchUpadteCabinet.vue'
  import {exportCabinetApi} from '../../../api/modules/order'
  import Qs from 'qs';
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    mixins: [pagination,download],
    components: {
      ElCol,
      UpdateCabinet,BatchUpadteCabinet},
    data() {
      return {
        classButton:{},
        labelWidth: '85px',
        newFormVisible: false,
        editLoading: false,
        editFormVisible: false,
        selectData: [],
        orderStatusSelect:[],
        CabinetStatistics:[],
        rowData: {},
        isChecked:'',//预警复选框（是否勾选）
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
          endDateStart:'',//行程起始日期
          endDateEnd:'',//行程结束日期
          requireDateStart: '', // 要求装送货开始日期
          requireDateEnd: '', // 要求装送货结束日期
          createDateStart: '', // 下单开始日期
          createDateEnd: '', // 下单结束日期
          customerName: '', // 客户
          goodsName: '', // 货物名称
          orderStatus:'', // 订单状态
          orderType: '', // 订单类型
          harborId: '', // 港口
          orgCode: '', // 子公司编码
          shipCompanyList:'',//船公司
          cabinetNo: '', // 箱号
          userName:'',//跟单员
          salesmanName:'',//业务员
          Authorization:'',//token
          scheduleStatus:'',//集装箱状态
          shipCompanyId:'',//船公司id
          endHarborId:this.$route.params.endHarborId,//目的港id
          voyageName:this.$route.params.voyageName,//船名航次
          shipDateStart:'',//实际到港起始日期
          shipDateEnd:'',//实际到港截止日期
          isShipDateSort:''//预警是否排序
        },
        scheduleStatus: [
          {text: '未指派', value: 0},
          {text: '已指派', value: 1},
          {text: '执行中', value: 2},
          {text: '挂起', value: 3},
          {text: '完成', value: 4},
          {text: '未确定', value: 5}

        ],
      };
    },
    computed: {
      ...mapGetters([
        'cabinetList','orderStatus'
      ]),
    },
    methods: {
      ...mapActions([
        'getCabinetList', 'getOrderStatus','getCabinetTypeNumberList'
      ]),
      init() {
        this.getList()
        this.$store.dispatch('getOrderStatus').then(res=>{
          this.removeCancelStatus(res.data.orderStatusList)
        });
        this.$global.recorderTableData(this);
      },
      // 获取下单开始日期
      createDateStartChange(val) {
        this.form.createDateStart = val;
      },
      // 获取下单结束日期
      createDateEndChange(val) {
        this.form.createDateEnd = val;
      },
      //去除订单取消状态
      removeCancelStatus(orderStatusList){
          if(orderStatusList){
              Object.assign( this.orderStatusSelect,orderStatusList);
//            this.orderStatusSelect = orderStatusList;
           // this.orderStatusSelect.pop(); //去掉最后一位
          }
      },
      // 获取要求装送货开始日期
      requireDateStartChange(val) {
        this.form.requireDateStart = val;
      },
      //获取到港起始日期
      shipDateStartChange(val){
          this.form.shipDateStart = val;
      },
      shipDateEndChange(val){
        this.form.shipDateEnd = val;
      },
      // 获取行程开始日期
      endDateStartChange(val) {
        this.form.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form.endDateEnd = val;
      },
      //修改集装箱信息
      showUpdate(){
          if(this.selectData.length==1){
              this.$refs.updateCabinet.updateCabinetVisible = true;
              this.$refs.updateCabinet.detail = this.selectData[0];
          } else {
              this.$confirm('请选择一条数据进行修改')
          }
      },
      //批量修改
      batchUpdate(){
          this.$refs.batchUpadteCabinet.BatchUpdateCabinetVisible = true;
          this.$refs.batchUpadteCabinet.selectUpdate = this.selectData;
      },
      exportCabinet(){
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
            handle: exportCabinetApi,
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
      getList() {
        this.pageHandler(this.form, this.getCabinetList);
        this.getCabinetTypeNumberList(this.form).then((res)=>{
          this.CabinetStatistics = res.data.split(',');
        })
      },
      //查看预警
      isSort(){
        if(this.isChecked){
          this.form.isShipDateSort = 1;
        } else {
          this.form.isShipDateSort = null;
        }
        this.getList();
      },
      // 查询
      onSubmit() {
        this.getList();
      },
      resetForm(formName) {
        for(var o in this.form){
          this.form[o] = '';
        }
      },
    },
    created() {
      console.log("CabinetList.vue created");
//      this.init();
    },
    mounted() {
      this.$nextTick(function () {
        this.init();
      });
    },
    watch:{
       '$route' (to, from) {
        if(from.path =="/dispatch/voyage"){
           let voyageName = this.$route.params.voyageName;
           let endHarborId = this.$route.params.endHarborId;
           this.form.endHarborId = endHarborId;
           this.form.voyageName = voyageName;
           this.getList(true);
        }
      }
     },
    beforeDestroy(){
      console.log("CabinetList.vue beforeDestroy");
      this.$refs.updateCabinet.$destroy();
      this.$refs.batchUpadteCabinet.$destroy();
    }
  };

</script>

<style>
  @import '../../../styles/custom-theme/query-modal-lg.css';

</style>
