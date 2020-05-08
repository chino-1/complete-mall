import {request} from "./request"

export function getHomeMultdata(){
    return request({
         url:'/home/multidata'
    })
}
export function getHomeGoods(type, page) {
    return request({
      url:'',
      params:{
        type,
        page
      }
    });
  }