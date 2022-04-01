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
                  v-model="formData[`${formItem.field}`]"
                ></el-input>
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  class="m-2"
                  :placeholder="formItem.placeholder"
                  style="width: 100%"
                  v-model="formData[`${formItem.field}`]"
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
                  v-model="formData[`${formItem.field}`]"
                  value-format="x"
                />
                <el-date-picker
                  v-else-if="formItem.otherOptions?.type === 'date'"
                  :type="formItem.otherOptions?.type"
                  placeholder="选择日期"
                  style="width: 100%"
                  v-model="formData[`${formItem.field}`]"
                  value-format="x"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="4" :offset="20">
          <slot name="footer"> </slot>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, defineProps, PropType, watch, defineEmits } from "vue";
import type { IFormItem } from "../types";
const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    require: true
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
  },
  modelValue: {
    type: Object as PropType<any>,
    require: true
  }
});
const emit = defineEmits(["update:modelValue"]);
const formData = reactive(_.cloneDeep(props.modelValue));
watch(
  formData,
  (val) => {
    console.log("触发");
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>

<style scoped lang="less">
.form {
  height: 100%;
}
</style>
