<template>
  <div class="product-manage">
    <page-search v-bind="formConfig"></page-search>
  </div>
</template>
<script lang="ts">
export default {
  name: "productManage"
};
</script>
<script setup lang="ts">
import { ref, reactive } from "vue";
import pageSearch from "@/components/page-search";
import { formConfig } from "../config";
import { useSaleStore } from "@/store/modules/sales";
const saleStore = useSaleStore();
// saleStore.getProductList();
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
</style>
