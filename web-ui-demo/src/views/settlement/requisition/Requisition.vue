<template>
  <section>
    <!-- 应付申请管理_查询条件-->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form1" ref="form1" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="申请编号" :label-width="labelWidth" prop="reqNo">
              <el-input v-model="form1.reqNo" placeholder="请输入单据编号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="申请人" :label-width="labelWidth" prop="reqName">
              <el-input v-model="form1.reqName" placeholder="请输入申请人名称" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="付款类型" :label-width="labelWidth" prop="payObjType">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.payObjType" placeholder="请选择对象类型" class='control-width'>
                <el-option v-for="item in payObjType"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="申请状态" :label-width="labelWidth" prop="reqStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.reqStatus" placeholder="请选择申请状态" class='control-width'>
                <el-option v-for="item in reqStatus"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请公司" :label-width="labelWidth">
              <el-autocomplete
                class="inline-input input-width"
                v-model="requestCompanyName"
                :fetch-suggestions="queryRequestCompany"
                placeholder="请选择申请公司"
                @select="handleSelectRequestCompany"
                :icon="requestCompanyIcon"
                :on-icon-click="handCloseRequestCompany"
                :trigger-on-focus="true"></el-autocomplete>
            </el-form-item>
            <el-form-item label="付款对象" :label-width="labelWidth">
              <el-autocomplete
                class="inline-input input-width"
                v-model="payObjectName"
                :fetch-suggestions="queryPayObject"
                placeholder="请选择付款对象"
                @select="handleSelectPayObject"
                :icon="payObjectIcon"
                :on-icon-click="handClosePayObject"
                :trigger-on-focus="true"></el-autocomplete>
            </el-form-item>
            <br>
            <el-form-item label="申请时间" :label-width="labelWidth" prop="reqSTime" style="margin-right:2px">
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form1.reqSTime" @change="reqSTimeChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
            <label style="padding-right:0;padding-top:11px;">-</label>
            <el-form-item label="" :label-width="labelWidth" prop="reqETime">
              <el-date-picker type="date" placeholder="选择日期" v-model="form1.reqETime" @change="reqETimeChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
            <!--<div style="display: inline-block;">
              <el-form-item label="行程结束日期" :label-width="labelWidth" prop="endDateStart" style="margin-right:2px">
                <el-date-picker type="date" placeholder="选择日期" v-model="form1.endDateStart" style="width:120px" @change="endDateStartChange"></el-date-picker>
              </el-form-item>
              <label style="padding-right:0;padding-top:11px;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="endDateEnd">
                <el-date-picker type="date" placeholder="选择日期" v-model="form1.endDateEnd" style="width:120px" @change="endDateEndChange"></el-date-picker>
              </el-form-item>
            </div>-->
          </div>
          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" icon="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form1')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>
    <el-col :span="24"  class="toolbar" style="margin-bottom:0px;">
      <span style="font-family: Microsoft YaHei;font-size: 120%">应付申请管理</span>
      <div style="float:right;margin-top:8px;margin-right:10px">
        申请总金额：<span style="color:red">{{reqAmount}}</span>元&nbsp;&nbsp;
        未付总金额：<span style="color:red">{{payAmount}}</span>元&nbsp;&nbsp;
        折扣总金额：<span style="color:red">{{discountAmount}}</span>元&nbsp;&nbsp;
        实付总金额：<span style="color:red">{{paidAmount}}</span>元
      </div>
    </el-col>
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
    <el-button-group>
      <el-button type="primary" icon="plus" v-if="!this.$global.isDisabled(2)" @click="add" size="small" :disabled="!buttonStatus.add" v-show="buttonShow.add">新增申请单</el-button>
      <el-button type="primary" icon="edit" v-if="!this.$global.isDisabled(7)" @click="update" size="small" :disabled="!buttonStatus.update" v-show="buttonShow.update">修改申请单</el-button>
      <el-button type="primary" icon="delete" v-if="!this.$global.isDisabled(9)" @click="remove" size="small" :disabled="!buttonStatus.delete" v-show="buttonShow.delete">删除申请单</el-button>
      <el-button type="primary" icon="view" v-if="!this.$global.isDisabled(29)" @click="showDetail('')" size="small" :disabled="!buttonStatus.show" v-show="buttonShow.show">查看详情</el-button>
      <el-button type="primary" icon="arrow-right" v-if="!this.$global.isDisabled(27)" @click="importRequisition" size="small" :disabled="!buttonStatus.import" v-show="buttonShow.import">引入应付款</el-button>
      <el-button type="primary" icon="document"  @click="submission" size="small" :disabled="!buttonStatus.invoiceSubmit" v-show="buttonShow.invoiceSubmit">开票提交</el-button>
      <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(110)" @click="billing" size="small" :disabled="!buttonStatus.billing" v-show="buttonShow.billing">开票</el-button>
      <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(111)" @click="invoice_fun" size="small" :disabled="!buttonStatus.invoiceFun" v-show="buttonShow.invoiceFun">收票</el-button>
      <el-button type="primary" icon="circle-check" v-if="!this.$global.isDisabled(112)"  @click="financialAudit" size="small" :disabled="!buttonStatus.audit" v-show="buttonShow.audit">审核</el-button>
      <el-button type="primary" icon="circle-check" v-if="!this.$global.isDisabled(26)" @click="pay" size="small" :disabled="!buttonStatus.pay" v-show="buttonShow.pay">付款</el-button>
      <el-button type="primary" icon="circle-check" v-if="!this.$global.isDisabled(106)" @click="receivableList" size="small" :disabled="!buttonStatus.receivable" v-show="buttonShow.receivable">收款</el-button>
      <el-button type="primary" icon="document" v-if="!this.$global.isDisabled(21)" @click="exportExcel" size="small">导出excel</el-button>
    </el-button-group>

    </el-col>
    <!-- 付款申请单管理.查询结果-->
    <el-col>
      <el-table ref="table"  :maxHeight="tableMaxHeight" @row-click="handleRowClick" :data="requisitionList.data" @selection-change="handleSelectionChange1" stripe>
        <el-table-column type="selection" fixed width="50">
        </el-table-column>
        <el-table-column
          prop="requisitionId"
          label="申请单编号" width="100">
        </el-table-column>
        <el-table-column
          prop="subsidiary"
          label="申请公司" width="100">
        </el-table-column>
          <el-table-column
            prop="payObj"
            label="付款对象" width="100">
            <template scope="scope">
              <el-popover
                trigger="hover"
                ref="popover"
                width="200"
                placement="top">
                <p>{{scope.row.plateNumbers}}</p>
              </el-popover>
              <span v-popover:popover>
                {{scope.row.payObj}}
              </span>
            </template>
          </el-table-column>
        <el-table-column
          prop="logisticName"
          label="物流公司" width="100">
        </el-table-column>
        <el-table-column
          prop="payObjTypeText"
          label="付款类型" width="130">
        </el-table-column>
        <el-table-column
          prop="reqAmount"
          label="申请金额" width="90">
        </el-table-column>
        <el-table-column
          prop="unpaidAmount"
          label="未付金额" width="90">
        </el-table-column>
