<template>
  <div>
    <el-form class="form" :label-width="labelWidth">
      <el-row>
        <template v-for="formItem in formItems" :key="formItem.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="formItem.label">
              <template v-if="formItem.type === 'input'">
                <el-input
                  :placeholder="formItem.placeholder"
                  style="width: 100%"
                ></el-input>
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  class="m-2"
                  :placeholder="formItem.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in formItem.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="formItem.type === 'datePicker'">
                <el-date-picker
                  v-if="formItem.otherOptions?.type === 'daterange'"
                  :type="formItem.otherOptions?.type"
                  start-placeholder="起始日期"
                  end-placeholder="结束日期"
                  style="width: 100%"
                />
                <el-date-picker
                  v-else-if="formItem.otherOptions?.type === 'date'"
                  :type="formItem.otherOptions?.type"
                  placeholder="选择日期"
                  style="width: 100%"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, PropType } from "vue";
import type { IFormItem } from "../types";
const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>
  },
  colLayout: {
    type: Object,
    default: () => {
      return {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 8
      };
    }
  },
  labelWidth: {
    type: String,
    default: "100px"
  }
});
</script>

<style scoped lang="less">
.form {
  height: 100%;
}
</style>
