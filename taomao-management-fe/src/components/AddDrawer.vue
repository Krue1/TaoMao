<template>
  <div>
    <el-drawer
      title="新增商品"
      :before-close="handleClose"
      :visible.sync="_drawerVisible"
      custom-class="add-drawer"
      :show-close="false"
      size="38.2%"
      ref="drawer"
      destroy-on-close
    >
      <div class="add-drawer__content">
        <el-form
          :model="form"
          :rules="rules"
          :label-position="labelPosition"
          ref="form"
        >
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://api.apiopen.top/getJoke"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.image" :src="form.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input
              v-model="form.name"
              autocomplete="off"
              maxlength="60"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="品种" :label-width="formLabelWidth" prop="breed">
            <el-input
              v-model="form.breed"
              autocomplete="off"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="单价"
                :label-width="inlineFormLabelWidth"
                prop="price"
                min="0"
              >
                <el-input
                  v-model.number="form.price"
                  autocomplete="off"
                  class="inline-input"
                >
                  <template slot="suffix">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="年龄"
                :label-width="inlineFormLabelWidth"
                prop="age"
              >
                <el-input
                  v-model.number="form.age"
                  autocomplete="off"
                  class="inline-input"
                  min="0"
                >
                  <template slot="suffix">月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="性别"
                :label-width="inlineFormLabelWidth"
                prop="gender"
              >
                <el-select
                  v-model="form.gender"
                  placeholder="请选择"
                  class="inline-input"
                >
                  <el-option value="公"> </el-option>
                  <el-option value="母"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="疫苗"
                :label-width="inlineFormLabelWidth"
                prop="vaccine"
              >
                <el-input
                  v-model.number="form.vaccine"
                  autocomplete="off"
                  class="inline-input"
                >
                  <template slot="suffix">针</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否纯种"
                :label-width="formLabelWidth"
                prop="purebred"
              >
                <el-switch v-model="form.purebred"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否驱虫"
                :label-width="formLabelWidth"
                prop="insectRepellent"
              >
                <el-switch v-model="form.insectRepellent"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item
                label="已售"
                :label-width="inlineFormLabelWidth"
                prop="sale"
              >
                <el-input
                  v-model.number="form.sale"
                  autocomplete="off"
                  class="inline-input"
                >
                  <template slot="suffix">只</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="库存"
                :label-width="inlineFormLabelWidth"
                prop="inventory"
              >
                <el-input
                  v-model.number="form.inventory"
                  autocomplete="off"
                  class="inline-input"
                >
                  <template slot="suffix">只</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="商品描述"
            :label-width="formLabelWidth"
            prop="description"
          >
            <el-input
              type="textarea"
              placeholder="请输入商品描述"
              v-model="form.description"
              resize="none"
              :autosize="{ minRows: 3, maxRows: 20 }"
            >
            </el-input>
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
    let validatePrice = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("单价不小于0"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      labelPosition: "left",
      form: {
        breed: "",
        name: "",
        description: "",
        image: "",
        price: 0.0,
        age: 0,
        gender: "公",
        vaccine: 0,
        purebred: false,
        insectRepellent: false,
        sale: 0,
        inventory: 0
      },
      formLabelWidth: "80px",
      inlineFormLabelWidth: "55px",
      timer: null,
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 0, max: 60, message: "长度在 0 到 60 个字符", trigger: "blur" }
        ],
        breed: [
          { required: true, message: "请输入猫的品种", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 20 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入单价", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" }
        ],
        vaccine: [
          { type: "number", message: "请输入数字类型", trigger: "blur" }
        ],
        purebred: [
          { required: true, message: "是否纯种", trigger: "change" },
          { type: "boolean", message: "请选择", trigger: "change" }
        ],
        insectRepellent: [
          { required: true, message: "是否驱虫", trigger: "change" },
          { type: "boolean", message: "请选择", trigger: "change" }
        ],
        sale: [
          { required: true, message: "请输入已售数量", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" }
        ],
        inventory: [
          { required: true, message: "请输入库存", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" }
        ]
      }
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
          this.$refs.form.validate(valid => {
            if (valid) {
              //需修改：调用新增商品接口把对象传过去，然后获得插入数据库后的对象传给父组件
              let obj = this.deepClone(this.form);
              obj.id = new Date();
              this.$emit("addGoods", obj);
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs.form.resetFields();
              this.$emit("changeVisible", false);
            } else {
              this.$message({
                message: "提交失败",
                type: "error"
              });
              return false;
            }
          });
        })
        .catch(() => {});
    },
    cancelForm() {
      this.$emit("changeVisible", false);
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss">
:focus {
  outline: none;
}
.inline-input {
  width: 80px;
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
    .inline-form {
      display: flex;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #61cad7;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  /*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
  .el-drawer__body {
    overflow: auto;
    /* overflow-x: auto; */
  }
  /*2.隐藏滚动条，太丑了*/
  .el-drawer__body::-webkit-scrollbar {
    display: none;
  }
}
</style>