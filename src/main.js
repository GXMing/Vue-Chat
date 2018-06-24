// import Vue from "vue/dist/vue.js";  //有编译器的完整版
// import Vue from "vue";  //无编译器只能用render 不能用template 小30%

// import "./test_babel.js"   //test babel

import 'es6-promise/auto';  //使用vuex需要Promise   或使用babel-polyfill这已使用transform-runtime所以用es6-promise
import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";

new Vue({
    el:"#App",
    store,
    components:{ App },
    render (h) {
        return h('App')
    }
    // template:"<App/>"
})


//热重加载
if(module.hot){
    module.hot.accept("./store.js",function(){
        new Vue({
            el:"#App",
            store,
            components:{ App },
            render (h) {
                return h('App')
            }
            // template:"<App/>"
        })
    })
}