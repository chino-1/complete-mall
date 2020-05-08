<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="goodsItem">
      <div class="item" v-for="(item, index) in goodsItem" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="cateImgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>
<script>
import GridView from '../../../components/common/gridView/GridView'
export default {
   name:'CateGoodsRight',
   components:{
      GridView
   },
  //  props:{
  //    goodsItem:{
  //      type:Object,
  //      default:()=>[]
  //    }
  //  }
  props:['goodsItem'],
  methods: {
    cateImgLoad(){
      this.$bus.$emit('cateImgLoad')
    }
  },
}
</script>
<style scoped>
.panel img {
    width: 100%;
  }
  .item {
    text-align: center;
    /* font-size: 12px; */
    font-size: 25px;
  }
  .item-img {
    width: 80%;
  }
  .item-text {
    margin-top: 15px;
  }
</style>
