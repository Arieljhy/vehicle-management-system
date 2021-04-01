<template>
    <div class="logincon"> 
        <div class="alltit">
            <span class="logo-regin">
            车辆信息管理平台</span>
        </div> 
        <div class="login"> 
            <div class="tittle">
                用户登录
            </div>
            <div class="center">
                 <el-input prefix-icon="iconfont icon-yonghumingtubiao" placeholder="请输入登录名" v-model="username"></el-input>
                <el-input prefix-icon="iconfont icon-Lock"  placeholder="请输入登录密码" type="password" v-model="upwd"></el-input>
                <el-button  class="loginbtn" size="large"  @click="login">登录</el-button>  

            </div>
           
        </div>
         <div class="footertit"> 
            Vehicle information management and control platform
        </div>
            
    </div>
</template>
<script>
import userApi from '../../api/user/user';
import md5 from 'js-md5';
export default {
    data(){
        return{
            tit:"pc端登录",
            username:"",
            upwd:""
        }
    },
    created () {
        var _self = this
 
        document.onkeydown = function(e) {
        var key = window.event.keyCode
    
        if (key === 13) {
            _self.login()
        }
        }
    },
    methods:{
        login(){ 
         
                if(!this.username){
                    this.$message.warning("用户名不能为空");  
                    return;
                }
                if(!this.upwd){
                    this.$message.warning("密码不能为空");       
                    return ;
                }
            //发送ajax请求 使用post方式发送json字符串给后台login
            let data = {
                userId:this.username,
                password:md5(this.upwd),
                tenantId:"eidi-shanghai"
            }
           
           
            
            userApi.login(data,res=>{
                
               
                 if(res.data.code==0){
                     this.$message.success("登录成功");
                      this.setCookie("jwttoken",res.data.jwttoken)
                
                      this.setCookie("username",res.data.data.username)
                     this.$router.replace('/home');
                    
                }else{
                    this.$message.error(res.data.msg);
                    
                    
                    // sessionStorage.setItem("userinfo",JSON.stringify(response.data));
                    // setTimeout(()=>{
                    //     this.$router.push('/personal');
                    // },1000);
                } 
            })               
        }  
        ,
         setCookie(name,value){
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*30);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },

        getCookie(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
        }
    },
    beforeDestroy() {
        document.onkeydown = function(e) {
        var key = window.event.keyCode
    
        if (key === 13) {
    
        }
        }
    },

}
</script>
<style lang="scss" scoped>
.logincon{
    width: 100%;
    height: 100vh;
    background: #243663 url(../../assets/images/Login_bg.jpg) no-repeat center;
    background-position: 80% 80%;
    border-radius: 4px;
    
    .alltit{
        
        width: 100%;
        text-align: center;
        height:20vh;
        line-height: 19vh;
        
        span{
            font-size: 25px;
            color: #fff;
        }

    }
    .login{
        position: absolute;
        width:36%;
        height: 60vh;
        background-color: #fff;
        left:50%;
        top:50%;
        margin-top:-30vh;
        margin-left:-18%;
        border-radius: 4px;
        .tittle{
                font-size: 28px;
                color: #858585;
                text-align: center;
                height: 20vh;
                line-height: 20vh;
        }
        .center{
            padding: 1vh 10%;
           
            /deep/.el-input{
                margin-bottom: 3%;
                .el-input__inner{
                height: 40px;
                border: 1px solid #e4e7eb;
                background: #fcfcfc;
                line-height: 40px;
                padding: 0 14px 0 23px;
             
              
                border-radius: 3px;
                margin-bottom: 1vh;
                    color: #858584;
                    }
                .el-input__prefix{
                    height: 40px;
                    line-height: 40px;
                    color: #858585;

                }
            }
            .loginbtn.el-button{
                 margin-top: 10vh;
                    height: 42px;
                line-height: 42px;
                text-align: center;
                display: block;
                border: 0;
                border-radius: 2px;
                width: 100%;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                // background: -webkit-linear-gradient(left, #17afe8, #2a84ff);
                  background: -webkit-linear-gradient(left, rgb(29, 40, 78), rgb(27, 40, 83));
                padding: 0;
            
            }
        }

    }
     .footertit{
         width: 90%;
        position: absolute;
        bottom: 15px;
        color: #fff;
       
        padding: 0 5%;
        text-align: center;
    }
}
.header{
    width: 100%;
}
.head{
   width: 100%;
    height: 50px;
    line-height: 45px;
    background-color: #fe5929;
    border-radius: 3px;
    margin-bottom: 20px;
    font-size: 16px;
}
#login_btn{
    width:100%;
    height:50px;
    background-color:rgba(224, 222, 222,.2);
    border: none;
    font-size:18px;
}
    
</style>
