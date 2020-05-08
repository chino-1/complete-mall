<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item" >
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div class="word">{{item.title}}</div>
          </a>
      </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
      recommends:{
         type:Array,
         default(){
          return []
      }
      }
    },
    methods: {
        
    },
}
</script>
<style scoped>
  .recommend{
      display: flex;
      width: 100%;
      text-align: center;
      /* font-size: 12px; */
      padding: 10px 0 20px;
      border-bottom: 8px solid #eee;
  }
  .recommend-item{
      flex:1;
  }
  .recommend-item img{
      width: 150px;
      height: 150px;
      margin-bottom: 10px;
  }
  .word{
      font-size: 20px;
  }
</style>