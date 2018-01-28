import api from '../../api'

// 应用初始状态
const state = {
  orderList: [],
  orderStatus: [],
  portPrice: [],
  addOrderAllList: {},
  userContactsList: {},
  regionByAddressList: [],
  orderDetail: {},
  orderRemarkData: {},
  allRegionList: {},
  costAdminList: {},
  costDataByCabIdList: {},
  costDataByCabIdListView: {},
  addCabinetCostInitList: {},
  splitOrderList: {},
  orderUpdateDetail: [],
  cabinetUpdateDetail: [],
  cabinetList: {},
  auditingCostList: [],
  auditingCostQueryList: {},
  auditingCostLogList: {},
  orderStatisticsList: [],
  deptList: {},
  auditingCabinetCostAmount: {},
  cancelOrderQueryList: {},
  cancelOrderDataList: [],
  cabinetCostChangeList:[],
  ticketSettleCabinetPageList:[],
  cabinetDetainingCargoList:[],
  cabinetCostLogList:{}
}

const getters = {
  orderList(state) {
    return state.orderList
  },
  orderStatus(state) {
    return state.orderStatus
  },
  portPrice(state) {
    return state.portPrice
  },
  addOrderAllList(state) {
    return state.addOrderAllList
  },
  userContactsList(state) {
    return state.userContactsList
  },
  regionByAddressList(state) {
    return state.regionByAddressList
  },
  orderDetail(state) {
    return state.orderDetail
  },
  orderRemarkData(state) {
    return state.orderRemarkData
  },
  allRegionList(state) {
    return state.allRegionList
  },
  costAdminList(state) {
    return state.costAdminList
  },
  costDataByCabIdList(state) {
    return state.costDataByCabIdList
  },
  costDataByCabIdListView(state) {
    return state.costDataByCabIdListView
  },
  addCabinetCostInitList(state) {
    return state.addCabinetCostInitList
  },
  splitOrderList(state) {
    return state.splitOrderList
  },
  orderUpdateDetail(state) {
    return state.orderUpdateDetail
  },
  cabinetUpdateDetail(state) {
    return state.cabinetUpdateDetail
  },
  cabinetList(state) {
    return state.cabinetList
  },
  auditingCostList(state) {
    return state.auditingCostList
  },
  auditingCostQueryList(state) {
    return state.auditingCostQueryList
  },
  auditingCostLogList(state) {
    return state.auditingCostLogList
  },
  orderStatisticsList(state) {
    return state.orderStatisticsList
  },
  deptList(state) {
    return state.deptList
  },
  toSendCost(state) {
    return state.toSendCost
  },
  auditingCabinetCostAmount(state) {
    return state.auditingCabinetCostAmount
  },
  cancelOrderQueryList(state) {
    return state.cancelOrderQueryList
  },
  cancelOrderDataList(state) {
    return state.cancelOrderDataList
  },
  cabinetCostChangeList(state){
  	return state.cabinetCostChangeList
  },
  ticketSettleCabinetPageList(state){
    return state.ticketSettleCabinetPageList
  },
  cabinetDetainingCargoList(state){
  	return state.cabinetDetainingCargoList
  },
  cabinetCostLogList(state){
    return state.cabinetCostLogList
  }


}

