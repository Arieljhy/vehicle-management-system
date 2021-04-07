import router from './router';
import {Message} from "element-ui";
import userApi from '@/api/user/user'
router.beforeEach((to, from, next) => {
var url = window.location.href;


  var jwttoken = getCookie("jwttoken");
  if (to.matched.some(record => record.meta.requireAuth)){
 
  if(jwttoken == null&&to.path=='/login'){
    setCookie("jwttoken",-1);
    next('/login');
  } 
  if(jwttoken == null&&to.path=='/login_m'){
    setCookie("jwttoken",-1);
    next('/login_m');
  }
  
  if(jwttoken == -1&&to.path=='/login'){
    setCookie("jwttoken",0);
    next();
  } 
  if(jwttoken == -1&&to.path=='/login_m'){
    setCookie("jwttoken",0);
      next();
  }
  if(jwttoken == 0){

    next();
  }

  if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
  
 
     if(to.path=='/login'){
      
        next('/home');
     }
     else if(to.path=='/login_m'){
        next('/home_m');
     }
     else{
     
        next();  
      
     }
  }
}
})

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

