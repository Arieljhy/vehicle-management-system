<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  
        <div>
            <el-form>
                 <el-input label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></el-input>
                <el-input label="密码"  placeholder="请输入密码" type="password" v-model="upwd"></el-input>

            </el-form>
           
           
        </div>
        <el-button  size="large" id="login_btn" @click="login">登录</el-button>      
 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
