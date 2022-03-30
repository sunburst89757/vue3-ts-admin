<template>
  <div class="product-manage">
    <yz-form v-bind="formConfig"></yz-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import YzForm from "@/base-ui/form";
import { formConfig } from "./config";
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
</style>
