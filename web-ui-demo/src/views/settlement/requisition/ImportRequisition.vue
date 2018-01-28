<template>
  <el-dialog
    size="large"
    title="引入应付费用"
    v-model="importVisible">
    <form-box title="查询">
    <el-form class="query-modal-lg" inline ref="form" :model="form" label-width="100px">
      <div class="query-params">
      <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
        <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
        <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
        <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
      </el-form-item>
      <br>
      <el-form-item label="子公司" :label-width="labelWidth" prop="subCode">
        <el-select
          clearable
          filterable
          default-first-option
          @input="selectChild"
          v-model="form.subCode" placeholder="请选择子公司" class='control-width'>
          <el-option
            v-for="item in initChild.deptmentList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物流公司" :label-width="labelWidth" prop="logisticsCode">
        <el-select
          clearable
          filterable
          default-first-option
          v-model="item" @change="handleChangeLogisticsCode" placeholder="请选择对象" class='control-width'>
          <el-option
            v-for="item in initLogistic.logisticsList"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="对象类型" prop="objType" v-show="false">
        <el-input v-model="form.objType" placeholder="请输入对象类型" class='control-width'></el-input>
      </el-form-item>
      <br>
      <el-form-item label="付款对象名称" prop="payObjName" v-show="false">
        <el-input v-model="form.payObjName" placeholder="请输入付款对象名称" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="付款对象Id" prop="payObjId" v-show="false">
        <el-input v-model="form.payObjId" placeholder="请输入付款对象Id" class='control-width'></el-input>
      </el-form-item>
        <el-form-item label="付款对象Id(备份用)" prop="payObjIdBak" v-show="false">
          <el-input v-model="form.payObjIdBak" placeholder="请输入付款对象Id" class='control-width'></el-input>
        </el-form-item>
      <el-form-item label="申请单编号" prop="requisitionId" v-show="false">
        <el-input v-model="form.requisitionId" :disabled="false" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="组织机构code" prop="orgCode" v-show="false">
        <el-input v-model="form.orgCode" :disabled="false" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="是否开票" :label-width="labelWidth" prop="invoice">
        <el-select
          clearable
          filterable
          default-first-option
          v-model="form.invoice" placeholder="请选择是否开票" class='control-width'>
          <el-option v-for="item in invoice"
                     :key="item.value"
                     :label="item.text"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="车牌" :label-width="labelWidth">
          <el-autocomplete
            class="inline-input input-width"
            v-model="driverName"
            :fetch-suggestions="queryPlateNumber"
            placeholder="请选择车牌"
            @select="handleSelectPlateNumber"
            :icon="PlateNumberIcon"
            :on-icon-click="handClosePlateNumber"
            :trigger-on-focus="true"></el-autocomplete>
        </el-form-item>
        <el-form-item label="行程结束日期" :label-width="labelWidth" prop="endDateStart" style="margin-right:2px">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateStart" style="width:150px" @change="endDateStartChange"></el-date-picker>
        </el-form-item>
        <label style="padding-right:0;padding-top:11px;">-</label>
        <el-form-item label="" :label-width="labelWidth" prop="endDateEnd">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateEnd" style="width:150px" @change="endDateEndChange"></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="费用类型" prop="costType" :label-width="labelWidth">
          <el-select
            clearable
            filterable
            multiple
            default-first-option
            @change="changeCostType"
            v-model="form.costTypeList" placeholder="请选择费用类型" class='control-width'>
            <el-option
              v-for="item in initCostType.costTypes"
              :key="item.value"
              :label="item.text"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="只包含已选车牌" prop="openCode" :label-width="labelWidth" v-if="form.showFlgA">
        <el-checkbox @change="openOtherObejct" v-model="form.openFlg" class='control-width'></el-checkbox>
      </el-form-item>
      <el-form-item style="float:rigth">
        <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
      </el-form-item>
      <el-form-item style="float:rigth">
        <el-button type="success" icon="setting" @click="resetForm()">清空</el-button>
      </el-form-item>
      </div>
    </el-form>
    </form-box>
    <div style="float:left;margin-top:8px;margin-right:10px">
      选中：<span style="color:red">{{selectCount}}</span>条&nbsp;&nbsp;&nbsp;&nbsp;
      费用金额：<span style="color:red">{{selectSmountSum}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;
      实际应付金额：<span style="color:red">{{selectRealAmountSum}}</span>元
    </div>
    <el-table
      ref="table" @row-click="handleRowClick" :data="importPageList.data" @selection-change="handleSelectionChange" stripe>
      <el-table-column type="selection" fixed width="50"></el-table-column>
      <el-table-column prop="orgName" label="子公司" width="100"></el-table-column>
      <el-table-column prop="carteamName" label="物流公司" width="100"></el-table-column>
      <el-table-column prop="payObject" label="应付对象" width="100"></el-table-column>
      <el-table-column prop="customerName" label="结算单位" width="100"></el-table-column>
      <el-table-column prop="invoiceText" label="是否开票客户" width="120"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="bookSpaceNo" label="订舱单号" width="150"></el-table-column>
      <el-table-column prop="cabinetNo" label="箱号" width="120"></el-table-column>
      <el-table-column prop="settlementDate" label="结算日期"  width="100"></el-table-column>
      <el-table-column prop="endDate" label="结束日期" width="100"></el-table-column>
      <el-table-column prop="costTypeName" label="费用类型" width="100"></el-table-column>
      <el-table-column prop="amount" label="费用金额(元)" width="100"></el-table-column>
      <el-table-column prop="rate" label="费率" width="100"></el-table-column>
      <el-table-column prop="realAmount" label="实付金额(元)" width="100" fixed="right"></el-table-column>
    </el-table>

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
    <el-form inline class="textAlign" ref="form" :model="form" label-width="100px">
      <el-form-item>
        <el-button type="primary" icon="circle-check" @click="saveImport" :disabled="this.$global.isDisabled(27)">引入</el-button>
        <el-button icon="circle-close" @click="closeDialog()">取消</el-button>
      </el-form-item>
    </el-form>
    <br>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {saveImportApi,getDriverReportListInitApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi,getCostTypeApi,getRequisitionExcelApi} from '../../../api/modules/settlement'
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  import Qs from 'qs';
  import download from '../../../common/mixins/download';
  export default {
    mixins: [pagination,download],
    components: {
      ElFormItem,
      ElForm},
    data() {
      return {
        labelWidth: '130px',
        importVisible: false,
        selectData: [],
        selectCount:0,
        selectSmountSum:0,
        selectRealAmountSum:0,
        initChild:{},
        initLogistic:{},
        initCostType:'',
        item: null,
        driverName:'',
        PlateNumberIcon:'',
        closeIcon: 'circle-close',
        initData:{},
        form: {
          orderNo: '',
          bookSpaceNo: '',
          cabinetNo: '',
          subCode: '',
          logisticsCode: '',
          logisticsCodeBak:'',
          logisticsNameBak:'',
          objType: '',
          isInvoice: '',
          invoice:'',
          payObjName: '',
          requisitionId: '',//申请单编号
          orgCode: '',//组织机构
          payObjectType:1,//应付对象类型,默认为司机1
          openFlg:true,
          showFlgA:false,
          costTypeList:[],
          costType:{},
          settlementDateFrom:'',
          settlementDateTo:'',
          carteamOrgCode:'',//不保底物流公司Code
          endDateStart:'',
          endDateEnd:'',
          plateNumber:'',
        },
        //订单模式
        isInvoice: [
          {text: '自营', value: 1},
          {text: '他营', value: 2},
        ],
        //是否开票
        invoice: [
          {text: '开票', value: 1},
          {text: '不开票', value: 0},
        ],
        saveImportForm: {
          payObjectType: '',//应付对象类型
          requisitionId: '',//申请单编号(单条)
          cabCostIds:[],//集装箱费用(多条)
          importDtoList: []//引入对象集合(多条)
        },
        detail: {},
        isUploadExcel: false,
        uploadForm: {
          orderNo: '',
          bookSpaceNo: '',
          cabinetNo: '',
          subCode: '',
          logisticsCode: '',
          logisticsCodeBak:'',
          logisticsNameBak:'',
          objType: '',
          isInvoice: '',
          invoice:'',
          payObjName: '',
          requisitionId: '',//申请单编号
          orgCode: '',//组织机构
          payObjectType:1,//应付对象类型,默认为司机1
          openFlg:true,
          showFlgA:false,
          costTypeList:[],
          costType:{},
          settlementDateFrom:'',
          settlementDateTo:'',
          carteamOrgCode:'',//不保底物流公司Code
          endDateStart:'',
          endDateEnd:'',
          plateNumber:'',
          fileList: [],
          Authorization: 'Bearer ' + sessionStorage.getItem('id_token')
        },
      }
    },
    computed: {
      ...mapGetters([
        'importPageList'
      ])
    },
    methods: {
      ...mapActions([
        'getImportPageList'
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
      },
      getList(){
        if(this.form.payObjectType==1){
          this.form.showFlgA=true;
          if(this.form.openFlg){
            if(null==this.form.payObjIdBak || ''==this.form.payObjIdBak){
              this.form.payObjId="null";
            }else{
              //选中的场合：查询该应付类型的当前的应付对象的费用
              this.form.payObjId=this.form.payObjIdBak;
            }
          }else{
            //未选中的场合：查询当前应付类型所有对象的费用
            this.form.payObjId='';
          }
        }else if(this.form.payObjectType==7 || this.form.payObjectType==8){
          this.form.orgCode = this.form.payObjIdBak;
          this.form.showFlgA=false;
        }else if(this.form.payObjectType==9){
          this.form.orgCode = this.form.orgCode;
          this.form.carteamOrgCode = this.form.carteamOrgCode;
          this.form.showFlgA=false;
        }else{
          this.form.showFlgA=false;
        }

        if(null!=this.form.logisticsCodeBak && this.form.logisticsCodeBak!=''){
          if(this.form.logisticsCode!='' && this.form.logisticsCode!=this.form.logisticsCodeBak){
            this.$confirm('只能引入物流公司：【'+this.form.logisticsNameBak+'】的费用！');
            return;
          }
        }
        //订单编号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getImportPageList)
      },
      onSubmit() {
        this.getList();
      },
      openOtherObejct(){
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
      //获取费用类型下拉框
      getCostType(){
        getCostTypeApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initCostType = data.data;
          }
        });
      },
      //子公司下拉框联动(获取物流公司下拉框)
      selectChild(val){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val}
          getLogisticListApi(param).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              this.initLogistic = data.data;
              this.form.logisticsCode=''
            }
          })
        }
      },
      //选择对象
      handleChangeLogisticsCode(item){
        this.form.logisticsCode = item.value;
      },
      closeDialog(){
        this.resetForm();
        this.importVisible = false;
      },
      //引入应付款_选中复选框
      handleSelectionChange(val){
        this.selectData = val;
        let amount1 = 0;
        let amount2 = 0;
        if(this.selectData.length>0){
          for (var i = 0; i < this.selectData.length; i++) {
            amount1 += this.selectData[i].amount;
            amount2 += this.selectData[i].realAmount;
          }
        }
        this.selectCount = this.selectData.length;
        this.selectSmountSum = Math.floor(amount1 * 100)/100;
        this.selectRealAmountSum = Math.floor(amount2 * 100)/100;
      },
      //引入应付款_清空
      resetForm() {
        this.form.orderNo = '';//订单号
        this.form.bookSpaceNo = '';//订舱单号
        this.form.cabinetNo = '';//箱号
        this.form.subCode = '';//子公司
        this.form.logisticsCode = '';//对象
        this.form.isInvoice = '';//订单模式
        this.initLogistic={};
        this.item='';
        this.form.openFlg=true;
        //this.initCostType={};
        this.form.costTypeList=[];
        this.form.endDateStart='';
        this.form.endDateEnd='';
        this.form.plateNumber='';
        this.driverName='';
        this.form.settlementDateFrom='';
        this.form.settlementDateTo='';
        this.form.invoice='';
      },
      //订单完成时间(From)
      settlementDateFromChange(val){
        this.form.settlementDateFrom = val;
      },
      //申请结束时间
      settlementDateToChange(val){
        this.form.settlementDateTo = val;
      },
      //费用类型下拉框
      changeCostType(val){
      },
      //查询车牌
      queryPlateNumber(queryString, cb){
        let data = this.initData.plateNumbers;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        cb(results);
      },
      createFilter(queryString) {
        return (item) => {
          return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
        };
      },
      handleSelectPlateNumber(item){
        this.form.plateNumber=item.code;
      },
      handClosePlateNumber(){
        this.driverName='';
      },
      //获取司机报表下拉列表
      getDriverReportListInit(){
        getDriverReportListInitApi().then((res) =>{
          let data = res.data;
          if(data.code==1){
            this.initData=data.data;
          }
        });
      },
      //引入应付款_引入
      saveImport() {
        if (this.selectData.length > 0) {
          this.saveImportForm.importDtoList = []

          //应付对象类型
          this.saveImportForm.payObjectType = this.form.payObjectType;
          //申请单编号
          this.saveImportForm.requisitionId = this.form.requisitionId;
          //集装箱费用Id
          var cabCostIds = this.selectData.map(item => item.cabCostId);
          this.saveImportForm.cabCostIds = cabCostIds;

          //引入对象集合
          for (var i = 0; i < this.selectData.length; i++) {
            this.saveImportForm.importDtoList.push(this.selectData[i])
          }
          saveImportApi({data: JSON.stringify(this.saveImportForm)}).then((res) => {
            if (res.data) {
              this.getList()
              this.$parent.getList()
              this.$parent.showDetail(this.form.requisitionId)
              this.$message({
                message: '引入成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '引入失败',
                type: 'error'
              })
            }
          });
        } else {
          this.$confirm('请选择要引入的记录');
        }
      },
    },
    watch: {
      detail(val){
      },
      driverName: function () {
        if(!this.driverName){
          this.form.plateNumber=null;
          this.PlateNumberIcon='';
        }else {
          this.PlateNumberIcon=this.closeIcon;
        }
      },
    },
    mounted(){
      //获取司机报表下拉列表初始化数据
      this.getDriverReportListInit();
    },
    created(){
    },
  }
</script>
<style>
  @import '../../../styles/custom-theme/query-modal-lg.css'
  .cabinetUploadExcel {
    width: 150px;
    position: relative;
  }

  .el-upload-block {
    position: absolute;
    top: 50;
    left: 0;
    right: 0;
    bottom: 0;
  }

  :global(.el-upload) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
