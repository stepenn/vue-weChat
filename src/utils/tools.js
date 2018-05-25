
//验证身份证
export function checkID(ID) {
    let regExp = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    return regExp.test(ID) ? true : false;
}

// 校验手机号
export function checkPhone(number) {
    let regExp = /^1\d{10}$/;
    return regExp.test(number) ? true : false;
}

// 校验密码强度
export function checkPwd(pwd) {
    let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    return regExp.test(pwd) ? true : false;
}

export function refreshPage() {
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
        // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', '/favicon.ico')
    var iframeCallback = function() {
        setTimeout(function() {
            iframe.removeEventListener('load', iframeCallback)
            document.body.removeChild(iframe)
        }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
}

/* cookie的存取 start */
import Cookies from 'js-cookie'

export function setCookie(name, value) {
    return Cookies.set(name, value)
}
export function getCookie(name) {
    return Cookies.get(name)
}
export function delCookie(name) {
    return Cookies.remove(name)

}
/* cookie的存取 end */

/* 手机机型和环境判断 start */
export function isWechat() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false
}
export function isAndroid() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('android') > -1 ? true : false
}
export function isiOS() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false
}
/* 手机机型和环境判断 end */
