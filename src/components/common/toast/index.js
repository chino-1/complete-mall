//创建toast插件
import Toast from './Toast'
const obj = {}

obj.install = function(Vue){
    //创建组件构造器
    const toastConstructor = Vue.extend(Toast)
    //根据组件构造器，用new的方式创建一个组件对象
    const toast = new toastConstructor()
    //将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
}
export default obj
//这样定义插件，可以在任何组件使用时只要调用 $toast.show传入想要显示的文字和停留时间就可以了,在CartBottomBar中这样使用了