<template>
  <div class="forgetPwd-container">
      <h2>手机号验证</h2>
      <p>验证码已发送至<a href="javascript:;">{{handleNumber()}}</a></p>
      <div class="input-box">
          <input type="email" placeholder="请输入验证码" v-model="vCode">
          <span v-if="timeOut">已发送（{{leftTime}}s）</span>
          <span class="reget" v-if="!timeOut" @click="regetCode">重新获取</span>
      </div>
      <button class="next-button" v-bind:disabled="vCode.length<=0" @click="next">下一步</button>
      <captcha-box v-if="showCaptcha" @verifySuccess="verifySuccess" @hideCaptcha="hideCaptcha" :captchaToken="captchaToken"></captcha-box>
  </div>
</template>
<style lang="scss">

</style>
<script>
import captchaBox from "../../../components/captchaBox/index";

export default {
  components: {
    captchaBox
  },
  data() {
    return {
      currentNumber: "",
      vCode: "",
      timeOut: false,
      leftTime: 60,
      timer: null,
      captchaToken: "",
      showCaptcha: false //是否显示图形验证码
    };
  },
  methods: {
    next() {
      this.verifyCode();
    },
    regetCode() {
      this.getCode(()=>{
        this.timeOut = true;
        this.timer = setInterval(() => {
          this.leftTime -= 1;
        }, 1000);
      });
    },
    handleNumber() {
      return this.currentNumber.slice(0,3)+'****'+this.currentNumber.slice(7)
    },
    verifyCode() {
      var loading = this.$toast({
        type: "loading",
        duration: 0,
        shadow: true,
        message: "正在验证"
      });
      this.$http
        .post("/hospital/login/verify-sms-code", {
          mobilePhone: this.currentNumber,
          code: this.vCode,
          type: "forgetpsd"
        })
        .then(res => {
          console.log(res);
          loading.close();
          if (res.data.rc === 0) {
            //验证成功
            this.$router.push({
              path:
                "/user/forgetPwd/setting-pwd/" +
                this.currentNumber +
                "/" +
                res.data.data
            });
          } else {
            this.$toast({
              message: res.data.msg
            });
          }
        }).catch(err=>{
            loading.close();
          })
    },
    verifySuccess(status) {
      console.log("验证成功");
    },
    hideCaptcha(status) {
      this.showCaptcha = !status;
    },
    getCode(success) {
      this.$http
        .post("/hospital/login/get-verification-code", {
          mobilePhone: this.currentNumber
        })
        .then(res => {
          if (res.data.rc === 0) {
            //获取验证码成功
            if (res.data.data.isHaveCaptcha) {
              this.captchaToken = res.data.data.captchaToken;
              this.showCaptcha = true;
            }
          } else {
            this.$toast({
              type: "text",
              message: res.data.msg
            });
          }
          success ? success() : "";
        });
    }
  },
  watch: {
    leftTime(curVal, oldVal) {
      if (curVal <= 0) {
        clearInterval(this.timer);
        this.timeOut = false;
        this.leftTime = 60;
      }
    }
  },
  mounted() {
    //获取传过来的手机号码
    this.currentNumber = this.$route.params.number;
    this.timeOut = true;
    this.timer = setInterval(() => {
      this.leftTime -= 1;
    }, 1000);
  }
};
</script>
