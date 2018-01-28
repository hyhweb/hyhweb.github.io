import api from '../../api/api';

const state = {
  menus: [],
  authorizations: {},
  data: [],
  currentNodes: [],
  loading: false,
};


const getters = {
  getMenus: state => state.menus,
  currentNodes: state => state.currentNodes,
  IS_LOADING: state => state.loading,
};

const actions = {
  refreshMenus: ({ commit }) => new Promise((resolve, reject) => {
    api.sys.menu
        .getMenuTree()
        .then((data) => {
          commit('SET_MENUS', data.data.data);
          return resolve();
        })
        .catch(error => reject(error));
  }),
  getMenusByRole: ({ commit, state }, role) => new Promise((resolve, reject) => {
    state.loading = true;
    api.sys.role.getMenuByRoleId(role)
    .then((data) => {
      commit('SETAUTHORIZATIONS', data.data.data);
      state.loading = false;
      return resolve();
    })
    .catch((error) => {
      state.loading = false;
      return reject(error);
    });
  }),
  modifyAuthorizedMenu({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      const { role, permissions } = data;
      const requestParams = {
        roleIds: role.id,
        data: [],
      };
      permissions.forEach((permission) => {
        const permisstionPath = permission.id.toString().split('-');
        if (permisstionPath.length === 2) {
          // 可以圈定主键值已经建立
          let parent = requestParams.data.find(parent => parent.menuId === permisstionPath[0]);
          if (!parent) {
            parent = {
              menuId: permisstionPath[0],
              funValue: '',
            };
            requestParams.data.push(parent);
          }
          let funValues = [];
          if (parent.funValue !== '') {
            funValues = parent.funValue.split(',');
          }

          if (!funValues.find(funValue => funValue === permisstionPath[1])) {
            funValues.push(permisstionPath[1]);
          }
          parent.funValue = funValues.toString();
        } else {
          requestParams.data.push({
            menuId: permission.id.toString(),
            funValue: '',
          });
        }
      });
      requestParams.data = JSON.stringify(requestParams.data);
      api.sys.role.saveMenuByRoleIds(requestParams)
      .then((res) => {
        if (res.data.success) {
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
  SET_MENUS(state, param) {
    // 目前只有两级菜单
    state.data = param;
    const menus = [];
    state.data.forEach((mainItem) => {
      const mainMenu = {};
      mainMenu.name = mainItem.name;
      mainMenu.data = [];
      if (typeof mainItem.id === 'string') {
        mainMenu.id = Number.parseInt(mainItem.id, 10);
      } else {
        mainMenu.id = mainItem.id;
      }

      mainItem.data.forEach((item) => {
        const subMenu = {
          name: item.menuName,
          id: item.id,
        };

        if (item.funValue && item.funName) {
          const funValues = item.funValue.split(',');
          const funNames = item.funName.split(',');
          subMenu.data = [];
          for (let i = 0; i < funValues.length; i += 1) {
            subMenu.data.push({
              name: funNames[i],
              id: `${item.id}-${funValues[i]}`,
            });
          }
        }

        mainMenu.data.push(subMenu);
      });
      menus.push(mainMenu);
    });
    state.menus = menus;
  },
  SETAUTHORIZATIONS(state, param) {
    param.forEach((authorization) => {
      state.authorizations[authorization.text] = (authorization.value === 'null') ? null : authorization.value.split(',');
    });
    state.currentNodes = param.reduce((acc, permission) => {
      if (permission.value !== 'null') {
        const funValues = permission.value.split(',').map(value => `${permission.text}-${value}`);
        return acc.concat(funValues);
      }
      return acc;
    }, []);
  },
  ADD_AUTHORIZATION(state, authorization) {
    const authPath = authorization.id.toString().split('-');
    if (authPath.length === 2) {
      if (!(authPath[0] in state.authorizations)) {
        state.authorizations[authPath[0]] = [];
      }
      const funValues = state.authorizations[authPath[0]];
      const index = funValues.findIndex(funValue => funValue === authPath[1]);
      if (index === -1) {
        funValues.push(authPath[1]);
      }
    } else if (!(authPath[0] in state.authorizations)) {
      state.authorizations[authPath[0]] = [];
    }
  },
  REMOVE_AUTHORIZATION(state, authorization) {
    const authPath = authorization.id.toString().split('-');
    if (authPath.length === 2) {
      if (authPath[0] in state.authorizations) {
        const funValues = state.authorizations[authPath[0]];
        const index = funValues.findIndex(funValue => funValue === authPath[1]);
        if (index !== -1) {
          funValues.splice(index, 1);
        }
      }
    } else {
      delete state.authorizations[authPath[0]];
    }
    // 清理

  //   const permissionPath = param.id.toString().split('-');
  //   console.log(permissionPath);
  //   if (permissionPath.length === 1) {
  //     // 菜单权限
  //     console.log('菜单权限');
  //     state.authorizations = state.authorizations.filter(_auth =>
  //       parseInt(_auth.text, 10) === parseInt(param.id, 10),
  //     );
  //   } else {
  //     const index = state.authorizations.findIndex(_auth =>
  //       parseInt(_auth.text, 10) === parseInt(permissionPath[0], 10),
  //     );
  //     if (index !== -1) {
  //       const targetPermission = state.authorizations[index].value;
  //       console.log(targetPermission);
  //       const targetIndex = targetPermission.findIndex(_permission =>
  //         _permission === permissionPath[1],
  //       );
  //       if (targetIndex !== -1) {
  //         console.log(targetIndex);
  //         targetPermission.splice(targetIndex, 1);
  //       }
  //       // state.authorizations[index] = targetPermission
  //     }
  //   }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
