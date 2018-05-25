<template>
<transition name="fade">
  <div class="captcha-container">
    <div class="captcha-box">
      <p>请输入图片中的内容</p>
      <div class="captchaImg">
        <img :src="captchaPath" @click="refreshCaptcha" v-if="captchaPath.length>0">
      </div>
      <p>点击图形更换验证码</p>
      <div class="inputCode">
        <div v-for="t in 4" :key="t" :class="vCodeInput[t-1]?'active':''">{{vCodeInput.trim()[t-1]}}</div>
        <input type="tel" v-model="vCodeInput" maxlength="4">
      </div>
      <button class="confirm" :disabled="vCodeInput.length>=4?false:true" @click="confirm">确定</button>
      <button class="cancel" @click="handleCancel">取消</button>
    </div>
  </div>
</transition>
</template>
<script>
import {refreshPage} from "@/utils/tools"

export default {
  name: "captchaBox",
  props: {
    captchaToken: ""
  },
  data() {
    return {
      vCodeInput: "",
      captchaPath: ''
    };
  },
  watch: {
    vCodeInput: "handleInputCode"
  },
  methods: {
    handleInputCode(val) {
      // this.vCodeInput = this.vCodeInput.replace(/[^\d]/g,'')
      this.vCodeInput = this.vCodeInput.slice(0,4)
    },
    confirm() {
      this.$http.post('/hospital/common/sms/verify-captcha-code',{
        captchaToken: this.captchaToken,
        captchaCode: this.vCodeInput
      }).then(res=>{
        console.log(res)
        if (res.data.rc===0) {
          this.$emit('verifySuccess',true)
          this.handleCancel()
        }else{
          this.refreshCaptcha()
          this.$toast({
            message: res.data.msg
          })
        }
      })
    },
    handleCancel(){
      this.$emit('hideCaptcha',true)
    },
    getCaptcha(){
      var httpAddress=process.env.API_ROOT;
      this.captchaPath =httpAddress+'/hospital/common/get-captcha?captchaToken='+this.captchaToken +'&refresh='+(new Date()).valueOf()
    },
    refreshCaptcha(){
      this.getCaptcha()
      this.vCodeInput = ''
    }
  },
  mounted () {
    this.getCaptcha()
  }
};
</script>
<style lang="scss" scoped>
.captcha-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .captcha-box {
    width: 5.4rem;
    // padding: 0.4rem 0.2rem;
    padding: 0.2rem 0.2rem 0.1rem 0.2rem;
    background-color: #fff;
    border-radius: 0.1rem;
    p {
      text-align: center;
      color: $fc-black;
      margin-top: .6rem;
      &:nth-child(3) {
        font-size: 0.24rem;
        padding: 0.13rem 0;
        color: #8c8c8c;
      }
    }
    .captchaImg {
      display: block;
      width: 3rem;
      height: 0.7rem;
      margin: 0 auto;
      margin-top: 0.4rem;
      margin-bottom: 0.12rem;
      position: relative;
      .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.6)
      }
    }
    .inputCode {
      display: flex;
      justify-content: center;
      position: relative;
      div {
        width: 0.8rem;
        height: 0.84rem;
        text-align: center;
        margin: 0 0.17rem;
        padding: 0.2rem 0 0.24rem 0;
        border-bottom: 0.01rem solid #e7eaf1;
        &.active {
          border-color: $blue;
        }
      }
      input {
        width: 200%;
        height: 100%;
        position: absolute;
        left: -100%;
        // border: 1px solid $blue;
        opacity: 0;
      }
    }
    button {
      border-radius: 0.1rem;
      width: 100%;
      height: 0.8rem;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.8rem;
      &.confirm {
        background-color: $blue;
        color: #fff;
        margin-top: 0.5rem;
      }
      &.cancel {
        background-color: #fff;
        color: $fc-black;
      }
    }
    button[disabled="disabled"] {
    background-color: $gray;
}
  }
}
</style>
