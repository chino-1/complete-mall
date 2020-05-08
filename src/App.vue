<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTarBar from './components/content/mainTabbar/MainTabbar.vue'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },components:{
    'main-tab-bar':MainTarBar
  }
}
</script>

<style lang="scss">
 @import "assets/css/base.css"
</style>
