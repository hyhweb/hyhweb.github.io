import api from '../../api/api';

const state = {
  roles: [],
  userRoles: [],
};

const getters = {
  GET_AVAILABLE_ROLES: state => state.roles,
  GET_USER_ROLES: state => state.userRoles,
};

const actions = {
  getAvailableRoles({ commit }) {
    return new Promise((resolve, reject) => {
      api.sys.role.getRoleItemList()
            .then((res) => {
              if (!res.data.success) {
                return reject(res.data.message);
              }
              commit('SET_ROLES', res.data.data);
              return resolve(res.data.data);
            })
            .catch(err => reject(err));
    });
  },
  getUserRoles({ commit }, data) {
    const { user, availableRoles } = data;
    console.log(user, availableRoles);
    return new Promise((resolve, reject) => {
      const requestParams = {
        userId: user.userId,
      };
      api.sys.user.getUserRoles(requestParams)
            .then((res) => {
              if (!res.data.success) {
                return reject(res.data.message);
              }
              const roles = res.data.data;
              commit('SET_USER_ROLES', roles);
              return resolve(roles);
            })
            .catch(err => reject(err));
    });
  },
  saveUser({ commit }, data) {
    const { user, activeRoles } = data;
    return new Promise((resolve, reject) => {
      const requestParams = {
        roleIds: activeRoles.toString(),
        userIds: user.userId,
      };
      api.sys.user.saveRoleByUserId(requestParams)
            .then((res) => {
              if (!res.data.success) {
                return reject(res.data.message);
              }
              const roles = res.data.data;
                // commit('SET_USER_ROLES', roles);
              return resolve(roles);
            })
            .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
  SET_USER_ROLES(state, userRoles) {
    state.userRoles = userRoles;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

