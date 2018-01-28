import instance from '../config'
let moduleName = '/ygb-settlement-service'
//import instance from '../config-local'
//let moduleName = ''

//结算比例设置
export const getSettlementRateListApi = params => {return instance.get(`${moduleName}/api/settlement/settlementRate/getSettlementRateList`,{params:params})}
export const updateSettlementRateApi = params => {return instance.post(`${moduleName}/api/settlement/settlementRate/updateSettlementRate`,params)}

//客户.司机代收款管理
export const getDriverAmountApi = params => {return instance.post(`${moduleName}/api/settlement/agencyfund/getAmount`,params)}
export const getDriverPageListApi = params => {return instance.post(`${moduleName}/api/settlement/agencyfund/listPage`,params)}
export const getDriverInAndOutApi = params => {return instance.post(`${moduleName}/api/settlement/agencyfund/confirm`,params)}
export const getAgencyfundExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportAgencyfund?${params}`,{
    responseType: 'blob'
  })
};

//一次性客户报表
export const getOnceCustomerListApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/onceCusList`,params)}
export const getOnceCustomerListExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportOnceCustomer?${params}`,{
    responseType: 'blob'
  })
};
export const getOnceCustomerSumAmountApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getSumAmount`,params)}

 //应付杂费管理
export const getPayCashListApi = params => {return instance.post(`${moduleName}/api/settlement/paycash/getPayCashList`,params)}
export const getPayCashListExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportPayCash?${params}`,{
    responseType: 'blob'
  })
};
export const getPayCashSumAmountApi = params => {return instance.post(`${moduleName}/api/settlement/paycash/getSumAmount`,params)}

//客户应收
export const getCustomerReceivableApi = params => {return instance.post(`${moduleName}/api/settlement/customer/getListPage`,params)}
export const getCustomerAmountApi = params => {return instance.post(`${moduleName}/api/settlement/customer/getTotalAmount`,params)}
export const getCustomerDetailApi = params => {return instance.post(`${moduleName}/api/settlement/customer/getCusPageDetail`,params)}
export const getCustomerDetailAmountApi = params => {return instance.post(`${moduleName}/api/settlement/customer/getDetailAmount`,params)}
export const getCustomerExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/customer?${params}`,{
    responseType: 'blob'
  })
}
export const getCustomerDetailExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/customerDetail?${params}`, {
    responseType: 'blob'
  })
};
export const batchExportCustomerDetailApi = params => {
  return instance.post(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/batchExportCustomerDetail`,params,{
    responseType: 'blob'
  })
};
export const getCustomerBillApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportCustomerBill?${params}`,{
    responseType: 'blob'
  })
};
export const onceAndReceiveExportExcelApi = params => {return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/onceAndReceiveExportExcel?${params}`,{
  responseType:'blob'
})};
//生成收款单接口
export const addReceivableRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/customer/addReceivableRequisition`,params)}

//获取收款单详情接口
export const getCustomerReceivableDetailApi = params => {return instance.post(`${moduleName}/api/settlement/customer/getReceivableRequisitionDetail`,params)}

//获取收款单详情金额总计
export const getCustomerReceivableDetailAmountApi = params => {return instance.get(`${moduleName}/api/settlement/customer/getReceivableRequisitionDetailAmount`,{params:params})}

//客户应收收款单导出
export const exportCustomerReceivableDetailExcelApi = params => {return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportCustomerReceivableDetail?${params}`,{
  responseType:'blob'
})};



//司机提前结算
//司机提前结算_生成付款单
export const generatePatOrderApi = params => {return instance.post(`${moduleName}/api/settlement/advance/generatePayOrder`,params)}
//预支执行_进行预算操作/取消申请
export const advanceApi = params => {return instance.post(`${moduleName}/api/settlement/advance/advanced`,params)}
//预支执行初始化（搜索查询）
export const getAdvanceListApi = params => {return instance.post(`${moduleName}/api/settlement/advance/getPageList`,params)}
//预支执行_查看详情
export const getDetailDataListApi = params => {return instance.post(`${moduleName}/api/settlement/advance/getDetailDataList`,params)}
//预支历史_初始化/条件查询
export const getHisDataListApi = params => {return instance.post(`${moduleName}/api/settlement/advance/getHisDataList`,params)}
//导出司机付款申请单1/
export const getGeneratePayOrderWordApi = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportGeneratePayOrder?${params}`)}
//七天结算杂费维护
export const updateFeesMaintainApi = params => {return instance.post(`${moduleName}/api/settlement/advance/updateFeesMaintain`,params)}


//现结集装箱列表
export const exportCashContainerList = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/cashContainerList/exportCashContainerList?${params}`,{
    responseType: 'blob'
  })
};

