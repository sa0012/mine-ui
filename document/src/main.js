import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as filter from './filter'

Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
