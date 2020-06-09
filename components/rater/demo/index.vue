<template>
  <div class="demo-page-wrap">
    <div class="rater-wrap">
      <demo-title>set min</demo-title>
      <ml-rater :min="min" @getScore="getScore1">
      </ml-rater>
      <p>评分： {{ score1 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set max</demo-title>
      <ml-rater :max="max" @getScore="getScore2">
      </ml-rater>
      <p>评分： {{ score2 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set value</demo-title>
      <ml-rater :value="value" @getScore="getScore3">
      </ml-rater>
      <p>评分： {{ score3 || value }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set fontSize</demo-title>
      <ml-rater :size="fontSize" @getScore="getScore4">
      </ml-rater>
      <p>评分： {{ score4 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set disabled = true</demo-title>
      <ml-rater :disabled="disabled" :size="fontSize">
      </ml-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set activeColor</demo-title>
      <ml-rater 
        :size="fontSize" 
        :activeColor="activeColor">
      </ml-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set defaultColor</demo-title>
      <ml-rater 
        :size="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor">
      </ml-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set charsetIcon</demo-title>
      <ml-rater 
        :size="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :type="charsetIcon">
      </ml-rater>
      <ml-rater 
        :size="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :type="charsetIcon1">
      </ml-rater>
      <ml-rater 
        :size="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :type="charsetIcon2">
      </ml-rater>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      min: 3,
      max: 10,
      fontSize: '30',
      disabled: true,
      activeColor: 'green',
      activeColor1: '#f31212',
      defaultColor: '#ccc',
      value: 2,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      charsetIcon: 'flower',
      charsetIcon1: 'aixin',
      charsetIcon2: 'emoji'
    }
  },

  methods: {
    getScore1(score) {
      this.score1 = score
    },
    getScore2(score) {
      this.score2 = score
    },
    getScore3(score) {
      this.score3 = score
    },
    getScore4(score) {
      this.score4 = score
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  color: #666;
  padding-left: 15px;
  margin-bottom: 15px;
}

.rater-wrap {
  margin-bottom: 15px;
}
</style>
