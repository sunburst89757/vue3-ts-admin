<template>
  <div class="product-manage">
    <yz-form v-bind="formConfig" v-model="formData"></yz-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import YzForm from "@/base-ui/form";
import { formConfig } from "./config";
const formData = reactive({
  productName: "",
  sport: "",
  timeRange: [],
  time: ""
});
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
</style>
