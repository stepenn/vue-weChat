webpackJsonp([30],{iIRN:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("3cXf"),a=o.n(n),i=o("Wuyz"),s=o("AZ7y"),c=o("GKmE"),h={components:{captchaBox:i.a},data:function(){return{mobilePhone:"",captchaToken:"",showCaptcha:!1,code:"",authInfo:null}},created:function(){this.code=s.a.getUrlStr("code"),this.handleUserInfo(this.code)},methods:{next:function(){Object(c.a)(this.mobilePhone)?this.verifyTel(this.mobilePhone):this.$toast({type:"text",position:"center",message:"请输入正确的手机号",duration:2e3})},verifyTel:function(t){var e=this,o=this.$toast({type:"loading",shadow:!0,duration:0,message:"正在加载"});this.$http.get("/hospital/login/verify-mobile-phone?mobilePhone="+t,{}).then(function(t){t.data.data.isRegister?(o.close(),e.$toast({type:"text",message:"手机号已注册，请直接登录"})):e.getCode(function(){o.close()})}).catch(function(t){o.close()})},verifySuccess:function(){console.log("验证成功"),this.$router.push({path:"/user/register/check-number/"+this.mobilePhone})},hideCaptcha:function(t){this.showCaptcha=!t},getCode:function(t){var e=this;this.$http.post("/hospital/login/get-verification-code",{mobilePhone:this.mobilePhone}).then(function(o){0===o.data.rc?o.data.data.isHaveCaptcha?(e.captchaToken=o.data.data.captchaToken,e.showCaptcha=!0):e.$router.push({path:"/user/register/check-number/"+e.mobilePhone}):e.$toast({type:"text",message:o.data.msg}),t&&t()})},handleUserInfo:function(t){var e=this;this.$http.get("/hospital/login/get-wechat-authinfo?code="+t,{}).then(function(t){e.authInfo=a()(t.data.data),Object(c.d)("authInfo",e.authInfo)})}},mounted:function(){}},r={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"register-container"},[o("h2",[t._v("注册")]),t._v(" "),o("p",[t._v("注册即表示已阅读并同意\n    "),o("router-link",{attrs:{to:"/user/register/serviceTerm"}},[t._v("服务条款")])],1),t._v(" "),o("div",{staticClass:"input-box"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.mobilePhone,expression:"mobilePhone"}],attrs:{type:"number",placeholder:"请输入手机号"},domProps:{value:t.mobilePhone},on:{input:function(e){e.target.composing||(t.mobilePhone=e.target.value)}}})]),t._v(" "),o("button",{staticClass:"next-button",attrs:{disabled:t.mobilePhone.length<=0},on:{click:t.next}},[t._v("下一步")]),t._v(" "),o("div",{staticClass:"toLogin"},[o("div",[t._v("有账号，")]),t._v(" "),o("router-link",{attrs:{to:"/user/login"}},[t._v("去登录")]),t._v(" "),t._m(0)],1),t._v(" "),t.showCaptcha?o("captcha-box",{attrs:{captchaToken:t.captchaToken},on:{verifySuccess:t.verifySuccess,hideCaptcha:t.hideCaptcha}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{attrs:{src:o("uPhU")}})])}]};var u=o("Z0/y")(h,r,!1,function(t){o("ptfk")},null,null);e.default=u.exports},ptfk:function(t,e){}});
//# sourceMappingURL=30.7ae3d99a26aaa091ccff.js.map