<template>
  <div>
    <YzForm v-bind="formConfig" v-model:formData="formData">
      <template v-slot:footer>
        <el-button type="primary" icon="search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button icon="refresh" @click="handleRefresh">重置</el-button>
      </template>
    </YzForm>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import { IForm } from "@/base-ui/form";
import YzForm from "@/base-ui/form";
import { formConfig } from "@/views/SalesManage/ProductManage/config";
import { IFormData } from "../types";
import { useSaleStore } from "@/store/modules/sales";
const props = defineProps({
  formConfig: {
    type: Object as PropType<IForm>,
    require: true
  }
});
const saleStore = useSaleStore();
//  根据formConfig生成搜索的表单项
const formDataOrigin: any = {};
formConfig.formItems.forEach((formItem) => {
  formDataOrigin[`${formItem.field}`] = "";
});
const formData = ref(formDataOrigin);
// 这里必须用ref不能用reactive声明，不然的话这个formdata.productname在搜索的时候始终为空
const handleSearch = () => {
  saleStore.queryParams.productName = formData.value.productName;
  saleStore.getProductList();
};
const handleRefresh = () => {
  formData.value = formDataOrigin;
  saleStore.queryParams = saleStore.originQueryParmas;
  saleStore.getProductList();
};
</script>

<style scoped lang="less"></style>
