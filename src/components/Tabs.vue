<template>
  <div>
    <el-tabs
      v-model="tabActive"
      type="card"
      closable
      class="demo-tabs tabs"
      @tab-remove="removeTab"
      @tab-click="jumpOtherTab"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import _ from "lodash";
import { storeToRefs } from "pinia";
import { useTabStore } from "@/store/modules/tabs";
import router from "@/router";
const tabsStore = useTabStore();
let { tabs, tabActive, menuActive } = storeToRefs(tabsStore);
const removeTab = (path: string) => {
  if (tabs.value.length > 1) {
    const val = tabs.value.find((item) => {
      return item.path === path;
    });
    _.pull(tabs.value, val);
    tabActive.value = tabs.value[tabs.value.length - 1].path;
    menuActive.value = tabs.value[tabs.value.length - 1].path;
    router.push({
      name: tabActive.value
    });
  } else {
    tabs.value.pop();
    tabs.value.push({
      path: "dashboard",
      title: "首页"
    });
    tabActive.value = "dashboard";
    menuActive.value = "dashboard";
    router.push({
      name: "dashboard"
    });
  }
};
const jumpOtherTab = (val: any) => {
  menuActive.value = val.props.name;
  console.log(val.props.name, "route的name");
  router.push({ name: val.props.name });
};
</script>

<style scoped lang="less">
.tabs {
  width: 100%;
  height: 100%;
}
</style>
