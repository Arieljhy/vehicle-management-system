import http from '../../request';

export default{
    //登录
    login(data,success,fail) {
        http.postBody('/api/login',data,success,fail);
    },
    //展示菜单列表
    listmenu(data,success,fail){
    
        http.get("/api/sys/menu/list",data,success,fail);
    }
    
}