<template lang="pug">
    div
        van-row(style="margin:15px;" type="flex" justify="center" align="align")
            van-col(span="6")
                van-image(round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg")
            van-col(span="12" style="font-size:0.8rem")
                p(style="font-size:1.2rem;font-weight: bold;margin:10px;") {{nickname}}
                p(style="margin:10px;") 会员ID:{{userid}}
                
            van-col(span="6")
                div(class="vm" style="width:100%;height:100%;text-align:center;margin-top:15px;"): van-button(type="primary" @click="logout" size="mini") 退出
        van-cell-group()
            van-cell(title="上传头像" value="未实现" is-link)
            van-cell(title="修改昵称" value="未实现" is-link)
            van-cell(title="修改密码" value="未实现" is-link)
        van-cell-group(title="红娘服务")
            van-cell(title="填写个人资料" to="/usercenter/detail" is-link)
            van-cell(title="上传生活照片" to="/usercenter/lifephoto" is-link)
        van-cell-group(title="管理" v-if="role>=2")
            van-cell(title="查看用户资料" to="/admin/userdetail" is-link)
        van-cell-group(title="超级管理" v-if="role>=3")
            van-cell(title="字典管理" to="/admin/config" is-link)
</template>
<script>
export default {
    data:function(){
        return {
            role:1,
            userid:'',
            nickname:''
        }
    },
    created(){
        this.role = Number(this.$ls.get('role')) || 1        
        this.userid = this.$ls.get('userid')
        this.nickname = this.$ls.get('nickname')
    },
    methods:{
        logout(){
            this.$router.push({ name: "login" });
        }
    }
}
</script>
