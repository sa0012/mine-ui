<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
@import './assets/styles/theme.sass'

.sidebar .sidebar-sub-headers
  padding-left: 1rem
  font-size: .95em

a.sidebar-link
  font-weight: 400
  display: inline-block
  color: #2c3e50
  border-left: .25rem solid transparent
  padding: .35rem 1rem .35rem 1.25rem
  line-height: 1.4
  width: 100%
  -webkit-box-sizing: border-box
  box-sizing: border-box

a.sidebar-link:hover
  color: #009ce4

a.sidebar-link.router-link-active
  font-weight: 600
  color: #009ce4
  border-left-color: #009ce4

.sidebar-group a.sidebar-link
  padding-left: 2rem
</style>
