import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const getNowDate = () => {
    let time = new Date();
    return `${time.getHours()}:${time.getMinutes()}`;
}
const initTime = getNowDate();

const DataName = "VueChatStorage";
const saveData = (state) =>{
    let {list,openStrageData} = state;
    let data = {list,openStrageData};
    if(state.openStrageData){
        localStorage.setItem(DataName,encodeURIComponent(JSON.stringify(data)));
    }
}

const store = new Vuex.Store({
    state:{
        //当前用户
        myself:{
            name:"GXMing",
            img:require("./image/1.jpg"),
        },
        searchMsg:{
            val:"",
            placeholde:"search user..."
        },
        //对话列表
        list:[
            {
                id:1,
                use:{
                    name:"Vue",
                    img:require("./image/vue.png")
                },
                message:[
                    {
                        time:initTime,
                        text:"Hello，这是一个基于Vue2.0 + Vuex + Webpack4构建的简单chat示例，聊天记录可以保存在localStorge。主要学习下新的webpack4配置和Vue，ES6运用。"
                    },
                    {
                        time:initTime,
                        text:"项目地址: "
                    },
                    {
                        time:initTime,
                        text:"有问题可以问我，大家一起学习。",
                        self:true
                    }
                ]
            },
            {
                id:2,
                use:{
                    name:"webpack4",
                    img:require("./image/webpack.jpg")
                },
                message:[
                    {
                        time:initTime,
                        text:"webpack4"
                    },
                    {
                        time:initTime,
                        text:"webpack4"
                    }
                ]
            }
        ],
        actListId:1,
        openStrageData:false,
    },
    getters:{
        //获取当前会话
        actList:(state) => state.list[state.actListId - 1],
        //查找
        searchList:(state) => {
            let reg = new RegExp(`^${state.searchMsg.val}`,"i");
            return state.list.filter((item) =>{
                // return item.use.name.indexOf(state.searchMsg.val) >= 0
                return reg.test(item.use.name);
            })
        }
    },
    mutations:{
        OPENDATA(state,boolean) { state.openStrageData = boolean },
        GET_LISTSECCION(state,Data) { state = Object.assign(state,Data) },
        UPDATEDSAERCH(state,val) { state.searchMsg.val = val },
        CHANGE_ACTLISTID(state,id) {state.actListId = id} ,
        CHANGE_SESSION(state,addSessionObj) {
            state.list[state.actListId - 1].message.push(addSessionObj);
        },
    },
    actions:{
        addSession({ state,commit },addText){
            return new Promise((resolve,reject)=>{
                let addSession = {
                    time:getNowDate(),
                    text:addText,
                    self:true
                }
                commit('CHANGE_SESSION',addSession);
                saveData(state);
                resolve()
            })
        },
        InitStorageData({ commit }){
            let Data = localStorage.getItem(DataName);
            if(Data){
                Data = decodeURIComponent(localStorage.getItem(DataName))
                commit('GET_LISTSECCION',JSON.parse(Data))
            }
        },
        saveStorageData({ commit,state },boolean){
            commit('OPENDATA',boolean);
            boolean?saveData(state):localStorage.removeItem(DataName);
        }
    }
})




export default store