<template>
  
    <div class="management">
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