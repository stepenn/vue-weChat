<template>
  <div class="order-detail-container" id="detail-container">
    <div :class="name||gender||identityNo||mobilePhone?'card user-message clearfix':'hidden'">
      <p class="mark">
        <span v-if="name">姓名：</span>
        <span v-if="gender">性别：</span>
        <span v-if="identityNo">身份证号：</span>
        <span v-if="mobilePhone">联系电话：</span>
      </p>
      <p class="result">
        <span v-if="name">{{name}}</span>
        <span v-if="gender">{{gender}}</span>
        <span v-if="identityNo">{{identityNo}}</span>
        <span v-if="mobilePhone">{{mobilePhone}}</span>
      </p>
    </div>
    <div :class="companyName||employeeNo?'card hos-message clearfix':'hidden'">
      <p class="mark">
        <span v-if="companyName">公司名称：</span>
        <span v-if="employeeNo">员工号：</span>
      <p class="result">
        <span v-if="companyName">{{companyName}}</span>
        <span v-if="employeeNo">{{employeeNo}}</span>
      </p>
    </div>
    <div :class="setMealAlias||checkupDate||stateName?'card hos-message clearfix':'hidden'">
      <p class="mark">
        <span v-if="setMealAlias">套餐：</span>
        <span v-if="checkupDate">体检日期：</span>
        <span v-if="stateName">状态：</span>
      <p class="result">
        <span v-if="setMealAlias">{{setMealAlias}}</span>
        <span v-if="checkupDate">{{checkupDate}}</span>
        <span v-if="stateName">{{stateName}}</span>
      </p>
    </div>
    <div :class="reservationNO||date||canceler||cancelReason?'card hos-message clearfix':'hidden'">
      <p class="mark">
        <span v-if="reservationNO">订单编号：</span>
        <span v-if="date">订单创建日期：</span>
        <span v-if="canceler">取消人：</span>
        <span v-if="cancelReason">取消原因：</span>
      <p class="result">
        <span v-if="reservationNO">{{reservationNO}}</span>
        <span v-if="date">{{date}}</span>
        <span v-if="canceler">{{canceler}}</span>
        <span v-if="cancelReason">{{cancelReason}}</span>
      </p>
    </div>
    <div class="unable-message" @click="changeOrder = true" v-if="stateName=='待体检'">无法预约</div>
    <div class="add-cheat" @click="getMemosData" v-if="name">添加备忘</div>
    <div v-if="hasMemos=='true'&&name" :class="hasMemos=='true'?'add-cheat active':'add-cheat'" @click="getMemosData">查看备忘</div>
    <div class="mask" v-if="changeOrder">
      <div>
        <p>取消预约</p>
        <p class="margin-b">确定取消预约？是否可以再争取一下？</p>
        <p class="flex">
          <span class="confirm" @click="getEditCancel">确认</span>
          <span class="tel" @click="changeOrder = false">
                再争取一下
          </span>
        </p>
      </div>
    </div>
    <div class="action-status">
      <ul>
        <li class="action-item" v-for="item in logs">
          <span>{{item.creatAt}}</span>
          <span>{{item.operatorName}} 操作了</span>
          <span>{{item.operate}}</span>
        </li>
      </ul>
    </div>
    <div class="noneAppoint" v-if="detailsAction.length">暂无详细信息</div>
  </div>

</template>

<script>
    import { checkPhone,setCookie,getCookie} from "@/utils/tools";
    export default {
      name: "detailsAction",
      data(){
        return{
          name:'',
          gender:'',
          identityNo:'',
          mobilePhone:'',
          companyName:'',
          employeeNo:"",
          setMealAlias:'',
          checkupDate:'',
          stateName:'',
          orderNo:'',
          date:'',
          canceler:'',
          cancelReason:'',
          logs:[],
          detailsAction:'',
          reservationNO:'',
          memos:this.$route.params.reservation,
          memosData:'',
          cancel:this.$route.params.reservation,
          hasMemos:this.$route.params.isCheat,
          changeOrder: false,
        }
      },
      created(){
        this.reservationNO = this.$route.params.reservation;
      },
      mounted(){
        var clientHeight = document.body.clientHeight;
        document.getElementById('detail-container').style.height=clientHeight+'px';
        this.getReservation();
        this.logs = this.quickSort(this.logs,'creatAt',false);
      },
      methods:{
        //按时间进行排序
         quickSort(arr,name,snum){
          if(arr.length<=1){return arr;}
          var pivotIndex=Math.floor(arr.length/2);
          var pivot=arr.splice(pivotIndex,1)[0];
          var middleNum=pivot[name];
          var left=[];
          var right=[];
          if(snum){
            for(var i=0;i<arr.length;i++){
              if(Number(arr[i][name])<=Number(middleNum) ){
                left.push(arr[i]);
              }else{
                right.push(arr[i]);
              }
            }
          }else{
            for(var i=0;i<arr.length;i++){
              if(arr[i][name]<=middleNum){
                left.push(arr[i]);
              }else{
                right.push(arr[i]);
              }
            }
          }
          return this.quickSort(left,name,snum).concat([pivot],this.quickSort(right,name,snum));
        },
          getReservation(){
            this.$http.get("/hospital/reservation/"+this.reservationNO,{
            })
              .then(res=>{
                var r = res.data.data;
                this.detailsAction = r;
                this.name = r.name?r.name:'';
                this.gender=r.gender?r.gender:'';
                this.identityNo=r.identityNo;
                this.mobilePhone=r.mobilePhone;
                this.companyName=r.companyName;
                this.employeeNo=r.employeeNo;
                this.setMealAlias=r.setMealAlias;
                this.checkupDate=r.checkupDate;
                this.stateName=r.stateName;
                this.reservationNO=r.reservationNO;
                this.date=r.date;
                this.canceler=this.canceler;
                this.cancelReason=this.cancelReason;
                this.logs =r.logs;
              })
          },
        //获取备忘信息
        getMemosData(){
          this.$http.get("/hospital/reservation/"+this.cancel+"/memos",{
          }).then(res=>{
            this.memosData=res.data.data.memos;
            this.$router.push(`/appointment/make/cheat/${this.memos}/${encodeURIComponent(JSON.stringify(this.memosData))}`)
          })
        },
        //取消预约
        getEditCancel(){
          this.$http.put("/hospital/reservation/"+this.cancel+"/cancel",{
          }).then(res=>{
            this.stateName='已取消';
            this.$router.push(`/appointment/make/because/${this.cancel}/0`);
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/details";
</style>
