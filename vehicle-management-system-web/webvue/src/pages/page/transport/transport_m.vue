<template>
  
    <div class="management">
        <div class="container">
                
            <div class="title">
                货运明细
                <el-button class="add">添加<i class="iconfont icon-tianjia" style="font-size:10px;font-weight:600;margin-left:2px;"></i></el-button>
            </div>
      
            <div class="search-part">
                <el-form  label-width="100px" :model="searchdata">
                    
                            <el-form-item label="车牌号" >
                                <el-input v-model="searchdata.carNum"></el-input>
                            </el-form-item>
                            <el-form-item label="运输时间" >
                                <el-input v-model="searchdata.billDate"></el-input>
                            </el-form-item>
                        <el-form-item label="装货地" >
                                <el-input v-model="searchdata.loadingPlace"></el-input>
                            </el-form-item>
                                <el-form-item label="卸货地" >
                                <el-input v-model="searchdata.unloadingPlace"></el-input>
                            </el-form-item>

                    
                    
                        
                </el-form>

                <div class="rightbtn">
                    <el-button>搜索</el-button>
                        <el-button>重置</el-button>
                </div>
                
            </div>
            <div class="content">
                <el-table
                        ref="transporttable"
                        :data="transport_data"
                    
                        border
                        style="width: 100%">

                        <el-table-column
              
                        label="序号"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <div>
                                {{scope.$index+1}}
                            </div>
                            
                        </template>
                    </el-table-column>

                        <el-table-column
                        prop="carNum"
                        label="车牌号"
                    
                        align="center"
                        
                        
                        >
                        </el-table-column>
                        <el-table-column
                        prop="billDate"
                        label="运输时间"
                        width="120"
                        align="center"
                    >
                        </el-table-column>

                        <el-table-column
                        prop="loadingPlace"
                        label="装货地"
                        width="120"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="unloadingPlace"
                        label="卸货地"
                        width="120"
                        align="center"
                        >
                        </el-table-column>
                    
                        <el-table-column
                        prop="meters"
                        label="里程"
                        width="120"
                        align="center"
                        >
                        </el-table-column>

                        <el-table-column
                        prop="money"
                        label="运费(元)"
                        width="120"
                        align="center"
                        >
                        </el-table-column>

                        <el-table-column
                        prop="oil"
                        label="油耗（L）"
                        width="120"
                        align="center"
                        >
                        </el-table-column>

                        <el-table-column
                        prop="ratio"
                        label="比率(%)"
                        width="120"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="specs"
                        label="规格"
                        width="120"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="tonnage"
                        label="吨位（吨）"
                        width="120"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="unitPrice"
                        label="单价（元）"
                        width="120"
                        align="center"
                        >
                        </el-table-column>

                        
                        <el-table-column
                    
                        label="操作"
                        width="80"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-button class="sbtn" @click="detail(scope.row)">
                                查看
                            </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        

                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                
                    
                        layout=" prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                        <div class="tit">
                            共：<span>{{total}}</span>&nbsp;&nbsp;&nbsp;&nbsp;条  （10条/页）

                        </div>
                    </div>
            </div>


            <div class="footer">

                —— 我是有底线的 ——

            </div>

        </div>
        
    </div>
</template>
<script>

