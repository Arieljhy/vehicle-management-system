<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{

    }
  },
  created(){

  },
  mounted(){
    if (this._isMobile()) {
      // 跳转至手机端路由
      this.$router.replace("/login_m");
    } else {
      // 跳转至 pc 端路由
      this.$router.replace("/login");
    }

     window.addEventListener('beforeunload', () => this.beforeunloadHandler())

  },
  methods:{

    beforeunloadHandler () {
          let url = window.location.href.split('/#')[1];
          sessionStorage.setItem('currentpage',url);
       
          
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    
        setCookie(name,value){
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*30);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },

        getCookie(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
        } 
  },
destroyed () {
   window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
 },

}
</script>

<style lang="scss" >
</style>
