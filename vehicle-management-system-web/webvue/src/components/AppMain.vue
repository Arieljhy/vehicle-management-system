<template>
    <section class="app-main">
       <el-scrollbar class="app-container">
           <transition name="fade" mode="out-in"> 
               <div class="app-main-container">
                   <keep-alive :exclude="['Home']">
                       <router-view :key="key"></router-view>
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
    position:absolute ;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    top: 2vh;
    .app-main-container{
        background: #fff;
        padding: 0 25px 0;
    }
}
</style>