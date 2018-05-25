import weChat from '@/utils/wxAuthorization';
import { setCookie,getCookie} from "@/utils/tools";

const isLogin = ()=>{
  let isLogin = getCookie('Authorization'); //是否有token登录信息
  if(!isLogin) {
    let beforeUrl = window.location.href;
    let fullPath = beforeUrl.split('#')[1]
    setCookie('beforeUrl', fullPath)
    let appId = process.env.WX_APPID;
    let redirect = process.env.WX_PATH + '/#' + '/author?fullPath=aaa';
    let redirect_url = encodeURIComponent(redirect);
    weChat.getHref(appId, redirect_url);
  }
}
export default isLogin;
