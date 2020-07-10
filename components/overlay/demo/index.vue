<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell title="显示弹层" value="显示" @click="showOverlay('show1')" />
    <ml-cell title="显示内容 " value="显示" @click="showOverlay('show2')" />
    <ml-overlay
      :show="show1"
      @click="show1 = false"
    />
    <ml-overlay
      :show="show2"
      @click="show2 = false"
    >
      <div class="overlay-content">这是内容区域</div>
    </ml-overlay>

    <demo-title>flex测试</demo-title>
    <div class="wrapper">
      <ul class="father" v-for="item in 5" :key="item">
        <li class="father-row">
          <div class="title">测试数据{{ index }}</div>
          <div class="row" v-for="child in 3" :key="child">
            <span
              v-for="data in child"
              :key="data"
              :class="{
                'border': data !== child
              }"
            >
              子列数据{{data}}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <demo-title>table布局</demo-title>
    <section class="table-wrapper">
      <table width="100%" cellpadding="5" style="border-collapse:collapse;">
        <thead>
          <tr>
            <th>增值包</th>
            <th>权益名称</th>
            <th>权益次数</th>
            <th>权益有效期</th>
          </tr>
        </thead>
        <tbody v-for="(bItem, bIndex) in couponList" :key="bIndex">
          <tr
            v-for="(cItem, cIndex) in bItem.coupon"
            :key="cIndex"
          >
            <td :rowspan="bItem.coupon.length" v-if="cIndex === 0">{{ couponList[bIndex].package }}</td>
            <td>
              <div
              >
                {{cItem.name}}
              </div>
            </td>
            <td>
              <div
              >
                {{cItem.time}}
              </div>
            </td>
            <td>
              <div
              >
                {{cItem.validity}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'demo-overlay',

  data () {
    return {
      show1: false,
      show2: false,
      couponList: [
        { 
          package:'111',
          coupon: [
            {
              name: '111-1',
              time: 1111,
              validity: '2011-11-11'
            },{
              name: '111-2',
              time: 2222,
              validity: '2012-12-12'
            }
          ]
        }, {
          package: '222',
          coupon: [
            {
              name: '222-1',
              time: 1111,
              validity: '2011-11-11'
            }
          ]
        }, {
          package: '333',
          coupon: [
            {
              name: '333-1',
              time: 1111,
              validity: '2011-11-11'
            }, {
              name: '333-2',
              time: 1111,
              validity: '2011-11-11'
            }, {
              name: '333-3',
              time: 1111,
              validity: '2011-11-11'
            },
          ]
        }, {
          package: '444',
          coupon: [
            {
              name: '444-1',
              time: 1111,
              validity: '2011-11-11'
            }, {
              name: '444-2',
              time: 1111,
              validity: '2011-11-11'
            }, {
              name: '444-3',
              time: 1111,
              validity: '2011-11-11'
            }, {
              name: '444-4',
              time: 1111,
              validity: '2011-11-11'
            },
          ]
        }
      ]
    }
  },

  computed: {
    keys () {
      return this.couponList.map(item => item.package)
    }
  },

  methods: {
    showOverlay (type) {
      console.log(type, 'type')
      this[type] = true
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  background: #fff;
  &-content {
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
    line-height: 120px;
    transform: translate3d(-50%, -50%, 0);
    width: 80%;
    height: 120px;
    background-color: #fff;
  }
}

.wrapper {
  padding: 16px;
  box-sizing: border-box;
}
.father {
  box-sizing: border-box;

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
  &-row {
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    // stretch让盒子内的每个元素的高度都等于行高
    align-items: stretch; 
  }

  .title {
    padding: 10px;
    border-left: 1px solid #ccc;
    display: flex;
    align-items: center;
  }

  .row {
    flex: 1;
    border-left: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;

      &.border {
        border-bottom: 1px solid #ccc;
      }
    }

    &:last-child {
      border-right: 1px solid #ccc;
    }
  }
}

.table-wrapper {
  padding: 16px;
  box-sizing: border-box;
}

table {
  border: 1px solid #f4f4f4;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border-spacing: 0;
  border-collapse: collapse;
  background: #fff;
  table-layout: fixed;

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;

    th {
      white-space: nowrap;
      vertical-align: middle!important;
      text-align: left;
      border: 1px solid #f4f4f4;
      padding: 8px;
      line-height: 1.5;
      background: #ececec;
    }

    td {
      border: 1px solid #f4f4f4;
      line-height: 1.5;
      word-wrap: break-word;

      div {
        padding: 8px;
        &.border {
          border-bottom: 1px solid #f4f4f4;
        }
      }
    }
  }
}
</style>
