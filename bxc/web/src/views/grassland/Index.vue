<template lang="pug">
    div
        div(v-html="html")
</template>
<script>
import {markdown} from 'markdown';
import api from "@/api/api";

export default {
    data:function(){
        return {
            html:''
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let valaue = await api.config.get("page_grassland")            
            this.html = markdown.toHTML( valaue )
        }
    }
}
</script>
