<template>
    <div class="tab-bar-item" @click="itemclick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="ActiveStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,
        ActiveColor:{
            type:String,
            default:'red'
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        isActive(){
           return this.$route.path.indexOf(this.path)!== -1
        },ActiveStyle(){
            return this.isActive?{color:this.ActiveColor}:{}
        }
    },
    methods: {
        itemclick(){
            this.$router.replace(this.path)
        }
    },
}
</script>
<style scoped>
    
</style>