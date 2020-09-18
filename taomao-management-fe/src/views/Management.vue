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
        <el-table-column label="名称" width="240" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="breed" label="品种" width="120">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="sale" label="已售" width="120">
        </el-table-column>
        <el-table-column prop="inventory" label="库存" width="120">
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
  </div>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle";
import AddDrawer from "@/components/AddDrawer";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 11
        },
        {
          id: 2,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 4
        },
        {
          id: 3,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 1
        },
        {
          id: 4,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 2
        },
        {
          id: 5,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 4
        },
        {
          id: 6,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 5
        },
        {
          id: 7,
          name: "上海市普陀区金沙江路 1518 弄",
          breed: "牛大哥",
          price: 234,
          sale: 1,
          inventory: 3
        }
      ],
      tableShow: [],
      multipleSelection: [],
      searchText: "",
      pageSize: 5,
      currentPage: 1,
      total: 0,
      drawerVisible: false
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
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
    }
  },
  components: {
    HeaderTitle,
    AddDrawer
  },
  mounted() {
    this.page(1);
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
