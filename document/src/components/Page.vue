<template>
  <div class="page">
    <router-view/>
    <div class="content page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ← <router-link v-if="prev" class="prev" :to="prev.path">
            {{ (prev.meta && prev.meta.title.replace(/-/g, ' ')) || prev.path }}
          </router-link>
        </span>
        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ (next.meta && next.meta.title.replace(/-/g, ' ')) || next.path }}
          </router-link> →
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { links } from '../router.js'

export default {
  computed: {
    prev () {
      let prve = null
      let prveIndex = -1
      links.forEach((item, index) => {
        if (item.path === this.$route.path) {
          prveIndex = index - 1
        }
      })
      if (prveIndex > -1 && links[prveIndex]) {
        prve = links[prveIndex]
      }
      return prve
    },
    next () {
      let next = null
      let nextIndex = -1
      links.forEach((item, index) => {
        if (item.path === this.$route.path) {
          nextIndex = index + 1
        }
      })
      if (nextIndex > -1 && links[nextIndex]) {
        next = links[nextIndex]
      }
      return next
    }
  }
}
</script>

<style lang="sass">
.page
  padding-bottom: 2rem

.edit-link.content
  padding-top: 0 !important
  a
    color: lighten($textColor, 25%)
    margin-right: 0.25rem

.page-nav.content
  padding-top: 1rem !important
  padding-bottom: 0 !important
  .inner
    min-height: 2rem
    margin-top: 0 !important
    border-top: 1px solid $borderColor
    padding-top: 1rem
  .next
    float: right
</style>
