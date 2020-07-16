<template>
<div class="backtop">
  <ml-cell-group label="backtop">
    <ml-cell
      v-for="item in 40"
      :key="item"
      :title="`基础测试内容${item}`"
    />

    <ml-backtop />
    <ml-backtop
      type="square"
      bottom="80"
    />
  </ml-cell-group>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
