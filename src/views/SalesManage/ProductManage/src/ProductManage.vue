<template>
  <div class="product-manage">
    <page-search v-bind="formConfig"></page-search>
    <yz-table :propsList="list" :tableConfig="tableConfig">
      <template #handle>
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </template> </yz-table
    >`
  </div>
</template>
<script lang="ts">
export default {
  name: "productManage"
};
</script>
<script setup lang="ts">
import pageSearch from "@/components/page-search";
import { YzTable } from "@/base-ui/table";
import { useSaleStore } from "@/store/modules/sales";
import { storeToRefs } from "pinia";
import { formConfig, tableConfig } from "../config";
const saleStore = useSaleStore();
saleStore.getProductList();
const { list } = storeToRefs(saleStore);
const handleEdit = (v1: any, v2: any) => {
  console.log(v1, v2);
};
const handleDelete = (v1: any, v2: any) => {
  console.log(v1, v2);
};
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
