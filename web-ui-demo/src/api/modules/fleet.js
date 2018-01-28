import instance from '../config';
//接口传参
//地区
let moduleName ="/ygb-logistics-service"
// let moduleName =""

//车队管理
export const fleetAdminListApi = params => {return instance.get(`${moduleName}/api/logistics/carteamInfo/list`,{params:params})}
export const getBankListApi = params => {return instance.get(`${moduleName}/api/logistics/driverInfo/getBankList`,{params:params})}
export const saveFleetApi = params => {return instance.post(`${moduleName}/api/logistics/carteamInfo/save`,params)}
export const updateFleetApi = params => {return instance.post(`${moduleName}/api/logistics/carteamInfo/update`,params)}
export const deleteFleetApi = params => {return instance.post(`${moduleName}/api/logistics/carteamInfo/deleteByIds?${params.id}`,params)}

//export const customListApi = params => {return instance.get(`/ygb-customer-service/api/customer/list`,{params:params})}
//export const saveCustompriceApi = params => {return instance.post(`${moduleName}/api/quote/customerQuote/saveCustomerQuoteVo`,params)}
//export const updateCustompriceApi = params => {return instance.post(`${moduleName}/api/quote/customerQuote/updCustomerQuoteVo`,params)}
//export const deleteCustompriceApi = params => {return instance.post(`${moduleName}/api/quote/customerQuote/delByIds/${params.id}`,params)}
