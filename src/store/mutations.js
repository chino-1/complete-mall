export default {
    //mutations目的就是修改state中的状态，所以其中的方法尽可能完成的事件比较单一，好追踪状态来维护
    addCounter(state,payload){
        payload.count++
    },addToCart(state,payload){
        payload.checked = true
        state.cartList.push(payload)
    }
}