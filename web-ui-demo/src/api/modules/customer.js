import instance from '../config';
//import instance from '../config-local';

let moduleName ="/ygb-customer-service"
export const customerAdminListApi = params =>{return instance.get(`${moduleName}/api/customer/list`,{params:params})};
export const customerDeleteApi = params =>{return instance.post(`${moduleName}/api/customer/delete/${params.id}`,params)};
export const customerSaveApi = params =>{return instance.post(`${moduleName}/api/customer/save`,params)};
export const customerUpdateApi = params =>{return instance.post(`${moduleName}/api/customer/update`,params)};
export const settle = params => {return instance.post(`${moduleName}/api/customer/settle`,params)};
export const cancelSettle = params => {return instance.post(`${moduleName}/api/customer/cancelSettle`,params)};
export const customListApi = params => instance.get(`${moduleName}/api/customer/getAll`, { params });
export const getCustomList1Api = params => instance.get(`${moduleName}/api/customer/getByRequisitionObj`, { params });
export const getCustomList2Api = params => instance.get(`${moduleName}/api/customer/getByRequisitionObj`, { params });
export const customListInCustomApi = params => instance.get(`${moduleName}/api/customer/getBySalesman`, { params });

//下单客户列表导出接口
export const exportCustomerApi = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/customer/exportCustomer?${params}`)};

//客户帐户信息的分页查询
export const customerAccountApi =params=>instance.get(`${moduleName}/api/customerAccount/getPageList`,{ params:params });
//客户账户信息删除
export const customerAccountDeleteApi = params =>{return instance.post(`${moduleName}/api/customerAccount/deleteById`,params)};
//客户信息修改
export  const  customerAccountUpdateApi=params=>{return instance.post(`${moduleName}/api/customerAccount/updateByCustomerAccount`,params)}
//新增客户用户
export   const  customerAccountAddApi=params=>{return instance.post(`${moduleName}/api/customerAccount/addCustomer`,params)};
//客户账户重置密码接口
export const customerAccountResetPasswordApi = params => instance.post(`${moduleName}/api/customerAccount/resetPassword`, params);

//客户评价
export const getCustomerEvaluateListApi = params => {return instance.get(`${moduleName}/api/customerEvaluate/list`,{params:params})};
export const getCustomerEvaluateUpdateApi = params => {return instance.post(`${moduleName}/api/customerEvaluate/update`,params)};
export const getCustomerEvaluateDeteleApi = params => {return instance.post(`${moduleName}/api/customerEvaluate/delete/${params}`)};


//获取用户下拉列表
export const getUserDropdownList = params => {return instance.post(`${moduleName}/api/public/customer/getUserDropdownList`)};
//获取开票性质
export const getInvoicePropertiesList = params => {return instance.get(`${moduleName}/api/public/customer/getInvoicePropertiesList`, {params})};


//批量扣货
export const batchDetainingCargoApi = params => {return instance.post(`${moduleName}/api/customer/batchDetainingCargo`,params)};

//取消扣货
export const cancelDetainingCargoApi = params => {return instance.post(`${moduleName}/api/customer/cancelDetainingCargo`,params)};

//个人帐号信息管理-列表查询接口
export const getPersonalAccountListApi = params => {return instance.get(`${moduleName}/api/customer/personAccount/getPageList`,{params:params})};
//个人帐号信息管理-删除接口
export const delPersonalAccountApi = params => {return instance.post(`${moduleName}/api/customer/personAccount/delById`,params)};
//个人帐号信息管理-导出接口
// export const exportPersonalAccountListApi = params => {return instance.get(`${moduleName}/api/customer/personAccount/exportPersonAccount`,{params:params})};
// export const exportPersonalAccountListApi = params => {return instance.get(`${moduleName}/api/customer/personAccount/exportPersonAccount?${params}`)};
// export const exportPersonalAccountListApi = params => {
//   return instance.get(`${instance.defaults.baseURL}${moduleName}/api/customer/personAccount/exportPersonAccount?${params}`,{
//     responseType: 'blob'
//   })
// };
export const exportPersonalAccountListApi = params => {
  window.open(`${instance.defaults.baseURL}${moduleName}/api/customer/personAccount/exportPersonAccount?${params}`)
}
//下单客户管理-微信关联列表
export const getWechatBindingListApi = params => {return instance.get(`${moduleName}/api/customer/customerAccountWechat/getList`,{params:params})};
//下单客户管理-解绑微信账号
export const unbindWechatAccountApi = params => {return instance.post(`${moduleName}/api/customer/customerAccountWechat/delById`,params)};










