import axios from 'axios';
import {Loading,Message} from 'element-ui';

axios.defaults.headers.post['Content-Type']= "application/x-www-form-urlencoded";
let loading;

function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'loading...',
        target:document.querySelector(".loading-area")
    })

}

function endLoading(){
    loading.close();
}

let needLoadingRequestCount = 0;

export function showFullScreenLoading(){
    if(needLoadingRequestCount = 0){
        startLoading();
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading(){
    if(needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if(needLoadingRequestCount === 0)
    {
        endLoading();
    }
   
}

//请求前兰姐饿
axios.interceptors.request.use(
    config =>{
        showFullScreenLoading();
        return config;
    },
    error =>{
        console.warn(error);
        tryHideFullScreenLoading();
        return Promise.reject("请求数据失败！")
    }
)
//设置 response 统一处理
axios.interceptors.response.use(
   
    response=>{
        console.log("response",response);
    
        //tryHideFullScreenLoading();
       
        if(response.status === 200){
            debugger;
            return Promise.resolve(response);
        }else{
            location.href='/';
            return Promise.reject(response.data);
        }

    },
    error=>{
        tryHideFullScreenLoading();
        switch (error.response.status){
            case 403:
                window.location.href = "http://www.baidu.com"
                return;
            case 404:
                return Promise.reject("404接口不存在")
            case  500:
                return Promise.reject("服务器出错，请稍后重试")
            default:
                return Promise.reject(error.response.status)

        }
    }
)

export default {
    /**
     * 发送post请求
     * @param {string} url 地址
     * @param {object} data 请求数据
     * @param {Function} done 成功回调
     * @param {Function} fail 失败回调（可选）
     * **/
    post(url,data,done,fail){
        return axios({
            method:"post",
            url,
            data:data,
            headers:{
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                    Message.error({
                        message:error
                    })
                }
            }
        )
    },
    postBody(url,data,done,fail){
        return axios.post(
            url,
            data
        ).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                   
                }
            }
        )
    }
    ,
    get(url,...options){
        let params,done,fail;
        if(typeof options[0] == 'object'){
            params = options[0];
            done = options[1];
            fail = options[2];
        }else{
            params ={};
            done = options[1];
            fail = options[2];
        }
        return axios({
            method:'get',
            url,
            params,
            headers:{
                "X-Requested-With":"XMLHttpRequest"
            }

        }).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                    Message.error({
                        message:error
                    })
                }
            }
        )
    }
}