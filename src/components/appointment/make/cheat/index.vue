<template>
  <div class="order-detail-container" id="detail-container" style="padding-top: 0;overflow: hidden;">
    <textarea v-model="cheatContent" placeholder="请输入备忘内容..." @click="getCheat">
    </textarea>
    <div class="unable-message save" @click="confirm">保存</div>
  </div>

</template>

<script>

    export default {
      name: "cheat",
      data(){
        return{
          cheatContent:JSON.parse(this.$route.params.memosData),
          memosData:'',
          MEMO:this.$route.params.memos,
        }
      },
      mounted(){
        var clientHeight = document.body.clientHeight;
        document.getElementById('detail-container').style.height=clientHeight+'px';
      },
      methods:{
        getCheat(e){
          this.cheatContent=e.target.value;
        },
        getEditMemos(memos){
          this.$http.put("/hospital/reservation/"+this.MEMO+"/memos?memos="+memos,{
          }).then(res=>{
            //console.log(res.data.data.memos)
          })
        },
        confirm(){
          if(this.cheatContent.length){
            setTimeout(()=>{
              this.$toast({
                type: "text",
                message: "备忘已保存"
              });
            },500)
            this.$router.push(`/appointment/make/detailsAction/${this.MEMO}/true`)
          }else{
            setTimeout(()=>{
              this.$toast({
                type: "text",
                message: "您还没有添加备忘噢"
              });
            },500)
          }
          this.getEditMemos(this.cheatContent)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/cheat";
</style>
