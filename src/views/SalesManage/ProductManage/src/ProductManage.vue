<template>
  <div class="product-manage">
    <page-search v-bind="formConfig"></page-search>
    <!-- ts乱报错 -->
    <div>{{ $filter.formatTimeFromUtc("2019-03-06T08:00:00+08:00") }}</div>
    <div>{{ $filter.formatTimeFromTimeStamp(1318781876) }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import pageSearch from "@/components/page-search";
import { formConfig } from "../config";
import { useSaleStore } from "@/store/modules/sales";
const saleStore = useSaleStore();
saleStore.getProductList();
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
</style>
