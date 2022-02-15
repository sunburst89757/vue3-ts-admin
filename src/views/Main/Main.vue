<template>
  <div>这里是Main{{ main }}</div>
  <el-button type="primary">Primary</el-button>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
const main = 6666;
</script>

<style scoped></style>
