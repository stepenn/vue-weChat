<template>
  <div class="userWrapper">
    <h3 v-if="!repeat" class="userMessage">以下是该用户的信息</h3>
    <h3 v-if="repeat" class="userMessage">该用户已确认到检，请勿重复操作！</h3>
    <div class="userBox">
      <div class="card">
        <p class="mark">
          <span>预约编号：</span>
          <span>姓名：</span>
          <span>性别：</span>
          <span>身份证：</span>
          <span>手机号：</span>
          <span>套餐：</span>
          <span>体检日期：</span>
          <span>状态：</span>
        </p>
        <p class="result">
          <span>{{reservationNo}}</span>
          <span>{{name}}</span>
          <span>{{gender}}</span>
          <span>{{identityNo}}</span>
          <span>{{mobilePhone}}</span>
          <span>{{setMeal}}</span>
          <span>{{date}}</span>
          <span>{{stateName}}</span>
        </p>
      </div>
    </div>
    <div class="confirm">
      <button class="confirm-button" @click="confirm" v-bind:disabled="disabled">确认到检</button>
    </div>
  </div>
</template>

<script>
    import weChat from '@/utils/wxAuthorization';
    import isLogin from '@/utils/isLogin';
    export default {
      name: "information",
      data(){
        return{
          reservationNo:'',
          name:"",
          gender:"",
          identityNo:"",
          mobilePhone:"",
          setMeal:"",
          date:"",
          stateName:"",
          state:"",
          token:"",  //用户登录后的token
          code:'',
          reservation:'',
          disabled:false,
          repeat:false

        }
      },
      created(){
        isLogin()
      },
      methods:{
        //扫码到检，获取用户信息
        getInfo(reservationNo){
          this.$http.get("/hospital/reservation/scan-qr-code?reservationNo="+reservationNo,{
          })
            .then(res=>{
              if(res.data.rc==1005){
                this.$router.push('/whetherCheck/permissions');//无权操作
              }
              if(res.data.rc==1006){
                this.repeat = true;
                this.disabled = true;
              }else if(res.data.rc==1){
                this.$toast({
                  type:'text',
                  message:res.data.msg,
                  duration:1000
                })
                this.disabled=true;
              }
              this.reservationNo = res.data.data.reservationNo
              this.name = res.data.data.name
              this.gender = res.data.data.gender;
              this.identityNo = res.data.data.identityNo;
              this.mobilePhone = res.data.data.mobilePhone
              this.setMeal = res.data.data.setMeal;
              this.date = res.data.data.date;
              this.stateName = res.data.data.stateName;
            })
        },
        //确认到检
        confirmCheck(reservationNo){
          this.$http.put("/hospital/reservation/"+this.reservationNo+"/confirm?reservationNo="+reservationNo,{
          }).then(res=>{
            if(res.data.rc==0){
              this.$router.push('/whetherCheck/guide'); //确认到检，引导用户体检
            }else if(res.data.rc==1){
              this.disabled = true;
              this.$toast({
                type:'text',
                message:res.data.msg,
                duration:1000
              })
            }
          })
        },
        confirm(){
          this.confirmCheck(this.reservationNo)
        }
      },
      mounted(){
        this.getInfo(this.$route.params.reservationNo)
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/scss/pages/whetherCheck/information";
</style>
