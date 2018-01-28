// import instance from '../config-local';
import instance from '../config';
// import instance from '../config-local';
// 接口传参
// 地区
const moduleName = '/ygb-base-service';
  // let moduleName =""
export const regionListApi = params => instance.get(`${moduleName}/api/base/region/list`, { params });
export const saveRegionApi = params => instance.post(`${moduleName}/api/base/region/save`, params);
export const regionbelongPListApi = params => instance.get(`${moduleName}/api/base/region/getPrivate/`, { params });
export const regionbelongCListApi = params => instance.get(`${moduleName}/api/base/region/getChildrenById/${params.id}`, { params });
export const deleteRegionApi = params => instance.post(`${moduleName}/api/base/region/delete/${params.id}`, params);
export const updateRegionApi = params => instance.post(`${moduleName}/api/base/region/update`, params);
export const getRegionDetailApi = params => instance.get(`${moduleName}/api/base/region/get/${params.id}`, { params });
export const getParentIdApi = params => instance.get(`${moduleName}/api/base/region/getParentId/${params.id}`, { params });
export const getRegionCodeApi = params => instance.get(`${moduleName}/api/base/region/getRegionCode/${params.id}`, { params });
export const getRegionsApi = params => instance.get(`${moduleName}/api/base/region/getRegions/${params.id}`, { params });
export const getRegionRecursiveByRegionIdApi = params => instance.get(`${moduleName}/api/base/region/getRegionRecursiveByRegionId/${params.id}`, { params });
export const getRegionListByRegionCodeApi = params => instance.post(`${moduleName}/api/base/region/getRegionListByRegionCode`,params);

// export const customListInCustomApi = params => instance.get(`${moduleName}/api/customer/getBySalesman`, { params });


// export const regionchildListApi = params => {return instance.get(`${moduleName}/api/base/region/getChildrenById/${params.id}`,{params:params})}
//
// 字典
export const dictListApi = params => instance.get(`${moduleName}/api/base/dict/list`, { params });
export const saveDictApi = params => instance.post(`${moduleName}/api/base/dict/save`, params);
export const updateDictApi = params => instance.post(`${moduleName}/api/base/dict/update`, params);
export const deleteDictApi = params => instance.post(`${moduleName}/api/base/dict/delete/${params.id}`, params);

//
// 港口
export const harborListApi = params => instance.get(`${moduleName}/api/base/harbor/list`, { params });
export const saveHarborApi = params => instance.post(`${moduleName}/api/base/harbor/save`, params);
export const updateHarborApi = params => instance.post(`${moduleName}/api/base/harbor/update`, params);
export const deleteHarborApi = params => instance.post(`${moduleName}/api/base/harbor/deleteByIds`, params);
export const allHarborListApi = params => instance.get(`${moduleName}/api/base/harbor/all`, { params });
export const harborBelongOrgListApi = params => instance.get(`${moduleName}/api/base/harbor/harborBelongOrgList/`, { params });
export const deleteHarborFromOrgApi = params => new Promise((resolve, reject) => {
  const { orgCode, harbourId } = params;
  if (!orgCode || !harbourId) {
    return reject('参数认证失败');
  }
  return resolve(instance.delete(`${moduleName}/api/base/harbor/${harbourId}/removeOrg?orgCode=${orgCode}`));
});
export const harborbelongListApi = params => instance.get(`${moduleName}/api/base/harbor/getallharbors`, { params });
export const getHarborbelongListByOrgCodeApi = params => instance.get(`${moduleName}/api/base/harbor/getHarborByOrgCode`, { params });

// 船公司
export const shipcompanyListApi = params => instance.get(`${moduleName}/api/base/shipCompany/list`, { params });
export const saveShipcompanyApi = params => instance.post(`${moduleName}/api/base/shipCompany/save`, params);
export const updateShipcompanyApi = params => instance.post(`${moduleName}/api/base/shipCompany/update`, params);
export const deleteShipcompanyApi = params => instance.post(`${moduleName}/api/base/shipCompany/deleteByIds`, params);
export const allShipCompanyApi = params => instance.get(`${moduleName}/api/base/shipCompany/all`);


