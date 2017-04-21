import Vue from 'vue';
//import axios from 'axios';
import App from './views/App.vue';
import store from './store';
import '../dist/css/common.css';

//Vue.prototype.$http = axios;
// new Vue({
// 	el:'#app',
// 	store,
// 	render:h =>h(App)
// })

import routes from './routes'

const app = new Vue({
  el: '#app',
  store:store,
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./views/' + matchingView + '.vue')
        : require('./views/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})