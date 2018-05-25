<template>
  <div class="Search">
    <div class="search-box">
      <input id="searchInput" class="search-input" type="search" v-model="keyword" placeholder="请输入姓名、身份证号、手机号" @click="getKeyword" @keyup.13="keySearch($event)"/>
      <img class="search-icon" src="../../../../static/images/icon_search_tjyy@2x.png" />
      <span class="search-word" @click="onSearch">搜索</span>
      <img class="search-icon-two" v-if="changeOrder" src="../../../../static/images/icon_qk_yytj@2x.png" @click="clearWord" />
    </div>
    <div class="appointList">
      <ul class="listBox">
        <li v-for="item in pointListData">
          <div class="appointment-time">
            <img src="../../../../static/images/icon_tjsj_tjyy@2x.png" class="icon-time" />
            <span class="time">体检时间:</span>
            <span class="week">{{item.date}}</span>
          </div>
          <div>
            <div class="flex" v-for="key in item.list">
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
              <div class="details" @click="$router.push(`/appointment/make/detailsAction/${key.reservationNo}/${key.hasMemos}`)">&gt;</div>
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="noneAppoint" v-if="isResult">该体检者不存在</div>
  </div>

</template>

<script>
    import $ from 'jquery';
    export default {
      name: "search",
      data(){
        return{
          keyword:'',
          changeOrder: false,
          pointListData:[],
          isResult:false,
          key: ''
        }
      },
      // watch:{
      //   keyword(){
      //     this.getKeyword()
      //   }
      // },

      methods:{
        getKeyword(e){
          this.keyword = e.target.value;
          this.changeOrder = true;
        },
        clearWord(){
          this.changeOrder = false;
          this.keyword = '';
          this.isResult = false
          document.getElementById('searchInput').value = "";
          this.pointListData = [];
        },
        getSearchList(keyWord,pageNo,pageSize){
          this.$http.get("/hospital/reservation/search-list?keyWord="+keyWord+"&pageNo="+pageNo+"&pageSize="+pageSize,{
          })
            .then(res=>{

              this.pointListData = res.data.data.resultList;
              if(!res.data.data.resultList.length){
                this.isResult=true;
              }
            })
        },
        onSearch(){
          this.getSearchList(this.keyword,1,10);
        },
        keySearch (e) {
            e.preventDefault();
            document.activeElement.blur();
            this.getSearchList(this.keyword,1,10);
        }
      },
      mounted(){
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/search";
</style>
