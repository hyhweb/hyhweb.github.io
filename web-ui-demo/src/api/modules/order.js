import instance from '../config'
//import instance from '../config-local'
let moduleName = '/ygb-order-service'
//let moduleName = ''
/*订单列表*/
export const ordeListApi = params => {return instance.post(`${moduleName}/api/order/getDataList`,params)}
/*订单查询模块下的订单状态，运输类型，报价港口，子公司数据列表，*/
export const ordeStatusApi = params => {return instance.post(`${moduleName}/api/order/getOrderQuery`,params)}
/*新增页面的全部下拉框列表集合*/
export const addOrderAllListApi = params => {return instance.post(`${moduleName}/api/order/addOrder`,params)}
// 查询改送费
export const getCustomerQuoteByInput = params => {return instance.post(`${moduleName}/api/order/getCustomerQuoteByInput`,params)}
/*新增订单*/
export const saveOrderApi = params => {return instance.post(`${moduleName}/api/order/saveOrder`,params)}
/*新增页面的全部下拉框列表集合*/
export const orderCancelApi = params => {return instance.post(`${moduleName}/api/order/orderCancel`,params)}
/*新增页面的查询联系人*/
export const userContactsApi = params => {return instance.post(`${moduleName}/api/order/getUserContacts`,params)}
/*新增页面的查询区域地址*/
export const regionByAddressApi = params => {return instance.post(`${moduleName}/api/order/getRegionByAddress`,params)}
/*新增页面的根据区域编码获取地址*/
export const addressByRegionApi = params => {return instance.post(`${moduleName}/api/order/getAddressByRegion`,params)}
/*新增页面的获取报价信息*/
export const OrderQuoteApi = params => {return instance.post(`${moduleName}/api/order/getOrderQuote`,params)}

/*订单详情*/
export const OrderDetailApi = params => {return instance.post(`${moduleName}/api/order/orderDetail`,params)}
/*订单审核*/
export const OrderApprovalApi = params => {return instance.post(`${moduleName}/api/order/orderApproval`,params)}
/*订单客服备注*/
export const OrderRemarkDataApi = params => {return instance.post(`${moduleName}/api/order/getRemarkDataList`,params)}
/*订单客服备注*/
export const saveRemarkInfoApi = params => {return instance.post(`${moduleName}/api/order/saveRemarkInfoList`,params)}
/*获取当前所有区域信息接口*/
export const allRegionByRegionCodeApi = params => {return instance.post(`${moduleName}/api/order/getAllRegionByRegionCode`,params)}
/*获取当前所有区域信息接口*/
export const areaInfoListApi = params => {return instance.post(`${moduleName}/api/order/getAreaInfoList`,params)}
/*修改订单保存接口*/
export const editSaveApi = params => {return instance.post(`${moduleName}/api/order/editSave`,params)}
/*获取订单集装箱费用信息列表接口*/
export const cabinetCostListApi = params => {return instance.post(`${moduleName}/api/order/getCabinetCostList`,params)}
/*费用列表里面，获取单个集装箱费用信息列表接口*/
export const costDataByCabIdListApi = params => {return instance.post(`${moduleName}/api/order/getCostDataByCabIdList`,params)}

/*费用审核里面,获取单个集装箱费用信息列表接口（权限不同）*/
export const getCostDataByCabIdListViewApi = params => {return instance.post(`${moduleName}/api/order/getCostDataByCabIdListView`,params)}


