<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <span :style="{fontSize:'30px'}">精品推荐</span>
        <goods-list :goods="recommends" ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '../../components/common/Scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'

import {getDeatail,getRecommend,Goods,Shop,GoodsParam} from '../../network/detail'
import {itemListenerMinxin,backTopMixin} from '../../common/mixin'
import { debounce } from '../../common/utils'
import {mapActions} from 'vuex'
export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
    },
    mixins:[itemListenerMinxin,backTopMixin],
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopY:[],
            getThemeTopY:null,
            currentIndex:0,
        }
    },
    created() {
        //1.保存传入的iid
       this.iid = this.$route.params.iid
       //2.请求详情数据
       getDeatail(this.iid).then( res=>{
         const data = res.result
         //获取顶部轮播图
         this.topImages = data.itemInfo.topImages
         //获取商品信息
         this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
         //店铺信息
         this.shop = new Shop(data.shopInfo)
         //商品详情数据
         this.detailInfo = data.detailInfo
         //获取参数信息
         this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
         //获取评论信息
         this.commentInfo = data.rate.list[0]
       })
       //3.请求推荐数据
       getRecommend().then(res =>{
           this.recommends = res.data.list
       })
       //4.给getThemeTop赋值并给themeTopY防抖
       this.getThemeTopY = debounce(()=>{
        //    this.themeTopY = []
           this.themeTopY.push(0)
           this.themeTopY.push(this.$refs.params.$el.offsetTop-44)
           this.themeTopY.push(this.$refs.comment.$el.offsetTop-44)
           this.themeTopY.push(this.$refs.recommend.$el.offsetTop-44)
           //加入一个最大的值，这样下面的判断条件就可以都是两个数之间，而避免各种复杂判断影响性能，最大值虽然耗空间但这可以空间换时间
           this.themeTopY.push(Number.MAX_VALUE)
       },100)
   },methods: {
       ...mapActions(['addCart']),
        imageLoad(){
            // this.$refs.scroll.refresh()
            this.newRefresh() //使用混入的方法，在home没用，在这里用了
            //在图片加载完后获取offsetTop，来得到准确的滚动高度
            this.getThemeTopY()
        },
        titleClick(index){
            //点击标题进行滚动到对应区域
            this.$refs.scroll.scrollTo(0,-this.themeTopY[index],200)
        },
        contentScroll(position){
            const positionY = -position.y
            let length = this.themeTopY.length
            for(let i=0;i<length-1;i++){
                if(this.currentIndex !==i && (positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1])){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            this.listenShowBackTop(position)
        },
        addToCart(){
            //获取购物车要展示的信息
            const Product = {}
            Product.image = this.topImages[0];
            Product.title = this.goods.title;
            Product.desc = this.goods.desc;
            Product.price = this.goods.realPrice;
            Product.iid = this.iid;
            //使用了mapActions方法，将Actions中的addCart转变为此组件中的methods方法，下面那种是直接调用promise而不使用mapActions
            this.addCart(Product).then(res => {  
                // console.log(res)
                this.$toast.show(res,2000)
            })
            // this.$store.dispatch('addCart',Product).then(res => {
            //     console.log(res)
            // })
        }
    },
}
</script>
<style scoped>
 #detail{
     position: relative;
     z-index: 7;
     background-color: #fff;
     height: 100vh;
 }
 .detail-nav{
     position: relative;
     z-index: 7;
     background-color: #fff;
 }
 .content{
     height: calc(100% - 44px - 60px); /* coderwhy后面减49px,这里减60才显得底部没有挡住推荐的商品文字 */
 }
</style>
