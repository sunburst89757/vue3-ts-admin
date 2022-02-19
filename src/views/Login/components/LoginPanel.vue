<template>
  <div class="login-panel">
    <div class="left-block"></div>
    <div class="right-block">
      <div class="title1">用户登录</div>
      <LoginFormVue ref="loginFormRef"></LoginFormVue>
      <el-button color="#7d4ce5" class="btn" @click="toLogin">
        立即登录
      </el-button>
      <div>{{ name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { userStore } from "@/store";
import LoginFormVue from "./LoginForm.vue";
const loginFormRef = ref<InstanceType<typeof LoginFormVue>>();
const toLogin = () => {
  loginFormRef.value?.validate();
};
const { name } = storeToRefs(userStore);
</script>

<style scoped lang="less">
.login-panel {
  display: flex;
  width: 900px;
  height: 440px;
  background-color: #fff;
}
.left-block {
  width: 400px;
  height: 440px;
  background-color: #287ed5;
  background-image: url("../../../assets/img/middle.png");
  background-position: center;
  background-repeat: no-repeat;
}
.right-block {
  position: relative;
  width: 500px;
  background-color: #fff;
}

.title1 {
  position: absolute;
  top: 66px;
  left: 220px;
  font: 700 18px "microsoft YaHei";
  color: #333;
}
.btn {
  width: 300px;
  height: 36px;
  position: absolute;
  left: 50%;
  bottom: 66px;
  transform: translate(-50%); /* 50%为自身尺寸的一半 */
  border-radius: 10px;
  color: #fff;
}
.copy-right {
  position: absolute;
  font: 700 14px "microsoft YaHei";
  color: #fff;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%); /* 50%为自身尺寸的一半 */
}
</style>
