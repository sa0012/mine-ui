<template>
  <div>
    <demo-title>基础使用</demo-title>
    <ml-dropdown-menu>
      <ml-dropdown-item
        v-model="value1"
        :options="option1"
        @select="handleSelect1"
      />
      <ml-dropdown-item
        v-model="value2"
        :options="option2"
        @select="handleSelect2"
      />
      <ml-dropdown-item
        v-model="value3"
        :options="option3"
        @select="handleSelect3"
      />
    </ml-dropdown-menu>

    <demo-title>自定义内容</demo-title>
    <ml-dropdown-menu>
      <ml-dropdown-item
        v-model="value1"
        :options="option1"
        @select="handleSelect1"
      />
      <ml-dropdown-item
        title="水果分类"
        ref="item"
      >
        <ml-cell
          v-for="(fruit, fIndex) in option4"
          :key="fIndex.text"
          :title="fruit"
          is-link
        >
          <ml-switch
            slot="right-icon"
            animation
            v-model="fruit.isChecked"
            size="24"
          />
        </ml-cell>
        <ml-button
          type="primary"
          size="large"
          @click="onConfirm"
        >确定</ml-button>
      </ml-dropdown-item>
    </ml-dropdown-menu>

    <demo-title>向上展开</demo-title>
    <ml-dropdown-menu
      direction="up"
    >
      <ml-dropdown-item
        v-model="value5"
        :options="option1"
        @select="handleSelect1"
      />
      <ml-dropdown-item
        v-model="value6"
        :options="option2"
        @select="handleSelect2"
      />
      <ml-dropdown-item
        v-model="value7"
        :options="option3"
        @select="handleSelect3"
      />
    </ml-dropdown-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 'all',
      value2: 'a',
      value3: 'one',
      value4: 0,
      value5: 'all',
      value6: 'a',
      value7: 'one',
      isChecked1: false,
      isChecked2: false,
      option1: [
        { text: '全部商品', value: 'all' },
        { text: '新款商品', value: 'new' },
        { text: '活动商品', value: 'active' }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '菜单一', value: 'one' },
        { text: '菜单二', value: 'two' },
        { text: '菜单三', value: 'three' }
      ],
      option4: [
        { text: 'apple', value: 0 },
        { text: 'pear', value: 1 },
        { text: 'banana', value: 2 }
      ]
    }
  },

  methods: {
    onConfirm () {
      this.$refs.item.toggle()
      this.$refs.item.cancelOverlay()
    },

    handleSelect1 ({ value, index }) {
      console.log(value, index)
    },

    handleSelect2 ({ value, index }) {
      console.log(value, index)
    },

    handleSelect3 ({ value, index }) {
      console.log(value, index)
    }
  }
}
</script>
