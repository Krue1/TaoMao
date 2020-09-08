<template>
  <div>
    <el-drawer
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="_drawerVisible"
      custom-class="add-drawer"
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
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
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
        .then(() => {})
        .catch(() => {});
    },
    cancelForm() {
      this.$emit("changeVisible", false);
    }
  }
};
</script>

<style>
</style>