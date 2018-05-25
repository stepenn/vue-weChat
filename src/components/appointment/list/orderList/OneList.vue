<template>
  <div class="appointList">
    <ul class="listBox">
      <li v-for="item in point" >
        <div class="appointment-time">
          <img src="../../../../static/images/icon_tjsj_tjyy@2x.png" class="icon-time" />
          <span class="time">体检时间:</span>
          <span class="week">{{item.date}}</span>
        </div>
        <div>
          <div class="flex" v-for="key in item.list" @click="$router.push(`/appointment/make/detailsAction/${key.reservationNo}/${key.hasMemos}`)">
            <div class="left">
              <div class="leftCon">
                <span class="name">{{key.name}}</span>
                <span :class="key.stateName=='待体检'?'appointStatusA':(key.stateName=='待付款'?'appointStatusB':(
                        key.stateName=='未到检'?'appointStatusC':(key.stateName=='已取消'?'appointStatusD':(
                          key.stateName=='已完成'?'appointStatusE':''
                        ))
                      ))">{{key.stateName}}</span>
                  <span class="isCheat" v-if="key.hasMemos">有备忘信息</span>
              </div>
              <div class="number">{{key.identityNo}}</div>
            </div>
            <div>
              <img  class="details" src="../../../../static/images/icon_sqh@2x.png" />
            </div>
          </div>

        </div>
      </li>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-throttle-delay="200">
      </div>
    </ul>
  </div>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll';
    export default {
      name: "one-list",
      data(){
        return{
        }
      },
      directives: {
        infiniteScroll
      },
      props:['point','busy','loadMore'],
    }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/list";
</style>
