<template>
<div>
     <div class="app-wrapper" v-if="!isMobile()">
       
            <Sidebar class="sidebar-container"  :phone="false"></Sidebar>
            
            <div class="app-container">
                <Header/>
                <app-main class="loading-area"></app-main>

            </div>
    </div>

     <div class="layout_m" v-else >
        <Header></Header>
        <div class="container"> 
           <router-view class="loading-area"></router-view>
        </div>
        
        
    </div>
</div>
   
</template>
<script>
import { AppMain , Header , Sidebar } from './components';
export default {
    name:"Layout",
    components:{
        AppMain,
        Header,
        Sidebar
    },
    data(){
        return{

        }
    },
    created(){},
    mounted(){},
    methods:{
        isMobile(){
            let flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
            return flag;
        }

    }
}
</script>
<style lang="scss" scoped>
.app-wrapper{
    position: relative;

    width: 100%;
    height: 100vh;

   .sidebar-container{
       width:14.5%;
       height: 100vh;
       
      background-color: rgba(17, 24,49,1);
       position: absolute;
       top: 0;
       left: 0;
   }
    .app-container{
        width:84.5%;
        height: 100vh;
        position: absolute;
       top: 0;
       right: 0;
        min-height:calc(100vh - 50px);
        border:1px solid #eee;
    }
}
.layout_m{
    width: 100%;
    height: 100vh;
    .container{
        width: 100%;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
        height:94vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>