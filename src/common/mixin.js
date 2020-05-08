import {debounce} from './utils'
import BackTop from '../components/content/backTop/BackTop'
export const itemListenerMinxin = {
    data() {
        return {
            itemImgListener:null,
            newRefresh:null
        }
    },mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () =>{
            this.newRefresh()
        }
        this.$bus.$on('detailitemImgLoad',this.itemImgListener) 
        //监听从GoodsListItem发出的只属于detail的事件detailitemImgLoad，coderwhy两个事件是一样的名字，在home中进入detail中时，将
        //原先的总线使用$off取消掉，但这里在GoodsListItem直接发出不同的事件名，各自监听各自的
        // console.log('混入的内容')
    },
}
//导出回到顶部,首页home未使用，之后使用只需三行代码 <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
// import {backTopMixin} from '../../common/mixin' 和 mixins:[backTopMixin],
export const backTopMixin = {
    components:{
        BackTop
    },data(){
        return {
            isShowBackTop:false
        }
    },methods: {
        backClick(){
            this.$refs.scroll.scrollTo(0,0,800)
        },
        listenShowBackTop(position){
            this.isShowBackTop = -position.y > 1000 //写死，超过一千显示，可更改
        }
   },
}