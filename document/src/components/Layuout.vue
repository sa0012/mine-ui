<template>
  <div
    class="theme-container"
    :class="pageClasses"
  >
    <Navbar @toggle-sidebar="toggleSidebar"/>
    <Sidebar :items="sidebarItems"  @toggle-sidebar="toggleSidebar"/>
    <Page/>
    <Simulator></Simulator>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import Page from './Page.vue'
import Simulator from './Simulator.vue'
import menus from '../../../examples/menu.js'

export default {
  name: 'Layout',

  components: { Navbar, Sidebar, Page, Simulator },

  data () {
    return {
      sidebarItems: Object.entries(menus),
      isSidebarOpen: false
    }
  },

  computed: {
    pageClasses () {
      return [
        {
          'sidebar-open': this.isSidebarOpen
        }
      ]
    }
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    }
  }
}
</script>
