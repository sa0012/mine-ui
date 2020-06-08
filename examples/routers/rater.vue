<template>
  <div class="demo-page-wrap">
    <div class="rater-wrap">
      <demo-title>set min</demo-title>
      <sq-rater :min="min" @getScore="getScore1">
      </sq-rater>
      <p>评分： {{ score1 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set max</demo-title>
      <sq-rater :max="max" @getScore="getScore2">
      </sq-rater>
      <p>评分： {{ score2 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set value</demo-title>
      <sq-rater :value="value" @getScore="getScore3">
      </sq-rater>
      <p>评分： {{ score3 || value }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set fontSize</demo-title>
      <sq-rater :fontSize="fontSize" @getScore="getScore4">
      </sq-rater>
      <p>评分： {{ score4 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set disabled = true</demo-title>
      <sq-rater :disabled="disabled" :fontSize="fontSize">
      </sq-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set activeColor</demo-title>
      <sq-rater 
        :fontSize="fontSize" 
        :activeColor="activeColor">
      </sq-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set defaultColor</demo-title>
      <sq-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor">
      </sq-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set charsetIcon</demo-title>
      <sq-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :charsetIcon="charsetIcon">
      </sq-rater>
      <sq-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :charsetIcon="charsetIcon1">
      </sq-rater>
      <sq-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :charsetIcon="charsetIcon2">
      </sq-rater>
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
      fontSize: '40',
      disabled: true,
      activeColor: 'green',
      activeColor1: '#f31212',
      defaultColor: '#666',
      value: 2,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      charsetIcon: 'flower',
      charsetIcon1: 'love',
      charsetIcon2: 'smile'
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
