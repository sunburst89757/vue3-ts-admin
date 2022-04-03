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
import { ref, reactive, onMounted } from "vue";
import pageSearch from "@/components/page-search";
import { formConfig } from "../config";
import { useSaleStore } from "@/store/modules/sales";
const saleStore = useSaleStore();
saleStore.getProductList();
console.log("进行次数");
onMounted(() => {
  console.log("挂载");
});
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
</style>
