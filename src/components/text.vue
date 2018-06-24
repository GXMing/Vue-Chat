<template>
    <div class="text">
        <textarea 
        type="text" 
        placeholder="按 Enter 发送"
        v-model="messageText"
        @keydown.enter.prevent.exact="submitMsg"
        @keydown.ctrl.enter="changeLine"
        ></textarea>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data (){
        return {
            messageText:""
        }
    },
    methods:{
        ...mapActions(['addSession']),
        submitMsg(e){
            if(this.messageText.length > 0){
                this.addSession(this.messageText).then(()=>{
                    this.messageText = "";
                })
            }
            //    e.preventDefault();  //阻止默认事件包括 换行和防止text重写入
        },
        changeLine(){
            // \r 到文本最右边 \n换行
            this.messageText += "\r\n"
        }
    }
}

</script>


<style lang="less" scoped>
    .text{
        height: 160px;
        background-color: #fff;
        border-top: 1px solid #ddd;
        overflow: hidden;
        box-sizing: border-box;
        textarea{
            width: 100%;
            height: 100%;
            resize: none;
            outline: none;
            border:none;
            padding: 10px;
            font-family: inherit;
            box-sizing: border-box;
        }
    }
</style>
