<template>
  <div id="order">
    <HeaderTitle name="订单管理" class="header-title">
      <template>
        <el-radio-group v-model="status" @change="page(1)">
          <el-radio-button label="已提交"></el-radio-button>
          <el-radio-button label="已完成"></el-radio-button>
          <el-radio-button label="取消"></el-radio-button>
        </el-radio-group>
      </template>
    </HeaderTitle>
    <div class="table">
      <el-table
        ref="table"
        :data="tableData"
        tooltip-effect="light"
        height="404.65px"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="sid">
                <span>{{ props.row.sid }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="电话号码">
                <span>{{ props.row.phoneNumber }}</span>
              </el-form-item>
              <el-form-item label="总价">
                <span>{{ props.row.totalPrice }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{
                  props.row.province +
                    " " +
                    props.row.city +
                    " " +
                    props.row.district +
                    " " +
                    props.row.address
                }}</span>
              </el-form-item>
              <el-form-item label="下单时间">
                <span>{{ props.row.startTime }}</span>
              </el-form-item>
              <el-form-item label="支付时间">
                <span>{{ props.row.payTime }}</span>
              </el-form-item>
              <el-form-item label="sendTime">
                <span>{{ props.row.sendTime }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{ props.row.finishTime }}</span>
              </el-form-item>
              <el-form-item label="payNumber">
                <span>{{ props.row.payNumber }}</span>
              </el-form-item>
              <el-form-item label="订单状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="account">
                <span>{{ props.row.account }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="sid"
          label="sid"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="姓名" width="120" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="totalPrice" label="总价" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="下单时间" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.row)">
              订单详情
            </el-button>
            <el-tooltip
              content="完成订单"
              placement="bottom"
              :enterable="false"
            >
              <el-button
                v-if="status === '已提交'"
                type="text"
                icon="el-icon-check"
                @click="complete(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="取消订单"
              placement="bottom"
              :enterable="false"
            >
              <el-button
                v-if="status === '已提交'"
                type="text"
                icon="el-icon-close"
                @click="cancel(scope.row)"
              ></el-button>
            </el-tooltip>
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
    <el-dialog
      title="订单详情"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
    >
      <el-card v-for="orderDetail of orderDetails" :key="orderDetail.goodId">
        <div style="display:flex;justify-content:center;">
          <el-form :inline="true" :model="orderDetail">
            <el-form-item label="商品ID">
              <span>{{ orderDetail.goodId }}</span>
            </el-form-item>
            <el-form-item>
              <el-divider direction="vertical"></el-divider>
            </el-form-item>
            <el-form-item label="商品名">
              <span>{{ orderDetail.goodName }}</span>
            </el-form-item>
            <el-form-item>
              <el-divider direction="vertical"></el-divider>
            </el-form-item>
            <el-form-item label="单价">
              <span>{{ orderDetail.price }}</span>
            </el-form-item>
            <el-form-item>
              <el-divider direction="vertical"></el-divider>
            </el-form-item>
            <el-form-item label="数量">
              <span>{{ orderDetail.number }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">
          关 闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle";
export default {
  name: "Order",
  data() {
    return {
      tableData: [
        {
          sid: "1111",
          totalPrice: "23.44",
          name: "来治愈",
          phoneNumber: "13333333",
          province: "广东省",
          city: "广州市",
          district: "海珠区",
          address: "华南农业大学",
          startTime: "2020-09-22 21:29:30",
          payTime: "2020-09-22 21:29:30",
          sendTime: "2020-09-22 21:29:30",
          finishTime: "2020-09-22 21:29:30",
          payNumber: "222",
          status: "已提交",
          account: "223313",
          orderDetails: [
            {
              goodId: "1111",
              number: "3",
              goodName: "橘猫",
              src: "ww",
              orderId: "1111",
              price: 23300
            },
            {
              goodId: "1111",
              number: "3",
              goodName: "橘猫",
              src: "ww",
              orderId: "1111",
              price: 23300
            },
            {
              goodId: "1111",
              number: "3",
              goodName: "橘猫",
              src: "ww",
              orderId: "1111",
              price: 23300
            },
            {
              goodId: "1111",
              number: "3",
              goodName: "橘猫",
              src: "ww",
              orderId: "1111",
              price: 23300
            },
            {
              goodId: "1111",
              number: "3",
              goodName: "橘猫",
              src: "ww",
              orderId: "1111",
              price: 23300
            }
          ]
        }
      ],
      status: "已提交",
      pageSize: 5,
      currentPage: 1,
      total: 250,
      centerDialogVisible: false,
      orderDetails: []
    };
  },
  mounted() {
    this.page(1);
  },
  methods: {
    page(currentPage) {
      this.currentPage = currentPage;
      //需修改
      let _this = this;
      this.$api
        .queryOrderByStatus(
          {
            queryContent: this.status,
            start: (currentPage - 1) * this.pageSize,
            limit: this.pageSize
          },
          {
            headers: {
              ContentType: "application/json"
            }
          }
        )
        .then(res => {
          let message = res.data.message;
          let type = "success";
          if (res.data.statusCode !== "0000") {
            type = "error";
            _this.tableData = null;
          } else {
            _this.tableData = res.data.content.data;
          }
          this.$message({
            message: message,
            type: type
          });
        })
        .catch(err => this.$alert(err));
    },
    handleDetails(row) {
      this.orderDetails = row.orderDetails;
      this.centerDialogVisible = true;
    },
    complete(row) {
      let _this = this;
      this.$api
        .completeOrder(
          {
            sid: row.sid
          },
          {
            headers: {
              ContentType: "application/json"
            }
          }
        )
        .then(res => {
          let message = res.data.message;
          let type = "success";
          if (res.data.statusCode !== "0000") {
            message = "操作失败";
            type = "error";
          } else {
            message = "订单已完成";
            row.status = "已完成";
            _this.tableData = _this.tableData.filter(
              item => item.sid !== row.sid
            );
          }
          this.$message({
            message: message,
            type: type
          });
        })
        .catch(err => this.$alert(err));
    },
    cancel(row) {
      let _this = this;
      this.$api
        .cancelOrder(
          {
            sid: row.sid
          },
          {
            headers: {
              ContentType: "application/json"
            }
          }
        )
        .then(res => {
          let message = res.data.message;
          let type = "success";
          if (res.data.statusCode !== "0000") {
            message = "订单取消失败";
            type = "error";
          } else {
            message = "订单取消成功";
            row.status = "已取消";
            _this.tableData = _this.tableData.filter(
              item => item.sid !== row.sid
            );
          }
          this.$message({
            message: message,
            type: type
          });
        })
        .catch(err => this.$alert(err));
    }
  },
  components: {
    HeaderTitle
  }
};
</script>

<style lang="scss" scoped>
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
  .el-button--text {
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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<style lang="scss">
.el-table {
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
.el-dialog {
  height: 80vh;
  overflow: hidden;
  .el-dialog__body {
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0;
    padding: 0;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>