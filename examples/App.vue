<template>
  <div id="app">
    <FormTable
      ref="form-table"
      :queryFilter="queryFilter"
      :domFilter="domFilter"
      :queryFunc="queryFunc"
      :tableLabel="tableLabel"
      :tableData="tableData"
      :tableOperation="tableOperation"
      @setQueryFilter="setQueryFilter"
      @callbackDataFormat="callbackDataFormat">
    </FormTable>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data() {
    return {
      queryFilter: {},      // 列表接口参数
      domFilter: [
        {
          label: '输入',
          type: 'input',
          name: 'a',        
        }, {
          label: '日期',
          type: 'date',
          name: 'b',
          limit: 10,        // 期末范围控制
          default: []       // 默认时间
        }, {                // 下拉框sugMap参数Array转换为 [{key: 'key', value: 'value'}]  Object转换为 {key: value}
          label: '下拉',
          type: 'select',
          sugMap: [
            {
              key: 1,
              value: 'aa'
            }
          ],
        }, {
          label: '下拉',
          type: 'select',
          sugMap: {
            'key': 'value'
          },
        }, {
          label: 'button',
          type: 'button',
          func: () => {}
        }
      ],
      queryFunc: () => {},  // 列表查询方法
      tableLabel: [
        {
          minWidth: 160,
          label: '表头1',
          prop: 'a',
        }, {
          minWidth: 160,
          label: '表头2',
          prop: 'b',
        }, {
          minWidth: 160,
          label: '表头3',
          prop: 'c',
        }, {
          minWidth: 160,
          label: '表头4',
          prop: 'd',
        }, {
          minWidth: 160,
          label: '表头5',
          prop: 'e',
        }
      ],
      tableData: [{}],
      tableOperation: {
        minWidth: 200,
        con: [
          {
            type: 'primary',
            label: '操作按钮'
          }
        ]
      },
    }
  },
  methods: {
    // 列表接口请求参数设置
    setQueryFilter(filter) {
      this.queryFilter = Object.assign({}, {
        query_a: filter.a,
        query_b: filter.b,
        query_c: filter.c,
        query_d: filter.d,
      })
    },

    // 接口回调处理
    callbackDataFormat(data) {
      console.log(data);
      // ...
    },
  }
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
