<template>
    <div id="App">
        <div class="sidebar">
            <myself></myself>
            <list></list>
            <div class="setbtn">
                <ul class="btn-menu">
                    <li v-for="item in btnMenu">
                        <a href="javascript:;"
                            :class = "{active: item.boolean == openStrageData}"
                            @click = "saveStorageData(item.boolean)"
                        >{{ item.text }}</a>
                    </li>
                    <!-- <li><a href="javascript:;" :class="{active:openStrageData}">开启LocalStorge</a></li>
                    <li><a href="javascript:;" :class="{active:!openStrageData}">关闭LocalStorge</a></li> -->
                </ul>
            </div>
        </div>
        <div class="main">
            <message></message>
            <Vtext></Vtext>
        </div>
    </div>
</template>

<script>
import myself from "./components/myself.vue";
import list from "./components/list.vue";
import message from "./components/message.vue";
import Vtext from "./components/text.vue";
import { mapState,mapActions } from "vuex";

export default {
    components : { myself,list,message,Vtext},
    beforeCreate(){
        this.$store.dispatch('InitStorageData');
    },
    computed:mapState(['openStrageData']),
    methods:mapActions(['saveStorageData']),
    data(){
        return {
            btnMenu:[
                {
                    text:"开启LocalStorge",
                    boolean:true
                },
                {
                    text:"关闭LocalStorge",
                    boolean:false
                }
            ]
        }
    }
};
</script>

<style lang="less">
*{
    padding: 0;
    margin: 0;
}
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    overflow: auto;
}
::-webkit-scrollbar-track {
    background-color: rgba(189, 189, 189, 0.62);
    border: 1px solid #efefef;
    border-radius: 999px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(172, 172, 172, 0.44);
    border-radius: 999px;
}
ul,li{
    list-style: none;
}
body,html{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
body{
    background-image:url("./image/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-color:#dcdcdc;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color:#222;
    font: 14px/1.4em 'Helvetica Neue', Helvetica, 'Microsoft Yahei', Arial, sans-serif;
}
#App{
    width: 800px;
    height: 600px;
    margin:40px auto;
    overflow: hidden;
    .sidebar{
        float: left;
        width: 200px;
        height: 100%;
        background-color:#2e3238;
        position: relative;
        .setbtn{
            background:url("./image/btn.svg") center no-repeat;
            background-size: 28px 28px;
            cursor: pointer;
            width: 28px;
            height: 28px;
            padding: 6px;
            position: absolute;
            bottom: 0;
            left: 0;
            &:hover{
                background-color:#26292e;
                .btn-menu{
                    display: block;
                }
            }
            .btn-menu{
                background-color:#26292e;
                width: 200px;
                position: absolute;
                left: 0;
                bottom: 100%;
                display: none;
                a{
                    display: block;
                    color:#fff;
                    text-decoration: none;
                    box-sizing:border-box;
                    padding:15px;
                    &.active{
                        background-color:#43474c;
                    }
                }
            }
        }
    }
    .main{
        height: 100%;
        background-color: #eee;
    }
}
</style>

