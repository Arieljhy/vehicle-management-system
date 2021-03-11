<template>
    <div class="app-wrapper">
       
            <Sidebar class="sidebar-container"  :phone="false"></Sidebar>
            
            <div class="app-container">
                <Header/>
                <app-main class="loading-area"></app-main>

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
        width:85%;
        height: 100vh;
        position: absolute;
       top: 0;
       right: 0;
        min-height:calc(100vh - 50px);
        border:1px solid #eee;
    }
}
</style>