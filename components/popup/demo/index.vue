<template>
  <div class="popup">
    <ml-popup
      v-model="showTop"
      position="center"
      :style="{ height: '20%' }" />
  </div>
</template>

<script>
export default {
  name: 'demo-popup',
  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">
.popup {
  padding: 10px;
  box-sizing: border-box;

  /deep/ .ml-button {
    margin: 5px;
  }
}
</style>