//现结申请单列表
export const viewDetailInCashSettleApplicApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettleStatement/viewDetail`,params)}


//子公司应付
export const getChildCompanyListApi = params => {return instance.post(`${moduleName}/api/settlement/headToChildCompany/getPageList`,params)}
export const getChildCompanyAmountApi = params => {return instance.post(`${moduleName}/api/settlement/headToChildCompany/getAmounts`,params)}
export const getChildCompanyDetailApi = params => {return instance.post(`${moduleName}/api/settlement/headToChildCompany/getPageDatailList`,params)}
export const getChildCompanyDetaiAmountApi = params => {return instance.post(`${moduleName}/api/settlement/headToChildCompany/getDatailAmount`,params)}
export const getChildCompanyExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportChildCompany?${params}`,{
    responseType: 'blob'
  })
};
export const getChildCompanyDetailExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportChildCompanyDetail?${params}`,{
    responseType: 'blob'
  })
};
export const exportChildCompanyDetailRequisitionTemplate = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportChildCompanyDetailRequisitionTemplate?${params}`,{
    responseType: 'blob'
  })
};

//物流公司不保底应付
export const getLogisticsListApi = params => {return instance.post(`${moduleName}/api/settlement/logistics/getPageList`,params)}
export const getLogisticsAmountApi = params => {return instance.post(`${moduleName}/api/settlement/logistics/getAmount`,params)}
export const getLogisticsDetailApi = params => {return instance.post(`${moduleName}/api/settlement/logistics/getDatailPageList`,params)}
export const getLogisticsDetaiAmountlApi = params => {return instance.post(`${moduleName}/api/settlement/logistics/getDetaAmount`,params)}
export const getLogisticsExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportLogistics?${params}`,{
    responseType: 'blob'
  })
};
export const getLogisticsDetailExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportLogisticsDetail?${params}`,{
    responseType: 'blob'
  })
};

//物流公司保底应付
export const getLogisticsTwoListApi = params => {return instance.post(`${moduleName}/api/settlement/logisticsTwo/getPageList`,params)}
export const getLogisticsTwoAmountApi = params => {return instance.post(`${moduleName}/api/settlement/logisticsTwo/getAmount`,params)}
export const getLogisticsTwoDetailApi = params => {return instance.post(`${moduleName}/api/settlement/logisticsTwo/getDatailPageList`,params)}
export const getLogisticsTwoDetaiAmountlApi = params => {return instance.post(`${moduleName}/api/settlement/logisticsTwo/getDetaAmount`,params)}
export const getLogisticsTwoExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportLogisticsTwo?${params}`,{
    responseType: 'blob'
  })
};
export const getLogisticsTwoDetailExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportLogisticsTwoDetail?${params}`,{
    responseType: 'blob'
  })
};
export const exportLogisticsTwoDetailRequisitionTemplateApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportLogisticsTwoDetailRequisitionTemplate?${params}`,{
    responseType: 'blob'
  })
};
//应收申请管理
//开票-getList
export const getRecReqInvoiceListApi = params => {return instance.get(`${moduleName}/api/settlement/receivableInvoiceSubmit/getReceivableInvoiceSubmit`,{params})}
//编辑保存按钮
export const updateReceivableInvoiceSubmitApi = params => {return instance.post(`${moduleName}/api/settlement/receivableInvoiceSubmit/updateReceivableInvoiceSubmit`,params)}
//提交开票按钮
export const saveReceivableInvoiceSubmitApi = params => {return instance.post(`${moduleName}/api/settlement/receivableInvoiceSubmit/saveReceivableInvoiceSubmit`,params)}
//取消提交按钮
export const cancelReceivableInvoiceSubmitApi = params => {return instance.post(`${moduleName}/api/settlement/receivableInvoiceSubmit/cancelReceivableInvoiceSubmit`,params)}

export const getReceivablePageListApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/getPageList`,params)}
export const saveReceivableRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/saveReceivableRequisition`,params)}
export const updReceivableRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/updReceivableRequisition`,params)}
export const confirmReceivableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/receivableInvoice/confirmReceivableInvoice`,params)}
export const updReceivableRequisitionAuditStatus = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/updReceivableRequisitionAuditStatus`,params)}

