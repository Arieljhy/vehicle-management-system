<template>
    <article class="menucon phone" v-if="_isMobile()">
        <div class="title"  v-if="!this._isMobile()">
            车辆信息管理平台
        </div>
        <el-menu
        :default-active="defaultActive"

       
        class="el-menu-vertical-demo"
        text-color="rgba(255,255,255,.65)"
        active-text-color="#fff"
        >

        <RouterLink class="goto"  :to="{path:this._isMobile()?'/home_m':'/home'}"  @click.native="closeshow(`home`)"> 
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
                
                <RouterLink class="goto" v-else :to="{path:_isMobile()?`${item.path}_m`:item.path}" :key="`${item.title}-${index}`" @click.native="closeshow(`${item.title}-${index}`)"> 
                    <el-menu-item :index="`${item.title}-${index}`"> 
                               <span>{{item.title}}</span>
                            </el-menu-item>
                </RouterLink>

                
            </template>

        </el-menu>

        
        
    </article>
     <article class="menucon" v-else>
        <div class="title"  v-if="!this._isMobile()">
            车辆信息管理平台
        </div>
        <el-menu
        :default-active="defaultActive"

       
        class="el-menu-vertical-demo"
        text-color="rgba(255,255,255,.65)"
        active-text-color="#fff"
        >

        <RouterLink class="goto"  :to="{path:this._isMobile()?'/home_m':'/home'}"  @click.native="closeshow(`home`)"> 
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
                
                <RouterLink class="goto" v-else :to="{path:_isMobile()?`${item.path}_m`:item.path}" :key="`${item.title}-${index}`" @click.native="closeshow(`${item.title}-${index}`)"> 
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

    data(){
        return{
            defaultActive:'home',
            menus:[],
          
        }
    },
    created(){ 
       


        

    },
     mounted(){
         if(this.$route.fullPath!='/'){
            
    
            this.listmenu();
        
        }
       
            

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
      
                if(res.status == 200){
                    let data = [];
                    for(let i=0;i<res.data.data.length;i++){
                      let obj = Object.assign({},res.data.data[i])
                        data[i]=obj;
                    }
                    
                    this.menus=data;
                    
                }
            })
     
        }

    }
}
</script>
<style lang="scss" scoped>
.menucon.phone{
    user-select: none;
   border-bottom-left-radius: 8Px;
    border-bottom-right-radius: 8Px;
 width: 100%;
   
    border: 1Px solid #000;
    background-color: rgba(17, 24,49,1);
    box-shadow: 0Px 3Px  5Px rgba(17, 24,49,1);
    
    .title{
        width: 100%;
        height:60Px;
        font-size: 18Px;
        line-height:60Px;
        color:#fff;
        text-align: center;
        // padding: 20px 0;
    }
    /deep/.el-menu{
        
        background-color: rgba(17, 24,49,1);
        border: none;
       
        .goto{
            text-decoration: none;
             cursor: pointer !important;

        }
        .el-menu-item {
            height: 45Px;
             line-height: 45Px;
             font-size: 14Px;
            cursor: pointer !important;
              border-radius: 4Px;
             
                color: rgba(255, 255, 255, 7.0);
            
        }
        .el-menu-item.is-active {
            background-color:#505163;
            font-weight: 600;
             box-shadow: 0Px 0Px  1Px #505163;
            
        }
        .el-menu-item:focus, .el-menu-item:hover {
            outline: 0;
            color: #ecf5ff;
            background-color:#505163;
            cursor: pointer;
             box-shadow: 0Px 0Px  5Px #505163;
        }
    }
}
.menucon{
    user-select: none;

    width: 100%;
   
    border: 1px solid #000;
    background-color: rgba(17, 24,49,1);
    box-shadow: 0x 3px  5px rgba(17, 24,49,1);
    
    .title{
        width: 100%;
        height:60px;
        font-size: 18px;
        line-height:60px;
        color:#fff;
        text-align: center;
        // padding: 20px 0;
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
              border-radius: 4px;
             
                color: rgba(255, 255, 255, 7.0);
            
        }
        .el-menu-item.is-active {
            background-color:#505163;
            font-weight: 600;
             box-shadow: 0px 0px  1px #505163;
            
        }
        .el-menu-item:focus, .el-menu-item:hover {
            outline: 0;
            color: #ecf5ff;
            background-color:#505163;
            cursor: pointer;
             box-shadow: 0px 0px  5px #505163;
        }
    }
}

</style>