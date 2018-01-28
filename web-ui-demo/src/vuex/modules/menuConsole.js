import api from '../../api/api';

const state = {
  search: {
    menuName: '',
    parentId: 0,
  },
  options: {
    parents: [],
  },
  menus: [],
  parentStack: [],
  selectedMenus: [],
};


const getters = {
  getSearch: state => state.search,
  getSearchOptions: state => state.options,
  GET_MENUS: state => state.menus,
  getSelectedMenus: state => state.selectedMenus,
  editDisabled: state => state.selectedMenus.length !== 1,
  deleteDisabled: state => state.selectedMenus.length === 0,
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
  getParentMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.options.parents.length === 0) {
        api.sys.menu
          .getSubMenulist()
          .then((res) => {
            if (!res.data.success) {
              return reject(res.data.message);
            }
            commit('SET_PARENT_MENUS', res.data.data);
            return resolve(res.data.data);
          })
          .catch(err => reject(err));
      }
      return resolve(state.options.parents);
    });
  },
  setParent({ commit }, parent) {
    commit('SET_PARENT', parent);
  },
  popParent({ commit }) {
    commit('POP_PARENT');
  },
  setSelectedMenus({ commit }, param) {
    commit('setSelectedMenus', param);
  },
  addMenu({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        menuName: param.menuName,
        menuUrl: param.menuUrl,
        parentId: param.parentId,
        sortno: param.sortno,
      };
      api.sys.menu
        .saveMenu(requestParams)
        .then((res) => {
          if (res.data.success) {
            commit('ADD_MENU', res.data.data);
            return resolve(res.data.data);
          }
          return reject(res.data.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  modifyMenu({ commit }, param) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        id: param.id,
        menuName: param.menuName,
        menuUrl: param.menuUrl,
        parentId: param.pid,
        funValue: param.funValue,
        funName: param.funName,
        sortno: param.sortno,
      };
      api.sys.menu
        .updateMenu(requestParams)
        .then((res) => {
          if (res.data.success) {
            commit('MODIFY_MENU', res.data.data);
            return resolve(res.data.data);
          }
          return reject(res.data.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteMenus({ commit }) {
    const selectedIds = state.selectedMenus
      .reduce((acc, val) => acc.concat(val.id), [])
      .toString();
    return new Promise((resolve, reject) => {
      const requestParams = {
        ids: selectedIds,
      };
      api.sys.menu
        .deleteMenus(requestParams)
        .then((res) => {
          if (res.data.success) {
            commit('DELETE_MENUS', res.data.data);
            return resolve(res.data.data);
          }
          return reject(res.data.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getMenus({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.sys.menu
        .getMenuList(param)
        .then((res) => {
          commit('SETMENUS', res.data.data);
          return resolve(res.data);
        })
        .catch(error => reject(error));
    });
  },
};

const mutations = {
  RESET(state) {
    state.search.parentId = '';
  },
  SET_PARENT_MENUS(state, menus) {
    state.options.parents = menus;
  },
  SET_PARENT(state, parent) {
    state.search.parentId = parent.id;
    state.parentStack.push(parent);
  },
  POP_PARENT(state) {
    const parent = state.parentStack.pop();
    state.search.parentId = parent.parentId;
  },
  setSelectedMenus(state, param) {
    state.selectedMenus = param;
  },
  ADD_MENU(state, menu) {
    state.menus.push(menu);
  },
  MODIFY_MENU(state, menu) {
    const index = state.menus.findIndex(_menu => _menu.id === menu.id);
    state.menus[index] = menu;
    // const selectedIndex = state.selectedMenus.findIndex(
    //   _menu => _menu.id === menu.id,
    // );
    // state.selectedMenus[selectedIndex] = menu;
  },
  DELETE_MENUS(state) {
    state.selectedMenus.forEach((sMenu) => {
      state.menus = state.menus.filter(menu => menu.id !== sMenu.id);
    });
    state.selectedMenus = [];
  },
  SETMENUS(state, res) {
    state.menus = res.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
