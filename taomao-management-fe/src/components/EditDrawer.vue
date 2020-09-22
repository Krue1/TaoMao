<template>
  <div>
    <el-drawer
      title="修改商品"
      :before-close="handleClose"
      :visible.sync="_drawerVisible2"
      custom-class="edit-drawer"
      :show-close="false"
      size="38.2%"
      ref="drawer"
      destroy-on-close
    >
      <div class="edit-drawer__content">
        <el-form
          :model="form"
          :rules="rules"
          :label-position="labelPosition"
          ref="form"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item label="头图" :label-width="inlineFormLabelWidth">
                <el-upload
                  class="cover-uploader"
                  :action="'http://localhost:7002/goods/' + form.id + '/cover'"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  :before-upload="beforeCoverUpload"
                >
                  <img v-if="coverPath" :src="coverPath" class="cover" />
                  <i v-else class="el-icon-plus cover-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="图片" :label-width="inlineFormLabelWidth">
                <el-upload
                  class="pictureUploader"
                  ref="pictureUploader"
                  list-type="picture"
                  :action="
                    'http://localhost:7002/goods/' + form.id + '/picture'
                  "
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="picturePath"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary"
                    >选取文件</el-button
                  >
                  <el-button
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="uploadPicture"
                    >上传到服务器</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
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
              <el-form-item label="已售" :label-width="inlineFormLabelWidth">
                <el-input
                  v-model.number="soldQuantity"
                  autocomplete="off"
                  class="inline-input"
                  :disabled="true"
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
  name: "EditDrawer",
  props: {
    drawerVisible2: {
      type: Boolean,
      default: false
    },
    editProps: {
      type: Object
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
    let validateNonnegativeInteger = (rule, value, callback) => {
      if (Number.isInteger(value) && value >= 0) {
        callback();
      } else {
        callback(new Error("请输入非负整数"));
      }
    };
    return {
      loading: false,
      labelPosition: "left",
      //需修改
      // soldQuantity: this.editProps.soldQuantity,
      // coverPath: this.editProps.coverPath,
      // picturePath: this.editProps.picturePath,
      soldQuantity: 0,
      coverPath: "",
      picturePath: "",
      // form: {
      //   breed: "",
      //   name: "",
      //   description: "",
      //   image: "",
      //   price: 0.0,
      //   age: 0,
      //   gender: "公",
      //   vaccine: 0,
      //   purebred: false,
      //   insectRepellent: false,
      //   inventory: 0
      // },
      formLabelWidth: "80px",
      inlineFormLabelWidth: "55px",
      timer: null,
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 0,
            max: 60,
            message: "长度在 0 到 60 个字符",
            trigger: "blur"
          }
        ],
        breed: [
          { required: true, message: "请输入猫的品种", trigger: "blur" },
          {
            min: 0,
            max: 20,
            message: "长度在 0 到 20 个字符",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "请输入单价", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" },
          { validator: validateNonnegativeInteger, trigger: "blur" }
        ],
        vaccine: [
          { required: true, message: "请输入疫苗针数", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" },
          { validator: validateNonnegativeInteger, trigger: "blur" }
        ],
        purebred: [
          { required: true, message: "是否纯种", trigger: "change" },
          { type: "boolean", message: "请选择", trigger: "change" }
        ],
        insectRepellent: [
          { required: true, message: "是否驱虫", trigger: "change" },
          { type: "boolean", message: "请选择", trigger: "change" }
        ],
        inventory: [
          { required: true, message: "请输入库存", trigger: "blur" },
          { type: "number", message: "请输入数字类型", trigger: "blur" },
          { validator: validateNonnegativeInteger, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    _drawerVisible2: {
      get() {
        return this.drawerVisible2;
      },
      set(dv) {
        this.$emit("changeVisible2", dv);
      }
    },
    form() {
      return this.$store.state.goods;
    }
  },
  methods: {
    handleClose() {
      if (this.loading) {
        return;
      }
      this.$confirm("确认修改商品信息？")
        .then(() => {
          this.$refs.form.validate(valid => {
            if (valid) {
              //需修改：调用修改商品接口把对象传到后端
              // const _this = this;
              // this.$api
              //   .modifyGoodsById(this.form.id, this.form)
              //   .then(res => {
              //     console.log(res.data);
              //   })
              //   .catch(err => this.$alert(err));
              this.$emit("editGoods");
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs.form.resetFields();
              this.$emit("changeVisible2", false);
            } else {
              this.$message({
                message: "提交失败",
                type: "error"
              });
              return false;
            }
          });
        })
        .catch(err => this.$alert(err));
    },
    cancelForm() {
      this.$emit("changeVisible2", false);
    },
    handleCoverSuccess(res, file) {
      this.coverPath = URL.createObjectURL(file.raw);
    },
    beforeCoverUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadPicture() {
      this.$refs.pictureUploader.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
  .edit-drawer__content {
    margin-top: 30px;
    .inline-form {
      display: flex;
    }
    .cover-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .cover-uploader .el-upload:hover {
      border-color: #61cad7;
    }
    .cover-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .cover {
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
