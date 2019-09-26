<template lang="pug">
    div
        //- <div class="store_header">
        //-     <div class="store_avatar">
        //-         <img src="../../assets/images/bxclogo.png" width="55" height="55">
        //-     </div>
        //-     <div class="store_name">XXX</div>
        //- </div>
        <van-cell-group :border="true" title="分组1">
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" :border="false" label="描述信息" />
            <van-cell value="内容" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <span class="custom-title">单元格</span>
                    <van-tag type="danger">标签</van-tag>
                </template>
            </van-cell>
        </van-cell-group>
        <van-icon name="close" dot/>
        //- <div class="text-desc text-center bottom_positon">技术支持: xxxxxx</div>
</template>
<script>
export default {
  data:function(){
      return {
          username:'',
          password:''
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