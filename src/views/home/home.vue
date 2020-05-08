<template>
    <div id="home">
       <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar> 
       <tab-control :titles="['流行','新款','精选']" @tabclick="tabclick" ref="tabControl1"
       class="tab-control" v-show="isTabfixed"
       ></tab-control>
       <scroll class="content" ref="toscroll" :probe-type="3" @scroll="contentScroll" 
       :pull-upload="true" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" @tabclick="tabclick" ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
       </scroll>
       <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
//业务相关组件引入
import HomeSwiper from './childcomps/homeswiper'
import RecommendView from './childcomps/RecommendView'
import FeatureView from './childcomps/FeatureView'

//公共组件引入
import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/Scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

import {getHomeMultdata,getHomeGoods} from "../../network/home"
import {debounce} from '../../common/utils'
export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            taboffsetTop:0,
            isTabfixed:false,
            saveY:0
        }
    },
    computed: {
        showGoods(){
           return this.goods[this.currentType].list
        }
    },
    created() {
        //请求轮播图等上面的数据
        this.getHomedata();
        //请求下面的商品
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        const refresh = debounce(this.$refs.toscroll.refresh,50)
        this.$bus.$on('homeItemImageLoad',()=>{
            refresh()
        })
    },
    //下面activated，deactivated没有解决切换路由的同时还切换流行，新品，精选这个问题，如果不切换流行，
    //精选这些倒还是可以保存之前浏览位置
    deactivated() {
        this.saveY = this.$refs.toscroll.scroll.y
    },
    activated() {
        this.$refs.toscroll.refresh()
        this.$refs.toscroll.scrollTo(0,this.saveY)
    },
    methods: {
        tabclick(index){
           switch (index) {
               case 0:
                 this.currentType='pop'
                 break;
               case 1:
                 this.currentType='new'
                 break;
               case 2:
                 this.currentType='sell'
                 break;
           }
           this.$refs.tabControl1.currentIndex = index  //因为有两个tabcontrol，当点击时要记录显红的是流行，
           this.$refs.tabControl2.currentIndex = index  //新款还是精选
        },
        backClick(){
           this.$refs.toscroll.scrollTo(0,0,800) //home中回到顶部没有使用mixin，详情页使用了，留着原始方法当做参考
        },
        contentScroll(position){
            //判断BcakTop是否显示
           this.isShowBackTop = (-position.y) > 1000
           //判断tabcontrol是否吸顶
           this.isTabfixed = (-position.y) > this.taboffsetTop
        },
        loadMore(){
            this.getHomeGoods(this.currentType)
            this.$refs.toscroll.refresh()
        },
        swiperLoad(){
            //获取tabcontrol的offsetTop
            this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        //下面两个请求数据的方法
        getHomedata(){
          getHomeMultdata().then(res =>{
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
        },
        getHomeGoods(type){
            const page =this.goods[type].page + 1
            getHomeGoods(type,page).then(res =>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page +=1
                this.$refs.toscroll.finishPullUp()
            })
        }
    },
}
</script>
<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .tab-control{
        position: relative;
        z-index: 6;
    }
   .home-nav{
       background-color: var(--color-tint);
       color: #fff;
       /* position: fixed;
        left: 0;
        right: 0;  我们使用的是betterscroll，在指定高度区域滚动，所以顶部不需要fixed了
        top: 0;
        z-index: 5; */
   }
   .content{
       overflow: hidden;
       position: absolute;
       top: 44px;
       bottom: 49px;
       left: 0;   
       right: 0;
   }
   /* .content{
       height: calc(100% - 93px);  calc括号中间必须有空格 
       overflow: hidden;    这里是计算，上面是定位 反正都要给一个高度来使用better-scroll
       margin-top: 44px;
   } */
</style>