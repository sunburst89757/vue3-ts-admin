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
          <div class="nav-tabs">
            <nav-tabs></nav-tabs>
          </div>
          <router-view v-slot="{ Component }">
            <transition>
              <keep-alive :include="cacheComponents" :max="10">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from "./NavMenu.vue";
import NavHeader from "./Header.vue";
import NavTabs from "./Tabs.vue";
import { ref, computed, watch } from "vue";
import { useTabStore } from "@/store/modules/tabs";
import { storeToRefs } from "pinia";
// 监视路由变化--对tab进行操作
const tabsStore = useTabStore();
const { cacheComponents } = storeToRefs(tabsStore);
// 折叠菜单操作
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
    .nav-tabs {
      width: 100%;
      height: 50px;
    }
  }
}
</style>
