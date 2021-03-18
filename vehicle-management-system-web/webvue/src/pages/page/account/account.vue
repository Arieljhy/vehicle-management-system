<template>
    <div class="management">
       <div class="title">
            账单管理
        </div>
      
       <div class="search-part">
           <el-form  label-width="120px" :model="searchdata">
               <div class="con">
                   <el-form-item class="number" label="车牌号" >
                        <el-input v-model="searchdata.carNum"></el-input>
                    </el-form-item>
                     <el-form-item label="时间范围"  class="timerange">
                      <el-date-picker
                       value-format="yyyy-MM-dd"
                        v-model="start_end_date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

               </div>
              
                
           </el-form>

           <div class="rightbtn">
               <el-button @click="search('1')">搜索</el-button>
                <el-button @click="search('0')">重置</el-button>
           </div>
           
       </div>
       <div class="exlcon">
           <el-button @click="excel()">导出Excel</el-button>
       </div>
       <div class="content">
           <el-table
                :data="account_data_part"
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
                label="日期"
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
                label="利润（元）"
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
                width="160"
                align="center"
                >
                <template slot-scope="scope">
                    <el-button class="sbtn" @click="godetail(scope.row)">
                        查看
                    </el-button>
                    <el-button class="sbtn" @click="goupdate(scope.row)">
                        修改
                    </el-button>
                    <el-button class="sbtn dele" style="color:#e33e33" @click="deleted(scope.row)">
                        删除
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
        <!-- 修改 弹窗 -->
       <el-dialog
       class="all-dialog"
        title="修改"
        :visible.sync="update"
        :modal-append-to-body='false'
        width="70%"
         >
        <div class="content">
            <el-form  label-width="100px" :model="update_data" >
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="update_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="monthDate">
                         <el-input disabled v-model="update_data.monthDate"></el-input>
                        
                    </el-form-item>
                   <el-form-item label="工资" prop="salary">
                        <el-input  v-model="update_data.salary"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="油价"  prop="oilPrice">
                        <el-input  v-model="update_data.oilPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="总油耗" prop="oilTotalPrice">
                        <el-input disabled v-model="update_data.oilTotalPrice"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="总油费" prop="oilTotalPrice">

                          <el-input v-model="update_data.oilTotalPrice" disabled >
                            
                        </el-input>
                    </el-form-item>

               </div>
             
               <div class="con">
                   <el-form-item label="利润" prop="profit">
                        <el-input disabled v-model="update_data.profit"></el-input>
                    </el-form-item>
                        <el-form-item label="总花费" prop="totalCost">
                        <el-input disabled v-model="update_data.totalCost"></el-input>
                    </el-form-item>
                     <el-form-item label=" 总修理费" prop="totalXiuche">
                        <el-input disabled v-model="update_data.totalXiuche"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item :label="update_data.repairOneRemark" prop="profit">
                        <el-input disabled v-model="update_data.repairOnePrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="update_data.repairTwoRemark" prop="totalCost">
                        <el-input disabled v-model="update_data.repairTwoRemark"></el-input>
                    </el-form-item>
                     <el-form-item :label="update_data.repairThreeRemark" prop="totalXiuche">
                        <el-input disabled v-model="update_data.repairThreePrice"></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item :label="update_data.repairFourRemark" prop="profit">
                        <el-input disabled v-model="update_data.repairFourPrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="update_data.repairFiveRemark" prop="totalCost">
                        <el-input disabled v-model="update_data.repairFivePrice"></el-input>
                    </el-form-item>
                   

               </div>
                
               
              
                
           </el-form>
           <div class="footer">
               <el-button @click="updateFun()" class="btn">确 定</el-button>

           </div>
        </div>
        </el-dialog>

        <!-- 详情 弹窗 -->
       <el-dialog
            class="all-dialog"
            title="详情"
            :visible.sync="detail"
            :modal-append-to-body='false'
            width="70%"
         >
        <div class="content">
            <el-form  label-width="100px" :model="detail_data" >
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="detail_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="monthDate">
                         <el-input disabled v-model="detail_data.monthDate"></el-input>
                        
                    </el-form-item>
                   <el-form-item label="工资" prop="salary">
                        <el-input disabled v-model="detail_data.salary"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="油价"  prop="oilPrice">
                        <el-input disabled v-model="detail_data.oilPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="总油耗" prop="oilTotalPrice">
                        <el-input disabled v-model="detail_data.oilTotalPrice"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="总油费" prop="oilTotalPrice">

                          <el-input v-model="detail_data.oilTotalPrice" disabled >
                            
                        </el-input>
                    </el-form-item>

               </div>
             
               <div class="con">
                   <el-form-item label="利润" prop="profit">
                        <el-input disabled v-model="detail_data.profit"></el-input>
                    </el-form-item>
                        <el-form-item label="总花费" prop="totalCost">
                        <el-input disabled v-model="detail_data.totalCost"></el-input>
                    </el-form-item>
                     <el-form-item label=" 总修理费" prop="totalXiuche">
                        <el-input disabled v-model="detail_data.totalXiuche"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item :label="detail_data.repairOneRemark" prop="profit">
                        <el-input disabled v-model="detail_data.repairOnePrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="detail_data.repairTwoRemark" prop="totalCost">
                        <el-input disabled v-model="detail_data.repairTwoRemark"></el-input>
                    </el-form-item>
                     <el-form-item :label="detail_data.repairThreeRemark" prop="totalXiuche">
                        <el-input disabled v-model="detail_data.repairThreePrice"></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item :label="detail_data.repairFourRemark" prop="profit">
                        <el-input disabled v-model="detail_data.repairFourPrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="detail_data.repairFiveRemark" prop="totalCost">
                        <el-input disabled v-model="detail_data.repairFivePrice"></el-input>
                    </el-form-item>
                   

               </div>
                
               
              
                
           </el-form>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import accountApi from '@/api/account/account';
