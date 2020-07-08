<template>
  <div class="preview">
    <demo-title>基础用法</demo-title>
    <ul
      class="img-list"
    >
      <li
        class="img-item"
        v-for="(item, index) in imgList"
        :key="index"
        @click="handlePreview(item, index)"
      >
        <img :src="item" alt="">
      </li>
    </ul>
    <ml-image-preview
      v-model="show"
      :imgList="imgList"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      imgList: [
        'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
        'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg',
        'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg',
        'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
      ]
    }
  },

  methods: {
    handlePreview (item, index) {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  &-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &-item {
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;

    img {
      width: 100%;
    }
  }
}
</style>
