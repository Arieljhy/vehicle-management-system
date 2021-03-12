import http from '../../request';

export default{
    //findCarCostList
    findCarDateList(data,success,fail) {
        http.get('/api/wuliu/findCarDateList',data,success,fail);
    },
    //展示菜单列表
    
    
}