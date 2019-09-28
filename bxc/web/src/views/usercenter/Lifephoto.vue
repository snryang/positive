<template lang="pug">
    div
        van-tabs(v-model="activeName")
            van-tab(title="基本信息" name="a")
            van-tab(title="择偶要求" name="b")            

</template>
<script>
export default {
    data:function(){
        return {
            activeName:'a'
        }
    }
}
</script>
