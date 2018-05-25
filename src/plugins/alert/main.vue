<template>
    <transition name="fade">
        <div class="sc-msgbox-wrapper" v-if="exist">
            <div class="sc-alert_box" :style="{zIndex: zIndex+1}">
                <div class="sc-alert_content">{{message}}</div>
                <div class="sc-alert_btn" @click="clickBtn">{{btnText}}</div>
            </div>
            <div class="sc-mask" :style="{zIndex: zIndex}" v-if="exist"></div>        
        </div>
    </transition>
</template>
<style>
.sc-alert_box {
  width: 66%;
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
  text-align: center;
}
.sc-alert_box .sc-alert_content {
  min-height: 36px;
  line-height: 30px;
  padding: 15px 20px 15px;
}
.sc-alert_box .sc-alert_btn {
  width: 70%;
  margin: 0 auto;
  line-height: 50px;
  color: #4983f5;
  border-top: 1px solid #dadfef;
}
</style>
<script>
export default {
  data() {
    return {
      zIndex: null,
      exist: false,
      message: "",
      btnText: ""
    };
  }
};
</script>