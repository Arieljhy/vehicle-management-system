<template>
    <div class="management">
       <div class="title">
            账单管理
        </div>
      
       <div class="search-part">
           <el-form  label-width="120px" :model="searchdata">
               <div class="con">
                    <el-form-item label="车牌号" >
                        <el-input v-model="searchdata.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="月份" >
                        <el-input v-model="searchdata.monthDate"></el-input>
                    </el-form-item>

               </div>
              
                
           </el-form>

           <div class="rightbtn">
               <el-button>搜索</el-button>
                <el-button>重置</el-button>
           </div>
           
       </div>
       <div class="content">
           <el-table
                :data="account_data"
                :height="tableheight"
                border
                style="width: 100%">
                <el-table-column
                prop="carNum"
                label="车牌号"

                 width="120"
                align="center"
                
                fixed
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
                fixed="right"
                label="操作"
                width="100"
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
                :page-sizes="[5, 10, 15, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
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
        this.tableheight = window.innerHeight/10 * 9 - 240 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - 240 +'px'

    }, 
    watch:{
        account_data(){
            this.tableheight = window.innerHeight/10 * 9 - 240 +'px'
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
    height: 90vh;
    .title{

        width: 100%;
        padding: 1%;
        color:rgba(17, 24,49,1);
        font-weight: 600;
    }
    .search-part{
        width: 96%;
        border: 1px solid #eee;
        padding: 2%;
        margin-bottom: 15px;
         display: flex;
        /deep/.el-form{
            width: 90%;
            
            .con{
                width: 100%;
                display: flex;
            }
            .el-form-item{
                width: 45%;
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
            width:10%;
            display: flex;
        
            .el-button{
                padding:0px 10px;
                background-color: rgba(17, 24,49,1);
                color:#fff;
                border-color:rgba(17, 24,49,1);
                margin-top: 52px;
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
            .el-table__header-wrapper{
                table{
                    thead{
                        color:rgba(17, 24,49,1);
                        tr th{
                            padding:2px 0 !important;
                            background-color: #eee;
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
        }
        .pagination{
                width: 100%;

                text-align: right;
                margin-top: 10px;
               
            }
    }
    
}


</style>