<template>
    <div class="management">
      
       <div class="search-part">
            货运明细

       </div>
       <div class="content">
           <el-table
                :data="transport_data"
                height="650"
                border
                style="width: 100%">
                <!-- <el-table-column
                prop="carNum"
                label="carNum"
                >
                </el-table-column> -->
                <el-table-column
                prop="billDate"
                label="billDate"
             >
                </el-table-column>
                <el-table-column
                prop="loadingPlace"
                label="loadingPlace">
                </el-table-column>
                <el-table-column
                prop="meters"
                label="meters">
                </el-table-column>

                <el-table-column
                prop="money"
                label="money">
                </el-table-column>

                <el-table-column
                prop="oil"
                label="oil">
                </el-table-column>

                 <el-table-column
                prop="ratio"
                label="ratio">
                </el-table-column>
                 <el-table-column
                prop="specs"
                label="specs">
                </el-table-column>
                 <el-table-column
                prop="tonnage"
                label="tonnage">
                </el-table-column>
                 <el-table-column
                prop="unitPrice"
                label="unitPrice">
                </el-table-column>

                 <el-table-column
                prop="loadingPlace"
                label="loadingPlace">
                </el-table-column>
                 <el-table-column
                prop="unloadingPlace"
                label="unloadingPlace">
                </el-table-column>

                 




            
            </el-table>
       </div>
    </div>
</template>
<script>
import transportApi from '@/api/transport/transport';
export default {
    data(){
        return{
            transport_data:[]

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
               endDate:'2020-12-31',
               limit:10,
               offset:1,
               loadingPlace:'巨野',
               unloadingPlace:'盒子222'
            }
            transportApi.findCarDateList(data,res=>{
                console.log("res transport",res);
                if(res.data.code == 0){
                    this.transport_data = res.data.data.rows;
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