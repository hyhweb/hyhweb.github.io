import api from '../../api/api';
import harbour from './departmentHarbour';

const state = {
  search: {
    deptId: '1',
    name: '',
  },
  options: {
    departmentTree: [
      {
        label: '运货柜',
        value: '1',
        children: [],
      },
    ],
  },
  departments: [
  ],
  parentStack: [
    {
      name: '运货柜',
      pid: '0',
    },
  ],
  selectedDepartments: [],
};


const getters = {
  getSearch: state => state.search,
  getSearchOptions: state => state.options,
  GET_DEPARTMENTS: state => state.departments,
  getSelectedDepartments: state => state.selectedDepartments,
  editDisabled: state => state.selectedDepartments.length !== 1,
  deleteDisabled: state => state.selectedDepartments.length === 0,
  GET_PARENT: (state) => {
    if (state.parentStack.length > 0) {
      return state.parentStack[state.parentStack.length - 1];
    }
    return {};
  },
};

const actions = {
  reset({ commit }) {
    commit('RESET');
  },
  setSelectedDepartments({ commit }, param) {
    commit('setSelectedDepartments', param);
  },
  setParent({ commit }, parent) {
    commit('SET_PARENT', parent);
  },
  popParent({ commit }) {
    commit('POP_PARENT');
  },
  getDepartments({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.sys.department.list(params)
            .then((res) => {
              if (!res.data.success) {
                return reject(res.data.message);
              }
              if (res.data.data.data.length === 0) {
                return commit('SETDEPARTMENTS', [{
                  description: '无下级部门',
                }]);
              }
              commit('SETDEPARTMENTS', res.data.data.data);
              return resolve(res.data);
            })
            .catch(error => reject(error));
    });
  },
  addDepartment({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        orgCode: param.orgCode,
        name: param.name,
        description: param.description,
        parentId: param.parentId,
        customerServicePhone: param.customerServicePhone
      };
      api.sys.department.save(requestParams)
            .then((res) => {
              if (!res.data.success) {
                return reject(res.data.message);
              }
              commit('ADD_DEPARTMENT', res.data.data);
              return resolve(res.data.data);
            })
            .catch(error => reject(error));
    });
  },
  modifyDepartment({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        id: param.id,
        name: param.name,
        description: param.description,
        parentId: param.parentId,
        level: param.level,
        orgType: param.orgType,
        customerServicePhone: param.customerServicePhone
      };
      api.sys.department.update(requestParams)
            .then((res) => {
              if (res.data.success) {
                commit('UPDATE_DEPARTMENT', res.data.data);
                resolve(res.data.data);
              } else {
                reject(res.data.message);
              }
            })
            .catch((error) => {
              reject(error);
            });
    });
  },
  deleteDepartments({ commit }) {
    const selectedIds = state.selectedDepartments.reduce(
            (acc, val) => acc.concat(val.id),
            [],
        ).toString();
    return new Promise((resolve, reject) => {
      const requestParams = {
        ids: selectedIds,
      };
      api.sys.department.deleteDepartments(requestParams)
            .then((res) => {
              if (res.data.success) {
                commit('DELETE_DEPARTMENTS', res.data.data);
                return resolve(res.data.data);
              }
              return reject(res.data.message);
            })
            .catch((error) => {
              reject(error);
            });
    });
  },
};

const mutations = {
  RESET(state) {
    state.search.deptId = '1';
    state.search.name = '';
  },
  SET_PARENT(state, parent) {
    state.search.deptId = parent.id;
    state.parentStack.push(parent);
  },
  POP_PARENT(state) {
    const parent = state.parentStack.pop();
    state.search.deptId = parent.parentId;
  },
  setSelectedDepartments(state, param) {
    state.selectedDepartments = param;
  },
  ADD_DEPARTMENT(state, department) {
    state.departments.push(department);
  },
  SETDEPARTMENTS(state, departments) {
    state.departments = departments;
  },
  UPDATE_DEPARTMENT(state, param) {
    const index = state.departments.findIndex(_department => _department.id === param.id);
    state.departments[index] = param;
  },
  DELETE_DEPARTMENTS(state) {
    state.selectedDepartments.forEach((sDepartment) => {
      state.departments = state.departments.filter(department =>
                department.code !== sDepartment.code,
            );
    });
    state.selectedDepartments = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    harbour,
  },
};
