import Vue from 'vue'
/* 强制聚焦指令 */
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
        // 聚焦元素
        el.focus()
    }
})