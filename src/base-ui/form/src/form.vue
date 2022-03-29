<template>
  <div>
    <el-form>
      <template>
        <el-row>
          <el-col :span="7">
            <el-form-item label="Password">
              <el-input type="password" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, PropType } from "vue";
import type { IFormItemType } from "../types";
</script>

<style scoped lang="less"></style>
