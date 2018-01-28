
import api from '../../api/api';

const state = {
    departmentTree: [
        {
            label: '运货柜',
            value: '1',
            children: [],
        },
    ],
};

const getters = {
    GET_DEPARTMENT_TREE: state => state.departmentTree,
};

const actions = {
    getChildDepartmentsByParentId({ commit }, parentIds) {
        return new Promise((resolve, reject) => {
            const requestParams = {
                deptId: parentIds[parentIds.length - 1],
            };
            api.sys.department.getSubDeptlist(requestParams)
            .then((res) => {
                if (!res.data.success) {
                    return reject(res.data.message);
                }
                commit('SET_CHILD_DEPARTMENTS', { parentIds, children: res.data.data });
                return resolve(res.data.data);
            })
            .catch(err => reject(err));
        });
    },
    getDepartmentChainByDepartmentId({ commit }, departmentId) {
        return new Promise((resolve, reject) => {
            const requestParams = {
                deptId: departmentId,
            };
            api.sys.department.getDeptChain(requestParams)
            .then((res) => {
                if (!res.data.success) {
                    return reject(res.data.message);
                }
                commit('SET_CHILD_DEPARTMENTS_BY_CHAIN', res.data.data);
                return resolve(res.data.data.codeList);
            })
            .catch(err => reject(err));
        });
    },
};

const mutations = {
    SET_CHILD_DEPARTMENTS_BY_CHAIN(state, data) {
        const { deptList, codeList } = data;
        console.log(deptList, codeList);
        let departmentRoot = state.departmentTree[0];
        // 第一个一定是运柜宝
        for (let i = 1; i < codeList.length; i += 1) {
            const code = codeList[i];
            const formatedDeptList = deptList[i].map(department => ({
                label: department.text,
                value: department.value,
                children: [],
            }));
            departmentRoot.children = formatedDeptList;
            const index = departmentRoot.children.findIndex(child => child.value === code);
            departmentRoot = departmentRoot.children[index];
        }
    },
    SET_CHILD_DEPARTMENTS(state, data) {
        const { parentIds } = data;
        const children = data.children.map((child) => {
            const newChild = {
                label: child.text,
                value: child.value,
            };
            if (parentIds.length <= 1) {
                newChild.children = [];
            }
            return newChild;
        });
        let departmentRoot = state.departmentTree[0];
        // 第一个一定是运柜宝, 忽略
        for (let i = 1; i < parentIds.length; i += 1) {
            const parentId = parentIds[i];
            const index = departmentRoot.children.findIndex(child => child.value === parentId);
            if (index !== -1) {
                departmentRoot = departmentRoot.children[index];
            } else {
                console.log('数据结构错误');
            }
        }
        if (children.length === 0) {
            departmentRoot.children = null;
        } else {
            departmentRoot.children = children;
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
