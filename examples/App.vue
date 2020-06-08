<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  background-color: #EDF0F4;
  box-sizing: border-box;
  user-select: none;
  font-size: 16px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.demo-page-wrap {
  padding: 20px;
  min-height: 100%;
  box-sizing: border-box;
  background-color: #EDF0F4;
  .demo-title {
    padding: 25px 15px 7px 0;
  }
}
</style>
