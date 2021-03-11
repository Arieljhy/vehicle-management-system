
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
                path:"management",
                name:"Management",
                component:()=>import("@/pages/page/management")
                },
                {
                    path:'home_m',
                    name:'home_m',
                    component:()=>import('@/pages/home/home_m'),
                    meta: { title:"手机主页" }
            
                },
                {
                    path:"management_m",
                    name:"Management_m",
                    component:()=>import("@/pages/page/management_m")
                    },
            ]

    },

]
export default new Router({
    scrollBehavior:()=>({y:0}),
    routes:constantRouterMap

})