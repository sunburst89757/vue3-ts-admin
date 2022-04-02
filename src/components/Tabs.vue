<template>
  <div>
    <el-tabs
      v-model="tabActive"
      type="card"
      closable
      class="demo-tabs tabs"
      @tab-remove="tabsStore.removeTab"
      @tab-click="tabsStore.jumpOtherTab"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import _ from "lodash";
import { storeToRefs } from "pinia";
import { useTabStore } from "@/store/modules/tabs";
import { useRoute } from "vue-router";
const route = useRoute();
const tabsStore = useTabStore();
let { tabs, tabActive } = storeToRefs(tabsStore);

watch(route, () => {
  console.log("监听route", route);

  tabsStore.handleTab(route);
});
</script>

<style scoped lang="less">
.tabs {
  width: 100%;
  height: 100%;
}
</style>
