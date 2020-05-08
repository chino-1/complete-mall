<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
    name:"Cart",
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        ...mapGetters({
            length:'cartLength',   //vuex提供的将getters中方法直接转化为计算属性的mapGetters，这是写法2重命名
        })
    },
}
</script>
<style scoped>
.cart{
    height: 100vh;
}
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
}    
</style>