<template>
  <div class="scratch">
    <ml-scratch
      :coverImg="coverImg"
      :scratchCard="success"
      @start="handleStart"
      @end="handleEnd"
    />

    <ml-button @click="restart">剩余次数{{ count }}</ml-button>

    <pre v-for="(text, tIndex) in useRules" :key="tIndex">
      {{ text }}
    </pre>
  </div>
</template>

<script>
import coverImg from '../../../examples/assets/images/scratch.png'
import success from '../../../examples/assets/images/success.png'
import thankyou from '../../../examples/assets/images/thankyou.png'
export default {
  data () {
    return {
      coverImg,
      success,
      thankyou,
      context: null,
      eventDetect: null,
      resetCover: null,
      count: 5,
      useRules: [
        '在同时满足以下条件时，该维修抵用券可抵用对应本车辆维修费用：\n1、本车辆发生事故，且本车有实际损失；\n2、本车辆在事故中有责任；\n3、本车辆在发生事故后已向保险公司报案；\n4、针对该事故中的损失，本车辆到上汽保险授权经销商处进行维修。\n注意：本维修抵用券不退、换现金，且一次事故最多只能使用一张券。'
      ]
    }
  },

  methods: {
    handleStart (fn, context) {
      this.eventDetect = fn
      this.context = context
      console.log(1233333)
      // fn(context, this.lotteryRenewal)
    },

    handleEnd (resetCover) {
      console.log('刮奖成功')
      this.resetCover = resetCover
      // this.$dialog.alert({
      //   title: '温馨提示',
      //   message: '中奖了',
      //   onConfirm: () => {
      //     this.$dialog.hide()
      //   }
      // })
    },

    startLottery () {
      setTimeout(() => {
        // this.$toast.text('开始抽奖了')
        this.$dialog.alert({
          title: '温馨提示',
          message: '开始抽奖了',
          onConfirm: () => {
            this.$dialog.hide()
          }
        })
      }, 1000)
    },

    lotteryRenewal () {
      setTimeout(() => {
        this.eventDetect(this.startLottery)
        this.count--
      }, 1000)
    },

    restart () {
      if (!this.resetCover) return
      if (!this.count) {
        this.$dialog.alert({
          title: '温馨提示',
          message: '不好意思，您的次数已用完，请下次再来',
          onConfirm: () => {
            this.$dialog.hide()
          }
        })
      }

      this.count--

      this.resetCover(this.startLottery)
    }
  },

  mounted () {
    this.lotteryRenewal()
  }
}
</script>

<style scoped lang="scss">
.scratch {
  overflow-x: hidden;
}
pre {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5em;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
