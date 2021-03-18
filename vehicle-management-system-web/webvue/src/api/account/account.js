import http from '../../request';

export default{
    //findCarCostList
    findCarCostList(data,success,fail) {
        http.get('/api/wuliu/findCarCostList',data,success,fail);
    },
    //展示菜单列表
    ///wuliu/delCarCostDate
    delCarCostDate(data,success,fail) {
        http.delete('/api/wuliu/delCarCostDate',data,success,fail);
    },
    ///excel/excelExport2
    excelExport(data,success,fail) {
        http.getexcel('/api/excel/excelExport2',data,success,fail);
    },
    
}