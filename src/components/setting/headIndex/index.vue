<template>
  <div class="headIndex">
    <div class="header">
      <div class="header-content">
        <div>
          <img v-if="logoUrl" class="portrait" :src="logoUrl" />
        </div>
        <p>
          <span class="useName">{{realName?realName:userName}}</span>
          <span class="hosName">{{hospitalName}}</span>
        </p>
      </div>
    </div>
    <div class="operationMenu">
      <div class="convention">
        <div class="set-convention">
          <div class="setBox">
            <img src="../../../static/images/icon_yysz_sz@2x.png" class="set-icon">
            <span class="setConvention">预约设置</span>
          </div>
          <img @click="$router.push('/setting/convention')" class="portrait" src="../../../static/images/icon_yjt_tjyy@2x.png" />
        </div>
      </div>
      <div class="convention" style="padding-top: 0">
        <div class="set-convention">
          <div class="setBox">
            <img src="../../../static/images/icon_xgmm_sz@2x.png" class="set-icon">
            <span class="setConvention">修改密码</span>
          </div>
          <img @click="$router.push('/setting/password')" class="portrait" src="../../../static/images/icon_yjt_tjyy@2x.png" />
        </div>
      </div>
    </div>
    <div class="signOut" v-if="!isLogin" @click="loginOut">退出登录</div>
  </div>
</template>

<script>

  import { setCookie,getCookie,delCookie } from "@/utils/tools";
  import weChat from '@/utils/wxAuthorization';//导入微信授权获取code方法
    export default {
      name: "headIndex",
      data(){
        return{
          isLogin: false,
          realName:'',
          userName:'',
          hospitalName:"",
          logoUrl:'',
          code:''
        }
      },
      created(){
        this.realName= getCookie("realName");
        this.userName= getCookie("userName");
        this.code=weChat.getUrlStr('code') //获取授权后redirect_url跳转的code参数
        this.handleWechatLogin(this.code)
        this.handleLogin()
      },
      methods:{
        handleLogin(){
          this.$http.get("/user-manage/find-hospital-logo",{
          }).then(res=>{
              this.logoUrl = res.data.data.logoUrl?res.data.data.logoUrl:'';
              this.hospitalName = res.data.data.hospitalName;
            }
          ).catch(res=>{
             console.log(res)
          })
        },
        handleWechatLogin(code){
          this.$http.post("/hospital/login/login-by-wechatcode",{
            wechatCode:code
          }).then(res=>{
            if(res.data.rc==0){
              /* token存入cookie中 */
              setCookie("Authorization", "Base " + res.data.data.token.data); //token
              setCookie("realName", res.data.data.userinfo.realName); //用户名
              setCookie("userName", res.data.data.userinfo.userName); //用户登录名
            }
            else if(res.data.rc==1004){
              setCookie("Authorization", "Base " + res.data.data.token.data); //token
              this.$toast({
                type: "text",
                message: res.data.msg,
                duration: 1000,
              })
              setTimeout(() => {
                this.$router.push('/user/register/unBind')
              }, 1000);
            }else if(res.data.rc==1003){
              this.$router.push('/user/wxLogin/bindMobileNo/')
              setTimeout(() => {
                this.$toast({
                  type: "text",
                  message: res.data.msg,
                  duration: 1000,
                })
              }, 1000);
              setCookie('nickName',res.data.data.nickname) //微信用户名
              this.authInfo=JSON.stringify(res.data.data);
              setCookie("authInfo",this.authInfo)  //authInfo存入cookie中
            }
          })
        },
        loginOut(){
          delCookie("Authorization");
          delCookie("realName");
          delCookie("userName");
          setCookie('isLogin',false)
          this.$toast({
            type:'text',
            message:'退出登录'
          })
          // setTimeout(() => {
          //   this.$router.push("/user/login");
          // }, 1000);
        }
      }

    }
</script>

<style lang="scss" scoped>
  @import "../../../static/scss/pages/setting/headIndex";
</style>
