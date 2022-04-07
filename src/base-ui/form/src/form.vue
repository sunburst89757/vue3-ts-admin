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
                  :modelValue="formData[`${formItem.field}`]"
                  @update:modelValue="handleValueChange($event, formItem.field)"
                ></el-input>
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  class="m-2"
                  :placeholder="formItem.placeholder"
                  style="width: 100%"
                  :modelValue="formData[`${formItem.field}`]"
                  @update:modelValue="handleValueChange($event, formItem.field)"
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
                  :modelValue="formData[`${formItem.field}`]"
                  @update:modelValue="handleValueChange($event, formItem.field)"
                  value-format="x"
                />
                <el-date-picker
                  v-else-if="formItem.otherOptions?.type === 'date'"
                  :type="formItem.otherOptions?.type"
                  placeholder="选择日期"
                  style="width: 100%"
                  :modelValue="formData[`${formItem.field}`]"
                  @update:modelValue="handleValueChange($event, formItem.field)"
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
  formData: {
    type: Object as PropType<any>,
    require: true
  }
});
const emit = defineEmits(["update:formData"]);
const handleValueChange = (value: any, filed: string) => {
  // 只要el-input发生改变，触发这个函数，引起update:formData更新外面传递的formData
  // 只修改的是对应绑定的对象的属性值，因此其他 没有更改的属性也放在这
  // 对于重复的字段直接重写，对象的里面有变量使用[]圈住即可
  emit("update:formData", {
    ...props.formData,
    [filed]: value
  });
};
// const formData = ref(_.cloneDeep(props.modelValue));
// watch(
//   formData,
//   (val) => {
//     console.log("触发");
//     emit("update:modelValue", val);
//   },
//   { deep: true }
// );
</script>

<style scoped lang="less">
.form {
  height: 100%;
}
</style>
