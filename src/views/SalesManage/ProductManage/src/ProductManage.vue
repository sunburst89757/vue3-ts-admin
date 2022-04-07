<template>
  <div class="product-manage">
    <page-search v-bind="topConfig"></page-search>
    <page-content :tableConfig="bottomConfig"></page-content>
  </div>
</template>
<script lang="ts">
export default {
  name: "productManage"
};
</script>
<script setup lang="ts">
import { pageSearch } from "@/components/page-search";
import { pageContent } from "@/components/page-content";
import { topConfig } from "../config.top";
import { bottomConfig } from "../config.bottom";
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
.el-table {
  margin-top: 20px;
}
</style>
