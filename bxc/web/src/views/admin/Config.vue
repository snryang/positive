<template lang="pug">
    div
        div(class="fx-row")
            div(span="fx-1"): select(v-model="key")
                option(value="page_grassland") page_grassland
                option(value="page_usercenter_detail") page_usercenter_detail
                option(value="InvitationCode") 注册邀请码
            div(span="fx-1"): van-button(type="primary" size="mini" @click="load") 读取
            div(span="fx-1"): van-button(type="primary" size="mini" @click="save") 保存
        div
            textarea(rows="50" style="width:100%;" v-model="value")
</template>
<script>
import api from "@/api/api";
export default {
    data:function(){
        return {
            key:'',
            value:''
        }
    },
    methods:{
        async load(){
            var res = await api.config.get(this.key)            
            this.value = res.data.data || ''
        },
        async save(){
            var res = await api.config.save(this.key,this.value)
            this.$toast.success('保存成功')
        }

    }
}
</script>
