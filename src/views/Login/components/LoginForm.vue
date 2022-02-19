<template>
  <div>
    <el-form
      ref="ruleFormRef"
      class="login-form"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          prefix-icon="user"
          style="width: 350px; margin-bottom: 20px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          show-password
          placeholder="请输入密码"
          prefix-icon="lock"
          style="width: 350px; margin-bottom: 20px"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from "vue";
import { FormInstance, ILoginType } from "./types";
import cache from "@/utils/cache";
import { userStore } from "@/store";
const ruleFormRef = ref<FormInstance>();
const rules = reactive({
  username: [
    {
      required: true,
      message: "用户名是必填项，请输入用户名",
      trigger: "blur"
    },
    {
      min: 3,
      max: 5,
      message: "用户名长度是3-5位",
      trigger: "blur"
    }
  ],
  password: [
    {
      min: 6,
      max: 15,
      message: "密码长度必须是6-15位",
      trigger: "blur"
    }
  ]
});
let loginForm = reactive<ILoginType>({
  username: cache.getCache("username") || "",
  password: cache.getCache("password") || ""
});
const validate = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      cache.setCache("username", loginForm.username);
      cache.setCache("password", loginForm.password);
      console.log("验证通过进行登录操作");
      userStore.toLogin(loginForm);
    } else {
      console.log("验证失败，提示");
    }
  });
};
// 将验证函数暴露出去，父组件才能使用
defineExpose({ validate });
</script>

<style scoped lang="less">
.login-form {
  position: absolute;
  left: 75px;
  top: 120px;
}
</style>
