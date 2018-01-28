
import api from '../../api'
import axios from 'axios'




// 应用初始状态，按模块划分，所有的接口都在这里
const state = {

	//custompriceList:{},
    // fleetadminList:{},
    // allfleetList:{},


}


const getters = {



    // custompriceList(state) {
    //     return state.custompriceList
    // },

    // fleetadminList(state) {
    //     return state.fleetadminList
    // },
    // allfleetList(state) {
    //     return state.allfleetList
    // },

}

const actions = {


	//车队管理
    // getFleetadminList({commit},param){
     //    return api.fleetAdminListApi(param).then((res) =>{
     //        console.log(res.data.data)
     //        commit('FLEETADMINLIST',res.data.data)
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
     //    })
    // },
    // getAllfleetList({commit},param){
     //    return api.allFleetListApi(param).then((res) =>{
     //        console.log(res.data.data)
     //        commit('ALLFLEETLIST',res.data.data)
     //        return new Promise((resolve, reject) => {
     //            resolve(res.data);
     //        })
     //    })
    // },
    // saveFleet({commit},param){
     //   return api.saveFleetApi(param).then((res) =>{
     //       return new Promise((resolve, reject) => {
     //           resolve(res.data);
     //       })
    //
     //   })
    // },
    // updateFleet({commit},param){
     //   return api.updateFleetApi(param).then((res) =>{
     //       console.log(res.data.data)
     //       return new Promise((resolve, reject) => {
     //           resolve(res.data);
     //       })
    //
     //   })
    // },
    // deleteFleet({commit},param){
     //   return api.deleteFleetApi(param).then((res) =>{
     //       return new Promise((resolve, reject) => {
     //           resolve(res.data);
     //       })
    //
     //   })
    // },
  addBatchUploadPicApi({commit},param){
    return api.batchUploadPicApi(param).then((res) =>{
        console.log(res.data.data)
        return new Promise((resolve, reject) => {
            resolve(res.data);
        })

    })
  },




}


const mutations = {

	//CUSTOMPRICELIST(state,res) { state.custompriceList = res },
    // FLEETADMINLIST(state,res) { state.fleetadminList = res },
    // ALLFLEETLIST(state,res) { state.allfleetList = res },


	}

export default {
	state,
	getters,
	actions,
	mutations
}
