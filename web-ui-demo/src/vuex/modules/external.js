import api from '../../api'
import axios from 'axios'


// 应用初始状态，按模块划分，所有的接口都在这里
const state = {
  dockAtList: {},
  harborAtList: {},
  regionAtList: {},
  dockFyList: {},
  harborFyList: {},
  regionFyList: {},
}


const getters = {
  dockAtList(state) {
    return state.dockAtList
  },
  harborAtList(state) {
    return state.harborAtList
  },
  regionAtList(state) {
    return state.regionAtList
  },

  dockFyList(state) {
    return state.dockFyList
  },
  harborFyList(state) {
    return state.harborFyList
  },
  regionFyList(state) {
    return state.regionFyList
  },

}

const actions = {

  //码头(安通)管理
  //码头(安通)分页列表、查询
  getDockAtList({commit}, param){
    return api.dockAtListApi(param).then((res) => {
      commit('DOCKATLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存码头(安通)
  saveDockAt({commit}, param){
    return api.saveDockAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新码头(安通)
  updateDockAt({commit}, param){
    return api.updateDockAtApi(param).then((res) => {
      commit('DOCKATLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除码头(安通)
  deleteDockAt({commit}, param){
    return api.deleteDockAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //码头(泛亚)管理
  //码头(泛亚)分页列表、查询
  getDockFyList({commit}, param){
    return api.dockFyListApi(param).then((res) => {
      commit('DOCKFYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存码头(泛亚)
  saveDockFy({commit}, param){
    return api.saveDockFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新码头(泛亚)
  updateDockFy({commit}, param){
    return api.updateDockFyApi(param).then((res) => {
      commit('DOCKFYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除码头(泛亚)
  deleteDockFy({commit}, param){
    return api.deleteDockFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //区域(安通)管理
  //区域(安通)分页列表、查询
  getRegionAtList({commit}, param){
    return api.regionAtListApi(param).then((res) => {
      commit('REGIONATLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存区域(安通)
  saveRegionAt({commit}, param){
    return api.saveRegionAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //修改区域(安通)
  updateRegionAt({commit}, param){
    return api.updateRegionAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //删除区域(安通)
  deleteRegionAt({commit}, param){
    return api.deleteRegionAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //区域(泛亚)管理
  //区域(泛亚)分页列表、查询
  getRegionFyList({commit}, param){
    return api.regionFyListApi(param).then((res) => {
      commit('REGIONFYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存区域(泛亚)
  saveRegionFy({commit}, param){
    return api.saveRegionFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //修改区域(泛亚)
  updateRegionFy({commit}, param){
    return api.updateRegionFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //删除区域(泛亚)
  deleteRegionFy({commit}, param){
    return api.deleteRegionFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },



  //港口(安通)管理
  //港口(安通)分页列表、查询
  getHarborAtList({commit}, param){
    return api.harborAtListApi(param).then((res) => {
      commit('HARBORATLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //保存港口(安通)
  saveHarborAt({commit}, param){
    return api.saveHarborAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新港口(安通)
  updateHarborAt({commit}, param){
    return api.updateHarborAtApi(param).then((res) => {
      commit('HARBORATLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除港口(安通)
  deleteHarborAt({commit}, param){
    return api.deleteHarborAtApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },


  //港口(泛亚)管理
  //港口(泛亚)分页列表、查询
  getHarborFyList({commit}, param){
    return api.harborFyListApi(param).then((res) => {
      commit('HARBORFYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //保存港口(泛亚)
  saveHarborFy({commit}, param){
    return api.saveHarborFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新港口(泛亚)
  updateHarborFy({commit}, param){
    return api.updateHarborFyApi(param).then((res) => {
      commit('HARBORFYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除港口(泛亚)
  deleteHarborFy({commit}, param){
    return api.deleteHarborFyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },


}


const mutations = {
  DOCKATLIST(state,res){state.dockAtList = res},
  HARBORATLIST(state,res){state.harborAtList = res},
  REGIONATLIST(state,res){state.regionAtList = res},
  DOCKFYLIST(state,res){state.dockFyList = res},
  HARBORFYLIST(state,res){state.harborFyList = res},
  REGIONFYLIST(state,res){state.regionFyList = res},
}

export default {
  state,
  getters,
  actions,
  mutations
}
