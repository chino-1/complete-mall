<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
   name:'Scroll',
   props:{
     probeType:{
       type:Number,
       default:0
     },
     data: {
		    type: Array,
        default: () => {
          return []
        }
      },
     pullUpload:{
       type:Boolean,
       default:false
     }
   },
   data() {
     return {
       scroll:null
     }
   },
   mounted() {
     this.scroll = new BScroll(this.$refs.wrapper,{
       click:true,
       probeType:this.probeType,
       pullUpLoad:this.pullUpload
     })
     //监听滚动事件
     this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
     })
     //监听上拉事件
     this.scroll.on('pullingUp',()=>{
       this.$emit('pullingUp')
     })
   },methods: {
     scrollTo(x,y,time){
       this.scroll && this.scroll.scrollTo(x,y,time)
     },
     finishPullUp(){
       this.scroll && this.scroll.finishPullUp()
     },
     refresh(){
       this.scroll && this.scroll.refresh()
      //  console.log('111')
     },
    //  getScrollY(){
    //    return this.scroll ? this.scroll.y :0
    //  }
   },
}

</script>
<style scoped>

</style>
