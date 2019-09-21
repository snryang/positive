<template lang="pug">
    div        
        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            x-input(title="手机号" v-model="phone" required )
            x-input(title="密码" type="password" required v-model="password")
            x-input(title="确认密码" type="password" required v-model="password2")
            x-input(title="昵称" v-model="nickname")
            selector(title="性别" :options="['男', '女','保密']" v-model="gender")
            br
            br
            x-button(type="primary" @click.native="userRegister") 注册
            
</template>
<script>
import { Group, XInput, Selector, XButton } from "vux";
import api from "@/api/api";

export default {
  components: {
    Group,
    XInput,
    Selector,
    XButton
  },
  data() {
    return {
      phone: "",
      password: "",
      password2: "",
      gender: "女",
      nickname: ""
    };
  },
  methods: {
    async userRegister(position) {        
      if (this.phone.length != 11) {
        this.$vux.toast.text("手机号不正确", "top");
        return;
      }
      if (this.password != this.password2) {
        this.$vux.toast.text("密码输入不一致", "top");
        return;
      }
      if (this.$R.empty(this.password)) {
        this.$vux.toast.text("密码不允许为空", "top");
        return;
      }

      let user = this.$R.clone(this.$data);
      delete user.password2;

      let res = await api.user.reg(user);

      if (res.success) {
        this.$vux.alert.show({
          title: "操作提示",
          content: "注册成功，去登录吧",
          buttonText: "去登录",
          onHide() {
            this.$router.push({ name: "userLogin" }); 
          }
        });
      } else {
        this.$vux.alert.show({
          title: "操作提示",
          content: res.msg,
          onShow() {
            console.log("Plugin: I'm showing");
          },
          onHide() {
            console.log("Plugin: I'm hiding");
          }
        });
      }
    }
  },
  created() {
    console.log(111);
  }
};
</script>
