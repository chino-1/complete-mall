<template>
    <scroll id="tab-menu">
        <div v-for="(item,index) in goodslist" class="goods" 
        :class="{active:index === currentIndex}"
        @click="goodsClick(index)">
        {{item.title}}</div>
    </scroll>
</template>
<script>
import Scroll from '../../../components/common/Scroll/Scroll'
export default {
   name:'CateGoodsList',
   data() {
       return {
           currentIndex:0,
       }
   },
   components:{
       Scroll,
   },
   props:{
       goodslist:{
           type:Array,
           default(){
               return []
           }
       }
   },methods: {
       goodsClick(index){
           this.currentIndex = index
           this.$emit('selectItem',index)
       }
   },
}
</script>
<style scoped>
#tab-menu{
    height: 100%;
    width: 200px;
    box-sizing: border-box;
    
}
/* .cateGoods{
    width: 200px;
    height: 100%;
    overflow: hidden;
} */
.goods{
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    line-height: 120px;
}
.active{
    color: var(--color-high-text);
    background-color: #fff;
}
</style>
