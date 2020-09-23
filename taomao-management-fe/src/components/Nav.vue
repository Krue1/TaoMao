<template>
  <div class="nav">
    <el-menu
      :default-active="this.$route.path.slice(1)"
      class="nav-menu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <div class="nav-info">
        <span>{{ adminInfo.name }}</span>
      </div>
      <el-menu-item index="news">
        <i class="el-icon-menu"></i>
        <span slot="title">新闻</span>
      </el-menu-item>
      <el-menu-item index="management">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="order">
        <i class="el-icon-document"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="jokes">
        <i class="el-icon-setting"></i>
        <span slot="title">笑话</span>
      </el-menu-item>
      <div class="logout-button">
        <el-button type="text" @click="logout">
          <i class="el-icon-switch-button"></i>
          退出登录
        </el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      activeIndex: "news",
      nav_menu_data: [
        {
          title: "新闻",
          index: "news"
        },
        {
          title: "商品管理",
          index: "management"
        },
        {
          title: "订单管理",
          index: "order"
        },
        {
          title: "笑话",
          index: "jokes"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["setAdminInfoAction", "setTokenAction"]),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case "news":
          this.$router.push({ name: "News" });
          break;
        case "management":
          this.$router.push({ name: "Management" });
          break;
        case "order":
          this.$router.push({ name: "Order" });
          break;
        case "jokes":
          this.$router.push({ name: "Jokes" });
          break;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      localStorage.clear();
      this.setTokenAction("");
      this.setAdminInfoAction({});
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    ...mapState(["adminInfo"])
  }
};
</script>

<style scoped lang="scss">
.nav {
  width: 200px;
  height: 100vh;
  position: fixed;

  .nav-menu {
    width: 100%;
    height: 100vh;
    position: relative;

    .el-menu-item {
      padding: 0 60px !important;
    }

    .nav-info {
      span {
        display: block;
        line-height: 100px;
        width: 100%;
        text-align: center;
        font-weight: bolder;
        font-size: 16px;
      }
    }

    .logout-button {
      width: 80px;
      position: absolute;
      bottom: 30px;
      padding: 0 60px;
      .el-button {
        width: 80px;
        color: #aaa;
        text-align: center;
        margin: 0 auto;
        &:hover {
          color: #18b;
        }
      }
    }
  }
}
</style>
