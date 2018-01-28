import api from '../../api'
import axios from 'axios'


// 应用初始状态，按模块划分，所有的接口都在这里
const state = {
  regionList: {},
  regionRecursiveByRegionId: {},
  regionBelongPList: {},
  regionBelongCList: {},
  dictList: {},
  harborList: {},
  allshipcompanyList: {},
  shipcompanyList: {},
  dockList: {},
  alldockList: {},
  harborBelongList: {},
  harborBelongListByOrgCode: {},
  abnormalPriceList: {},
  custompriceList: {},
  customList: {},
  customListInCustom: {},
  trailerpriceList: {},
  harborBelongOrgList: {},
  fixedpriceList: {},
  userListByDeptId: {},
  custompriceLogList:{},
  trailerPriceLogList:{},
  costLogListState:{},
  blackList:{}
}


const getters = {
  regionList(state) {
    return state.regionList
  },
  regionRecursiveByRegionId(state) {
    return state.regionRecursiveByRegionId
  },
  regionBelongPList(state) {
    return state.regionBelongPList
  },
  regionBelongCList(state) {
    return state.regionBelongCList
  },
  trailerpriceList(state) {
    return state.trailerpriceList
  },
  fixedpriceList(state) {
    return state.fixedpriceList
  },
  dictList(state) {
    return state.dictList
  },
  harborList(state) {
    return state.harborList
  },
  harborBelongOrgList(state) {
    return state.harborBelongOrgList
  },
  customList(state) {
    return state.customList
  },
  customListInCustom(state) {
    return state.customListInCustom
  },
  abnormalPriceList(state) {
    return state.abnormalPriceList
  },
  custompriceList(state) {
    return state.custompriceList
  },
  shipcompanyList(state) {
    return state.shipcompanyList
  },
  allshipcompanyList(state) {
    return state.allshipcompanyList
  },
  dockList(state) {
    return state.dockList
  },
  alldockList(state) {
    return state.alldockList
  },
  harborBelongList(state) {
    return state.harborBelongList
  },
  harborBelongListByOrgCode(state) {
    return state.harborBelongListByOrgCode
  },
  userListByDeptId(state) {
    return state.userListByDeptId
  },
  custompriceLogList(state) {
    return state.custompriceLogList
  },
  trailerPriceLogList(state) {
    return state.trailerPriceLogList
  },
  costLogListGetter(state){
    return state.costLogListState;
  },
  blackList(state){
    return state.blackList;
  }
}

