<template>
  <div>
    <YzForm v-bind="formConfig" v-model="formData">
      <template v-slot:footer>
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button icon="refresh">重置</el-button>
      </template>
    </YzForm>
    <div>时间{{ formData.time }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  defineProps,
  computed,
  PropType,
  getCurrentInstance,
  ComponentInternalInstance
} from "vue";
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
const {
  appContext: {
    config: {
      globalProperties: { $filter }
    }
  }
} = getCurrentInstance() as ComponentInternalInstance;
const computeVal = computed(() => {
  console.log("计算");

  return $filter.formatTimeFromGmt(formData.time);
});
</script>

<style scoped lang="less"></style>
