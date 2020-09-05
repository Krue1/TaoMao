<template>
  <div class="nav">
    <!-- <div class="nav-info">
      <span>我的名字</span>
    </div>-->
    <el-menu
      default-active="news"
      class="nav-menu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <div class="nav-info">
        <span>我的名字</span>
      </div>
      <el-menu-item index="news">
        <i class="el-icon-menu"></i>
        <span slot="title">新闻</span>
      </el-menu-item>
      <el-menu-item index="movie">
        <i class="el-icon-menu"></i>
        <span slot="title">影视</span>
      </el-menu-item>
      <el-menu-item index="music">
        <i class="el-icon-document"></i>
        <span slot="title">音乐</span>
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
          title: "影视",
          index: "movie"
        },
        {
          title: "音乐",
          index: "music"
        },
        {
          title: "笑话",
          index: "jokes"
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case "news":
          this.$router.push({ name: "News" });
          break;
        case "movie":
          this.$router.push({ name: "Movie" });
          break;
        case "music":
          this.$router.push({ name: "Music" });
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
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    }
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
        font-size: 20px;
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
