import axios from 'axios'
export function request(config){
    const instance =  axios.create({
        // baseURL:'http://123.207.32.32:8000',
        //接口更改，可添加coderwhy微信
        timeout:5000
    })

    //axios拦截器
    instance.interceptors.request.use(config =>{
       return config
    },err =>{
        
    })
    instance.interceptors.response.use(res =>{
        return res.data
    },err =>{
        console.log(err)
    })
    
    return instance(config)
}