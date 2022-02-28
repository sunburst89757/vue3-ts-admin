<template>
  <div class="menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo menus"
      :default-active="menuActive"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <template v-for="menu in asyncRoutes" :key="menu.path">
        <el-sub-menu
          :index="menu.path"
          v-if="menu.children && menu.children.length > 0"
        >
          <template #title>
            <!-- <el-icon><component :is="menu.icon"></component></el-icon> -->
            <el-icon><icon-menu></icon-menu></el-icon>
            <span>{{ (menu.meta as any).name }}</span>
          </template>
          <el-menu-item
            :index="menuItem.path"
            v-for="menuItem in menu.children"
            :key="menuItem.path"
            @click="sendMessageToTabs({
              title:(menuItem.meta as any).name as string,
              path:menuItem.name as string
            },$event)"
          >
            <el-icon><setting /></el-icon>
            <template #title>{{ (menuItem.meta as any).name }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="menu.path"
          @click="sendMessageToTabs({
              title:(menu.meta as any).name as string,
              path:menu.name as string
            },$event)"
        >
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ (menu.meta as any).name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { asyncRoutes } from "@/router";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { tabsStore } from "@/store";
import { Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { ref, reactive, defineExpose } from "vue";
const router = useRouter();
interface tabType {
  title: string;
  path: string;
}
let { menuActive } = storeToRefs(tabsStore);
let isCollapse = ref(false);
let tabOption: tabType = {
  title: "",
  path: ""
};
const isTabInTabs = (tab: tabType) => {
  const flag = tabsStore.$state.tabs.some((item) => {
    return item === tab;
  });
  return flag;
};
// 点击菜单栏一项，tab增加一栏
const sendMessageToTabs = (menuOption: tabType, event: any) => {
  menuActive.value = event.index;
  tabOption.title = menuOption.title;
  tabOption.path = menuOption.path;
  tabsStore.addTab(tabOption);
  router.push({
    name: menuOption.path
  });
};
console.log("菜单有啥", asyncRoutes);
defineExpose({
  tabOption
});
</script>

<style scoped lang="less">
.menu {
  width: 100%;
  height: 100%;
  .menus {
    width: 100%;
    height: 100%;
  }
}
</style>