<!--        <el-table-column
          prop="payAmount"
          label="应付金额" width="90">
        </el-table-column>-->
        <el-table-column
          prop="discountAmount"
          label="折扣金额" width="90">
        </el-table-column>
        <el-table-column
          prop="paidAmount"
          label="实付金额" width="90">
        </el-table-column>
        <el-table-column
          prop="invoiceAmount"
          label="发票金额" width="90">
        </el-table-column>
        <el-table-column
          prop="billingAmount"
          label="开票金额" v-if="this.showFlgInvoice" width="90">
        </el-table-column>
        <el-table-column
          prop="unBillingAmount"
          label="不开票金额" v-if="this.showFlgInvoice" width="100">
        </el-table-column>
        <el-table-column
          prop="reqTime"
          label="申请时间" width="100">
        </el-table-column>
        <el-table-column
          prop="applicant"
          label="申请人" width="100">
        </el-table-column>
        <el-table-column
          prop="reqRemark"
          label="申请备注" width="100">
        </el-table-column>
        <el-table-column
          prop="auditRemark"
          label="审核备注" width="100">
        </el-table-column>
        <el-table-column
          prop="statusText"
          label="申请状态" fixed="right" width="100">
        </el-table-column>
        <el-table-column
          prop="payObjType"
          label="付款对象类型" v-if="false" width="100">
        </el-table-column>
        <el-table-column
          prop="flowStatus"
          label="流程状态" v-if="false" width="100">
        </el-table-column>
        <el-table-column
          prop="orgCode"
          label="申请公司Code" v-if="false" width="100">
        </el-table-column>
        <el-table-column
          prop="payObjId"
          label="付款对象Code" v-if="false" width="100">
        </el-table-column>
      </el-table>
      <!-- 付款申请单明细-->
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

    <!--  明细详情 -->
    <RequisitionDetail ref="requisitionDetail"></RequisitionDetail>

    <!--新增申请单-->
    <AddRequisition ref="addRequisition"></AddRequisition>
    <ModifyRequisition ref="modifyRequisition"></ModifyRequisition>
    <PayRequisition ref="payRequisition"></PayRequisition>
    <ImportRequisition ref="importRequisition"></ImportRequisition>
    <ReceivableList ref="receivableList"></ReceivableList>
    <InvoiceAdmin ref="invoiceAdmin"></InvoiceAdmin>
    <InvoiceList ref="invoiceList"></InvoiceList>
    <FinancialAudit ref="financialAudit"></FinancialAudit>
    <Submission ref="submission"></Submission>

  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import AddRequisition  from './AddRequisition.vue'
  import ModifyRequisition  from './ModifyRequisition.vue'
  import PayRequisition  from './PayRequisition.vue'
  import ImportRequisition  from './ImportRequisition.vue'
  import RequisitionDetail from './RequisitionDetail.vue'
  import ReceivableList from './ReceivableList.vue'
  import InvoiceAdmin from './InvoiceAdmin.vue'
  import InvoiceList from './InvoiceList.vue'
  import FinancialAudit from './FinancialAudit.vue'
  import Submission from './Submission.vue'
  import {getPayObjListApi,getUserLevelApi,getMinimumGuaranteeFlgApi} from '../../../api/modules/settlement';
  import {getRequisitionExcelApi,removeRequisitionApi,removeBeforeApi,getReqAmountApi,getCurrentUserInfoApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  import download from '../../../common/mixins/download';
  import {getRequisitionListInitApi} from '../../../api/modules/settlement';

  export default {
    mixins: [pagination,download],
    components: {
      AddRequisition,
      ModifyRequisition,
      PayRequisition,
      ImportRequisition,
      RequisitionDetail,
      ReceivableList,
      InvoiceAdmin,
      InvoiceList,
      FinancialAudit,
      Submission
    },
    data() {
      return {
        labelWidth: '90px',
        loading : false,
        selectData: [],
        selectData2: [],
        PayObjData: {},
        item: [],
        reqAmount:0,
        paidAmount:0,
        payAmount:0,
        discountAmount:0,
        currentOrgCode:'',
        initLevel:0,
        settleType:0,//公司类型(A/B类)
        minimumGuaranteeFlg:0,//(是否是保底子公司：0不保底，1保底)
        showFlgInvoice:false,
        initData:{},
        requestCompanyName:'',
        requestCompanyIcon:'',
        payObjectName:'',
        payObjectIcon:'',
        closeIcon: 'circle-close',
        outportButtonFlag:true,
        buttonStatus:{
          add:true,//新增申请单
          update:true,//修改
          delete:true,//删除
          show:true,//查看
          import:false,//引入
          billing:false,//开票
          invoiceFun:false,//收票
          audit:false,//审核
          pay:false,//付款
          receivable:false,//收款
          invoiceSubmit:false,//发票提交
        },
        buttonShow:{
          add:false,//新增申请单
          update:false,//修改
          delete:false,//删除
          show:false,//查看
          import:false,//引入
          billing:false,//开票
          invoiceFun:false,//收票
          audit:false,//审核
          pay:false,//付款
          receivable:false,//收款
          invoiceSubmit:false,//发票提交
        },
        form1: {
          payObjId: '',//付款对象Id
          payObj: '',//付款对象
          reqNo: '',  //单据编号
          reqName: '',  //申请人
          reqStatus: '',//单据状态
          payObjType:'',//对象类型
          payCom: '',//申请单公司
          orgCode:'',//申请公司
          payer: '',//付款人
          Authorization: '',//认证token
          reqSTime: '',//申请起始时间
          reqETime: '',//申请结束时间
          paySTime: '',//付款起始时间
          payETime: '',//付款结束时间
         /* endDateStart:'',
          endDateEnd:''*/
        },
        RequisitionFeesForm: {
          reqId: '',//申请单编号(单条)
          reqIds: '',//申请单编号(多条)
          cabCostIds: ''//集装箱费用Id(多条)
        },
        //付款对象
        payObj: [
          {text: '唐兵', value: 0},
          {text: '郭振峰', value: 1},
        ],
        //单据状态
        reqStatus: [
          {text: '申请中', value: 0},
          {text: '已开票', value: 3},
          {text: '已收票', value: 4},
          {text: '审核通过', value: 5},
          {text: '审核不通过', value: 6},
          {text: '部分付款', value: 8},
          {text: '部分收款', value: 9},
          {text: '全部付款', value: 1},
          {text: '全部收款', value: 7},
        ],
        //付款对象类型
        payObjType: [
          {text: '总->子(A类)', value: 7},
          {text: '总->子(B类)', value: 8},
          {text: '子->物', value: 9},
        ],
        affiliated: [
          {text: '广州', value: 0},
          {text: '东莞', value: 1},
        ]
      }
    },
    computed: {
      ...mapGetters([
        'requisitionList'
      ])
    },
    watch: {
      requestCompanyName: function () {
        if(!this.requestCompanyName){
          this.form.orgCode=null;
          this.requestCompanyIcon='';
        }else {
          this.requestCompanyIcon=this.closeIcon;
        }
      },
      payObjectName: function () {
        if(!this.payObjectName){
          this.form.payObjId=null;
          this.payObjectIcon='';
        }else {
          this.payObjectIcon=this.closeIcon;
        }
      },
    },
    methods: {
      ...mapActions([
        'getRequisitionList'
      ]),
     /* // 获取行程开始日期
      endDateStartChange(val) {
        this.form1.endDateStart = val;
      },
      // 获取行程结束日期
      endDateEndChange(val) {
        this.form1.endDateEnd = val;
      },*/
      handleChange(item){
        this.form1.payObjId = item.value;
        this.form1.payObj = item.text;
      },

      //画面初始化
      init(){
        this.getCurrentUserInfo();
//        this.getUserLever();//获取当前登录用户级别(1:总公司)
//        this.getMinimumGuaranteeFlg();//获取当前用户所属公司是否为保底公司(0:不保底,1:保底)
//        this.getSettleType();//获取当前用户类型(A/B)
        this.$global.recorderTableData(this, 'requisitionList');
      },
      //获取应付申请管理下拉列表
      getRequisitionListInit(){
        getRequisitionListInitApi().then((res) =>{
          let data = res.data;
          if(data.code==1){
            this.initData=data.data;
          }
        });
      },
      queryRequestCompany(queryString, cb){
        let data = this.initData.requestCompany;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        cb(results);
      },
      queryPayObject(queryString, cb){
        let data = this.initData.payObject;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        cb(results);
      },
      createFilter(queryString) {
        return (item) => {
          return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
        };
      },
      handleSelectRequestCompany(item){
        this.form1.orgCode=item.code;
      },
      handleSelectPayObject(item){
        this.form1.payObjId=item.code;
      },
      handCloseRequestCompany(){
        this.requestCompanyName='';
        this.form1.orgCode='';
      },
      handClosePayObject(){
        this.payObjectName='';
        this.form1.payObjId='';
      },
      //申请起始时间
      reqSTimeChange(val){
        this.form1.reqSTime = val
      },
      //申请结束时间
      reqETimeChange(val){
        this.form1.reqETime = val
      },
      //付款起始时间
      paySTimeChange(val){
        this.form1.paySTime = val
      },
      //付款结束时间
      payETimeChange(val){
        this.form1.payETime = val
      },
      //财务审核
      financialAudit(){
        if (this.selectData.length !== 1) {
          this.$confirm('请选择一条要审核的记录！');
          return;
        }
          this.$refs.financialAudit.auditVisible = true;
          let data = this.selectData[0];
          this.$refs.financialAudit.form.requisitionId = data.requisitionId;
          this.$refs.financialAudit.form.payRequisitionId = data.requisitionId;
          this.$refs.financialAudit.getList();

      },
      //付款申请单管理_初始化/查询
      getList(){
        //单据编号
        this.form1.reqNo= this.form1.reqNo ? this.form1.reqNo.trim() : '';
        //申请人
        this.form1.reqName= this.form1.reqName ? this.form1.reqName.trim() : '';
        //申请单公司
        this.form1.payCom= this.form1.payCom ? this.form1.payCom.trim() : '';
        //付款人
        this.form1.payer= this.form1.payer ? this.form1.payer.trim() : '';

        let success = success =>{
            this.getReqAmount(this.form1)
        };
        this.pageHandler(this.form1, this.getRequisitionList,null,success);
      },

      //付款申请单获取总金额
      getReqAmount(form1){
        getReqAmountApi({data:JSON.stringify(this.form1)}).then((res)=>{
                let data = res.data;
            if(data.code === '1' && data.success){
              this.reqAmount = data.data.reqAmount;
              this.paidAmount = data.data.paidAmount;
              this.payAmount = data.data.payAmount;
              this.discountAmount = data.data.discountAmount
            }
        })
      },
      // 开票提交
      submission(){
        if (this.selectData.length !== 1) {
          this.$confirm('请选择一条要审核的记录！');
          return;
        }
          let user = JSON.parse(sessionStorage.getItem('user'));
          let data = this.selectData[0];
          this.$refs.submission.SubmissionVisible = true;
          this.$refs.submission.showForm = data;
          this.$refs.submission.form.submitName = user.loginName;
          this.$refs.submission.form.submitId = user.id;
          this.$refs.submission.form.submitAmount = data.submitAmount;
          this.$refs.submission.form.submitRemark = data.submitRemark;
          this.$refs.submission.form.requisitionId = data.requisitionId;
          this.$refs.submission.form.submitTime = data.submitTime;
      },
      //获取当前用户信息
      getCurrentUserInfo(){
        getCurrentUserInfoApi().then((res)=>{
          let data = res.data;
          if(data.code === '1' && data.success){
            this.currentOrgCode = data.data.orgCode;
            this.initLevel = data.data.level;
            this.settleType = data.data.settleType;
            this.minimumGuaranteeFlg = data.data.minimumGuaranteeFlg;
            this.initButtonStatus();//初始化流程按钮
          }
        })
      },

      //付款对象下拉框
      getPayObjList(){
        var val = null;
        let param = {driverIds: val};
        getPayObjListApi(param).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.PayObjData = data.data;
          }
        });
      },
      //开票功能
      billing(){
        if (this.selectData.length !== 1) {
          this.$confirm('请选择一条要开票的记录！');
          return;
        }
          this.$refs.invoiceAdmin.invoiceVisible = true;
          Object.assign(this.$refs.invoiceAdmin.form, this.selectData[0]);
          let data = this.selectData[0];
          this.$refs.invoiceAdmin.form.payRequisitionId = data.requisitionId;
          this.$refs.invoiceAdmin.form.payObjCode = data.orgCode;
          this.$refs.invoiceAdmin.form.payObjName = data.subsidiary;
          this.$refs.invoiceAdmin.form.receiveObjId = data.payObjId;
          this.$refs.invoiceAdmin.form.receiveObjName = data.payObj;
          this.$refs.invoiceAdmin.reqAmount = data.reqAmount;

          if(data.status==2 || data.status==3  || data.status==4  || data.status==6 ||data.status==10){
            this.$refs.invoiceAdmin.form.showFlgA = true;
          }else{
            this.$refs.invoiceAdmin.form.showFlgA = false;
          }

          this.$refs.invoiceAdmin.getList();
      },
      //收票功能
      invoice_fun(){
        if (this.selectData.length !== 1) {
          this.$confirm('请选择一条要收票的记录！');
          return;
        }
         this.$refs.invoiceList.invoiceVisible = true;
         Object.assign(this.$refs.invoiceList.form, this.selectData[0]);
         let data = this.selectData[0];
         this.$refs.invoiceList.payRequisitionId = data.requisitionId;
         this.$refs.invoiceList.form.payObjCode = data.orgCode;
         this.$refs.invoiceList.form.payObjName = data.subsidiary;
         this.$refs.invoiceList.form.receiveObjId = data.payObjId;
         this.$refs.invoiceList.form.receiveObjName = data.payObj;
         this.$refs.invoiceList.getList();

      },
      //付款申请单管理_查询
      onSubmit() {
        this.getList();//应付申请单管理初始化
      },

      //付款申请单管理_新增申请单
      add() {
        this.$refs.addRequisition.initLevel=this.initLevel;//当前登录账号的级别
        this.$refs.addRequisition.init();
        this.$refs.addRequisition.addVisible = true;
      },
      initButtonStatus(){
          if(this.initLevel==1){//总公司登录
            //按钮权限控制
            this.buttonShow={
              add:true,//新增申请单
              update:true,//修改
              delete:true,//删除
              show:true,//查看
              import:true,//引入
              billing:true,//开票
              invoiceFun:true,//收票
              audit:true,//审核
              pay:true,//付款
              receivable:true,//收款
              invoiceSubmit:true,//发票提交
            };
          }else if(this.initLevel==2 && this.minimumGuaranteeFlg==1 && this.settleType=='A'){//A类保底子公司登录
            //按钮权限控制
            this.buttonShow={
              add:true,//新增申请单
              update:true,//修改
              delete:true,//删除
              show:true,//查看
              import:true,//引入
              billing:true,//开票
              invoiceFun:true,//收票
              audit:true,//审核
              pay:true,//付款
              receivable:false,//收款
              invoiceSubmit:false,//发票提交
            };
            this.showFlgInvoice=true;
          }else if(this.initLevel==2 && this.minimumGuaranteeFlg==0 && this.settleType=='A'){//A类不保底子公司登录
            //按钮权限控制
            this.buttonShow={
              add:false,//新增申请单
              update:false,//修改
              delete:false,//删除
              show:true,//查看
              import:false,//引入
              billing:true,//开票
              invoiceFun:false,//收票
              audit:false,//审核
              pay:false,//付款
              receivable:true,//收款
              invoiceSubmit:false,//发票提交
            };
            this.showFlgInvoice=true;
          }else if(this.initLevel==2 && this.settleType=='B'){//B类子公司登录
            //按钮权限控制
            this.buttonShow={
              add:false,//新增申请单
              update:false,//修改
              delete:false,//删除
              show:true,//查看
              import:false,//引入
              billing:true,//开票
              invoiceFun:false,//收票
              audit:false,//审核
              pay:false,//付款
              receivable:true,//收款
              invoiceSubmit:false,//发票提交
            };
          }else{
            //按钮权限控制
            this.buttonShow={
              add:false,//新增申请单
              update:false,//修改
              delete:false,//删除
              show:false,//查看
              import:false,//引入
              billing:false,//开票
              invoiceFun:false,//收票
              audit:false,//审核
              pay:false,//付款
              receivable:false,//收款
              invoiceSubmit:false,//发票提交
            };
          }
      },
      //获取用户级别
      getUserLever(){
        getUserLevelApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initLevel = data.data;
          }
        });
      },
      //获取用户是否是保底子公司
      getMinimumGuaranteeFlg(){
        getMinimumGuaranteeFlgApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.minimumGuaranteeFlg = data.data;
            this.initButtonStatus();//初始化流程按钮
          }
        });
      },
      //付款申请单管理_申请单修改
      update(){
        if (this.selectData.length == 1) {
          //修改权限：状态=申请中
          let status = this.selectData[0].status;
          if (status != 0) {
            this.$confirm('只能修改状态为【申请中】的记录！');
          } else {
            //将选中行的数据传递给修改界面
            Object.assign(this.$refs.modifyRequisition.form, this.selectData[0]);
            //付款对象类型
            var payObjectType = this.selectData[0].payObjectType;
            //申请金额
            var reqAmount = this.selectData[0].reqAmount;
            //付款对象Id_司机/车牌
            var payObjId = this.selectData[0].payObjId;
            //付款对象
            var payObj = this.selectData[0].payObj;
            var logisticName = this.selectData[0].logisticName;
            //付款对象类型:7 总公司--->子公司
            if(payObjectType==7){
                if(reqAmount>0){
                  this.$refs.modifyRequisition.form.disabledA1=true;//子公司(只读)
                }else{
                  this.$refs.modifyRequisition.form.disabledA1=false;//子公司(可改)
                }
                this.$refs.modifyRequisition.form.showFlgA1=true;//子公司(显示)
                this.$refs.modifyRequisition.form.showFlgA2=false;//物流公司(保底)
                this.$refs.modifyRequisition.form.showFlgB1=false;//物流公司(不保底)
                this.$refs.modifyRequisition.form.showFlgB2=false;//司机
                this.$refs.modifyRequisition.form.showFlgB3=false;//办单员
                this.$refs.modifyRequisition.form.showFlgB4=false;//码头
                this.$refs.modifyRequisition.form.showFlgB5=false;//船公司
                this.$refs.modifyRequisition.form.showFlgB6=false;//业务员
                this.$refs.modifyRequisition.form.childCompany = payObj;
            }else if(payObjectType==8){//付款对象类型:8 总公司-->保底物流公司
              if(reqAmount>0){
                this.$refs.modifyRequisition.form.disabledA2=true;//保底物流公司(只读)
              }else{
                this.$refs.modifyRequisition.form.disabledA2=false;//保底物流公司(可改)
              }
              this.$refs.modifyRequisition.form.showFlgA1=false;//子公司
              this.$refs.modifyRequisition.form.showFlgA2=true;//物流公司(保底)
              this.$refs.modifyRequisition.form.showFlgB1=false;//物流公司(不保底)
              this.$refs.modifyRequisition.form.showFlgB2=false;//司机
              this.$refs.modifyRequisition.form.showFlgB3=false;//办单员
              this.$refs.modifyRequisition.form.showFlgB4=false;//码头
              this.$refs.modifyRequisition.form.showFlgB5=false;//船公司
              this.$refs.modifyRequisition.form.showFlgB6=false;//业务员
              this.$refs.modifyRequisition.form.mGLogistics = payObj;
              if(payObjId != ''){
                this.$refs.modifyRequisition.form.logisticCode = logisticName;
                this.$refs.modifyRequisition.selectChild(payObjId,1);
              }

            }else if(payObjectType==9){//付款对象类型:9 子公司-->不保底物流公司
              if(reqAmount>0){
                this.$refs.modifyRequisition.form.disabledB1=true;//不保底物流公司(只读)
              }else{
                this.$refs.modifyRequisition.form.disabledB1=false;//不保底物流公司(可改)
              }
              this.$refs.modifyRequisition.form.showFlgA1=false;//子公司
              this.$refs.modifyRequisition.form.showFlgA2=false;//物流公司(保底)
              this.$refs.modifyRequisition.form.showFlgB1=true;//物流公司(不保底)
              this.$refs.modifyRequisition.form.showFlgB2=false;//司机
              this.$refs.modifyRequisition.form.showFlgB3=false;//办单员
              this.$refs.modifyRequisition.form.showFlgB4=false;//码头
              this.$refs.modifyRequisition.form.showFlgB5=false;//船公司
              this.$refs.modifyRequisition.form.showFlgB6=false;//业务员
              this.$refs.modifyRequisition.form.noMglogistics = payObj;
            }
            //申请时间
            this.$refs.modifyRequisition.form.reqTime = null;
            //申请状态
            this.$refs.modifyRequisition.form.status = null;
            //修改界面设置成可见
            this.$refs.modifyRequisition.modifyVisible = true;
          }
        } else {
          this.$confirm('请选择一条要修改的记录！');
        }
      },

      //付款申请单管理_申请单删除
      remove(){
        if (this.selectData.length > 0) {
          //验证：删除前，请移出移入过的数据(根据申请单编号到详细表中查看是否有关联的数据，如果有的话，调用8：移出应付款)
          var ids = this.selectData.map(item => item.requisitionId);
          this.RequisitionFeesForm.reqIds = ids;
          this.RequisitionFeesForm.reqId = '111';
          this.RequisitionFeesForm.cabCostIds = ids;
          var statuss = this.selectData.map(item => item.status);
          for(var x=0;x<statuss.length;x++){
            var temp = statuss[x];
            if(temp != 0){
              this.$confirm('只能删除状态为【申请中】的记录！');
              return;
            }
          }
          var reqAmounts = this.selectData.map(item => item.reqAmount);
          for(var x=0;x<reqAmounts.length;x++){
              var temp = reqAmounts[x];
              if(temp !=0){
                this.$confirm('删除前，请先移出引入过的费用！');
                return;
              }
          }
          this.$confirm('此操作将永久删除，是否继续?', '提示', {type: 'warning'})
            .then(() => {
              removeRequisitionApi({data: JSON.stringify(this.RequisitionFeesForm)}).then((res) => {
                let data = res.data;
                var delCount = 0;
                if (data.code == 1) {
                  delCount = data.data;
                }
                if (delCount > 0) {
                  this.$refs['form1'].resetFields();
                  this.getList();
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '删除失败',
                    type: 'error'
                  })
                }
              });
            })
        } else {
          this.$confirm('请选择要删除的记录！');
        }
      },

      //查看详情
      showDetail(val) {
        if (this.selectData.length == 1) {
          var reqId = this.selectData[0].requisitionId;
          this.$refs.requisitionDetail.form.reqId = reqId;
          this.$refs.requisitionDetail.form.showFlag=true;
          this.$refs.requisitionDetail.status=this.selectData[0].status;
          this.$refs.requisitionDetail.paidAmount=this.selectData[0].paidAmount;
          this.$refs.requisitionDetail.payObjectType=this.selectData[0].payObjectType;
          this.$refs.requisitionDetail.currentOrgCode=this.currentOrgCode;
          this.$refs.requisitionDetail.recordOrgCode=this.selectData[0].orgCode;
          this.$refs.requisitionDetail.getList();

        } else if(undefined != val && null != val && '' != val){
          var reqId = val;
          this.$refs.requisitionDetail.form.reqId = reqId;
          this.$refs.requisitionDetail.form.showFlag=true;
          this.$refs.requisitionDetail.status=this.selectData[0].status;
          this.$refs.requisitionDetail.paidAmount=this.selectData[0].paidAmount;
          this.$refs.requisitionDetail.payObjectType=this.selectData[0].payObjectType;
          this.$refs.requisitionDetail.currentOrgCode=this.currentOrgCode;
          this.$refs.requisitionDetail.recordOrgCode=this.selectData[0].orgCode;
          this.$refs.requisitionDetail.getList();

        }else{
          this.$refs.requisitionDetail.form.showFlag=false;
          this.$confirm('请选择一条要查看的记录');
        }
      },

      //付款申请单管理_付款
      pay(){
        if (this.selectData.length !== 1) {
          this.$confirm('请选择一条要付款的记录！');
          return;
        }
          //验证：选中记录的待付金额是否为0，为0：待付金额为0，请引入后再付款！
          var data = this.selectData[0];
        let status = this.selectData[0].status;
        let flowStatus = this.selectData[0].flowStatus;
        if(status != 1 && flowStatus != 1){//除已付款且被回退的记录除外，需要验证以下条件
          if(undefined  === data.reqAmount || null === data.reqAmount || data.reqAmount === 0){
            this.$confirm('申请金额为0,请引入后再付款');
            return;
          }
        }
          this.$refs.payRequisition.payVisible = true;
          Object.assign(this.$refs.payRequisition.form, data);
          let real = data.unpaidAmount;
          this.$refs.payRequisition.form.payRequisitionId = data.requisitionId;
          if(real==0){//如果未付金额=0
            this.$refs.payRequisition.showFlgC = false;
            this.$refs.payRequisition.confirmShow = false;
            this.$refs.payRequisition.partShow = false;
            this.$refs.payRequisition.getList();
          }else{
            this.$refs.payRequisition.form.payObjectType = data.payObjType;
            this.$refs.payRequisition.form.payType = null;
            this.$refs.payRequisition.form.discountAmount = 0;
            this.$refs.payRequisition.form.bankName = '';
            this.$refs.payRequisition.form.bankAccount = '';
            this.$refs.payRequisition.showBank = false;
            this.$refs.payRequisition.showAccept = false;
            this.$refs.payRequisition.form.payablePayLogId = null;
            this.$refs.payRequisition.form.acceptNo = '';

            this.$refs.payRequisition.form.realAmount = real;
            this.$refs.payRequisition.accessReal = real;
            this.$refs.payRequisition.accessUnpaid = real;
            this.$refs.payRequisition.form.unpaidAmount = real-this.$refs.payRequisition.form.realAmount;
            this.$refs.payRequisition.form.payAmount = real;

            this.$refs.payRequisition.getList();
            if(this.$refs.payRequisition.accessReal-this.$refs.payRequisition.accessUnpaid===0){
              this.$refs.payRequisition.confirmShow = true;
              this.$refs.payRequisition.partShow = false;
            }
            this.$refs.payRequisition.form.payableLogId='';
          }
      },
      //收款功能
      receivableList(){
        if (this.selectData.length !== 1) {
          this.$confirm('请选择一条要收款的记录！');
          return;
        }
          this.$refs.receivableList.receivableVisible = true;
          let data = this.selectData[0];
          this.$refs.receivableList.form.payRequisitionId = data.requisitionId;
          this.$refs.receivableList.getList();
      },

      //付款申请单管理_引入应付款_初始化
      importRequisition() {
        if (this.selectData.length === 1) {
          //验证：申请单状态为已付款的场合：已付款状态不能继续引入！
          var status = this.selectData[0].status;
          var paidAmount = this.selectData[0].paidAmount;
          var payObjType = this.selectData[0].payObjType;

          if (status === '已付款') {
            this.$confirm('已付款状态不能继续引入！');
            return;
          }
          if(paidAmount>0){
            this.$confirm('有付款记录不能继续引入！');
            return;
          }
          var requisitionId = this.selectData[0].requisitionId;
          Object.assign(this.$refs.importRequisition.form, this.selectData[0]);
          if(payObjType==9){
            this.$refs.importRequisition.form.orgCode = this.selectData[0].orgCode;
            this.$refs.importRequisition.form.carteamOrgCode = this.selectData[0].payObjId;
          }else{
            this.$refs.importRequisition.form.orgCode = this.selectData[0].orgCode;
            this.$refs.importRequisition.form.carteamOrgCode = '';
          }
          this.$refs.importRequisition.form.logisticsCodeBak = this.selectData[0].logisticCode;
          this.$refs.importRequisition.form.logisticsNameBak = this.selectData[0].logisticName;
          this.$refs.importRequisition.costTypeList=[];
          this.$refs.importRequisition.initCostType={};
          this.$refs.importRequisition.form.payObjIdBak = this.$refs.importRequisition.form.payObjId;
          this.$refs.importRequisition.getChildCompany();
          this.$refs.importRequisition.getCostType();
          this.$refs.importRequisition.getList();
          this.$refs.importRequisition.importVisible = true;

          this.$refs.importRequisition.uploadForm.orderNo = this.$refs.importRequisition.form.orderNo;
          this.$refs.importRequisition.uploadForm.bookSpaceNo = this.$refs.importRequisition.form.bookSpaceNo;
          this.$refs.importRequisition.uploadForm.cabinetNo = this.$refs.importRequisition.form.cabinetNo;
          this.$refs.importRequisition.uploadForm.subCode = this.$refs.importRequisition.form.subCode;
//          this.$refs.importRequisition.uploadForm.logisticsCode = this.$refs.importRequisition.form.logisticsCode;
//          this.$refs.importRequisition.uploadForm.logisticsCodeBak = this.$refs.importRequisition.form.logisticsCodeBak;
          this.$refs.importRequisition.uploadForm.logisticsNameBak = this.$refs.importRequisition.form.logisticsNameBak;
          this.$refs.importRequisition.uploadForm.objType = this.$refs.importRequisition.form.objType;
          this.$refs.importRequisition.uploadForm.isInvoice = this.$refs.importRequisition.form.isInvoice;
          this.$refs.importRequisition.uploadForm.invoice = this.$refs.importRequisition.form.invoice;
          this.$refs.importRequisition.uploadForm.payObjName = this.$refs.importRequisition.form.payObjName;
          this.$refs.importRequisition.uploadForm.requisitionId = this.$refs.importRequisition.form.requisitionId;
          this.$refs.importRequisition.uploadForm.orgCode = this.$refs.importRequisition.form.orgCode;
          this.$refs.importRequisition.uploadForm.payObjectType = this.$refs.importRequisition.form.payObjectType;
          this.$refs.importRequisition.uploadForm.openFlg = this.$refs.importRequisition.form.openFlg;
          this.$refs.importRequisition.uploadForm.showFlgA = this.$refs.importRequisition.form.showFlgA;
          this.$refs.importRequisition.uploadForm.costTypeList = this.$refs.importRequisition.form.costTypeList;
          this.$refs.importRequisition.uploadForm.costType = this.$refs.importRequisition.form.costType;
          this.$refs.importRequisition.uploadForm.settlementDateFrom = this.$refs.importRequisition.form.settlementDateFrom;
          this.$refs.importRequisition.uploadForm.settlementDateTo = this.$refs.importRequisition.form.settlementDateTo;


          if(this.$refs.importRequisition.form.carteamOrgCode!=undefined && this.$refs.importRequisition.form.carteamOrgCode!=null
          && this.$refs.importRequisition.form.carteamOrgCode!=''){
            this.$refs.importRequisition.uploadForm.carteamOrgCode = this.$refs.importRequisition.form.carteamOrgCode;
          }

          if(this.$refs.importRequisition.form.logisticsCode!=undefined && this.$refs.importRequisition.form.logisticsCode!=null
            && this.$refs.importRequisition.form.logisticsCode!=''){
            this.$refs.importRequisition.uploadForm.logisticsCode = this.$refs.importRequisition.form.logisticsCode;
          }

          if(this.$refs.importRequisition.form.logisticsCodeBak!=undefined && this.$refs.importRequisition.form.logisticsCodeBak!=null
            && this.$refs.importRequisition.form.logisticsCodeBak!=''){
            this.$refs.importRequisition.uploadForm.logisticsCodeBak = this.$refs.importRequisition.form.logisticsCodeBak;
          }

          this.$refs.importRequisition.uploadForm.endDateStart = this.$refs.importRequisition.form.endDateStart;
          this.$refs.importRequisition.uploadForm.endDateEnd = this.$refs.importRequisition.form.endDateEnd;
          this.$refs.importRequisition.uploadForm.plateNumber = this.$refs.importRequisition.form.plateNumber;
        } else {
          this.$confirm('请选择一条要引入的记录！');
          return;
        }
      },
      //付款申请单管理_导出excel
      exportExcel(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form1.Authorization = `Bearer ${token}`;
          //单据编号
          this.form1.reqNo= this.form1.reqNo ? this.form1.reqNo.trim() : '';
          //申请人
          this.form1.reqName= this.form1.reqName ? this.form1.reqName.trim() : '';
          //申请单公司
          this.form1.payCom= this.form1.payCom ? this.form1.payCom.trim() : '';
          //付款人
          this.form1.payer= this.form1.payer ? this.form1.payer.trim() : '';
          let params = Qs.stringify(this.form1);
          this.download({
            params: params,
            handle: getRequisitionExcelApi,
            callback () {

            }
          });

        });
      },

      //付款申请单管理_选中复选框
      handleSelectionChange1(val){
          //未选中一条记录的场合
          if(val.length === 0){
            //按钮权限控制
            this.buttonStatus={
              add:true,//新增申请单
              update:true,//修改
              delete:true,//删除
              show:true,//查看
              import:false,//引入
              billing:false,//开票
              invoiceFun:false,//收票
              audit:false,//审核
              pay:false,//付款
              receivable:false,//收款
              invoiceSubmit:false,//发票提交
            };
            return;
          }else{//有选中记录的场合
            this.selectData = val;
            let status = this.selectData[val.length-1].status;//申请单状态
            let reqAmount = this.selectData[val.length-1].reqAmount;//申请金额
            let unpaidAmount = this.selectData[val.length-1].unpaidAmount;//未付金额
            let paidAmount = this.selectData[val.length-1].paidAmount;//实付金额
            let payObjType = this.selectData[val.length-1].payObjType;//应付对象类型
            let flowStatus = this.selectData[val.length-1].flowStatus;//审核状态
            let data = this.selectData[val.length-1];//选中数据

            this.buttonStatus.pay = true;//付款
            this.outportButtonFlag = true;//移出应付款

            if(this.initLevel==1){//总公司场合
                if(payObjType == 7){//总公司-->A类子公司场合
                  this.buttonStatus.import = false;//引入应付款
                  this.buttonStatus.invoiceSubmit = false;//开票提交
                  this.buttonStatus.billing = false;//开票
                  this.buttonStatus.invoiceFun = false;//收票
                  this.buttonStatus.audit = false;//审核
                  this.buttonStatus.receivable = false;//收款
                  this.$refs.payRequisition.showFlgC = false;//付款显示控制

                  if(status === 0){//状态=申请中
                    this.buttonStatus.import = true;//引入应付款
                  }

                  if(reqAmount>0 && (status === 0 || status === 10)){//申请金额>0
                    this.buttonStatus.invoiceSubmit = true;//开票提交
                  }else{
                    this.buttonStatus.invoiceSubmit = false;//开票提交
                  }

                  if(status === 3){//状态=已开票
                    this.buttonStatus.invoiceFun = true;//收票
                  }
                  if(status === 4){//状态=已收票
                    this.buttonStatus.audit = true;//审核
                  }
                  if(status === 5){//状态=审核通过
                    this.$refs.payRequisition.showFlgC = true;//付款显示控制
                  }
                  if(unpaidAmount>0 && paidAmount>0){//部分付款场合
                    this.$refs.payRequisition.showFlgC = true;//付款显示控制
                  }
                  if(unpaidAmount==0 && paidAmount>0 && status===1){//全部付款，但还未全部收款
                    this.$refs.payRequisition.showFlgC = true;//付款显示控制
                  }
                  if(status===1 || status===7){//全部付款，但还未全部收款
                    this.$refs.payRequisition.showFlgC = false;//付款显示控制
                  }
                }else if(payObjType == 8){//总公司-->B类子公司场合
                  this.buttonStatus.import = false;//引入应付款
                  this.buttonStatus.billing = false;//开票
                  this.buttonStatus.invoiceFun = false;//收票
                  this.buttonStatus.audit = false;//审核
//                  this.buttonStatus.pay = false;//付款
                  this.buttonStatus.receivable = false;//收款
                  this.$refs.payRequisition.showFlgC = false;//付款显示控制

                  if(status === 0){//状态=申请中
                    this.buttonStatus.import = true;//引入应付款
                  }
                  if(reqAmount>0 && (status === 0 || status === 10)){//申请金额>0
                    this.buttonStatus.invoiceSubmit = true;//开票提交
                  }else{
                    this.buttonStatus.invoiceSubmit = false;//开票提交
                  }
                  if(status === 3){//状态=已开票
                    this.buttonStatus.invoiceFun = true;//收票
                  }
                  if(status === 4){//状态=已收票
                    this.buttonStatus.audit = true;//审核
                  }
                  if(status === 5){//状态=审核通过
//                    this.buttonStatus.pay = true;//付款
                    this.$refs.payRequisition.showFlgC = true;//付款显示控制
                  }
                  if(unpaidAmount>0 && paidAmount>0){//部分付款场合
//                    this.buttonStatus.pay = true;//付款
                    this.$refs.payRequisition.showFlgC = true;//付款显示控制
                  }
                  if(unpaidAmount==0 && paidAmount>0 && status===1){//全部付款，但还未全部收款
//                    this.buttonStatus.pay = true;//付款
                    this.$refs.payRequisition.showFlgC = true;//付款显示控制
                  }
                  if(status===1 || status===7){//全部付款，但还未全部收款
                    this.$refs.payRequisition.showFlgC = false;//付款显示控制
                  }
                }else{//其他场合
                  this.buttonStatus.update = false;//修改
                  this.buttonStatus.delete = false;//删除
                  this.buttonStatus.import = false;//引入应付款
                  this.buttonStatus.invoiceSubmit = false;//开票提交
                  this.buttonStatus.billing = false;//开票
                  this.buttonStatus.invoiceFun = false;//收票
                  this.buttonStatus.audit = false;//审核
                  this.buttonStatus.pay = false;//付款
                  this.$refs.payRequisition.showFlgC = false;//付款显示控制
                }
            }else if(this.initLevel==2 && this.minimumGuaranteeFlg==1 && this.settleType=='A'){//子公司:(A类+保底)场合
              if(payObjType == 7){//总公司-->A类子公司场合
                this.buttonStatus.update = false;//修改
                this.buttonStatus.delete = false;//删除
                this.buttonStatus.pay = false;//付款
                this.outportButtonFlag = false;//移出应付款

                this.buttonShow.receivable = true;//收款
                this.buttonStatus.billing = true;//开票
                this.buttonStatus.receivable = true;//收款


                if(reqAmount==0){//申请金额为0时不能开票
                  this.buttonStatus.billing = false;
                  this.buttonStatus.receivable = false;//收款
                }

                if(status==10){//状态位开票提交
                  this.$refs.invoiceAdmin.form.showFlgA = true;
                  this.buttonStatus.receivable = false;//收款
                }

                if(reqAmount>0 && unpaidAmount===0){//全部付款的场合
                  this.$refs.invoiceAdmin.form.showFlgA = false;
                }

                if(unpaidAmount==0 && paidAmount>0 && status===1){//全部付款，但还未全部收款
//                    this.buttonStatus.pay = true;//付款
                  this.$refs.payRequisition.showFlgC = true;//付款显示控制
                }
              }else if(payObjType == 9){//保底子公司--->物流公司
                this.buttonStatus.update = true;//修改
                this.buttonStatus.delete = true;//删除

                this.buttonShow.receivable = false;//收款
                this.buttonStatus.import = false;//引入应付款
                this.buttonStatus.billing = false;//开票
                this.buttonStatus.invoiceFun = false;//收票
                this.buttonStatus.audit = false;//审核
//                this.buttonStatus.pay = false;//付款
                this.$refs.payRequisition.showFlgC = false;//付款显示控制

                if(status === 0){//状态=申请中
                  this.buttonStatus.import = true;//引入应付款
//                  if(status === 10){
//                    this.buttonStatus.billing = true;//开票
//                  }else{
//                    this.buttonStatus.billing = false;//开票
//                  }
                }
                if(status === 10){
                  this.buttonStatus.billing = true;//开票
                  this.$refs.invoiceAdmin.form.showFlgA = true;
                }
                if(status === 3){//状态=已开票
                  this.buttonStatus.invoiceFun = true;//收票
                }
                if(status === 4){//状态=已收票
                  this.buttonStatus.audit = true;//审核
                }
                if(status === 5){//状态=审核通过
//                  this.buttonStatus.pay = true;//付款
                  this.$refs.payRequisition.showFlgC = true;//付款显示控制
                }
              }
            }else if(this.initLevel==2 && this.minimumGuaranteeFlg==0 && this.settleType=='A'){//子公司:(A类+不保底)场合
              this.buttonShow.receivable = true;//收款
              this.buttonStatus.import = false;//引入应付款
              this.buttonStatus.billing = true;//开票
              this.buttonStatus.invoiceFun = false;//收票
              this.buttonStatus.audit = false;//审核
              this.buttonStatus.pay = false;//付款
              this.buttonStatus.receivable = true;//收款
              this.outportButtonFlag = false;//移出应付款
            }else if(this.initLevel==2 && this.settleType=='B'){//子公司:(B类)场合
              this.buttonShow.receivable = true;//收款
              this.buttonStatus.import = false;//引入应付款
              this.buttonStatus.billing = true;//开票
              this.buttonStatus.invoiceFun = false;//收票
              this.buttonStatus.audit = false;//审核
              this.buttonStatus.pay = false;//付款
              this.buttonStatus.receivable = true;//收款
              this.outportButtonFlag = false;//移出应付款
            }else{//其他场合（级别为3的物流公司登录场合）
              this.buttonShow.receivable = false;//收款
              this.buttonStatus.import = false;//引入应付款
              this.buttonStatus.billing = false;//开票
              this.buttonStatus.invoiceFun = false;//收票
              this.buttonStatus.audit = false;//审核
              this.buttonStatus.pay = false;//付款
              this.buttonStatus.receivable = false;//收款
              this.outportButtonFlag = false;//移出应付款
            }
          }
      },

      //付款申请单管理_选中复选框
      handleSelectionChange2(val){
        this.selectData2 = val;
      },

      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted(){
      //获取应付申请管理下拉列表初始化数据
      this.getRequisitionListInit();
    },
    created(){
      this.init()
    },
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal-lg.css'
</style>
