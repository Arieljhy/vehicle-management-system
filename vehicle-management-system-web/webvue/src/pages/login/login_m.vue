<template>
    <div class="logincon_m"> 
        <div class="alltit">
            <span class="logo-regin">
            车辆信息管控平台</span>
        </div> 
        <div class="login"> 
            <div class="tittle">
                用户登录
            </div>
            <div class="center">
                 <el-input prefix-icon="iconfont iconyonghumingtubiao" placeholder="请输入登录名" type="tel" v-model="username"></el-input>
                <el-input prefix-icon="iconfont iconLock" placeholder="请输入登录密码" type="password" v-model="upwd"></el-input>
                <el-button  class="loginbtn" size="large"  @click="login">登录</el-button>  

            </div>
           
        </div>

        <div class="footertit"> 
            Vehicle information management and control platform
        </div>
            
    </div>
</template>
<script>
import userApi from '../../api/user/login';
import md5 from 'js-md5';
export default {
    data(){
        return{
            tit:"移动端登录",
            username:"",
            upwd:""
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
           
           
             console.log(data);
            userApi.login(data,res=>{
                 console.log("resm",res);
                 if(res.data.code==0){
                     this.$message.success("登录成功")
                    
                }else{
                    this.$message.error("登录失败");
                    // sessionStorage.setItem("userinfo",JSON.stringify(response.data));
                    // setTimeout(()=>{
                    //     this.$router.push('/personal');
                    // },1000);
                } 
            })                
        }   
    }
}
</script>
<style lang="scss" scoped>
.logincon_m{
    width: 100%;
    height: 99vh;
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
        width:90%;
        height: 46vh;
        background-color:rgba(255, 255, 255,0.9);
        left:50%;
        top:50%;
        margin-top:-23vh;
        margin-left:-45%;
        border-radius: 4px;
        .tittle{
                font-size: 20px;
                color: #858585;
                text-align: center;
                height: 14vh;
                line-height: 14vh;
        }
        .center{
           
            padding: 1vh 10%;
           
            /deep/.el-input{
                margin-bottom: 3%;
                .el-input__inner{
                height: 40px;
                border: 1px solid #e4e7eb;
                line-height: 40px;
               padding: 0 14px 0 23px;
             
              
                border-radius: 3px;
                margin-bottom: 1vh;
                    
                    }
                .el-input__prefix{
                    height: 40px;
                    line-height: 40px;

                }
            }
            .loginbtn.el-button{
                 margin-top: 5vh;
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
                background: -webkit-linear-gradient(left, #17afe8, #2a84ff);
                padding: 0;
            
            }
        }

    }
    .footertit{
        width: 96%;
        position: absolute;
        bottom: 5px;
        color: #fff;
       
       
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
