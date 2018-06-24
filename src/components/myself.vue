<template>
    <div class="myself">
        <div class="msg">
            <img :src="myself.img" :alt="myself.name" :title="myself.name">
            <p>{{ myself.name }}</p>
        </div>
        <div class="search">
            <input type="text" :placeholder="searchMsg.placeholde" v-model="message">
        </div>
    </div>
</template>

<script>
import  { mapState } from "vuex";
export default {
    // computed:{
    //     myself() {
    //         return this.$store.state.myself
    //     },
    //     searchMsg() {
    //         return this.$store.state.searchMsg
    //     }
    // }
    computed:{
        ...mapState(['myself','searchMsg']),
        message:{
            get(){
                return this.searchMsg.val
            },
            set(val){
                this.$store.commit('UPDATEDSAERCH',val);
            }
        }
    },
}
</script>

<style lang="less" scoped>
.myself{ 
    padding: 12px;
    .msg{
        img,p{
            display: inline-block;
            vertical-align: middle;
        }
        img{
            width: 40px;
        }
        p{
            color:#fff;
            margin-left: 15px;
        }
    }
    .search{
        input{
            background-color:#26292e;
            border: none;
            border:1px solid #3a3a3a;
            border-radius: 4px;
            box-sizing: border-box;
            width: 100%;
            height: 30px;
            padding:0 10px;
            margin-top: 10px;
            color:#fff;
            font-size: 12px;
            outline: none;
            transition: box-shadow .4s;
            &:focus{
                box-shadow:rgba(255, 255, 255, 0.6) 0 0 1px 0px;
            }
        }
    }
}
</style>
