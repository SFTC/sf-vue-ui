import SfEcharts from "./src/SfEcharts";
/* istanbul ignore next */
SfEcharts.install = function(Vue) {
  Vue.component(SfEcharts.name, SfEcharts);
};

export default SfEcharts;
