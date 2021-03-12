<template>
    <div class="management">
      
       <div class="search-part">
            货运明细

       </div>
       <div class="content">
           <el-table
                :data="account_data"
                height="650"
                border
                style="width: 100%">
                <el-table-column
                prop="carNum"
                label="carNum"
                >
                </el-table-column>
                <el-table-column
                prop="monthDate"
                label="monthDate"
             >
                </el-table-column>
                <el-table-column
                prop="oilPrice"
                label="oilPrice">
                </el-table-column>
                <el-table-column
                prop="oilTotal"
                label="oilTotal">
                </el-table-column>

                <el-table-column
                prop="oilTotalPrice"
                label="oilTotalPrice">
                </el-table-column>

                <el-table-column
                prop="profit"
                label="profit">
                </el-table-column>

                 <el-table-column
               
                    label="repair">
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
                label="salary">
                </el-table-column>
                 <el-table-column
                prop="totalCost"
                label="totalCost">
                </el-table-column>
                 <el-table-column
                prop="totalXiuche"
                label="totalXiuche">
                </el-table-column>


               

            
            </el-table>
       </div>
    </div>
</template>
<script>
import accountApi from '@/api/account/account';
export default {
    data(){
        return{
            account_data:[]

        }
    },
    created(){
        this.init();
    },
    mounted(){

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
                    this.account_data = res.data.data.rows;
                }
            })
        }
    }
    
    
}
</script>
<style scoped lang="scss">
.management{
    height: 90vh;
}


</style>