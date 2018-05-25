<template>
  <div class="register-container">
    <h2>设置密码</h2>
    <p>请设置6-16位密码，不能有空格</p>
    <div class="input-box">
      <!-- 密码明文的显示与隐藏 start -->
      <input type="password" placeholder="请输入密码" maxlength="16" v-model="password" v-if="pwdHidden">
      <input type="email" placeholder="请输入密码" maxlength="16" v-model="password" v-if="!pwdHidden">
      <!-- 密码明文的显示与隐藏 end -->
      <div class="see-icon" :class="pwdHidden?'hidden':''" @click="switchShow"></div>
    </div>
    <button class="next-button" v-bind:disabled="password.length<6" @click="next">注册完成</button>

  </div>
</template>
<style lang="scss">

</style>
<script>
  import { getCookie} from "@/utils/tools";
  export default {
    data() {
      return {
        password: "",
        mobilephone: "",
        token: "",
        pwdHidden: true,
        authInfo:null,
      };
    },
    watch: {

    },
    methods: {

      next() {
        this.finishRegister()
        // if (checkPwd(this.password)) {
        //   //  点击确定之后
        //   this.finishRegister()
        // }else{
        //   this.$toast({
        //     message: "密码格式不正确，请重新输入"
        //   })
        // }
      },
      switchShow() {
        this.pwdHidden = !this.pwdHidden
      },
      finishRegister(){
        this.$http.post('/hospital/login/update-psd',{
          tokenStr: this.token,
          password: this.password,
          authInfo: this.authInfo
        }).then(res=>{
          if (res.data.rc===1004) {
            // 设置成功后，触发跳去邦定提醒页
            this.$toast({
              message: '设置成功',
              duration: 2000
            })
            setTimeout(() => {
              this.$router.push('/user/register/unBind')
            }, 2000);
          }else{
            this.$toast({
              message: res.data.msg
            })
          }
        })
      }
    },
    created () {
      this.mobilephone = this.$route.params.number;
      this.token = this.$route.params.token;
      var auth = getCookie('authInfo');
      this.authInfo = JSON.parse(JSON.parse(auth))
      console.log(this.$route.params.token)
    },
    mounted() {}
  };
</script>
