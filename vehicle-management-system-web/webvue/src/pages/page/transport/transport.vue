<template>
    <div class="management">
        <div class="title">
            货运明细
            <el-button class="add">添加</el-button>
        </div>
      
       <div class="search-part">
           <el-form  label-width="120px" :model="searchdata">
               <div class="con">
                    <el-form-item label="车牌号" >
                        <el-input v-model="searchdata.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="运输时间" >
                        <el-input v-model="searchdata.billDate"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="装货地" >
                        <el-input v-model="searchdata.loadingPlace"></el-input>
                    </el-form-item>
                        <el-form-item label="卸货地" >
                        <el-input v-model="searchdata.unloadingPlace"></el-input>
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
                :data="transport_data"
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
        this.tableheight = window.innerHeight/10 * 9 - 240 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - 240 +'px'

    },
    watch:{
        transport_data(){
            this.tableheight = window.innerHeight/10 * 9 - 240 +'px'
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
    height: 90vh;
    .title{

        width: 100%;
        padding: 1%;
        color:rgba(17, 24,49,1);
        font-weight: 600;
        position: relative;
        /deep/.el-button{
            padding: 5px 20px;
            position: absolute;
            right: 2%;
        }
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