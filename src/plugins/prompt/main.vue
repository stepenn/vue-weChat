<template>
    <transition name="fade">
        <div class="sc-msgbox-wrapper" v-if="exist">
            <div class="sc-prompt_box" :style="{zIndex: zIndex+1}">
                <div class="sc-prompt_text">
                    <div class="sc-prompt_title">
                        {{title}}
                    </div>
                    <div class="sc-prompt_msg" v-html="message"></div>
                </div>

                <button class="button1" @click="successClick">{{successText}}</button>
                <button class="button2" @click="failClick" v-html="failText"></button>
            </div>
            <div class="sc-mask" :style="{zIndex: zIndex}" v-if="exist"></div>
        </div>
    </transition>
</template>
<style lang="scss" scoped>
.sc-msgbox-wrapper .sc-prompt_box {
  width: 72%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 5px;
  font-size: 15px;
  line-height: normal;
  overflow: hidden;
  color: #1c1c1c;
  padding: 50px 10px 8px 10px;

  .sc-prompt_text {
    padding: 0 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #E7EAF1;
    margin-bottom: 25px;
    .sc-prompt_title {
      margin-bottom: 18px;
    }
    .sc-prompt_title {
      font-weight: 500;
    }
    .sc-prompt_msg {
      line-height: 30px;
    }
  }
  button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    background-color: #4983f5;
    border-radius: 5px;
    &.button2 {
      background-color: #fff;
      color: #1c1c1c;
      margin-top: 8px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      title: "",
      message: "",
      successText: "",
      failText: "",
      zIndex: null,
      exist: false,
      message: "",
      cancelButtonText: "",
      confirmButtonText: ""
    };
  }
};
</script>