<template>
    <div class="management">
        <div class="title">
            <div class="ti">
                货运明细

            </div>
            
            <div class="btn_r">
                <el-button class="imp" @click="import_e()">导入</el-button>
                <el-button class="add" @click="beforeadd()">添加<i class="iconfont icon-tianjia" style="font-size:10px;font-weight:600;margin-left:2px;"></i></el-button>
            </div>
            
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
                       :picker-options="pickerOptions"
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
                     <el-form-item label="规格" prop="specs">
                        <el-select v-model="searchdata.specs" 
                         >
                               <el-option-group
                            v-for="group in specs_options"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-option-group>
                        </el-select>
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
            <div class="right-title">
                    <div class="ti">
                        总米数(米)：

                    </div>
                    <div class="de">
                        {{sumMeters}} 

                    </div>
                    

            </div>
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
                width="150"
                align="center"
                
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="billDate"
                label="时间"
                width="120"
                align="center"
             >
                </el-table-column>

                 <el-table-column
                prop="oil"
                label="油耗(L)"
                width="120"
                align="center"
                >
                </el-table-column>

                 <el-table-column
                prop="loadingPlace"
                label="装货地"
                width="140"
                align="center"
                >
                </el-table-column>
                 <el-table-column
                prop="unloadingPlace"
                label="卸货地"
                width="140"
                align="center"
                >
                </el-table-column>

               
                <el-table-column
                prop="specs"
                label="规格"
                width="150"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="meters"
                label="米数"
                width="120"
                align="center"
                >
                </el-table-column>

                 <el-table-column
                prop="ratio"
                label="系数"
                width="120"
                align="center"
                >
                </el-table-column>
                 <el-table-column
                prop="tonnage"
                label="吨位(吨)"
                width="120"
                align="center"
                >
                 </el-table-column>


                <el-table-column
                prop="unitPrice"
                label="单价(元)"
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
                prop="remark"
                label="备注"
                width="130"
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
        :close-on-click-modal="false"
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
                         popper-class="add-popper"
                            v-model="add_data.billDate"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                             value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="油耗(L)"  prop="oil">
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
                       

                         <el-select v-model="add_data.specs" placeholder="请选择"
                         @change="specs_change"
                         >
                               <el-option-group
                            v-for="group in specs_options"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-option-group>
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
                     <el-form-item label="吨位(吨)" prop="tonnage">
                        <el-input :readonly="true" :disabled="true" v-model="add_data.tonnage"  :placeholder="add_placeholder.tonnage"></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="单价(元)" prop="unitPrice">
                        <el-input @input="getmoney()"  v-model="add_data.unitPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="运费(元)" prop="money">
                        <el-input  v-model="add_data.money" :placeholder="add_placeholder.money"></el-input>
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
        :close-on-click-modal="false"
         >
        <div class="content">
            <el-form ref="updateform"  label-width="100px" :model="update_data" :rules="addrule">
               <div class="con">
                    <el-form-item label="车牌号"  prop="carNum">
                        <el-input disabled v-model="update_data.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="拉货日期" prop="billDate">
                         <el-date-picker

                         popper-class="add-popper"
                            v-model="update_data.billDate"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                             value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="油耗(L)"  prop="oil">
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
                         

                        <el-select v-model="update_data.specs" placeholder="请选择"
                         @change="specs_change_update"
                         >
                               <el-option-group
                            v-for="group in specs_options"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-option-group>
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
                     <el-form-item label="吨位(吨)" prop="tonnage">
                        <el-input :readonly="true" :disabled="true" v-model="update_data.tonnage" :placeholder="update_placeholder.tonnage"></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="单价(元)" prop="unitPrice">
                        <el-input @input="getmoney_update()"  v-model="update_data.unitPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="运费(元)" prop="money">
                        <el-input  v-model="update_data.money" :placeholder="update_placeholder.money"></el-input>
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
            :close-on-click-modal="false"
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
                    <el-form-item label="油耗(L)"  prop="oil">
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

                         

                        <el-select v-model="detail_data.specs" disabled
                         >
                               <el-option-group
                            v-for="group in specs_options"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-option-group>
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
                     <el-form-item label="吨位(吨)" prop="tonnage">
                        <el-input disabled v-model="detail_data.tonnage" ></el-input>
                    </el-form-item>

               </div>
               <div class="con">
                   <el-form-item label="单价(元)" prop="unitPrice">
                        <el-input disabled v-model="detail_data.unitPrice"></el-input>
                    </el-form-item>
                        <el-form-item label="运费(元)" prop="money">
                        <el-input disabled v-model="detail_data.money"></el-input>
                    </el-form-item>
                     <el-form-item label=" 备注" prop="remark">
                        <el-input disabled v-model="detail_data.remark"></el-input>
                    </el-form-item>

               </div>
              
                
           </el-form>
        </div>
        </el-dialog>

         <!-- 导入 弹窗 -->
       <el-dialog
            class="dialog"
            title="导入"
            :visible.sync="import_open"
            :modal-append-to-body='false'
            width="40%"
            :close-on-click-modal="false"
         >
        <div class="content" style="height:300px;">
             <!-- <Upload name="file" :drag="true" :on-error="onError" :on-success="onSuccess" :limit="1" multiple :on-change="onChange"  :file-list="fileList" :action="action">
                <el-button class="clitoup">点击上传</el-button>
                </Upload> -->
                <UploadFile :url="`http://121.4.245.39/api/excel/importExcelt`" />
        </div>
        </el-dialog>
    </div>
