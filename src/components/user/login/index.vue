<template>
  <div class="login-container">
    <h2>欢迎使用一键康<span class="hos-port">医院端</span></h2>
    <div class="login-box">
      <div class="tab-switch">
        <span @click="currentMethod='pwdLogin'" :class="currentMethod==='pwdLogin'?'active':''">账号密码登录</span>
        <span @click="currentMethod='codeLogin'" :class="currentMethod==='codeLogin'?'active':''">验证码登录</span>
      </div>
      <div class="switch-list">
        <div class="switch-list_item pwdLogin" v-if="currentMethod==='pwdLogin'">
          <!-- 用户名输入框 -->
          <div class="input-box">
            <input type="number" placeholder="请输入手机号" v-model="userName" maxlength="11">
          </div>
          <!-- 密码输入框 -->
          <div class="input-box">
            <!-- 密码明文的显示与隐藏 start -->
            <input type="password" placeholder="请输入密码" maxlength="16" v-model="password" v-if="pwdHidden">
            <input type="email" placeholder="请输入密码" maxlength="16" v-model="password" v-if="!pwdHidden">
            <!-- 密码明文的显示与隐藏 end -->
            <div class="see-icon" :class="pwdHidden?'hidden':''" @click="switchShow"></div>
          </div>
        </div>
        <div class="switch-list_item codeLogin" v-if="currentMethod==='codeLogin'">
          <div class="input-box">
            <input type="number" placeholder="请输入手机号" v-model="userName" maxlength="11">
          </div>
          <!-- 密码输入框 -->
          <div class="input-box">
            <input type="number" placeholder="请输入验证码" v-model="vCode">
            <span v-if="timeOut" style="color:#00bd93;">已发送（{{leftTime}}s）</span>
            <span class="reget" v-if="!timeOut" @click="getCode">{{getCodeText}}</span>
          </div>
        </div>
      </div>
      <button class="confirm-button" v-bind:disabled="disabled" @click="confirmLogin">登&nbsp;&nbsp;录</button>
      <div class="forgetPwd">
        <router-link to="/user/forgetPwd/inputNumber" v-if="currentMethod=='pwdLogin'">忘记密码？</router-link>
        <div class="code-login"  v-else></div>
      </div>
      <div v-if="showRegister" class="toRegister">
        <p>没有账号，</p>
        <router-link to="/user/register">去注册</router-link>
        <span><img src="../../../static/images/icon_sqh@2x.png"></span>
      </div>
    </div>
    <!-- 验证码组件 -->
    <captcha-box v-if="showCaptcha" @verifySuccess="verifySuccess" @hideCaptcha="hideCaptcha" :captchaToken="captchaToken" ></captcha-box>

  </div>
</template>

