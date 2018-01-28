import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import order from './modules/order';
import basedata from './modules/basedata';
import fleet from './modules/fleet';
import website from './modules/website';
import dispatch from './modules/dispatch';
import userConsole from './modules/userConsole';
import department from './modules/departmentConsole';
import role from './modules/roleConsole';
import menuConsole from './modules/menuConsole';
import settlement from './modules/settlement';
import user from './modules/user';
import menu from './modules/menu';
import customer from './modules/customer';
import logistices from './modules/logistics';
import departmentStore from './modules/departmentStore';
import userRoleStore from './modules/userRoleStore';
import departmentAuthorize from './modules/departmentAuthorize';
import evaluate from './modules/evaluate';
import external from './modules/external';

Vue.use(Vuex);

// 创建 store 实例
export default new Vuex.Store({
   // actions,
   // getters,
    modules: {
        order,
        basedata,
        fleet,
        website,
        dispatch,
        userConsole,
        department,
        role,
        menuConsole,
        settlement,
        user,
        customer,
        logistices,
        departmentStore,
        userRoleStore,
        menu,
        departmentAuthorize,
        evaluate,
        external
    },
   // mutations,
    strict: true
});
