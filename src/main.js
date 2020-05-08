import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from './components/common/toast' 

Vue.prototype.$bus = new Vue() //总线

//安装在对应目录下写的弹窗toast插件，会去index.js中执行insta中的函数
Vue.use(toast)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
