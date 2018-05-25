<template>
  <div class="appointmentBox" id="box">
    <div class="appointment-search">
        <span class="listShow">列表显示</span>
        <img  class="search" src="../../../../static/images/icon_ss_yytj@2x.png" @click="$router.push('/appointment/list/search')" />
    </div>
    <div class="appointment-list">
        <div class="appointment-status" ref="navList">
          <div v-for="(item,index) in navData" :data-index="index" @click="tab(index)">
            <router-link class="item"  :to="item.url" active-class="active" replace>
              {{item.text}}
            </router-link>
          </div>
        </div>
        <div>
            <one-list
              :point="pointListData"
              :style="{width:clientWidth+'px'}"
              :busy ="busy"
              :loadMore = "loadMore"
            />
        </div>
      <div class="noneAppoint" v-if="!pointListData.length">暂无预约信息</div>
    </div>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import { swiper, swiperSlide } from "vue-awesome-swiper";

  import OneList from "./OneList";
  import infiniteScroll from 'vue-infinite-scroll';
  export default {
    name: "orderList",
    beforeRouteLeave(to,from,next){
      let site = 'appointment/make/date';
      if(from.path!==site){
        next()
      }else{
        this.$router.push.push(site)
      }
    },
    components: {
      swiper,
      swiperSlide,
      OneList
    },
    directives: {
      infiniteScroll
    },
    data(){
      return{
        num:0,
        clientWidth:document.body.clientWidth,
        busy:true,
        pageNo:1,
        pageSize:10,
        navData:[
          {text:"全部", status:0, url:"/appointment/list/orderList/0"},
          {text:"待体检", status:1, url:"/appointment/list/orderList/1"},
          {text:"未到捡", status:2,url:"/appointment/list/orderList/2"},
          {text:"已取消", status:3,url:"/appointment/list/orderList/3"},
          {text:"已完成", status:4,url:"/appointment/list/orderList/4"},
        ],
        pointListData:[],
        swiperOption: {
          clickable: true,
        }
      }
    },
    created(){
      this.getList();
    },
    mounted(){
      var clientHeight = document.body.clientHeight;
      document.getElementById('box').style.height=clientHeight+'px'
    },
    // activated() {
    //   this.back();
    // },
    methods:{
      tab(index){
        this.num = index;
        this.getList();
        this.pointListData = [];
      },
      //获取体检预约列表展示
      getDateList(state,pageNo,pageSize,success,fail){
        this.$http.get("/hospital/reservation/get-list-bystate?state="+state+"&pageNo="+pageNo+"&pageSize="+pageSize,{
        })
          .then(res=>{
            success ? success() : "";
            this.pointListData = this.pointListData.concat(res.data.data.resultList);
            if(res.data.data.resultList.length==0){
              this.busy = true;
              this.pageNo =1;
            }else{
              this.busy = false;
            }
          }).catch(res=>{
          fail ? fail() : "";
        })
      },
      getList(){
        var loading = this.$toast({
          type: "loading",
          duration: 1000,
          message: "加载中...",
          shadow: true
        });
        this.getDateList(
          this.num,this.pageNo,this.pageSize,
          ()=>{
            loading.close();
          },
          ()=>{
            loading.close();
          }
        )
      },
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.pageNo++;
          // this.$toast({
          //   type: "loading",
          //   duration: 600,
          //   message: "加载中...",
          //   shadow: true
          // });
          this.getList()
        }, 1000);
      },
      // beforeRouteLeave(to,from,next){
      //   //next('/appointment/make/date')
      // },
      back(){
        if (window.history.length <= 1) {
          this.$router.push({path:'/appointment/make/date'})
          return false
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/list";
</style>
