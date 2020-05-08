<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsitem="item"></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
   name:'GoodsList',
   components:{
       GoodsListItem
   },
   props:{
       goods:{
           type:Array,
           dafault(){
               return []
           }
       }
   }
}
</script>
<style scoped>
 .goods{
     display: flex;
     flex-wrap: wrap;
     justify-content: space-evenly;
     /* justify-content: space-around; */
 }
</style>
