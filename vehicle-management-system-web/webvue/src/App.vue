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

  },
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  }
}
</script>

<style>

</style>
