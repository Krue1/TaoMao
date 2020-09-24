<template>
  <div class="login">
    <div class="login-form">
      <h2>管理员登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item prop="id">
          <el-input
            type="text"
            v-model="ruleForm.id"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入你的帐号"
            autofocus
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入你的密码"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    let validateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      } else if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(value)) {
        callback(new Error("请输入格式正确的帐号（手机号）"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: "",
        password: ""
      },
      rules: {
        id: [{ validator: validateId, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["setTokenAction", "setAdminInfoAction"]),
    login(formName) {
      let _self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .login(this.ruleForm, {
              "Content-Type": "application/json"
            })
            .then(res => {
              let message = res.data.message;
              let type = "success";
              if (res.data.code !== "0000") {
                type = "error";
              } else {
                message = "登录成功";
                const token = res.data.data.token;
                const adminInfo = res.data.data.user;
                this.setTokenAction(token);
                this.setAdminInfoAction(adminInfo);
                localStorage.setItem("token", token);
                localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
                _self.$router.push({ name: "Management" });
              }
              _self.$message({
                message: message,
                type: type
              });
            })
            .catch(err => this.$alert(err));
          // _self.$message({
          //   message: "登录成功",
          //   type: "success"
          // });
          // const token = 222;
          // const adminInfo = {
          //   name: "Admin"
          // };
          // this.setTokenAction(token);
          // this.setAdminInfoAction(adminInfo);
          // localStorage.setItem("token", token);
          // localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
          // _self.$router.push({ name: "News" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  width: 100%;
  background: url("../assets/cool-background2.png");
  background-size: contain;
  position: relative;
}
.login-form {
  height: 100%;
  width: 40%;
  float: right;
  background-color: rgba($color: #fff, $alpha: 0.8);
  border-radius: 5% 0 0 5%;

  h2 {
    text-align: center;
    margin-top: 10%;
  }

  .el-form {
    margin : {
      left: 15%;
      top: 12%;
    }
  }

  .el-input {
    width: 16rem;
    margin-top: 3%;
  }

  .el-button {
    width: 16rem;
    margin-top: 5%;
    height: 3rem;
  }
}
</style>
