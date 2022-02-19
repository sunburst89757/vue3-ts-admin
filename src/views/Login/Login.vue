<template>
  <div class="login">
    <h1 class="title">XXXX管理系统</h1>
    <login-panel></login-panel>
  </div>
</template>

<script setup lang="ts">
// login封装的时候实现点击按钮拿到封装到内层的数据使用ref
import LoginPanel from "./components/LoginPanel.vue";
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/img/background.png");
  background-position: center;
  background-repeat: no-repeat;
  .title {
    position: absolute;
    color: #fff;
    top: 10%;
  }
}
</style>
