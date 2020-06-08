<template>
  <div class="sidebar">
    <ul class="sidebar-links">
      <li v-for="(item, i) in items" :key="i">
        <SidebarGroup
          :item="item"
          :first="i === 0"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'

export default {
  components: { SidebarGroup },

  props: ['items']
}
</script>

<style lang="sass">
.sidebar
  ul
    padding: 0
    margin: 0
    list-style-type: none
  a
    display: inline-block
  .nav-links
    display: none
    border-bottom: 1px solid $borderColor
    padding: 0.5rem 0 0.75rem 0
    a
      font-weight: 600
    .nav-item, .repo-link
      display: block
      line-height: 1.25rem
      font-size: 1.1em
      padding: 0.5rem 0 0.5rem 1.5rem
  .sidebar-links
    padding: 1.5rem 0

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display: block
    .sidebar-links
      padding: 1rem 0
</style>
