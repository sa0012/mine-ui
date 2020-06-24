<template>
  <div>
    <demo-title left>基础形式</demo-title>
    <ml-swiper>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="1" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="2" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="3" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="4" class="img">
      </ml-swiper-item>
    </ml-swiper>

    <demo-title left>禁止手势切换并定义宽高为200px</demo-title>
    <ml-swiper :touchable="false" style="width:200px;height:200px;">
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/1124002/pexels-photo-1124002.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="1" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/37401/dog-cute-pet.jpg?auto=compress&cs=tinysrgb&h=350"
          alt="2" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/976871/pexels-photo-976871.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="3" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/220974/pexels-photo-220974.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="4" class="img">
      </ml-swiper-item>
    </ml-swiper>

    <demo-title left>纵向轮播</demo-title>
    <ml-swiper vertical>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="1" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="2" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="3" class="img">
      </ml-swiper-item>
      <ml-swiper-item>
        <img
          src="https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="4" class="img">
      </ml-swiper-item>
    </ml-swiper>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>
