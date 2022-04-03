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
import _ from "lodash";
import { storeToRefs } from "pinia";
import { useTabStore } from "@/store/modules/tabs";
const tabsStore = useTabStore();
let { tabs, tabActive } = storeToRefs(tabsStore);
</script>

<style scoped lang="less">
.tabs {
  width: 100%;
  height: 100%;
}
</style>
