<template>
  <div>
    <YzForm v-bind="formConfig" v-model="formData">
      <template v-slot:footer>
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button icon="rnoefresh">重置</el-button>
      </template>
    </YzForm>
    <div>时间{{ formData.time }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, PropType } from "vue";
import { IForm } from "@/base-ui/form";
import YzForm from "@/base-ui/form";
import { formConfig } from "@/views/SalesManage/ProductManage/config";
import { IFormData } from "../types";
const props = defineProps({
  formConfig: {
    type: Object as PropType<IForm>,
    require: true
  }
});
//  根据formConfig生成搜索的表单项
const formData = reactive<IFormData>({});
formConfig.formItems.forEach((formItem) => {
  formData[`${formItem.field}`] = "";
});
</script>

<style scoped lang="less"></style>
