<template lang="pug">
    div
        van-sticky
            van-nav-bar(left-arrow @click-left="onClickLeft" title="上传生活照片")
        div(style="margin:10px")
            p(style="font-size:0.5rem") 请大家认真选择本人照片，请勿上传过于祼露、人像过小、风景照片，照片大小于4M
            van-uploader(v-model="fileList" multiple :max-count="6" @click-preview="preview" :after-read="afterRead" @delete="del" :max-size="1024*1024*4" :before-read="beforeRead" )
        

</template>
<script>
import * as _ from "ramda";
import api from "@/api/api";
import { debuglog } from "util";

export default {
  data: function() {
    return {
      fileList: [
        "https://bxc-1300253269.cos.ap-chengdu.myqcloud.com/lifephoto/7ea914b9-8529-44c3-855e-802f3eb725eb"
      ],
      lifePhotos: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.$toast({
        type: "loading",
        forbidClick: true,
        duration: 0,
        message: "数据加载中..."
      });
      let list = await api.lifephoto.get();
      this.lifePhotos = _.pluck("url")(list.data || []);
      this.fileList = _.map(p => {
        return {
          url: "https://bxc-1300253269.cos.ap-chengdu.myqcloud.com/" + p,
          isImage: true
        };
      }, this.lifePhotos);

      this.$toast.clear();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    preview(a, b, c) {
      console.log(arguments);
      console.log(this.fileList);
    },
    del(file, item, c) {
      let filename = this.lifePhotos[item.index];
      this.$toast({
        type: "loading",
        forbidClick: true,
        duration: 0,
        message: "正在删除..."
      });
      api.lifephoto.del(filename).then(res => {
        if (res.success) {
           this.lifePhotos =  _.remove(item.index, 1, this.lifePhotos)
          this.$notify({ type: "success", message: "删除成功" });
        } else {
          this.$notify(res.msg);
        }
        this.$toast.clear();
      });
    },
    beforeRead(file) {
      if (file.size > 1024 * 1024 * 4) {
        this.$notify("图片太大，请上传4M以内的照片");
        return false;
      }
      return true;
    },
    afterRead(file, item) {
      this.$toast({
        type: "loading",
        forbidClick: true,
        duration: 0,
        message: "图片上传中..."
      });
      api.lifephoto
        .upload(file.file)
        .then(res => {
          if (res.success) {
            this.lifePhotos.push(res.msg);
          } else {
            this.$notify(res.msg);
          }
          this.$toast.clear();
        })
        .catch(err => {
          this.$notify(JSON.stringify(err));
          this.$toast.clear();
        });
    }
  }
};
</script>