const actions = {
  //地区管理

  //地区分页列表、查询
  getRegionList({commit}, param){
    return api.regionListApi(param).then((res) => {
      commit('REGIONLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //地区分页列表、查询
  getRegionRecursiveByRegionId({commit}, param){
    return api.getRegionRecursiveByRegionIdApi(param).then((res) => {
      commit('REGIONRECURSIVEBYREGIONID', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },



  //通过regionId得到parentId
  getParentId({commit}, param){
    return api.getParentIdApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //通过regionId得到regionCode
  getRegionCode({commit}, param){
    return api.getRegionCodeApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //通过regionCode得到省市区Id,省市区列表
  getRegions({commit}, param){
    return api.getRegionsApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存地区
  saveRegion({commit}, param){
    return api.saveRegionApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //删除地区
  deleteRegion({commit}, param){
    return api.deleteRegionApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //全部省级地区列表
  RegionBelongPList({commit}, param){
    return api.regionbelongPListApi(param).then((res) => {
      commit('REGIONBELONGPLIST', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //通过regionId得到子级的地区列表
  RegionBelongCList({commit}, param){
    return api.regionbelongCListApi(param).then((res) => {
      //commit('REGIONBELONGCLIST',res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  RegionBelongCList({commit}, param){
    return api.regionbelongCListApi(param).then((res) => {
      commit('REGIONBELONGCLIST', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  //更新地区
  updateRegion({commit}, param){
    return api.updateRegionApi(param).then((res) => {
      commit('REGIONBELONGPLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  RegionChildList({commit}, param){
    return api.regionchildListApi(param).then((res) => {
      commit('REGIONCHILDLIST', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //regionCode不能重复
  repeatCode({commit}, param){
    return api.repeatcodeApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //地区名字不能重复
  repeatValue({commit}, param){
    return api.repeatvalueApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },


  //字典管理
  //字典分页列表、查询
  getDictList({commit}, param){
    return api.dictListApi(param).then((res) => {
      commit('DICTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
//保存字典
  saveDict({commit}, param){
    return api.saveDictApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新字典
  updateDict({commit}, param){
    return api.updateDictApi(param).then((res) => {
      commit('DICTLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除字典
  deleteDict({commit}, param){
    return api.deleteDictApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //港口管理
  //港口分页列表、查询
  getHarborList({commit}, param){
    return api.harborListApi(param).then((res) => {
      commit('HARBORLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //保存港口
  saveHarbor({commit}, param){
    return api.saveHarborApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新港口
  updateHarbor({commit}, param){
    return api.updateHarborApi(param).then((res) => {
      commit('HARBORLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除港口
  deleteHarbor({commit}, param){
    return api.deleteHarborApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
//港口所属部门列表
  HarborBelongOrgList({commit}, param){
    return api.harborBelongOrgListApi(param).then((res) => {
      commit('HARBORBELONGORGLIST', res.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //所有港口列表
  HarborBelongList({commit}, param){
    return api.harborbelongListApi(param).then((res) => {
      commit('HARBORBELONGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  getHarborBelongListByOrgCode({commit}, param){
    return api.getHarborbelongListByOrgCodeApi(param).then((res) => {
      commit('HARBORBELONGLISTBYORGCODE', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //船公司管理
  //船公司分页列表、查询
  getShipcompanyList({commit}, param){
    return api.shipcompanyListApi(param).then((res) => {
      commit('SHIPCOMPANYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存船公司
  saveShipcompany({commit}, param){
    return api.saveShipcompanyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //更新船公司
  updateShipcompany({commit}, param){
    return api.updateShipcompanyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //删除船公司
  deleteShipcompany({commit}, param){
    return api.deleteShipcompanyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //所有船公司列表
  getallShipcompanyList({commit}, param){
    return api.allShipCompanyApi(param).then((res) => {
      commit('ALLSHIPCOMPANYLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //异常报价审核
  getAbnormalPriceList({commit}, param){
    return api.abnormalPriceListApi(param).then((res) => {
      commit('ABNORMALPRICELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //客户报价管理
  getCustompriceList({commit}, param){
    return api.custompriceListApi(param).then((res) => {
      commit('CUSTOMPRICELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  getUserListByDeptId({commit}, param){
    return api.userListByDeptIdApi(param).then((res) => {
      commit('USERLISTBYDEPTID', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  getCustompriceuList({commit}, param){
    return api.custompriceListApi(param).then((res) => {
      //commit('CUSTOMPRICELIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  getCustomList({commit}, param){
    return api.customListApi(param).then((res) => {
      commit('CUSTOMLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  getCustomListInCustom({commit}, param){
    return api.customListInCustomApi(param).then((res) => {
      commit('CUSTOMLISTINCUSTOM', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },


  saveCustomprice({commit}, param){
    return api.saveCustompriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  updateCustomprice({commit}, param){
    return api.updateCustompriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  deleteCustomprice({commit}, param){
    return api.deleteCustompriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

// 拖车报价管理
  getTrailerpriceList({commit}, param){
    return api.trailerpriceListApi(param).then((res) => {
      commit('TRAILERPRICELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  saveTrailerprice({commit}, param){
    return api.saveTrailerpriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  updateTrailerprice({commit}, param){
    return api.updateTrailerpriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  deleteTrailerprice({commit}, param){
    return api.deleteTrailerPriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },


  //码头管理
  //码头分页列表、查询
  getDockList({commit}, param){
    return api.dockListApi(param).then((res) => {
      commit('DOCKLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //保存码头
  saveDock({commit}, param){
    return api.saveDockApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //更新码头
  updateDock({commit}, param){
    return api.updateDockApi(param).then((res) => {
      commit('DOCKLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //删除码头
  deleteDock({commit}, param){
    return api.deleteDockApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //所有码头列表
  getalldockList({commit}, param){
    return api.allDockListApi(param).then((res) => {
      commit('ALLDOCKLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  //固定费用管理
  getFixedpriceList({commit}, param){
    return api.fixedpriceListApi(param).then((res) => {
      commit('FIXEDPRICELIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  saveFixedprice({commit}, param){
    return api.saveFixedpriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  updateFixedprice({commit}, param){
    return api.updateFixedpriceApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //获取客户报价日志
  getCustomerLog({commit}, param){
    return api.getCustompriceLogApi(param).then((res) => {
      commit('CUSTOMERLOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },
  //获取拖车报价日志
  getTrailerPriceLogList({commit}, param){
    return api.getTrailerPriceLogListApi(param).then((res) => {
      commit('TRAILERPRICELOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 客户报价批量复制
 quoteCopySubmit({commit}, param){
    return api.quoteCopyApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  // 客户报价批量修改日期
  editValidateDateSubmit({commit}, param){
    return api.editValidateDateApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
   // 固定报价是否禁用
 costIsForbidden({commit}, param){
    return api.costIsForbiddenApi(param).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  getRegionListByRegionCode({commit},params){
    return api.getRegionListByRegionCodeApi(params).then((res)=>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //查询固定费用日志
  getCostLogPageList({commit},params){
    return api.getCostLogPageListApi(params).then((res) => {
      commit('COSTLOGLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })

    })
  },

  getBlackList({commit},params){
    return api.blackListApi(params).then((res) => {
      commit('BLACKLIST', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  }
}


const mutations = {
  REGIONLIST(state, res) {
    state.regionList = res
  },
  REGIONRECURSIVEBYREGIONID(state, res) {
    state.regionRecursiveByRegionId = res
  },
  USERLISTBYDEPTID(state, res) {
    state.userListByDeptId = res
  },
  REGIONBELONGPLIST(state, res) {
    state.regionBelongPList = res
  },
  REGIONBELONGCLIST(state, res) {
    state.regionBelongCList = res
  },
  DICTLIST(state, res) {
    state.dictList = res
  },
  HARBORLIST(state, res) {
    state.harborList = res
  },
  ALLSHIPCOMPANYLIST(state, res) {
    state.allshipcompanyList = res
  },
  SHIPCOMPANYLIST(state, res) {
    state.shipcompanyList = res
  },
  REGIONCHILDLIST(state, res) {
    state.regionChildList = res
  },
  ABNORMALPRICELIST(state, res) {
    state.abnormalPriceList = res
  },
  CUSTOMPRICELIST(state, res) {
    state.custompriceList = res
  },
  TRAILERPRICELIST(state, res) {
    state.trailerpriceList = res
  },
  CUSTOMLIST(state, res) {
    state.customList = res
  },
  CUSTOMLISTINCUSTOM(state, res) {
    state.customListInCustom = res
  },
  REGIONBELONGCLIST(state, res) {
    state.regionBelongCList = res
  },
  HARBORLIST(state, res) {
    state.harborList = res
  },
  DOCKLIST(state, res) {
    state.dockList = res
  },
  ALLDOCKLIST(state, res) {
    state.alldockList = res
  },
  HARBORBELONGLIST(state, res) {
    state.harborBelongList = res
  },
  HARBORBELONGLISTBYORGCODE(state, res) {
    state.harborBelongListByOrgCode = res
  },
  HARBORBELONGORGLIST(state, res) {
    state.harborBelongOrgList = res
  },
  FIXEDPRICELIST(state, res) {
    state.fixedpriceList = res
  },
  CUSTOMERLOGLIST(state, res) {
    state.custompriceLogList = res
  },
  TRAILERPRICELOGLIST(state, res) {
    state.trailerPriceLogList = res
  },
  COSTLOGLIST(state, res){
    state.costLogListState = res;
  },
  BLACKLIST(state, res){
    state.blackList = res;
    console.log(res);
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
