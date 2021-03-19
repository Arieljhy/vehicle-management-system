<template>
    <div class="management">
        <div class="title">
            货运明细
            <el-button class="add" @click="beforeadd()">添加<i class="iconfont icon-tianjia" style="font-size:10px;font-weight:600;margin-left:2px;"></i></el-button>
        </div>
      
       <div class="search-part">
           <el-form  label-width="100px" :model="searchdata">
               <div class="con part1">
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
               
                <el-button class="cz" @click.native="search('0')">重置</el-button>
                <el-button @click.native="search('1')">搜索</el-button>
           </div>
           
       </div>
        <div class="exlcon">
           <el-button @click="excel()">导出Excel</el-button>
       </div>
       <div class="content">
           <el-table
                :data="transport_data_part"
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
        <!-- 添加 弹窗 -->
       <el-dialog
       
       class="add-dialog"
        title="添加"
        :visible.sync="add"
        :modal-append-to-body='false'
        width="70%"
         >
        <div class="content">
            <el-form ref="addform" v-if="add_reset" label-width="100px" :model="add_data" :rules="addrule">
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input v-model="add_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="拉货日期" prop="billDate">
                        <!-- <el-input v-model="add_data.billDate"></el-input> -->
                         <el-date-picker
                            v-model="add_data.billDate"
                            type="date"
                            placeholder="选择日期"
                             value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="油耗"  prop="oil">
                        <el-input v-model="add_data.oil"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="装货地"  prop="loadingPlace">
                        <el-input v-model="add_data.loadingPlace"></el-input>
                    </el-form-item>
                        <el-form-item label="卸货地" prop="unloadingPlace">
                        <el-input v-model="add_data.unloadingPlace"></el-input>
                    </el-form-item>
                   
                        <el-form-item label="规格" prop="specs">
                        <!-- <el-input v-model="add_data.specs" disabled></el-input> -->

                          <el-select v-model="add_data.specs" @change="specs_change" placeholder="请选择">
                            <el-option
                            v-for="item in specs_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="系数"  prop="ratio">
                        <el-input disabled v-model="add_data.ratio"></el-input>
                    </el-form-item>
                        <el-form-item label="米数" prop="meters" >
                        <el-input @input="tonnage()"  v-model="add_data.meters"></el-input>
                    </el-form-item>
                     <el-form-item label="吨位" prop="tonnage">
                        <el-input :readonly="true" :disabled="true" v-model="add_data.tonnage" ></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="单价" prop="unitPrice">
                        <el-input @input="getmoney()"  v-model="add_data.unitPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="运费" prop="money">
                        <el-input disabled v-model="add_data.money"></el-input>
                    </el-form-item>
                     <el-form-item label=" 备注" prop="remark">
                        <el-input v-model="add_data.remark"></el-input>
                    </el-form-item>

               </div>
              
                
           </el-form>
           <div class="footer">
               <el-button @click="addFun()" class="btn">确 定</el-button>

           </div>
        </div>
        </el-dialog>

        <!-- 修改 弹窗 -->
       <el-dialog
       class="add-dialog"
        title="修改"
        :visible.sync="update"
        :modal-append-to-body='false'
        width="70%"
         >
        <div class="content">
            <el-form ref="updateform"  label-width="100px" :model="update_data" :rules="addrule">
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="update_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="拉货日期" prop="billDate">
                         <el-date-picker
                            v-model="update_data.billDate"
                            type="date"
                            placeholder="选择日期"
                             value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="油耗"  prop="oil">
                        <el-input v-model="update_data.oil"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="装货地"  prop="loadingPlace">
                        <el-input v-model="update_data.loadingPlace"></el-input>
                    </el-form-item>
                        <el-form-item label="卸货地" prop="unloadingPlace">
                        <el-input v-model="update_data.unloadingPlace"></el-input>
                    </el-form-item>
                   
                        <el-form-item label="规格" prop="specs">
                          <el-select v-model="update_data.specs" @change="specs_change_update" placeholder="请选择">
                            <el-option
                            v-for="item in specs_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="系数"  prop="ratio">
                        <el-input disabled v-model="update_data.ratio"></el-input>
                    </el-form-item>
                        <el-form-item label="米数" prop="meters" >
                        <el-input @input="tonnage_update()"  v-model="update_data.meters"></el-input>
                    </el-form-item>
                     <el-form-item label="吨位" prop="tonnage">
                        <el-input :readonly="true" :disabled="true" v-model="update_data.tonnage" ></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="单价" prop="unitPrice">
                        <el-input @input="getmoney_update()"  v-model="update_data.unitPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="运费" prop="money">
                        <el-input disabled v-model="update_data.money"></el-input>
                    </el-form-item>
                     <el-form-item label=" 备注" prop="remark">
                        <el-input v-model="update_data.remark"></el-input>
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
            class="add-dialog"
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
                    <el-form-item label="拉货日期" prop="billDate">
                         <el-date-picker
                            disabled
                            v-model="detail_data.billDate"
                            type="date"
                            placeholder="选择日期"
                             value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="油耗"  prop="oil">
                        <el-input disabled v-model="detail_data.oil"></el-input>
                    </el-form-item>

               </div>

               <div class="con">
                   <el-form-item label="装货地"  prop="loadingPlace">
                        <el-input disabled v-model="detail_data.loadingPlace"></el-input>
                    </el-form-item>
                        <el-form-item label="卸货地" prop="unloadingPlace">
                        <el-input disabled v-model="detail_data.unloadingPlace"></el-input>
                    </el-form-item>
                   
                        <el-form-item label="规格" prop="specs">

                          <el-select v-model="detail_data.specs" disabled >
                            <el-option
                            v-for="item in specs_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="系数"  prop="ratio">
                        <el-input disabled v-model="detail_data.ratio"></el-input>
                    </el-form-item>
                        <el-form-item label="米数" prop="meters" >
                        <el-input  disabled  v-model="detail_data.meters"></el-input>
                    </el-form-item>
                     <el-form-item label="吨位" prop="tonnage">
                        <el-input disabled v-model="detail_data.tonnage" ></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="单价" prop="unitPrice">
                        <el-input disabled v-model="detail_data.unitPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="运费" prop="money">
                        <el-input disabled v-model="detail_data.money"></el-input>
                    </el-form-item>
                     <el-form-item label=" 备注" prop="remark">
                        <el-input disabled v-model="detail_data.remark"></el-input>
                    </el-form-item>

               </div>
              
                
           </el-form>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import transportApi from '@/api/transport/transport';
