<template lang="pug">
    div
        //- <div class="store_header">
        //-     <div class="store_avatar">
        //-         <img src="../../assets/images/bxclogo.png" width="55" height="55">
        //-     </div>
        //-     <div class="store_name">XXX</div>
        //- </div>        
        van-cell-group(style="border:1px solid #ebedf0;border-radius:5px;margin:15px;padding:5px;" title="注册帐号")
            van-field(label="手机号" type="number" maxlength="11" required label-width="60" left-icon="phone" placeholder="请输入手机号" v-model="phone")
            van-field(label="密码" required label-width="60" left-icon="browsing-history" placeholder="请输入密码" type="password" v-model="password")            
            van-field(label="确认密码" required label-width="60" left-icon="browsing-history" placeholder="请确认密码" type="password" v-model="password2") 
            van-field(label="昵称" maxlength="16" label-width="60" left-icon="smile" placeholder="昵称" v-model="nickname")           
            van-select(label="性别"  :labelWidth="60"  left-icon="manager"  :options="['男', '女','保密']" v-model="gender")          
            van-field(label="邀请码" maxlength="16" label-width="60" left-icon="gift" placeholder="邀请码，可不填" v-model="invitationCode")              
        div(style="margin:15px;padding:5px;"): van-button(type="primary" style="border-radius:10px;" size="large" @click="userRegister") 注册
        van-row
            van-col(offset="8" span="8")
                a(href="/#/login" class="bxc-link") 登录 

        //- <div class="text-desc text-center bottom_positon">技术支持: xxxxxx</div>
</template>
<script>
import api from "@/api/api";
import VanSelect from "@/views/VanSelect";

export default {
  components: {
    VanSelect
  },
  data: function() {
    return {
      phone: "",
      password: "",
      password2: "",
      gender: "女",
      nickname: "",
      invitationCode: ""
    };
  },
  created() {
    // document.title = "注册"
  },
  methods: {
    async userRegister() {
      if (this.phone.length != 11) {
        this.$notify('手机号不正确');        
        return;
      }
      if (this.password != this.password2) {
        this.$notify('密码输入不一致');        
        return;
      }
      if (this.$R.empty(this.password)) {
        this.$notify('密码不允许为空');        
        return;
      }

      let user = this.$R.clone(this.$data);
      delete user.password2;

      let res = await api.user.reg(user);

      if (res.success) {
        this.$dialog.alert({
          title: "操作提示",
          message: "注册成功，去登录吧",
          confirm:()=> {
            console.log('confirm login')
            this.$router.push({ name: "login" });
          }
        }).then(()=>{
          console.log('then login')
            this.$router.push({ name: "login" });
        });
        
      } else {
        this.$notify(res.msg)
        
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