export const delReceivableRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/delByIds`,params)}
export const getReceivableRequisitionDetailListApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisitionDetail/getPageList`,params)}
export const getCostTypeListApi = params => {return instance.get(`${moduleName}/api/settlement/receivableRequisition/getEditRecAmountQuery`,params)}
export const getReceivableImportPageListApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/getImportPageList`,params)}
export const exportReceivableRequisition = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportReceivableRequisition?${params}`,{
    responseType: 'blob'
  })
};
export const getAcountListApi = params => {return instance.post(`${moduleName}/api/settlement/receivableLog/getList`,params)}

export const saveReceivableRequisitionLogApi = params => {return instance.post(`${moduleName}/api/settlement/receivableLog/saveReceivableLogFinished`,params)}
export const saveReceivableRequisitionLogPortionApi = params => {return instance.post(`${moduleName}/api/settlement/receivableLog/saveReceivableLogPortion`,params)}
export const updateReceivableLogApi = params => {return instance.post(`${moduleName}/api/settlement/receivableLog/updateReceivableLog`,params)}

export const getReceivableInvoiceApi = params => {return instance.get(`${moduleName}/api/settlement/receivableInvoice/getList`,{params:params})}
export const getReceivableInvoceAndLogByIdApi = params => {return instance.get(`${moduleName}/api/settlement/receivableRequisition/getReceivableInvoceAndLogById`,{params:params})}
export const saveReceivableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/receivableInvoice/saveReceivableInvoice`,params)}
export const delReceivableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/receivableInvoice/delByIds`,params)}

export const importReceivableAcountApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/saveImport`,params)}
export const outportReceivableAcountApi = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/outPort`,params)}
export const getImportedSumAmountApi = params => {return instance.get(`${moduleName}/api/settlement/receivableRequisitionDetail/getSumAmount`,{params})}
export const queryRecTotalAmount = params => {return instance.post(`${moduleName}/api/settlement/receivableRequisition/queryRecTotalAmount`,params)}

// export const getReceivableRequisitionDetailExcelApi = params => {
//   return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportReceivableRequisitionDetail?${params}`,{
//     responseType: 'blob'
//   })
// };
export const getReceivableRequisitionDetailExcelApi = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportReceivableRequisitionDetail?${params}`)};


//应收明细报表
export const getRecCashListApi = params => {return instance.post(`${moduleName}/api/settlement/receivableCash/getRecCashList`,params)}
export const getRecCashSumAmountApi = params => {return instance.post(`${moduleName}/api/settlement/receivableCash/getSumAmount`,params)}
export const exportRecCash = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportRecCash?${params}`,{
    responseType: 'blob'
  })
};
//杂费报销申请
export const getPayCashRequestListApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/getRequisitionPageList`,params)}
export const addPayCashReqestApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/save`,params)}
export const updatePayCashRequestApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/update`,params)}
export const removeBefore1Api = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/removeBefore`,params)}
export const removePayCashRequestApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/remove`,params)}
export const getPayCashRquestDetailApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/getRequisitionDetailPageList`,params)}
export const savePayCashApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/savePay`,params)}
export const getPayCashImportPageListApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/getImportPageList`,params)}
export const importPayCashApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/saveImport`,params)}
export const outPortPayCashApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/outPort`,params)}
export const getDetailSumAmount1Api = params => {return instance.get(`${moduleName}/api/settlement/payCashRequst/getSumAmount/${params.reqId}`,{params:params})}
export const payPayCashRequestApi = params => {return instance.post(`${moduleName}/api/settlement/payCashRequst/savePay`,params)}
export const getUserLevel1Api = params => {return instance.get(`${moduleName}/api/settlement/payCashRequst/getUserLevel`)}

