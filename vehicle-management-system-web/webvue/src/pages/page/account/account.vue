<template>
    <div class="management">
       <div class="title">
            账单管理
            <el-button class="add" @click="beforeadd()">添加<i class="iconfont icon-tianjia" style="font-size:10px;font-weight:600;margin-left:2px;"></i></el-button>
        </div>
      
       <div class="search-part">
           <el-form  label-width="120px" :model="searchdata">
               <div class="con">
                   <el-form-item class="number" label="车牌号" >
                        <el-input v-model="searchdata.carNum"></el-input>
                    </el-form-item>
                     <el-form-item label="月份"  class="timerange">
                      <el-date-picker
                       value-format="yyyy-MM"
                        v-model="start_end_month"
                        :picker-options="pickerOptions"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月"
                        end-placeholder="结束月">
                        </el-date-picker>
                    </el-form-item>

               </div>
              
                
           </el-form>

           <div class="rightbtn">
               
                <el-button class="cz" @click.native="search('0')">重置</el-button>
                <el-button @click.native="search('1')">搜索</el-button>
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
              
                label="月份"
                 width="120"
                align="center"
             >
             <template slot-scope="scope">
                 <div>
                     {{new Date(scope.row.monthDate).getFullYear()+'-'+(new Date(scope.row.monthDate).getMonth()+1)}}

                 </div>
             </template>
                </el-table-column>
                <!-- <el-table-column
                prop="createDate"
                label="出账日"

                 width="120"
                align="center"
                
            
                >
                </el-table-column> -->
                
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
                label="工资（元）"
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
                    <!-- <el-button class="sbtn" @click="goupdate(scope.row)">
                        修改
                    </el-button> -->
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
        <!-- 添加 弹窗 -->
       <el-dialog
            class="all-dialog"
            title="添加"
            :visible.sync="add"
            :modal-append-to-body='false'
            width="70%"
            :close-on-click-modal="false"
         >
        <div class="content">
            <el-form  label-width="100px" v-if="add_reset"  :model="add_data" :rules="addrule" ref="addform">
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input  v-model="add_data.carNum"></el-input>
                    </el-form-item>
                     <el-form-item label="月份" prop="monthDate">
                         <el-date-picker
                       value-format="yyyy-MM-dd"
                        v-model="add_data.monthDate"
                        type="month"
                        :picker-options="pickerOptions"
                        placeholder="选择月份"
                        popper-class="add-popper"
                       >
                        </el-date-picker>
                        
                    </el-form-item>
                   <el-form-item label="工资" prop="salary">
                        <el-input  v-model="add_data.salary"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="油价"  prop="oilPrice">
                        <el-input  v-model="add_data.oilPrice"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="出账日" >
                        <el-input disabled v-model="createDate"></el-input>
                    </el-form-item> -->
                    
                        

               </div>
               <div class="fg-title">
                   <span>修理明细:</span>
               </div>

             

               <div class="con">
                   <el-form-item :label="add_data.repairOneRemark" prop="profit">
                        <el-input  v-model="add_data.repairOnePrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="add_data.repairTwoRemark" prop="totalCost">
                        <el-input  v-model="add_data.repairTwoPrice"></el-input>
                    </el-form-item>
                     <el-form-item :label="add_data.repairThreeRemark" prop="totalXiuche">
                        <el-input  v-model="add_data.repairThreePrice"></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item :label="add_data.repairFourRemark" prop="profit">
                        <el-input v-model="add_data.repairFourPrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="add_data.repairFiveRemark" prop="totalCost">
                        <el-input  v-model="add_data.repairFivePrice"></el-input>
                    </el-form-item>
                   

               </div>
                
           </el-form>
            <div class="footer">
               <el-button @click="addFun()" class="btn">确 定</el-button>

           </div>
        </div>
        </el-dialog>
        <!-- 修改 弹窗 -->
       <!-- <el-dialog
       class="all-dialog"
       
        title="修改"
        :visible.sync="update"
        :modal-append-to-body='false'
        width="70%"
        :close-on-click-modal="false"
        
         >
        <div class="content">
            <el-form ref="updateform" label-width="100px" :model="update_data" :rules="addrule">
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="update_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="月份" prop="monthDate">
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

                <div class="fg-title">
                   <span>修理明细:</span>
               </div>

               <div class="con">
                   <el-form-item :label="update_data.repairOneRemark" prop="profit">
                        <el-input  v-model="update_data.repairOnePrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="update_data.repairTwoRemark" prop="totalCost">
                        <el-input  v-model="update_data.repairTwoRemark"></el-input>
                    </el-form-item>
                     <el-form-item :label="update_data.repairThreeRemark" prop="totalXiuche">
                        <el-input  v-model="update_data.repairThreePrice"></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item :label="update_data.repairFourRemark" prop="profit">
                        <el-input  v-model="update_data.repairFourPrice"></el-input>
                    </el-form-item>
                        <el-form-item :label="update_data.repairFiveRemark" prop="totalCost">
                        <el-input  v-model="update_data.repairFivePrice"></el-input>
                    </el-form-item>
                   

               </div>
                
               
              
                
           </el-form>
           <div class="footer">
               <el-button @click="updateFun()" class="btn">确 定</el-button>

           </div>
        </div>
        </el-dialog> -->

        <!-- 详情 弹窗 -->
       <el-dialog
            class="all-dialog"
            title="详情"
            :visible.sync="detail"
            :modal-append-to-body='false'
            width="70%"
            :close-on-click-modal="false"
         >
        <div class="content">
            <el-form  label-width="100px" :model="detail_data" >
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="detail_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="月份" prop="monthDate">
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

                <div class="fg-title">
                   <span>修理明细:</span>
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
            start_end_month:[],
          
            pickerOptions:{
                disabledDate: time => {
                   
                        const date = new Date()
                        const year = date.getFullYear()
                        let month = date.getMonth() + 1
                        if (month >= 1 && month <= 9) {
                            month = '0' + month
                        }
                        const currentdate = new Date( year.toString() + '-' + month.toString() );
                        const timeyear = time.getFullYear()
                        let timemonth = time.getMonth() + 1
                        if (timemonth >= 1 && timemonth <= 9) {
                            timemonth = '0' + timemonth
                        }
                        const timedate = new Date( timeyear.toString() + '-' + timemonth.toString() );
                        return currentdate < timedate
                    }
                

            },
           
            searchdata:{
                carNum:'',
            },
            tableheight:'200',
            createDate:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
            add:false,
             add_reset:true,
           add_data:{
                carNum:'',
                monthDate:'',
                salary:'',

                oilPrice:'',
                oilTotalPrice:'',
                oilTotalPrice:'',

                profit:'',
                totalCost:'',
                totalXiuche:'',

                repairOneRemark:'修理一',
                repairOnePrice:'',
                repairTwoRemark:'修理二',
                repairTwoPrice:'',
                repairThreeRemark:'修理三',
                repairThreePrice:'',
                repairFourRemark:'修理四',
                repairFourPrice:'',
                repairFiveRemark:'修理五',
                repairFivePrice:'',
            },
             addrule: {
                carNum: [
                    { required: true, message: '请输入车牌号', trigger: 'blur' },
                    // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    // {
                    //     required: true,
                    //     pattern: /^[0-9]+.?[0-9]*$/,
                    //     message: '请输入数字',
                    //     trigger: 'input'
                    // }
                   
                ],
                monthDate: [
                    { required: true, message: '请输入出账月份', trigger: 'blur' },
                   
                ],
                salary: [
                    { required: true, message: '请输入工资', trigger: 'blur' },
                   
                ],
                 oilPrice: [
                    { required: true, message: '请输入油价', trigger: 'blur' },
                   
                ],
            },
            
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
        this.tableheight = window.innerHeight/10 * 9 - 275 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - 275 +'px'

    }, 
    watch:{
        account_data(){
            this.tableheight = window.innerHeight/10 * 9 - 275 +'px'
        }
    },
    methods:{
        //是否是闰年
        isLeapYear:function(year){
            if(year/4 == 0 && year/100 != 0){
                return true ;
            } else if (year/400 == 0){
                return true ;
            } else{
                return false ;
            }},

        //根据年月得到天数
        getDayNumByYearMonth:function (year,month){
            switch (month) {
                case 1:
                    return 31;
                case 3:
                    return 31;
                case 5:
                    return 31;
                case 7:
                    return 31;
                case 8:
                    return 31;
                case 10:
                    return 31;
                case 12:
                    return 31;
                
                case 4:
                    return 30;
                case 6:
                    return 30;
                case 9:
                    return 30;
                case 11:
                    return 30;
                
                case 2:
                    return this.isLeapYear(year) ? 29 : 28;
            }
        },
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
                 if(this.start_end_month!=null&&this.start_end_month.length!=0){
                    
                    this.searchdata.startDate = this.start_end_month[0]+'-1';
                     let day= this.getDayNumByYearMonth(new Date(this.start_end_month[1]).getFullYear(),new Date(this.start_end_month[1]).getMonth()+1)
                    this.searchdata.endDate = this.start_end_month[1]+'-'+day;
                    
                }else{
                    delete this.searchdata.startDate;
                    delete this.searchdata.endDate;
                }

             
                console.log("this.searchdata",this.searchdata);
                
             
               
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
                this.start_end_month = [];
               

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
         beforeadd(){
            this.add_data={
                carNum:'',
                monthDate:'',
                salary:'',

                oilPrice:'',
                oilTotalPrice:'',
                oilTotalPrice:'',

                profit:'',
                totalCost:'',
                totalXiuche:'',

               repairOneRemark:'修理一',
                repairOnePrice:'',
                repairTwoRemark:'修理二',
                repairTwoPrice:'',
                repairThreeRemark:'修理三',
                repairThreePrice:'',
                repairFourRemark:'修理四',
                repairFourPrice:'',
                repairFiveRemark:'修理五',
                repairFivePrice:'',
            }
            this.add_reset = false;
            this.$nextTick(()=>{
                 this.add_reset = true;
            })
            this.add=true;
        },
         addFun(){
             this.$refs.addform.validate((valid) => {
                if (valid) {
                    this.$confirm(`即将生成  ‘${this.add_data.carNum}’  车的  '  ${this.add_data.monthDate.split('-')[0]}-${this.add_data.monthDate.split('-')[1]}  '  的当月账单?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        customClass:'add-confirm'
                        })
                        .then(() => {
                             
                           let data = this.add_data;
                            accountApi.saveCarCostMonthData(data,res=>{
                                
                                    if(res.data.code==0){
                                      
                                   
                                        this.init();
                                        this.add = false;
                                          this.$message.success("添加成功～");
                                       
                                    }else{
                                        this.add = false;
                                        this.$message.error(res.data.msg);
                                        

                                    }   
                                })
                            
                        })
                        .catch(() => {
                            this.add = false;
                            this.$nextTick(()=>{
                                this.add = true;
                                })
                            
                        })
                    
                    } else {
                        this.$message.warning("请将数据填写正确完整")
                    }
                })
            
           
        },
         godetail(row){
            this.detail_data = row;
            this.detail_data.monthDate = new Date(row.monthDate).getFullYear()+'-'+(new Date(row.monthDate).getMonth()+1)
            this.detail = true;

        },
        // goupdate(row){
        //     this.update_data =Object.assign({},row) ;
        //     this.update = true;

        // },
        // updateFun(){
       
        //     this.$refs.updateform.validate((valid) => {
        //         if (valid) {
        //             let data = this.update_data;
        //             accountApi.saveCarCostMonthData(data,res=>{
                     
        //                 if(res.data.code==0){
        //                     this.$message.success("修改成功～");
        //                     this.init();
        //                     this.update = false;
        //                 }
        //             })
        //         } else {
        //             this.$message.warning("请将数据填写正确完整")
        //         }
        //     })
           
        // },
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
 font-size: 20px;
        width: 100%;
        padding: 1%;
        color:rgba(17, 24,49,1);
        font-weight: 600;
        /deep/.el-button{
                    padding: 7px 13px;
                    position: absolute;
                    right: 2.5%;
                    border-color: rgba(17, 24,49,1);
                    background-color: rgba(17, 24,49,1);
                                  color: #fff;
                                  font-size: 14px;
                }
                
                .el-button:hover{ 
                                
                    background-color: #fff ;
                    color: rgba(17, 24,49,1);

                }
    }
    .search-part{
        width: 96%;
        border: 1px solid #eee;
        padding: 2%;
        margin-bottom: 10px;
         display: flex;
        /deep/.el-form{
            width: 85%;
            
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
            width:15%;
            display: flex;
        
            .el-button{
                width: 50%;
                padding:7px 10px;
                background-color: rgba(17, 24,49,1);
                color:#fff;
                border-color:rgba(17, 24,49,1);
                margin-top: 52px;
                font-size: 14px;
                
              

            }
            .el-button.cz{
                       background-color: #fff;
                        color:rgba(17, 24,49,1);
                    }
            .el-button:hover {
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
                            .fg-title{
                                width: 90%;
                                padding: 10px 3% 15px 3%;
                                span{
                                    color: #111831;
                                    font-weight: 600;

                                }
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
                                .el-form-item__label {
                                    color: #000;
                                }
                                .el-form-item__content{
                                   
                                   
                                  
                                    .el-date-editor.el-input{

                                    }
                                     .el-input.is-disabled .el-input__inner{
                                        color: #000;
                                        

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