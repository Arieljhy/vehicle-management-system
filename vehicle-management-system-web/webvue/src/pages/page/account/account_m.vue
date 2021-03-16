<template>
  
    <div class="management">
        <div class="container">
               
       <div class="title">
            账单管理
        </div>
      
       <div class="search-part">
           <el-form  label-width="100px" :model="searchdata">
          
                    <el-form-item label="车牌号" >
                        <el-input v-model="searchdata.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="月份" >
                        <el-input v-model="searchdata.monthDate"></el-input>
                    </el-form-item>

          
              
                
           </el-form>

           <div class="rightbtn">
               <el-button>搜索</el-button>
                <el-button>重置</el-button>
           </div>
           
       </div>
       <div class="content">
           <el-table
                :data="account_data"
               
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
                prop="monthDate"
                label="月份"
                 width="120"
                align="center"
             >
                </el-table-column>
                <el-table-column
                prop="oilPrice"
                label="油价（元）"
                 width="120"
                align="center">
                </el-table-column>
                <el-table-column
                prop="oilTotal"
                label="总油耗（L）"
                 width="120"
                align="center">
                </el-table-column>

                <el-table-column
                prop="oilTotalPrice"
                label="总油费（元）"
                 width="120"
                align="center">
                </el-table-column>

                <el-table-column
                prop="profit"
                label="profit"
                 width="120"
                align="center">
                </el-table-column>

                 <el-table-column
               
                    label="修理信息"
                     width="120"
                align="center">
                    <template slot-scope="scope">
                    <div class="cont">
                         <div class="item">
                            
                            <div class="r">{{scope.row.repairOneRemark}}({{scope.row.repairOnePrice}}元)</div>
                            
                        </div>

                         <div class="item">
              
                            <div class="r">{{scope.row.repairTwoRemark}}({{scope.row.repairTwoPrice}}元)</div>
                            
                        </div>

                         <div class="item">
                     
                            <div class="r">{{scope.row.repairThreeRemark}}({{scope.row.repairThreePrice}}元)</div>
                            
                        </div>

                         <div class="item">
                         
                            <div class="r">{{scope.row.repairFourRemark}}({{scope.row.repairFourPrice}}元)</div>
                            
                        </div>

                        <div class="item"> 
                          
                            <div class="r">{{scope.row.repairFiveRemark}}({{scope.row.repairFivePrice}}元)</div>
                            
                        </div>
                       
                    </div>

                    </template>
                </el-table-column>

                
                <el-table-column
                prop="salary"
                label="工资（千元）"
                 width="120"
                align="center">
                </el-table-column>
                 <el-table-column
                prop="totalCost"
                label="总花费"
                 width="120"
                align="center">
                </el-table-column>
                 <el-table-column
                prop="totalXiuche"
                label="总修理费（元）"
                 width="120"
                align="center">
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
import accountApi from '@/api/account/account';
export default {
    data(){
        return{
            account_data:[],
            searchdata:{
                carNum:'',
                monthDate:'',
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
         this.tableheight = window.innerHeight/10 * 9 - window.innerHeight/10 * 3.3 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - window.innerHeight/10 * 3.3 +'px'

    }, 
    watch:{
        account_data(){
             this.tableheight = window.innerHeight/10 * 9 - window.innerHeight/10 * 3.3 +'px'
        }
    },
    methods:{
        init(){
            let data = {
                carNum:5555,
                startDate:'2020-11-01',
                endDate:'2020-12-31'
            }
            accountApi.findCarCostList(data,res=>{
                console.log("res account",res);
                if(res.data.code == 0){
                     this.total = res.data.data.total;
                    this.account_data = res.data.data.rows;
                }
            })
        }
        ,
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
                margin-bottom: 1vh;
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
                        margin-top: 1vh;
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
                        width: 170px !important;;
                         overflow:  hidden !important;
                        .el-table__header{
                           width: 170px !important;
                            overflow:  hidden !important;
                        }

                        table{
                             width: 170px !important;;
                            display: flex !important;
                                    flex-direction: row;
                                    overflow:  hidden !important;
                                    flex-wrap: wrap;

                            thead{
                                 width: 170px !important;;
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
                                        width: 170px !important;;
                                     th{
                                         text-align: left;
                                         width: 170px !important;
                                        padding:11px 0 !important;
                                        background-color: #eee;
                                        border: 1px solid rgb(142, 144, 153) ;
                                    }
                                     th:nth-child(8){
                                         height: 138px;
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
                                        td:nth-child(8){
                                             height: 138px;
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