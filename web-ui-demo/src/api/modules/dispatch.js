import Vue from 'vue'
// import instance from '../config-local';
import instance from '../config'
let moduleName = '/ygb-dispatch-service';


//调度
export const getDispatchList = params => {return instance.get(`${moduleName}/api/dispatch/dispatch/list`,{params:params})}
export const dispatch = params => {return instance.post(`${moduleName}/api/dispatch/dispatch/dispatch`,params)}
export const cancelDispatch = params => {return instance.post(`${moduleName}/api/dispatch/dispatch/cancelDispatch`,params)}
export const mastSend = params => {return instance.post(`${moduleName}/api/dispatch/dispatch/mastSend`,params)}
export const cancelMastSend = params => {return instance.post(`${moduleName}/api/dispatch/dispatch/cancelMastSend`,params)}
export const getDispatchListInit = params => {return instance.get(`${moduleName}/api/dispatch/dispatch/listInit`,{params:params})}

//行程
export const getScheduleList = params => {return instance.get(`${moduleName}/api/dispatch/schedule/list`,{params:params})}
//调度类型
export const getListInit = params => {return instance.get(`${moduleName}/api/dispatch/schedule/listInit`)}
//去行程合并页面
export const toMerge = params => {return instance.post(`${moduleName}/api/dispatch/schedule/toMerge`,params)}
//单拖套箱
export const mergeSchedule = params => {return instance.post(`${moduleName}/api/dispatch/schedule/merge`,params)}
//取消单拖套箱
export const cancelMerge = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelMerge`, params)}
//双拖
export const doubleMerge = params => {return instance.post(`${moduleName}/api/dispatch/schedule/doubleMerge`,params)}
//取消双拖
export const cancelDoubleMerge = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelDoubleMerge`,params)}
//双拖
export const doubleDrag = params => {return instance.post(`${moduleName}/api/dispatch/schedule/doubleDrag`,params)}
//取消双拖
export const cancelDoubleDrag = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelDoubleDrag`,params)}
//指派司机
export const assignDriver = params => {return instance.post(`${moduleName}/api/dispatch/schedule/assignDriver`,params)}
//取消指派司机
export const cancelAssignDriver = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelAssignDriver`,params)}
//指派车队
export const assignCarTeam = params => {return instance.post(`${moduleName}/api/dispatch/schedule/assignCarTeam`,params)}
//取消指派车队
export const cancelAssignCarTeam = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelAssignCarTeam`,params)}



//导出任务
export const exportTask = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/dispatch/export/task?${params}`)};
//导出司机信息
export const exportDriverInfo = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/dispatch/export/driver?${params}`)}
//导出装箱单
export const exportPackList = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/dispatch/export/packingList?${params}`)}
//结束行程
export const overSchedule = params => {return instance.post(`${moduleName}/api/dispatch/schedule/overSchedule`,params)}
//挂起
export const handUp = params => {return instance.post(`${moduleName}/api/dispatch/schedule/handUp`,params)}
//取消挂起
export const cancelHandUp = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelHandUp`,params)}
//放空
export const emptying = params => {return instance.post(`${moduleName}/api/dispatch/schedule/emptying`,params)}
//取消放空
export const cancelEmptying = params => {return instance.post(`${moduleName}/api/dispatch/schedule/cancelEmptying`,params)}
//返回已指派
export const goToAssigned = params => {return instance.post(`${moduleName}/api/dispatch/schedule/goToAssigned`,params)}
//更新备注
export const updateRemark = params => {return instance.post(`${moduleName}/api/dispatch/schedule/updateRemark`,params)}
//更新要求完成日期
export const updateOverDate = params => {return instance.post(`${moduleName}/api/dispatch/schedule/updateOverDate`,params)}
//任务详情
export const toTaskDetail = params => {return instance.post(`${moduleName}/api/dispatch/schedule/toTaskDetail`,params)}
//任务节点获取列表接口
export const getTaskList = params => {return instance.get(`${moduleName}/api/dispatch/taskNode/list`,{params:params})}
//任务节点获取列表接口
export const saveTask = params => {return instance.post(`${moduleName}/api/dispatch/taskNode/save`,params)}
//任务节点修改列表接口
export const updateTask = params => {return instance.post(`${moduleName}/api/dispatch/taskNode/update`,params)}
//任务流程获取列表接口
export const getTaskProcessList = params => {return instance.get(`${moduleName}/api/dispatch/taskProcess/list`,{params:params})}
//新增任务流程接口
export const saveTaskProcess = params => {return instance.post(`${moduleName}/api/dispatch/taskProcess/save`,params)}
//修改任务流程接口
export const  updateTaskProcess = params => {return instance.post(`${moduleName}/api/dispatch/taskProcess/update`,params)}
//任务流程获取详情列表接口
export const getTaskProcessDetailList = params => {return instance.get(`${moduleName}/api/dispatch/taskProcessDetail/list`,{params:params})}
//获取任务流程名称
export const getTaskProcessNameList = params => {return instance.post(`${moduleName}/api/dispatch/taskProcessDetail/getTaskProcess`,params)}
//获取任务节点名称
export const getTaskNodeNameList = params => {return instance.post(`${moduleName}/api/dispatch/taskProcessDetail/getTaskNode`,params)}
//新增任务流程详情
export const saveTaskProcessDetail = params => {return instance.post(`${moduleName}/api/dispatch/taskProcessDetail/save`,params)}
//修改任务流程详情
export const updateTaskProcessDetail = params => {return instance.post(`${moduleName}/api/dispatch/taskProcessDetail/update`,params)}

export const deleteTaskProcessDetail = params => {return instance.post(`${moduleName}/api/dispatch/taskProcessDetail/delete/${params}`)}

export const batchPublish = params => {return instance.post(`${moduleName}/api/dispatch/schedule/batchPublish`,params)}
// 调度页面的柜子统计
export const getCountCabinet = params => {return instance.get(`${moduleName}/api/dispatch/schedule/countCabinet`,{params:params})}
// 超时压夜
export const timeoutWarnListApi = params => {return instance.get(`${moduleName}/api/dispatch/overTime/overTimeTask`,{params:params})}
// 导出超时压夜数据
export const exportTimeout = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/dispatch/overTime/overTimeTaskList?${params}`)}
//超时压夜编辑备注
export const updateOverTimeRemark = params => {return instance.post(`${moduleName}/api/dispatch/overTime/updateOverTimeRemark`,params)}
// (调度)司机费用审核
export const getExpenseAuditList = params => {return instance.get(`${moduleName}/api/dispatch/expenseAudit/listDriverExpense`,{params:params})}
// (调度)司机费用通过/不通过
export const getCostPass = params => {return instance.get(`${moduleName}/api/dispatch/expenseAudit/updateExpenseAuditStatus`,{params:params})}
// （客服）司机费用审核
export const getExpenseSubmissionList = params => {return instance.get(`${moduleName}/api/dispatch/expenseAuditByCS/listDriverExpenseBySubmitStatus`,{params:params})}
//(客服)司机费用审核新增费用
export const getSubmitReqDto = params => {return instance.get(`${moduleName}/api/dispatch/expenseAuditByCS/initDropDownListForSubmit`,{params:params})}
// （客服）司机费用审核新增费用提交
export const getSubmitDriverExpense = params => {return instance.get(`${moduleName}//api/dispatch/expenseAuditByCS/submitDriverExpense`,{params:params})}
// (调度)司机费用审核车牌
export const getListExpense = params => {return instance.get(`${moduleName}/api/dispatch/expenseAudit/initDropDownList`)}
// (客服)司机费用审核车牌
export const getListExpenseByCS = params => {return instance.get(`${moduleName}/api/dispatch/expenseAuditByCS/initDropDownList`)}
// 调度获取详情
export const getListTaskDetail = params => {return instance.get(`${moduleName}/api/dispatch/expenseAudit/listTaskDetail`,{params:params})}
// 客服获取详情
export const getListTaskDetailByCS = params => {return instance.get(`${moduleName}/api/dispatch/expenseAuditByCS/listTaskDetail`,{params:params})}
// 签收单
export const getsignList = params => {return instance.get(`${moduleName}/api/dispatch/schedule/listSignedBill`,{params:params})}
//上传签收单号
export const saveSignedBillUrl = params => {return instance.post(`${moduleName}/api/dispatch/schedule/uploadSignedBill`,params)}
//删除签收单
export const deleteSignedBill = params => {return instance.post(`${moduleName}/api/dispatch/schedule/deleteSignedBill`,params)}
//编辑签收单号
export const editSignedBillNo = params => {return instance.post(`${moduleName}/api/dispatch/schedule/editSignedBillNo`,params)}
//签收单回收确认
export const updateSignedBill = params => {return instance.post(`${moduleName}/api/dispatch/schedule/validateSignedBill`,params)}
// 船名航次
export const getshipList = params => {return instance.post(`${moduleName}/api/dispatch/voyage/getVoyageList`,params)}
//船名航次下拉列表
export const getShipListInit = params => {return instance.get(`${moduleName}/api/dispatch/voyage/initDropDownList`)}
//维护船名航次实际到港时间
export const maintenanceUpdata = params => {return instance.post(`${moduleName}/api/dispatch/voyage/updateArriveDate`,params)}
//导出签收单
export const exportSign = params => {window.open(`${instance.defaults.baseURL}${moduleName}/api/dispatch/signedbill/exportSignedBill?${params}`)}
/*签收单页面的柜子统计*/
export const getSignmanagementApi = params => {return instance.get(`${moduleName}/api/dispatch/signedbill/countSignedBill`,{params:params})};



