<template>
  <div>
    <el-container class="layout">
      <el-header>
        <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-main>
          <nav-tabs></nav-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from "./Menu.vue";
import NavHeader from "./Header.vue";
import NavTabs from "./Tabs.vue";
import { ref, reactive } from "vue";
</script>

<style scoped lang="less">
.layout {
  height: 100%;
  width: 100%;
}
</style>
