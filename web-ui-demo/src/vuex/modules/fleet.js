
import api from '../../api'
import axios from 'axios'




// 应用初始状态，按模块划分，所有的接口都在这里
const state = {

	//custompriceList:{},
    fleetadminList:{},
    bankList: {}

}


const getters = {

    // custompriceList(state) {
    //     return state.custompriceList
    // },

    fleetadminList(state) {
        return state.fleetadminList
    },
    bankList(state) {
        return state.bankList
    },

}

const actions = {
	//车队管理
    getFleetadminList({commit},param){
        return api.fleetAdminListApi(param).then((res) =>{
            // console.log(res.data.data)
            commit('FLEETADMINLIST',res.data.data)
            return new Promise((resolve, reject) => {
                resolve(res.data);
            })
        })
    },
    saveFleet({commit},param){
       return api.saveFleetApi(param).then((res) =>{
           return new Promise((resolve, reject) => {
               resolve(res.data);
           })

       })
    },
    updateFleet({commit},param){
       return api.updateFleetApi(param).then((res) =>{
           // console.log(res.data.data)
           return new Promise((resolve, reject) => {
               resolve(res.data);
           })

       })
    },
    deleteFleet({commit},param){
       return api.deleteFleetApi(param).then((res) =>{
           return new Promise((resolve, reject) => {
               resolve(res.data);
           })

       })
    },
    resetPassword({commit},params) {
      return api.sys.user.resetPasswordApi(params).then((res) =>{
        return new Promise((resolve, reject) => {
          resolve(res.data);
        })
      })
    },
  getBankList({commit},param){
    return api.getBankListApi(param).then((res) =>{
      // console.log(res.data.data)
      commit('BANKLIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },



	//客户报价管理
    // getCustompriceList({commit},param){
     //    return api.custompriceListApi(param).then((res) =>{
     //        console.log(res.data.data)
     //        commit('CUSTOMPRICELIST',res.data.data)
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
     //    })
    // },
    // getCustomList({commit},param){
     //    return api.customListApi(param).then((res) =>{
     //        console.log(res.data.data)
     //        commit('CUSTOMLIST',res.data.data)
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
     //    })
    // },
    //
    // saveCustomprice({commit},param){
     //    return api.saveCustompriceApi(param).then((res) =>{
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
    //
     //    })
    // },
    // updateCustomprice({commit},param){
     //    return api.updateCustompriceApi(param).then((res) =>{
     //        console.log(res.data.data)
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
    //
     //    })
    // },
    // deleteCustomprice({commit},param){
     //    return api.deleteCustompriceApi(param).then((res) =>{
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
    //
     //    })
    // },


}


const mutations = {

	//CUSTOMPRICELIST(state,res) { state.custompriceList = res },
    FLEETADMINLIST(state,res) { state.fleetadminList = res },
    BANKLIST(state,res) { state.bankList = res },

	}

export default {
	state,
	getters,
	actions,
	mutations
}
