<template>
  <div>
    <HeaderTitle name="商品管理" class="header-title">
      <template>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" @click="deleteSelection">
          删除所选项
        </el-button>
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchText"
          @keyup.native.enter="search"
        >
        </el-input>
      </template>
    </HeaderTitle>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableShow"
        tooltip-effect="light"
        height="404.65px"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="id"
          label="商品ID"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="名称" width="200" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          prop="breed"
          label="品种"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="inventory"
          label="库存"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="my-page"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="page"
        :total="total"
      ></el-pagination>
    </div>
    <AddDrawer
      @changeVisible="changeVisible"
      :drawerVisible="drawerVisible"
      @addGoods="addGoods"
    ></AddDrawer>
    <EditDrawer
      @changeVisible2="changeVisible2"
      :drawerVisible2="drawerVisible2"
      @editGoods="editGoods"
      :editProps="editProps"
    >
    </EditDrawer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HeaderTitle from "@/components/HeaderTitle";
import AddDrawer from "@/components/AddDrawer";
import EditDrawer from "@/components/EditDrawer";
export default {
  data() {
    return {
      tableData: [],
      tableShow: [],
      multipleSelection: [],
      searchText: "",
      pageSize: 5,
      currentPage: 1,
      total: 0,
      drawerVisible: false,
      drawerVisible2: false,
      editProps: {
        soldQuantity: 0,
        coverPath: "",
        picturePath: ""
      },
      editedGoods: {}
    };
  },
  mounted() {
    //需修改：调用获取全部商品的接口
    let _this = this;
    this.$api
      .getAllGoods()
      .then(res => {
        _this.tableData = res.data.data;
        this.page(1);
      })
      .catch(err => this.$alert(err));
  },
  methods: {
    ...mapActions(["setGoodsAction"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      //需修改：获取商品id，调用接口得到goods，将goods存入vuex
      const _this = this;
      this.$api
        .getGoodsById(row.id, {})
        .then(res => {
          console.log(res.data.data);
          let obj = this.deepClone(res.data.data);
          obj.gender = obj.gender === 1 ? "公" : "母";
          delete obj.soldQuantity;
          delete obj.coverPath;
          delete obj.picturePath;
          _this.editProps.soldQuantity = res.data.data.soldQuantity;
          _this.editProps.coverPath = res.data.data.coverPath;
          _this.editProps.picturePath = res.data.data.picturePath.map(item => {
            return {
              name: item,
              url: "http://47.100.62.222:8003/" + item
            };
          });
          console.log(this.editProps.soldQuantity);
          _this.setGoodsAction(obj);
        })
        .catch(err => this.$alert(err));
      //被修改的商品
      this.editedGoods = row;
      this.drawerVisible2 = true;
    },
    changeVisible2(dv) {
      this.drawerVisible2 = dv;
    },
    editGoods() {
      this.editedGoods = Object.assign(
        this.editedGoods,
        this.$store.state.goods
      );
      this.page(this.currentPage);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("是否删除所选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let itemId = row.id;
          this.tableData = this.tableData.filter(row => row.id !== itemId);
          //需修改：调用删除单个商品的接口完成删除
          this.$api
            .deleteGoodsById(row.id)
            .then(res => {
              if (String(res.code) === "0000") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => this.$alert(err));

          //如果当前页数据项仅为1个 且 当前页不为第一页，则翻到上一页
          let isPage = this.tableShow.length === 1 && this.currentPage !== 1;
          if (isPage) {
            this.currentPage--;
          }
          this.page(this.currentPage);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(error => {
          // console.log(error);
          if (error === "cancel") {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          }
          this.$message.error(error.message);
        });
    },
    page(currentPage) {
      this.currentPage = currentPage;
      //可能需修改：调用查询商品接口-有自带分页查询的情况下
      this.total = this.tableData.length;
      this.tableShow = this.tableData.slice(
        (currentPage - 1) * this.pageSize,
        (currentPage - 1) * this.pageSize + this.pageSize
      );
    },
    deleteSelection() {
      this.$confirm("是否删除所选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let items = this.multipleSelection;
          //需修改：调用删除多个商品的接口完成删除-若没有，则循环调用删除单个的接口
          if (items.length) {
            items.forEach(item => {
              this.$api
                .deleteGoodsById(item.id)
                .then(() => {
                  this.tableData = this.tableData.filter(
                    row => row.id !== item.id
                  );
                })
                .catch(err => this.$alert(err));
              this.tableData = this.tableData.filter(row => row.id !== item.id);
            });
          } else {
            console.log("throw");
            throw new Error("请选择需要删除的商品");
          }
          //如果选中的个数等于该页中数据项个数 且 当前页不为第一页 且 当前页为最后一页，则翻到上一页
          let isPage =
            items.length === this.tableShow.length &&
            this.currentPage > 1 &&
            this.currentPage === Math.ceil(this.total / this.pageSize);
          this.$refs.multipleTable.clearSelection();
          this.multipleSelection.length = 0;
          if (isPage) {
            this.currentPage--;
          }
          this.page(this.currentPage);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(error => {
          // console.log(error);
          if (error === "cancel") {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: error.message
            });
          }
        });
    },
    handleAdd() {
      this.drawerVisible = true;
    },
    changeVisible(dv) {
      this.drawerVisible = dv;
    },
    addGoods(goods) {
      this.tableData.push(goods);
      this.page(this.currentPage);
    },
    search() {
      //需修改
      let _this = this;
      if (this.searchText) {
        this.$api
          .getGoodsByKeyword(this.searchText, {})
          .then(res => {
            _this.tableData = res.data.data;
            _this.page(1);
          })
          .catch(err => this.$alert(err));
      } else {
        this.$api
          .getAllGoods()
          .then(res => {
            _this.tableData = res.data.data;
            this.page(1);
          })
          .catch(err => this.$alert(err));
      }
    }
  },
  components: {
    HeaderTitle,
    AddDrawer,
    EditDrawer
  }
};
</script>

<style scoped lang="scss">
.header-title {
  .el-input,
  .el-button {
    margin-left: 20px;
  }

  .el-input {
    width: 200px;
  }
}

.table {
  .el-button {
    color: #aaa;
    font-size: 20px;
    &:hover {
      color: #61cad7;
    }
  }
  .my-page {
    height: 39.35px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<style lang="scss">
.el-table {
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
</style>
