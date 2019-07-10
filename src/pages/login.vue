<template>
  <div class="bg">
    <div class="box bounceInDown animated">
      <div class="title">
        <p>武汉创信博达管理系统</p>
      </div>
      <div class="form">
        <el-form :model="form">
          <el-form-item>
            <el-input v-model="form.user" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="form.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:280px" @click="toLogin" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    toLogin() {
      localStorage.setItem("token","token");
      this.$router.push("home");
    }
  }
};
</script>

<style>
.bg {
  position: relative;
  background: url("../assets/images/cloud.jpg") 0 bottom repeat-x #049ec4;
  width: 100%;
  height: 100%;
  animation: animate-cloud 20s linear infinite;
  -webkit-animation: animate-cloud 20s linear  linear;
}
.bounceInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}

.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
@keyframes fadeInDown
{
    from {
        opacity: 0;
        -webkit-transform: translate(0%, -100%); /* Safari */
        transform: translate(-100%, -100%); /* 标准语法 */
    }
    to {
        opacity:1;
        -webkit-transform: translate(-50%, -50%); /* Safari */
        transform: translate(-50%, -50%);/* 标准语法 */
    }
}
@keyframes animate-cloud {
  0% {
    background: url("../assets/images/cloud.jpg") 0 bottom repeat-x #049ec4;
    background-position: 0% 100%;
  }
  30% {
    background: url("../assets/images/cloud.jpg") 0 bottom repeat-x #049ec4;
    background-position: -20% 100%;
  }
  60% {
    background: url("../assets/images/cloud.jpg") 0 bottom repeat-x #049ec4;
    background-position: -60% 100%;
  }
  100% {
    background: url("../assets/images/cloud.jpg") 0 bottom repeat-x #049ec4;
    background-position: -90% 100%;
  }
}
.box {
  /* background-image: url("../assets/images/bj.jpg"); */
  background-color: white;
  width: 400px;
  height: 400px;
  box-shadow: 10px 10px 5px #666;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  text-align: center;
  width: 100%;
  height: 130px;
  line-height: 130px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
}
.form {
  width: 70%;
  margin: 0px auto 60px auto;
}
</style>

