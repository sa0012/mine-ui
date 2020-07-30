// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './responsive.js'
import Vue from 'vue'
import App from './App'
import router from './router'

import Demo from './routers/demo'
import DemoTitle from './routers/demoTitle'
import Mine from '../components/index'
import '../components/index.scss'

Vue.use(Mine)
Vue.component(Demo.name, Demo)
Vue.component(DemoTitle.name, DemoTitle)

if (process.env.NODE_ENV === 'production') {
  require('./touch-simulator.js')
}

const VConsole = require('vconsole')
// eslint-disable-next-line
new VConsole()

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
