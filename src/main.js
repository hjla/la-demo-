// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar,Tabbar, TabbarItem,Swipe, SwipeItem,Card,Button  } from 'vant'
import axios from 'axios'
import moment from 'moment'
axios.defaults.baseURL='http://127.0.0.1:5000'
Vue.prototype.$http=axios
Vue.use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Card).use(Button);
Vue.config.productionTip = false

Vue.filter('timefmt',(datastr,reg="YYYY-MM-DD HH:mm:ss")=>{
  return moment(datastr).format(reg)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
