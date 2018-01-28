import axios from 'axios';
import instance from '../../config';
//import instance from '../../config-local';


const moduleName = 'ygb-system-service';

const requestLogin = params => instance.post(`${moduleName}/api/system/user/login`,
        params,
    );

export default {
  requestLogin,
};
