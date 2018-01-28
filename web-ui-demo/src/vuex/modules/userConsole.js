import api from '../../api/api';

const state = {
  search: {
    loginName: '',
  },
  options: {
    departmentTree: [
      {
        label: '运货柜',
        value: '1',
        children: [],
      },
    ],
    roles: [],
    status: [{ value: 0, label: '禁用' }, { value: 1, label: '启用' }],
    deptName: [
      { value: 'main', label: '总公司' },
      { value: 'sub', label: '分公司' },
      { value: 'nanhai', label: '南海分公司' },
    ],
    role: [
      { value: 'ROLE_ADMIN', label: '管理员' },
      { value: 'ROLE_SUB_ADMIN', label: '分公司客服' },
      { value: 'ROLE_DRIVER', label: '司机' },
    ],
    driverType: [{ value: 'a', label: 'A类' }, { value: 'b', label: 'B类' }],
    sex: [{ value: 1, label: '男' }, { value: 0, label: '女' }],
  },
  users: [],
  selectedUsers: [],
  userInfoListState: {}
};

const getters = {
  getSearch: state => state.search,
  getSearchOptions: state => state.options,
  GET_USERS: state => state.users,
  GET_DEPARTMENTS: state => state.options.departments,
  GET_ROLES: state => state.options.roles,
  getSelectedUsers: state => state.selectedUsers,
  editDisabled: state => state.selectedUsers.length !== 1,
  deleteDisabled: state => state.selectedUsers.length === 0,
  userInfoList(state) {
    return state.userInfoListState
  }
};

const actions = {
  setSelectedUsers({ commit }, param) {
    commit('setSelectedUsers', param);
  },
  addUser({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        loginName: param.loginName,
        name: param.name,
        password: param.password,
        confirmPassword: param.confirmPassword,
        phone: param.phone,
        email: param.email,
        deptId: param.deptId,
        sex: param.sex,
        status: param.status,
      };
      api.sys.user
        .save(requestParams)
        .then((res) => {
          if (res.data.success) {
            commit('ADD_USER', param);
            return resolve(param);
          }
          return reject(res.data.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRoles({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.sys.role
        .getRoles(param)
        .then((res) => {
          commit('SET_ROLES', res.data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getDepartments({ commit }) {
    return new Promise((resolve, reject) => {
      api.sys.department
        .list()
        .then((res) => {
          commit('SET_DEPARTMENTS', res.data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  modifyUser({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        id: param.id,
        loginName: param.loginName,
        name: param.name,
        phone: param.phone,
        email: param.email,
        deptId: param.deptId,
        sex: param.sex,
        status: param.status,
      };
      api.sys.user
        .update(requestParams)
        .then((res) => {
          if (res.data.success) {
            commit('MODIFY_USER', param);
            return resolve(param);
          }
          return reject(res.data.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteUsers({ commit }) {
    const selectedIds = state.selectedUsers
      .reduce((acc, val) => acc.concat(val.id), [])
      .toString();
    return new Promise((resolve, reject) => {
      const requestParams = {
        ids: selectedIds,
      };
      api.sys.user
        .deleteUsers(requestParams)
        .then((res) => {
          if (res.data.success) {
            commit('DELETE_USERS', res.data.data);
            return resolve(res.data.data);
          }
          return reject(res.data.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUsers({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.sys.user
        .list(params)
        .then((res) => {
          commit('SETUSERS', res.data.data);
          return resolve(res.data);
        })
        .catch(error => reject(error));
    });
  },
  getUserInfoListByDeptId({commit}, param){
    return api.sys.user.userInfoListByDeptIdApi(param).then((res) => {
      commit('USERINFOLISTMUTATION', res.data.data)
      return new Promise((resolve, reject) => {
        resolve(res.data);
      })
    })
  }
};

const mutations = {
  SET_DEPARTMENTS(state, departments) {
    state.options.departments = departments;
  },
  SET_ROLES(state, roles) {
    state.options.roles = roles;
  },
  setSelectedUsers(state, param) {
    state.selectedUsers = param;
  },
  ADD_USER(state, user) {
    state.users.push(user);
  },
  MODIFY_USER(state, param) {
    const index = state.users.findIndex(_user => _user.id === param.id);
    if (index !== 0) {
      state.users[index] = param;
    }
  },
  DELETE_USERS(state) {
    state.selectedUsers.forEach((sUser) => {
      state.users = state.users.filter(
        user => user.loginName !== sUser.loginName,
      );
    });
    state.selectedUsers = [];
  },
  SETUSERS(state, param) {
    state.users = param.data;
  },
  USERINFOLISTMUTATION(state, res) {
    state.userInfoListState = res
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
