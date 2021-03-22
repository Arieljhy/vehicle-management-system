<template>

     <div class="header" :class="{'phone':this._isMobile()}">
        <div class="menubtn" >
            <div class="btn" v-if="this._isMobile()" @click="show=!show"><i class="iconfont icon-caidan"></i></div>
        </div>
         
        <div class="info" style="text-align:right;">

            <span class="user" style="margin-right:1%;">
                <i class="iconfont icon-fenpeijiaose" style="font-size:14px;"></i>
                {{name}}
            </span>
            <el-button class="link" type="text" style="color:#e33e33;" @click="logout">
                <i class="iconfont icon-zhuxiao" ></i>
                退出
            </el-button>
        </div>
         <div style="width:100%;position:fixed;left:0;top:7vh;z-index:1001;" v-show="this._isMobile()">
              <transition  name="fade"  >
                <Sidebar v-show="show" :phone="true" @close="show=false"></Sidebar>
            </transition>

        </div>
    </div>
   
     
</template>
<script>
import  Sidebar  from '../Sidebar/index.vue';
export default {
    components:{
        Sidebar
    },
    data(){
        return{
            name:'默认',
            show: false

        }
    },
    created(){},
    mounted(){
        this.show=false;
        this.name = this.getCookie('username')!=null?this.getCookie('username'):'默认';
    },
    methods:{
        _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    
        logout(){
            this.setCookie("jwttoken",-1);
            if (this._isMobile()) {
            // 跳转至手机端路由
            this.$router.replace("/login_m");
            this.$toast({
                            message: '退出成功',
                            position: 'middle',
                            duration: 1000
                    });
            } else {
            // 跳转至 pc 端路由

            this.$router.replace("/login");
            this.$message.success("退出成功");
            }

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


    }
}
</script>
<style lang="scss" scoped>
.phone.header{
    height: 7vh;
    line-height: 7vh;
    background-color: rgba(17, 24,49,1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    .menubtn{
        width: 20%;
        height: 7vh;
        line-height: 7vh;
        padding-left:3%;
        .btn{
            width:50%;
            height:4vh;
            margin: 1.5vh 0 0.5vh 10%;
            line-height: 4vh;
            text-align: center;
            border:1px solid rgba(17, 24,49,1);
            border-radius: 4px;
            //   background-color: #fff;
              background-color: rgba(17, 24,49,1);
            i{
                font-size: 35px;
               color: #fff;
            }
        }
        .btn:hover{
                cursor: pointer;

            }

    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    
    .info{
       color: #fff;
       width:76%;
       padding-right: 4%;
       span{
            font-size:16px;
        }
        .el-button{
          margin: auto;  font-size: 16px;
        }
    }
}
.header{
      z-index: 1001;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom:1px solid rgba(17, 24,49,1);

    
    .info{
        width:78%;
        padding-right: 2%;
        span{
            font-size:14px;
        }
    }
}
</style>