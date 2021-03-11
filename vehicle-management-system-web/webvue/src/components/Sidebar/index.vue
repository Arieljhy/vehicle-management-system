<template>
    <article class="menucon">
        <div class="title"  v-if="!this._isMobile()">
            车辆信息管理平台
        </div>
        <el-menu
        :default-active="defaultActive"

       
        class="el-menu-vertical-demo"
        text-color="rgba(255,255,255,.65)"
        active-text-color="#fff"
        >

        <RouterLink class="goto"  :to="{path:this._isMobile()?'/home_m':'/home'}"  @click.native="closeshow(`-1`)"> 
                    <el-menu-item index="home"> 
                               <span>主页</span>
                    </el-menu-item>
                </RouterLink>

            <template v-for="(item,index) in menus" :ref="`menu-${item.title}`"  >
                <el-submenu  v-if="item.children" :index="item.title" :key="item.title">
                    <template>
                        <span>{{item.title}}</span>
                    </template>
                    <template v-for="(child,ind) in item.children" :index="ind" >
                        <RouterLink :to="{path:child.path}" @click.native = "jump" :key="child.title">
                            <el-menu-item :index="child.title"> 
                                {{child.title}}
                            </el-menu-item>

                        </RouterLink>

                    </template>

                </el-submenu>
                
                <RouterLink class="goto" v-else :to="{path:item.path}" :key="`${item.title}-${index}`" @click.native="closeshow(`${item.title}-${index}`)"> 
                    <el-menu-item :index="`${item.title}-${index}`"> 
                               <span>{{item.title}}</span>
                            </el-menu-item>
                </RouterLink>

                
            </template>

        </el-menu>

        
        
    </article>
</template>
<script>
import userApi from '@/api/user/user'
export default {
    name:'sidebar',
    props:['phone'],
    data(){
        return{
            defaultActive:'home',
            menus:[
                {
                    title:'11111',
                    path:"/home",
                    children:[]
                },
                {
                    title:'22222',
                    path:"/login",
                    children:[]
                }
            ]
        }
    },
    created(){

    },
    mounted(){

        this.listmenu();

    },
    methods:{
        closeshow(name){
            this.defaultActive = name;
            this.$emit("close")
        },
         _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    listmenu(){
            this.menus=[];
            userApi.listmenu({},res=>{
                console.log("listmenu",res);
                if(res.status == 200){
                    let data = [].concat(res.data.data);
                    console.log("data",data);
                    data.forEach(item=>{
                        if(this._isMobile()){
                             item.path='/management_m';

                        }else{
                             item.path='/management';
                        }
                       
                        this.menus.push(item);
                    })
                }
            })
        }

    }
}
</script>
<style lang="scss" scoped>
.menucon{
    z-index: 1000;
 width: 100%;
    height:100%;
    border: 1px solid #000;
    background-color: rgba(17, 24,49,1);
    .title{
        width: 100%;
        color:#fff;
        text-align: center;
        padding: 20px 0;
    }
    /deep/.el-menu{
        background-color: rgba(17, 24,49,1);
        border: none;
        .goto{
            text-decoration: none;
             cursor: pointer !important;

        }
        .el-menu-item {
            cursor: pointer !important;
            
        }
        .el-menu-item.is-active {
            background-color:#888;
            
        }
        .el-menu-item:focus, .el-menu-item:hover {
            outline: 0;
            color: #ecf5ff;
            background-color:#303133;
            cursor: pointer;
        }
    }
}

</style>