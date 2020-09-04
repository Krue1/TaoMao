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
  .right-view {
    float: left;
    margin-left: 210px;
  }
}
</style>