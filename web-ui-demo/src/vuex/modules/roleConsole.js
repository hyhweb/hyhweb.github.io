import authorize from './roleAuthorize';
import api from '../../api/api';

const state = {
  search: {
    name: '',
  },
  options: {
    type: [
        { value: 'chedui', label: '车队' },
        { value: 'huodai', label: '货代' },
    ],
  },
  roles: [
  ],
  selectedRoles: [],
};


const getters = {
  getSearch: state => state.search,
  getSearchOptions: state => state.options,
  GET_ROLES: state => state.roles,
  getSelectedRoles: state => state.selectedRoles,
  editDisabled: state => state.selectedRoles.length !== 1,
  deleteDisabled: state => state.selectedRoles.length === 0,
};

const actions = {
  getUserListByRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        roleId: role.id,
      };
      api.sys.role.getUsersByRole(requestParams)
            .then((res) => {
              if (!res.data.success) {
                return reject(res.data.message);
              }
              return resolve(res.data.data);
            })
            .catch(err => reject(err));
    });
  },
  getRoles({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.sys.role.getRoles(params)
            .then((res) => {
              commit('SET_ROLES', res.data.data);
              return resolve(res.data);
            })
            .catch(error => reject(error));
    });
  },
  setSelectedRoles({ commit }, param) {
    commit('setSelectedRoles', param);
  },
  addRole({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        name: param.name,
        code: param.code,
        description: param.description,
      };
      api.sys.role.save(requestParams)
            .then((res) => {
              if (res.data.success) {
                commit('ADD_ROLE', res.data.data);
                return resolve(res.data.data);
              }
              return reject(res.data.message);
            })
            .catch((error) => {
              reject(error);
            });
    });
  },
  modifyRole({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        id: param.id,
        name: param.name,
        code: param.code,
        description: param.description,
      };
      api.sys.role.update(requestParams)
            .then((res) => {
              if (res.data.success) {
                commit('MODIFY_ROLE', res.data.data);
                return resolve(res.data.data);
              }
              return reject(res.data.message);
            })
            .catch((error) => {
              reject(error);
            });
    });
  },
  deleteRoles({ commit, state }) {
    const selectedIds = state.selectedRoles.reduce(
            (acc, val) => acc.concat(val.id),
            [],
        ).toString();
    return new Promise((resolve, reject) => {
      const requestParams = {
        ids: selectedIds,
      };
      api.sys.role.deleteRoles(requestParams)
      .then((res) => {
        if (res.data.success) {
          commit('DELETE_ROLES', res.data.data);
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
  setSelectedRoles(state, param) {
    state.selectedRoles = param;
  },
  SET_ROLES(state, roles) {
    state.roles = roles.data;
  },
  ADD_ROLE(state, role) {
    state.roles.push(role);
  },
  MODIFY_ROLE(state, role) {
    const index = state.roles.findIndex(_role => _role.id === role.id);
    state.roles[index] = role;
    const selectedIndex = state.selectedRoles.findIndex(_role => _role.id === role.id);
    state.selectedRoles[selectedIndex] = role;
  },
  DELETE_ROLES(state) {
    state.selectedRoles.forEach((sRole) => {
      state.roles = state.roles.filter(role => role.id !== sRole.id);
    });
    state.selectedRoles = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    authorize,
  },
};
