import instance from '../../config';

// const moduleName = 'http://localhost:9008';
const moduleName = 'ygb-system-service';

const getById = params => instance.post(`${moduleName}/api/system/userInfo/getById`, params);

export default {
    getById
};

