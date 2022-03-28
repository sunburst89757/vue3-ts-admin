<template>
  <div>
    <el-container class="layout">
      <el-header>
        <nav-header @fold="handleFold"></nav-header>
      </el-header>
      <el-container>
        <el-aside :width="menuWidth">
          <nav-menu :isFold="isFold"></nav-menu>
        </el-aside>
        <el-main class="main">
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
import { ref, reactive, computed } from "vue";
const isFold = ref(false);
const handleFold = (val: boolean) => {
  isFold.value = val;
  console.log("isFold", isFold.value);
};
const menuWidth = computed(() => {
  return isFold.value ? "100px" : "200px";
});
</script>

<style scoped lang="less">
.layout {
  height: 100%;
  width: 100%;
  .main {
    padding-top: 0;
  }
}
</style>
