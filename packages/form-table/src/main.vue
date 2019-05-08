<template>
  <div wrapper>
      <section class="filter" v-if="filter.length">
        <div class="item" v-for="(item, i) in filter" :key="i">
          <span class="label" v-if="item.type !== 'button'">{{item.label}}：</span>
          <el-input
            v-if="item.type == 'input'"
            v-model.trim="pageFilter[item.name]"
            size="medium" 
            :placeholder="`请输入${item.label}`" 
            clearable>
          </el-input>
          <el-select
            v-if="item.type == 'select'"
            v-model="pageFilter[item.name]"
            size="mdium"
            :placeholder="`请选择${item.label}`" 
            filterable
            clearable>
            <div v-if="item.sugMapType === 'Array'">
                <el-option v-for="(v, i) in item.sugMap" :key="i" :label="v[item.sugMapLabel]" :value="String(v[item.sugMapValue])"></el-option>
            </div>
            <div v-if="item.sugMapType === 'Object'">
                <el-option  v-for="(v, k, i) in item.sugMap" :key="i" :label="v" :value="k"></el-option>
            </div>
          </el-select>
          <el-date-picker
            v-if="item.type == 'date'"
            v-model="pageFilter[item.name]"
            size="medium"
            :placeholder="`请选择${item.label}`" 
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :pickerOptions="item.limit ? {
                onPick: pickDate => handlePick(pickDate, item.name),
                disabledDate: date => disabledDate(date, item.name, item.limit)
            } : ''"
          :editable="false">
        </el-date-picker>
        <el-date-picker
          v-if="item.type == 'datetime'"
          v-model="pageFilter[item.name]"
          size="medium"
          :placeholder="`请选择${item.label}`" 
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :editable="false">
        </el-date-picker>
        <el-button v-if="item.type == 'button'" type="primary" @click="item.func">{{ item.label }}</el-button>
      </div>
    </section>
        <section class="table">
            <el-table :data="table.data" border stripe v-loading="loading">
                <el-table-column 
                    v-for="(v, i) in table.content" 
                    :key="i" 
                    :label="v.label" 
                    :min-width="v.minWidth">
                    <template slot-scope="scope">
                        <el-button v-if="v.operation && scope.row[v.operation.prop]" type="text" @click="v.operation.func(scope.row)">{{ scope.row[v.operation.prop] }}</el-button>
                        <span v-else>{{ scope.row[v.prop] }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" v-if="table.operation" :min-width="table.operation.minWidth">
                    <template slot-scope="scope">
                        <span v-for="(item, index) in table.operation.content" :key="index" class="operation">
                            <el-button 
                                type="text" 
                                v-if="item.type == 'text'" 
                                @click="item.func(scope.row)"
                                :disabled="item.disabled ? item.disabled(scope.row) : false">
                                {{ item.name }}
                            </el-button>
                            <el-switch
                                @change="item.func(scope.row)"
                                :value="item.value(scope.row)"
                                v-if="item.type=='switch'"
                                :disabled="item.disabled(scope.row)">
                            </el-switch>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <section page v-if="total">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page.sync="pageIndex"
				:page-size="pageSize"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
		</section>
    </div>
</template>
<script>
export default {
  name: 'FormData',
  componentName: 'FormData',
    props: {
        /**
         * @param { type }          类型           input: 输入框, select: 下拉框, selectcity: 城市搜索框(带全部功能), date: 日期选择框, datetime: 日期时间选择框 
         * @param { label }         筛选框标题 
         * @param { name }          双向绑定字段名
         * @param { sugMap }        type为select时必传,下拉框sug
         * @param { sugMapType }    type为select时必传,下拉框sug数据类型
         * @param { sugMapLabel }   type为select时必传,下拉框sug数据类型为Array [key]
         * @param { sugMapValue }   type为select时必传,下拉框sug数据类型为Array [value]
         */
        filter: {
            type: Array,
            default() {
                return []
            }
        },

        /** 
         * table 表格数组
         */
        table: {
            type: Object,
            default() {
                return {}
            }
        },

        /**
         * 列表查询真实参数
         */
        queryFilter: {
            type: Object,
            default() {
                return {}
            }
        },

        /**
         * 列表查询方法
         */
        queryFunc: {
            type: Function
        }
    },

    data() {
        // 初始化data数据
        let initData = this.init()
        return {
            pageFilter: initData.pageFilter,
            limit: initData.limit,
            loading: false,
            pageSize: 20,
            pageIndex: 1,
            total: 0,
        }
    },
    mounted() {
        this.queryList()
    },
    methods: {
        /**
         * 日期范围限制
         */
		disabledDate(date, name, limit) {
			const today = new Date().getTime()
			const originTime = date.getTime()
			if (this['limit'][`${name}Limit`][0] && !this['limit'][`${name}Limit`][1]) {
				const startTime = new Date(this['limit'][`${name}Limit`][0]).getTime()
				return originTime > Math.min(today, (startTime + (limit * 24 * 3600 * 1000))) || originTime < startTime - (limit * 24 * 3600 * 1000)
			}
			return originTime > today
		},
		handlePick({ maxDate, minDate }, name) {
			if (maxDate && minDate) {
				this['pageFilter'][name] = [minDate, maxDate]
			}
			this['limit'][`${name}Limit`] = [minDate, maxDate]
		},

        // 接受参数初始化处理
        init() {
            let pageFilter = {},
                limit = {}
            this.filter.forEach(v => {
                pageFilter[v.name] = v.default || null
                if (v.limit) {
                    limit[`${v.name}Limit`] = [null, null]
                }
            })
            return { pageFilter, limit }
        },
        
        // 查询列表数据
        queryList(index = 1) {
            return new Promise((resolve, reject) => {
                this.loading = true
                this.$emit('setParams', this.pageFilter)
                this.$nextTick(() => {
                    let params = Object.assign(this.queryFilter, {
                        page_no: index,
                        page_size: this.pageSize
                    })
                    this.queryFunc(params).then(res => {
                        this.loading = false
                        if (res.errno === 0) {
                            let result = res.result
                            this.total = result.total
                            this.$emit('cbFormat', result)
                            resolve()
                        } else {
                            reject()
                        }
                    })
                })
            }) 
        },

        // 查询列表数据 防抖处理
        debounceQueryList(){
          this.queryList()
        },

        // 翻页
        handleCurrentChange() {
            this.queryList(this.pageIndex)
        },

        // 导出列表操作
        exportList() {
            return new Promise((resolve) => {
                this.$emit('setParams', this.pageFilter)
                this.$nextTick(() => {
                    let params = Object.assign(this.queryFilter, {
                        page_no: this.pageIndex,
                        page_size: this.pageSize,
                        is_download: 1,
                    })
                    const loading = this.$loading({
                        lock: true,
                        text: '数据导出中...',
                        spinner: 'el-icon-loading',
                    })
                    this.queryFunc(params).then(res => {
                        if (res.errno === 0) {
                            setTimeout(() => {
                                loading.close()
                                resolve(true)
                            }, 1000)
                        } else {
                            loading.close()
                            resolve(false)
                        }
                    })
                })
            }).catch(err => {new Error(err)})
        },
    },

    watch: {
        // 筛选项深度监听自动查询列表 第一次赋值data时查询列表(页面进来自动查询一次列表)
        pageFilter: {
            handler() {
                this.debounceQueryList()
            },
            deep: true,
            // immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
    [wrapper] {
        padding: 20px;
        .filter{
            margin-bottom: 10px;
            font-size: 0;
            .item{
                display: inline-block;
                margin-right: 20px;
                margin-bottom: 10px;
                .label{
                    display: inline-block;
                    min-width: 86px;
                    text-align: right;
                    font-size: 14px;
                }
                .el-input, .el-select{
                    width: 160px;
                }
            }
        }
        .operation{
            .el-button{
                margin-right: 10px;
            }
        }
        .el-table{
            .el-button--text{
                font-size: 14px;
            }
            &::before{
                display: none;
            }
        }
    }
</style>
