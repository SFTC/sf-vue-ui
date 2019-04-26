import Vue from 'vue';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import '../lib/multi-select/multi-select.css';
import '../lib/multi-option/multi-option.css';

// 导入组件库
// import multiSelect from '../packages/sftc-multiselect';
import multiSelect from '../lib/multi-select/multi-select.umd.min.js';
import multiOption from '../lib/multi-option/multi-option.umd.min.js';
// const multiSelect = require('../lib/sftc-multiselect.umd.min').default;
// 注册组件库
// Vue.use(multiSelect);
Vue.component(multiSelect.name, multiSelect);
Vue.component(multiOption.name, multiOption);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
