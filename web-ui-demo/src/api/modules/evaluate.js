import instance from '../config';
//接口传参
//地区
let moduleName ="/ygb-logistics-service"
// let moduleName =""

//评价管理
export const getDriverEvaluateListApi = params => {return instance.post(`${moduleName}/api/logistics/driverEvaluate/getPageList`,params)}
