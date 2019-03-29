import Demo from './demo';
// 组件列表
const components = [
  Demo,
];

// 如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));
};

// 判断是否直接引入文件,实现 examples 中任意一面直接使用
if (typeof window !== 'undefined' && window.Vue) {
  install(Window.Vue);
}

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default {
  install,
  Demo,
};


