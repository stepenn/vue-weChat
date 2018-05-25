<template>
  <div class="container login-container" style="padding-top: 0;">
    <div class="login-box switch-list_item">
      <div class="input-box">
        <input type="password" v-model="oldPassword" placeholder="请输入旧密码" maxlength="16" @click="getOldPassword" />
      </div>
      <div class="input-box">
        <input type="password" v-model="newPassword" placeholder="请输入新密码" maxlength="16" @click="getNewPassword"/>
      </div>
      <div class="input-box">
        <input type="password" v-model="okPassword" placeholder="请确认密码" maxlength="16" @click="getOkPassword" />
      </div>
    </div>
    <div class="confirm">
      <button class="confirm-button" v-bind:disabled="disabled" @click="updatePassword">更新密码</button>
    </div>

  </div>
</template>

<script>

  import { setCookie,getCookie,delCookie } from "@/utils/tools";
    export default {
      name: "password",
      data(){
        return{
          oldPassword:'',
          newPassword:'',
          okPassword:'',
          disabled: true,
          userId:'',
        }
      },
      watch:{
        oldPassword(){
          this.handleClick();
        },
        newPassword(){
          this.handleClick()
        },
        okPassword(){
          this.handleClick();
        },
      },
      created(){
        this.userId = getCookie('userId');
      },
      methods:{
        handleClick(){
          if(this.oldPassword.length>0&&this.newPassword.length > 0&&this.okPassword.length > 0){
            this.disabled = false;
          }else{
            this.disabled = true;
          }
        },
        updatePassword(){
          if(this.newPassword!==this.okPassword){
            this.$toast({
              type: "text",
              message: "两次输入的新密码不一致"
            });
          }
          this.editPassWord(this.newPassword,this.oldPassword)
        },
        getOldPassword(e){
          this.oldPassword=e.target.value;
        },
        getNewPassword(e){
          this.newPassword=e.target.value;
        },
        getOkPassword(e){
          this.okPassword = e.target.value;

        },
        editPassWord(newPassword,oldPassword){
          this.$http.put("/user-manage/update-password",{
            newPassword:newPassword,
            oldPassword:oldPassword
          }).then(res=>{
            if(res.data.rc==1){
              setTimeout(()=>{
                this.$toast({
                  type: "text",
                  message: res.data.msg
                });
              },500)
            }
            if(res.data.rc==0){
              setTimeout(()=>{
                this.$toast({
                  type: "text",
                  message: "密码更新成功"
                });
              },500)
              this.$router.push('/setting/headIndex')
              }
            }
          ).catch(res=>{
            console.log(res)
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/scss/pages/setting/password";
</style>

