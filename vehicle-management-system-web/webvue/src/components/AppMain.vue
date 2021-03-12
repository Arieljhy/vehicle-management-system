<template>
    <section class="app-main">
       <el-scrollbar class="app-container">
           <transition name="fade" mode="out-in"> 
               <div class="app-main-container">
                   <keep-alive>
                       <router-view></router-view>
                   </keep-alive>

               </div>

           </transition>
       </el-scrollbar>

    </section>
</template>
<script>
export default {
    data(){
        return{
            // key:true

        }
    },
    computed:{
        key(){
            return this.$route.fullPath
        }
    },
    created(){},
    mounted(){},
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.app-main{
    z-index: 500;
    position:absolute ;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
   
    height: 93vh;

     border: 1px solid #eee;
     
    .app-main-container{
       background-color:#fff;
        padding: 0 25px 0;
    }
}
</style>