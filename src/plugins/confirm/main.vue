<template>
    <transition name="fade">
      <div class="sc-msgbox-wrapper" v-if="exist">
          <div class="sc-confirm_box" :style="{zIndex: zIndex+1}">
              <div class="sc-confirm_message">{{message}}</div>
              <div class="sc-confirm_btns">
                  <span class="sc-confirm_btn sc-confirm_cancel" @click="handleCancel">{{cancelButtonText}}</span>
                  <span class="sc-confirm_btn sc-confirm_confirm" @click="handleConfirm">{{confirmButtonText}}</span>                    
              </div>
          </div>
          <div class="sc-mask" :style="{zIndex: zIndex}" v-if="exist"></div>
      </div>
    </transition>
</template>
<style>
.sc-confirm_box {
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
  text-align: center;
  padding-bottom: 15px;
}
.sc-confirm_box .sc-confirm_message {
  width: 90%;
  line-height: 30px;
  padding: 50px 0;
  margin: 0 auto;
}
.sc-confirm_box .sc-confirm_btns {
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  justify-content: center;
  align-items: center;
}
.sc-confirm_box .sc-confirm_btns .sc-confirm_btn {
  width: 45%;
  height: 35px;
  line-height: 35px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 0 5px;
}
.sc-confirm_box .sc-confirm_btns .sc-confirm_confirm{
    border-color: #4983f5;
    color: #fff;
    background-color: #4983f5;
}
</style>
<script>
export default {
  data() {
    return {
      zIndex: null,
      exist: false,
      message: '',
      cancelButtonText: '',
      confirmButtonText: ''
    };
  }
};
</script>