import {setCookie,getCookie} from "@/utils/tools";
let weChat = {
  getCode:function(appids){
    /**
     * 获取微信code
     */
    let appid = appids;
    let href = window.location.href;
    let redirect_uri = encodeURI(href.split("#")[0]);
    redirect_uri = redirect_uri.replace(/&/g, '%26');
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=abcdefghigklmnopqrstuvwxyz#wechat_redirect";
  },
  getUrlStr : function(name){
    /**
     * 获取地址栏参数
     */
    let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
    if(reg.test(window.location.href)){
      return unescape(RegExp.$2.replace(/\+/g," "))
    }
    return undefined
  },
  /**
    跳转的重定向地址
  * */
  getHref:function(appid,redirect_url){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_url+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  },
  /**
   * 通过微信登录
   * **/

}
export default weChat;
