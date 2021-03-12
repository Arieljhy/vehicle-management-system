import http from '../../request';

export default{
    //findCarCostList
    findCarCostList(data,success,fail) {
        http.get('/api/wuliu/findCarCostList',data,success,fail);
    },
    //展示菜单列表
    
    
}