<template>
  <div>
    <demo-title>插件式调用</demo-title>
    <sq-cell title="默认今天[date类型]">
      <sq-button size="small" @click="pluginClick1">开启</sq-button>
    </sq-cell>
    <sq-cell title="默认明天[date类型]">
      <sq-button size="small" @click="pluginClick2">开启</sq-button>
    </sq-cell>
    <sq-cell title="默认明天[datetime类型]">
      <sq-button size="small" @click="pluginClick3">开启</sq-button>
    </sq-cell>
    <sq-cell title="默认今天[yearMonth类型]">
      <sq-button size="small" @click="pluginClick4">开启</sq-button>
    </sq-cell>
    <sq-cell title="默认今天[time类型]">
      <sq-button size="small" @click="pluginClick5">开启</sq-button>
    </sq-cell>
    
    <demo-title>标签式调用</demo-title>
    <demo-title>
      yyyy-MM-dd形式 {{dataValue1 | formatDate('yyyy-MM-dd')}}
      <sq-button size="small"
      @click.native="dataValue1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)">设置日期为后天</sq-button>
    </demo-title>
    <sq-date-picker
      :min-date="minDate"
      :max-date="maxDate"
      v-model="dataValue1"
      title="请选择时间"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>
      yyyy-MM-dd hh:mm形式 {{dataValue2 | formatDate('yyyy-MM-dd hh:mm')}}
      <sq-button size="small" @click.native="dataValue2 = new Date()">设置日期为当前</sq-button>
    </demo-title>
    <sq-date-picker
      type="datetime"
      v-model="dataValue2"
      :format="['年', '月', '日', '时', '分']"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>yyyy-MM形式 {{dataValue3 | formatDate('yyyy-MM')}}</demo-title>
    <sq-date-picker
      v-model="dataValue3"
      type="year-month"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />
    <demo-title>hh-mm形式 {{dataValue4 | formatDate('hh-mm')}}</demo-title>
    <sq-date-picker
      v-model="dataValue4"
      type="time"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>搭配popup使用 {{ dataValue5 | formatDate('yyyy-MM-dd') }}</demo-title>
    <sq-cell title="搭配popup使用">
      <sq-switch v-model="isShow"></sq-switch>
    </sq-cell>
    <br>
    <br>
    <br>
    <sq-popup v-model="isShow" position="bottom">
      <sq-date-picker
        v-model="dataValue5"
        :format="['年', '月', '日']"
        @confirm="confirm2"
        @cancel="cancel2"
        @on-change="onChange2"
      />
    </sq-popup>
  </div>
</template>

<script>
const now = new Date()
export default {
  name: '',

  data () {
    return {
      isShow: false,
      dataValue1: '',
      dataValue2: '',
      dataValue3: '',
      dataValue4: '',
      dataValue5: '',
      minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      maxDate: new Date(2030, 11, 31)
    }
  },

  filters: {
    formatDate (datetime, fmt = 'yyyy-MM-dd hh:mm:ss') {
      if (!datetime) return
      if (typeof datetime === 'string' && datetime.indexOf(':') > -1) return datetime
      let date = datetime
      if (typeof datetime === 'string') {
        date = new Date(datetime.replace(/-/g, '/'))
      } else {
        date = new Date(datetime)
      }
      function padLeftZero (str) {
        return ('00' + str).substr(str.length)
      }

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
      }
      return fmt
    }
  },

  methods: {
    pluginClick1 () {
      this.$datetime.date({
        minDate: '2016-01-01',
        maxDate: '2020-12-31',
        value: new Date(),
        onConfirm: (value) => {
          console.log(value)
          this.$datetime.hide(() => {
            console.log(value)
          })
        },
        onCancel: () => {
          this.$datetime.hide()
        },
        onChange (value) {
          console.log(value)
        }
      })
    },
    pluginClick2 () {
      const now = new Date()
      this.$datetime.date({
        title: 'type为date',
        value: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        minDate: '2017-06-05',
        maxDate: '2019-09-04',
        onConfirm: (value) => {
          console.log(value)
          this.$datetime.hide(() => {
            console.log(value)
          })
        },
        onCancel: () => {
          this.$datetime.hide()
        },
        onChange (value) {
          console.log(value)
        }
      })
    },
    pluginClick3 () {
      const now = new Date()
      this.$datetime.datetime({
        title: 'type为datetime',
        value: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getHours(), now.getMinutes()),
        minDate: new Date(2017, 5, 5, 6, 6),
        maxDate: new Date(2019, 8, 4, 8, 8),
        onConfirm: (value) => {
          console.log(value)
          this.$datetime.hide(() => {
            console.log(value)
          })
        },
        onCancel: () => {
          this.$datetime.hide()
        },
        onChange (value) {
          console.log(value)
        }
      })
    },
    pluginClick4 () {
      const now = new Date()
      this.$datetime.yearMonth({
        title: 'type为yearMonth',
        format: ['年', '月'],
        value: new Date(now.getFullYear(), now.getMonth()),
        minDate: new Date(2017, 2),
        maxDate: new Date(2019, 10),
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        onConfirm: (value) => {
          console.log(value)
          this.$datetime.hide(() => {
            console.log(value)
          })
        },
        onCancel: () => {
          this.$datetime.hide()
        },
        onChange (value) {
          console.log(value)
        }
      })
    },
    pluginClick5 () {
      const now = new Date()
      this.$datetime.time({
        title: 'type为time',
        value: '19:30',
        minHour: 3,
        maxHour: 22,
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        onConfirm: (value) => {
          console.log(value)
          this.$datetime.hide(() => {
            console.log(value)
          })
        },
        onCancel: () => {
          this.$datetime.hide()
        },
        onChange (value) {
          console.log(value)
        }
      })
    },
    confirm1 (val) {
      console.log(val)
    },
    cancel1 (val) {
      console.log(val)
    },
    onChange1 (val) {
      console.log(val)
    },
    confirm2 (val) {
      console.log(val)
      this.isShow = false
    },
    cancel2 (val) {
      console.log(val)
      this.isShow = false
    },
    onChange2 (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
</style>