//异常报价审核
export const abnormalPriceListApi = params => instance.get(`${moduleName}/api/customerQuoteAudit/getPageList`, { params });
export const auditAbnormalPriceApi = params => instance.post(`${moduleName}/api/customerQuoteAudit/updCusQuoteStatusByCqdIds`, params);


// 客户报价
export const userListByDeptIdApi = params => instance.post(`/ygb-system-service/api/system/user/getUserListByDeptId`, params);
export const custompriceListApi = params => instance.get(`${moduleName}/api/quote/customerQuote/getPageList`, { params });
export const saveCustompriceApi = params => instance.post(`${moduleName}/api/quote/customerQuote/saveCustomerQuoteVo`, params);
export const updateCustompriceApi = params => instance.post(`${moduleName}/api/quote/customerQuote/updCustomerQuoteVo`, params);
export const deleteCustompriceApi = params => instance.post(`${moduleName}/api/quote/customerQuote/delByIds?${params.id}`, params);
export const getCustompriceLogApi = params => instance.get(`${moduleName}/api/quote/customerQuoteLog/list`, {params:params});
export const getTrailerPriceLogListApi = params => instance.get(`${moduleName}/api/quote/trailerQuoteLog/list`, {params:params});
export const quoteCopyApi = params => instance.get(`${moduleName}/api/quote/customerQuote/quoteCopy`, {params:params});
export const editValidateDateApi = params => instance.post(`${moduleName}/api/quote/customerQuote/updCustomerQuoteValidityDate`, params);


// 拖车报价管理
export const trailerpriceListApi = params => instance.get(`${moduleName}/api/quote/trailerQuote/getPageList`, { params });
export const saveTrailerpriceApi = params => instance.post(`${moduleName}/api/quote/trailerQuote/saveTrailerQuoteVo`, params);
export const updateTrailerpriceApi = params => instance.post(`${moduleName}/api/quote/trailerQuote/updTrailerQuoteVo`, params);
export const deleteTrailerPriceApi = params => instance.post(`${moduleName}/api/quote/trailerQuote/delByIds?${params.id}`, params);


// 码头
export const dockListApi = params => instance.get(`${moduleName}/api/base/dock/list`, { params });
export const saveDockApi = params => instance.post(`${moduleName}/api/base/dock/save`, params);
export const updateDockApi = params => instance.post(`${moduleName}/api/base/dock/update`, params);
export const deleteDockApi = params => instance.post(`${moduleName}/api/base/dock/deleteByIds`, params);
export const allDockListApi = params => instance.get(`${moduleName}/api/base/dock/all`);
/* //航线
export const regionListApi = params => {return instance.get(`/api/voyage/list`,{params:params})}
*/

// 固定费用管理
export const fixedpriceListApi = params => instance.get(`${moduleName}/api/base/cost/getPageList`, { params });
export const saveFixedpriceApi = params => instance.post(`${moduleName}/api/base/cost/saveCostVo`, params);
export const updateFixedpriceApi = params => instance.post(`${moduleName}/api/base/cost/updCostVo`, params);
export const costIsForbiddenApi = params => instance.post(`${moduleName}/api/base/cost/isEnable`, params);
export const getCostLogPageListApi = params => instance.get(`${moduleName}/api/base/costLog/getPageList`, { params });

//app上传版本文件
export const uploadApkApi = params =>{return instance.post(`${moduleName}/api/base/versionInfo/uploadApk`)};

//下载功能
export const download = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/base/businessContacts/testDownload?${params}`)};
//上传功能
export const uploadApi = params =>(`${instance.defaults.baseURL}${moduleName}/api/base/businessContacts/upload`);


// 客户退订
export const blackListApi = params => instance.get(`${moduleName}/api/base/blacklist/list`, { params });
export const saveBlackListApi = params => instance.post(`${moduleName}/api/base/blacklist/save`, params);
export const updateBlackListApi = params => instance.post(`${moduleName}/api/base/blacklist/update`, params);
export const deleteBlackListApi = params => instance.post(`${moduleName}/api/base/blacklist/delete/${params.id}`, params);







