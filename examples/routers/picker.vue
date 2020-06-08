<template>
  <div>
    <demo-title>搭配popup使用</demo-title>
    <sq-cell title="搭配popup使用">
      <sq-switch v-model="isShow"></sq-switch>
    </sq-cell>
    <demo-title>单列形式 -- ['']数据结构 {{value1}}</demo-title>
    <sq-cell title="设置新值-广州">
      <sq-button size="small" @click="$refs.pickerRef1.setValues(['广州'])">设置新值</sq-button>
    </sq-cell>
    <sq-cell title="改变数据源">
      <sq-button size="small" @click="list1 = ['苹果', '香蕉', '菠萝', '草莓']">改变数据源</sq-button>
    </sq-cell>
    <br>
    <sq-picker
      ref="pickerRef1"
      show-toolbar
      :columns="list1"
      :row-height="34"
      :row-count="7"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="onChange"
    />
    <demo-title>多列形式 -- [[''],['']]数据结构</demo-title>
    <sq-picker
      show-toolbar
      :columns="list2"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="onChange"
    />
    <demo-title>多列形式 -- [{},{}]数据结构</demo-title>
    <sq-picker
      show-toolbar
      :columns="list3"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="onChange"
      value-key="label"
    />

    <demo-title>联动形式</demo-title>
    <sq-picker
      show-toolbar
      :columns="list4"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="handleChange5"
    />
    
    <demo-title>loading状态</demo-title>
    <sq-picker
      show-toolbar
      :columns="list0"
      :loading="true"
    />

    <sq-popup v-model="isShow" position="bottom">
      <sq-picker
        show-toolbar
        :columns="list0"
        @confirm="confirm"
        @cancel="cancel"
        @on-change="onChange"
      />
    </sq-popup>
  </div>
</template>

<script>
const mock = {
  '浙江': ['杭州', '宁波', '温州', '杭州'],
  '上海': ['黄浦区', '静安区', '长宁区', '徐汇区']
}
export default {
  name: '',

  data () {
    return {
      value1: ['上海'],
      value2: ['上海', '宁波'],
      value3: '',
      value4: '',
      value5: '',
      list0: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
      list1: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
      list2: [
        ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
        ['杭州', '宁波', '温州', '嘉兴', '湖州']
      ],
      list3: [
        [
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
          { value: 3, label: 'C' },
          { value: 4, label: 'D' },
          { value: 5, label: 'E' },
          { value: 6, label: 'F' },
          { value: 7, label: 'G' }
        ],
        [
          { value: 11, label: 'Aa' },
          { value: 12, label: 'Bb' },
          { value: 13, label: 'Cc' },
          { value: 14, label: 'Dd' },
          { value: 15, label: 'Ee' },
          { value: 16, label: 'Ff' },
          { value: 17, label: 'Gg' }
        ]
      ],
      list4: [
        {
          values: Object.keys(mock)
        },
        {
          values: mock['浙江']
        }
      ],
      isShow: false
    }
  },

  methods: {
    set1 () {
      this.$refs.picker.updateColumnAndValue({
        newCol: ['苹果', '香蕉']
      })
    },
    set2 () {
      this.$refs.picker.updateColumnAndValue({
        newCol: ['A', 'B', 'C'],
        newValueIndex: 2
      })
    },
    onChange (result) {
      console.log(result)
    },
    cancel1 (result) {
      console.log(result)
    },
    confirm1 (result) {
      console.log(result)
    },
    handleChange (result) {
      console.log(result)
    },
    handleCancel (result) {
      console.log(result)
    },
    handleConfirm (result) {
      console.log(result)
    },
    cancel (result) {
      console.log(result)
      this.isShow = !this.isShow
    },
    confirm (result) {
      console.log(result)
      this.isShow = !this.isShow
    },
    handleChange5 (value, picker) {
      console.log(value)
      picker.setColumnValues(1, mock[value[0]])
    }
  }
}
</script>

<style lang="css">
</style>
