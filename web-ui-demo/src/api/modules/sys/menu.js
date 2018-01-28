import instance from '../../config';

// const moduleName = 'http://localhost:9008';
const moduleName = 'ygb-system-service';

    // optional {menuname: '', parentId: '', pageNo: '', pageSize: ''}
const getMenuList = params =>
    instance.post(`${moduleName}/api/system/menu/list`, params);

const getMenuTree = () => instance.post(`${moduleName}/api/system/menu/getMenuTree`);

const getSubMenulist = () => instance.post(`${moduleName}/api/system/menu/getSubMenulist`);

    // {id:''}
const getMenuById = params =>
    instance.post(`${moduleName}/api/system/menu/getById`, params);

    // {id:'', menuName: '', menuUrl: '', parentId, '', sortno: ''}
const saveMenu = params =>
    instance.post(`${moduleName}/api/system/menu/save`, params);

    // {id:'', menuName: '', menuUrl: '', parentId, '', sortno: ''}
const updateMenu = params =>
    instance.post(`${moduleName}/api/system/menu/update`, params);

    // ids: 菜单id集合，以逗号隔开
const deleteMenus = params =>
    instance.post(`${moduleName}/api/system/menu/delete`, params);

export default {
    getMenuList,
    getMenuTree,
    getSubMenulist,
    getMenuById,
    saveMenu,
    updateMenu,
    deleteMenus,
};
