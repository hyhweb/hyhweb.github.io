import api from '../../api'

// 应用初始状态
const state = {
  personalAccountList:{},
	customAdminList:{},
  customerAccountList:{}
}
const getters = {
  personalAccountList(state){
		return state.personalAccountList
	},
	customAdminList(state){
		return state.customAdminList
	},
  customerAccountList(state) {
	  console.log(state)
    return state.customerAccountList
  }
}
const actions = {
  /*个人帐号信息管理--获取列表*/
  getPersonalAccountList({commit},params) {
    return api.getPersonalAccountListApi(params).then((res) =>{
      commit('PERSONALACCOUNTLIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
	/*获取客户列表*/
	 getCustomerAdminList({commit},params) {
		return api.customerAdminListApi(params).then((res) =>{
				commit('CUSTOMERADMINLIST',res.data.data)
				return new Promise((resolve, reject) => {
			        resolve(res.data);
				})
		})
	},
	/*删除客户*/
	 customerDelete({commit},params) {
			return api.customerDeleteApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
	/*新增客户*/
	 customerInfoSave({commit},params) {
			return api.customerSaveApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
	 /*修改客户*/
	 customerUpdate({commit},params) {
			return api.customerUpdateApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
  //客户帐户信息
  getCustomerAccountList({commit}, param){
    return api.customerAccountApi(param).then((res) => {
      console.log(res.data.data)
      commit('CUSTOMERACCOUNTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  /*删除客户信息账户*/
  CustomerAccountDelete({commit},params) {
    console.log(params)
    return api.customerAccountDeleteApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*修改客户用户*/
  CustomerAccountUpdate({commit},params) {
    console.log(params)
    return api.customerAccountUpdateApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*新增客户用户信息*/
  customerAccountSave({commit},params) {
    return api.customerAccountAddApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  checkloginName({commit},params) {

    return api.sys.user.checkLoginNameApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  /*下单客户账户重置密码*/
  customerAccountResetPassword({commit},params) {
    return api.customerAccountResetPasswordApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
/*批量扣货*/
  batchDetainingCargo({commit},params) {
    return api.batchDetainingCargoApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
/*取消扣货*/
  cancelDetainingCargo({commit},params) {
    return api.cancelDetainingCargoApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },



}
const mutations = {
	PERSONALACCOUNTLIST(state,res){
	  state.personalAccountList = res
  },
  CUSTOMERADMINLIST(state,res){
	  state.customAdminList = res
  },
  CUSTOMERACCOUNTLIST(state,res) {
	  state.customerAccountList = res
  }
}

export default {
	state,
	getters,
	actions,
	mutations
}