/*获取编辑集装箱费用信息初始化数据接口*/
export const addCabinetCostInitDataApi = params => {return instance.post(`${moduleName}/api/order/getAddCabinetCostInitData`,params)}
/*保存集装箱费用信息接口*/
export const saveCostApi = params => {return instance.post(`${moduleName}/api/order/saveCostData`,params)}
/*打破规则提交费用数据接口*/
export const saveCostDataTowApi = params => {return instance.post(`${moduleName}/api/order/saveCostData2`,params)}
/*获取订单拆分详情接口*/
export const getSplitOrderApi = params => {return instance.post(`${moduleName}/api/order/getSplitOrder`,params)}
/*订单拆分接口*/
export const splitOrderApi = params => {return instance.post(`${moduleName}/api/order/splitOrder`,params)}
/*获取订单修改详情信息接口*/
export const orderUpdateDetailApi = params => {return instance.post(`${moduleName}/api/order/getOrderUpdateDetail`,params)}
/*获取订单集装箱修改详情信息接口*/
export const cabinetUpdateDetailApi = params => {return instance.post(`${moduleName}/api/order/getCabinetUpdateDetail`,params)}
/*获取集装箱信息列表*/
export const cabinetListApi = params => {return instance.post(`${moduleName}/api/order/getCabinetPageList`,params)}
/*修改集装箱信息*/
export const updateCabinetApi = params => {return instance.post(`${moduleName}/api/order/updateCabinetInformation`,params)}
/*批量修改集装箱信息*/
export const batchupdateCabinetApi = params => {return instance.post(`${moduleName}/api/order/batchUpdateCabinetInformation`,params)}
/*导出excel集装箱信息*/
export const exportCabinetApi = params => {return instance.get(`${instance.defaults.baseURL}${moduleName}/api/order/exportCabinet?${params}`,{
  responseType: 'blob'
})};
/*跟踪用户*/
export const followUserListApi = params => {return instance.post(`${moduleName}/api/order/getFollowUserList`,params)};
/*费用审核列表接口*/
export const auditingCostListApi = params => {return instance.post(`${moduleName}/api/order/getAuditingCabinetCostList`,params)};
/*费用审核查询下拉数据接口*/
export const auditingCabinetCostQueryApi = params => {return instance.post(`${moduleName}/api/order/getAuditingCabinetCostQuery`,params)};
/*费用通过，不通过审核*/
export const auditingCabinetCostApi = params => {return instance.post(`${moduleName}/api/order/auditingCabinetCost`,params)};
/*费用审核日志*/
export const getCostAuditinfoLogApi = params => {return instance.post(`${moduleName}/api/order/getCostAuditinfoLog`,params)};
/*订单统计*/
export const orderStatisticsListApi = params => {return instance.post(`${moduleName}/api/order/getOrderStatistics`,params)};
/*订单统计查询初始化数据接口*/
export const deptListApi = params => {return instance.post(`${moduleName}/api/order/getDeptList`,params)};
/*订单页面的柜子统计*/
export const cabinetStatisticsListApi = params => {return instance.post(`${moduleName}/api/order/getCabinetStatisticsList`,params)};
/*导出excel费用审核信息*/
export const exportAuditingCabintCostListApi = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/order/exportAuditingCabintCostList?${params}`)};
/*集装箱列表页面的柜子统计*/
export const getCabinetTypeNumberListApi = params => {return instance.post(`${moduleName}/api/order/getCabinetTypeNumberList`,params)};

/*改送费详情*/
export const tosendCostByOrderIdListApi = params => {return instance.post(`${moduleName}/api/order/getTosendCostByOrderIdList`,params)};
/*提交改送费详情*/
export const updateTosendCustomerIdApi = params => {return instance.post(`${moduleName}/api/order/updateTosendCustomerId`,params)};
//审核列表统计总金额
export const getAuditingCabinetCostAmountApi = params => {return instance.post(`${moduleName}/api/order/getAuditingCabinetCostAmount`,params)};

/*通过id获取客户报价*/
export const getOrderQuoteByIdApi = params => {return instance.post(`${moduleName}/api/order/getOrderQuoteById`,params)};
/*撤销订单审核*/
export const cancelApprovalApi = params => {return instance.post(`${moduleName}/api/order/cancelApproval`,params)};

/*还原订单（被取消的订单）*/
export const restoreCancelApi = params => {return instance.post(`${moduleName}/api/order/restoreCancel`,params)};

/* 费用管理的应付，应收，毛利统计*/
export const getCabinetCostListAmountApi = params => {return instance.post(`${moduleName}/api/order/getCabinetCostListAmount`,params)};

/* 获取取消订单费用查询条件接口 */
export const getCancelOrderQueryApi = params => {return instance.post(`${moduleName}/api/order/getCancelOrderQuery`,params)};
/* 获取取消订单费用数据列表接口 */
export const getCancelOrderDataListApi = params => {return instance.post(`${moduleName}/api/order/getCancelOrderDataList`,params)};
/* 获取转移费用列表接口 */
export const getCabinetCostChangeApi = params => {return instance.post(`${moduleName}/api/order/getCabinetCostChange`,params)};

/*  转移费用接口 */
export const updateCabinetCostChangeApi = params => {return instance.post(`${moduleName}/api/order/updateCabinetCostChange`,params)};

/*  现金收款接口 */
export const incomeCabinetCostUpdateApi = params => {return instance.post(`${moduleName}/api/order/incomeCabinetCostUpdate`,params)};

/*  获取取消订单列表费用统计接口 */
export const getCancelOrderAmountApi = params => {return instance.post(`${moduleName}/api/order/getCancelOrderAmount`,params)};

 /*  导出取消订单接口 */
export const getExportOrderDataListApi = params => {
	window.open(`${instance.defaults.baseURL}${moduleName}/api/order/getExportOrderDataList?${params}`)
};

/*获取票结集装箱信息列表*/
export const getTicketSettleCabinetListApi = params => {return instance.post(`${moduleName}/api/order/getTicketSettleCabinetPageList`,params)}

/*获取票结集装箱总金额接口*/
export const getTicketSettleCabinetCostAmountApi = params => {return instance.post(`${moduleName}/api/order/getTicketSettleCabinetCostAmount`,params)};

/* 导出对账单 */
export const getExportStatementApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/order/exportStatement?${params}`,{
    responseType: 'blob'
  })
};


