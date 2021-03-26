
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Layout from './Layout.vue'


export const constantRouterMap =[
    
    {
        path:'/login',
        name:'login',
        component:()=>import('./pages/login/login.vue'),
  
        meta: {
            title: '登录页',
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },

    },
    {
        path:'/login_m',
        name:'login_m',
        component:()=>import('./pages/login/login_m.vue'),
        meta: {
            title: '登录页',
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },

    },
    
    {
        path:'/',
        component:Layout,
        hidden:true,

        meta: {
            title: '',
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        children:[{
                path:"home",
                name:"Home",
                meta: {
                    title: '',
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
                component:()=>import("@/pages/home/home")
            },
            {
                    path:'home_m',
                    name:'home_m',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component:()=>import('@/pages/home/home_m'),
                 
            
                },
                {
                    path:"transport",
                    name:"Transport",
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component:()=>import("@/pages/page/transport/transport")
                },


                {
                    path:"transport_m",
                    name:"Transport_m",
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component:()=>import("@/pages/page/transport/transport_m")
                },
                {
                    path:"account",
                    name:"Account",
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component:()=>import("@/pages/page/account/account")
                },

                {
                    path:"account_m",
                    name:"Account_m",
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component:()=>import("@/pages/page/account/account_m")
                }
            ]

    },

]
export default new Router({
    scrollBehavior:()=>({y:0}),
    routes:constantRouterMap

})