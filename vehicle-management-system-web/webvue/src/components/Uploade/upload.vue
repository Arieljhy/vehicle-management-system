
<template>
  <div class="upload">
    <!--文件上传入口   :on-success="upload_success"  :on-error="upload_error"-->
    <div class="uploadfile">
      <el-upload
        ref="upload"
        class="upload-demo"
        :before-upload="beforeUpload"
        :limit="1"
        accept=".xls,.xlsx"
        drag
        :auto-upload="false"
        :on-exceed="handleExceed"
        :action="url"
        :file-list="filelist"
       
       
       
        :http-request="upload"
      >
       <!-- :on-progress="onProgress" -->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
      </el-upload>
      <el-progress class="pro" v-show="showProcess" :percentage="processLen" color="blue" />
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    </div>
   
 
  </div>
</template>
 
<script>
import transportApi from '@/api/transport/transport';
    import Vue from 'vue'
    import {Upload,Button,Progress,Dialog} from 'element-ui';
    Vue.use(Upload);
 
    Vue.use(Progress);
    Vue.use(Dialog);
    import axios from 'axios';
    
    import {Loading,Message} from 'element-ui';
    axios.defaults.withCredentials = false;
  
    export default {
        name: "UploadFile",
        data(){
          return {
              showProcess:false,
              processLen:0,
            filelist:[],
            loading:false,
            percentage:0,
            tips:'',
            // dialogVisible:false
          }
        },
        props:['url'],
        methods:{
            upload(fileObj){
                if(fileObj.file.length==0){
                    this.$notify({
                        title: '提示',
                        message: '请选择文件',
                        duration: 3000
                    });
                    return;
                }
                let jwttoken = this.getCookie("jwttoken");
                let sheader = '';
                if(jwttoken!=null&&jwttoken!=0&&jwttoken!=-1){
                    sheader = jwttoken;
                }
                let fd = new FormData();
                // console.log("fileeee",fileObj);
                fd.append('file',fileObj.file);
                return axios.request({
                    url: 'api/excel/importExcelt',
                    method: 'post',
                    data: fd,
                    onUploadProgress: progressEvent => {
                    const complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    fileObj.onProgress({ percent: complete })
                    },
                    responseType: 'blob',
                    headers:sheader.length!=0?{
                        'Content-Type': 'multipart/form-data',
                        "jwttoken":sheader
                    }:{
                            'Content-Type': 'multipart/form-data',
                    }
                }).then((res)=>{
           
                 
                    if(res.status==200){
                        if(res.data.size==0){
                            this.$emit("close")
                            this.$emit("init");
                            this.upload_success();

                        }else{
                             this.$emit("close")
                            this.$emit("init");
                            this.$notify({
                                title: '提示',
                                message: '导入的数据中有 错误数据，请将这部分错误数据 修改后，重新上传！',
                                duration: 5000
                            });
                         const disposition = res.headers['content-disposition'];
                            let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
                            fileName= decodeURIComponent(fileName).replace(/\"/g, "").replace(/\s+/g,"")


                            let blob = new Blob([res.data], {
                                type: "application/vnd.ms-excel;charset=utf-8"
                            });
                            let objectUrl = URL.createObjectURL(blob);
                           

                            let a = document.createElement("a");
                            a.href = objectUrl;
                            a.download = fileName;

                            a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
                            window.URL.revokeObjectURL(blob);

                        }
                     
                      
                    }
                    else{
                        this.upload_error();
                    }

                }).catch(
                    error=>{
                        consolee.log("eerror",error);
                    
                     //this.upload_error();
                        // if(fail){
                        //     fail(error);
                        // }else{

                        
                        // }
                    }
                )
            },
            onProgress(val){
                this.showProcess = true;
                this.processLen = val.percent;
                if(val.percent==100){
                     setTimeout(()=>{
                        this.showProcess = false;
                    },500)
                }
            },
            upload_error(response,file,fileList){
             
                 this.$notify({
                    title: '提示',
                    message: '上传失败!!   上传文件不符合要求，请重新上传',
                    duration: 5000
                });
                fileList.splice(fileList.indexOf(file),1);  
              
                
            
                 
            },
            upload_success(response,file,fileList){
                
                this.$message.success("上传成功");
                fileList.splice(fileList.indexOf(file),1);  
                
                //   if(response.code==200){
                //  //状态码为200时则上传成功
                  
                // }else{
                  //状态码不是200时上传失败 从列表中删除
                  //this.$message.success("上传成功");
                    // fileList.splice(fileList.indexOf(file),1);  
                // }

            },
             getCookie(name){
                    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                    if(arr=document.cookie.match(reg))
                    return unescape(arr[2]);
                    else
                    return null;
                },
            beforeUpload(file){
                
                if(this.filelist.length!=0){
                    this.$message.warning('请点击删掉文件')
                }
              
          },
          handleExceed(){
              this.$message.warning("请删除后 重新上传新的 excel文件")
 
          },
          submitUpload(){
            this.loading = true;
         
           
            this.$refs.upload.submit();
           
          },
          ensure(){
            // this.dialogVisible = false;
             this.loading = false;
          }
        }
    }
</script>
 
<style scoped lang="scss">
.upload{
    width: 100%;
  
    .uploadfile{
      width: 100%;
      height:300Px;
  
    position: relative;
    .upload-demo{
        // height: 200px;
        /deep/.el-upload{
            width: 100%;
            .el-upload-dragger{
                width: 100%;
            }
        }
        /deep/ .el-upload-list{
          
                width: 100%;
           
                li.el-upload-list__item{
                    label{
                        .el-icon-upload-success{
                     
                            display: none !important;
                        }
                        .el-icon-close{
                            display: block !important;
                        }
                    

                    }
                    
                }
            }
        

    }
     /deep/.el-button{
         position: absolute;
         right: 0;
         bottom: 0;

            padding: 10Px 12Px;
            background-color: rgba(17, 24,49,1);
            color: #fff;
            border: none;

            }
    
  }
   .loading{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.8;
  }
  .progress{
    /* width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px; */
  }
  .tips{
    color: #409eff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100Px;
    margin-top: -150Px;
  }
}
  
 
</style>