//付款单申请管理
export const getRequisitionPageListApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/getRequisitionPageList`,params)}
export const addRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/save`,params)}
export const updateRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/update`,params)}
export const removeBeforeApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/removeBefore`,params)}
export const removeRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/remove`,params)}
export const getRequisitionDetailApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/getRequisitionDetailPageList`,params)}
export const savePayApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/savePay`,params)}
export const getImportPageListApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/getImportPageList`,params)}
export const saveImportApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/saveImport`,params)}
export const outPortApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/outPort`,params)}
export const getDetailSumAmountApi = params => {return instance.get(`${moduleName}/api/settlement/requisition/getSumAmountForDetail/${params.reqId}`,{params:params})}
export const payRequisitionApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/savePay`,params)}
export const getUserLevelApi = params => {return instance.get(`${moduleName}/api/settlement/requisition/getUserLevel`)}
export const getMinimumGuaranteeFlgApi = params => {return instance.get(`${moduleName}/api/settlement/requisition/getMinimumGuaranteeFlg`)}
export const getRequisitionExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportRequisition?${params}`,{
    responseType: 'blob'
  })
};
export const getPayCashExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/getPayCashExcel?${params}`,{
    responseType: 'blob'
  })
};
//发票提交
export const invoiceSubmitApi = params =>{return instance.post(`${moduleName}/api/settlement/requisition/saveInvoiceSubmit`,params)};

export const getRequisitionDetailExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportRequisitionDetail?${params}`,{
    responseType: 'blob'
  })
};
export const getPayCashExcelDetailExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/getPayCashExcelDetailExcel?${params}`,{
    responseType: 'blob'
  })
};
export const getPayablePayLogListApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/getPayablePayList`,params)}
export const getSelectListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getBankInfoList`)}
export const savePayAblePayLogApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/savePayablePayLog`,params)}
export const saveReceivableLogApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/saveReceivableLog`,params)}
export const getPayableInvoiceListApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/getPayableInvoice`,params)};
export const savePayableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/savePayableInvoice`,params)};
export const deletePayableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/deletePayableInvoice`,params)};
export const confirmPayableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/confirmPayableInvoice`,params)};
export const checkedPayableInvoiceApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/checkedPayableInvoice`,params)};
export const financialAuditApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/financialAudit`,params)};
export const getReqAmountApi = params => {return instance.post(`${moduleName}/api/settlement/requisition/getReqAmount`,params)};

//获取消费明细下拉框列表
export const getCostTypeCodeListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getCostTypeCodeList`)}
//获取子公司下拉框列表
export const getDeptmentListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getChildCompanyList`)}
//获取联动物流公司下拉框列表
export const getLogisticListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getLogisticsList/${params.strCode}`,{params:params})}
//获取联动物流公司下拉框列表
export const getLogisticsListAApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getLogisticsListA`)}
//获取付款对象下拉框列表
export const getPayObjListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getPayObjList/${params.driverIds}`,{params:params})}
//获取船公司下拉框列表
export const getShipListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getShipList`)}
//获取码头下拉框列表
export const getDockListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getDockList`)}


//一次性客户报表_确认收到
export const comfirmInApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/comfirmIn`,params)}
//一次性客户报表_确认付出
export const cancelApi = params => {return instance.get(`${moduleName}/api/settlement/onceCustomer/cancel`,{params:params})}
//导出excel司机报表
export const getDriverReportExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportDriverReport?${params}`,{
    responseType: 'blob'
  })
};

//集装箱利润列表
export const getCabinetProfitListApi = params => {return instance.get(`${moduleName}/api/settlement/cabinetProfit/list`,{params:params})};
//导出excel
export const getCabinetProfitExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportCabinetProfit?${params}`,{
    responseType: 'blob'
  })
};
//集装箱利润表统计总金额
export const getCabinetProfitAmountApi = params => {return instance.post(`${moduleName}/api/settlement/cabinetProfit/getAmount`,params)};
//获取(下单客户)下拉框列表
export const getCustomerSelectListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getCustomerList`,{params:params})};


//客户利润列表
export const getCustomerProfitListApi = params => {return instance.get(`${moduleName}/api/settlement/customerProfit/list`,{params:params})};
//导出excel 客户利润表
export const getCustomerProfitExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportCustomerProfit?${params}`,{
    responseType: 'blob'
  })
};
//客户利润列表(业务员下拉框)
export const getUserDropdownListApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getUserDropdownList`,{params:params})};

//子公司利润列表
export const getChildCompanyProfitListApi = params => {return instance.get(`${moduleName}/api/settlement/childCompanyProfit/list`,{params:params})};
//导出excel 子公司利润表
export const getChildCompanyProfitExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportChildCompanyProfit?${params}`,{
    responseType: 'blob'
  })
};


//预支执行_查看详情
export const getDetailAmountApi = params => {return instance.post(`${moduleName}/api/settlement/advance/getDetailAmount`,params)};
//客户利润表统计总金额
export const getCustomerProfitAmountApi = params => {return instance.post(`${moduleName}/api/settlement/customerProfit/getCustomerProfitAmount`,params)};
//子公司利润表统计总金额
export const getChildCompanyProfitAmountApi = params => {return instance.post(`${moduleName}/api/settlement/childCompanyProfit/getChildCompanyProfitAmount`,params)};

//司机报表_获取下拉框列表
export const getDriverReportListInitApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getDriverReportListInit`,{params:params})}
//司机报表_初始化/查询
export const getDriverReportApi = params => {return instance.post(`${moduleName}/api/settlement/driverReport/getPageList`,params)}
//司机报表_统计总金额
export const getDriverReportAmountlApi = params => {return instance.post(`${moduleName}/api/settlement/driverReport/getTotalAmount`,params)}

