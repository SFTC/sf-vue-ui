import Demo from './src/demo.vue'

Demo.install = function (Vue) {
  Vue.component(Demo.name, Demo)
}

export default Demo
