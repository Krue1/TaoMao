<template>
  <div id="order">
    <HeaderTitle name="订单管理" class="header-title">
      <template>
        <el-radio-group v-model="status" @change="page(currentPage)">
          <el-radio-button label="已提交"></el-radio-button>
          <el-radio-button label="已完成"></el-radio-button>
          <el-radio-button label="已取消"></el-radio-button>
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
          width="120"
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
          account: "223313"
        }
      ],
      status: "已提交",
      pageSize: 5,
      currentPage: 1,
      total: 10
    };
  },
  methods: {
    page(currentPage) {
      this.currentPage = currentPage;
      //可能需修改：调用查询商品接口-有自带分页查询的情况下
    },
    handleDetails(row) {
      console.log(row);
    },
    complete(row) {
      console.log(row);
    },
    cancel(row) {
      console.log(row);
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
</style>