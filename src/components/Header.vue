<template>
  <div class="header">
    头部
    <el-button @click="logout" type="primary">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import router from "@/router";
import cache from "@/utils/cache";
const logout = () => {
  cache.clearCache();
  router.push("/login");
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 100%;
}
</style>
