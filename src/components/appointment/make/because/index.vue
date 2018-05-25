<template>
  <div class="order-detail-container" id="detail-container" style="padding-top: 0;overflow: hidden;">
    <textarea v-model="beContent" placeholder="请输入无法预约的原因，以便于我们的运营人员向用户进行解释..." @click="getBecause">

    </textarea>
    <div class="unable-message save" @click="confirm">确定</div>
  </div>

</template>

<script>

  export default {
    name: "because",
    data(){
      return{
        beContent:'',
        CANCEL:this.$route.params.cancel,
      }
    },
    mounted(){
      var clientHeight = document.body.clientHeight;
      document.getElementById('detail-container').style.height=clientHeight+'px';
    },
    methods:{
      getBecause(e){
        this.beContent=e.target.value;
      },
      getEditCancel(cancel){
        this.$http.put("/hospital/reservation/"+this.CANCEL+"/cancel?cancelReason="+cancel,{
        }).then(res=>{
          //console.log(res.data.data.memos)
        })
      },
      confirm(){
        if(this.beContent.length){
          setTimeout(()=>{
            this.$toast({
              type: "text",
              message: "已取消该预约"
            });
          },500)
          this.$router.push(`/appointment/make/detailsAction/${this.CANCEL}/0`)
        }else{
          setTimeout(()=>{
            this.$toast({
              type: "text",
              message: "请输入无法预约的原因"
            });
          },500)
        }
        this.getEditCancel(this.beContent);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../static/scss/pages/appointment/because";
</style>
