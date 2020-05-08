<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsitem.title}}</p>
          <span class="price">{{goodsitem.price}}</span>
          <span class="collect">{{goodsitem.cfav}}</span>
      </div>
  </div>
</template>
<script>
export default {
   name:'GoodsListItem',
   props:{
       goodsitem:{
        type:Object,
        default(){
            return []
        }
       }
   },methods: {
       imageLoad(){
           if(this.$route.path.indexOf('/home')){  //使用判断方法，看是详情页发出的总线还是Home中，coderwhy用的mixin
                this.$bus.$emit('homeItemImgLoad')  // 绕的有点晕，干脆这里不用了，在detail里面防抖用一下
           }else if(this.$route.path.indexOf('/detail')){
                this.$bus.$emit('detailitemImgLoad') 
           }
           
       },
       itemClick(){
           this.$router.push('/detail/' + this.goodsitem.iid)
       }
   },computed: {
       showImage(){
           return this.goodsitem.image || this.goodsitem.show.img
       }
   },
}
</script>
<style scoped>
 .goods-item{
     padding-bottom: 40px;
     position: relative;
     width: 48%;
 }
 .goods-item img{
     width: 100%;
     border-radius: 5px;
 }
 .goods-info{
     /* font-size: 12px; */
     font-size: 20px;
     position: absolute;
     bottom: -3px;
     left: 0;
     right: 0;
     overflow: hidden;
     text-align: center;
 }
 .goods-info p {
     overflow: hidden;
     text-overflow: ellipsis; /* 超出文本省略 */
     white-space: nowrap;  /* 规定段落的文本不换行 */
     margin-bottom: 3px;
 }
 .goods-info .price{
     color: var(--color-high-text);
     margin-right: 20px;
 }
 .goods-info .collect{
     position: relative;
 }
 .goods-info .collect::before{
     content: '';
     position: absolute;
     left: -15px;
     /* top: -1px; */
     top: 3px;
     width: 14px;
     height: 14px;
     background: url("../../../assets/images/common/collect.svg") 0 0/14px 14px;
 }
</style>
