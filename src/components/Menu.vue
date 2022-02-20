<template>
  <div class="menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo menus"
      default-active="首页"
      text-color="#fff"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
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
          >
            <el-icon><setting /></el-icon>
            <template #title>{{ menuItem.name }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.name" :route="'/' + menu.path">
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ menu.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia";
import cache from "@/utils/cache";
// import { userStore } from "@/store";
import { Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
// const { menus } = storeToRefs(userStore);
let isCollapse = ref(false);
// const defaultActiveMenuItem = menus.value[0].name;
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const menus = cache.getCache("menus");
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
