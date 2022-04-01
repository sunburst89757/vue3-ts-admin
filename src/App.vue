<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>
<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
