<template>
  <div class="search-box">
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      placeholder="搜索组件.."
      :value="query"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown">
    <ul class="suggestions"
      v-show="showSuggestions"
      @mouseleave="unfocus">
      <li class="suggestion" v-for="(s, i) in suggestions" :key="i"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)">
        <a :href="s.path" @click.prevent>
          <span class="page-title">{{ s.meta.title || s.path }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { links } from '../router.js'

const linksArr = links.map(item => item.meta.title)

export default {
  data () {
    return {
      query: '',
      focused: false,
      focusIndex: 0
    }
  },
  computed: {
    showSuggestions () {
      return (
        this.focused &&
        this.suggestions &&
        this.suggestions.length
      )
    },
    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const pages = linksArr
      const max = 5
      const matches = item => (
        item.toLowerCase().indexOf(query) > -1
      )
      const res = []
      for (let i = 0; i < linksArr.length; i++) {
        if (res.length >= max) break
        const p = pages[i]

        if (matches(p)) {
          res.push(links[i])
        }
      }
      return res
    }
  },
  methods: {
    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go (i) {
      this.suggestions[i] && this.$router.push(this.suggestions[i].path)
      this.query = ''
      this.focusIndex = 0
    },
    focus (i) {
      this.focusIndex = i
    },
    unfocus () {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="sass">
.search-box
  display: inline-block
  position: relative
  margin-right: 0.5rem
  input
    cursor: pointer
    width: 10rem
    color: lighten($textColor, 25%)
    display: inline-block
    font-size: 0.9rem
    line-height: 2rem
    padding: 0 0.5rem 0 2rem
    outline: none
    transition: all .2s ease
    background: #fff url(~@/assets/images/search.svg) 0.6rem 0.5rem no-repeat
    background-size: 1rem
    &:focus
      cursor: auto
      border-color: $accentColor
  .suggestions
    background: #fff
    width: 20rem
    position: absolute
    top: 1.5rem
    border: 1px solid darken($borderColor, 10%)
    border-radius: 6px
    padding: 0.4rem
    list-style-type: none
  .suggestion
    line-height: 1.4
    padding: 0.4rem 0.6rem
    border-radius: 4px
    a
      color: lighten($textColor, 35%)
      .page-title
        font-weight: 600
      .header
        font-size: 0.9em
        margin-left: 0.25em
    &.focused
      background-color: #f3f4f5
      a
        color: $accentColor

@media (max-width: $MQNarrow)
  .search-box input
    width: 0
    border-color: transparent
    position: relative
    // left: 1rem
    &:focus
      left: 0
      width: 10rem

@media (max-width: $MQMobile)
  .search-box
    margin-right: 0
    .suggestions
      right: 0

@media (max-width: $MQMobileNarrow)
  .search-box
    .suggestions
      width: calc(100vw - 4rem)
    input:focus
      width: 8rem
</style>
