<template>
</template>

<script>
    import { checkPhone,setCookie,getCookie,delCookie} from "@/utils/tools";
    import weChat from '@/utils/wxAuthorization';
    export default {
      name: "author",
      data(){
        return {
          code:'',
          login:'',
        }
      },
      methods:{
        handleWechatLogin(code){
          this.$http.post("/hospital/login/login-by-wechatcode",{
            wechatCode:code
          }).then(res=>{
            if(res.data.rc==0){
              /* token存入cookie中 */
              setCookie('userinfo',res.data.data.userinfo) //保存用户信息
              setCookie("Authorization", "Base " + res.data.data.token.data); //token
              setCookie("realName", res.data.data.userinfo.realName); //用户名
              setCookie("userName", res.data.data.userinfo.userName); //用户登录名
              let token = getCookie("Authorization");
              let beforeUrl = getCookie('beforeUrl');
              this.$router.push(beforeUrl)
              delCookie('beforeUrl');
              console.log(token);
            }
            else if(res.data.rc==1004){
              setCookie('userinfo',res.data.data.userinfo) //保存用户信息
              setCookie("Authorization", "Base " + res.data.data.token.data); //token
              this.$router.push('/user/register/unBind')
            }else if(res.data.rc==1003){
              this.$router.push('/user/wxLogin/bindMobileNo/')
              setCookie('nickName',res.data.data.nickname) //微信用户名
              this.authInfo=JSON.stringify(res.data.data);
              setCookie("authInfo",this.authInfo)  //authInfo存入cookie中
            }
          })
        },
      },
      //beforeRouteEnter(to,from,next){
        //next()
      // },
      created(){
        this.code = weChat.getUrlStr('code')
        this.handleWechatLogin(this.code)
      }
    }
</script>

<style scoped>

</style>
