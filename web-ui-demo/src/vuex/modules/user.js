import api from '../../api/api';

const state = {
};

const getters = {
    GET_PERMISSIONS: () => JSON.parse(sessionStorage.getItem('permissions')),
    GET_MENUS: () => JSON.parse(sessionStorage.getItem('menus')),
    GET_USER: () => JSON.parse(sessionStorage.getItem('user')),
};

const actions = {
  updateUser({ commit }, params) {
        return new Promise((resolve, reject) => {

            api.sys.user.updatePassword(params)
            .then((res) => {
                if (!res.data.success) {
                    return reject(res.data.message);
                }
                return resolve(res.data.data);
            })
            .catch(err => reject(err));
        });
    },
    getUser({ commit }) {
        return new Promise((resolve, reject) => {
            api.sys.user.getCurrentUser()
            .then((res) => {
                resolve(res.data.data);
            })
            .catch(err => reject(err));
        });
    }
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
