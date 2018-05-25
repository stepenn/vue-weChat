<template>
  <div class="convention">
    <h2>每日可预约上限</h2>
    <div class="convention-set">
      <span class="reduce" @click="reduce">-</span>
      <span class="default">{{msg}}</span>
      <span class="add" @click="add">+</span>
    </div>
    <div class="confirm" @click="save">保存</div>
  </div>

</template>

<script>
    export default {
        name: "convention",
        data(){
          return {
            msg:'10'
          }
        },
        methods:{
          reduce(){
            this.msg--;
            if(this.msg<=0){
              this.msg = 0;
            }
          },
          add(){
            this.msg++;
            if(this.msg>=100){
              this.msg=100;
            }
          },
          save(){
            this.$router.push('/setting/headIndex')
            setTimeout(()=>{
              this.$toast({
                type: "text",
                message: "保存成功"
              });
            },500)

          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/scss/pages/setting/convention";
</style>
