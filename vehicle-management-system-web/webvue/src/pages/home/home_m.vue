<template>
    <div class="home_m">
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
    height: 94vh;
    .container{
        width: 90%;
        background-color: #eee;
        position: fixed;
        left: 0;
        bottom: 0;
       
        overflow-x: hidden;
        overflow-y: auto;
 height:92vh;
        padding: 1vh 5%;
    }
}


</style>