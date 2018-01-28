import instance from '../../config';

// const moduleName = 'http://localhost:9008';
const moduleName = 'ygb-system-service';

const getById = params => instance.post(`${moduleName}/api/system/sysOrg/getById`, params);
const getDeptChain = params => instance.post(`${moduleName}/api/system/sysOrg/getDeptChain`, params);
const getSubDeptlist = params => instance.post(`${moduleName}/api/system/sysOrg/getSubDeptlist`, params);
const list = params => instance.post(`${moduleName}/api/system/sysOrg/list`, params);
const save = params => instance.post(`${moduleName}/api/system/sysOrg/save`, params);
const update = params => instance.post(`${moduleName}/api/system/sysOrg/update`, params);
const deleteDepartments = params => instance.post(`${moduleName}/api/system/sysOrg/delete`, params);
const getAddHarborList = () => instance.post(`${moduleName}/api/system/sysOrg/getAddHarborList`);
const getDepartmentTreeApi = ()=> instance.post(`${moduleName}/api/system/sysOrg/getDepartmentTree`);
//获取子公司下拉列表数据
const subcompanyApi = params => instance.post(`${moduleName}/api/system/sysOrg/getDeptItemByLevel?level=2`,params);
//获取所属部门下拉列表数据
const deptApi = params => instance.post(`${moduleName}/api/system/sysOrg/getDeptItemByLevel?level=3`,params);

const getDepartmentByUserIdApi = params => instance.post(`${moduleName}/api/system/user/getDepartmentByUserId`,params);
const saveDeparByUserIdsApi = params => instance.post(`${moduleName}/api/system/user/saveDeparByUserIds`,params);


export default {
  getById,
  getDeptChain,
  getSubDeptlist,
  list,
  save,
  update,
  deleteDepartments,
  getAddHarborList,
  getDepartmentTreeApi,
  getDepartmentByUserIdApi,
  saveDeparByUserIdsApi,
  subcompanyApi,
  deptApi
};
