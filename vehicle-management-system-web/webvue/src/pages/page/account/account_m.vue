<template>
  
    <div class="management">
        <div class="container">
               
       <div class="title">
            账单管理
            <el-button class="add" @click="beforeadd">添加<i class="iconfont icon-tianjia" style="font-size:10px;font-weight:600;margin-left:2px;"></i></el-button>
        </div>
      
       <div class="search-part">
           <el-form  label-width="80px" :model="searchdata">
          
                    <el-form-item label="车牌号" >
                        <el-input v-model="searchdata.carNum"></el-input>
                    </el-form-item>
                  
                    <el-form-item label="开始月份"  class="timerange">
                      <el-date-picker
                       value-format="yyyy-MM"
                        v-model="start_date"
                        type="month"
                        :picker-options="pickerOptionss"
                        placeholder="开始月"
                      >
                        </el-date-picker>
                    </el-form-item>

                     <el-form-item label="结束月份"  class="timerange">
                      <el-date-picker
                       value-format="yyyy-MM"
                        v-model="end_date"
                        type="month"
                        :picker-options="pickerOptionse"
            
                        placeholder="结束月"
                      >
                        </el-date-picker>
                    </el-form-item>
                
           </el-form>

           <div class="rightbtn">
               
                <el-button class="cz"  @click.native="search('0')">重置</el-button>
                <el-button @click.native="search('1')">搜索</el-button>
           </div>
           
       </div>
        <div class="exlcon">
                <el-button @click="excel()">导出Excel</el-button>
            </div>
       <div class="content">
           <el-table
                :data="account_data"
               
                border
                style="width: 100%">
                

                <el-table-column
                prop="carNum"
                label="车牌号"

                
                align="center"
                
              
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
                    <div class="cont xlxx">
                         <div class="item">
                            <el-tooltip popper-class="atooltip"  effect="dark" :content="scope.row.repairOneRemark" placement="top">
                            <div class="r"><span class="xh">1、</span><span class="price">({{scope.row.repairOnePrice}}元)</span>---{{scope.row.repairOneRemark}}</div>
                            </el-tooltip>
                        </div>

                         <div class="item">
              <el-tooltip popper-class="atooltip"  effect="dark" :content="scope.row.repairTwoRemark" placement="top">
                            <div class="r"><span class="xh">2、</span><span class="price">({{scope.row.repairTwoPrice}}元)</span>---{{scope.row.repairTwoRemark}}</div>
                            </el-tooltip>
                        </div>

                         <div class="item">
                     <el-tooltip popper-class="atooltip"  effect="dark" :content="scope.row.repairThreeRemark" placement="top">
                            <div class="r"><span class="xh">3、</span><span class="price">({{scope.row.repairThreePrice}}元)</span>---{{scope.row.repairThreeRemark}}</div>
                            </el-tooltip>
                        </div>

                         <div class="item">
                              <el-tooltip popper-class="atooltip"  effect="dark" :content="scope.row.repairFourRemark" placement="top">
                                <div class="r"><span class="xh">4、</span><span class="price">({{scope.row.repairFourPrice}}元)</span>---{{scope.row.repairFourRemark}}</div>
                            </el-tooltip>
                         
                           
                            
                        </div>

                        <div class="item"> 
                          <el-tooltip popper-class="atooltip"  effect="dark" :content="scope.row.repairFiveRemark" placement="top">
                            <div class="r"><span class="xh">5、</span><span class="price">({{scope.row.repairFivePrice}}元)</span>---{{scope.row.repairFiveRemark}}</div>
                            </el-tooltip>
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
              
                label="操作"
                width="80"
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
                
                    :page-size="10"
                        :page-sizes="[5, 10, 15, 20]"
                        layout=" sizes,prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
                        <div class="tit">
                            共：<span>{{total}}</span>&nbsp;&nbsp;&nbsp;&nbsp;条

                        </div>
            </div>
       </div>
        <div class="footer">

                —— 我是有底线的 ——

            </div>

        </div>
         <!-- 添加 弹窗 -->
       <el-dialog
            class="all-dialog"
            title="添加"
            :visible.sync="add"
            :modal-append-to-body='false'
            width="90%"
            :close-on-click-modal="false"
         >
        <div class="content">
            <el-form  label-width="80px" v-if="add_reset"  :model="add_data" :rules="addrule" ref="addform">
           
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
                       >
                        </el-date-picker>
                        
                    </el-form-item>
                   <el-form-item label="工资" prop="salary">
                        <el-input  v-model="add_data.salary"></el-input>
                    </el-form-item>

         

                   <el-form-item label="油价"  prop="oilPrice">
                        <el-input  v-model="add_data.oilPrice"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="出账日"  >
                        <el-input disabled v-model="createDate"></el-input>
                    </el-form-item> -->
                    
                        

              
              <div class="fg-title">
                   <span>修理明细:</span>
               </div>

             

               <div class="conxl">
                   <el-form-item label="1、" class="left">
                       <el-input type="textarea" v-model="add_data.repairOneRemark"></el-input>
                    
                    </el-form-item>
                    <el-form-item label="价格" class="right">
                       
                        <el-input  v-model="add_data.repairOnePrice"></el-input>
                    </el-form-item>
                </div>
               <div class="conxl">
                    <el-form-item label="2、" class="left">
                            <el-input type="textarea"  v-model="add_data.repairTwoRemark"></el-input>
                      
                    </el-form-item>
                     <el-form-item label="价格" class="right">
                     
                        <el-input  v-model="add_data.repairTwoPrice"></el-input>
                    </el-form-item>
                </div>
               <div class="conxl">
                     <el-form-item label="3、" class="left">
                         <el-input type="textarea"  v-model="add_data.repairThreeRemark"></el-input>
                        
                    </el-form-item>
                     <el-form-item label="价格" class="right">
                         
                        <el-input  v-model="add_data.repairThreePrice"></el-input>
                    </el-form-item>

               </div>
               <div class="conxl">
                   <el-form-item label="4、" class="left">
                        <el-input type="textarea"  v-model="add_data.repairFourRemark"></el-input>
                       
                    </el-form-item>
                     <el-form-item label="价格" class="right">
                       
                        <el-input v-model="add_data.repairFourPrice"></el-input>
                    </el-form-item>
                </div>
               <div class="conxl">
                        <el-form-item label="5、" class="left">
                             <el-input type="textarea"  v-model="add_data.repairFiveRemark"></el-input>
                       
                    </el-form-item>

                    <el-form-item label="价格" class="right">
                            
                        <el-input  v-model="add_data.repairFivePrice"></el-input>
                    </el-form-item>
                   

               </div>
                   

        
                
           </el-form>
            <div class="footer">
               <el-button @click="addFun()" class="btn">确 定</el-button>

           </div>
        </div>
        </el-dialog>
        

        <!-- 详情 弹窗 -->
       <el-dialog
            class="all-dialog"
            title="详情"
            :visible.sync="detail"
            :modal-append-to-body='false'
            width="90%"
            :close-on-click-modal="false"
         >
        <div class="content">
            <el-form  label-width="80px" :model="detail_data" >
            
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="detail_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="月份" prop="monthDate">
                         <el-input disabled v-model="detail_data.monthDate"></el-input>
                        
                    </el-form-item>
                   <el-form-item label="工资" prop="salary">
                        <el-input disabled v-model="detail_data.salary"></el-input>
                    </el-form-item>

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

                   <el-form-item label="利润" prop="profit">
                        <el-input disabled v-model="detail_data.profit"></el-input>
                    </el-form-item>
                        <el-form-item label="总花费" prop="totalCost">
                        <el-input disabled v-model="detail_data.totalCost"></el-input>
                    </el-form-item>
                     <el-form-item label=" 总修理费" prop="totalXiuche">
                        <el-input disabled v-model="detail_data.totalXiuche"></el-input>
                    </el-form-item>

             
                   <div class="fg-title">
                   <span>修理明细:</span>
               </div>

             

               <div class="conxl">
                   <el-form-item label="1、" class="left">
                       <el-input disabled type="textarea" v-model="detail_data.repairOneRemark"></el-input>
                    
                    </el-form-item>
                    <el-form-item label="价格" class="right">
                       
                        <el-input  disabled v-model="detail_data.repairOnePrice"></el-input>
                    </el-form-item>
                </div>
               <div class="conxl">
                    <el-form-item label="2、" class="left">
                            <el-input disabled type="textarea"  v-model="detail_data.repairTwoRemark"></el-input>
                      
                    </el-form-item>
                     <el-form-item label="价格" class="right">
                     
                        <el-input disabled  v-model="detail_data.repairTwoPrice"></el-input>
                    </el-form-item>
                </div>
               <div class="conxl">
                     <el-form-item label="3、" class="left">
                         <el-input  disabled type="textarea"  v-model="detail_data.repairThreeRemark"></el-input>
                        
                    </el-form-item>
                     <el-form-item label="价格" class="right">
                         
                        <el-input disabled  v-model="detail_data.repairThreePrice"></el-input>
                    </el-form-item>

               </div>
               <div class="conxl">
                   <el-form-item label="4、" class="left">
                        <el-input disabled type="textarea"  v-model="detail_data.repairFourRemark"></el-input>
                       
                    </el-form-item>
                     <el-form-item label="价格" class="right">
                       
                        <el-input disabled v-model="detail_data.repairFourPrice"></el-input>
                    </el-form-item>
                </div>
               <div class="conxl">
                        <el-form-item label="5、" class="left">
                             <el-input disabled type="textarea"  v-model="detail_data.repairFiveRemark"></el-input>
                       
                    </el-form-item>

                    <el-form-item label="价格" class="right">
                            
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
            start_date:'',
            end_date:'',
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
            pickerOptionss:{
                disabledDate: time => {
                    if (this.end_date) {
                        
                        const date = new Date(this.end_date)
                        const year = date.getFullYear()
                        
                        let month = date.getMonth() + 1

                     
                        if (month >= 1 && month <= 9) {
                            month = '0' + month
                        }
                        const currentdate = new Date(year.toString() + '-' + month.toString() );
                        const timeyear = time.getFullYear()
                        let timemonth = time.getMonth() + 1
                        if (timemonth >= 1 && timemonth <= 9) {
                            timemonth = '0' + timemonth
                        }
                        const timedate = new Date( timeyear.toString() + '-' + timemonth.toString() );
                        return currentdate < timedate
                    } else {
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
                }

            },
            pickerOptionse:{
                disabledDate: time => {
                    if (this.start_date) {
                        
                        const date = new Date(this.start_date)
                        const year = date.getFullYear()
                        let month = date.getMonth() + 1
                        if (month >= 1 && month <= 9) {
                            month = '0' + month
                        }
                        const currentdate = new Date( year.toString() +'-'+ month.toString())

                        const timeyear = time.getFullYear()
                        let timemonth = time.getMonth() + 1
                        if (timemonth >= 1 && timemonth <= 9) {
                            timemonth = '0' + timemonth
                        }
                        const timedate = new Date(timeyear.toString() +'-'+timemonth.toString())


                        const date1 = new Date()
                        const year1 = date1.getFullYear()
                        let month1 = date1.getMonth() + 1
                        if (month1 >= 1 && month1 <= 9) {
                            month1 = '0' + month1
                        }
                        const currentdate1 =new Date( year1.toString()+'-'+month1.toString())
                        
                        // const timeyear1 = time.getFullYear()
                        // let timemonth1= time.getMonth() + 1
                        // if (timemonth1 >= 1 && timemonth1 <= 9) {
                        //     timemonth1 = '0' + timemonth1
                        // }
                        // const timedate1 = timeyear1.toString() + timemonth1.toString()
                      
                   

                        return  currentdate >timedate ||timedate > currentdate1
                    } else {
                        const date = new Date()
                        const year = date.getFullYear()
                        let month = date.getMonth() + 1
                        if (month >= 1 && month <= 9) {
                            month = '0' + month
                        }
                        const currentdate = new Date( year.toString() +'-'+ month.toString());
                        const timeyear = time.getFullYear()
                        let timemonth = time.getMonth() + 1
                        if (timemonth >= 1 && timemonth <= 9) {
                            timemonth = '0' + timemonth
                        }
                        const timedate = new Date( timeyear.toString() +'-'+ timemonth.toString() );
                        return currentdate < timedate
                    }
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
                    { required: true, message: '请输入要出账的月份', trigger: 'blur' },
                   
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
              
                
                if(this.start_date!=null&&this.start_date.length!=0){
                    
                    this.searchdata.startDate = this.start_date+'-1';
                    
                }else{
                    delete this.searchdata.startDate;
                    delete this.searchdata.endDate;
                }

                if(this.end_date!=null&&this.end_date.length!=0){
                    let day= this.getDayNumByYearMonth(new Date(this.end_date).getFullYear(),new Date(this.end_date).getMonth()+1)
                    this.searchdata.endDate = this.end_date+'-'+day;
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
                this.start_date = '';
                this.end_date = '';
               

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
            this.add_reset = false;
            this.$nextTick(()=>{
                 this.add_reset = true;
            })
            this.add=true;
        },
         addFun(){
             this.$refs.addform.validate((valid) => {
                if (valid) {
                    this.$MessageBox({
                        title: '提示',
                        message: `即将生成  ‘${this.add_data.carNum}’  车的  '  ${this.add_data.monthDate.split('-')[0]}-${this.add_data.monthDate.split('-')[1]}  '  的当月账单?`,
                        showCancelButton: true
                    }).then(action => { 
                        if (action == 'confirm') {     //确认的回调
                        
                           let data = this.add_data;
                            accountApi.saveCarCostMonthData(data,res=>{
                                
                                    if(res.data.code==0){
                                      
                                   
                                        this.init();
                                        this.add = false;
                                        
                                          this.$toast({
                                                message: '添加成功～',
                                                position: 'middle',
                                                duration: 1000
                                        });
                                       
                                    }else{
                                        this.add = false;
                                        this.$toast({
                                            message: res.data.msg,
                                            position: 'middle',
                                            duration: 1000
                                    });
                                       
                                        

                                    }   
                                })
                        }
                    });
                   
                    
                    } else {
                        this.$toast({
                                    message: '请将数据填写正确完整',
                                    position: 'middle',
                                    duration: 1000
                            });
                        
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
         deleted(row){
              this.$MessageBox({
                title: '提示',
                message: '确定要删除这条数据吗?',
                showCancelButton: true
            }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                       accountApi.delCarCostDate({id:row.id},res=>{
                            if(res.data.code==0){
                               
                                this.$toast({
                                    message: '删除成功～',
                                    position: 'middle',
                                    duration: 1000
                                });
                                this.init();
                            }
                        })
                }
            });
           
            
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
    width: 100%;
    height: 93vh;
    border:1px solid transparent;
    .container{
        width: 90%;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
       
        overflow-x: hidden;
        overflow-y: auto;
         height:92vh;
        padding: 0 5%;
        margin:1vh 0 ;

        .title{
            font-size: 20px;
            height: 35px;
            line-height: 35px;
                width: 100%;
                padding: 1%;
                color:rgba(17, 24,49,1);
                font-weight: 600;
                margin: 1vh 0;
                /deep/.el-button{
                    width: 90px;
                    height: 35px;
                    font-size:14px;
                    padding: 5px 10px;
                    position: absolute;
                    right: 5%;
                    border-color: rgba(17, 24,49,1);
                    background-color: rgba(17, 24,49,1);
                                  color: #fff;
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
                margin-bottom: 15px;
               
                /deep/.el-form{
                    width: 100%;
                    
                    .con{
                        width: 100%;
                        display: flex;
                    }
                    .el-form-item{
                        width: 100%;
                        margin-bottom:10px;
                        .el-form-item__content{
                        width:calc(100% - 100px);
                        .el-input{
                            .el-input__inner{
                                height: 40px;
                                line-height:40px ;
                            } 
                            .el-input__inner:focus {
                                border-color: rgba(17, 24,49,1);
                            }

                        }
                        }
                    }
                    .el-form-item.timerange{
                    width: 100%;
                    margin-bottom:10px;
                    .el-form-item__content{
                   
                        width:calc(100% - 100px);
                   
                        .el-date-editor{
                             height: 42px;
                         
                            width: 100%;
                            .el-range-input{

                                color: #000 !important;
                                height: 40px;
                                line-height:40px ;
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
                                height: 40px;
                                line-height:40px ;
                            } 
                            .el-input__inner:focus {
                                border-color: rgba(17, 24,49,1);
                            }

                        }
                    }
                } 

                }
                .rightbtn{
                    width: calc(100% - 20px);
                  
                    text-align: right;
                        padding-right: 20px;
                 
                
                    .el-button{
                         width: 95px;
                        padding:0px 10px;
                        background-color: rgba(17, 24,49,1);
                        color:#fff;
                        border-color:rgba(17, 24,49,1);
                        margin-top: 1vh;
                        font-size: 14px;
                        height: 35px;
                    

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
                    width: 90px;
                                height:35px;
                                        
                                        padding:8px 10px !important;
                                        border-color: rgba(17, 24,49,1);
                                        background-color: #fff;
                                        color: rgba(17, 24,49,1);
                                        font-size: 14px;

                                    }
                                    .el-button:hover{ 
                                        
                                        background-color: #fff ;
                                        color: rgba(17, 24,49,1);

                                    }
            }
            .content{
             /deep/ .el-table{
                display: flex;
                overflow-y:  auto !important;
                 .xlxx{
                width: 100%;
               .item{
                   width: 100%;
                   text-align: left !important;margin-bottom:10px;
                   .r{
                       overflow: hidden;
                       max-height: 50px;
                       display:-webkit-box;            //将对象作为弹性伸缩盒子模型显示。

                        -webkit-box-orient:vertical;    //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）

                        -webkit-line-clamp:2;   
                       .xh{
                           color: rgba(17, 24,49,1) !important;
                       }
                   }
               }
           }
                    .el-table__header-wrapper{
                        display: flex;
                        width: 180px !important;;
                         overflow:  hidden !important;
                        .el-table__header{
                           width: 170px !important;
                            overflow:  hidden !important;
                        }

                        table{
                             width: 180px !important;;
                            display: flex !important;
                                    flex-direction: row;
                                    overflow:  hidden !important;
                                    flex-wrap: wrap;

                            thead{
                                 width: 180px !important;;
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
                                        width: 180px !important;;
                                     th{
                                         text-align: left;
                                         width: 180px !important;
                                        padding:13px 0 !important;
                                        background-color:rgba(17, 24,49,1);
                                        color: #fff;
                                        border: 1px solid rgb(142, 144, 153) ;
                                        border-radius: 3px;
                                    }
                                     th:nth-child(7){
                                         height: 280px;
                                    }
                                    th:nth-child(11){
                                         height: 77px;
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
                    font-weight: 600;
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
                                            width: 140px;
                                        td{
                                            text-align: left;
                                            width: 140px !important;
                                            height: 51px;
                                            padding:13px 0 !important;
                                            color: #000;
                                            font-weight:600;
                                            
                                        
                                        }
                                        td:nth-child(7){
                                             height: 280px;
                                        }
                                        td:nth-child(11){
                                            height: 77px;
                                            .el-button{
                                                 font-size: 14px;
                                                 
                                                 margin: 0 20px 15px 0;
                                                 text-decoration: underline;

                                            }
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
                                 .el-pagination__sizes{
                                    position: absolute;
                                    bottom:-30px;
                                    right:45%;
                                }
                                
                                
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
      /deep/.el-dialog__wrapper.all-dialog{
        .el-dialog{
            margin-top: 7vh !important;
            .el-dialog__body{
                padding: 10px 20px 50px 20px;
                    .content{
                        .el-form{
                            width: 100%;
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
                            }
                            .conxl{
                                width: 100%;
                                
                               
                                margin-bottom: 1vh;
                                line-height: 50px;
                                border-bottom: 1px dotted #eee;
                                padding-bottom: 1vh;
                                .el-form-item.left{

                                    width: 100%;
                                    margin-bottom:0;
                                    .el-form-item__label {
                                        color: #000;

                                    }
                                    .el-form-item__content{
                                            
                                    
                                    
                                    .el-textarea {
                                       .el-textarea__inner{
                                                width: 100%;
                                                height: 50px !important;
                                                
                                            } 
                                            .el-textarea__inner:focus {
                                                border-color: rgba(17, 24,49,1);
                                            }
                                    }
                                    .el-textarea__inner{
                                                color: #000;
                                                height: 50px !important;
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
                                 .el-form-item.right{
                                    width: 100%;
                                    margin-bottom:0;
                                     line-height: 50px;
                                    .el-form-item__label {
                                        color: #000;
                                        margin-top: 14px;
                                        margin-bottom: auto;
                                    }
                                    .el-form-item__content{
                           
                             margin-top: 14px;
                                        margin-bottom: auto;
                                    
                                    
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
                            
                            .el-form-item{
                                 width: 97%;
                          
                                margin:4px 0 19px 0;
                                .el-form-item__label {
                                    color: #000;
                                }
                                .el-form-item__content{
                                   
                                   
                                  
                                    .el-date-editor.el-input{

                                    }
                                    .el-select{
                                        width: 100%;

                                    } 
                                    .el-input.is-disabled .el-input__inner{
                                        color: #000;
                                        

                                    }
                                    .el-input{
                                        width: 100%;
                                        .el-input__inner{
                                            width: 100%;
                                            height: 40px;
                                            line-height:40px ;
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

}


</style>