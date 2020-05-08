<template>
    <div>
        <swiper class="home-swiper">
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imageLoad">
                </a>
            </swiper-item>
       </swiper>
    </div>
</template>
<script>
import Swiper from '../../../components/common/swiper/Swiper.vue'
import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'
export default {
    name:"HomeSwiper",
    data() {
        return {
            isLoad:false //用于记录是否发送过emit（swiperImageLoad）了，只需要发送一次，是不同于debounce
        }
    },
    props:{
      banners:{
          type:Array,
          default(){
            return []
          }
      }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods: {
        imageLoad(){
            if(!this.isLoad){
               this.$emit('swiperImageLoad')
               this.isLoad=true
            }
        }
    },
}
</script>