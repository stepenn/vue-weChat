<template>
  <div class="forgetPwd-container">
    <h2>忘记密码</h2>
    <p>请输入您的手机号码</p>
    <div class="input-box">
      <input type="number" placeholder="请输入手机号" v-model="mobilePhone">
    </div>
    <button class="next-button" v-bind:disabled="mobilePhone.length<=0" @click="next">下一步</button>
    <captcha-box v-if="showCaptcha" @verifySuccess="verifySuccess" @hideCaptcha="hideCaptcha" :captchaToken="captchaToken"></captcha-box>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import { checkPhone } from "@/utils/tools";

  import captchaBox from "../../../components/captchaBox/index";

  export default {
    components: {
      captchaBox
    },
    data() {
      return {
        mobilePhone: "",
        captchaToken: "",
        showCaptcha: false //是否显示图形验证码
      };
    },
    methods: {
      next() {
        console.log(1)
        if (checkPhone(this.mobilePhone)) {
          this.verifyTel(this.mobilePhone)
        } else {
          this.$toast({
            type: "text",
            message: "请输入正确的手机号",
            duration: 2000
          });
        }
      },
      verifyTel(mobilePhone) {
        var loading = this.$toast({
          type: "loading",
          shadow: true,
          duration: 0,
          message: "正在加载"
        });
        this.$http
          .get("/hospital/login/verify-mobile-phone?mobilePhone="+mobilePhone, {
            mobilePhone: this.mobilePhone
          })
          .then(res => {
            console.log(res);
            if (!res.data.data.isRegister) {
              loading.close();
              this.$toast({
                type: "text",
                message: "手机号未注册，请注册"
              });
            } else {
              this.getCode(() => {
                loading.close();
              });
            }
          }).catch(err=>{
          loading.close();
        })
      },
      verifySuccess() {
        console.log("验证成功");
        this.$router.push({
          path: `/user/forgetPwd/check-number/${this.mobilePhone}`
        });
      },
      hideCaptcha(status) {
        this.showCaptcha = !status;
      },
      getCode(success) {
        this.$http
          .post("/hospital/login/get-verification-code", {
            mobilePhone: this.mobilePhone
          })
          .then(res => {
            if (res.data.rc === 0) {
              //获取验证码成功
              if (res.data.data.isHaveCaptcha) {
                this.captchaToken = res.data.data.captchaToken;
                this.showCaptcha = true;
              } else {
                this.$router.push({
                  path: `/user/forgetPwd/check-number/${this.mobilePhone}`
                });
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
    mounted() {}
  };
</script>
