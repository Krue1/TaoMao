<template>
  <div>
    <el-drawer
      title="新增商品"
      :before-close="handleClose"
      :visible.sync="_drawerVisible"
      custom-class="add-drawer"
      :show-close="false"
      size="50%"
      ref="drawer"
    >
      <div class="add-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >
            {{ loading ? "提交中 ..." : "确 定" }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "AddDrawer",
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
        region: ""
      },
      formLabelWidth: "80px",
      timer: null
    };
  },
  computed: {
    _drawerVisible: {
      get() {
        return this.drawerVisible;
      },
      set(dv) {
        this.$emit("changeVisible", dv);
      }
    }
  },
  methods: {
    handleClose() {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(() => {
          this.$emit("changeVisible", false);
        })
        .catch(() => {});
    },
    cancelForm() {
      this.$emit("changeVisible", false);
    }
  }
};
</script>

<style lang="scss">
:focus {
  outline: none;
}
.el-drawer {
  padding: 2%;
  padding-top: 0;
  .el-drawer__header {
    margin-bottom: 0;
    padding: 30px;
    padding-left: 2%;
    color: #303133;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #dcdfe6;
  }
  .add-drawer__content {
    margin-top: 30px;
  }
}
</style>