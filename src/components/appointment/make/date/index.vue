<template>
    <div id="content">
      <div class="titleH2">
        <div class="timeSet clearfix">
          <h3 class="currentTime" v-html="month"></h3>
          <div class="listShow" @click="$router.push('/appointment/list/orderList/0')">列表显示</div>
        </div>
        <div class="calendar">
          <ul class="week"><li class="item" v-for="item in weekday">{{item}}</li></ul>
          <div class="calendarBox" id="calendarBox">
              <li class="monitor" @click="make($event)">
                <span class="keyItem"  v-for="(item,index) in dateData"
                      :class="item.date==curTime?(index==firstIndex?'activeSpan':(count>1?'today':'today clickStatus1')):(item.isWork?(item.num==0?'sur':'cur'):'gray')  "
                      :data-index="index"
                      :data-date="item.date">
                  {{typeof item.date=='string'?item.date.slice(8):null}}
                </span>
              </li>
          </div>
          <img class="prev"  @click="lastWeek" src="../../../../static/images/icon_zjt_tjyy@2x.png"  />
          <img class="next"  @click="nextWeek" src="../../../../static/images/icon_yjt_tjyy@2x.png"  />
        </div>
      </div>
      <div :class="pointListData.length?'appointList':'appBg'">
        <ul class="listBox">
          <li class="flex" v-for="item in pointListData" @click="$router.push(`/appointment/make/detailsAction/${item.reservationNo}/${item.hasMemos}`)">
            <div class="left">
              <div class="leftCon">
                <span class="name">{{item.name}}</span>
                <span :class="item.stateName=='待体检'?'appointStatusA':(item.stateName=='待付款'?'appointStatusB':(
                  item.stateName=='未到检'?'appointStatusC':(item.stateName=='已取消'?'appointStatusD':(
                    item.stateName=='已完成'?'appointStatusE':''
                  ))
                ))">{{item.stateName}}</span>
                <span class="isCheat" v-if="item.hasMemos">有备忘信息</span>
              </div>
              <div class="number">{{item.identityNo}}</div>
            </div>
            <div>
              <img  class="details" src="../../../../static/images/icon_sqh@2x.png"  />
            </div>
          </li>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-throttle-delay="200">
          </div>
        </ul>
      </div>
      <div  class="noneAppoint" v-if="!pointListData.length">
        暂无预约信息
      </div>
    </div>
</template>

