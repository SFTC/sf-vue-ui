<template>
  <div class="demo-style">demo 这是一个示例组件</div>
</template>

<script>
export default {
  name: 'Demo',
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
      console.log(111);
         console.log(2222);
  },
}
</script>

<style scoped>
.demo-style {
  color: blue;
}
</style>