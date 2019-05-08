<template>
  <div id="app">
    <MultiSelect placeholder="请选择内容" v-model="value">
      <MultiOption
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></MultiOption>
    </MultiSelect>
    <div wrapper>
        <h4 class="main-title">活动效果</h4>
        <list-page
            ref="listpage"
            :queryFilter="queryFilter"
            @setParams="setParams"
            @cbFormat="callbackDataFormat"
            :queryFunc="queryFunc"
            :filter="filter"
            :table="table">
        </list-page>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data() {
    const activeDate = [
            this.moment(this.$route.params.begin_time * 1000),
            this.moment(this.$route.params.end_time * 1000),
        ]
        return {
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
            }],
            
            queryFilter: {},
            queryFunc: cashbackEffectList,
            filter: [
                {
                    label: '日期',
                    type: 'date',
                    name: 'activeDate',
                    limit: 31,
                    default: activeDate
                },
                {
                    label: '店铺ID',
                    type: 'input',
                    name: 'shopId',
                },
                {
                    label: '店铺名称',
                    type: 'input',
                    name: 'shopName',
                },
            ],
            table: {
                data: [],
                content: [
                    {
                        label: '日期',
                        prop: 'create_time_show',
                        minWidth: 180,
                    },
                    {
                        label: '活动名称',
                        prop: 'activity_name',
                        minWidth: 180,
                    },
                    {
                        label: '店铺ID',
                        prop: 'shop_id',
                        minWidth: 180,
                    },
                    {
                        label: '店铺名称',
                        prop: 'shop_name',
                        minWidth: 180,
                    },
                    {
                        label: '充值金额(元)',
                        prop: 'real_amount_show',
                        minWidth: 180,
                    },
                    {
                        label: '赠送金额(元)',
                        prop: 'gift_amount_show',
                        minWidth: 180,
                    },
                    {
                        label: '首次充值',
                        prop: 'user_charge_type_name',
                        minWidth: 180,
                    },
                ],
            }
        }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