const actions = {

  /*获取订单列表*/
  getOrderList({ commit }, param) {
    return api.ordeListApi(param).then((res) => {
      commit('ORDERLIST', res.data.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*获取订单状态列表*/
  getOrderStatus({ commit }, params) {
    return api.ordeStatusApi(params).then((res) => {
      commit('ORDERSTATUS', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*获取订单列表*/
  getorderCancel({ commit }, param) {
    return api.orderCancelApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*获取港口报价列表*/
  getPortPrice({ commit }, params) {
    return api.PortPriceApi(params).then((res) => {
      commit('PORTPRICE', res.data.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*新增订单页面所有下拉的数据接口*/
  getAddOrderAllList({ commit }, params) {
    return api.addOrderAllListApi(params).then((res) => {
      commit('ADDORDERALLLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*新增订单*/
  saveOrder({ commit }, params) {
    return api.saveOrderApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*查询联系人*/
  getUserContactsList({ commit }, params) {
    return api.userContactsApi(params).then((res) => {
      commit('USERCONTACNTS', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*查询区域地址*/
  getRegionByAddressList({ commit }, params) {
    return api.regionByAddressApi(params).then((res) => {
      commit('REGIONBYADDRESSLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*根据区域编码获取地址*/
  getAddressByRegion({ commit }, params) {
    return api.addressByRegionApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*获取报价信息*/
  getOrderQuote({ commit }, params) {
    return api.OrderQuoteApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单详情*/
  getOrderDetail({ commit }, params) {
    return api.OrderDetailApi(params).then((res) => {
      commit('ORDERDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单审核*/
  getOrderApproval({ commit }, params) {
    return api.OrderApprovalApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单客服备注*/
  getOrderRemarkData({ commit }, params) {
    return api.OrderRemarkDataApi(params).then((res) => {
      commit('ORDERREMARKDATA', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*保存客服备注*/
  getSaveRemarkInfo({ commit }, params) {
    return api.saveRemarkInfoApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*获取当前所有区域信息*/
  getAllRegionByRegionCode({ commit }, params) {
    return api.allRegionByRegionCodeApi(params).then((res) => {
      commit('ALLREGIONBYREGIONCODE', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*根据code获取当前所有区域信息*/
  getAllRegionByRegionCodes({ commit }, params) {
    return api.allRegionByRegionCodeApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*查询区域编码下属区域接口*/
  getAreaInfoList({ commit }, params) {
    return api.areaInfoListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*保存修改订单*/
  editOrderSave({ commit }, params) {
    return api.editSaveApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*费用管理列表*/
  getCabinetCostList({ commit }, params) {
    return api.cabinetCostListApi(params).then((res) => {
      commit('COSTADMIN', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*费用编辑页面的费用列表*/
  getCostDataByCabIdList({ commit }, params) {
    return api.costDataByCabIdListApi(params).then((res) => {
      commit('COSTLISTBYCABIDLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*费用编辑页面的费用列表数据*/
  getCostDataByCabIdListData({ commit }, params) {
    return api.costDataByCabIdListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*费用审核页面的费用详情列表*/
  getCostDataByCabIdListView({ commit }, params) {
    return api.getCostDataByCabIdListViewApi(params).then((res) => {
      commit('COSTLISTBYCABIDLISTVIEW', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*编辑集装箱费用信息初始化数据列表*/
  getAddCabinetCostInitDataList({ commit }, params) {
    return api.addCabinetCostInitDataApi(params).then((res) => {
      commit('ADDCABINETCOSTINITDATA', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*保存集装箱费用信息*/
  saveCost({ commit }, params) {
    return api.saveCostApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*打破规则提交费用数据*/
  saveCostDataTow({ commit }, params) {
    return api.saveCostDataTowApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单拆分详情*/
  getSplitOrderList({ commit }, params) {
    return api.getSplitOrderApi(params).then((res) => {
      commit('SPLITORDERLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单拆分*/
  splitOrder({ commit }, params) {
    return api.splitOrderApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单修改详情列表*/
  getOrderUpdateDetail({ commit }, params) {
    return api.orderUpdateDetailApi(params).then((res) => {
      commit('ORDERUPDATEDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*柜子修改详情列表*/
  getCabinetUpdateDetail({ commit }, params) {
    return api.cabinetUpdateDetailApi(params).then((res) => {
      commit('CABINETUPDATEDETAIL', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*集装箱信息列表*/
  getCabinetList({ commit }, params) {
    return api.cabinetListApi(params).then((res) => {
      commit('CABINETLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*获取跟踪用户列表*/
  getFollowUserList({ commit }, params) {
    return api.followUserListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*审核费用列表*/
  getAuditingCostList({ commit }, params) {
    return api.auditingCostListApi(params).then((res) => {
      commit('AUDITINGCOSTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*审核费用查询下拉数据列表*/
  getAuditingCostQueryList({ commit }, params) {
    return api.auditingCabinetCostQueryApi(params).then((res) => {
      commit('AUDITINGCOSTQUERYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*审核费用日志列表*/
  getCostAuditinfoLog({ commit }, params) {
    return api.getCostAuditinfoLogApi(params).then((res) => {
      commit('AUDITINGCOSTLOG', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*审核费用通过或不通过*/
  auditingCabinetCostHandle({ commit }, params) {
    return api.auditingCabinetCostApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单统计*/
  getOrderStatisticsList({ commit }, params) {
    return api.orderStatisticsListApi(params).then((res) => {
      commit('ORDERSTATISTICSLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*订单统计查询初始化数据*/
  getDeptList({ commit }, params) {
    return api.deptListApi(params).then((res) => {
      commit('DEPTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*费用审核管理统计总额*/
  getAuditingCabinetCostAmount({ commit }, params) {
    return api.getAuditingCabinetCostAmountApi(params).then((res) => {
      commit('AUDITINGCABINETCOSTAMOUNT', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },



  /*订单页面的柜子统计*/
  getCabinetStatisticsList({ commit }, params) {
    return api.cabinetStatisticsListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*集装箱列表页面的柜子统计*/
  getCabinetTypeNumberList({ commit }, params) {
    return api.getCabinetTypeNumberListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*改送费详情*/
  getToSendCostByOrderIdList({ commit }, params) {
    return api.tosendCostByOrderIdListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*提交改送费详情*/
  updateTosendCustomerId({ commit }, params) {
    return api.updateTosendCustomerIdApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /*通过id获取客户报价*/
  getOrderQuoteById({ commit }, params) {
    return api.getOrderQuoteByIdApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*撤销订单审核*/
  cancelApproval({ commit }, params) {
    return api.cancelApprovalApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*还原订单（被取消的订单）*/
  restoreCancel({ commit }, params) {
    return api.restoreCancelApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /* 费用管理的应付，应收，毛利统计*/
  getCabinetCostListAmount({ commit }, params) {
    return api.getCabinetCostListAmountApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /* 获取取消订单费用查询条件接口 */
  getCancelOrderQuery({ commit }, params) {
    return api.getCancelOrderQueryApi(params).then((res) => {
      commit('CANCELORDERQUERY', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /* 获取取消订单费用数据列表接口 */
  getCancelOrderDataList({ commit }, params) {
    return api.getCancelOrderDataListApi(params).then((res) => {
      commit('CANCELORDERDATALIST', res.data.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
/* 获取转移费用列表接口 */
  getCabinetCostChangeList({ commit }, params) {
    return api.getCabinetCostChangeApi(params).then((res) => {
      commit('CABINETCOSTCHANGELIST', res.data.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

/* 转移费用接口 */
  updateCabinetCostChange({ commit }, params) {
    return api.updateCabinetCostChangeApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
/* 现金收款接口 */
  incomeCabinetCostUpdate({ commit }, params) {
    return api.incomeCabinetCostUpdateApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /* 获取取消订单列表费用统计接口 */
  getCancelOrderAmount({ commit }, params) {
    return api.getCancelOrderAmountApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /* 获取票结集装箱列表接口 */
  getTicketSettleCabinetPageList({ commit }, params) {
  return api.getTicketSettleCabinetListApi(params).then((res) => {
    commit('TICKETSETTLECABINETLIST', res.data.data)
    return new Promise((resolve, reject) => {
      resolve(res.data);
    })
  })
  },
 /* 获取集装箱扣货信息列表接口 */
  getCabinetDetainingCargoList({ commit }, params) {
  return api.getCabinetDetainingCargoListApi(params).then((res) => {
    commit('CABINETDETAININGCARGOLIST', res.data.data)
    return new Promise((resolve, reject) => {
      resolve(res.data);
    })
  })
  },

    /* 批量扣货接口 */
  batchDetainingCargoUpdate({ commit }, params) {
    return api.batchDetainingCargoUpdateApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
   /* 批量放货接口 */
  batchReleaseCargoUpdate({ commit }, params) {
    return api.batchReleaseCargoUpdateApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

   /* 票结扣货设置初始化 */
  getInitAddDetainingCargoDetail({ commit }, params) {
    return api.getInitAddDetainingCargoDetailApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
 /* 票结扣货设置确认 */
  updateDetainingCargoSet({ commit }, params) {
    return api.updateDetainingCargoSetApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  /* 查询应收_申请单明细表接口 */
  getRequisitionDetailList({ commit }, params) {
    return api.getRequisitionDetailListApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  deleteRequisitionDetailApi({ commit }, params) {
    return api.deleteRequisitionDetailApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
  })
  },

  getCabinetCostUpdateLog({ commit }, params) {
    return api.getCabinetCostUpdateLogApi(params).then((res) => {
      commit('CABINETCOSTLOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
  })
  },
  getCustomerSendcarSmsById({ commit }, params) {
    return api.getCustomerSendcarSmsByIdApi(params).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
  })
  }







}

const mutations = {
  ORDERLIST(state, res) { state.orderList = res },
  ORDERSTATUS(state, res) { state.orderStatus = res },
  PORTPRICE(state, res) { state.portPrice = res },
  ADDORDERALLLIST(state, res) { state.addOrderAllList = res },
  USERCONTACNTS(state, res) { state.userContactsList = res },
  REGIONBYADDRESSLIST(state, res) { state.regionByAddressList = res },
  ORDERDETAIL(state, res) { state.orderDetail = res },
  ORDERREMARKDATA(state, res) { state.orderRemarkData = res },
  ALLREGIONBYREGIONCODE(state, res) { state.allRegionList = res },
  COSTADMIN(state, res) { state.costAdminList = res },
  COSTLISTBYCABIDLIST(state, res) { state.costDataByCabIdList = res },
  COSTLISTBYCABIDLISTVIEW(state, res) { state.costDataByCabIdListView = res },
  ADDCABINETCOSTINITDATA(state, res) { state.addCabinetCostInitList = res },
  SPLITORDERLIST(state, res) { state.splitOrderList = res },
  ORDERUPDATEDETAIL(state, res) { state.orderUpdateDetail = res },
  CABINETUPDATEDETAIL(state, res) { state.cabinetUpdateDetail = res },
  CABINETLIST(state, res) { state.cabinetList = res },
  AUDITINGCOSTLIST(state, res) { state.auditingCostList = res },
  AUDITINGCOSTQUERYLIST(state, res) { state.auditingCostQueryList = res },
  AUDITINGCOSTLOG(state, res) { state.auditingCostLogList = res },
  ORDERSTATISTICSLIST(state, res) { state.orderStatisticsList = res },
  DEPTLIST(state, res) { state.deptList = res },
  AUDITINGCABINETCOSTAMOUNT(state, res) { state.auditingCabinetCostAmount = res },
  CANCELORDERQUERY(state, res) { state.cancelOrderQueryList = res },
  CANCELORDERDATALIST(state, res) { state.cancelOrderDataList = res },
  CABINETCOSTCHANGELIST(state, res) { state.cabinetCostChangeList = res },
  TICKETSETTLECABINETLIST(state,res){state.ticketSettleCabinetPageList = res},
  CABINETDETAININGCARGOLIST(state,res){state.cabinetDetainingCargoList = res},
  CABINETCOSTLOGLIST(state,res){state.cabinetCostLogList = res},

}

export default {
  state,
  getters,
  actions,
  mutations
}
