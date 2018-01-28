import api from '../../api/api';

const { harborListApi, updateHarborApi, deleteHarborFromOrgApi } = api;

const state = {
  harbours: [],
  orphanHarbours: [],
};

const getters = {
  GET_HARBOURS: state => state.harbours,
  GET_ORPHAN_HARBOURS: state => state.orphanHarbours,
};

const actions = {
  getHarboursOfDepartment({ commit }, params) {
    const requestParams = {
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      orgCode: params.orgCode,
    };
    return new Promise((resolve, reject) => {
      harborListApi(requestParams)
      .then((res) => {
        if (!res.data.success) {
          return reject(res.data.message);
        }
        commit('SET_HARBOURS', res.data.data.data);
        return resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },
  refreshOrphanHarbourList({ commit }) {
    return new Promise((resolve, reject) => {
      api.sys.department.getAddHarborList()
      .then((res) => {
        commit('SET_ORPHAN_HARBOURS', res.data.data);
      })
      .catch(err => reject(err));
    });
  },
  addHarbour({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { harbourId, department } = data;
      const requestParams = {
        harborId: harbourId,
        orgCode: department.orgCode,
      };
      updateHarborApi(requestParams)
      .then((res) => {
        if (!res.data.success) {
          return reject(res.data.message);
        }
        return resolve();
      })
      .catch(err => reject(err));
    });
  },
  deleteHarbour({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { harbourId, department } = data;
      const requestParams = {
        harbourId,
        orgCode: department.orgCode,
      };
      deleteHarborFromOrgApi(requestParams)
      .then((res) => {
        if (!res.data.success) {
          return reject(res.data.message);
        }
        return resolve();
      })
      .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_HARBOURS(state, harbours) {
    state.harbours = harbours;
  },
  SET_ORPHAN_HARBOURS(state, harbours) {
    state.orphanHarbours = harbours;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
