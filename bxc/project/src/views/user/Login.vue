<template lang="pug">
    div    
        H2(style="text-align:center;margin:20px") 拨小草
        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            x-input(title="手机号" v-model="phone" required )
            x-input(title="密码" type="password" required v-model="password")
            br
            br
            x-button(type="primary" @click.native="userLogin") 登录
        p(style="text-align:right")
            a(style="padding:10px 15px" class="weui-cell_link" @click="toReg") 注册账号
</template>
<script>
import {
  Group,
  XInput,
  Selector,
  XButton,
  Flexbox,
  FlexboxItem,
  Divider
} from "vux";
import api from "@/api/api";

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Group,
    XInput,
    Selector,
    XButton
  },
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    toReg() {        
      this.$router.push({ name: "userReg" });
    },
    async userLogin() {
      if (this.phone.length != 11) {
        this.$vux.toast.text("手机号不正确", "top");
        return;
      }
      if (this.$R.empty(this.password)) {
        this.$vux.toast.text("密码不允许为空", "top");
        return;
      }
      this.$vux.loading.show({text: "登录中..."});
      let res = await api.user.login(this.phone, this.password);
      this.$vux.loading.hide();
      if (res.success) {
        //TODO 登录成功进入资料填写页面
        this.$ls.set('userid', res.data.ID)
        this.$ls.set('id32', res.data.id32)
        this.$ls.set('phone', res.data.phone)

        this.$router.push({ name: "userDetail" });
      } else {
        this.$vux.alert.show({
          title: "操作提示",
          content: res.msg
        });
      }
    }
  },
  created() {
    console.log(111);
  }
};
</script>
