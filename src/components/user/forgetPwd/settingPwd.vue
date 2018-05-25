<template>
  <div class="forgetPwd-container">
    <h2>设置新密码</h2>
    <p>请设置6-16位密码，不能有空格</p>
    <div class="input-box">
      <!-- 密码明文的显示与隐藏 start -->
      <input type="password" placeholder="请输入密码" maxlength="16" v-model="password" v-if="pwdHidden">
      <input type="email" placeholder="请输入密码" maxlength="16" v-model="password" v-if="!pwdHidden">
      <!-- 密码明文的显示与隐藏 end -->
      <div class="see-icon" :class="pwdHidden?'hidden':''" @click="switchShow"></div>
    </div>
    <button class="next-button" v-bind:disabled="password.length<6" @click="next">完成重置</button>
  </div>
</template>
<style lang="scss">

</style>
<script>
import { checkPwd } from "@/utils/tools";

export default {
  data() {
    return {
      mobilephone: "",
      password: "",
      token: "",
      pwdHidden: true
    };
  },
  watch: {},
  methods: {
    next() {
      this.finishReset();
      // if (checkPwd(this.password)) {
      //   //  点击确定之后
      //
      // } else {
      //   this.$toast({
      //     type: "text",
      //     message: "密码不符合规则，请重新输入",
      //     duration: 2000
      //   });
      // }
    },
    switchShow() {
      this.pwdHidden = !this.pwdHidden;
    },
    finishReset() {
      this.$http
        .post("/hospital/login/forget-psd", {
          tokenStr: this.token,
          password: this.password,
        })
        .then(res => {
          if (res.data.rc === 0) {
            // 跳去触发登录页面
            this.$toast({
              message: "密码设置成功",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push('/user/login')
            }, 2000);
          } else {
            this.$toast({
              message: res.data.msg
            });
          }
        });
    }
  },
  created() {
    this.mobilephone = this.$route.params.number;
    this.token = this.$route.params.token;
  }
};
</script>
