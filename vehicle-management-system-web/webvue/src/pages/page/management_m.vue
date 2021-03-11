<template>
    <div class="management">
        <Header></Header>
        <div class="container"> 
             management  手机页
        </div>
       
    </div>
</template>
<script>
import {Header} from "@/components"
export default {
    components:{
        Header
    }
    
}
</script>
<style scoped lang="scss">
.management{
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