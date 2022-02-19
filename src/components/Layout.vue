<template>
  <div>
    <el-container>
      <el-header>头部</el-header>
      <el-container>
        <el-aside width="200px">菜单</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
</script>

<style scoped lang="less"></style>
