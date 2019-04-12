import MultiOption from './src/MultiOption';
/* istanbul ignore next */
MultiOption.install = function (Vue) {
  Vue.component(MultiOption.name, MultiOption);
};

export default MultiOption;