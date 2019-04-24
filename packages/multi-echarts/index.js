import MultiEchart from "./src/MultiEchart";
/* istanbul ignore next */
MultiEchart.install = function(Vue) {
  Vue.component(MultiEchart.name, MultiEchart);
};

export default MultiEchart;
