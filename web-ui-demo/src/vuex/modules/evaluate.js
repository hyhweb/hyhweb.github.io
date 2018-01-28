import api from '../../api'

// 应用初始状态
const state = {
  driverEvaluateList:{},
  customerEvaluateList:{}

}
const getters = {
	driverEvaluateList(state){
	  return state.driverEvaluateList;
  },
  customerEvaluateList(state){
    return state.customerEvaluateList;
  }
}


const actions = {

  //获取司机评级列表
  getDriverEvaluateList({commit},params) {
    return api.getDriverEvaluateListApi(params).then((res) =>{
      commit('GETDRIVEREVALUATELIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //获取司机评级列表
  getCustomerEvaluateList({commit},params) {
    return api.getCustomerEvaluateListApi(params).then((res) =>{
      commit('CUSTOMEREVALUATELIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

}
const mutations = {
  GETDRIVEREVALUATELIST(state,res){
    state.driverEvaluateList = res;
  },
  CUSTOMEREVALUATELIST(state,res){
    state.customerEvaluateList = res;
  }
}

export default {
	state,
	getters,
	actions,
	mutations
}
