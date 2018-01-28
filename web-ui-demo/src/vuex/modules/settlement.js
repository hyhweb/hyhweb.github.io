
import api from '../../api'
import axios from 'axios'


// 应用初始状态，按模块划分，所有的接口都在这里
const state = {
  //子公司下拉框
  dropDwonList: [],
  //物流公司下拉框
  logisticsDropDwon: [],
  //结算比例设置(初始化/搜索)
  settlementRateList: {},
  //司机代收款管理(初始化/搜索)
  driverAgencyfundlist: {},
  //司机代收款管理(统计金额)
  driverAmount: {},
  dirverInandOut: {},
  //一次性客户报表(初始化/搜索)
  onceCustomerList: {},
  //一次性客户报表(统计总金额)
  onceCustomerSumAmount: '',
  //应付杂费管理(初始化/搜索)
  payCashList: {},
  //应付明细报表(初始化/搜索)
  payRequisitionReportList: {},
  //付款申请单管理_引入应付款_初始化
  importPageList: {},
  //应付杂费管理(统计总金额)
  payCashSumAmount: {},
  //应付明细报表(统计总金额)
  payRequisitionReportSumAmount: {},
  //客户模块
  customerReceivable: {},
  customerAmount: {},
  //司机提前结算(预支执行_初始化/搜索)
  advanceList: {},
  //司机提前结算(预支执行_查看详情)
  detailDataList: {},
  //司机提前结算(预支历史_初始化/搜索)
  hisDataList: {},
  //司机提前结算(预支)
  advanced: {},
  //客户应收详情
  customerDetail: {},
  //客户详情总金额
  customerDetailAmount: {},
  //子公司应付
  childCompanyList: {},
  //子公司应付总额
  childCompanyAmount: {},
  //子公司应付详情
  childCompanyDetail: {},
  //子公司应付详情总额
  childCompanyDetailAmount: {},
  //物流公司不保底
  logisticsList: {},
  //物流公司不保底应付总额
  logisticsAmount: {},
  //物流公司不保底详情
  logisticsDetail: {},
  //物流公司不保底详情总额
  logisticsDetailAmount: {},
  //物流公司保底应付
  logisticsTwoList: {},
  //物流公司保底应付总额
  logisticsTwoAmount: {},
  //物流公司保底详情
  logisticsTwoDetail: {},
  //物流公司保底详情总额
  logisticsTwoDetailAmount: {},
  //司机报表
  driverReport:{},
  //司机报表总额
  driverReportAmount:{},
  //付款申请单管理(初始化/搜索)
  requisitionlists: {},
  //付款申请单管理(查看详情)
  requisitiondetails: {},
  //新增付款申请单
  addRequisition:{},
  //修改付款申请单
  modifyRequisition:{},
  outport: {},
  //付款申请单管理(统计总金额)
  requisitionDetailSumAmount: {},
  //集装箱利润列表
  cabinetProfitList: {},
  //客户利润列表
  customerProfitList: {},
  //子公司利润列表
  childCompanyProfitList: {},
  //七天详情总计
  advanceDateilAmount: 0,
  //集装箱利润统计
  cabinetProfitAmount: {},
  //客户利润统计
  customerProfitAmount: {},
  //子公司利润统计
  childCompanyProfitAmount: {},
  //中远海/泛亚电扇客户应收
  shipCompanyList: {},
  //中远海/泛亚电扇客户应收总计
  shipCompanyAmount: {},
  //中远海/泛亚电扇客户应收详情
  shipCompanyDetailList:{},
  //中远海/泛亚电扇客户应收详情总计
  shipCompanyDetailAmount:{},
  //付款申请单_付款列表
  payablePayLogList:{},
  //付款申请单_开票列表
  payableInvoiceList:{},
  //总(子)公司财务利润表
  financeProfitList:{},
  //总(子)公司财务利润总计
  financeProfitAmount:{},
  //业务毛利列表
  salesProfitList:{},
  //业务毛利总计
  salesProfitAmount:{},
  //一次性客户报表（获取发票申请记录）
  onceCusInvoiceLogList:{},
  //一次性客户报表（获取未进行发票申请记录）
  onceCusNotInvoiceApplyLogList:{},
  //客户应收获取收款单详情
  customerReceivableDetailList:{},
  //一次性客户账单获取收款单详情
  onceCustomerReceivableDetailList:{},


  //<<<<<<<<<<<<<<<<<<<<<------------应收申请------------>>>>>>>>>>>>>>>>>>>>>>>>
  //收款对象下拉列表数据
  //customList: {}
  customList1: {},
  customList2: {},

  //应收申请管理(初始化/搜索)
  receivablelists: {},
  // 现结结算单
  settlementLists: {},
  //查看详情
  receivableRequisitionDetailList: {},
  //新增申请
  saveReceivableRequisition: {},
  //修改申请
  updReceivableRequisition: {},
  //费用类型下拉列表数据
  costTypeList: {},
  //待引入表格数据
  receivableImportPageList: {},
  //编辑收款-收款历史-表格数据
  acountList: {},
  //编辑收款-新增收款
  saveReceivableLog: {},
  //编辑收款-新增收款2
  saveReceivableLogPortion: {},
  //编辑收款-编辑收款历史
  updateReceivableLog: {},
  //开票复核-表格数据
  receivableInvoice: {},
  receivableInvoceAndLogById: {},
  //开票复核-新增开票
  saveReceivableInvoice: {},
  //已引入总金额
  importedSumAmount: {},

  //<<<<<<<<<<<<<<<<<<<<<------------应收明细报表------------>>>>>>>>>>>>>>>>>>>>>>>>
  //表格数据
  recCashList: {},
  //总应收
  recCashSumAmount: {},
  //杂费报销申请(初始化/搜索)
  payCashListRequests: {},
  //杂费报销申请(新增)
  addPayCashReqest:{},
  //杂费报销申请(修改)
  modifyPayCashRequest:{},
  //杂费报销申请(查看详情)
  payCashRquestDetails: {},
  //杂费报销申请_引入应付款_初始化
  payCashImportPageList: {},
  //杂费报销申请(移出)
  outPortPayCash: {},
  //杂费报销申请(统计总金额)
  payCashDetailSumAmount: {},
  //业务员利润表
  salesManProfitList:{},
  //业务员利润统计
  salesManProfitAmount:{},
  //现结集装箱列表
  cashSettlementList:{},
  //现结集装箱列表的查询初始化数据
  cashSettlementQuery:{},
  //一次性客户（账单）
  onceCustomerBill: {},

  //一次性客户（账单）详情
  onceCustomerBillDetail:{},
}


