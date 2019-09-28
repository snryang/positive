<template lang="pug">
    div
        van-row(style="margin:15px;" type="flex" justify="center" align="align")
            van-col(span="6")
                van-image(round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg")
            van-col(span="12" style="font-size:0.8rem")
                p 会员ID:10000
                p 这里是昵称
            van-col(span="6")
                div(class="vm" style="width:100%;height:100%;text-align:center;margin-top:15px;"): van-button(type="primary" size="mini") 退出
        van-cell-group()
            van-cell(title="上传头像" is-link)
            van-cell(title="修改昵称" is-link)
            van-cell(title="修改密码" is-link)
        van-cell-group(title="红娘服务")
            van-cell(title="填写个人资料" to="/usercenter/detail" is-link)
            van-cell(title="上传生活照片" to="/usercenter/lifephoto" is-link)
        //- van-cell-group(title="管理")
        //-     van-cell(title="填写个人资料" is-link)
        //-     van-cell(title="上传生活照片" is-link)
</template>
<script>
export default {
    
}
</script>
