//import babelpolyfill from 'babel-polyfill';
import util from './common/js/util'
import Vue from 'vue';
import DomPortal from 'vue-dom-portal'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

// import './assets/theme/theme-green/index.css'
 //import './assets/theme/1/index.css'
import 'font-awesome/css/font-awesome.min.css';

import './styles/iconfont/iconfont.scss'

import Vuex from 'vuex';
import store from './vuex/store';
import App from './App';
import HygUI from './components';
import router from './router';
import filter from './common/filter/filter'
import tool from './common/mixins/tool'
// import Mock from './mock'
// Mock.bootstrap();
import Global from './common/global/global'
Vue.prototype.$global = Global

Vue.use(ElementUI);
Vue.use(HygUI);
Vue.use(Vuex);
Vue.use(DomPortal);

Vue.mixin(tool)
Vue.filter(filter)
new Vue({
    router,
    store,
    components: { App },
    template: '<App/>'
}).$mount('#app');

