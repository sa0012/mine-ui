<template>
  <div class="demo-page-wrap demo-field-wrap">
    <demo-title left>列表样式</demo-title>
    <ml-field label="手机号" placeholder="请输入手机号码" v-model="name" hasBlurTip v-sq-input:mobile.required></ml-field>
    <ml-field required="left" label="用户名" placeholder="请输入用户名" v-model="name" icon="alert-full" @click-icon="clickIcon"></ml-field>
    <ml-field required="left" label="带清空按钮" placeholder="请输入密码" clearable v-model="name2"></ml-field>

    <ml-cell-group title="间隔样式">
      <ml-field placeholder="请输入用户名" v-model="name"></ml-field>
      <ml-field label="用户名" placeholder="文本居右" right v-model="name"></ml-field>
      <ml-field required label="带清空按钮" placeholder="请输入密码" clearable v-model.number="name2"></ml-field>
      <ml-field
        required
        label="带清空按钮"
        leftIcon="alert-full"
        isLink
        readonly
        placeholder="请输入密码"
        clearable v-model.number="name2"></ml-field>
    </ml-cell-group>
    <ml-cell-group title="商业险" label="添加更多">
      <ml-field title="商业险" placeholder="请输入用户名" v-model="name">
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
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      name: '',
      name2: 0,
    }
  },

  methods: {
    clickIcon () {
      alert('clickIcon')
    }
  }
}

</script>
<style lang='scss'>
.demo-field-wrap {
  padding: 0;
}
</style>