const getters = {
  //子公司下拉框
  dropDwonList(state){
    return state.dropDwonList
  },
  //物流公司下拉框
  logisticsDropDwon(state){
    return state.logisticsDropDwon
  },

  //结算比例设置(初始化/搜索)
  settlementRateList(state) {
    return state.settlementRateList
  },
  //司机代收款管理(初始化/搜索)
  driverAgencyfundlist(state) {
    return state.driverAgencyfundlist
  },
  //司机代收款管理(统计金额)
  driverAmount(state) {
    return state.driverAmount
  },
  driverInAndOut(state) {
    return state.dirverInandOut
  },
  //一次性客户报表(初始化/搜索)
  onceCustomerList(state) {
    return state.onceCustomerList
  },
  //一次性客户报表(统计总金额)
  onceCustomerSumAmount(state) {
    return state.onceCustomerSumAmount
  },
  //应付杂费管理(初始化/搜索)
  payCashList(state) {
    return state.payCashList
  },
  //应付明细报表(初始化/搜索)
  payRequisitionReportList(state) {
    return state.payRequisitionReportList
  },
  //付款申请单管理_引入应付款_初始化
  importPageList(state) {
    return state.importPageList
  },
  //应付杂费管理(统计总金额)
  payCashSumAmount(state) {
    return state.payCashSumAmount
  },
  //客户应收初始化页面
  customerReceivable(state) {
    return state.customerReceivable
  },
  //客户应收统计的总金额
  customerAmount(state) {
    return state.customerAmount
  },
  //司机提前结算(预支执行_初始化/搜索)
  advanceList(state) {
    return state.advanceList
  },
  //司机提前结算(预支执行_查看详情)
  detailDataList(state) {
    return state.detailDataList
  },
  //司机提前结算(预支历史_初始化/搜索)
  hisDataList(state) {
    return state.hisDataList
  },
  //司机提前结算(预支)
  advanced(state) {
    return state.advanced
  },
  //客户应收详情
  customerDetail(state) {
    return state.customerDetail
  },
  //客户应收详情的总金额
  customerDetailAmount(state) {
    return state.customerDetailAmount
  },
  //子公司应付
  childCompanyList(state) {
    return state.childCompanyList
  },
  //子公司应付总额
  childCompanyAmount(state) {
    return state.childCompanyAmount
  },
  //子公司详情
  childCompanyDetail(state) {
    return state.childCompanyDetail
  },

  //子公司详情总额
  childCompanyDetailAmount(state) {
    return state.childCompanyDetailAmount
  },

  //物流公司不保底应付
  logisticsList(state) {
    return state.logisticsList
  },
  //物流公司不保底应付总额
  logisticsAmount(state) {
    return state.logisticsAmount
  },

  //物流公司不保底详情
  logisticsDetail(state) {
    return state.logisticsDetail
  },
  //物流公司不保底详情总额
  logisticsDetailAmount(state) {
    return state.logisticsDetailAmount
  },
  //物流公司保底应付
  logisticsTwoList(state) {
    return state.logisticsTwoList
  },
  //物流公司保底应付总额
  logisticsTwoAmount(state) {
    return state.logisticsTwoAmount
  },

  //物流公司保底详情
  logisticsTwoDetail(state) {
    return state.logisticsTwoDetail
  },
  //物流公司保底详情总额
  logisticsTwoDetailAmount(state) {
    return state.logisticsTwoDetailAmount
  },
  //司机报表_初始化/查询
  driverReport(state) {
    return state.driverReport
  },
  //司机报表_统计总金额
  driverReportAmount(state) {
    return state.driverReportAmount
  },
  //付款申请单管理(初始化/搜索)
  requisitionList(state) {
    return state.requisitionlists
  },
  //付款申请单管理(查看详情)
  requisitiondetailList(state) {
    return state.requisitiondetails
  },
  //付款申请单管理(移出应付款)
  outPort(state) {
    return state.outPort
  },
  //付款申请单管理(统计总金额)
  requisitionDetailSumAmount(state) {
    return state.requisitionDetailSumAmount
  },
  cabinetProfitList(state) {
    return state.cabinetProfitList
  },
  customerProfitList(state) {
    return state.customerProfitList
  },
  childCompanyProfitList(state) {
    return state.childCompanyProfitList
  },
  advancedDetailAmount(state){
    return state.advanceDateilAmount;
  },
  cabinetProfitAmount(state){
    return state.cabinetProfitAmount;
  },
  customerProfitAmount(state){
    return state.customerProfitAmount;
  },
  childCompanyProfitAmount(state){
    return state.childCompanyProfitAmount;
  },
  //中远海/泛亚电商数据列表
  shipCompanyList(state) {
    return state.shipCompanyList
  },
  //中远海/泛亚电商总计
  shipCompanyAmount(state) {
    return state.shipCompanyAmount
  },
  //中远海/泛亚电商应收详情
  shipCompanyDetailList(state) {
    return state.shipCompanyDetailList
  },
  //中远海/泛亚电商应收详情总计
  shipCompanyDetailAmount(state) {
    return state.shipCompanyDetailAmount
  },
  //付款申请单_付款列表
  payablePayLogList(state) {
    return state.payablePayLogList
  },
  payableInvoiceList(state){
    return state.payableInvoiceList;
  },

  //应收申请管理(初始化/搜索)
  receivableList(state) {
    return state.receivablelists
  },
  // 现结结算单
  settlementList(state){
    return state.settlementLists
  },
  //应收申请管理(查看详情)
  receivableRequisitionDetailList(state) {
    return state.receivableRequisitionDetailList
  },
  //应收申请-费用类型
  costTypeList(state) {
    return state.costTypeList
  },
  //应收申请-待引入数据
  receivableImportPageList(state) {
    return state.receivableImportPageList
  },
  //编辑收款-收款历史-表格数据
  acountList(state) {
    return state.acountList
  },
  //编辑收款-编辑收款历史
  updateReceivableLog(state) {
    return state.updateReceivableLog
  },

  //开票复核-表格数据
  receivableInvoice(state) {
    return state.receivableInvoice
  },
  receivableInvoceAndLogById(state) {
    return state.receivableInvoceAndLogById
  },

  //获取总(子)公司财务利润表
  financeProfitList(state){
    return state.financeProfitList;
  },

  //获取总(子)公司财务利润表
  financeProfitAmount(state){
    return state.financeProfitAmount;
  },

  //业务毛利列表
  salesProfitList(state){
    return state.salesProfitList;
  },

  //业务毛利总计
  salesProfitAmount(state){
    return state.salesProfitAmount;
  },

  //一次性客户报表（获取发票申请记录）
  onceCusInvoiceLogList(state){
    return state.onceCusInvoiceLogList
  },

  //一次性客户报表（获取未进行发票申请记录）
  onceCusNotInvoiceApplyLogList(state){
    return state.onceCusNotInvoiceApplyLogList
  },

  //客户应收收款单详情
  customerReceivableDetailList(state){
    return state.customerReceivableDetailList
  },

  //获取一次性客户收款单详情
  onceCustomerReceivableDetailList(state){
    return state.onceCustomerReceivableDetailList
  },

  // //应收申请-收款对象
  // customList(state) {
  //   return state.customList
  // }
  customList1(state) {
    return state.customList1
  },
  customList2(state) {
    return state.customList2
  },

  //应收报表
  //表格数据
  recCashList(state) {
    return state.recCashList
  },
  //总应收
  recCashSumAmount(state) {
    return state.recCashSumAmount
  },
  //已引入总金额
  importedSumAmount(state) {
    return state.importedSumAmount
  },
  //杂费报销申请(初始化/搜索)
  payCashListRequest(state) {
    return state.payCashListRequests
  },
  //杂费报销申请(查看详情)
  payCashRequestDetailList(state) {
    return state.payCashRquestDetails
  },
  //杂费报销申请_引入应付款_初始化
  payCashImportPageList(state){
    return state.payCashImportPageList
  },
  //业务员利润报表(初始化)
  salesManProfitList(state){
    return state.salesManProfitList
  },
  //业务员利润报表(总金额)
  salesManProfitAmount(state){
    return state.salesManProfitAmount;
  },
  //现结集装箱列表
  cashSettlementList(state){
    return state.cashSettlementList
  },
  //现结集装箱列表的查询初始化数据
  cashSettlementQuery(state){
    return state.cashSettlementQuery
  },
  //一次性客户（账单）查询初始化数据
  onceCustomerBill(state){
    return state.onceCustomerBill
  },

  //一次性客户（账单）详情查询初始化数据
  onceCustomerBillDetail(state){
    return state.onceCustomerBillDetail;
  }

}

