<template>
  <div class="nav-menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo menus"
      :default-active="menuActive"
      text-color="#fff"
      :collapse="isFold"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <template v-for="menu in menus" :key="menu.path">
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
          :index="menu.name"
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
import asyncRoutes from "@/router/asyncRoutes";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTabStore } from "@/store/modules/tabs";
import { useUserStore } from "@/store/modules/user";
import { Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { ref, computed, defineProps } from "vue";
const router = useRouter();

interface tabType {
  title: string;
  path: string;
}
const props = defineProps({
  isFold: Boolean
});
const tabsStore = useTabStore();
const userStore = useUserStore();
let { menuActive } = storeToRefs(tabsStore);
let { menus } = storeToRefs(userStore);
let tabOption: tabType = {
  title: "",
  path: ""
};
// 点击菜单栏一项，tab增加一栏
const sendMessageToTabs = (menuOption: tabType, event: any) => {
  console.log("menuOption", menuOption);
  menuActive.value = event.index;
  tabOption.title = menuOption.title;
  tabOption.path = menuOption.path;
  console.log("tabOption", tabOption);
  // 比较传递tabOption和menuOption为啥结果不一样
  tabsStore.addTab(menuOption);
  router.push({
    name: menuOption.path
  });
};
</script>

<style scoped lang="less">
.nav-menu {
  width: 100%;
  height: 100%;
  .menus {
    width: 100%;
    height: 100%;
  }
}
</style>
