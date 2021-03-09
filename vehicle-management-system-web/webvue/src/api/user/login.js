import http from '../../request';

export default{
    //登录
    login(data,success,fail) {
        http.postBody('/api/login',data,success,fail);
    }
    
}