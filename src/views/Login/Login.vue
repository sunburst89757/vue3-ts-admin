<template>
  <div class="login">
    <LoginPanelVue></LoginPanelVue>
  </div>
</template>

<script setup lang="ts">
// login封装的时候实现点击按钮拿到封装到内层的数据使用ref
import LoginPanelVue from "./components/LoginPanel.vue";
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
}
</style>
