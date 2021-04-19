import axios from 'axios';
import {Loading,Message} from 'element-ui';
import Vue from 'vue'
import {Upload,Button,Progress,Dialog} from 'element-ui';
    Vue.use(Upload);
 
    Vue.use(Progress);
    Vue.use(Dialog);
 


axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type']= "application/x-www-form-urlencoded";
let loading;

export function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'加载中...',
        target:document.querySelector(".loading-area"),
        background:'rgba(255,255,255,0.7)'
    });

}

export function endLoading(){


    loading.close();

   
}

let needLoadingRequestCount = 0;

export function showFullScreenLoading(){
    if(needLoadingRequestCount == 0){
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
    
        tryHideFullScreenLoading();
       
        if(response.status === 200){
            if(response.data.code==101){  //没有token或token已过期，请重新登录
                Message.warning(response.data.msg);
                setTimeout(()=>{
                    let url = window.location.href;
              
                    setCookie('jwttoken',0);
                    if(url.split('/#/')[0].indexOf('_')!=-1){
                        
                        window.location.href =`${url.split('/#/')[0]}/#/login_m`
                    }else{
                        window.location.href =`${url.split('/#/')[0]}/#/login`

                    }

                },200)
                
            }
        
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
                Message.warning('无权限');
                setTimeout(()=>{
                    let url = window.location.href;
              
                    setCookie('jwttoken',0);
                    if(url.split('/#/')[0].indexOf('_')!=-1){
                        
                        window.location.href =`${url.split('/#/')[0]}/#/login_m`
                    }else{
                        window.location.href =`${url.split('/#/')[0]}/#/login`

                    }

                },200)
               
               
            case 404:
                return Promise.reject("404接口不存在")
            case  500:
                return Promise.resolve(error.response)
            default:
                return Promise.reject(error.response.status)

        }
    }
)
export function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*30);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

export default {
    /**
     * 发送post请求
     * @param {string} url 地址
     * @param {object} data 请求数据
     * @param {Function} done 成功回调
     * @param {Function} fail 失败回调（可选）
     * **/
    post(url,data,done,fail){
        let jwttoken = getCookie("jwttoken");
        let sheader = '';
        if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
             sheader = jwttoken;
        }
     
  

        return axios({
            method:"post",
            url,
            data:data,
            headers:sheader.length!=0?{
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                "jwttoken":sheader
            }:{
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                    // Message.error({
                    //     message:error
                    // })
                }
            }
        )
    },
    postBody(url,data,done,fail){
        let jwttoken = getCookie("jwttoken");
        let sheader = '';
        if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
             sheader = jwttoken;
             
        }
  
       

        return axios.post(
            url,
            data,
            {
                headers: 
                {"jwttoken":sheader.length!=0?sheader:''}
            }
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
        let jwttoken = getCookie("jwttoken");
        let sheader = '';
     
     
        if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
             sheader = jwttoken;
        }

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
            headers:sheader.length!=0?{
                "X-Requested-With":"XMLHttpRequest",
                "jwttoken":sheader
            }:{
                "X-Requested-With":"XMLHttpRequest"
            }
            

        }).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                    // Message.error({
                    //     message:error
                    // })
                }
            }
        )
    },
    importexcel(url,config,data,done,fail){
    let jwttoken = getCookie("jwttoken");
    let sheader = '';
    if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
         sheader = jwttoken;
         
    }
    return axios.post(
        url,
        data,
        config,
    ).then(data=>done(data)).catch(
        error=>{
         
            if(fail){
                fail(error);
            }else{

               
            }
        }
    )
},
    getexcel(url,...options){
        let jwttoken = getCookie("jwttoken");
        let sheader = '';
     
     
        if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
             sheader = jwttoken;
        }

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
            responseType: 'blob',
            headers:sheader.length!=0?{
                "X-Requested-With":"XMLHttpRequest",
                "jwttoken":sheader
            }:{
                "X-Requested-With":"XMLHttpRequest"
            }
            

        }).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                    // Message.error({
                    //     message:error
                    // })
                }
            }
        )
    },
    delete(urll,data,done,fail){
        let jwttoken = getCookie("jwttoken");
        let sheader = '';
        if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
             sheader = jwttoken;
             
        }
  
       let url = urll+'/'+data.id;

        return axios.delete( 
            url,
            {
                headers: 
                {"jwttoken":sheader.length!=0?sheader:''}
            }
        ).then(data=>done(data)).catch(
            error=>{
                if(fail){
                    fail(error);
                }else{
                   
                }
            }
        )

    }
}