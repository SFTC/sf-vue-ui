<template>
  <div class="lssc" v-if="formItem">
    <el-form-item
      v-for="item in cascadeArray"
      :key="item"
      :label="mapping[item].label"
      v-if="computedConfig[item].show"
    >
      <el-select
        v-if="!computedConfig[item].multiple"
        filterable
        :placeholder="'请选择' + mapping[item].label"
        :value = "mapping[item].value"
        @input="changeValue(item, $event)"
        :disabled="disabled || computedConfig[item].disabled"
      >
        <el-option
          v-for="op in mapping[item].options"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        ></el-option>
      </el-select>

      <multi-select
        v-if="computedConfig[item].multiple"
        :placeholder="'请选择' + mapping[item].label"
        :value = "mapping[item].value"
        @input="changeValue(item, $event)"
        :disabled="disabled || computedConfig[item].disabled"
      >
        <multi-option
          v-for="op in mapping[item].options"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        ></multi-option>
      </multi-select>
    </el-form-item>
  </div>
  <div class="lssc" v-else>
    <div
      v-for="item in cascadeArray"
      :key="item"
      v-if="computedConfig[item].show"
      :class="`lssc-item lssc-${item}-item`"
    >
      <el-select
        v-if="!computedConfig[item].multiple"
        filterable
        :placeholder="'请选择' + mapping[item].label"
        :value = "mapping[item].value"
        @input="changeValue(item, $event)"
        :disabled="disabled || computedConfig[item].disabled"
      >
        <el-option
          v-for="op in mapping[item].options"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        ></el-option>
      </el-select>

      <multi-select
        v-if="computedConfig[item].multiple"
        :placeholder="'请选择' + mapping[item].label"
        :value = "mapping[item].value"
        @input="changeValue(item, $event)"
        :disabled="disabled || computedConfig[item].disabled"
      >
        <multi-option
          v-for="op in mapping[item].options"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        ></multi-option>
      </multi-select>
    </div>
  </div>
</template>

