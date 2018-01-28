import instance from '../config'
 // import instance from '../config-local';
// let moduleName = '/api/dispatch'
let moduleName = '/ygb-logistics-service'


//车队管理
export const getAllCarTeamInfoList = params => {return instance.get(`${moduleName}/api/logistics/carteamInfo/all`)}
/*全部拖车接口*/
export const carteamAllApi = params => {return instance.get(`${moduleName}/api/logistics/carteamInfo/all`,{params:params})}


//拖车管理
export const getTrailerInfoList = params => {return instance.get(`${moduleName}/api/logistics/trailerInfo/all`)}
//根据车队获取拖车列表
export const getListByCarTeamId = carteamId => {return instance.get(`${moduleName}/api/logistics/trailerInfo/getListByCarTeamId?carteamId=${carteamId}`)}
/*拖车管理接口*/
export const trailerInfoApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/getPageList`,params)}
/*拖车信息新增接口*/
export const trailerInfoSaveApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/save`,params)}
/*拖车信息修改接口*/
export const trailerInfoUpdateApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/update`,params)}
/*拖车信息删除接口*/
export const trailerInfoDeleteApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/delete/${params.id}`,params)}
/*拖车列表导出Excel接口*/
export const trailerInfoExportExcelApi = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/logistics/trailerInfo/exportExcel?${params}`)};
/*车队联动司机接口*/
export const driverByCarteamIdApi = params => {return instance.get(`${moduleName}/api/logistics/trailerInfo/getDriverListByCarTeamId`,{params:params})}
/*所有车辆是否加入调度接口*/
export const carDispatchApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/updIsDispatchByIds`,params)}
/*拖车是否禁用*/
export const trailerIsEnableApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/isEnable`,params)}
/*拖车是否停运*/
export const trailerIsOutageApi = params => {return instance.post(`${moduleName}/api/logistics/trailerInfo/isOutage`,params)}


//司机管理
export const driverListByCarTeamId = params => {return instance.post(`${moduleName}/api/logistics/driverInfo/getListByCarteamId`,params)}
/*司机信息列表接口*/
export const driverInfoApi = params => {return instance.post(`${moduleName}/api/logistics/driverInfo/getPageList`,params)}
/*司机信息新增接口*/
export const driverInfoSaveApi = params => {return instance.post(`${moduleName}/api/logistics/driverInfo/saveDriverInfo`,params)}
/*司机信息修改接口*/
export const driverInfoUpdateApi = params => {return instance.post(`${moduleName}/api/logistics/driverInfo/updateDriverInfo`,params)}
/*司机信息删除接口*/
export const driverInfoDeleteApi = params => {return instance.post(`${moduleName}/api/logistics/driverInfo/delete/${params.id}`,params)}
/*所有请假司机接口*/
export const getAllLeaveDriverInfoApi = params => {return instance.post(`${moduleName}/api/logistics/driverInfo/getAll`,params)}
//司机重置密码接口
export const driverResetPasswordApi = params => instance.post(`${moduleName}/api/logistics/driverInfo/resetPassword`, params);


//司机请假管理
/*司机请假列表接口*/
export const driverLeaveApi = params => {return instance.post(`${moduleName}/api/logistics/driverLeave/getPageList`,params)}
/*司机请假审核接口*/
export const driverLeaveUpdStatusApi = params => {return instance.post(`${moduleName}/api/logistics/driverLeave/updStatusByIds`,params)}


//拖车停运管理
/*拖车停运新增接口*/
export const trailerOutgateSaveApi = params => {return instance.post(`${moduleName}/api/logistics/trailerOutgate/save`,params)}
/*拖车停运修改接口*/
export const trailerOutgateUpdateApi = params => {return instance.post(`${moduleName}/api/logistics/trailerOutgate/update`,params)}
/*拖车停运删除接口*/
export const trailerOutgateDeleteApi = params => {return instance.post(`${moduleName}/api/logistics/trailerOutgate/deleteByIds`,params)}
/*拖车停运管理接口*/
export const trailerOutgateApi = params => {return instance.post(`${moduleName}/api/logistics/trailerOutgate/getPageList`,params)}


//拖车营运管理
/*车辆运营管理接口*/
export const businessDataApi = params => {return instance.post(`${moduleName}/api/logistics/businessData/getPageList`,params)}


/*获取部门接口*/
export const deptItemByLevelApi = params => {return instance.post(`ygb-system-service/api/system/sysOrg/getDeptItemByLevel?level=3`,params)}








