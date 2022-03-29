<template>
  <div class="product-manage">
    <el-form
      ref="ruleFormRef"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="7">
          <el-form-item label="Password" prop="pass">
            <el-input type="password" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Age" prop="age">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="复选框">
            <el-select class="m-2" placeholder="Select" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="挑选">
            <el-date-picker
              type="daterange"
              range-separator="To"
              start-placeholder="起始日期"
              end-placeholder="终止日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="时间选择">
            <el-cascader :options="options1" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const options = [
  {
    value: "选项1",
    label: "黄金糕"
  },
  {
    value: "选项2",
    label: "双皮奶"
  },
  {
    value: "选项3",
    label: "蚵仔煎"
  },
  {
    value: "选项4",
    label: "龙须面"
  },
  {
    value: "选项5",
    label: "北京烤鸭"
  }
];
const options1 = [
  {
    value: "选项1",
    label: "黄金糕"
  },
  {
    value: "选项2",
    label: "双皮奶"
  },
  {
    value: "选项3",
    label: "蚵仔煎"
  },
  {
    value: "选项4",
    label: "龙须面"
  },
  {
    value: "选项5",
    label: "北京烤鸭"
  }
];
</script>

<style scoped lang="less">
.product-manage {
  width: 100%;
  height: 80vh;
}
</style>
