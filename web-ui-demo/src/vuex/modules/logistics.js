import api from '../../api'

// 应用初始状态
const state = {
	driverAdminList:{},
	departmentDataList:[],
	driverLeaveList:{},
	businessDataList:{},
	trailerOutgateLists:{},
	trailerInfoList:{},
	carteamAllList:[],
    DriverByCarteamIdList:[],
    allleavedriverInfoList:[]

}
const getters = {
	driverAdminList(state){
		return state.driverAdminList
	},
	departmentDataList(state){
		return state.departmentDataList
	},
	driverLeaveList(state){
		return state.driverLeaveList
	},
	businessDataList(state){
		return state.businessDataList
	},
	trailerOutgateList(state){
		return state.trailerOutgateLists
	},
	trailerInfoList(state){
		return state.trailerInfoList
	},
	carteamAllList(state){
		return state.carteamAllList
	},
  	DriverByCarteamIdList(state){
   	 	return state.DriverByCarteamIdList
 	},
 	allleavedriverInfoList(state){
 		return state.allleavedriverInfoList
 	}

}
const actions = {
	/*获取司机列表*/
	 getDriverInfoList({commit},params) {
		return api.driverInfoApi(params).then((res) =>{
				commit('DRIVERINFOLIST',res.data.data)
				return new Promise((resolve, reject) => {
			        resolve(res.data);
				})
		})
	},
	/*删除司机*/
	 driverInfoDelete({commit},params) {
			return api.driverInfoDeleteApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
	/*新增司机*/
	 driverInfoSave({commit},params) {
			return api.driverInfoSaveApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
	 /*修改司机*/
	 driverInfoUpdate({commit},params) {
			return api.driverInfoUpdateApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*获取2级部门*/
	 getDeptItemByLevel({commit},params) {
			return api.deptItemByLevelApi(params).then((res) =>{
					commit('DEPARTMENTDATALIST',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*获取司机请假列表*/
		 getDriverLeaveList({commit},params) {
			return api.driverLeaveApi(params).then((res) =>{
					commit('DRIVERLEAVELIST',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*司机请假审核*/
		 leaveUpdStatus({commit},params) {
			return api.driverLeaveUpdStatusApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
  /*司机重置密码*/
  driverResetPassword({commit},params) {
    return api.driverResetPasswordApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  }, 
		/*车辆运营管理*/
		 getBusinessDataList({commit},params) {
			return api.businessDataApi(params).then((res) =>{
				  	commit('BUSINESSDATA',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车停运管理*/
		 trailerOutgate({commit},params) {
			return api.trailerOutgateApi(params).then((res) =>{
        commit('TRAILEROUTGATE',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车管理*/
		 getTrailerInfo({commit},params) {
			return api.trailerInfoApi(params).then((res) =>{
					commit('TRAILERINFO',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车新增*/
		 trailerInfoSave({commit},params) {
			return api.trailerInfoSaveApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车修改*/
		 trailerInfoUpdate({commit},params) {
			return api.trailerInfoUpdateApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车删除*/
		 trailerInfoDelete({commit},params) {
			return api.trailerInfoDeleteApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车导出*/
		 trailerInfoExportExce({commit},params) {
			return api.trailerInfoExportExcelApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*所有拖车*/
		 getCarteamAll({commit},params) {
			return api.carteamAllApi(params).then((res) =>{
					commit('CARTEAMALL',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*车队联动司机*/
		 getDriverByCarteamId({commit},params) {
			return api.driverByCarteamIdApi(params).then((res) =>{
       		commit('DRIVERALL',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车停运新增*/
		 trailerOutgateSave({commit},params) {
			return api.trailerOutgateSaveApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车停运修改*/
		 trailerOutgateUpdate({commit},params) {
			return api.trailerOutgateUpdateApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*拖车停运删除*/
		 trailerOutgateDelete({commit},params) {
			return api.trailerOutgateDeleteApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*所有请假司机列表*/
		 getAllLeaveDriverInfo({commit},params) {
			return api.getAllLeaveDriverInfoApi(params).then((res) =>{
					commit('ALLLEAVEDRIVERINFO',res.data.data)
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*车辆是否加入调度*/
		 carIsDispatch({commit},params) {
			return api.carDispatchApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
		/*车辆是否禁用*/
		 trailerIsEnable({commit},params) {
			return api.trailerIsEnableApi(params).then((res) =>{
					return new Promise((resolve, reject) => {
				        resolve(res.data);
					})
			})
		},
  /*车辆是否停运*/
  trailerIsOutage({commit},params) {
    return api.trailerIsOutageApi(params).then((res) =>{
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },








}
const mutations = {
	DRIVERINFOLIST(state,res){state.driverAdminList = res},
	DEPARTMENTDATALIST(state,res){state.departmentDataList = res},
	DRIVERLEAVELIST(state,res){state.driverLeaveList = res},
	BUSINESSDATA(state,res){state.businessDataList = res},
	TRAILEROUTGATE(state,res){state.trailerOutgateLists = res},
	TRAILERINFO(state,res){state.trailerInfoList = res},
	CARTEAMALL(state,res){state.carteamAllList = res},
    DRIVERALL(state,res){state.DriverByCarteamIdList = res},
    ALLLEAVEDRIVERINFO(state,res){state.allleavedriverInfoList = res},

}

export default {
	state,
	getters,
	actions,
	mutations
}
