<template>
  <section>
    <ToolBarBox>
    <!-- 收款申请单管理.查询条件 -->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form1" ref="form1" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="收款对象" :label-width="labelWidth" prop="customerId">
              <!-- @change="handleChange"-->
              <el-select clearable filterable default-first-option v-model="form1.customerId" placeholder="请选择收款对象" class='control-width'>
                <el-option
                  v-for="item in customList"
                  :label="item.customerName"
                  :key="item.customerId"
                  :value="item.customerId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="long-label" label="申请单编号" :label-width="labelWidth" prop="receivableRequisitionId">
              <el-input v-model="form1.receivableRequisitionId" placeholder="请输入申请单编号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="申请人" :label-width="labelWidth" prop="applicant">
              <el-input v-model="form1.applicant" placeholder="请输入申请人名称" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="申请状态" :label-width="labelWidth" prop="requisitionStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.requisitionStatus" placeholder="请选择" class='control-width'>
                <!--<el-option v-for="item in requisitionStatus"-->
                          <!--:key="item.value"-->
                          <!--:label="item.text"-->
                          <!--:value="item.value">-->
                <!--</el-option>-->
                <el-option label="申请中" :key="form1.requisitionStatus" :value="0"></el-option>
                <el-option label="开票提交" :key="form1.requisitionStatus" :value="6"></el-option>
                <el-option label="已收票" :key="form1.requisitionStatus" :value="1"></el-option>
                <el-option label="部分收款" :key="form1.requisitionStatus" :value="5"></el-option>
                <el-option label="已收款" :key="form1.requisitionStatus" :value="3"></el-option>
                <el-option label="审核通过" :key="form1.requisitionStatus" :value="2"></el-option>
                <el-option label="审核不通过" :key="form1.requisitionStatus" :value="4"></el-option>
              </el-select>
              <!--<select name="" id="">-->
                <!--<option value="">申请中</option>-->
                <!--<option value="">已开票</option>-->
                <!--<option value="">已收款</option>-->
                <!--<option value="">审核通过</option>-->
                <!--<option value="">审核不通过</option>-->
              <!--</select>-->
            </el-form-item>

            <el-form-item label="收款时间" :label-width="labelWidth" prop="receiveTimeStart" style="margin-right:2px">
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form1.receiveTimeStart" @change="receiveTimeStartChange"
                              style="width:110px"></el-date-picker>
            </el-form-item>
            <!--<label style="padding-right:0;padding-top:11px;">-</label>-->
            <el-form-item label="" :label-width="labelWidth" prop="receiveTimeEnd">
              <el-date-picker type="date" placeholder="选择日期" v-model="form1.receiveTimeEnd" @change="receiveTimeEndChange"
                              style="width:110px"></el-date-picker>
            </el-form-item>
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

    <el-col :span="24" class="toolbar toolbarTips" style="margin-bottom:0px;">
      <div>
        <span>申请单总金额(元): </span>
        <span>{{ queryTotalAmount.requisitionTotalAmount }}</span>
      </div>
      <div>
        <span>应收总金额(元): </span>
        <span>{{ queryTotalAmount.receivableTotalAmount }}</span>
      </div>
      <div>
        <span>现金折扣总金额(元): </span>
        <span>{{ queryTotalAmount.discountTotalAmount }}</span>
      </div>
      <div>
        <span>实际收款总金额(元): </span>
        <span>{{ queryTotalAmount.realTotalAmount }}</span>
      </div>
      <div>
        <span>应收剩余总金额(元): </span>
        <span>{{ queryTotalAmount.unReceivableTotalAmount }}</span>
      </div>
    </el-col>
    </ToolBarBox>

    <TableBox>
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">收款申请管理</span>
      </div>
      <el-button type="primary" icon="plus" @click="add" size="small" :disabled="this.$global.isDisabled(2)">新增申请单</el-button>
      <el-button type="primary" icon="edit" @click="update" size="small" :disabled="this.$global.isDisabled(7) || editable || editable2">申请单修改</el-button>
      <el-button type="primary" icon="delete" @click="remove" size="small" :disabled="this.$global.isDisabled(9) || editable">申请单删除</el-button>
      <el-button type="primary" icon="view" @click="showDetail('')" size="small" :disabled="this.$global.isDisabled(29)">查看详情</el-button>
      <el-button type="primary" icon="edit" @click="editReceivableAcount" size="small" :disabled="this.$global.isDisabled(118) || editable">编辑应收款</el-button>
      <el-button type="primary" icon="edit" @click="showMakeoutInvoice" size="small" :disabled="this.$global.isDisabled(120)">开票提交</el-button>
      <el-button type="primary" icon="arrow-right" @click="receivableInvoice" size="small" :disabled="this.$global.isDisabled(110)">开票复核</el-button>
      <el-button type="primary" icon="circle-check" @click="editAcount" size="small" :disabled="this.$global.isDisabled(106)">收款</el-button>
      <el-button type="primary" icon="arrow-right" @click="receivableAmountAudit" size="small" :disabled="this.$global.isDisabled(112) || auditable">财务审核</el-button>
      <el-button type="primary" icon="document" @click="exportExcel" size="small" :disabled="this.$global.isDisabled(21)">导出</el-button>
    </el-col>

    <!-- 收款申请单管理.查询结果 -->
    <el-col>
      <el-table ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" :data="receivableList.data" @selection-change="handleSelectionChange1" stripe>
        <el-table-column type="selection" fixed width="50">
        </el-table-column>

        <el-table-column
          prop="receivableRequisitionId"
          label="申请单编号" width="100">
        </el-table-column>

        <el-table-column
          prop="requisitionObjType"
          label="申请对象" width="100">
        </el-table-column>

        <el-table-column
          prop="customerName"
          label="收款对象" width="100">
        </el-table-column>

        <el-table-column
          prop="requisitionAmount"
          label="申请单金额" width="90">
        </el-table-column>

        <el-table-column
          prop="receivableAmount"
          label="应收金额" width="90">
        </el-table-column>

        <el-table-column
          prop="discountAmount"
          label="折扣金额" width="90">
        </el-table-column>

        <el-table-column
          prop="realAmount"
          label="实际收款" width="90">
        </el-table-column>

        <el-table-column
          prop="unReceivableAmount"
          label="未收金额" width="90">
        </el-table-column>

        <el-table-column
          prop="requisitionerName"
          label="申请人" width="100">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="申请备注" width="100">
        </el-table-column>

        <el-table-column
          prop="requisitionTime"
          label="申请时间" width="100">
        </el-table-column>

        <el-table-column
          prop="receivableRequisitionStatusType"
          label="申请状态" width="100">
        </el-table-column>

        <el-table-column
          prop="receiverName"
          label="收款人" width="100">
        </el-table-column>

        <el-table-column
          prop="receiveTime"
          label="收款时间" width="100">
        </el-table-column>

        <el-table-column
          prop="auditRemark"
          label="财务审批备注" width="100">
        </el-table-column>

        <el-table-column
          prop="invoiceSubmitDate"
          label="提交日期" width="100">
        </el-table-column>
        <el-table-column
          prop="invoiceProperties"
          label="开票类型" width="100">
        </el-table-column>
        <el-table-column
          prop="invoiceRemark"
          label="杂费税点说明" width="100">
        </el-table-column>
      </el-table>
    </el-col>
    </TableBox>

    <PaginationBox>
    <!-- 分页模块 -->
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


    <!--新增申请-->
    <AddReceivable ref="addReceivable"></AddReceivable>
    <!--修改申请-->
    <ModifyReceivable ref="modifyReceivable"></ModifyReceivable>
    <!--申请详情-->
    <ReceivableDetail ref="receivableDetail"></ReceivableDetail>
    <!--编辑应收款-->
    <EditReceivableAcount ref="editReceivableAcount" @importReceivableAcountSuccess="getList" @outportReceivableAcountSuccess="getList"></EditReceivableAcount>
    <!--开票提交-->
    <MakeoutInvoice ref="makeoutInvoice" @invoiceSubmitOperate="getList"></MakeoutInvoice>

    <!--收款(编辑金额)-->
    <EditAcount ref="editAcount" @saveEditAcountSuccess="getList"></EditAcount>
    <!--开票复核-->
    <ReceivableInvoice ref="receivableInvoice" @updReceivableRequisitionSuccess="getList"></ReceivableInvoice>
    <!--财务审核-->
    <ReceivableAmountAudit ref="receivableAmountAudit" @updAmountAuditSuccess="getList"></ReceivableAmountAudit>

    <ImportRequisition ref="importRequisition"></ImportRequisition>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import AddReceivable  from './AddReceivable.vue'
  import ModifyReceivable  from './ModifyReceivable.vue'
  import EditAcount  from './EditAcount.vue'
  import ImportRequisition  from './ImportRequisition.vue'
  import ReceivableDetail from './ReceivableDetail.vue'
  import EditReceivableAcount from './EditReceivableAcount.vue'
  import ReceivableInvoice from './ReceivableInvoice.vue'
  import ReceivableAmountAudit from './ReceivableAmountAudit.vue'
  import MakeoutInvoice from './MakeoutInvoice.vue'

  import {getPayObjListApi} from '../../../api/modules/settlement';
  import {getRequisitionExcelApi,removeRequisitionApi,removeBeforeApi,delReceivableRequisitionApi,exportReceivableRequisition,queryRecTotalAmount} from '../../../api/modules/settlement'
  import Qs from 'qs'
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    components: {
      AddReceivable,
      ModifyReceivable,
      EditAcount,
      ImportRequisition,
      ReceivableDetail,
      EditReceivableAcount,
      ReceivableInvoice,
      ReceivableAmountAudit,
      MakeoutInvoice
    },
    data() {
      return {
        editable2: false,
        editable: false,
        auditable: true,
        labelWidth: '90px',
        selectData: [],
        selectData2: [],
        initData: {},
        PayObjData: {},
        item: [],

        queryTotalAmount: {
//          /** 申请单总金额(元)*/
//          requisitionTotalAmount: '',
//          /** 应收总金额(元)*/
//          receivableTotalAmount: '',
//          /** 现金折扣总金额(元)*/
//          discountTotalAmount: '',
//          /** 实际收款总金额(元)*/
//          realTotalAmount: '',
//          /** 应收剩余总金额(元)*/
//          unReceivableTotalAmount: ''
        },

        unReceiveAmount: '1',
        form1: {
          customerId: '',
          receivableRequisitionId: '',
          applicant: '',
          requisitionStatus: '',
          receiveTimeStart: '',
          receiveTimeEnd: '',
          endDateStart: '',
          endDateEnd: ''
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
        requisitionStatus: [
          {text: '待付款', value: 0},
          {text: '已付款', value: 1},
        ],
        affiliated: [
          {text: '广州', value: 0},
          {text: '东莞', value: 1},
        ]
      }
    },
    computed: {
      ...mapGetters([
        'receivableList',
        'customList'
      ])
    },
    methods: {
      ...mapActions([
        'getReceivableList',
        'getCustomList'
      ]),

      /*      handleChange(item){
              this.form1.customerId = item.value;
              this.form1.payObj = item.text;
            },*/

      //画面初始化
      init(){
        //alert("init")
        //this.getList()
        this.$global.recorderTableData(this, 'receivableList');
        this.getCustomList();
        //获取总金额数据
        queryRecTotalAmount(this.form1).then((res) => {
          if (res.data.success) {
            this.queryTotalAmount = res.data.data;
            //console.log(this.queryTotalAmount)
          } else {

          }
        });

      },

      //开票提交
      showMakeoutInvoice() {
        if (this.selectData.length == 1) {
          this.$refs.makeoutInvoice.makeoutInvoiceVisible = true;

          this.$refs.makeoutInvoice.form.receivableRequisitionId = this.selectData[0].receivableRequisitionId;
          this.$refs.makeoutInvoice.form.invoiceCustomerId = this.selectData[0].customerId;
          this.$refs.makeoutInvoice.form.invoiceSubmitId = '';

          this.$refs.makeoutInvoice.form.invoiceCustomerName = this.selectData[0].customerName;
          this.$refs.makeoutInvoice.form.invoiceTitle = this.selectData[0].customerName;
          this.$refs.makeoutInvoice.form.invoiceAmount = this.selectData[0].receivableAmount;
          this.$refs.makeoutInvoice.form.invoiceProperties = this.selectData[0].invoiceProperties;
          this.$refs.makeoutInvoice.form.invoiceRemark = this.selectData[0].invoiceRemark;

          this.$refs.makeoutInvoice.getList(this.selectData[0].receivableRequisitionId);
        } else {
          this.$confirm('请选择一条要编辑的记录！')
        }
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
      receiveTimeStartChange(val){
//        this.form1.receiveTimeStart = val
      },
      //付款结束时间
      receiveTimeEndChange(val){
//        this.form1.receiveTimeEnd = val
      },
      //付款申请单管理_初始化/查询
      getList(){
        //alert("get list");
        //console.log('父组件getList')
//        //单据编号
//        this.form1.receivableRequisitionId= this.form1.receivableRequisitionId ? this.form1.receivableRequisitionId.trim() : '';
//        //申请人
//        this.form1.requisitionerId= this.form1.requisitionerId ? this.form1.requisitionerId.trim() : '';
//        //申请单公司
//        this.form1.payCom= this.form1.payCom ? this.form1.payCom.trim() : '';
//        //付款人
//        this.form1.payer= this.form1.payer ? this.form1.payer.trim() : '';
        this.form1.receiveTimeStart = (typeof(this.form1.receiveTimeStart) == "string" ? this.form1.receiveTimeStart : util.formatDate.format(this.form1.receiveTimeStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form1.receiveTimeEnd = (typeof(this.form1.receiveTimeEnd) == "string" ? this.form1.receiveTimeEnd : util.formatDate.format(this.form1.receiveTimeEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.form1.endDateStart = (typeof(this.form1.endDateStart) == "string" ? this.form1.endDateStart : util.formatDate.format(this.form1.endDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form1.endDateEnd = (typeof(this.form1.endDateEnd) == "string" ? this.form1.endDateEnd : util.formatDate.format(this.form1.endDateEnd, 'yyyy-MM-dd hh:mm:ss'));

        this.pageHandler(this.form1, this.getReceivableList)
//        this.getPayObjList()
//        this.form1.customerId = ''
//        this.form1.payObj = ''

        //获取总金额数据
        queryRecTotalAmount(this.form1).then((res) => {
          if (res.data.success) {
            this.queryTotalAmount = res.data.data;
            //console.log(this.queryTotalAmount)
          } else {

          }
        });
      },
      //付款对象下拉框
      getPayObjList(){
        getPayObjListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.PayObjData = data.data;
          }
        });
      },
      //收款申请单管理_查询
      onSubmit() {
        this.getList();
      },

      //收款申请单管理_新增申请单
      add() {
//        console.log(this.$refs.addReceivable.customListAll)
//        this.$refs.addReceivable.customListFilter1 = this.$refs.addReceivable.customListFilter2 = this.$refs.addReceivable.customListAll = this.customList;
//        this.$refs.addReceivable.customListFilter1 = this.$refs.addReceivable.customListFilter1.unshift(1);
//        this.$refs.addReceivable.customListFilter2 = this.$refs.addReceivable.customListFilter1.unshift(2);
//        console.log(this.$refs.addReceivable.customList)
//        this.$refs.addReceivable.customList = this.customList;
        this.$refs.addReceivable.addVisible = true;
        this.$refs.addReceivable.getCustomListByReqObj();
//        console.log(this.$refs.addReceivable.customListAll)
      },

      //收款申请单管理_申请单修改
      update(){
        if (this.selectData.length == 1) {
          this.$refs.modifyReceivable.modifyVisible = true;
//          this.$refs.modifyReceivable.customList = this.customList;
          this.$refs.modifyReceivable.getCustomList();
          this.$refs.modifyReceivable.form1.receivableRequisitionId = this.selectData[0].receivableRequisitionId;

          this.$refs.modifyReceivable.form1.requisitionObj = this.selectData[0].requisitionObj;
          this.$refs.modifyReceivable.form1.requisitionObj = this.$refs.modifyReceivable.form1.requisitionObj == null ? '' : this.$refs.modifyReceivable.form1.requisitionObj;
          //console.log(this.$refs.modifyReceivable.form1.requisitionObj)

          this.$refs.modifyReceivable.form1.customerId = this.selectData[0].customerId;
          this.$refs.modifyReceivable.form1.customerId = this.$refs.modifyReceivable.form1.customerId == null ? '' : this.$refs.modifyReceivable.form1.customerId + '';
          //console.log(this.$refs.modifyReceivable.form1.customerId)

//          this.$refs.modifyReceivable.form1.customerName = this.selectData[0].customerName;
          this.$refs.modifyReceivable.form1.remark = this.selectData[0].remark;

          //验证：申请单状态为已付款的场合：不能修改已付款的记录！
//          var status = this.selectData[0].status
//          if (status == '已付款') {
//            this.$confirm('不能修改已付款的记录！')
//          } else {
//            this.$refs.modifyReceivable.modifyVisible = true;
//            this.$refs.modifyReceivable.detail = this.selectData[0]
//          }
        } else {
          this.$confirm('请选择一条要编辑的记录！')
          this.$refs.modifyReceivable.modifyVisible = false;
        }
      },

      //应收申请管理_申请单删除
      remove(){
        if (this.selectData.length > 0) {
          let ids = "";
          this.$confirm('此操作将永久删除，是否继续?', '提示', {type: 'warning'}).then(() => {
            this.selectData.forEach(function(item) {
              ids += item.receivableRequisitionId+",";
            });
            //console.log(ids);
            ids = ids.substr(0, ids.length - 1);
            //console.log(ids);
            delReceivableRequisitionApi({"ids": ids}).then((res) => {
              if (res.data.success) {
                this.$refs['form1'].resetFields();
                this.getList();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                });
              }
            });
          });
        } else {
          this.$confirm('请选择要删除的记录！');
        }
      },

      //查看详情
      showDetail(val) {
        if (this.selectData.length == 1) {
          this.$refs.receivableDetail.detailVisible = true
          this.$refs.receivableDetail.form.showFlag=true;
          this.$refs.receivableDetail.form.receivableRequisitionId = this.selectData[0].receivableRequisitionId;
          this.$refs.receivableDetail.getList()
        }else{
          this.$refs.receivableDetail.detailVisible = false;
          this.$refs.receivableDetail.form.showFlag=false;
          this.$confirm('请选择一条要查看的记录')
        }
      },

      //编辑应收款
      editReceivableAcount() {
        if (this.selectData.length == 1) {
          this.$refs.editReceivableAcount.detailVisible = true;
          this.$refs.editReceivableAcount.requisitionStatus = this.selectData[0].requisitionStatus;

          this.$refs.editReceivableAcount.form.receivableRequisitionId = this.$refs.editReceivableAcount.receivableRequisitionId2 = this.selectData[0].receivableRequisitionId;
          this.$refs.editReceivableAcount.form.customerId = this.selectData[0].customerId;
          this.$refs.editReceivableAcount.customerName = this.selectData[0].customerName;
          this.$refs.editReceivableAcount.getList()
        }else{
          this.$refs.editReceivableAcount.form.showFlag=false
          this.$confirm('请选择一条要查看的记录')
        }
      },

      //收款
      editAcount(){
        if (this.selectData.length == 1) {
          this.$refs.editAcount.form.receivableRequisitionId = this.$refs.editAcount.form2.receivableRequisitionId = this.selectData[0].receivableRequisitionId;
          this.$refs.editAcount.form.receivableAmount = this.selectData[0].unReceivableAmount;
          this.$refs.editAcount.form.realAmount = this.selectData[0].unReceivableAmount;
          this.$refs.editAcount.formWrapVisible = this.selectData[0].unReceivableAmount !== 0;
          this.$refs.editAcount.editAcountVisible = true;
          this.$refs.editAcount.getList()
          //console.log(this.$refs.editAcount)
//          this.$refs.editAcount.form.showFlag=true
//          this.$refs.editAcount.detail = this.selectData[0]
        } else {
          this.$confirm('请选择一条要付款的记录！')
        }
      },

      //开票复核
      receivableInvoice() {
        if (this.selectData.length == 1) {
          this.$refs.receivableInvoice.form.receivableRequisitionId = this.$refs.receivableInvoice.form1.receivableRequisitionId = this.selectData[0].receivableRequisitionId;
          this.$refs.receivableInvoice.form.requisitionObjType = this.selectData[0].requisitionObjType;
          this.$refs.receivableInvoice.form.customerName = this.selectData[0].customerName;
          this.$refs.receivableInvoice.receivableInvoiceVisible = true;
          this.$refs.receivableInvoice.getList()
        } else {
          this.$confirm('请选择一条记录！')
        }
      },

      //财务审核
      receivableAmountAudit() {
        if (this.selectData.length == 1) {
          this.$refs.receivableAmountAudit.form.receivableRequisitionId = this.selectData[0].receivableRequisitionId;
//          this.$refs.receivableAmountAudit.form.requisitionObjType = this.selectData[0].requisitionObjType;
//          this.$refs.receivableAmountAudit.form.customerName = this.selectData[0].customerName;
          this.$refs.receivableAmountAudit.receivableAmountAuditVisible = true;
          this.$refs.receivableAmountAudit.getList()
        } else {
          this.$confirm('请选择一条记录！')
        }
      },

      //付款申请单管理_引入应付款_初始化
      importRequisition() {
        if (this.selectData.length == 1) {
          //验证：申请单状态为已付款的场合：已付款状态不能继续引入！
          var status = this.selectData[0].status
          if (status == '已付款') {
            this.$confirm('已付款状态不能继续引入！')
            return
          }

          //付款对象为"司机"的场合
          var requisitionId = this.selectData[0].requisitionId
          this.$refs.importRequisition.importVisible = true;
          this.$refs.importRequisition.detail = this.selectData[0]

        } else {
          this.$confirm('请选择一条要引入的记录')
        }
      },
      //付款申请单管理_导出excel
      exportExcel(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          const token = sessionStorage.getItem('id_token');
//          this.form1.Authorization = `Bearer ${token}`;
//          let params = Qs.stringify(this.form1);
//          getRequisitionExcelApi(params)
          const token = sessionStorage.getItem('id_token');
          let raw_params = {
            Authorization: `Bearer ${token}`,
            customerId: this.form1.customerId,
            receivableRequisitionId: this.form1.receivableRequisitionId,
            applicant: this.form1.applicant,
            requisitionStatus: this.form1.requisitionStatus,
            receiveTimeStart: this.form1.receiveTimeStart,
            receiveTimeEnd: this.form1.receiveTimeEnd,
          };
          let params = Qs.stringify(raw_params);
          this.download({
            params: params,
            handle: exportReceivableRequisition,
            callback () {

            }
          });

        });
      },

      //付款申请单管理_选中复选框
      handleSelectionChange1(val){
        this.selectData = val;
//        if (this.selectData.length === 1) {
//          //console.log(this.selectData[0].requisitionStatus);
//          if (this.selectData[0].requisitionStatus === 1 || this.selectData[0].requisitionStatus === 2 || this.selectData[0].requisitionStatus === 3) {
//            this.editable = true;
//          } else {
//            this.editable = false;
//          }
//        }
        if (this.selectData.length === 0) {
          this.auditable = true;
          this.editable = this.editable2 = false;
        }
        else {
          if (this.selectData.length === 1) {
            if(this.selectData[0].isInvoice && this.selectData[0].isReceive) {
              this.auditable = false;
            } else {
              this.auditable = true;
            }
          }

          //let thisEditable = false;
          //val.forEach((item, index) => {});
          for (let index = 0; index < val.length; index++) {
//            if (val[index].requisitionStatus !== 2 && val[index].requisitionStatus !== 6) {
//              console.log('不可审核')
//              console.log(val.length)
//              console.log(index)
//              console.log(val[index].requisitionStatus)
//              this.auditable = true;
//              break;
//            } else {
//              console.log('可审核')
//              console.log(val.length)
//              console.log(index)
//              console.log(val[index].requisitionStatus)
//              this.auditable = false;
//            }


            if (val[index].requisitionStatus === 1 || val[index].requisitionStatus === 2 || val[index].requisitionStatus === 3 || val[index].requisitionStatus === 5) {
              //console.log(val[index].requisitionStatus+',disabled=true');
              this.editable = true;
              break;
            } else if (val[index].requisitionAmount !== 0) {
              this.editable2 = true;
            } else {
              //console.log(val[index].requisitionStatus+',disabled=false');
              this.editable = this.editable2 = false;
            }
          }
          //this.editable = thisEditable;
        }
      },

      //付款申请单管理_选中复选框
      handleSelectionChange2(val){
        this.selectData2 = val;
      },

      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

    created(){
      this.init()
    },
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal-lg.css';

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
</style>