/*获取集装箱扣货信息列表接口*/
export const getCabinetDetainingCargoListApi = params => {return instance.post(`${moduleName}/api/order/getCabinetDetainingCargoList`,params)};

/*批量扣货接口*/
export const batchDetainingCargoUpdateApi = params => {return instance.post(`${moduleName}/api/order/batchDetainingCargoUpdate`,params)}

/*批量放货接口*/
export const batchReleaseCargoUpdateApi = params => {return instance.post(`${moduleName}/api/order/batchReleaseCargoUpdate`,params)}

/*票结扣货设置初始化接口*/
export const getInitAddDetainingCargoDetailApi = params => {return instance.post(`${moduleName}/api/order/getInitAddDetainingCargoDetail`,params)}

/* 票结扣货设置确认*/
export const updateDetainingCargoSetApi = params => {return instance.post(`${moduleName}/api/order/updateDetainingCargoSet`,params)}


/* 查询应收_申请单明细表接口*/
export const getRequisitionDetailListApi = params => {return instance.get(`${moduleName}/api/order/requisitionDetail/${params.receivableDetailId}`,{params:params})}

/* 删除应收_申请单明细表接口*/
export const deleteRequisitionDetailApi = params => {return instance.post(`${moduleName}/api/order/requisitionDetail/deleteRequisitionDetailByIds`,params)}

/* 导出对账单根据应收申请单Id */
export const getExportStatementByRequisitionIdApi = params => {
  window.open(`${instance.defaults.baseURL}${moduleName}/api/order/requisitionDetail/getExportStatementByRequisitionIdApi?${params}`)
};
/* 获取费用日志修改详情信息接口*/
export const getCabinetCostUpdateLogApi = params => {return instance.post(`${moduleName}/api/order/getCabinetCostUpdateLog`,params)}

/* 获取下单客户对应的发送信息对象类型*/
export const getCustomerSendcarSmsByIdApi = params => {return instance.get(`${moduleName}/api/order/getCustomerSendcarSmsById/${params.customerId}`,{params:params})}




