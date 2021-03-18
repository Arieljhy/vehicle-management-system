import http from '../../request';

export default{
    //findCarCostList
    findCarDateList(data,success,fail) {
        http.get('/api/wuliu/findCarDateList',data,success,fail);
    },
    //新增车辆明细接口
    
    saveOrUpdateCarData(data,success,fail) {
        http.postBody('/api/wuliu/saveOrUpdateCarData',data,success,fail);
    },
    ///wuliu/delCarDate/7  删除
    delCarDate(data,success,fail) {
        http.delete('/api/wuliu/delCarDate',data,success,fail);
    },
    ///excel/excelExport
    excelExport(data,success,fail) {
        http.getexcel('/api/excel/excelExport',data,success,fail);
    },

    
    
}