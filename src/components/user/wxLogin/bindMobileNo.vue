<template>
    <div class="register-container">
      <h3>您好, <span class="hos-port">{{Unionid}}</span>  ,请先绑定手机号</h3>
      <div class="input-box">
        <input type="number" placeholder="请输入手机号" v-model="mobilePhone" maxlength="11">
      </div>
      <div class="input-box">
        <input type="number" placeholder="请输入验证码" v-model="vCode">
        <span v-if="timeOut" style="color:#00bd93;">已发送（{{leftTime}}s）</span>
        <span class="reget" v-if="!timeOut" @click="getCode">{{getCodeText}}</span>
      </div>
      <button class="next-button" v-bind:disabled="disabled" @click="handleBindNo">绑定</button>
      <captcha-box v-if="showCaptcha" @verifySuccess="verifySuccess" @hideCaptcha="hideCaptcha" :captchaToken="captchaToken" ></captcha-box>
    </div>
</template>

<script>
  import { checkPhone,checkID,setCookie,getCookie,delCookie} from "@/utils/tools";
  import captchaBox from "../../../components/captchaBox/index";
    export default {
      name: "bind-mobile-no",
      components: {
        captchaBox
      },
      data(){
        return{
          Unionid:'', //微信用户名
          mobilePhone:'',      // 绑定手机号
          vCode:'',            //手机验证码
          leftTime:60,         //发送时间
          getCodeText: "获取验证码",
          captchaToken: "",
          timeOut: false,
          disabled: true,
          timer: null,
          showCaptcha: false, //是否显示图形验证码
          authInfo:null,
          beforeUrl:'',
        }
      },
      watch:{
        mobilePhone(){
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
        this.Unionid = getCookie('nickName');
        let auth = getCookie('authInfo');
        this.authInfo = JSON.parse(auth)
      },
      methods:{
        handleClick(){
          if(this.mobilePhone.length>0&&this.vCode.length > 0){
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
        /*请求绑定手机号*/
        handleBindNo(){
          this.$http.post('/hospital/login/wechat-bind',{
            mobilePhone:this.mobilePhone,
            code:this.vCode,
            authInfo:this.authInfo
          }).then(res=>{
            if(res.data.rc==0){
              /* token存入cookie中 */
              setCookie("Authorization", "Base " + res.data.data.token.data); //token
              setCookie("realName", res.data.data.userinfo.realName); //用户名
              setCookie("userName", res.data.data.userinfo.userName); //用户登录名
              this.beforeUrl = getCookie('beforeUrl');
              this.$router.push(this.beforeUrl)
              delCookie('beforeUrl');
            }
            if(res.data.rc==1){
              this.$toast({
                type: "text",
                message: res.data.msg,
                duration: 1000,
              })
            }
            if(res.data.rc==1004){
              setCookie("Authorization", "Base " + res.data.data.token.data); //token
              setTimeout(() => {
                this.$router.push('/user/register/unBind')
              }, 1000);
            }else if(res.data.rc==1003){
              this.$toast({
                type: "text",
                message: res.data.msg,
                duration: 1000,
              })
            }
          }).catch(res=>{
            console.log(res)
          })
        },
        getCode() {
          /* 获取验证码前先判断是否输入手机号 */
          if (checkPhone(this.mobilePhone) && this.leftTime === 60) {
            /* 判断手机号是否绑定 */
            this.$http
              .get("/hospital/login/is-mobilephone-wechatbind?mobilePhone="+this.mobilePhone, {
              })
              .then(res => {
                if (!res.data.data.isWechatBind) {
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
                    message: "手机号已绑定,请重新输入"
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
        }
      },
      mounted(){
      }
    }
</script>

