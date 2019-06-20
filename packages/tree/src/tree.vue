<template>
  <div class="tree">
    <h3>tree - {{ text }}</h3>
    <span class="sub">{{ subTitle }}</span>
  </div>
</template>
<script>
export default {
  name: 'Tree',
  data () {
    return {
      text: '测试data属性',
      subTitle: '这是副标题'
    }
  }
}
</script>
<style lang="scss">
$red: red;
$black: black;
.tree {
  color: $red;
  .sub {
    color: $black;
  }
}
</style>
