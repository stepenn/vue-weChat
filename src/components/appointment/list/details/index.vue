<template>
  <div class="order-detail-container" id="detail-container">
    <div class="card user-message clearfix">
      <p class="mark">
        <span v-if="name">姓名：</span>
        <span v-if="gender">性别：</span>
        <span v-if="idCard">身份证号：</span>
        <span v-if="num">联系电话：</span>
      </p>
      <p class="result">
        <span v-if="name">{{name}}</span>
        <span v-if="gender">{{gender}}</span>
        <span v-if="idCard">{{idCard}}</span>
        <span v-if="num">{{num}}</span>
      </p>
    </div>
    <div class="card hos-message clearfix">
      <p class="mark">
        <span v-if="company">公司名称：</span>
        <span v-if="employees">员工号：</span>
      <p class="result">
        <span v-if="company">{{company}}</span>
        <span v-if="employees">{{employees}}</span>
      </p>
    </div>
    <div class="card hos-message clearfix">
      <p class="mark">
        <span v-if="meal">套餐：</span>
        <span v-if="date">体检日期：</span>
        <span v-if="state">状态：</span>
      <p class="result">
        <span v-if="meal">{{meal}}</span>
        <span v-if="date">{{date}}</span>
        <span v-if="state">{{state}}</span>
      </p>
    </div>
    <div class="card hos-message clearfix">
      <p class="mark">
        <span v-if="serialNum">订单编号：</span>
        <span v-if="create">订单创建日期：</span>
      <p class="result">
        <span v-if="serialNum">{{serialNum}}</span>
        <span v-if="create">{{create}}</span>
      </p>
    </div>
    <div class="unable-message" @click="changeOrder = true">无法预约</div>
    <div class="add-cheat" v-if="this.$route.params.status!=='add'" @click="$router.push('/appointment/make/cheat')">添加备忘</div>
    <div v-if="this.$route.params.status=='add'" :class="this.$route.params.status=='add'?'add-cheat active':'add-cheat'" @click="$router.push('/appointment/make/cheat')">查看备忘</div>
    <div class="mask" v-if="changeOrder">
      <div>
        <p>取消预约</p>
        <p class="margin-b">确定取消预约？是否可以再争取一下？</p>
        <p class="flex">
          <span class="confirm" @click="confirm">确认</span>
          <span class="tel" @click="changeOrder = false">
                再争取一下
          </span>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "details",
        data(){
          return{
            name:'张三',
            gender:'男',
            idCard:'7868768689+6646',
            num:'13476220470',
            company:'势成一键康',
            employees:'29183',
            meal:'健康套餐A',
            date:'2018-04-11',
            state:'待体检',
            serialNum:'TG12231233',
            create:'2018-04-11',
            changeOrder: false
          }
        },
        mounted(){
          var clientHeight = document.body.clientHeight;
          document.getElementById('detail-container').style.height=clientHeight+'px';
          console.log(this.$route.params.status)
        },
        methods:{
          confirm(){
            this.$router.push('/appointment/make/because');
            this.state='已取消'
          }
        }

    }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/details";
</style>
