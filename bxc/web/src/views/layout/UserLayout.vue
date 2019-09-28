<template lang="pug">
    div
        router-view 
        van-tabbar(v-model="active" active-color="#07c160" inactive-color="#000" route)
            van-tabbar-item(icon="like-o" to="/grassland/index") 测试            
            //- van-tabbar-item(icon="plus") 发布
            van-tabbar-item(icon="manager-o" to="/usercenter/index") 个人中心
</template>

<script>

  export default {
    name: 'UserLayout',
    data(){
      return {
        active:1
      }
    }
  }
</script>
