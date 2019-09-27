<template lang="pug">
    div
        //- <div class="store_header">
        //-     <div class="store_avatar">
        //-         <img src="../../assets/images/bxclogo.png" width="55" height="55">
        //-     </div>
        //-     <div class="store_name">XXX</div>
        //- </div>        
        van-cell-group(style="border:1px solid #ebedf0;border-radius:5px;margin:15px;padding:5px;")
            van-field(label="手机号" type="number" maxlength="11" label-width="60" left-icon="phone" v-model="phone" placeholder="请输入手机号")
            van-field(label="密码"  label-width="60" left-icon="bag" placeholder="请输入密码" v-model="password" type="password")            
        div(style="margin:15px;padding:5px;")
            van-button(type="primary" style="border-radius:10px;" size="large" @click="login") 登录
        van-row
            van-col(offset="8" span="8")
                a(href="/#/reg" class="bxc-link") 去注册 
  
        //- <div class="text-desc text-center bottom_positon">技术支持: xxxxxx</div>
</template>
<script>
import api from "@/api/api";

export default {
  data:function(){
      return {
          phone:'',
          password:''
      }
  },
  created(){
    document.title = '登录'
    this.phone = this.$ls.get('phone')
  },
  methods:{
    async login() {
      if (this.phone.length != 11) {
        this.$notify('手机号不正确');        
        return;
      }
      if (this.$R.empty(this.password)) {
        this.$notify('密码不允许为空')
        return;
      }
      this.$toast({type:'loading',forbidClick:true,duration: 0,message: '登录中...'});      
      let res = await api.user.login(this.phone, this.password);
      this.$toast.clear();
      if (res.success) {        
        this.$ls.set("userid", res.data.id);
        this.$ls.set("id32", res.data.id32);
        this.$ls.set("phone", res.data.phone);
        this.$ls.set("nickname", res.data.nickname);

        this.$router.push({
          name: "userDetail",
          query: { id32: res.data.id32 }
        });
      } else {
        this.$notify('res.msg')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.store_header {
  text-align: center;
  
  padding: 30px 0;
  .store_avatar img {
    border-radius: 50%;
  }
  .store_name {
    padding-top: 5px;
    font-size: 16px;
  }
}
.bottom_positon {
  position: absolute;
  bottom: 30px;
  width: 100%;
}
</style>