</template>
<script>
import transportApi from '@/api/transport/transport';
import Upload from '@/components/Upload/upload';
import UploadFile from '@/components/Uploade/upload';

import gobutton from '@/components/Upload/com/button';
export default {
    components:{
        Upload,
        gobutton,
        UploadFile
    },
    data(){
        return{
            fileList:[],
            action:'http://121.4.245.39/api/excel/importExcelt',
            import_open:false,
            sumMeters:0,
             pickerOptions:{
                disabledDate: time => {
                   
                        const date = new Date()
                        return time > date
                    }
                

            },
            pagesize:10,
            currentPage: 1,
            total:0,
         

            start_end_date:[],
            specs_options: [
            {
                label: '--基本型号--',
                options: [
                    // 300 *
                {
                value: '300*70',
                label: '300*70'
                }, 
                // 400 * 
                {
                value: '400*60(0.15)',
                label: '400*60 (0.15)'
                }, 
                {
                value: '400*60(0.16)',
                label: '400*60 (0.16)'
                }, 
                {
                value: '400*70',
                label: '400*70'
                }, 
                {
                value: '400*95',
                label: '400*95'
                }, 
                // //488 *
                // {
                // value: '488*300',
                // label: '488*300'
                // }, 
                
                //500 * 
                {
                value: '500*65(基本型号)',
                label: '500*65 (基本型号)'
                }
                ,
                 {
                value: '500*100',
                label: '500*100'
                }, 
                {
                value: '500*125',
                label: '500*125'
                },
                {
                value: '500*310',
                label: '500*310'
                },

                //550 *

                 {
                value: '550*70',
                label: '550*70'
                }, 
                {
                value: '550*100(基本型号)',
                label: '550*100 (基本型号)'
                }
                ,
                {
                value: '550*110',
                label: '550*110'
                },
                 {
                value: '550*310',
                label: '550*310'
                },
                {
                value: '550*350',
                label: '550*350'
                }, 
                

                // 600 *

                {
                value: '600*70',
                label: '600*70'
                },
                {
                value: '600*100',
                label: '600*100'
                },
                {
                value: '600*110',
                label: '600*110'
                },
                {
                value: '600*130',
                label: '600*130'
                }, 
                {
                value: '600*360',
                label: '600*360'
                },
                {
                value: '600*400',
                label: '600*400'
                },
                {
                value: '600*410',
                label: '600*410'
                },
                


                // 700 *
                {
                value: '700*110',
                label: '700*110'
                }, 
                


                // 800 *
                {
                value: '800*110',
                label: '800*110'
                },
                {
                value: '800*130(0.605)',
                label: '800*130 (0.605)'
                },
                {
                value: '800*130(0.684)',
                label: '800*130 (0.684)'
                }
                ]
            }, 
            {
                label: '--竹节桩--',
                options: [
                    // 400 * 
                {
                value: '400*37(60)',
                label: '400*37 (60)'
                }, 
                {
                value: '400*37(95)',
                label: '400*37 (95)'
                }, 
                {
                value: '400*65(竹节)',
                label: '400*65 (竹节)'
                }, 
                //500 * 
                {
                value: '500*65(竹节)',
                label: '500*65 (竹节)'
                }
                ,
                 {
                value: '500*110(台州)',
                label: '500*110 (台州)'
                }, 
                {
                value: '500*460(100)',
                label: '500*460 (100)'
                },
                //550 *

                 {
                value: '550*100(竹节)',
                label: '550*100 (竹节)'
                }, 


                // 600 *

                {
                value: '600*100(台州)',
                label: '600*100 (台州)'
                },
                {
                value: '600*110(台州)',
                label: '600*110 (台州)'
                },
                {
                value: '600*120',
                label: '600*120'
                },
                {
                value: '600*560(100)',
                label: '600*560 (100)'
                }, 
                {
                value: '600*560(110)',
                label: '600*560 (110)'
                },

                 // 650 *
                {
                value: '650*120',
                label: '650*120'
                }, 
                 // 望达小方庄
                {
                value: '望达小方庄',
                label: '望达小方庄'
                }
                ]
            },
            {
                label: '--型钢规格--',
                options: [
                    // 3 * 
                {
                value: '3*9',
                label: '3*9'
                }, 
                // 4 * 
                {
                value: '4*12',
                label: '4*12'
                }, 
                {
                value: '4*15',
                label: '4*15'
                }, 
                // 6 * 
                {
                value: '6*15',
                label: '6*15'
                }, 
                {
                value: '6*18',
                label: '6*18'
                }, 
                //488 *
                {
                value: '488*300',
                label: '488*300'
                }, 
                
                //500 * 
                {
                value: '500*200',
                label: '500*200'
                }
                ,
                //700 * 
                 {
                value: '700*300',
                label: '700*300'
                }, 
                ]
            }],
          
            transport_data:[],
            transport_data_part:[],
            searchdata:{
                carNum:'',
                billDate:'',
                loadingPlace:'',
                unloadingPlace:'',
                specs:''
            },
            tableheight:'200',
            add_placeholder:{
                tonnage:'(系数 * 米数)',
                money:'(吨位 * 单价)'
            },
             update_placeholder:{
                tonnage:'(系数 * 米数)',
                money:'(吨位 * 单价)'
            },
            
            add:false,
            add_data:{
                carNum:'',
                billDate:'',
                oil:'',

                loadingPlace:'',
                unloadingPlace:'',
                specs:'',

                ratio:undefined,
                meters:undefined,
                tonnage:undefined,

                unitPrice:undefined,
                money:undefined,
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
                    { required: true, message: '请输入规格', trigger: 'blur' },
                   
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
                    { required: true, message: '请输入吨位', trigger: 'blur' },
                   
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
                     {
                        required: true,
                        pattern: /^[0-9]+.?[0-9]*$/,
                        message: '请输入数字',
                        trigger: 'change'
                    }
                   
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

                ratio:undefined,
                meters:undefined,
                tonnage:undefined,

                unitPrice:undefined,
                money:undefined,
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

                ratio:undefined,
                meters:undefined,
                tonnage:undefined,

                unitPrice:undefined,
                money:undefined,
                remark:'',
            }


        }
    },
    created(){
        this.init();
        this.tableheight = window.innerHeight/10 * 9.3 - 320 +'px'
    },
    mounted(){
        this.tableheight = window.innerHeight/10 * 9.3 - 320+'px'

    },
    watch:{
        transport_data(){
            this.tableheight = window.innerHeight/10 * 9.3 - 320 +'px'
        },
        "add_data.specs"(){
                this.add_data.tonnage = isNaN((Number(this.add_data.ratio)* Number(this.add_data.meters)))?undefined:(Number(this.add_data.ratio)* Number(this.add_data.meters)).toFixed(5);
                this.add_data.money = isNaN((Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)))?undefined:(Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)).toFixed(5);
               

        },
        'add_data.tonnage'(){
                 this.add_data.money = isNaN((Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)))?undefined:(Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)).toFixed(5);

        },
        "update_data.specs"(){
                this.update_data.tonnage = isNaN((Number(this.update_data.ratio)* Number(this.update_data.meters)))?undefined:(Number(this.update_data.ratio)* Number(this.update_data.meters)).toFixed(5);

                this.update_data.money = isNaN((Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)))?undefined:(Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)).toFixed(5);
               

        },
        'update_data.tonnage'(){
                 this.update_data.money = isNaN((Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)))?undefined:(Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)).toFixed(5);

        }
    },
    methods:{
        onSuccess(){
            this.$message.success("上传成功！");
        },
         onError(){
            this.$message.error("上传失败！");
        },
        onChange(){},
         onExceed() {

    },
        import_e(){
            this.import_open = true;

        },
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
                
                if(this.start_end_date!=null&&this.start_end_date.length!=0){
                    this.searchdata.startDate = this.start_end_date[0];
                    
                    this.searchdata.endDate = this.start_end_date[1];
                }else{
                    delete this.searchdata.startDate;
                    delete this.searchdata.endDate;
                }
             
            
                transportApi.findCarDateList(this.searchdata,res=>{
                
                    
                    if(res.data.code == 0){
                        this.transport_data = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.sumMeters = res.data.sumMeters;
                        this.handleCurrentChange(1); 
                    }
                })

            }
            if(key == '0'){
                this.searchdata = {
                    carNum:'',
                    billDate:'',
                    loadingPlace:'',
                    unloadingPlace:'',
                    specs:''

                }
                this.start_end_date = '';
               

                transportApi.findCarDateList({},res=>{
                  
                    
                    if(res.data.code == 0){
                        this.transport_data = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.sumMeters = res.data.sumMeters;
                        this.handleCurrentChange(1); 
                    }
                })
            }

        },
        specs_change(val){
          // 300 *
            if(val=='300*70'){
                this.add_data.ratio = 0.131;

            }

            // 400 *
            if(val=='400*60(0.15)'){
                this.add_data.ratio = 0.15;

            }
            if(val=='400*60(0.16)'){
                this.add_data.ratio = 0.16;

            }
            if(val=='400*70'){
                this.add_data.ratio = 0.191;

            }
             if(val=='400*95'){
                this.add_data.ratio = 0.228;

            }
            // //488* 
            // if(val=='488*300'){
            //     this.add_data.ratio = 0.129;

            // }
            // 500 *
            if(val=='500*65(基本型号)'){
                this.add_data.ratio = 0.222;

            }
            if(val=='500*100'){
                this.add_data.ratio = 0.314;

            }
            if(val=='500*125'){
                this.add_data.ratio = 0.368;

            }
            if(val=='500*310'){
                this.add_data.ratio = 0.436;

            }

            //550 *
            if(val=='550*70'){
                this.add_data.ratio = 0.264;

            }
            if(val=='550*100(基本型号)'){
                this.add_data.ratio = 0.353;

            }

            if(val=='550*110'){
                this.add_data.ratio = 0.38;

            }
            if(val=='550*310'){
                this.add_data.ratio = 0.568;

            }
            if(val=='550*350'){
                this.add_data.ratio = 0.516;

            }

            //600 *
             if(val=='600*70'){
                this.add_data.ratio = 0.291;

            }
             if(val=='600*100'){
                this.add_data.ratio = 0.393;

            }
            if(val=='600*110'){
                this.add_data.ratio = 0.423;

            }
             if(val=='600*130'){
                this.add_data.ratio = 0.48;

            }
             if(val=='600*360'){
                this.add_data.ratio = 0.646;

            }
             if(val=='600*400'){
                this.add_data.ratio = 0.606;

            }
             if(val=='600*410'){
                this.add_data.ratio = 0.57;

            }
            // 700 *
            if(val=='700*110'){
                this.add_data.ratio = 0.51;

            }

            //800*
            if(val=='800*110'){
                this.add_data.ratio = 0.596;

            }
             if(val=='800*130(0.605)'){
                this.add_data.ratio = 0.605;

            }
            if(val=='800*130(0.684)'){
                this.add_data.ratio = 0.684;

            }

//////////////////////////////竹节桩
             // 400 *
            if(val=='400*37(60)'){
                this.add_data.ratio = 0.15;

            }
            if(val=='400*37(95)'){
                this.add_data.ratio = 0.21;

            }
            if(val=='400*65(竹节)'){
                this.add_data.ratio = 0.21;

            }

             // 500 *
            if(val=='500*65(竹节)'){
                this.add_data.ratio = 0.209;

            }
            if(val=='500*110(台州)'){
                this.add_data.ratio = 0.3;

            }
            if(val=='500*460(100)'){
                this.add_data.ratio = 0.289;

            }
              //550 *
            if(val=='550*100(竹节)'){
                this.add_data.ratio = 0.37;

            }
             //600 *
             if(val=='600*100(台州)'){
                this.add_data.ratio = 0.365;

            }
             if(val=='600*110(台州)'){
                this.add_data.ratio = 0.392;

            }
            if(val=='600*120'){
                this.add_data.ratio = 0.42;

            }
             if(val=='600*560(100)'){
                this.add_data.ratio = 0.365;

            }
             if(val=='600*560(110)'){
                this.add_data.ratio = 0.412;

            }
             // 650 *
            if(val=='650*120'){
                this.add_data.ratio = 0.45;

            }
             // 望达小方庄
            if(val=='望达小方庄'){
                this.add_data.ratio = 0.234;

            }
//////////////////////////型钢规格
 if(val=='3*9'){
                this.add_data.ratio = 0.54;

            }
            if(val=='4*12'){
                this.add_data.ratio = 0.9132;

            }
             if(val=='4*15'){
                this.add_data.ratio = 1.1415;

            }
             if(val=='6*15'){
                this.add_data.ratio = 1.59;

            }
             if(val=='6*18'){
                this.add_data.ratio = 1.903;

            }

              //488* 
            if(val=='488*300'){
                this.add_data.ratio = 0.129;

            }
              //500* 
            if(val=='500*200'){
                this.add_data.ratio = 0.0896;

            }
              //700* 
            if(val=='700*300'){
                this.add_data.ratio = 0.185;

            }
        },
        specs_change_update(val){
          
             // 300 *
            if(val=='300*70'){
                this.update_data.ratio = 0.131;

            }

            // 400 *
            if(val=='400*60(0.15)'){
                this.update_data.ratio = 0.15;

            }
            if(val=='400*60(0.16)'){
                this.update_data.ratio = 0.16;

            }
            if(val=='400*70'){
                this.update_data.ratio = 0.191;

            }
             if(val=='400*95'){
                this.update_data.ratio = 0.228;

            }
            // //488* 
            // if(val=='488*300'){
            //     this.add_data.ratio = 0.129;

            // }
            // 500 *
            if(val=='500*65(基本型号)'){
                this.update_data.ratio = 0.222;

            }
            if(val=='500*100'){
                this.update_data.ratio = 0.314;

            }
            if(val=='500*125'){
                this.update_data.ratio = 0.368;

            }
            if(val=='500*310'){
                this.update_data.ratio = 0.436;

            }

            //550 *
            if(val=='550*70'){
                this.update_data.ratio = 0.264;

            }
            if(val=='550*100(基本型号)'){
                this.update_data.ratio = 0.353;

            }

            if(val=='550*110'){
                this.update_data.ratio = 0.38;

            }
            if(val=='550*310'){
                this.update_data.ratio = 0.568;

            }
            if(val=='550*350'){
                this.update_data.ratio = 0.516;

            }

            //600 *
             if(val=='600*70'){
                this.update_data.ratio = 0.291;

            }
             if(val=='600*100'){
                this.update_data.ratio = 0.393;

            }
            if(val=='600*110'){
                this.update_data.ratio = 0.423;

            }
             if(val=='600*130'){
                this.update_data.ratio = 0.48;

            }
             if(val=='600*360'){
                this.update_data.ratio = 0.646;

            }
             if(val=='600*400'){
                this.update_data.ratio = 0.606;

            }
             if(val=='600*410'){
                this.update_data.ratio = 0.57;

            }
            // 700 *
            if(val=='700*110'){
                this.update_data.ratio = 0.51;

            }

            //800*
            if(val=='800*110'){
                this.update_data.ratio = 0.596;

            }
             if(val=='800*130(0.605)'){
                this.update_data.ratio = 0.605;

            }
            if(val=='800*130(0.684)'){
                this.update_data.ratio = 0.684;

            }

//////////////////////////////竹节桩
             // 400 *
            if(val=='400*37(60)'){
                this.update_data.ratio = 0.15;

            }
            if(val=='400*37(95)'){
                this.update_data.ratio = 0.21;

            }
            if(val=='400*65(竹节)'){
                this.update_data.ratio = 0.21;

            }

             // 500 *
            if(val=='500*65(竹节)'){
                this.update_data.ratio = 0.209;

            }
            if(val=='500*110(台州)'){
                this.update_data.ratio = 0.3;

            }
            if(val=='500*460(100)'){
                this.update_data.ratio = 0.289;

            }
              //550 *
            if(val=='550*100(竹节)'){
                this.update_data.ratio = 0.37;

            }
             //600 *
             if(val=='600*100(台州)'){
                this.update_data.ratio = 0.365;

            }
             if(val=='600*110(台州)'){
                this.update_data.ratio = 0.392;

            }
            if(val=='600*120'){
                this.update_data.ratio = 0.42;

            }
             if(val=='600*560(100)'){
                this.update_data.ratio = 0.365;

            }
             if(val=='600*560(110)'){
                this.update_data.ratio = 0.412;

            }
             // 650 *
            if(val=='650*120'){
                this.update_data.ratio = 0.45;

            }
             // 望达小方庄
            if(val=='望达小方庄'){
                this.update_data.ratio = 0.234;

            }
//////////////////////////型钢规格
 if(val=='3*9'){
                this.update_data.ratio = 0.54;

            }
            if(val=='4*12'){
                this.update_data.ratio = 0.9132;

            }
             if(val=='4*15'){
                this.update_data.ratio = 1.1415;

            }
             if(val=='6*15'){
                this.update_data.ratio = 1.59;

            }
             if(val=='6*18'){
                this.update_data.ratio = 1.903;

            }

              //488* 
            if(val=='488*300'){
                this.update_data.ratio = 0.129;

            }
              //500* 
            if(val=='500*200'){
                this.update_data.ratio = 0.0896;

            }
              //700* 
            if(val=='700*300'){
                this.update_data.ratio = 0.185;

            }
           
        },
        beforeadd(){
            this.add_data={
                carNum:'',
                billDate:'',
                oil:'',

                loadingPlace:'',
                unloadingPlace:'',
                specs:'',

                ratio:undefined,
                meters:undefined,
                tonnage:undefined,

                unitPrice:undefined,
                money:undefined,
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
       
                if(isNaN(this.add_data.meters)){
                    this.add_placeholder.tonnage = '请输入正确的米数！'
                    return;
                }
                if(this.add_data.meters==''){
                    this.add_data.tonnage = undefined;
                    this.add_placeholder.tonnage = '(系数 * 米数)'
                    return;
                }
                if(this.add_data.meters!=undefined){
                     
                    this.add_data.tonnage = isNaN((Number(this.add_data.ratio)* Number(this.add_data.meters)))?undefined:(Number(this.add_data.ratio)* Number(this.add_data.meters)).toFixed(5);
                  
                }
                else{
                     this.add_placeholder.tonnage = '(系数 * 米数)'
                }

        },
        getmoney(){

           if(this.add_data.unitPrice==''){
      
                this.add_placeholder.money = '(吨位 * 单价)'
                    this.add_data.money = undefined;
                    return;
                    
            } 
            if(this.add_data.tonnage!=undefined&&this.add_data.meters!=undefined&&this.add_data.unitPrice!=undefined){
                
                 this.add_data.money = isNaN(Number(this.add_data.tonnage) * Number(this.add_data.unitPrice))?undefined:(Number(this.add_data.tonnage) * Number(this.add_data.unitPrice)).toFixed(5);
            }
            else{
                this.add_placeholder.money = '(吨位 * 单价)'
                
            }

        },
        init(){
            
            let data = {
            }
            transportApi.findCarDateList(data,res=>{
           
                
                if(res.data.code == 0){
                    this.transport_data = res.data.data.rows;
                    
                    this.total = res.data.data.total;
                    this.sumMeters = res.data.sumMeters;
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
                 if(isNaN(this.update_data.meters)){
                    this.update_placeholder.tonnage = '请输入正确的米数！'
                    return;
                }
                 if(this.update_data.meters==''){
                    this.update_data.tonnage = undefined;
                    this.update_placeholder.tonnage = '(系数 * 米数)'
                    return;
                }
                 if(this.update_data.meters!=undefined){
                    this.update_data.tonnage = isNaN((Number(this.update_data.ratio)* Number(this.update_data.meters)))?undefined:(Number(this.update_data.ratio)* Number(this.update_data.meters)).toFixed(5);
                }
                else{
                     this.update_placeholder.tonnage = '(系数 * 米数)'
                }
                 
        
                 
            
           

        },
        getmoney_update(){
         

            if(this.update_data.unitPrice==''){
      
                this.update_placeholder.money = '(吨位 * 单价)'
                    this.update_data.money = undefined;
                    return;
                    
            } 
            if(this.update_data.tonnage!=undefined&&this.update_data.meters!=undefined&&this.update_data.unitPrice!=undefined){
                
                 this.update_data.money = isNaN(Number(this.update_data.tonnage) * Number(this.update_data.unitPrice))?undefined:(Number(this.update_data.tonnage) * Number(this.update_data.unitPrice)).toFixed(5);
            }
            else{
                this.update_placeholder.money = '(吨位 * 单价)'
                
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
    height: 93vh;
    .title{
        font-size: 20px;
        width: 99%;
        padding: 1% 0 1% 1%;
        color:rgba(17, 24,49,1);
        font-weight: 600;
  display: flex ;
        .ti{
            width: 20%;
        }
        .btn_r{
            width: 80%;
           
            text-align: right;
            /deep/.el-button.imp{
                    padding: 7px 13px;
                  
                
                    border-color: rgba(17, 24,49,1);
                    background-color: rgba(17, 24,49,1);
                                  color: #fff;
                                  font-size: 0.1rem;
                }
             /deep/.el-button.add{
                    padding: 7px 13px;
                   margin-left: 10px;
                    border-color: rgba(17, 24,49,1);
                    background-color: rgba(17, 24,49,1);
                                  color: #fff;
                                  font-size: 0.1rem;
                }
             .el-button:hover{ 
                                
                    background-color: #fff ;
                    color: rgba(17, 24,49,1);

                }
        }

       
                
               
    }
    .search-part{
        width: 96%;
        border: 1px solid #eee;
        padding: 2%;
        margin-bottom: 10px;
         display: flex;
        /deep/.el-form{
             width: 84%;
            padding-right: 1%;
            
            .con{
                width: 100%;
                display: flex;
                .el-form-item{
                 width: 45%;
                margin-top: 10px !important;
                margin-bottom: 0px;
                .el-form-item__content{
                    width:calc(100% - 100px);
                    .el-date-editor{
                        width: 100%;
                        .el-input__inner{

                        
                          
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
                justify-content: space-between;
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
     
          
        .el-button.cz{
                       background-color: #fff;
                        color:rgba(17, 24,49,1);
                    }
            .el-button{
                width: 50%;
                display: block;
                padding:5px 10px;
                background-color: rgba(17, 24,49,1);
                color:#fff;
                border-color:rgba(17, 24,49,1);
         
              
               margin-top: 50px;
                font-size: 13px;
                font-weight: 600;
                height: 30px;
             
              

            }
             .el-button.cz:hover {
                color: rgba(17, 24,49,1);
                border-color:rgba(17, 24,49,1);
                background-color: #ecf5ff;
            }
             .el-button:hover{ 
                                
                    background-color: #fff ;
                    color: rgba(17, 24,49,1);

                }
        }
    }
     .exlcon{
        width: 100%;
         margin-bottom: 10px;
          line-height:30px;
         display: flex;
        justify-content: space-between;
        /deep/.el-button{
                        height:30px;
                                
                                padding:8px 10px !important;
                                 border-color: rgba(17, 24,49,1);
                                  background-color: rgba(17, 24,49,1);
                                  color: #fff;
                                  font-size: 0.1rem;

            }
            .el-button:hover{ 
                                
                background-color: #fff ;
                 color: rgba(17, 24,49,1);

            }
            .right-title{
                display: flex;
                font-size: 12px;
                font-weight: 600;
                .ti{
                    font-size: 12px;


                }
                .de{
                    color: #e33e33 !important;
                }

            }
    }
    .content{
       /deep/ .el-table{
           .el-table__fixed{
              
                     height: calc(93vh - 280Px) !important;
                   
               .el-table__fixed-body-wrapper{
                  height:calc(93vh - 360Px)  !important;
               
                  table{
                      tbody{
                          tr:last-child{
                              td:first-child{
                                  display: block;
                                  margin-bottom: 5px !important;

                              }
                              

                          }
                      }
                  }
               }
           

           }
           .el-table__fixed-right{
                   height: calc(93vh - 280Px) !important;
              
               right: 6px !important;
            //    .el-table__fixed-body-wrapper{
            //        height:calc(90vh - 276px)  !important;
            //    }
             .el-table__fixed-body-wrapper{
                 height:calc(93vh - 360Px)  !important;
               
                  table{
                      tbody{
                          tr:last-child{
                              td:last-child{
                               display: block;
                                  margin-bottom: 5px !important;

                              }
                              

                          }
                      }
                  }
               }
           }
     
            // 滚动条的宽度
            .el-table__body-wrapper::-webkit-scrollbar {
                width: 7px; // 横向滚动条
                height: 7px; // 纵向滚动条 必写
            }
            // 滚动条的滑块
            .el-table__body-wrapper::-webkit-scrollbar-thumb {
                background-color: #ddd;
                border-radius: 4px;
            }
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
           
                font-weight: 800;
               text-decoration: underline;
               
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
                                    .el-select{
                                        width: 100%;
                                          .el-input__inner{
                                             width: 100%;

                                        }
                                       
                                    }
                                   
                                    .el-input.is-disabled .el-input__inner{
                                        color: #000;
                                        

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