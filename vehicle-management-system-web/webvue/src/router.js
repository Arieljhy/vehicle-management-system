import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const constantRouterMap =[
    {
        path:'/',
        redirect: '/login'
    },
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

    }

]
export default new Router({
    scrollBehavior:()=>({y:0}),
    routes:constantRouterMap

})