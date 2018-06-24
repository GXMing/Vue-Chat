<template>
    <ul class="list">
        <li v-for = "item in searchList" 
            :key = "item.id"
            :title = "item.use.name"
            :class = "{active : item.id == actListId}"
            @click = "changeActList(item.id)">
            <img :src="item.use.img" :alt="item.use.name">
            <p>{{ item.use.name }}</p>
        </li>
    </ul>
</template>

<script>
import { mapState,mapMutations,mapGetters } from "vuex";
export default {
    // computed:{
    //     list(){
    //         return this.$store.state.list;
    //     },
    //     actListId(){
    //         return this.$store.state.actListId;
    //     }
    // },
    computed:{
        ...mapState(['list','actListId']),
        ...mapGetters(['searchList'])
    },
    methods:{
        // ...mapMutations(['changeActList'])
        changeActList(id){
         this.$store.commit("CHANGE_ACTLISTID",id)
        }
    }
}
</script>

<style lang="less" scoped>
.list{
    li{
        padding: 12px 15px;
        border-bottom: 1px solid #292c33;
        cursor: pointer;
        &:hover{
            background-color:rgba(255, 255, 255, 0.03);
        }
        &.active{
            background-color: rgba(255, 255, 255, 0.1);
        }
        img,p{
            display: inline-block;
            vertical-align: middle;
        }
        img{
            width: 30px;
            height: 30px;
        }
        P{
            margin-left: 14px;
            color:#fff;
        }
    }
}
</style>
