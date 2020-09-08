<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<style lang="scss">
@import "./assets/font/font.css";
body {
  margin: 0;
  font-family: "PingFang-RE", "Montserrat-RE", "Microsoft YaHei";
  .el-button,
  .el-input {
    font-family: "PingFang-RE";
  }
}
</style>

<script>
import Layout from "@/views/Layout";
export default {
  name: "App",
  components: {
    Layout
  }
};
</script>
