<template>
  <div class="cart-list">
    <scroll class="content" ref="newscroll">
      <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Scroll from '../../../components/common/Scroll/Scroll'
import CartListItem from './CartListItem'
export default {
   name:'CartList',
   computed: {
       ...mapGetters(['cartList'])
   },
   components:{
       Scroll,
       CartListItem
   },
   activated() {
       this.$refs.newscroll.refresh()
   },
}
</script>
<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>
