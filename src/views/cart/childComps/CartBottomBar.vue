<template>
  <div class="bottom-bar">
     <div class="check-content">
         <check-button class="check-botton" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
         <span>全选</span>
     </div>
     <div class="price">
         合计:{{totolPrice}}
     </div>
     <div class="calculate" @click="calcClick">
         去计算({{checkLength}})
     </div>
  </div>
</template>
<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
   name:'CartBottomBar',
   components:{
       CheckButton
   },computed: {
       ...mapGetters(['cartList','cartLength']),
       //计算总价格
       totolPrice(){
           return '￥' + this.cartList.filter(item =>{
               return item.checked
           }).reduce((preValue,item) => {
               return preValue + item.price * item.count
           },0).toFixed(2)
       },
       //计算要结算的商品数量
       checkLength(){
           return this.cartList.filter(item => item.checked).length
       },
       //判断是否要全选
       isSelectAll(){
            if(this.cartList.length === 0)return false
            // if(this.cartLength === this.cartList.filter(item => item.checked).length){
            //     return true   想法一，是自己的思路，看前面顶部栏有一个购物车所有内容长度，这里又有一个checked长度，
            // }else{            二者相等，说明处于全选状态，返回true
            //     return false
            // }
            return !this.cartList.find(item => !item.checked)  //方法二
       }
   },methods: {
       checkClick(){
           if(this.isSelectAll){
               this.cartList.forEach(item => item.checked = false)
           }else{this.cartList.forEach(item => item.checked = true)}
       },
       calcClick(){
           if(!this.isSelectAll){
               this.$toast.show('购物车为空！',2000)
           }
       }
   },
}
</script>
<style scoped>
.bottom-bar{
    height: 40px;
    position: relative;
    display: flex;
    line-height: 40px;
    font-size: 20px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
}
.check-botton{
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.price{
    margin-left: 20px;
    font-weight: 800;
    flex:1;
}
.calculate{
    width: 120px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
}
</style>
