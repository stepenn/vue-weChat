webpackJsonp([10],{bgjL:function(a,e){},spJd:function(a,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t={name:"details",data:function(){return{name:"张三",gender:"男",idCard:"7868768689+6646",num:"13476220470",company:"势成一键康",employees:"29183",meal:"健康套餐A",date:"2018-04-11",state:"待体检",serialNum:"TG12231233",create:"2018-04-11",changeOrder:!1}},mounted:function(){var a=document.body.clientHeight;document.getElementById("detail-container").style.height=a+"px",console.log(this.$route.params.status)},methods:{confirm:function(){this.$router.push("/appointment/make/because"),this.state="已取消"}}},n={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"order-detail-container",attrs:{id:"detail-container"}},[s("div",{staticClass:"card user-message clearfix"},[s("p",{staticClass:"mark"},[a.name?s("span",[a._v("姓名：")]):a._e(),a._v(" "),a.gender?s("span",[a._v("性别：")]):a._e(),a._v(" "),a.idCard?s("span",[a._v("身份证号：")]):a._e(),a._v(" "),a.num?s("span",[a._v("联系电话：")]):a._e()]),a._v(" "),s("p",{staticClass:"result"},[a.name?s("span",[a._v(a._s(a.name))]):a._e(),a._v(" "),a.gender?s("span",[a._v(a._s(a.gender))]):a._e(),a._v(" "),a.idCard?s("span",[a._v(a._s(a.idCard))]):a._e(),a._v(" "),a.num?s("span",[a._v(a._s(a.num))]):a._e()])]),a._v(" "),s("div",{staticClass:"card hos-message clearfix"},[s("p",{staticClass:"mark"},[a.company?s("span",[a._v("公司名称：")]):a._e(),a._v(" "),a.employees?s("span",[a._v("员工号：")]):a._e()]),s("p",{staticClass:"result"},[a.company?s("span",[a._v(a._s(a.company))]):a._e(),a._v(" "),a.employees?s("span",[a._v(a._s(a.employees))]):a._e()])]),a._v(" "),s("div",{staticClass:"card hos-message clearfix"},[s("p",{staticClass:"mark"},[a.meal?s("span",[a._v("套餐：")]):a._e(),a._v(" "),a.date?s("span",[a._v("体检日期：")]):a._e(),a._v(" "),a.state?s("span",[a._v("状态：")]):a._e()]),s("p",{staticClass:"result"},[a.meal?s("span",[a._v(a._s(a.meal))]):a._e(),a._v(" "),a.date?s("span",[a._v(a._s(a.date))]):a._e(),a._v(" "),a.state?s("span",[a._v(a._s(a.state))]):a._e()])]),a._v(" "),s("div",{staticClass:"card hos-message clearfix"},[s("p",{staticClass:"mark"},[a.serialNum?s("span",[a._v("订单编号：")]):a._e(),a._v(" "),a.create?s("span",[a._v("订单创建日期：")]):a._e()]),s("p",{staticClass:"result"},[a.serialNum?s("span",[a._v(a._s(a.serialNum))]):a._e(),a._v(" "),a.create?s("span",[a._v(a._s(a.create))]):a._e()])]),a._v(" "),s("div",{staticClass:"unable-message",on:{click:function(e){a.changeOrder=!0}}},[a._v("无法预约")]),a._v(" "),"add"!==this.$route.params.status?s("div",{staticClass:"add-cheat",on:{click:function(e){a.$router.push("/appointment/make/cheat")}}},[a._v("添加备忘")]):a._e(),a._v(" "),"add"==this.$route.params.status?s("div",{class:"add"==this.$route.params.status?"add-cheat active":"add-cheat",on:{click:function(e){a.$router.push("/appointment/make/cheat")}}},[a._v("查看备忘")]):a._e(),a._v(" "),a.changeOrder?s("div",{staticClass:"mask"},[s("div",[s("p",[a._v("取消预约")]),a._v(" "),s("p",{staticClass:"margin-b"},[a._v("确定取消预约？是否可以再争取一下？")]),a._v(" "),s("p",{staticClass:"flex"},[s("span",{staticClass:"confirm",on:{click:a.confirm}},[a._v("确认")]),a._v(" "),s("span",{staticClass:"tel",on:{click:function(e){a.changeOrder=!1}}},[a._v("\n              再争取一下\n        ")])])])]):a._e()])},staticRenderFns:[]};var _=s("Z0/y")(t,n,!1,function(a){s("bgjL")},"data-v-f6fcea14",null);e.default=_.exports}});
//# sourceMappingURL=10.5177be3806e3105e77e9.js.map