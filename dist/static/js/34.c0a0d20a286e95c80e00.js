webpackJsonp([34],{tauV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("GKmE"),i={name:"bind-mobile-no",components:{captchaBox:a("Wuyz").a},data:function(){return{Unionid:"",mobilePhone:"",vCode:"",leftTime:60,getCodeText:"获取验证码",captchaToken:"",timeOut:!1,disabled:!0,timer:null,showCaptcha:!1,authInfo:null,beforeUrl:""}},watch:{mobilePhone:function(){this.handleClick()},vCode:function(){this.handleClick()},leftTime:function(t,e){t<=0&&(clearInterval(this.timer),this.getCodeText="重新获取",this.leftTime=60,this.timeOut=!1)}},created:function(){this.Unionid=Object(o.c)("nickName");var t=Object(o.c)("authInfo");this.authInfo=JSON.parse(t)},methods:{handleClick:function(){this.mobilePhone.length>0&&this.vCode.length>0?this.disabled=!1:this.disabled=!0},setTimeOut:function(){var t=this;this.timeOut=!0,this.timer=setInterval(function(){t.leftTime-=1},1e3)},handleBindNo:function(){var t=this;this.$http.post("/hospital/login/wechat-bind",{mobilePhone:this.mobilePhone,code:this.vCode,authInfo:this.authInfo}).then(function(e){0==e.data.rc&&(Object(o.d)("Authorization","Base "+e.data.data.token.data),Object(o.d)("realName",e.data.data.userinfo.realName),Object(o.d)("userName",e.data.data.userinfo.userName),t.beforeUrl=Object(o.c)("beforeUrl"),t.$router.push(t.beforeUrl),Object(o.b)("beforeUrl")),1==e.data.rc&&t.$toast({type:"text",message:e.data.msg,duration:1e3}),1004==e.data.rc?(Object(o.d)("Authorization","Base "+e.data.data.token.data),setTimeout(function(){t.$router.push("/user/register/unBind")},1e3)):1003==e.data.rc&&t.$toast({type:"text",message:e.data.msg,duration:1e3})}).catch(function(t){console.log(t)})},getCode:function(){var t=this;Object(o.a)(this.mobilePhone)&&60===this.leftTime?this.$http.get("/hospital/login/is-mobilephone-wechatbind?mobilePhone="+this.mobilePhone,{}).then(function(e){e.data.data.isWechatBind?t.$toast({message:"手机号已绑定,请重新输入"}):t.$http.post("/hospital/login/get-verification-code",{mobilePhone:t.mobilePhone}).then(function(e){0===e.data.rc?e.data.data.isHaveCaptcha?(t.captchaToken=e.data.data.captchaToken,t.showCaptcha=!0):(t.$toast({message:"验证码获取成功"}),t.setTimeOut()):t.$toast({type:"text",message:e.data.msg})})}):this.$toast({type:"text",message:"请输入正确手机号"})},verifySuccess:function(){console.log("验证成功"),this.setTimeOut()},hideCaptcha:function(t){this.showCaptcha=!t}},mounted:function(){}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"register-container"},[a("h3",[t._v("您好, "),a("span",{staticClass:"hos-port"},[t._v(t._s(t.Unionid))]),t._v("  ,请先绑定手机号")]),t._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.mobilePhone,expression:"mobilePhone"}],attrs:{type:"number",placeholder:"请输入手机号",maxlength:"11"},domProps:{value:t.mobilePhone},on:{input:function(e){e.target.composing||(t.mobilePhone=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.vCode,expression:"vCode"}],attrs:{type:"number",placeholder:"请输入验证码"},domProps:{value:t.vCode},on:{input:function(e){e.target.composing||(t.vCode=e.target.value)}}}),t._v(" "),t.timeOut?a("span",{staticStyle:{color:"#00bd93"}},[t._v("已发送（"+t._s(t.leftTime)+"s）")]):t._e(),t._v(" "),t.timeOut?t._e():a("span",{staticClass:"reget",on:{click:t.getCode}},[t._v(t._s(t.getCodeText))])]),t._v(" "),a("button",{staticClass:"next-button",attrs:{disabled:t.disabled},on:{click:t.handleBindNo}},[t._v("绑定")]),t._v(" "),t.showCaptcha?a("captcha-box",{attrs:{captchaToken:t.captchaToken},on:{verifySuccess:t.verifySuccess,hideCaptcha:t.hideCaptcha}}):t._e()],1)},staticRenderFns:[]},s=a("Z0/y")(i,n,!1,null,null,null);e.default=s.exports}});
//# sourceMappingURL=34.c0a0d20a286e95c80e00.js.map