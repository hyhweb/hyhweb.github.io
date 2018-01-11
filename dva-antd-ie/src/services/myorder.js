import request from '../utils/request';
const dispatch = "ygb-dispatch-service";
const base = "ygb-base-service";
const order ="ygb-order-service";

//我的订单查询数据列表 
export async function getOrderListApi (data) {
  return request({
    url: `/${order}/api/pc/order/getMyCabinetVOList`,
    method: 'post',
    data,
  })
}
//订单查询数据列表
export async function getQuickQueryCabinetVOListApi (data) {
  return request({
    url: `/${order}/api/pc/order/quickQueryCabinetVOList`,
    method: 'post',
    data,
  })
}



//重回查询数据列表
export async function getLuckContainerApi (data) {
  return request({
    url: `/${dispatch}/api/pc/dispatch/getLuckContainer`,
    method: 'post',
    data,
  })
}

//订单详情
export async function getCabinetDetailVOByCabinetIdApi (data) {
  return request({
    url: `/${order}/api/pc/order/getCabinetDetailVOByCabinetId`,
    method: 'post',
    data,
  })
}


//省份，城市，地区下拉列表
export async function getRegionApi (data) {
  return request({
    url: `/${base}/api/pc/baseController/getRegionWheel/${data.code}`,
    method: 'get',
    data,
  })
}

//港口下拉列表
export async function getAllHarborWechatApi (data) {
  return request({
    url: `/${base}/api/wechat/base/getAllHarborWechat`,
    method: 'get',
    data,
  })
}

//船公司下拉列表
export async function getAllShipCompanyWechatApi (data) {
  return request({
    url: `/${base}/api/wechat/base/getAllShipCompanyWechat`,
    method: 'get',
    data,
  })
}



