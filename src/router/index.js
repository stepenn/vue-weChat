import Vue from 'vue'
import Router from 'vue-router'
import routes from './map'
import setWechatTitle from "@/utils/setWechatTitle";
import { setCookie,getCookie} from "@/utils/tools";
Vue.use(Router)
const router = new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
});
router.beforeEach((to, from, next) => {
   document.title = to.meta.title;
   setWechatTitle(to.meta.title);
   next();
});
export default router

