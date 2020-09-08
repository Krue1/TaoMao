<template>
  <div class="home">
    <Nav class="left-view"></Nav>
    <router-view class="right-view" />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav";

export default {
  name: "Home",
  components: {
    Nav
  }
};
</script>

<style scoped lang="scss">
.home {
  overflow-x: hidden;
  .right-view {
    float: left;
    margin-left: 200px;
    padding: 30px;
    padding-top: 0;
    width: calc(100vw - 260px);
    min-height: calc(100vh - 30px);
    background-color: #f5f5fb;
    // background-color: #ddd;
  }
}
</style>