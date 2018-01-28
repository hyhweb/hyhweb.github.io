import FormBox from './form/formbox.vue';
import ToolBarBox from './toolbar/toolbarbox.vue'
import TableBox from './table/tablebox.vue'
import PaginationBox from './pagination/paginationbox.vue'
const components = [
  FormBox,
  ToolBarBox,
  TableBox,
  PaginationBox
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  version: '1.0.0',
  install,
  FormBox
};
