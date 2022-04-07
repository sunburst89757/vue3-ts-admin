<template>
  <div class="form">
    <el-table
      ref="multipleTableRef"
      :data="propsList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="isShowSelection"
        type="selection"
        align="center"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        label="序号"
        align="center"
        min-width="500"
      >
      </el-table-column>
      <template
        v-for="tableItemConfig in tableConfig"
        :key="tableItemConfig.label"
      >
        <el-table-column
          v-bind="tableItemConfig"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope" v-if="tableItemConfig?.slotName">
            <slot
              :name="tableItemConfig?.slotName"
              :row="scope.row"
              :filed="tableItemConfig.property"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, PropType, defineEmits } from "vue";
import { ITableConfigType } from "../types";
const props = defineProps({
  propsList: {
    type: Array,
    require: true
  },
  tableConfig: {
    type: Array as PropType<ITableConfigType[]>,
    require: true
  },
  isShowSelection: {
    type: Boolean,
    default: true
  },
  isShowIndex: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(["handleSelection"]);
const handleSelectionChange = (val: any) => {
  emits("handleSelection", val);
};
</script>

<style scoped lang="less">
.form {
  margin-top: 20px;
}
</style>
