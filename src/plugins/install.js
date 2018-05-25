var $zIndex = 2000 //设置全局的zIndex

import AlertPlugin from './alert/main'
import ConfirmPlugin from './confirm/main'
import ToastPlugin from './toast/main'
import PromptPlugin from './prompt/main'

export const Alert = {}
export const Confirm = {}
export const Toast = {}
export const Prompt = {}
Alert.install = (Vue) => {
    // 添加实例方法，以供全局调用
    Vue.prototype.$alert = (message, btnText) => {
        const AlertConstructor = Vue.extend(AlertPlugin)
        const instance = new AlertConstructor() // 创建alert子实例
        instance.$mount(document.createElement('div')) // 挂载实例到我们创建的DOM上
        document.body.appendChild(instance.$el)
        instance.zIndex = $zIndex++;
        /**
         * 插件中的data和method的传值
         */
        instance.message = message //若只传入一个参数
        instance.btnText = btnText || '好'
        instance.exist = true // 调用$alert()则显示提示
        return new Promise((resolve, reject) => {
            instance.clickBtn = () => {
                instance.exist = false
                resolve()
            }
        })

    }
}
Confirm.install = (Vue) => {
    // 添加实例方法，以供全局调用
    Vue.prototype.$confirm = (message, json) => {
        const ConfirmConstructor = Vue.extend(ConfirmPlugin)
        const instance = new ConfirmConstructor() // 创建alert子实例
        instance.$mount(document.createElement('div')) // 挂载实例到我们创建的DOM上
        document.body.appendChild(instance.$el)
        instance.zIndex = $zIndex++;
        instance.exist = true // 调用显示提示
            /**
             * 插件中的data和method的传值
             */
        instance.message = message //若只传入一个参数
        instance.cancelButtonText = json.cancelButtonText || '取消'
        instance.confirmButtonText = json.confirmButtonText || '确定'
        return new Promise((resolve, reject) => {
            instance.handleConfirm = () => {
                    instance.exist = false
                    resolve()
                },
                instance.handleCancel = () => {
                    instance.exist = false
                    reject()
                }
        })
    }
}
Toast.install = (Vue) => {
    Vue.prototype.$toast = (json) => {
        const ToastConstructor = Vue.extend(ToastPlugin)
        const instance = new ToastConstructor()
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
        instance.zIndex = $zIndex++;
        instance.exist = true
        instance.position = json.position || 'center'
        instance.shadow = json.shadow || false
        instance.type = json.type || 'text'
        instance.message = json.message
        json.duration <= 0 ? '' : setTimeout(() => { instance.exist = false }, json.duration || 1000)
            //设置关闭方法
        instance.close = function() {
                instance.exist = false
            }
            //返回instance实例
        return instance
    }
}
Prompt.install = (Vue) => {
    Vue.prototype.$prompt = (json) => {
        const PromptConstructor = Vue.extend(PromptPlugin)
        const instance = new PromptConstructor()
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
        instance.zIndex = $zIndex++;
        instance.exist = true
        instance.title = json.title || "提示"
        instance.message = json.message || ""
        instance.successText = json.successText || "确定"
        instance.failText = json.failText || "取消"
        return new Promise((resolve, reject) => {
            instance.successClick = () => {
                    instance.exist = false
                    resolve()
                },
                instance.failClick = () => {
                    instance.exist = false
                    reject()
                }
        })
    }
}