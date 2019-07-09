<template>
  <div id="app">
    <div class="component__detail">
      <multi-select placeholder="请选择内容" v-model="value">
        <multi-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></multi-option>
      </multi-select>
    </div>
    <collapse-panel :markdownContent="markdownContent.default"></collapse-panel>
    <api-content :tableDataList="config"></api-content>
  </div>
</template>

<script>
import CollapsePanel from '../components/CollapsePanel';
import ApiContent from '../components/api';
import { config } from '../static/multiselect'; 
const lsa = require('../components/markdownfiles/MultiSelect.md');
export default {
  name: 'multi',
  data() {
    return {
      config,
      markdownContent:lsa,
      value: [],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    };
  },
  components:{
    CollapsePanel,
    ApiContent
  }
}
</script>
<style scoped>
#app{
  height: 100%;
}
</style>


