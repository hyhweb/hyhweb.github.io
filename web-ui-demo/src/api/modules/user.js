import instance from '../config';

/*select,radio,checkbox的数据接口*/
export const cakeTypeListApi = params =>{return instance.get(`/form/select.json`,{params:params})}
export const driverTypeListApi = params =>{return instance.get(`/form/checkbox.json`,{params:params})}
