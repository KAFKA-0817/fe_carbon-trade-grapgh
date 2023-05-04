<script>
import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: { Menu },
};
</script>

<template>
  <el-container style="height: 1000px">
    <el-aside width="200px">
      <Menu />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style>
.el-aside {
  padding-top: 20px;
}
</style>
