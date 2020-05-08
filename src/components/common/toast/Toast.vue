<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
   name:'Toast',
   data() {
       return {
           message:'',
           isShow:false
       }
   },methods: {
       show(message='默认文字',duration=2000){
          this.isShow = true
          this.message = message
          setTimeout( ()=>{
             this.isShow = false
             this.message = ''
          },duration)
       }
   },
}
</script>
<style scoped>
.toast{
    position: fixed;
    font-size: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    z-index: 99;
    color: #fff;
    background-color: rgba(0,0,0,.9);
}
</style>
