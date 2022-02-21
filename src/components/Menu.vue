<template>
  <div class="menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo menus"
      :default-active="menuActive"
      text-color="#fff"
      :collapse="isCollapse"
      router
    >
      <template v-for="menu in menus" :key="menu.id">
        <el-sub-menu
          :index="menu.name"
          v-if="menu.children && menu.children.length > 0"
        >
          <template #title>
            <!-- <el-icon><component :is="menu.icon"></component></el-icon> -->
            <el-icon><icon-menu></icon-menu></el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            :index="menuItem.name"
            v-for="menuItem in menu.children"
            :key="menuItem.id"
            :route="'/salesManage/' + menuItem.path"
            @click="sendMessageToTabs('/salesManage/' + menuItem.path, $event)"
          >
            <el-icon><setting /></el-icon>
            <template #title>{{ menuItem.name }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="menu.name"
          :route="'/' + menu.path"
          @click="sendMessageToTabs('/' + menu.path, $event)"
        >
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ menu.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import cache from "@/utils/cache";
import { tabsStore } from "@/store";
import { Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { ref, reactive, defineExpose, onMounted } from "vue";
// const { menus } = storeToRefs(userStore);
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
// 点击菜单栏一项，tab增加一栏
const sendMessageToTabs = (path: any, event: any) => {
  menuActive.value = event.index;
  tabOption.title = event.index;
  tabOption.path = path;
  tabsStore.addTab(tabOption);
};

const menus = cache.getCache("menus");
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
