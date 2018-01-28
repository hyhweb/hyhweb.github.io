// import instance from '../config-local';
import instance from '../config';
// import instance from '../config-local';
// 接口传参
const moduleName = '/ygb-base-service';

//外部接口
//安通码头
export const dockAtListApi = params => instance.get(`${moduleName}/api/base/dockAt/listDto`, { params });
export const saveDockAtApi = params => instance.post(`${moduleName}/api/base/dockAt/save`, params);
export const updateDockAtApi = params => instance.post(`${moduleName}/api/base/dockAt/update`, params);
export const deleteDockAtApi = params => instance.post(`${moduleName}/api/base/dockAt/deleteByIds`, params);

//泛亚码头
export const dockFyListApi = params => instance.get(`${moduleName}/api/base/dockFy/listDto`, { params });
export const saveDockFyApi = params => instance.post(`${moduleName}/api/base/dockFy/save`, params);
export const updateDockFyApi = params => instance.post(`${moduleName}/api/base/dockFy/update`, params);
export const deleteDockFyApi = params => instance.post(`${moduleName}/api/base/dockFy/deleteByIds`, params);

//安通区域
export const regionAtListApi = params => instance.get(`${moduleName}/api/base/regionAt/listDto`, { params });
export const saveRegionAtApi = params => instance.post(`${moduleName}/api/base/regionAt/save`, params);
export const deleteRegionAtApi = params => instance.post(`${moduleName}/api/base/regionAt/deleteByIds`, params);
export const updateRegionAtApi = params => instance.post(`${moduleName}/api/base/regionAt/update`, params);
//泛亚区域
export const regionFyListApi = params => instance.get(`${moduleName}/api/base/regionFy/listDto`, { params });
export const saveRegionFyApi = params => instance.post(`${moduleName}/api/base/regionFy/save`, params);
export const deleteRegionFyApi = params => instance.post(`${moduleName}/api/base/regionFy/deleteByIds`, params);
export const updateRegionFyApi = params => instance.post(`${moduleName}/api/base/regionFy/update`, params);


//安通港口
export const harborAtListApi = params => instance.get(`${moduleName}/api/base/harborAt/listDto`, { params });
export const saveHarborAtApi = params => instance.post(`${moduleName}/api/base/harborAt/save`, params);
export const updateHarborAtApi = params => instance.post(`${moduleName}/api/base/harborAt/update`, params);
export const deleteHarborAtApi = params => instance.post(`${moduleName}/api/base/harborAt/deleteByIds`, params);


//泛亚港口
export const harborFyListApi = params => instance.get(`${moduleName}/api/base/harborFy/listDto`, { params });
export const saveHarborFyApi = params => instance.post(`${moduleName}/api/base/harborFy/save`, params);
export const updateHarborFyApi = params => instance.post(`${moduleName}/api/base/harborFy/update`, params);
export const deleteHarborFyApi = params => instance.post(`${moduleName}/api/base/harborFy/deleteByIds`, params);




