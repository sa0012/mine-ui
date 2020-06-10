<template>
  <div class="cell-page">
    <ml-cell-group title="交强险">
      <ml-cell title="交强险" is-link value="投保" @click="show"></ml-cell>
      <ml-cell title="起保时间" is-link></ml-cell>
    </ml-cell-group>
    <ml-cell-group title="商业险" label="添加更多" @click="addMore">
      <ml-cell title="交强险" is-link value="投保"></ml-cell>
      <ml-cell title="起保时间" is-link></ml-cell>
    </ml-cell-group>
    <ml-cell-group title="自定义插槽">
      <ml-cell>
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
      </ml-cell>
    </ml-cell-group>
    <ml-cell-group title="自定义icon">
      <ml-cell
        leftIcon="alert-full"
        title="商业险"
        value="投保"
        isLink
      />
      <ml-cell
        leftIcon="alert-full"
        rightIcon="checkmark"
        title="商业险"
        value="投保"
      />
      <ml-cell
        title="商业险"
        value="投保"
        textPos="left"
        required="right"
      />
      <ml-cell
        title="商业险"
        value="投保"
        textPos="center"
        required="left"
        border="both"
        isLink
      />
      <ml-cell
        title="商业险"
        value="投保"
        textPos="center"
        required="left"
        border="none"
        isLink
      />
    </ml-cell-group>
    <!-- <ml-cell title="起保时间">
      <sq-switch v-model="isSwitch"></sq-switch>
    </ml-cell> -->
  </div>
</template>

<script>
export default {
  name: 'demo-cell',

  data () {
    return {
      isSwitch: false
    }
  },

  methods: {
    show () {
      alert('投保')
    },
    addMore () {
      alert('添加更多')
    }
  }
}
</script>

<style lang="scss">
</style>
