import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/home/home.vue'
import Category from '../views/category/category.vue'
import Cart from '../views/cart/cart.vue'
import Profile from '../views/profile/profile.vue'
import Detail from '../views/detail/Detail.vue'
const routes = [
  {path:'/home',component:Home},
  {path:'/category',component:Category},
  {path:'/cart',component:Cart},
  {path:'/profile',component:Profile},
  {path:'/detail/:iid',component:Detail},
  {path:'',redirect:'/home'}
]
const router = new VueRouter({
    routes,
    mode:'history'
})
export default router