<script>
  import { checkPhone,setCookie,getCookie} from "@/utils/tools";
  import weChat from '@/utils/wxAuthorization';//导入微信授权获取code方法
  import captchaBox from "../../../components/captchaBox/index";//导入图形验证码组件
    export default {
    name: 'login',
    components: {
      captchaBox
    },
    data() {
      return {
        currentMethod: "pwdLogin",
        password: "",
        vCode: "",
        captchaToken: "",
        timeOut: false,
        leftTime: 60,
        getCodeText: "获取验证码",
        timer: null,
        disabled: true,
        pwdHidden: true,
        showCaptcha: false, //是否显示图形验证码
        showRegister: false ,//是否展示去注册按钮

        userName:'',
        code:'',
        name:'',
        authInfo:null,
      }
    },
    watch:{
      userName(){
        this.handleClick()
      },
      password(){
        this.handleClick()
      },
      vCode(){
        this.handleClick()
      },
      leftTime(curVal, oldVal) {
        if (curVal <= 0) {
          clearInterval(this.timer);
          this.getCodeText = "重新获取";
          this.leftTime = 60;
          this.timeOut = false;
        }
      }
    },
    created(){
      this.code=weChat.getUrlStr('code') //获取授权后redirect_url跳转的code参数
      var auth = getCookie('authInfo');
      this.authInfo = JSON.parse(JSON.parse(auth))
      //alert(typeof this.authInfo)
    },
    methods:{
      switchShow() {
        this.pwdHidden = !this.pwdHidden;
      },
      handleClick(){
        if(this.userName.length>0&&(this.password.length > 0||this.vCode.length > 0)){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      },
      setTimeOut() {
        this.timeOut = true;
        this.timer = setInterval(() => {
          this.leftTime -= 1;
        }, 1000);
      },
      //登录
      handleLogin(userName, password,authInfo,vCode,success, fail){
        this.$http.post("/hospital/login/",{
          userName: userName,
          password:password,
          authInfo:authInfo,
          type:vCode?"verifyCode":"password",
          verificationCode:vCode?vCode:null,
        }).then(res=>{
          success ? success() : "";
          if(res.data.rc==0){
            console.log(res.data)
            this.code = res.data.data.token.code;
            this.name = res.data.data.userinfo.userName;
            setCookie("isLogin", true);
            /* token存入cookie中 */
            setCookie("Authorization", "Base " + res.data.data.token.data); //token
            setCookie("realName", res.data.data.userinfo.realName); //用户名
            setCookie("userName", res.data.data.userinfo.userName); //用户登录名
            //setCookie("userId", res.data.data.userinfo.id); //用户id
            //setCookie("userTel", res.data.data.userinfo.mobileNo); //手机号
            if (this.$route.query.target) {
              setTimeout(() => {
                this.$router.replace(
                  decodeURIComponent(this.$route.query.target)
                );
              }, 1000);
            }else if(res.data.data.userinfo.isActivating){
              setTimeout(() => {
                this.$toast({
                  type: "text",
                  message: "登录成功",
                  duration: 1000
                })
                this.$router.push("/appointment/make/date");
              }, 1000);
            }
          }else if(res.data.rc==1004){
            this.$toast({
              type: "text",
              message: res.data.msg,
              duration: 1000,
            })
            setTimeout(() => {
              this.$router.push('/user/register/unBind')
            }, 1000);
          }else{
            this.$toast({
              type: "text",
              message: res.data.msg,
              duration: 1000,
            });
          }
        }
        ).catch(res=>{
          fail ? fail() : "";
        })
      },
      //是否需要绑定微信信息
      handleBind(userName){
        this.$http.get("/hospital/login/is-need-bind?userName="+userName,{
        }).then(res=>{
          console.log(res)
        }).catch(res=>{
          console.log(res)
        })
      },
      confirmLogin(obj){
        if (this.currentMethod === "pwdLogin"){
          /* 账号密码登录进行验证 */
          if (this.password.length > 0) {
            obj.target.innerText = "登录中...";
            var loading = this.$toast({
              type: "loading",
              duration: 1000,
              message: "登录中...",
              shadow: true
            });
            this.handleLogin(
              this.userName,
              this.password,
              this.authInfo,
              null,
              () => {
                loading.close();
              },
              () => {
                loading.close();
              }
            );
          }else {
            this.$toast({
              type: "text",
              message: "请输入密码！"
            });
          }
        }else if (this.currentMethod === "codeLogin") {
          /* 验证码登录进行验证 */
          if (this.vCode.length > 0) {
            obj.target.innerText = "登录";
            var loading = this.$toast({
              type: "loading",
              message: "正在登录",
              duration: 0,
              shadow: true
            });
            this.handleLogin(
              this.userName,
              null,
              this.authInfo,
              this.vCode,
              () => {
              loading.close();
              obj.target.innerText = "登录";
            });
          } else {
            this.$toast({
              type: "text",
              message: "请输入验证码！"
            });
          }
        }
      },
      getCode() {
        /* 获取验证码前先判断是否输入手机号 */
        if (checkPhone(this.userName) && this.leftTime === 60) {
          /* 判断手机号是否注册 */
          this.$http
            .get("/hospital/login/verify-mobile-phone?mobilePhone="+this.userName, {
            })
            .then(res => {
              if (res.data.data.isRegister) {
                this.$http
                  .post("/hospital/login/get-verification-code", {
                    mobilePhone: this.userName
                  })
                  .then(res => {
                    if (res.data.rc === 0) {
                      //获取验证码成功
                      if (res.data.data.isHaveCaptcha) {
                        this.captchaToken = res.data.data.captchaToken;
                        this.showCaptcha = true;
                      } else {
                        this.$toast({
                          message: "验证码获取成功"
                        });
                        this.setTimeOut();
                      }
                    } else {
                      this.$toast({
                        type: "text",
                        message: res.data.msg
                      });
                    }
                  });
              } else {
                this.$toast({
                  message: "手机号未注册"
                });
              }
            });
        } else {
          this.$toast({
            type: "text",
            message: "请输入正确手机号"
          });
        }
      },
      verifySuccess() {
        console.log("验证成功");
        this.setTimeOut();
      },
      hideCaptcha(status) {
        this.showCaptcha = !status;
      },
    },

  }
</script>

<style lang="scss" scoped>
  @import "../../../static/scss/pages/user/login.scss";
</style>
