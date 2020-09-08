<template>
  <div class="top">
    <h3 class="header">{{ name }}</h3>
    <div class="top-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  height: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .header {
    font-weight: bold;
    margin: 0;
    margin-left: 20px;
    font-size: 20px;
    // line-height: 100px;
  }

  .top-inner {
    display: flex;
    justify-content: space-around;
  }
}
</style>