<template>
  <div class="pageContent">
    <yz-table
      :propsList="pageInformation.list"
      :tableConfig="tableConfig"
      @handle-selection="selectChange"
    >
      <template #time="scope">
        <el-button type="text">{{ scope.row[`${scope.filed}`] }}</el-button>
      </template>
      <template #handle="scope">
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
      <template #status="scope">
        <el-tag
          class="ml-2"
          :type="scope.row[`${scope.filed}`] == 0 ? 'success' : 'danger'"
          >{{ scope.row[`${scope.filed}`] == 0 ? "在线" : "离线" }}</el-tag
        >
      </template> </yz-table
    >`
    <el-pagination
      v-model:currentPage="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInformation.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { YzTable } from "@/base-ui/table";
import { useSaleStore } from "@/store/modules/sales";
import { storeToRefs } from "pinia";
import { ITableConfigType } from "@/base-ui/table";
const props = defineProps({
  tableConfig: {
    type: Array as PropType<ITableConfigType[]>,
    require: true
  }
});
const saleStore = useSaleStore();
const { pageInformation, queryParams } = storeToRefs(saleStore);
saleStore.getProductList();

const handleEdit = (v1: any, v2: any) => {
  console.log(v1, v2);
};
const handleDelete = (v1: any, v2: any) => {
  console.log(v1, v2);
};
// 多选操作
const selectChange = (val: any) => {
  console.log(val, "多选操作");
};
const handleSizeChange = (val: number) => {
  saleStore.getProductList();
};
const handleCurrentChange = (val: number) => {
  saleStore.getProductList();
};
</script>

<style scoped lang="less">
.pageContent {
  width: 100%;
  height: 100%;
  .pagination {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }
}
</style>
