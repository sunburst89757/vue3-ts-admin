<template>
  <div class="header">
    头部
    <el-icon @click="handleFold" class="fold-icon">
      <fold />
    </el-icon>
    <el-button @click="logout" type="primary" class="btn">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useTabStore } from "@/store/modules/tabs";
import router from "@/router";
import cache from "@/utils/cache";
const userStore = useUserStore();
const tabsStore = useTabStore();
const logout = () => {
  cache.clearCache();
  userStore.$reset();
  tabsStore.$reset();
  router.push("/login");
};
const isFold = ref(false);
const emit = defineEmits(["fold"]);
const handleFold = () => {
  isFold.value = !isFold.value;
  emit("fold", isFold.value);
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 100%;
  .fold-icon {
    position: absolute;
    left: 10vw;
    top: 20px;
  }
  .btn {
    position: absolute;
    right: 5vw;
    top: 20px;
  }
}
</style>
