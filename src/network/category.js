import {request} from './request'
export function getCategory(){
  return request({
      url:''
  })
}
export function getSubcategory(maitKey){
  return request({
    url:'',
    params:{
      maitKey
    }
  })
}
export function getCategoryDetail(miniWallkey,type){
  return request({
    url:'',
    params:{
      miniWallkey,
      type
    }
  })
}