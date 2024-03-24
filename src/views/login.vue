<template>
<div class="loginPage">
  <div class="loginTitle">油品计量信息管理平台V1.0</div>
  <div class="loginBox">
    <div class="itemTitle">油品计量信息管理平台</div>
    <el-input class="loginItem" type="text" :prefix-icon="User" v-model="userName" placeholder="请输入用户名"></el-input>
    <el-input class="loginItem" type="password" :prefix-icon="Lock" v-model="password" placeholder="请输入密码"></el-input>
    <el-button class="loginBtn" @click="loginHome()">登录</el-button>
  </div>
</div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'
export default {
  name: "loginIndex",
  data() {
    return {
      User: User,
      Lock: Lock,
      userName: '',
      password: '',
    }
  },
  methods: {
    loginHome() {
      if(this.userName === 'admin' && this.password === 'admin') {
        this.$router.push('/homePage');
      }
    }
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.loginPage{
  width: 100%;
  height: 100vh;
  /*height: 100%;*/
  background-image: url("./images/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  /*background-attachment: fixed;*/
  background-position: 70% 70%;
  padding: 0;
}
.loginBox {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 30%;
  left: 3%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: center;*/
}
.itemTitle {
  width: 250px;
  text-align: center;
  height: 40px;
  padding: 15px;
  font-size: 18px;
}
.loginItem {
  width: 240px;
  height: 40px;
  margin: 5px;
  padding: 5px 0;
  box-sizing: border-box;
}
.loginBtn {
  width: 240px;
  background-color: #0F3952;
  color: #ffffff;
  margin-top: 20px;
}

.loginTitle {
  color: #ffffff;
  position: absolute;
  top: 10%;
  right: 15%;
  font-size: 48px;
}
.small-message {
  height: 40px;
}
</style>