const actions = {
  //获取物流公司下拉框
  getLogisticsDropDwon({commit}, param){
    return api.getLogisticsDropDwonApi(param).then((res) => {
      commit('LOGISTICSDROPDWON', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //结算比例设置(初始化/搜索)
  getSettlementRateList({commit}, param){
    return api.getSettlementRateListApi(param).then((res) => {
      commit('SETTLEMENTRATELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //结算比例设置(修改)
  updateSettlementRate({commit}, param){
    return api.updateSettlementRateApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //司机代收款管理(初始化/搜索)
  //司机/客户代收款管理
  getDriverAgencyfundList({commit}, param){
    return api.getDriverPageListApi(param).then((res) => {
      commit('DRIVERAGENCYFUNDLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //司机代收款管理(统计金额)
  //司机/客户代收管理总金额
  getDriverAmount({commit}, param){
    return api.getDriverAmountApi(param).then((res) => {
      commit('DRIVERAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //司机/客户代收管理确认收到或者确认付出
  getDrivertInAndOut({commit}, param){
    return api.getDriverInAndOutApi(param).then((res) => {
      commit('DRIVERINANDOUT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //一次性客户报表(初始化/搜索)
  getOnceCusList({commit}, param){
    return api.getOnceCustomerListApi(param).then((res) => {
      commit('ONCECUSTOMERLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //一次性客户报表(统计总金额)
  getOnceCustomerSumAmount({commit}, param){
    return api.getOnceCustomerSumAmountApi(param).then((res) => {
      commit('ONCECUSTOMERSUMAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //应付杂费管理(初始化/搜索)
  getPayCashList({commit}, param){
    return api.getPayCashListApi(param).then((res) => {
      commit('PAYCASHLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //应付明细报表(初始化/搜索)
  getPayRequisitionReportList({commit}, param){
    return api.getPayRequisitionReportListApi(param).then((res) => {
      console.log(res.data.data)
      commit('PAYREQUISITIONREPORTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //付款申请单管理_引入应付款_初始化
  getImportPageList({commit}, param){
    return api.getImportPageListApi(param).then((res) => {
      commit('IMPORTPAGELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //应付杂费管理(统计总金额)
  getPayCashSumAmount({commit}, param){
    return api.getPayCashSumAmountApi(param).then((res) => {
      commit('PAYCASHSUMAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //应付杂费管理(统计总金额)
  getPayRequisitionReportSumAmount({commit}, param){
    return api.getPayRequisitionReportSumAmountApi(param).then((res) => {
      commit('PAYREQUISITIONREPORTSUMAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //客户应收
  getCustomerReceivable({commit}, param){
    return api.getCustomerReceivableApi(param).then((res) => {
      commit('CUSTOMERRECEIVABLE', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //客户应收的总金额
  getCustomerAmount({commit}, param){
    return api.getCustomerAmountApi(param).then((res) => {
      commit('CUSTOMERAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //司机提前结算(预支执行_初始化/搜索)
  getAdvanceList({commit}, param){
    return api.getAdvanceListApi(param).then((res) => {
      commit('ADVANCELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //司机提前结算(预支执行_查看详情)
  getDetailDataList({commit}, param){
    return api.getDetailDataListApi(param).then((res) => {
      commit('DETAILDATALIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //司机提前结算(预支历史_初始化/搜索)
  getHisDataList({commit}, param){
    return api.getHisDataListApi(param).then((res) => {
      commit('HISDATALIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //司机提前结算(预支)
  getAdvanced({commit}, param){
    return api.advanceApi(param).then((res) => {
      commit('ADVANCED', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //客户应收详情
  getCustomerDetail({commit}, param){
    return api.getCustomerDetailApi(param).then((res) => {
      commit('CUSTOMERDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //客户详情总金额
  getCustomerDetailAmount({commit}, param){
    return api.getCustomerDetailAmountApi(param).then((res) => {
      commit('CUSTOMERDETAILAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //子公司应付
  getChildCompanyList({commit}, param){
    return api.getChildCompanyListApi(param).then((res) => {
      commit('CHILDCOMPANYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //子公司应付总额
  getChildCompanyAmount({commit}, param){
    return api.getChildCompanyAmountApi(param).then((res) => {
      commit('CHILDCOMPANYAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //子公司详情
  getChildCompanyDetail({commit}, param){
    return api.getChildCompanyDetailApi(param).then((res) => {
      commit('CHILDCOMPANYDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //子公司详情总额
  getChildCompanyDetailAmount({commit}, param){
    return api.getChildCompanyDetaiAmountApi(param).then((res) => {
      commit('CHILDCOMPANYDETAILAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //物流公司不保底应付
  getLogisticsList({commit}, param){
    return api.getLogisticsListApi(param).then((res) => {
      commit('LOGISTICSLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //物流公司不保底应付总额
  getLogisticsAmount({commit}, param){
    return api.getLogisticsAmountApi(param).then((res) => {
      commit('LOGISTICSAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //物流公司不保底详情
  getLogisticsDetail({commit}, param){
    return api.getLogisticsDetailApi(param).then((res) => {
      commit('LOGISTICSDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //物流公司不保底详情总额
  getLogisticsDetailAmount({commit}, param){
    return api.getLogisticsDetaiAmountlApi(param).then((res) => {
      commit('LOGISTICSDETAILAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //物流公司保底应付
  getLogisticsTwoList({commit}, param){
    return api.getLogisticsTwoListApi(param).then((res) => {
      commit('LOGISTICSTWOLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //物流公司保底应付总额
  getLogisticsTwoAmount({commit}, param){
    return api.getLogisticsTwoAmountApi(param).then((res) => {
      commit('LOGISTICSTWOAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //物流公司保底详情
  getLogisticsTwoDetail({commit}, param){
    return api.getLogisticsTwoDetailApi(param).then((res) => {
      commit('LOGISTICSTWODETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //物流公司保底详情总额
  getLogisticsTwoDetailAmount({commit}, param){
    return api.getLogisticsTwoDetaiAmountlApi(param).then((res) => {
      commit('LOGISTICSTWODETAILAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //司机报表_初始化/查询
  getDriverReport({commit},param){
    return api.getDriverReportApi(param).then((res) =>{
      commit('DRIVERREPORT',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //司机报表_总金额
  getDriverReportAmount({commit},param){
    return api.getDriverReportAmountlApi(param).then((res) =>{
      commit('DRIVERREPORTAMOUNT',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //收款申请单管理(初始化/搜索)
  getReceivableList({commit}, param){
    return api.getReceivablePageListApi(param).then((res) => {
      commit('RECEIVABLELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 现结结算单
  getSettlementList({commit}, param){
    return api.getSettlementListApi(param).then((res) => {
      commit('SETTLEMENTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //付款申请单管理(初始化/搜索)
  getRequisitionList({commit}, param){
    return api.getRequisitionPageListApi(param).then((res) => {
      commit('REQUISITIONLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //付款申请单管理(新增申请单)
  addRequisition({commit}, param){
    return api.addRequisitionApi(param).then((res) => {
      commit('ADDREQUISITION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //付款申请单管理(申请单修改)
  modifyRequisition({commit}, param){
    return api.updateRequisitionApi(param).then((res) => {
      commit('MODIFYREQUISITION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //付款申请单管理(申请单删除)
  removeRequisition({commit}, param){
    return api.removeRequisitionApi(param).then((res) => {
      commit('REMOVEREQUISITION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //付款申请单管理(付款)
  payRequisition({commit}, param){
    return api.payRequisitionApi(param).then((res) => {
      commit('PAYREQUISITION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //付款申请单管理(查看详情)
  getRequisitionDetail({commit}, param){
    return api.getRequisitionDetailApi(param).then((res) => {
      commit('REQUISITIONDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //付款申请单管理(引入应付杂费_引入)
  saveImport({commit}, param){
    return api.saveImportApi(param).then((res) => {
      commit('SAVEIMPORT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //付款申请单管理(引入应付杂费_移出)
  outPort({commit}, param){
    return api.outPortApi(param).then((res) => {
      commit('OUTPORT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //付款申请单明细(统计总金额)
  getRequisitionDetailSumAmount({commit}, param){
    return api.getRequisitionDetailSumAmountApi(param).then((res) => {
      commit('REQUISITIONDETAILSUMAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },


  //集装箱利润列表
  getCabinetProfitList({commit}, param){
    return api.getCabinetProfitListApi(param).then((res) => {
      commit('CABINETPROFITLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //客户利润列表
  getCustomerProfitList({commit}, param){
    return api.getCustomerProfitListApi(param).then((res) => {
      commit('CUSTOMERPROFITLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //子公司利润列表
  getChildCompanyProfitList({commit}, param){
    return api.getChildCompanyProfitListApi(param).then((res) => {
      commit('CHILDCOMPANYPROFITLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //七天详情总计
  getAdvancedDetailAmount({commit}, param){
    return api.getDetailAmountApi(param).then((res) => {
      if (res.data.data) {
        commit('ADVANCEDDETAILAMOUNT', res.data.data)
      } else {
        commit('ADVANCEDDETAILAMOUNT', 0)
      }
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //集装箱利润总计
  getCabinetProfitAmount({commit}, param){
    return api.getCabinetProfitAmountApi(param).then((res) => {
      commit('CABINETPROFITAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //客户利润总计
  getCustomerProfitAmount({commit}, param){
    return api.getCustomerProfitAmountApi(param).then((res) => {
      commit('CUSTOMERPROFITAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //子公司利润总计
  getChildCompanyProfitAmount({commit}, param){
    return api.getChildCompanyProfitAmountApi(param).then((res) => {
      commit('CHILDCOMPANYPROFITAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //中远海/泛亚电商客户应收
  getShipCompanyList({commit}, param){
    return api.getShipCompanyListApi(param).then((res) => {
      commit('SHIPCOMPANYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //中远海/泛亚电商总计
  getShipCompanyAmount({commit}, param){
    return api.getShipCompanyAmountApi(param).then((res) => {
      commit('SHIPCOMPANYAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //中远海/泛亚电商应收详情
  getShipCompanyDetailList({commit}, param){
    return api.getShipCompanyDetailListApi(param).then((res) => {
      commit('SHIPCOMPANYDETAILLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //中远海/泛亚电商应收详情总计
  getShipCompanyDetailAmount({commit}, param){
    return api.getShipCompanyDetailAmountApi(param).then((res) => {
      commit('SHIPCOMPANYDETAILAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //付款申请单_付款列表
  getPayablePayLogList({commit}, param){
    return api.getPayablePayLogListApi(param).then((res) => {
      commit('PAYABLEPAYLOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //付款申请单_开票列表
  getPayableInvoiceList({commit}, param){
    return api.getPayableInvoiceListApi(param).then((res) => {
      commit('PAYABLEINVOICELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //应收申请
  //新增申请
  saveReceivableRequisition({commit}, param){
    return api.saveReceivableRequisitionApi(param).then((res) => {
      commit('SAVERECEIVABLEREQUISITION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //修改申请
  updReceivableRequisition({commit}, param){
    return api.updReceivableRequisitionApi(param).then((res) => {
      commit('UPDRECEIVABLEREQUISITION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //查看详情
  getReceivableRequisitionDetailList({commit}, param){
    return api.getReceivableRequisitionDetailListApi(param).then((res) => {
      commit('RECEIVABLEREQUISITIONDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //费用类型
  getCostTypeList({commit}, param){
    return api.getCostTypeListApi(param).then((res) => {
      commit('COSTTYPELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //待引入
  getReceivableImportPageList({commit}, param){
    return api.getReceivableImportPageListApi(param).then((res) => {
      commit('RECEIVABLEIMPORTPAGELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //已引入总金额
  getImportedSumAmount({commit}, param){
  return api.getImportedSumAmountApi(param).then((res) => {
    commit('IMPORTEDSUMAMOUNT', res.data.data)
    return new Promise((resolve, reject) => {
      resolve(res.data);
    })
  })
},


  //编辑收款-收款历史-表格数据
  getAcountList({commit}, param){
    return api.getAcountListApi(param).then((res) => {
      commit('ACOUNTLIST', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //编辑收款-编辑收款
  updateReceivableLog({commit}, param){
    return api.updateReceivableLogApi(param).then((res) => {
      commit('UPDATERECEIVABLELOG', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //编辑收款-新增收款-全部收款
  saveReceivableLog({commit}, param){
    return api.saveReceivableRequisitionLogApi(param).then((res) => {
      commit('SAVERECEIVABLELOG', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //编辑收款-新增收款-部分收款
  saveReceivableLogPortion({commit}, param){
    return api.saveReceivableRequisitionLogPortionApi(param).then((res) => {
      commit('SAVERECEIVABLELOGPORTION', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //开票复核-表格数据
  getReceivableInvoice({commit}, param){
    return api.getReceivableInvoiceApi(param).then((res) => {
      commit('RECEIVABLEINVOICE', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  getReceivableInvoceAndLogById({commit}, param){
    return api.getReceivableInvoceAndLogByIdApi(param).then((res) => {
      commit('RECEIVABLEINVOICEANDLOGBYID', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //开票复核-开票新增
  saveReceivableInvoice({commit}, param){
    return api.saveReceivableInvoiceApi(param).then((res) => {
      commit('SAVERECEIVABLEINVOICE', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //总(子)公司财务利润表
  getFinanceProfitList({commit}, param){
    return api.getFinanceProfitListApi(param).then((res) => {
      commit('FINANCEPROFITLIST', res.data.data);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //总(子)公司财务利润总计
  getFinanceProfitAmount({commit}, param){
    return api.getFinanceProfitAmountApi(param).then((res) => {
      commit('FINANCEPROFITAMOUNT', res.data.data);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //业务毛利列表
  getSalesProfitList({commit}, param){
    return api.getSalesProfitListApi(param).then((res) => {
      commit('SALESPROFITLIST', res.data.data);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //业务毛利总计
  getSalesProfitAmount({commit}, param){
    return api.getSalesProfitAmountApi(param).then((res) => {
      commit('SALESPROFITAMOUNT', res.data.data);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //应收报表
  //表格数据
  getRecCashList({commit}, param){
    return api.getRecCashListApi(param).then((res) => {
      commit('RECCASHLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //总应收
  getRecCashSumAmount({commit}, param){
    return api.getRecCashSumAmountApi(param).then((res) => {
      commit('RECCASHSUMAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  // //应收申请-收款对象
  // getCustomList({commit}, param){
  //   return api.customListApi(param).then((res) => {
  //     commit('CUSTOMLIST', res.data.data)
  //     return new Promise((resolve, reject) => {
  //       resolve(res.data);
  //     })
  //   })
  // }
  getCustomList1({commit}, param){
    return api.getCustomList1Api(param).then((res) => {
      commit('CUSTOMLIST1', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  getCustomList2({commit}, param){
    return api.getCustomList2Api(param).then((res) => {
      commit('CUSTOMLIST2', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(初始化/搜索)
  getPayCashRequestList({commit}, param){
    return api.getPayCashRequestListApi(param).then((res) => {
      commit('PAYCASHLISTREQUEST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(新增申请单)
  addPayCashReqest({commit}, param){
    return api.addPayCashReqestApi(param).then((res) => {
      commit('ADDPAYCASHREQEST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(申请单修改)
  modifyPayCashRequest({commit}, param){
    return api.updatePayCashRequestApi(param).then((res) => {
      commit('MODIFYPAYCASHREQUEST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(申请单删除)
  removePayCashRequest({commit}, param){
    return api.removePayCashRequestApi(param).then((res) => {
      commit('REMOVEPAYCASHREQUEST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请_引入应付款_初始化
  getPayCashImportPageList({commit}, param){
    return api.getPayCashImportPageListApi(param).then((res) => {
      commit('PAYCASHIMPORTPAGELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(查看详情)
  getPayCashRquestDetail({commit}, param){
    return api.getPayCashRquestDetailApi(param).then((res) => {
      commit('PAYCASHRQUESTDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(引入应付杂费_引入)
  importPayCash({commit}, param){
    return api.importPayCashApi(param).then((res) => {
      commit('IMPORTPAYCASH', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(引入应付杂费_移出)
  outPortPayCash({commit}, param){
    return api.outPortPayCashApi(param).then((res) => {
      commit('OUTPORTPAYCASH', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(付款)
  payPayCashRequest({commit}, param){
    return api.payPayCashRequestApi(param).then((res) => {
      commit('PAYPAYCASHREQUEST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //杂费报销申请(统计总金额)
  getPayCashDetailSumAmount({commit}, param){
    return api.getPayCashDetailSumAmountApi(param).then((res) => {
      commit('PAYCASHDETAILSUMAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 业务员利润表
  getSalesManProfitList({commit}, param){
    return api.getSalesManProfitListApi(param).then((res) => {
      commit('SALESMANPROFITLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 业务员利润表总计
  getSalesManProfitAmount({commit}, param){
    return api.getSalesManProfitAmountApi(param).then((res) => {
      commit('SALESMANPROFITAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 现结集装箱列表
  getCashSettlement({commit}, param){
    return api.cashSettlementApi(param).then((res) => {
      commit('CASHSETTLEMENTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 现结集装箱列表的查询初始化数据
  getCabinetQuery({commit}, param){
    return api.getCabinetQueryApi(param).then((res) => {
      commit('CASHSETTLEMENTQUERY', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
// 获取运费明细
  getCostListByCabinetId({commit}, param){
    return api.getCostListByCabinetIdApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //申请现结保存
  saveApplyCashSettled({commit}, param){
    return api.saveApplyCashSettledApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //根据司机id获取申请现结单
  getApplyCashSettleDetail({commit}, param){
    return api.getApplyCashSettleDetailApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /* 现结支付接口 */
  getcashierPays({ commit }, params) {
    return api.getcashierPay(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  // 一次性客户(账单)
  getOnceCustomerBillList({commit}, param){
    return api.getOnceCustomerBillApi(param).then((res) => {
      commit('ONCECUSTOMERBILLLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  // 一次性客户(账单)详情
  getOnceCustomerBillDetailList({commit}, param){
    return api.getOnceCustomerBillDetailApi(param).then((res) => {
      commit('ONCECUSTOMERBILLDETAILLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //一次性客户报表（获取发票申请记录）
  getOnceCusInvoiceLogList({commit}, param){
    return api.getOnceCusInvoiceLogApi(param).then((res) => {
      commit('ONCECUSINVOICELOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //一次性客户报表（获取未进行发票申请记录）
  getOnceCusNotInvoiceApplyLogList({commit}, param){
    return api.getOnceCusNotInvoiceApplyLogApi(param).then((res) => {
      commit('ONCECUSNOTINVOICEAPPLYLOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //一次性客户报表（获取未进行发票申请记录）
  getCustomerReceivableDetailList({commit}, param){
    return api.getCustomerReceivableDetailApi(param).then((res) => {
      commit('CUSTOMERRECEIVABLEDETAILLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },


  //一次性客户账单（获取未进行发票申请记录）
  getOnceCustomerReceivableDetailList({commit}, param){
  return api.onceCusGetReceivableDetailApi(param).then((res) => {
    commit('ONCECUSTOMERRECEIVABLEDETAILLIST', res.data.data)
    return new Promise((resolve, reject) => {
      resolve(res.data);
    })
  })
},

}


const mutations = {
  //获取子公司公司下拉框
  DROPDWONLIST(state, res) {
    state.dropDwonList = res
  },
  //获取物流公司下拉框
  LOGISTICSDROPDWON(state, res) {
    state.logisticsDropDwon = res
  },

  //结算比例设置(初始化/搜索)
  SETTLEMENTRATELIST(state, res) {
    state.settlementRateList = res
  },
  //结算比例设置(修改)
  DRIVERAGENCYFUNDLIST(state, res) {
    state.driverAgencyfundlist = res
  },
  //司机代收款管理(统计金额)
  DRIVERAMOUNT(state, res) {
    state.driverAmount = res
  },
  DRIVERINANDOUT(state, res) {
    state.dirverInandOut = res
  },
  //一次性客户报表(初始化/搜索)
  ONCECUSTOMERLIST(state, res) {
    state.onceCustomerList = res
  },
  //一次性客户报表(统计总金额)
  ONCECUSTOMERSUMAMOUNT(state, res) {
    state.onceCustomerSumAmount = res
  },
  //应付杂费管理(初始化/搜索)
  PAYCASHLIST(state, res) {
    state.payCashList = res
  },
  //应附明细报表(初始化/搜索)
  PAYREQUISITIONREPORTLIST(state, res) {
    state.payRequisitionReportList = res
  },
  //付款申请单管理_引入应付款_初始化
  IMPORTPAGELIST(state, res) {
    state.importPageList = res
  },
  //应付杂费管理(统计总金额)
  PAYCASHSUMAMOUNT(state, res) {
    state.payCashSumAmount = res
  },
  //应付明细报表(统计总金额)
  PAYREQUISITIONREPORTSUMAMOUNT(state, res) {
  state.payRequisitionReportSumAmount = res
  },
  //客户应收（初始化）
  CUSTOMERRECEIVABLE(state, res){
    state.customerReceivable = res
  },
  //客户统计的金额
  CUSTOMERAMOUNT(state, res){
    state.customerAmount = res
  },
  //司机提前结算(预支执行_初始化/搜索)
  ADVANCELIST(state, res){
    state.advanceList = res
  },
  //司机提前结算(预支执行_查看详情)
  DETAILDATALIST(state, res){
    state.detailDataList = res
  },
  //司机提前结算(预支历史_初始化/搜索)
  HISDATALIST(state, res){
    state.hisDataList = res
  },
  //司机提前结算(预支)
  ADVANCED(state, res){
    state.advanced = res
  },
  //客户应收详情
  CUSTOMERDETAIL(state, res){
    state.customerDetail = res
  },
  //客户应收详情总金额
  CUSTOMERDETAILAMOUNT(state, res){
    state.customerDetailAmount = res
  },
  //子公司应付
  CHILDCOMPANYLIST(state, res){
    state.childCompanyList = res
  },
  //子公司应付总额
  CHILDCOMPANYAMOUNT(state, res){
    state.childCompanyAmount = res
  },
  //子公司详情
  CHILDCOMPANYDETAIL(state, res){
    state.childCompanyDetail = res
  },
  //子公司详情总额
  CHILDCOMPANYDETAILAMOUNT(state, res){
    state.childCompanyDetailAmount = res
  },

  //物流公司不保底应付
  LOGISTICSLIST(state, res){
    state.logisticsList = res
  },

  //物流公司不保底应付总额
  LOGISTICSAMOUNT(state, res){
    state.logisticsAmount = res
  },
  //物流公司不保底应付详情
  LOGISTICSDETAIL(state, res){
    state.logisticsDetail = res
  },
  //物流公司不保底应付详情总额
  LOGISTICSDETAILAMOUNT(state, res){
    state.logisticsDetailAmount = res
  },

  //物流公司保底应付
  LOGISTICSTWOLIST(state, res){
    state.logisticsTwoList = res
  },
  //物流公司保底应付总额
  LOGISTICSTWOAMOUNT(state, res){
    state.logisticsTwoAmount = res
  },
  //物流公司保底应付详情
  LOGISTICSTWODETAIL(state, res){
    state.logisticsTwoDetail = res
  },
  //物流公司保底应付详情总额
  LOGISTICSTWODETAILAMOUNT(state, res){
    state.logisticsTwoDetailAmount = res
  },
  //司机报表_初始化/查询
  DRIVERREPORT(state, res){
    state.driverReport = res
  },
  //司机报表_统计总金额
  DRIVERREPORTAMOUNT(state, res){
    state.driverReportAmount = res
  },


  //应收申请管理(初始化/搜索)
  RECEIVABLELIST(state, res){
    state.receivablelists = res
  },
  // 现结结算单
  SETTLEMENTLIST(state, res){
    state.settlementLists = res
  },
  //付款申请单管理(初始化/搜索)
  REQUISITIONLIST(state, res){
    state.requisitionlists = res
  },
  //付款申请单管理(查看详情)
  REQUISITIONDETAIL(state, res){
    state.requisitiondetails = res
  },
  //付款申请单管理(移出)
  OUTPORT(state, res){
    state.outport = res
  },
  //付款申请单详情(统计总金额)
  REQUISITIONDETAILSUMAMOUNT(state, res) {
    state.requisitionDetailSumAmount = res
  },
  CABINETPROFITLIST(state, res){
    state.cabinetProfitList = res;
  },
  CUSTOMERPROFITLIST(state, res){
    state.customerProfitList = res;
  },
  CHILDCOMPANYPROFITLIST(state, res){
    state.childCompanyProfitList = res;
  },
  ADVANCEDDETAILAMOUNT(state, res){
    state.advanceDateilAmount = res;
  },
  CABINETPROFITAMOUNT(state, res){
    state.cabinetProfitAmount = res;
  },
  CUSTOMERPROFITAMOUNT(state, res){
    state.customerProfitAmount = res;
  },
  CHILDCOMPANYPROFITAMOUNT(state, res){
    state.childCompanyProfitAmount = res;
  },
  SHIPCOMPANYLIST(state, res){
    state.shipCompanyList = res;
  },
  SHIPCOMPANYAMOUNT(state, res){
    state.shipCompanyAmount = res
  },
  SHIPCOMPANYDETAILLIST(state,res){
    state.shipCompanyDetailList = res;
  },
  SHIPCOMPANYDETAILAMOUNT(state,res){
    state.shipCompanyDetailAmount = res;
  },
  //付款申请管理(修改申请单)
  MODIFYREQUISITION(state,res){
    state.modifyRequisition = res;
  },
  //付款申请管理(新增申请单)
  ADDREQUISITION(state,res){
    state.addRequisition = res;
  },
  //付款申请管理(收付款)
  PAYABLEPAYLOGLIST(state,res){
    state.payablePayLogList = res;
  },
  //付款申请管理(开收票)
  PAYABLEINVOICELIST(state,res){
    state.payableInvoiceList = res;
  },
  //应收申请
  //收款对象
  // CUSTOMLIST(state, res) {
  //   state.customList = res
  // }
  CUSTOMLIST1(state, res) {
    state.customList1 = res
  },
  CUSTOMLIST2(state, res) {
    state.customList2 = res
  },

  //新增申请
  SAVERECEIVABLEREQUISITION(state,res){
    state.saveReceivableRequisition = res;
  },
  //修改申请
  UPDRECEIVABLEREQUISITION(state,res){
    state.updReceivableRequisition = res;
  },
  //查看详情
  RECEIVABLEREQUISITIONDETAIL(state, res){
    state.receivableRequisitionDetailList = res
  },
  //费用类型
  COSTTYPELIST(state, res){
    state.costTypeList = res
  },
  //待引入表格数据
  RECEIVABLEIMPORTPAGELIST(state, res){
    state.receivableImportPageList = res
  },

  //已引入总金额
  IMPORTEDSUMAMOUNT(state, res){
    state.importedSumAmount = res
  },

  //编辑收款-收款历史-表格数据
  ACOUNTLIST(state, res){
    state.acountList = res
  },
  //编辑收款-编辑收款
  UPDATERECEIVABLELOG(state, res){
    state.updateReceivableLog = res
  },
  //编辑收款-收款历史-表格数据
  SAVERECEIVABLELOG(state, res){
    state.saveReceivableLog = res
  },
  //编辑收款-收款历史-表格数据
  SAVERECEIVABLELOGPORTION(state, res){
    state.saveReceivableLogPortion = res
  },

  //开票复核-表格数据
  RECEIVABLEINVOICE(state, res){
    state.receivableInvoice = res
  },
  RECEIVABLEINVOICEANDLOGBYID(state, res){
    state.receivableInvoceAndLogById = res
  },

  //开票复核-开票新增
  SAVERECEIVABLEINVOICE(state, res){
    state.saveReceivableInvoice = res
  },

  FINANCEPROFITLIST(stare,res){
    stare.financeProfitList = res;
  },

  FINANCEPROFITAMOUNT(stare,res){
    stare.financeProfitAmount = res;
  },

  SALESPROFITLIST(stare,res){
    stare.salesProfitList = res;
  },

  SALESPROFITAMOUNT(stare,res){
    stare.salesProfitAmount = res;
  },

  //应收报表
  //表格数据
  RECCASHLIST(state, res){
    state.recCashList = res
  },

  //总应收
  RECCASHSUMAMOUNT(state, res){
    state.recCashSumAmount = res
  },
  //杂费报销申请(初始化/搜索)
  PAYCASHLISTREQUEST(state, res){
    state.payCashListRequests = res
  },
  //杂费报销申请(新增申请单)
  ADDPAYCASHREQEST(state,res){
    state.addPayCashReqest = res;
  },
  //杂费报销申请(修改申请单)
  MODIFYPAYCASHREQUEST(state,res){
    state.modifyPayCashRequest = res;
  },
  //杂费报销申请(查看详情)
  PAYCASHRQUESTDETAIL(state, res){
    state.payCashRquestDetails = res
  },
  //杂费报销申请(引入应付款)
  PAYCASHIMPORTPAGELIST(state, res) {
    state.payCashImportPageList = res
  },
  //杂费报销申请(移出)
  OUTPORTPAYCASH(state, res){
    state.outPortPayCash = res
  },
  //杂费报销申请(统计总金额)
  PAYCASHDETAILSUMAMOUNT(state, res) {
    state.payCashDetailSumAmount = res
  },
  //业务员利润表(初始化)
  SALESMANPROFITLIST(state,res){
    state.salesManProfitList = res;
  },
  //业务员利润表(总金额)
  SALESMANPROFITAMOUNT(state,res){
    state.salesManProfitAmount =res;
  },

  CASHSETTLEMENTLIST(state,res){
    state.cashSettlementList =res;
  },
  CASHSETTLEMENTQUERY(state,res){
    state.cashSettlementQuery =res;
  },

  ONCECUSTOMERBILLLIST(stare,res){
    stare.onceCustomerBill = res;
  },

  ONCECUSTOMERBILLDETAILLIST(stare,res){
    stare.onceCustomerBillDetail = res
  },

  ONCECUSINVOICELOGLIST(stare,res){
    stare.onceCusInvoiceLogList = res
  },

  ONCECUSNOTINVOICEAPPLYLOGLIST(stare,res){
    stare.onceCusNotInvoiceApplyLogList = res
  },

  CUSTOMERRECEIVABLEDETAILLIST(stare,res){
    stare.customerReceivableDetailList = res
  },

  ONCECUSTOMERRECEIVABLEDETAILLIST(stare,res){
    stare.onceCustomerReceivableDetailList = res
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
