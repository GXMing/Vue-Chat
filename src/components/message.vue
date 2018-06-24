<template>
    <div class="message" v-scrollBottom>
        <ul class="message-box">
            <!-- <li>
                <p class="time"><span>19:27</span></p>
                <div class="t-box">                    
                    <img src="../image/1.jpg">
                    <p>{{ actList.message }}</p>
                </div>
            </li> -->
            <li v-for="item in actList.message" :class="{ self : item.self }">
                <p class="time"><span>{{ item.time }}</span></p>
                <div class="t-box">                    
                    <img :src="item.self?myself.img:actList.use.img">
                    <p>{{ item.text }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
    let toScoll = (el) =>{
        el.scrollTop = el.scrollHeight - el.clientHeight;
    }
    export default {
        computed:{
            ...mapGetters(['actList']),
            ...mapState(['myself'])
        },
        mounted(){
            //mounted el被新建vm.$el替换  并且所用子组件完成更新$nextTick
            this.$nextTick(()=>{
                toScoll(this.$el);
            })
        },
        directives:{
            scrollBottom:{
                componentUpdated(el){
                    toScoll(el);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
@cl:#b2e380;
.message{
    padding: 20px;
    height: ~'calc(100% - 160px)';
    box-sizing: border-box;
    overflow-y: auto;
    .message-box{
        li{
            margin-bottom: 14px;
            &.self{
                text-align: right;
                .t-box{
                    img{
                        float: right;
                    }
                    p{
                        margin-left: 0;
                        margin-right: 10px;
                        background-color:@cl;
                        &:after{
                            right: 0;
                            left: 100%;
                            border-right-color:transparent;
                            border-left-color:@cl;
                        }
                    }
                }
            }
            .time{
                text-align:center;
                margin:8px 0;
                span{
                    background-color: #dcdcdc;
                    color:#fff;
                    padding:2px 18px;
                    font-size: 12px;
                }
            }
            .t-box{
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 3px;
                    float: left;
                }
                p{
                    display: inline-block;
                    max-width: ~'calc(100% - 40px)';
                    background-color:#fafafa;
                    padding:0 10px;
                    line-height: 30px;
                    margin-left: 10px;
                    word-break:break-all;
                    position: relative;
                    border-radius: 3px;
                    text-align: left;
                    font-size: 12px;
                    box-sizing: border-box;
                    &:after{
                        content: "";
                        position: absolute;
                        right:100%;
                        top:9px;
                        width: 0;
                        height: 0;
                        border:6px solid transparent;
                        border-right-color:#fff;
                    }
                }
            }
        }
    }
}
</style>
