<template>
    <div class="home_m">
        <div class="container">
                 <div class="name">{{name}},</div>
                <div class="title">Welcom to the systerm!</div>

        </div>
        
    </div>
</template>
<script>
export default {
       data(){
        return{
            name:''
        }
    },
    created(){},
    mounted(){
        this.name = this.getCookie('username')!=null?this.getCookie('username'):'默认';
    },
    methods:{
        
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
<style scoped lang="scss">
.home_m{
    width: 100%;
    height: 94vh;
    .container{
        width: 90%;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
       
        overflow-x: hidden;
        overflow-y: auto;
 height:92vh;
        padding: 1vh 5%;

         .name{
            height:12vh;
            line-height:12vh;
            font-size:20px;
            font-weight:600;
        }
        .title{
            font-size:20px;
            font-weight:600;
        }
    }
}


</style>