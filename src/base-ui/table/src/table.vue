<template>
  <div class="form">
    <el-table
      ref="multipleTableRef"
      :data="propsList"
      style="width: 100%"
      border
    >
      <el-table-column type="selection"> </el-table-column>
      <template
        v-for="tableItemConfig in tableConfig"
        :key="tableItemConfig.label"
      >
        <!-- 使用有无property区分是否有插槽 -->
        <template v-if="!tableItemConfig?.slotName">
          <el-table-column
            :label="tableItemConfig.label"
            :property="tableItemConfig.property"
            align="center"
            show-overflow-tooltip
          ></el-table-column
        ></template>
        <template v-else>
          <slot :name="tableItemConfig.slotName"></slot>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, PropType } from "vue";
import { ITableConfigType } from "../types";
const props = defineProps({
  propsList: {
    type: Array,
    require: true
  },
  tableConfig: {
    type: Array as PropType<ITableConfigType[]>,
    require: true
  }
});
</script>

<style scoped lang="less">
.form {
  margin-top: 20px;
}
</style>
