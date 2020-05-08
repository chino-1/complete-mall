<template>
    <div id="category">
        <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
        <div class="content">
            <cate-goods-list :goodslist="goodslist" @selectItem="selectItem"
                ></cate-goods-list>
            <scroll :data="[goodsItem]" id="tab-content" ref="catescroll">
                    <cate-goods-right :goodsItem="showSubcategory" 
                    ></cate-goods-right>
            </scroll>
        </div>
    </div>
</template>
<script scoped>
import NavBar from '../../components/common/navbar/NavBar'
import CateGoodsList from './childComps/CateGoodsList'
import CateGoodsRight from './childComps/CateGoodsRight'
import Scroll from '../../components/common/Scroll/Scroll'

import {getCategory,getSubcategory} from "../../network/category"
import {debounce} from '../../common/utils'
export default {
    name:'category',
    components:{
        NavBar,
        CateGoodsList,
        CateGoodsRight,
        Scroll,
    },
    data() {
        return {
            currentIndex:-1,
            goodslist:[],
            goodsItem:{}
        }
    },methods: {
        getCategorydata(){
            getCategory().then(res => {
                console.log(res)
                this.goodslist = res.data.category.list
                for(let i=0;i<this.goodslist.length;i++){
                    this.goodsItem[i] = {
                    subcategories: {},
                    }
                }
                this._getSubcategories(0)
            })
        },
        selectItem(index){
            this._getSubcategories(index)
        },
        _getSubcategories(index){
            this.currentIndex = index;
            const mailKey = this.goodslist[index].maitKey
            getSubcategory(mailKey).then(res => {
              this.goodsItem[index].subcategories = res.data.list
              this.goodsItem = {...this.goodsItem}
            })
        },
    },created() {
        this.getCategorydata()
    },
    computed: {
        showSubcategory() {
		    if (this.currentIndex === -1) return {}
            return this.goodsItem[this.currentIndex].subcategories
      },
    },
    mounted() {
        const refresh = debounce(this.$refs.catescroll.refresh,50)
        this.$bus.$on('cateImgLoad',()=>{
            refresh()
        })
    },
}
</script>
<style scoped>
#category{
    height: 100vh;
    background-color:#F7F7F7;
    position: relative;
}
.content{
    position: absolute;
    left: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
}
.category-nav{
    background-color: var(--color-tint);
    color: #fff;
    z-index: 6;
}
#tab-content{
    height: 100%;
    flex:1;
}
</style>