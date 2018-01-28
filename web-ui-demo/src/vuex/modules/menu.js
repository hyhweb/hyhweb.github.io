import api from '../../api/api';

const state = {
  data: [],
};

const getters = {
    /* eslint no-shadow: "off" */
  GET_MENUS: state => state.data,
};

const actions = {
  getMenus({ commit }) {
    api.sys.menu.getMenuTree();
  },
};

const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
