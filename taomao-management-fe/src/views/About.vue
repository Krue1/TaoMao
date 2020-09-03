<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" @click="getNews">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    getNews() {
      this.$api
        .getNews({
          params: {
            type: 'top',
            key: '3dc86b09a2ee2477a5baa80ee70fcdf5',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => this.$alert(err));
    },
  },
};
</script>