//中远海/泛亚电商客户应收
export const getShipCompanyListApi = params => {return instance.post(`${moduleName}/api/settlement/shipCompany/getPageList`,params)};
export const getShipCompanyAmountApi = params => {return instance.post(`${moduleName}/api/settlement/shipCompany/getTotalAmount`,params)};
export const getShipCompanyDetailListApi = params => {return instance.post(`${moduleName}/api/settlement/shipCompany/getCusPageDetail`,params)};
export const getShipCompanyDetailAmountApi = params => {return instance.post(`${moduleName}/api/settlement/shipCompany/getDetailAmount`,params)};
export const getShipCompanyExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportShipCompany?${params}`,{
    responseType: 'blob'
  })
};
export const getShipCompanyBillApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportShipCompanyBill?${params}`,{
    responseType: 'blob'
  })
};
export const getShipCompanyDetailExcelApi = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportShipCompanyDetail?${params}`)};
export const batchExportShipCompanyDetailApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/batchExportShipCompanyDetail?${params}`,{
    responseType: 'blob'
  })
};

//获取当前部门信息
export const getCurrentDeptInfoApi = params => {return instance.get(`${moduleName}/api/settlement/requisition/getCurrentDeptInfo`)}
//获取A类子公司
export const getChildCompanyAApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getChildCompanyA`)}
//获取B类子公司
export const getChildCompanyBApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getChildCompanyB`)}
//不保底物流公司
export const getNoMglogisticsApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getNoMglogistics`)}
//获取费用类型
export const getCostTypeApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getCostType`)}

//业务员利润表
export const getSalesManProfitListApi = params => {return instance.get(`${moduleName}/api/settlement/salesManProfit/list`,{params:params})};
//导出excel(业务员利润表)
export const getSalesManProfitExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/salesManProfit/excelExport?${params}`,{
    responseType: 'blob'
  })
};
//业务员利润表统计总金额
export const getSalesManProfitAmountApi = params => {return instance.post(`${moduleName}/api/settlement/salesManProfit/getAmount`,params)};

//应付明细报表
export const getPayRequisitionReportListApi = params => {return instance.post(`${moduleName}/api/settlement/payRequisitionReport/getPayRequisitionReportList`,params)}
export const getPayRequisitionReportListExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportRequisitionReport?${params}`,{
    responseType: 'blob'
  })
};
export const getPayRequisitionReportSumAmountApi = params => {return instance.post(`${moduleName}/api/settlement/payRequisitionReport/getSumAmount`,params)}
//应付申请管理_获取下拉框列表
export const getRequisitionListInitApi = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getRequisitionListInit`)}
//获取当前用户信息
export const getCurrentUserInfoApi = params => {return instance.get(`${moduleName}/api/settlement/requisition/getCurrentUserInfo`)}

//获取财务利润数据接口
export const getFinanceProfitListApi = params => {return instance.post(`${moduleName}/api/settlement/getPageList`,params)};

//获取财务利润金额总计
export const getFinanceProfitAmountApi = params => {return instance.post(`${moduleName}/api/settlement/getAmount`,params)};

//导出财务利润列表
export const getFinanceProfitExcelApi = params => {
  return instance.get(`${instance.defaults.baseURL}${moduleName}/api/settlement/export/exportFinanceProfit?${params}`,{
    responseType: 'blob'
  })
};
// 现结结算下拉框
export const getCashSettlementListInit = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getCashSettleDropDownListInit`)}
// 子公司关联物流公司
export const getListByStrCode = params => {return instance.get(`${moduleName}/api/settlement/dropDwonList/getLogisticsList/${params.strCode}`,{params:params})}
// 现结列表
export const getSettlementListApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettleStatement/getCashSettleStatementList`,params)}
// 现结结算统计
export const getStatistics = params => {return instance.get(`${moduleName}/api/settlement/cashSettleStatement/getStatistics`,{params:params})}
//导出现结账单
export const exportBill = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/settlement/cashSettleStatement/exportCashSettleStatement?${params}`)}
// 现结总公司财务确认支付
export const getcashierPay = params => {return instance.post(`${moduleName}/api/settlement/cashSettleStatement/cashierPay`,params)}
//现结结算-保存(&提交)
export const dispatchSaveApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettleStatement/dispatchSave`,params)}

//获取业务毛利
export const getSalesProfitListApi = params => {return instance.post(`${moduleName}/api/settlement/salesProfit/getPageList`,params)};

//获取业务毛利总计
export const getSalesProfitAmountApi = params => {return instance.post(`${moduleName}/api/settlement/salesProfit/getAmount`,params)};

//导出业务毛利列表
export const exportSalesProfitApi = params => {return instance.get(`${moduleName}/api/settlement/export/exportSalesProfit?${params}`,{
  responseType: 'blob'
})
};
// 现结集装箱列表接口
export const cashSettlementApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettlement/getPageList`,params)}
// 现结集装箱列表的查询初始化数据接口
export const getCabinetQueryApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettlement/getCabinetQuery`,params)}
// 获取运费明细
export const getCostListByCabinetIdApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettlement/getCostListByCabinetId`,params)}
//申请现结保存接口
export const saveApplyCashSettledApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettlement/saveApplyCashSettle`,params)}
//根据司机id获取申请现结单接口
export const getApplyCashSettleDetailApi = params => {return instance.post(`${moduleName}/api/settlement/cashSettlement/getApplyCashSettleDetail`,params)}
//现结集装箱的账单上传路径
export const cashContainerUploadApi = () =>{ return `${instance.defaults.baseURL}${moduleName}/api/settlement/cashSettleStatement/uploadImage` }
//导出现结集装箱列表
export const exportCashContainer = params => {
  window.open(`${instance.defaults.baseURL}${moduleName}/api/settlement/cashSettlement/getExportDataList?${params}`)
}
// 现结核单
export const examineAndVerify = params => {return instance.post(`${moduleName}/api/settlement/cashSettleStatement/examineAndVerify`,params)}

//一次性客户(账单)列表
export const getOnceCustomerBillApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getOnceCusBillList`,params)}

