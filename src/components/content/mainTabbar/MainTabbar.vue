<template>
    <div>
      <div id="tab-bar">
        <tab-bar-item path="/home">
            <img slot="item-icon" src="../../../assets/images/tabbar/home.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/images/tabbar/home_active.svg" alt="">
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category">
            <img slot="item-icon" src="../../../assets/images/tabbar/category.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/images/tabbar/category_active.svg" alt="">
            <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart">
            <img slot="item-icon" src="../../../assets/images/tabbar/shopcart.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/images/tabbar/shopcart_active.svg" alt="">
            <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile">
            <img slot="item-icon" src="../../../assets/images/tabbar/profile.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/images/tabbar/profile_active.svg" alt="">
            <div slot="item-text">我的</div>
        </tab-bar-item>
      </div>
    </div>
</template>
<script>
import TabbarItem from '../../common/tabbar/Tabbaritem.vue'
export default {
    name:'MainTabbar',
    components:{
    'tab-bar-item':TabbarItem
  }
}
</script>
<style lang="scss">
    @import "../../../assets/css/deepstyle.css"
</style>