<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <router-link to="/" class="home-link">
      <span class="site-name">
        Neon
      </span>
      <span class="neon-version">
        v{{ NEON_VERSION }}
      </span>
    </router-link>
    <SearchBox/>
    <div class="links">
      <nav class="nav-links can-hide">
        <div class="github-wrapper nav-item">
          <a href="https://github.com/insaic/neon" target="_blank" class="github nav-link"></a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import SearchBox from './SearchBox.vue'
const pkg = require('../../../package.json')
const NEON_VERSION = pkg.version

export default {
  components: { SidebarButton, SearchBox },
  data () {
    return {
      NEON_VERSION
    }
  }
}
</script>

<style lang="sass">
.navbar
  padding: 0.7rem 1.5rem
  line-height: $navbarHeight - 1.4rem
  position: relative
  a, span, img
    display: inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size: 1.3rem
    font-weight: 600
    color: $textColor
    position: relative
  .links
    font-size: 0.9rem
    position: absolute
    right: 1.5rem
    top: 0.7rem
    .github-wrapper
      width: 30px
      height: 30px
      filter: invert(70%)
      &:hover
        filter: invert(50%)
    .github
      width: 100%
      height: 100%
      display: inline-block
      background: url(~@/assets/images/github.png) no-repeat
      background-size: contain
      border-bottom: 0 !important

@media (max-width: $MQMobile)
  .navbar
    padding-left: 4rem
    .can-hide
      display: none
</style>
