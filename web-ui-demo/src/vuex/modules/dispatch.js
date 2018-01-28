import api from '../../api'
 
// 应用初始状态
const state = {
  dispatchList: [],
  scheduleList: [],
  signList:[],
  expenseAuditList:[],
  expenseSubmissionList:[],
  taskList: [],
  taskProcessList:[],
  taskProcessDetailList:[],
  countCabinet:[], 
  timeoutWarnList:[],
  shipList:[],
}

const getters = {
  timeoutWarnList(state){
		return state.timeoutWarnList
	},
  shipList(state) {
    return state.shipList
  },
  dispatchList(state){
    return state.dispatchList
  },
  scheduleList(state){
    return state.scheduleList
  },
  signList(state){
    return state.signList
  },  
  expenseAuditList(state){
    return state.expenseAuditList
  }, 
  expenseSubmissionList(state) {
    return state.expenseSubmissionList
  },
  taskList(state){
    return state.taskList
  },
  taskProcessList(state){
    return state.taskProcessList
  },
  countCabinet(state){
     return state.countCabinet
  },
  taskProcessDetailList(state){
    return state.taskProcessDetailList
  }
}

const actions = {
  // 超时压夜
  getTimeoutWarnList({commit}, param) {
			return api.timeoutWarnListApi(param).then((res) =>{
			  	commit('TIMEOUT_LIST', res)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
    //船名航次
    getshipList({commit}, param) {
      return api.getshipList(param).then((res) =>{
          commit('SHIP_LIST', res)
          return new Promise((resolve, reject) => {
                resolve(res.data);
          })
      })      
    },
  getDispatchList({commit}, param){
    return api.getDispatchList(param).then((res) => {
      commit('DISPATCH_LIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data); 
      })
    })
  },
  getScheduleList({commit}, param){
    return api.getScheduleList(param).then((res) => {
      commit('SCHEDULE_LIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //签收单 
  getsignList({commit}, param){
    return api.getsignList(param).then((res) => {
      commit('SIGN_LIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },  
  // （调度）司机费用审核
  getExpenseAuditList({commit}, param){
    return api.getExpenseAuditList(param).then((res) => {
      commit('EXPENSEAUDIT_LIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },  
  // （客服）司机费用审核
  getExpenseSubmissionList({commit}, param){
    return api.getExpenseSubmissionList(param).then((res) => {
      commit('EXPENSESUBMISSION_LIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },    
 /*调度页面的柜子统计*/
  getCountCabinet({commit},params){
    return api.getCountCabinet(params).then((res)=>{
      commit('COUNT_CABINET', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },  
  getTaskList({commit}, param){
    return api.getTaskList(param).then((res) => {
      commit('TASK_LIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  getTaskProcessList({commit}, param){
    return api.getTaskProcessList(param).then((res) => {
      commit('TASK_PROCESSLIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
 
  getTaskProcessDetailList({commit}, param){
    return api.getTaskProcessDetailList(param).then((res) => {
      commit('TASK_PROCESSDETAILLIST', res);
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    }) 
  }

}

const mutations = {
  TIMEOUT_LIST(state,res){
   if (res.data.code == '1') {
      state.timeoutWarnList = res.data.data;
    }
  },
  SHIP_LIST(state,res){
    if (res.data.code == '1') {
      state.shipList = res.data.data;
    }    
  },
  DISPATCH_LIST(state, res) {
    if (res.data.code == '1') {
      state.dispatchList = res.data.data;
    }

  },
  SCHEDULE_LIST(state, res) {
    if (res.data.code == '1') {
      state.scheduleList = res.data.data;
    }
  },
  SIGN_LIST(state, res) {
    if (res.data.code == '1') {
      state.signList = res.data.data;
    }
  },
  EXPENSEAUDIT_LIST(state, res) {
    if (res.data.code == '1') {
      state.expenseAuditList = res.data.data;
    }

  },
  EXPENSESUBMISSION_LIST(state, res){
    if (res.data.code == '1') {
      state.expenseSubmissionList = res.data.data;
    }    
  },
  TASK_LIST(state, res) {
    if (res.data.code == '1') {
      state.taskList = res.data.data;
    }

  },
  TASK_PROCESSLIST(state, res) {
    if (res.data.code == '1') {
      state.taskProcessList = res.data.data;
    }

  },
  // 
  COUNT_CABINET(state, res){
    if (res.data.code == '1') {
      state.countCabinet = res.data.data;
    }    
  },
  TASK_PROCESSDETAILLIST(state, res) {
    if (res.data.code == '1') {
      state.taskProcessDetailList = res.data.data;
    }

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
