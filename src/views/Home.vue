<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" icon="brush">按钮</el-button>
    <el-input placeholder="hhhh"></el-input>
    <el-icon><brush /></el-icon>
    <el-icon><Baseball /></el-icon>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld
  }
});
</script>