<script>
  import infiniteScroll from 'vue-infinite-scroll';
  import { checkPhone,setCookie,getCookie} from "@/utils/tools";
  import isLogin from '@/utils/isLogin';
  import "swiper/dist/css/swiper.css";
  import $ from 'jquery';
    export default {
        name: "date",
        data(){
          return{
            weekday:['日','一','二','三','四','五','六'],
            month:'',
            currentDate:'',
            dateData:[1,2,3,4,5,6,7],
            pointListData:[],
            curTime:'',
            busy:true,
            drag:false,
            pageNo:0,
            pageSize:10,
            clen:7,
            currentFirstDate:'',
            code:'',
            authInfo:null,
            firstIndex:1,
            count:0,
            isLogin:'',
            checkDate:''
          }
        },
        directives: {
          infiniteScroll
        },
        created(){
          isLogin();
        },
        methods:{
          getDateData(cur){
            this.$http.get("/hospital/reservation/reservation-within-week?date="+cur,{
            }).then(res=>{
                this.dateData = res.data.data;
                if(res.data.rc==1004){
                  this.$router.push('/user/register/unBind')
                }
              }
            ).catch(res=>{
              console.log(res)
            })
          },
          //获取体检预约列表信息
          getDateList(date,pageNo,pageSize){
            this.$http.get("/hospital/reservation/get-list-bydate?date="+date+"&pageNo="+pageNo+"&pageSize="+pageSize,{
            })
              .then(res=>{
                  this.pointListData = this.pointListData.concat(res.data.data.resultList);
                  this.pageNo = res.data.data.pageNo;
                  if(res.data.data.resultList.length==0){
                    this.busy = true;
                  }else{
                    this.busy = false;
                  }
                  if(res.data.rc==1004){
                    this.$router.push('/user/register/unBind')
                  }
            })
          },
          //点击的时候添加选中状态
          make(e){
            var child = $(".monitor").children();
            child.each(function (i) {
              if($(e.target).attr('data-index')==i){
                if( $(this).hasClass('today')){
                  $(this).addClass('clickStatus1');
                }else{
                  $(this).addClass('clickStatus');
                }
              }else{
                if($(this).hasClass('activeSpan')){
                  $(this).removeClass('activeSpan')
                }
                $(this).removeClass('clickStatus');
                $(this).removeClass('clickStatus1');
              }
            })
            var date = $(e.target).attr('data-date');
            this.pointListData = [];
            this.pageNo =1;
            this.firstIndex = 7;
            this.getDateList(date,this.pageNo,10)

          },
          //滑动和左右切换的时候，默认选中星期一，并移除其它的选中状态
          removeStatus(){
            var child = $(".monitor").children();
            var self = this;
            child.each(function (i) {
              if(i==self.firstIndex){
                $(this).addClass('activeSpan');
              }else{
                if($(this).hasClass('clickStatus')){
                  $(this).removeClass('clickStatus');
                }
              }
            })
          },
          loadMore(){
            this.busy = true;
            setTimeout(() => {
              this.pageNo++;
              this.getDateList(this.curTime,this.pageNo,this.pageSize);
            }, 1000);
          },
          formatDate(date){
            var day = date.getDate();
            return day
          },
          formateMonth(date){
            var year = date.getFullYear()+'年';
            var month = (date.getMonth()+1)+'月';
            return year+month
          },
          getCurTime(date){
            var m = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):date.getMonth() + 1;
            var g = date.getDate()<10?'0'+date.getDate():date.getDate();
            var t = date.getFullYear() + '-' + m + '-' + g;
            return t;
          },
          checkTime(date){
            var d = this.formatDate(date)+1;
            var m = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):date.getMonth() + 1;
            var g = d<10?'0'+d:d;
            var t = date.getFullYear() + '-' + m + '-' + g;
            return t;
          },
          addDate(date,n){
            date.setDate(date.getDate()+n);
            return date;
          },
          setDates(date){
            var week = date.getDay();
            date = this.addDate(date,week*-1);
            this.checkDate = this.checkTime(date); //每次切换停留在周一
            this.currentFirstDate = new Date(date);//当前所在日一周内的日期
            var d = new Date(this.currentFirstDate);
            var m = (d.getMonth() + 1)<10?'0'+(d.getMonth() + 1):d.getMonth() + 1;
            var g = d.getDate()<10?'0'+d.getDate():d.getDate();
            this.currentDate = d.getFullYear() + '-' + m + '-' + g;
            for(var i = 0;i<this.clen;i++){
              this.formatDate(i==0 ? date : this.addDate(date,1));
              var month = this.formateMonth(date);//获取当前所在的月份
              this.month = month;
            }
          },
          lastWeek(){
            this.setDates(this.addDate(this.currentFirstDate,-7));
            this.getDateData(this.currentDate);
            this.pointListData = [];
            this.pageNo =1
            this.firstIndex = 1;
            this.count=this.count+1;
            this.removeStatus();
            this.getDateList(this.checkDate,this.pageNo,10)

          },
          nextWeek(){
            this.setDates(this.addDate(this.currentFirstDate,7));
            this.getDateData(this.currentDate);
            this.pointListData = [];
            this.pageNo =1;
            this.firstIndex=1;
            this.count=this.count+1;
            this.removeStatus();
            this.getDateList(this.checkDate,this.pageNo,10)
          },
        },
        mounted(){
          var clientHeight = document.body.clientHeight;
          document.getElementById('content').style.height=clientHeight+'px';
          this.curTime = this.getCurTime(new Date()); //当前所处几月几号
          this.setDates(new Date());
          this.loadMore();
          this.getDateData(this.currentDate);
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/make";
</style>
