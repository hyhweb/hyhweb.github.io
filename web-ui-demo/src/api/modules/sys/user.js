import instance from '../../config';
//import instance from '../../config-local';
//const moduleName = 'http://localhost:9008';
const moduleName = 'ygb-system-service';

const getById = params => instance.post(`${moduleName}/api/system/user/getById`, params);
const getUserRoles = params => instance.post(`${moduleName}/api/system/user/getUserRoles`, params);
const list = params => instance.post(`${moduleName}/api/system/user/list`, params);
const save = params => instance.post(`${moduleName}/api/system/user/save`, params);
const saveMenuByRoleIds = params => instance.post(`${moduleName}/api/system/user/saveMenuByRoleIds`, params);
const update = params => instance.post(`${moduleName}/api/system/user/update`, params);
const deleteUsers = params => instance.post(`${moduleName}/api/system/user/delete`, params);
const saveRoleByUserId = params => instance.post(`${moduleName}/api/system/user/saveRoleByUserId`, params);
const updatePassword = params => instance.post(`${moduleName}/api/system/user/change_password`, params);
const getCurrentUser = params => instance.post(`${moduleName}/api/system/user/getCurrentUser`, params);
//验证用户名是否被注册
const checkLoginNameApi = params => instance.post(`${moduleName}/api/system/user/getByLoginName`,params);
//重置密码
const resetPasswordApi = params => instance.post(`${moduleName}/api/system/user/resetPassword`, params);
//操作人下拉列表
const userInfoListByDeptIdApi = params => instance.post(`${moduleName}/api/system/user/getUserInfoListByDeptId`, params);

export default {
    getCurrentUser,
    getById,
    getUserRoles,
    list,
    save,
    saveMenuByRoleIds,
    update,
    deleteUsers,
    saveRoleByUserId,
    updatePassword,
    checkLoginNameApi,
    resetPasswordApi,
    userInfoListByDeptIdApi
};