export default {
    data(){
        return{
            pagesize:10,
            currentPage: 1,
            total:0,
         

            start_end_date:[],
            specs_options: [{
                value: '300*70',
                label: '300*70 (0.131)'
                }, {
                value: '400*60',
                label: '400*60 (0.15)'
                }, {
                value: '488*300',
                label: '488*300 (0.129)'
                }, {
                value: '500*100',
                label: '500*100 (0.314)'
                }, {
                value: '550*110',
                label: '550*110 (0.38)'
                },
                {
                value: '550*350',
                label: '550*350 (0.516)'
                }, {
                value: '600*110',
                label: '600*110 (0.423)'
                }, {
                value: '700*110',
                label: '700*110 (0.51)'
                }, {
                value: '800*110',
                label: '800*110 (0.596)'
                }
            ],
            transport_data:[],
            transport_data_part:[],
            searchdata:{
                carNum:'',
                billDate:'',
                loadingPlace:'',
                unloadingPlace:''
            },
            tableheight:'200',
            
            add:false,
            add_data:{
                carNum:'',
                billDate:'',
                oil:'',

                loadingPlace:'',
                unloadingPlace:'',
                specs:'550*110',

                ratio:0.38,
                meters:'',
                tonnage:'(系数 * 米数)',

                unitPrice:'',
                money:'(吨位 * 单价)',
                remark:'',

            },
            add_reset:true,
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
                billDate: [
                    { required: true, message: '请输入拉货日期', trigger: 'blur' },
                   
                ],
                oil: [
                    { required: false, message: '请输入拉货日期', trigger: 'blur' },
                   
                ],
                loadingPlace: [
                    { required: true, message: '请输入装货地', trigger: 'blur' },
                   
                ],
                unloadingPlace: [
                    { required: true, message: '请输入卸货地', trigger: 'blur' },
                   
                ],
                specs: [
                    { required: false, message: '请输入规格', trigger: 'blur' },
                   
                ],
                ratio: [
                    { required: false, message: '请输入系数', trigger: 'blur' },
                   
                ],
                meters: [
                    { required: true, message: '请输入米数', trigger: 'blur' },
                    {
                        required: true,
                        pattern: /^[0-9]+.?[0-9]*$/,
                        message: '请输入数字',
                        trigger: 'change'
                    }
                   
                   
                ],
                tonnage: [
                    { required: false, message: '请输入吨位', trigger: 'blur' },
                   
                ],
                unitPrice: [
                    { required: true, message: '请输入单价', trigger: 'blur' },
                    {
                        required: true,
                        pattern: /^[0-9]+.?[0-9]*$/,
                        message: '请输入数字',
                        trigger: 'change'
                    }
                   
                ],
                money: [
                    { required: true, message: '请输入运费', trigger: 'blur' },
                   
                ],

                remark: [
                    { required: false, message: '请输入备注', trigger: 'blur' },
                   
                ],
            },
            detail:false,
            detail_data:{
                carNum:'',
                billDate:'',
                oil:'',

                loadingPlace:'',
                unloadingPlace:'',
                specs:'',

                ratio:'0.38',
                meters:'',
                tonnage:'',

                unitPrice:'',
                money:'',
                remark:'',
            },
            update:false,
            update_data:{
                carNum:'',
                billDate:'',
                oil:'',

                loadingPlace:'',
                unloadingPlace:'',
                specs:'',

                ratio:'0.38',
                meters:'',
                tonnage:'',

                unitPrice:'',
                money:'',
                remark:'',
            }


        }
    },
    created(){
        this.init();
        this.tableheight = window.innerHeight/10 * 9 - 270 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9 - 270 +'px'

    },
    watch:{
        transport_data(){
            this.tableheight = window.innerHeight/10 * 9 - 270 +'px'
        },
        "add_data.specs"(){
                this.add_data.tonnage = (Number(this.add_data.ratio)* Number(this.add_data.meters)).toFixed(5);
               

        },
        'add_data.tonnage'(){
                 this.add_data.money = (Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)).toFixed(5);

        },
        "update_data.specs"(){
                this.update_data.tonnage = (Number(this.update_data.ratio)* Number(this.update_data.meters)).toFixed(5);
               

        },
        'update_data.tonnage'(){
                 this.update_data.money = (Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)).toFixed(5);

        }
    },
    methods:{
        
         excel(){
            transportApi.excelExport(this.searchdata,res=>{
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
             
               
                transportApi.findCarDateList(this.searchdata,res=>{
                   
                    
                    if(res.data.code == 0){
                        this.transport_data = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.handleCurrentChange(1); 
                    }
                })

            }
            if(key == '0'){
                this.searchdata = {
                    carNum:'',
                    billDate:'',
                    loadingPlace:'',
                    unloadingPlace:''

                }
                this.start_end_date = '';
               

                transportApi.findCarDateList({},res=>{
                  
                    
                    if(res.data.code == 0){
                        this.transport_data = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.handleCurrentChange(1); 
                    }
                })
            }

        },
        specs_change(val){
          
            if(val=='300*70'){
                this.add_data.ratio = 0.131;

            }
            if(val=='400*60'){
                this.add_data.ratio = 0.15;

            }
            if(val=='488*300'){
                this.add_data.ratio = 0.129;

            }
            if(val=='500*100'){
                this.add_data.ratio = 0.314;

            }
            if(val=='550*110'){
                this.add_data.ratio = 0.38;

            }
            if(val=='550*350'){
                this.add_data.ratio = 0.516;

            }
            if(val=='600*110'){
                this.add_data.ratio = 0.423;

            }
            if(val=='700*110'){
                this.add_data.ratio = 0.51;

            }
            if(val=='800*110'){
                this.add_data.ratio = 0.596;

            }
           
        },
        specs_change_update(val){
          
            if(val=='300*70'){
                this.update_data.ratio = 0.131;

            }
            if(val=='400*60'){
                this.update_data.ratio = 0.15;

            }
            if(val=='488*300'){
                this.update_data.ratio = 0.129;

            }
            if(val=='500*100'){
                this.update_data.ratio = 0.314;

            }
            if(val=='550*110'){
                this.update_data.ratio = 0.38;

            }
            if(val=='550*350'){
                this.update_data.ratio = 0.516;

            }
            if(val=='600*110'){
                this.update_data.ratio = 0.423;

            }
            if(val=='700*110'){
                this.update_data.ratio = 0.51;

            }
            if(val=='800*110'){
                this.update_data.ratio = 0.596;

            }
           
        },
        beforeadd(){
            this.add_data={
                carNum:'',
                billDate:'',
                oil:'',

                loadingPlace:'',
                unloadingPlace:'',
                specs:'550*110',

                ratio:0.38,
                meters:'',
                tonnage:'(系数 * 米数)',

                unitPrice:'',
                money:'(吨位 * 单价)',
                remark:'',

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
                    let data = this.add_data;
                    transportApi.saveOrUpdateCarData(data,res=>{
                        
                        if(res.data.code==0){
                            this.$message.success("添加成功～");
                            this.init();
                            this.add = false;
                        }
                    })
                } else {
                    this.$message.warning("请将数据填写正确完整")
                }
            })
            
           
        },
        tonnage(){
            if(this.add_data.tonnage.length!=0&&this.add_data.meters.length!=0){
                if(isNaN(Number(this.add_data.ratio)* Number(this.add_data.meters))){
                    this.add_data.tonnage = '请输入正确的米数！'
                }else{
                    this.add_data.tonnage = (Number(this.add_data.ratio)* Number(this.add_data.meters)).toFixed(5);
                    
                }
                 
            }else{
                 this.add_data.tonnage = '正在计算...'
            }
           

        },
        getmoney(){
            if(this.add_data.tonnage.length!=0&&this.add_data.meters.length!=0&&this.add_data.unitPrice.length!=0){
                
                 this.add_data.money = (Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)).toFixed(5);
            }else{
                 this.add_data.money = '正在计算...'
            }

        },
        init(){
            
            let data = {
            }
            transportApi.findCarDateList(data,res=>{
           
                
                if(res.data.code == 0){
                    this.transport_data = res.data.data.rows;
                    
                    this.total = res.data.data.total;
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
        tonnage_update(){
            if(this.update_data.tonnage.length!=0&&this.update_data.meters.length!=0){
                if(isNaN(Number(this.update_data.ratio)* Number(this.update_data.meters))){
                    this.update_data.tonnage = '请输入正确的米数！'
                }else{
                    this.update_data.tonnage = (Number(this.update_data.ratio)* Number(this.update_data.meters)).toFixed(5);
                    
                }
                 
            }else{
                 this.update_data.tonnage = '正在计算...'
            }
           

        },
        getmoney_update(){
            if(this.update_data.tonnage.length!=0&&this.update_data.meters.length!=0&&this.update_data.unitPrice.length!=0){
                
                 this.update_data.money = (Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)).toFixed(5);
            }else{
                 this.update_data.money = '正在计算...'
            }

        },
        updateFun(){
             this.$refs.updateform.validate((valid) => {
                if (valid) {
                    let data = this.update_data;
                    transportApi.saveOrUpdateCarData(data,res=>{
                     
                        if(res.data.code==0){
                            this.$message.success("修改成功～");
                            this.init();
                            this.update = false;
                        }
                    })
                } else {
                    this.$message.warning("请将数据填写正确完整")
                }
            })
            
           
        },
        deleted(row){
            this.$confirm('确定要删除这条数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
                .then(() => {
                    transportApi.delCarDate({id:row.id},res=>{
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
             this.transport_data_part=[];
           
            if(this.currentPage == Math.floor(this.transport_data.length/this.pagesize)+1){
           
                while(i < this.transport_data.length % this.pagesize){

                    this.transport_data_part.push(this.transport_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }else{

                while(i<this.pagesize){
                    this.transport_data_part.push(this.transport_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;

            let i = 0 ;
             this.transport_data_part=[];
           
            if(this.currentPage == Math.floor(this.transport_data.length/this.pagesize)+1){
           
                while(i < this.transport_data.length % this.pagesize){

                    this.transport_data_part.push(this.transport_data[(this.currentPage-1) * this.pagesize +i]);
                    
                    i++;
                }

            }else{

                while(i<this.pagesize){
                    this.transport_data_part.push(this.transport_data[(this.currentPage-1) * this.pagesize +i]);
                    
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
        position: relative;
        /deep/.el-button{
                    padding: 5px 10px;
                    position: absolute;
                    right: 2%;
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
        margin-bottom: 10px;
         display: flex;
        /deep/.el-form{
            width: 90%;
            
            .con{
                width: 100%;
                display: flex;
                .el-form-item{
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
            }
            .con.part1{
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
     
          
        .el-button.cz{
                       background-color: #fff;
                        color:rgba(17, 24,49,1);
                    }
            .el-button{
                display: block;
                padding:0px 10px;
                background-color: rgba(17, 24,49,1);
                color:#fff;
                border-color:rgba(17, 24,49,1);
         
                font-size: 10px;
                height: 23px;
               margin-top: 50px;
              

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
    /deep/.el-dialog__wrapper.add-dialog{
        .el-dialog{
            .el-dialog__body{
                    .content{
                        .el-form{
                            width: 100%;
                        
                            .con{
                            
                                display: flex !important;
                                margin-bottom: 2vh;
                            }
                            .el-form-item{
                                 width: 33%;
                          
                                margin-bottom:0;
                                .el-form-item__label {
                                    color: #000;
                                }
                                .el-form-item__content{
                                   
                                    .el-input.is-disabled .el-input__inner{
                                        color: #606266;
                                        

                                    }
                                  
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
    
}


</style>