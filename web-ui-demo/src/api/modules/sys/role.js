import instance from '../../config';

// const moduleName = 'http://localhost:9008';
const moduleName = 'ygb-system-service';

// optional {name: '', pageNo: '', pageSize: ''}
const getRoles = params =>
    instance.post(`${moduleName}/api/system/role/list`, params);

// {name:'', sortno: ''}
const update = params =>
    instance.post(`${moduleName}/api/system/role/update`, params);

const save = params =>
    instance.post(`${moduleName}/api/system/role/save`, params);

// {name:'', sortno: ''}
const updateRole = params =>
    instance.post(`${moduleName}/api/system/role/update`, params);

// ids: 菜单id集合，以逗号隔开
const deleteRoles = params =>
    instance.post(`${moduleName}/api/system/role/delete`, params);

// {id: ''}
const getRoleById = params =>
    instance.post(`${moduleName}/api/system/role/getById`, params);

// {roleId: ''}
const getMenuByRoleId = (role) => {
    const param = { roleId: role.id };
    return instance.post(`${moduleName}/api/system/role/getMenuByRoleId`, param);
};

// [ {"menuId":"17","funValue": "1,111,5,7"} ,{"menuId":"18","funValue": "1,9,12,2,7"}]
const saveMenuByRoleIds = params =>
    instance.post(`${moduleName}/api/system/role/saveMenuByRoleIds`, params);

const getUsersByRole = params => instance.post(`${moduleName}/api/system/role/getRoleByUsers`, params);

const getRoleItemList = params => instance.post(`${moduleName}/api/system/role/getRoleItemList`, params);

export default {
    getRoles,
    update,
    save,
    updateRole,
    deleteRoles,
    getRoleById,
    getMenuByRoleId,
    saveMenuByRoleIds,
    getUsersByRole,
    getRoleItemList,
};
