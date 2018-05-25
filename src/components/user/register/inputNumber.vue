<template>
  <div class="register-container">
    <h2>注册</h2>
    <p>注册即表示已阅读并同意
      <router-link to="/user/register/serviceTerm">服务条款</router-link>
    </p>
    <div class="input-box">
      <input type="number" placeholder="请输入手机号" v-model="mobilePhone">
    </div>
    <button class="next-button" v-bind:disabled="mobilePhone.length<=0" @click="next">下一步</button>
    <div class="toLogin">
      <div>有账号，</div>
      <router-link to="/user/login">去登录</router-link>
      <span><img src="../../../static/images/icon_sqh@2x.png"></span>
    </div>
    <captcha-box v-if="showCaptcha" @verifySuccess="verifySuccess" @hideCaptcha="hideCaptcha" :captchaToken="captchaToken"></captcha-box>
  </div>
</template>
<style lang="scss">

</style>
<script>
  //导入图形验证码组件
  import captchaBox from "../../../components/captchaBox/index";
  import weChat from '@/utils/wxAuthorization';//导入微信授权获取code方法
  import { checkPhone,setCookie } from "@/utils/tools";
  export default {
    components: {
      captchaBox
    },
    data() {
      return {
        mobilePhone: "",
        captchaToken: "",
        showCaptcha: false, //是否显示图形验证码
        code:'',
        authInfo:null
      };
    },
    created(){
      this.code=weChat.getUrlStr('code') //获取授权后redirect_url跳转的code参数
      this.handleUserInfo(this.code)
    },
    methods: {
      next() {
        if (checkPhone(this.mobilePhone)) {
          this.verifyTel(this.mobilePhone);
        } else {
          this.$toast({
            type: "text",
            position: "center",
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
          })
          .then(res => {
            if (res.data.data.isRegister) {
              loading.close();
              this.$toast({
                type: "text",
                message: "手机号已注册，请直接登录"
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
          path: `/user/register/check-number/${this.mobilePhone}`
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
                  path: `/user/register/check-number/${this.mobilePhone}`
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
      },
      //获取用户微信授权信息
      handleUserInfo(code){
        this.$http.get("/hospital/login/get-wechat-authinfo?code="+code,{
        }).then(res=>{
          this.authInfo=JSON.stringify(res.data.data);
          setCookie("authInfo",this.authInfo)  //authInfo存入cookie中
        })
      },
    },
    mounted() {}
  };
</script>
