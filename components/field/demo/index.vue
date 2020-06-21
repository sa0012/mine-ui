<template>
  <div class="demo-page-wrap demo-field-wrap">
    <demo-title left>列表样式</demo-title>
    <ml-field
      label="手机号"
      placeholder="请输入手机号码"
      v-model="value"
      ></ml-field>
    <ml-field
      required="left"
      label="用户名"
      placeholder="请输入用户名"
      v-model="value"
      rightIcon="alert-full"
      @click-icon="clickIcon"></ml-field>
    <ml-field
      required="left"
      label="带清空按钮"
      placeholder="请输入密码"
      clearable
      @input="handleInput"
      v-model="value2"></ml-field>

    <ml-cell-group title="间隔样式">
      <ml-field label="用户名" placeholder="文本居右" right v-model="value"></ml-field>
      <ml-field required label="带清空按钮" placeholder="请输入密码" clearable v-model.number="value2"></ml-field>
      <ml-field
        required
        label="带清空按钮"
        leftIcon="alert-full"
        isLink
        readonly
        placeholder="请输入密码"
        clearable v-model.number="value2"></ml-field>
    </ml-cell-group>
    <ml-cell-group title="商业险" label="添加更多">
      <ml-field title="商业险" placeholder="请输入用户名" v-model="value">
        <template slot="left-icon">
          <img src="../../../examples/assets/logo.png" alt="">
        </template>
        <template slot="title">
          商业险
        </template>
        <template slot="right-icon">
          <img src="../../../examples/assets/logo.png" alt="">
        </template>
      </ml-field>
    </ml-cell-group>
    <ml-cell-group title="自定义插槽">
      <ml-field>
        <template slot="left-icon">
          <img src="../../../examples/assets/logo.png" alt="">
        </template>
        <template slot="title">
          <span>商业险</span>
        </template>
        <template>
          <div>起保时间</div>
        </template>
        <template slot="right-icon">
          <img src="../../../examples/assets/logo.png" alt="">
        </template>
      </ml-field>
    </ml-cell-group>
  </div>
</template>

<script>
export default {
  name: 'demo-field',

  data () {
    return {
      value: 'this ad',
      value2: 'this is a value2'
    }
  },

  methods: {
    clickIcon () {
      alert('clickIcon')
    },

    handleInput () {
      console.log(2345)
    }
  }
}

</script>
<style lang='scss'>
.demo-field-wrap {
  padding: 0;
}
</style>
