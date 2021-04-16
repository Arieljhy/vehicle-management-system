<template>
    <div class="home">
        <div class="name">{{name}},</div>
        <div class="title">Welcom to the systerm!</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:''
        }
    },
    created(){
     
    },
    mounted(){
        this.name = this.getCookie('username')!=null?this.getCookie('username'):'默认';
    },
    watch:{
        $router:()=>{
            console.log("sx");
        }
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
.home{
    height: 89vh;
    padding:2vh 2%;
    user-select: none;
    .name{
        height:12vh;
        line-height:12vh;
        font-size:0.33rem;
        font-weight:600;
    }
    .title{
         
        font-size:0.4rem;
        font-weight:600;
    }
}


</style>