export default {
    data(){
        return{
            pagesize:10,
            currentPage: 1,
            total:0,
            account_data:[],
            account_data_part:[],
            start_end_date:[],
            searchdata:{
                carNum:'',
            },
            tableheight:'200',

            
            detail:false,
            detail_data:{
                carNum:'',
                monthDate:'',
                salary:'',

                oilPrice:'',
                oilTotalPrice:'',
                oilTotalPrice:'',

                profit:'',
                totalCost:'',
                totalXiuche:'',

                repairOneRemark:'',
                repairOnePrice:'',
                repairTwoRemark:'',
                repairTwoPrice:'',
                repairThreeRemark:'',
                repairThreePrice:'',
                repairFourRemark:'',
                repairFourPrice:'',
                repairFiveRemark:'',
                repairFivePrice:'',
            },
            update:false,
            update_data:{
                 carNum:'',
                monthDate:'',
                salary:'',

                oilPrice:'',
                oilTotalPrice:'',
                oilTotalPrice:'',

                profit:'',
                totalCost:'',
                totalXiuche:'',

                repairOneRemark:'',
                repairOnePrice:'',
                repairTwoRemark:'',
                repairTwoPrice:'',
                repairThreeRemark:'',
                repairThreePrice:'',
                repairFourRemark:'',
                repairFourPrice:'',
                repairFiveRemark:'',
                repairFivePrice:'',
            }
            
            

        }
    },
    created(){
        this.init();
        this.tableheight = window.innerHeight/10 * 9 - 260 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - 260 +'px'

    }, 
    watch:{
        account_data(){
            this.tableheight = window.innerHeight/10 * 9 - 260 +'px'
        }
    },
    methods:{
        excel(){
            accountApi.excelExport(this.searchdata,res=>{
                const disposition = res.headers['content-disposition'];
                let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
                fileName= decodeURIComponent(fileName).replace(/\"/g, "").replace(/\s+/g,"")

                let blob = new Blob([res.data], {
                    type: "application/vnd.ms-excel"
                });
                let objectUrl = URL.createObjectURL(blob);

                let a = document.createElement("a");
                a.href = objectUrl;
                a.download = fileName;

                a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
                window.URL.revokeObjectURL(blob);
              

            })
        },
        search(key){
            if(key == '1'){
                
                if(this.start_end_date.length!=0){
                    this.searchdata.startDate = this.start_end_date[0];
                    
                    this.searchdata.endDate = this.start_end_date[1];
                }
             
               
                accountApi.findCarCostList(this.searchdata,res=>{
                    if(res.data.code == 0){
                        this.account_data = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.handleCurrentChange(1); 
                    }
                })

            }
            if(key == '0'){
                this.searchdata = {
                    carNum:''

                }
                this.start_end_date = '';
               

                accountApi.findCarCostList({},res=>{
                  
                    
                    if(res.data.code == 0){
                        this.account_data = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.handleCurrentChange(1); 
                    }
                })
            }

        },
        init(){
            let data = {}
            accountApi.findCarCostList(data,res=>{
                if(res.data.code == 0){
                    this.total = res.data.data.total;
                    this.account_data = res.data.data.rows;
                    this.handleCurrentChange(1); 
                }
            })
        },
         godetail(row){
            this.detail_data = row;
            this.detail = true;

        },
        goupdate(row){
            this.update_data =Object.assign({},row) ;
            this.update = true;

        },
         deleted(row){
            this.$confirm('确定要删除这条数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
                .then(() => {
                    accountApi.delCarCostDate({id:row.id},res=>{
                        if(res.data.code==0){
                            this.$message.success("删除成功～");
                            this.init();
                        }
                    })
                    
                })
                .catch(() => {})
            
        },
        handleSizeChange(val) {
            
            this.pagesize = val;

             let i = 0 ;
             this.account_data_part=[];
           
            if(this.currentPage == Math.floor(this.account_data.length/this.pagesize)+1){
           
                while(i < this.account_data.length % this.pagesize){

                    this.account_data_part.push(this.account_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }else{

                while(i<this.pagesize){
                    this.account_data_part.push(this.account_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;

            let i = 0 ;
             this.account_data_part=[];
           
            if(this.currentPage == Math.floor(this.account_data.length/this.pagesize)+1){
           
                while(i < this.account_data.length % this.pagesize){

                    this.account_data_part.push(this.account_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }else{

                while(i<this.pagesize){
                    this.account_data_part.push(this.account_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }


            
          
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
        margin-bottom: 10px;
         display: flex;
        /deep/.el-form{
            width: 90%;
            
           .con{
                display: flex;
                .el-form-item.number{
                    width: 45%;
                    margin-bottom:0;
                    .el-form-item__content{
                   
                        width:calc(100% - 100px);
                   
                        .el-date-editor{
                            width: 100%;
                            .el-input__inner{

                        
                                height: 30px;
                                line-height:30px ;
                            } 

                        }
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
                .el-form-item.timerange{
                    width: 45%;
                    margin-bottom:0;
                    .el-form-item__content{
                   
                        width:calc(100% - 100px);
                   
                        .el-date-editor.el-range-editor{
                             height: 32px;
                              padding: 0 10px;
                            width: 100%;
                            .el-range-input{

                        
                                height: 30px;
                                line-height:30px ;
                            } 
                             .el-range-input:focus {
                                border-color: rgba(17, 24,49,1);
                            }

                            .el-input__inner:focus{
                                border-color: rgba(17, 24,49,1);

                            }

                        }
                        .el-range-editor.is-active{
                            border-color: rgba(17, 24,49,1);

                        }
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
    .exlcon{
        width: 100%;
         margin-bottom: 10px;
        /deep/.el-button{
                        height:30px;
                                
                                padding:8px 10px !important;
                                 border-color: rgba(17, 24,49,1);
                                  background-color: rgba(17, 24,49,1);
                                  color: #fff;
                                  font-size: 13px;

                            }
                            .el-button:hover{ 
                                
                                  background-color: #fff ;
                                  color: rgba(17, 24,49,1);

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
               
                 color:rgba(17, 24,49,1);
                font-size: 10px;
                margin:0 8px;
            }
            .sbtn.dele{
                color: #e33e33;
            }
            .sbtn.dele:hover{
                color: #3a1310;
                font-weight: 600;
            }
            .sbtn:hover{
           
               color: #409eee;
               
            }
        }
        .pagination{
                width: 100%;

                text-align: right;
                margin-top: 10px;
               
            }
    }
    
}
/deep/.el-dialog__wrapper.all-dialog{
        .el-dialog{
            .el-dialog__body{
                    .content{
                        .el-form{
                            width: 100%;
                            .tit{
                                padding:0  5%;
                                
                            }
                            .con{
                            
                                display: flex !important;
                                margin-bottom: 2vh;
                                
                                .allrepair{
                                     width: 100%;
                                    padding: 0 5% 0 15%;
                                    .item{
                                        width: 100%;
                                        display: flex;
                                        margin-bottom: 10px;
                                        .t{
                                            margin-right: 10%;

                                        }
                                        .p{

                                        }
                                    }
                                }
                            }
                            .el-form-item{
                                 width: 33%;
                          
                                margin-bottom:0;
                                .el-form-item__content{
                                   
                                   
                                  
                                    .el-date-editor.el-input{

                                    }
                                    .el-input{
                                        width: 100%;
                                        .el-input__inner{
                                            width: 100%;
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
                        .footer{
                            width: 98%;
                            padding: 20px  1%;
                            text-align: right;

                            .el-button{
                                height:33px;
                                
                                padding:9px 20px !important;
                                 border-color: rgba(17, 24,49,1);
                                  background-color: rgba(17, 24,49,1);
                                  color: #fff;

                            }
                            .el-button:hover{ 
                                
                                  background-color: #fff ;
                                  color: rgba(17, 24,49,1);

                            }

                        }
                        

                    }

            }
          

        }
    }


</style>