<script>
  import MultiSelect from 'common/components/MultiSelect';
  import MultiOption from 'common/components/MultiSelect/MultiOption';
  import { DATAAUTH } from '../../templateHelper';

  const lcOptions = Object.keys(DATAAUTH).map(item => ({
    value: item,
    label: DATAAUTH[item].name,
  }));

  /**
   * 配置说明
   * show: 是否显示
   * haveAll: 是否加上全部字段
   * multiple: 是否开启多选
   * disabled: 是否禁用
   */
  const defaultConfig = {
    logisticsCenter: {
      show: true,
      haveAll: false,
      multiple: false,
      disabled: false,
      next: 'supplier',
    },
    supplier: {
      show: true,
      haveAll: false,
      multiple: false,
      disabled: false,
      next: 'station',
    },
    station: {
      show: true,
      haveAll: false,
      multiple: false,
      disabled: false,
      haveAbandon: true,
    },
  };

  export default {
    name: 'LogisticsSupplierStationCascade',
    components: {
      MultiSelect, MultiOption,
    },
    data() {
      return {
        lcOptions,
        cascadeArray: ['logisticsCenter', 'supplier', 'station'],
      };
    },
    props: {
      config: {
        type: Object,
      },
      value: {
        type: Object,
      },
      autoInit: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
      formItem: {
        type: Boolean,
        default: true,
      },
      initSelect: {  // 供应商和站点不能有全部的情况下，根据所选配送中心赋初值给供应商和站点
        type: Boolean,
        default: false,
      },
    },
    computed: {
      mapping() {
        return {
          logisticsCenter: {
            label: '配送中心',
            value: this.logisticsCenterValue,
            options: this.lcOptions,

          },
          supplier: {
            label: '供应商',
            value: this.supplierValue,
            options: this.sOptions,
          },
          station: {
            label: '站点',
            value: this.stationValue,
            options: this.stOptions,
          },
        };
      },
      /**
       * 修正配置
       * 1. 当多个开启多选时，只有最后一个show为true的能够开启多选
       * 2. 当haveAll和multiple都为true时，haveAll无效，变为false
       * 3. 当三个都显示时，中间的选项不能为空
       * 4. 当只有1，3显示时，显示1，2，3
       * 6. 当show为false时，其他选项全部重置为false
       */
      computedConfig() {
        if (!this.config) {
          return defaultConfig;
        }
        const copyConfig = Object.assign({}, this.config);
        const logisticsCenterConf = copyConfig.logisticsCenter || {};
        const supplierConf = copyConfig.supplier || {};
        const stationConf = copyConfig.station || {};

        // 需求6
        if (!logisticsCenterConf.show) {
          logisticsCenterConf.multiple = false;
          logisticsCenterConf.disabled = false;
          logisticsCenterConf.haveAll = false;
        }
        if (!supplierConf.show) {
          supplierConf.multiple = false;
          supplierConf.disabled = false;
          supplierConf.haveAll = false;
        }
        if (!stationConf.show) {
          stationConf.multiple = false;
          stationConf.disabled = false;
          stationConf.haveAll = false;
        }

        // 需求4
        if (logisticsCenterConf.show && supplierConf.show === false && stationConf.show) {
          supplierConf.show = true;
        }

        // 需求1
        if (logisticsCenterConf.multiple || supplierConf.multiple || stationConf.multiple) {
          if (stationConf.show) {
            logisticsCenterConf.multiple = false;
            supplierConf.multiple = false;
          } else if (supplierConf.show) {
            logisticsCenterConf.multiple = false;
          }
        }

        // 需求5
        // if (logisticsCenterConf.haveAll || supplierConf.haveAll || stationConf.haveAll) {
        //   if (stationConf.show) {
        //     logisticsCenterConf.haveAll = false;
        //     supplierConf.haveAll = false;
        //   } else if (supplierConf.show) {
        //     logisticsCenterConf.haveAll = false;
        //   }
        // }

        // 需求6 增加配送中心的全部
        if (logisticsCenterConf.show && logisticsCenterConf.haveAll
          && !logisticsCenterConf.multiple) {
          const value = this.removeDuplicateLc();
          if (!value) {
            this.lcOptions.unshift({
              label: '全部',
              value: '',
            });
          }
        }

        // 需求2
        if (logisticsCenterConf.haveAll && logisticsCenterConf.multiple) {
          logisticsCenterConf.haveAll = false;
        }
        if (supplierConf.haveAll && supplierConf.multiple) {
          supplierConf.haveAll = false;
        }
        if (stationConf.haveAll && stationConf.multiple) {
          stationConf.haveAll = false;
        }
        return {
          logisticsCenter: {
            ...defaultConfig.logisticsCenter,
            ...logisticsCenterConf,
          },
          supplier: {
            ...defaultConfig.supplier,
            ...supplierConf,
          },
          station: {
            ...defaultConfig.station,
            ...stationConf,
          },
        };
      },
      logisticsCenterValue: {
        get() {
          return this.getValue('logisticsCenter');
        },
        set(value) {
          this.updateValue('logisticsCenter', value);
        },
      },
      supplierValue: {
        get() {
          return this.getValue('supplier');
        },
        set(value) {
          this.updateValue('supplier', value);
        },
      },
      stationValue: {
        get() {
          return this.getValue('station');
        },
        set(value) {
          this.updateValue('station', value);
        },
      },
      sOptions() {
        return this.getOptions('supplier');
      },
      stOptions() {
        return this.getOptions('station');
      },
    },
    methods: {
      getValue(level) {
        // 数据处理，将非标输入转换为标准输入: 单选string; 多选[string, string...]
        const val = this.value[level];
        const conf = this.computedConfig[level];
        if (conf.multiple) {
          if (Array.isArray(val) && typeof val[0] === 'number') {
            if (val[0] === 0) {
              return [];
            }
            return val.map(item => (item ? item.toString() : ''));
          }
          if (!Array.isArray(val) && typeof val === 'string') {
            if (val.length) {
              return val.split(',');
            }
            return [];
          }
          return val;
        }
        return val ? val.toString() : '';
      },
      getOptions(level, tempValue) {
        let logisticsCenterValue = this.logisticsCenterValue;
        let supplierValue = this.supplierValue;

        if (tempValue) {
          logisticsCenterValue = tempValue.logisticsCenter;
          supplierValue = tempValue.supplier;
        }

        if (!DATAAUTH[logisticsCenterValue]) {
          return [];
        }
        let options;
        if (level !== 'station') {
          if (DATAAUTH[logisticsCenterValue] && DATAAUTH[logisticsCenterValue][`${level}s`]) {
            options = Object.keys(DATAAUTH[logisticsCenterValue][`${level}s`]).map(item => ({
              value: item.toString(),
              label: DATAAUTH[logisticsCenterValue][`${level}s`][item].name,
            }));
          } else {
            options = [];
          }
        } else {
          // 当获取站点数据时，如果前一个供应商有值，说明需要级联计算
          // eslint-disable-next-line
          if (supplierValue.length
            && DATAAUTH[logisticsCenterValue]
            && DATAAUTH[logisticsCenterValue].suppliers
            && DATAAUTH[logisticsCenterValue].suppliers[supplierValue]
            && DATAAUTH[logisticsCenterValue].suppliers[supplierValue].stations) {
            // eslint-disable-next-line
            const stations = DATAAUTH[logisticsCenterValue].suppliers[supplierValue].stations;
            const allStations = DATAAUTH[logisticsCenterValue].stations;
            if (stations && allStations) {
              options = stations.map(item => ({
                value: item.toString(),
                label: allStations[item] ? allStations[item].name : '',
                exist_status: allStations[item] ? allStations[item].exist_status : '',
              }));
            }
          } else {
            options = [];
          }
        }
        if (level === 'station' && !this.computedConfig[level].haveAbandon) {
          options = options.filter(item => (item.exist_status !== 2 || item.label === '全部'));
        }
        if (this.computedConfig[level].haveAll) {
          options.unshift({
            value: '',
            label: '全部',
          });
        }
        // 不希望在get函数中做任何有副作用的操作，因此去掉此处赋值操作 by lichun;
        /*
        // 级联数据变化时，supplier默认有值，需求3
        // 且不含全部选项时，才会设置
        if (level === 'supplier') {
          if (this.supplierValue === '' && !this.computedConfig.supplier.haveAll && options[0]) {
            this.supplierValue = options[0].value;
          }
        }*/

        // supplier 不能为空，为空的话，station的option就只有全部,supplier 选全部的话，也代表空
        if (level === 'station') {
          if (supplierValue === '' && this.computedConfig.supplier.haveAll && !this.computedConfig.station.multiple) {
            return [{
              value: '',
              label: '全部',
            }];
          }
        }
        return options;
      },
      changeValue(type, newValue) {
        if (this[`${type}Value`] !== newValue) {
          this[`${type}Value`] = newValue;
        }
      },
      updateValue(key, value) {
        const areaValue = {
          logisticsCenter: this.logisticsCenterValue,
          supplier: this.supplierValue,
          station: this.stationValue,
        };
        areaValue[key] = value;
        let temp = key;
        while (this.computedConfig[temp].next) {
          temp = this.computedConfig[temp].next;
          areaValue[temp] = this.computedConfig[temp].multiple ? [] : '';
        }
        if (key === 'supplier' && this.initSelect) {
          const stOptions = this.getOptions('station', { ...areaValue });
          if (!stOptions.length) {
            areaValue.station = this.computedConfig.station.multiple ? [] : '';
          } else {
            areaValue.station = this.computedConfig.station.multiple ?
              [stOptions[0].value] :
              stOptions[0].value;
          }
        }
        this.$emit('input', areaValue);
      },
      updateFullValue(newValue) {
        this.$emit('input', newValue);
      },
      removeDuplicateLc() {
        if (this.lcOptions[0].value === '') {
          return true;
        }
        return false;
      },
      autoSetInitValue() {
        const val = {};
        if (this.computedConfig.logisticsCenter.multiple) {
          val.logisticsCenter = this.initSelect ? [this.value.logisticsCenter] : [lcOptions[0].value];
        } else {
          val.logisticsCenter = this.initSelect ? this.value.logisticsCenter : lcOptions[0].value;
        }
        if (this.computedConfig.supplier.show) {
          const sOptions = this.getOptions('supplier', { ...val });
          if (!sOptions.length) {
            val.supplier = this.computedConfig.supplier.multiple ? [] : '';
          } else {
            val.supplier = this.computedConfig.supplier.multiple ?
              [sOptions[0].value] :
              sOptions[0].value;
          }
        }
        if (this.computedConfig.station.show) {
          const stOptions = this.getOptions('station', { ...val });
          if (!stOptions.length) {
            val.station = this.computedConfig.station.multiple ? [] : '';
          } else {
            val.station = this.computedConfig.station.multiple ?
              [stOptions[0].value] :
              stOptions[0].value;
          }
        }
        return val;
      },
    },
    mounted() {
      if (this.autoInit && !this.value.logisticsCenter) {
        this.updateFullValue(this.autoSetInitValue());
      }
      if (this.initSelect && this.value.logisticsCenter) {
        this.updateFullValue(this.autoSetInitValue());
      }
    },
  };
</script>

<style lang="less">
  .lssc {
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
  }
</style>
