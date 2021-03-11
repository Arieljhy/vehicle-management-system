<template>
    <div class="home_m">
        <Header></Header>
        <div class="container"> 
            手机主页
        </div>
        
        
    </div>
</template>
<script>
import { AppMain , Header , Sidebar } from '@/components';
export default {
     components:{
        AppMain,
        Header,
        Sidebar
    },
    
}
</script>
<style scoped lang="scss">
.home_m{
    width: 100%;
    height: 100vh;
    .container{
        width: 100%;
        background-color: #eee;
        position: fixed;
        left: 0;
        bottom: 0;
        height:93vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
}


</style>