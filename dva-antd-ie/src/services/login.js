import request from '../utils/request';

const dispatch = "ygb-dispatch-service";
const base = "ygb-base-service";
const order ="ygb-order-service";

export async function login (data) {
  return request({
    url: `${base}/api/pc/account/login`,
    method: 'post',
    data,
  })
}
export async function sendMessageToPhone (data) {
  return request({
    url: `${base}/api/base/messageInfo/sendMessageToPhoneWechat`,
    method: 'post',
    data,
  })
}