//一次性客户(账单)详情列表
export const getOnceCustomerBillDetailApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getOnceCusBillDetailList`,params)}

//一次性客户(账单)总计
export const getOnceCustomerBillAmountApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getOnceCusBillAmount`,params)}

//一次性客户(账单)详情总计
export const getOnceCustomerBillDetailAmountApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getOnceCusBillDetailAmount`,params)}

//一次性客户(账单)列表
export const exportOnceCustomerBillApi = params => {
  return instance.get(`${moduleName}/api/settlement/export/onceCusExportExcel?${params}`, {
    responseType: 'blob'
  })
};
//一次性客户(账单)生成收款单
export const onceCusAddReceivableApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/addReceivableRequisition`,params)};

//一次性客户(账单)获取收款单详情
export const onceCusGetReceivableDetailApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getReceivableRequisitionDetail`,params)};

//一次性客户(账单)获取收款单详情金额总计
export const onceCusGetReceivableDetailAmountApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getReceivableRequisitionDetailAmount`,params)};

//一次性客户(账单)列表 收款单详情导出
export const exportOnceCustomerReceivableDetailApi = params => {
  return instance.get(`${moduleName}/api/settlement/export/exportOnceCustomerReceivableDetail?${params}`, {
    responseType: 'blob'
  })
};

//一次性客户报表_开票申请
export const addInvoiceApplyApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/addInvoiceApply`,params)};

//一次性客户报表_开票确认
export const invoiceConfirmationApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/updateInvoiceConfirmation`,params)};

//一次性客户报表_获取已做发票申请记录列表
export const getOnceCusInvoiceLogApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getOnceCusInvoiceLog`,params)};

//一次性客户报表_获取未发票申请记录列表
export const getOnceCusNotInvoiceApplyLogApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/getOnceCusNotInvoiceApplyLog`,params)};

//一次性客户报表_删除发票申请记录
export const deleteOnceCusInvoiceLogApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/deleteOnceCusInvoiceLog`,params)};

//一次性客户报表_删除发票申请记录
export const addImportOnceCusInvoiceLogApi = params => {return instance.post(`${moduleName}/api/settlement/onceCustomer/addImportOnceCusInvoiceLog`,params)};







