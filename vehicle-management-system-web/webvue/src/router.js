
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Layout from './Layout.vue'


export const constantRouterMap =[
    
    {
        path:'/login',
        name:'login',
        component:()=>import('./pages/login/login.vue'),
        meta: { title:"登录页" }

    },
    {
        path:'/login_m',
        name:'login_m',
        component:()=>import('./pages/login/login_m.vue'),
        meta: { title:"登录页" }

    },
    
    {
        path:'/',
        component:Layout,
        hidden:true,
        children:[{
                path:"home",
                name:"Home",
                component:()=>import("@/pages/home/home")
            },
            {
                    path:'home_m',
                    name:'home_m',
                    component:()=>import('@/pages/home/home_m'),
                    meta: { title:"手机主页" }
            
                },
                {
                    path:"transport",
                    name:"Transport",
                    component:()=>import("@/pages/page/transport/transport")
                },


                {
                    path:"transport_m",
                    name:"Transport_m",
                    component:()=>import("@/pages/page/transport/transport_m")
                },
                {
                    path:"account",
                    name:"Account",
                    component:()=>import("@/pages/page/account/account")
                },

                {
                    path:"account_m",
                    name:"Account_m",
                    component:()=>import("@/pages/page/account/account_m")
                }
            ]

    },

]
export default new Router({
    scrollBehavior:()=>({y:0}),
    routes:constantRouterMap

})