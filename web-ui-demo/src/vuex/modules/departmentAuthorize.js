import api from '../../api/api';

const state = {
  departmentTree:[],
  departmentByUserId:[],
  saveDeparByUserIds:{},
  allDeptList:{},
  allSubCompanyList:[]
};


const getters = {
  departmentTree(state){
    return state.departmentTree
  },
  departmentByUserId(state){
    return state.departmentByUserId
  },
  saveDeparByUserIds(state){
    return state.saveDeparByUserIds
  },
  allDeptList(state) {
    return state.allDeptList
  },
  allSubCompanyList(state){
    return state.allSubCompanyList
  }
};

const actions = {

  getDepartmentTree({commit}){
    return api.sys.department.getDepartmentTreeApi().then((res) => {
      commit('DEPARTMENTTREE', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  getDepartmentByUserId({commit},param){
    const requestParams = {
      userId: param,
    };
    return api.sys.department.getDepartmentByUserIdApi(requestParams).then((res) => {
      commit('DEPARTMENTBYUSERID', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

  saveDeparByUserIds({commit},param){
    const { user, permissions } = param;
    const requestParams = {
      userId: user.userId,
      data: [],
    };
    permissions.forEach((permission) => {
    //  const permisstionPath = permission.id.toString();
      requestParams.data.push({
        deptId: permission.id.toString(),
      });
    });
    requestParams.data = JSON.stringify(requestParams.data);
    return api.sys.department.saveDeparByUserIdsApi(requestParams).then((res) => {
      commit('SAVEDEPARBYUSERIDS', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //获取子公司下拉列表数据
  getSubCompanyList({commit},param){
    return api.sys.department.subcompanyApi(param).then((res) =>{
      commit('ALLSUBCOMPANYLIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },
  //获取所属部门下拉列表数据
  getDept({commit},param){
    return api.sys.department.deptApi(param).then((res) =>{
      commit('DEPTLIST',res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  },

};

const mutations = {
  DEPARTMENTTREE(state,res){
    state.departmentTree = res;
  },
  DEPARTMENTBYUSERID(state,res){
    state.departmentByUserId = res;
  },
  SAVEDEPARBYUSERIDS(state,res){
    state.saveDeparByUserIds = res;
  },
  DEPTLIST(state,res){
    state.allDeptList = res;
  },
  ALLSUBCOMPANYLIST(state,res){
    state.allSubCompanyList = res;
  }
};

export default {
  state,
  getters,
  actions,
  mutations

};