import transportApi from '@/api/transport/transport';
export default {
    data(){
        return{
            transport_data:[],
            searchdata:{
                carNum:'',
                billDate:'',
                loadingPlace:'',
                unloadingPlace:''
            },
            tableheight:'200',
            currentPage: 1,
            total:0
        }
    },
    created(){
        this.init();
        this.tableheight = window.innerHeight/10 * 9 - window.innerHeight/10 * 4.3 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - window.innerHeight/10 * 4.3 +'px'

    },
    watch:{
        transport_data(){
            this.tableheight = window.innerHeight/10 * 9 - window.innerHeight/10 * 4.3 +'px'
        }
    },
    methods:{
        init(){
            
            let data = {
               carNum:5555,
               startDate:'',  //'2020-11-01'
               endDate:'2020-12-31', //  2020-12-31
               limit:10,
               offset:1,
            //    loadingPlace:'巨野',
            //    unloadingPlace:'盒子222'
            }
            transportApi.findCarDateList(data,res=>{
                console.log("res transport",res);
                
                if(res.data.code == 0){
                    this.transport_data = res.data.data.rows;
                     this.total = res.data.data.total;
                    
                }
            })
        },
        detail(row){

        },
         handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
    
    
}
</script>
<style scoped lang="scss">
.management{
    width: 100%;
    height: 94vh;
    .container{
        width: 90%;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
       
        overflow-x: hidden;
        overflow-y: auto;
         height:92vh;
        padding: 1vh 5%;
        .title{

                width: 100%;
                padding: 1%;
                color:rgba(17, 24,49,1);
                font-weight: 600;
                position: relative;

                margin-bottom: 1vh;
                /deep/.el-button{
                    padding: 5px 10px;
                    position: absolute;
                    right: 2%;
                    border-color: rgba(17, 24,49,1);
                }
        }
        .search-part{
                width: 96%;
                border: 1px solid #eee;
                padding: 2%;
                margin-bottom: 15px;
            
                /deep/.el-form{
                    width: 100%;
                    
                    .con{
                        width: 100%;
                        display: flex;
                    }
                    .el-form-item{
                        width: 90%;
                        margin-bottom:0;
                        .el-form-item__content{
                        width:calc(100% - 100px);
                        .el-input{
                            .el-input__inner{
                                height: 30px;
                                line-height:30px ;
                            } 
                            .el-input__inner:focus {
                                border-color: rgba(17, 24,49,1);
                            }

                        }
                        }
                    }

                }
                .rightbtn{
                    width:90%;
                  
                    text-align: right;

                    padding-right: 10%;
                
                    .el-button{
                        padding:0px 10px;
                        background-color: rgba(17, 24,49,1);
                        color:#fff;
                        border-color:rgba(17, 24,49,1);
                        margin-top: 2px;
                        font-size: 10px;
                        height: 23px;
                    

                    }
                    .el-button:focus, .el-button:hover {
                        color: rgba(17, 24,49,1);
                        border-color:rgba(17, 24,49,1);
                        background-color: #ecf5ff;
                    }
                }
        }
        .content{
            /deep/ .el-table{
                display: flex;
                overflow-y:  auto !important;
                    .el-table__header-wrapper{
                        display: flex;
                        width: 120px !important;;
                         overflow:  hidden !important;
                        .el-table__header{
                           width: 120px !important;
                            overflow:  hidden !important;
                        }

                        table{
                             width: 120px !important;;
                            display: flex !important;
                                    flex-direction: row;
                                    overflow:  hidden !important;
                                    flex-wrap: wrap;

                            thead{
                                 width: 120px !important;;
                                color:rgba(17, 24,49,1);
                               display: flex !important;
                                    flex-direction: row;
                                    overflow:  hidden !important;
                                    flex-wrap: wrap;
                                tr {
                                    display: flex !important;
                                    flex-direction: row;
                                    overflow:  hidden !important;
                                    flex-wrap: wrap;
                                        width: 120px !important;;
                                     th{
                                         text-align: left;
                                         width: 120px !important;
                                        padding:11px 0 !important;
                                        background-color: #eee;
                                        border: 1px solid rgb(142, 144, 153) ;
                                    }
                                }

                            }

                        }

                        }
                        th.is-leaf{
                            color:rgba(17, 24,49,1);
                            padding:2px 0 !important;
                            background-color: #eee;
                        }
                        .sbtn{
                            border:none !important;
                            padding: 0;
                            color: #409eee;
                            font-size: 10px;
                        }
                        .sbtn:hover{
                    
                            color: rgba(17, 24,49,1);
                        
                        }

                        .el-table__body-wrapper{
                          
                            display: flex;
                            width: calc(100% - 34px);
                            overflow:  none !important;
                            .el-table__body{
                                 width:min-content !important; 
                                 display:inline-block;
                                tbody{
                                     width:min-content !important; 
                                    display: flex !important;
                                    tr{
                                        display: flex !important;
                                        flex-direction: row;
                            
                                        flex-wrap: wrap;
                                            width: 120px;
                                        td{
                                            text-align: left;
                                            width: 120px !important;
                                            height: 47px;
                                            padding:11px 0 !important;
                                            
                                        
                                        }
                                    }

                                }

                            }
                            
                        }
                    }
                    .pagination{
                            width: 100%;

                        
                            margin: 10px 0 20px 0;
                            /deep/.el-pagination{
                                text-align: right;
                                position: relative;
                                padding: 2px 0;
                                
                                span{
                                    font-size: 10px !important;
                                }
                                button{
                                    padding: 0 2px;
                                    min-width:25px;
                                
                                    
                                    border-radius: 4px;
                                    margin: auto;
                                }
                                .el-pager{
                                    li{
                                        min-width: 32px;
                                    }
                                
                                
                                }
                                .el-pagination__jump{
                                    margin-left: 2%;


                                    position: absolute;
                                    right: 2%;
                                    bottom: -30px;
                                }

                            }

                            .tit{
                                font-size: 10px;
                                height: 32px;
                                line-height: 32px;
                                padding-left: 2%;
                            }
                        
                    }
                
        }
        .footer{
            width: 100%;
            height:3vh;
            line-height: 3vh;
            font-size: 12px;
            text-align: center;
            color: rgb(204, 200, 200);
            
        }
    
    
    }

}


</style>