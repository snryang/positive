<template lang="pug">
    div
        div(style="padding:5px 15px;color:red") 会员ID:{{entity.userid}} 您的个人信息不会对外公开
        cell
            <input id="lifephotoFile" class="file" name="file" type="file" accept="image/png,image/jpeg" @change="fileUpload"/>
        img(:src="livePhoto" width="100" height="100")
        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            group-title(slot="title") 基本信息 
            x-input(title="手机号:" type="number" v-model="entity.phone" required )
            x-input(title="微信号:" v-model="entity.wx" required )
            x-input(title="姓名:" v-model="entity.name" required )
            selector(title="性别:" :options="['男', '女','保密']" v-model="entity.gender")
            selector(title="民族:" :options="pagePrivate.nationality" v-model="entity.nationality")
            datetime(title="出生日期:" v-model="entity.birth" :min-year="1960" :max-year="2010" value-text-align="left")



            selector(title="身高:" :options="pagePrivate.height" v-model="entity.height")
            selector(title="体重:" :options="pagePrivate.weight" v-model="entity.weight")
            selector(title="学历:" :options="pagePrivate.education" v-model="entity.education")
            selector(title="星座:" :options="pagePrivate.constellation" v-model="entity.constellation")
            

            x-input(title="职业:" v-model="entity.profession")
            selector(title="年薪:" :options="pagePrivate.salary" v-model="entity.salary")
            selector(title="住房:" :options="['已购无贷款','已购有贷款','无','保密']" v-model="entity.house")
            selector(title="汽车:" :options="['豪华型','经济型', '无','保密']" v-model="entity.car")
            selector(title="婚烟状态:" :options="['单身','离异', '丧偶']" v-model="entity.marriage")
            x-address(title="居住地:" v-model="entity.address" raw-value :list="pagePrivate.addressData" value-text-align="left")
            x-address(title="家乡:" v-model="entity.hometown" raw-value :list="pagePrivate.addressData" value-text-align="left")
            
        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            group-title(slot="title") 生活状态
            selector(title="感情经历:" :options="['无','1次','2次','3次','4次','5次','5-10次','10次以上']" v-model="entity.sex")
            selector(title="吸烟:" :options="['不吸烟并反感','不吸烟','偶尔','经常']" v-model="entity.smoke")
            selector(title="饮酒:" :options="['不饮酒','偶尔','经常','无酒不欢']" v-model="entity.drink")
            selector(title="宠物:" :options="['养猫','养狗','想养宠物','不喜欢宠物','无']" v-model="entity.pet")
            x-input(title="饮食习惯:" v-model="entity.diet")
            x-input(title="兴趣爱好:" v-model="entity.attachHobbies" placeholder="请选择，可自由输入")
        scroller(lock-x height="200px")
            checker(v-model="entity.hobbies" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected")
                checker-item(:value="item" v-for="item in pagePrivate.hobbies" :key="item") {{item}}

        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            x-input(title="个人标签:" v-model="entity.attachLabel" placeholder="请选择，可自由输入")
        scroller(lock-x height="200px")
            checker(v-model="entity.label" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected")
                checker-item(:value="item" v-for="item in pagePrivate.label" :key="item") {{item}}
        group(title="自我介绍")
            x-textarea(v-model="entity.selfIntroduction" :max="1024" :rows="8" placeholder="自我介绍")

        group(title="心中的另一半")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 年龄:
                flexbox-item 
                    selector(:options="pagePrivate.forAge" v-model="entity.forAge1")
                flexbox-item(:span="1") 到
                flexbox-item 
                    selector(:options="pagePrivate.forAge" v-model="entity.forAge2")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 身高:
                flexbox-item 
                    selector(:options="pagePrivate.height" v-model="entity.forHeight1")
                flexbox-item(:span="1") 到
                flexbox-item 
                    selector(:options="pagePrivate.height" v-model="entity.forHeight2")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 体重:
                flexbox-item 
                    selector(:options="pagePrivate.weight" v-model="entity.forWeight1")
                flexbox-item(:span="1") 到
                flexbox-item 
                    selector(:options="pagePrivate.weight" v-model="entity.forWeight2")    
            flexbox
                flexbox-item(:span="3" style="text-align:right") 学历:
                flexbox-item
                    selector(:options="pagePrivate.education1" v-model="entity.forEducation")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 年薪:
                flexbox-item
                    selector(:options="pagePrivate.salary1" v-model="entity.forSalary")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 汽车:
                flexbox-item
                    selector(:options="['不限','有车']" v-model="entity.forCar")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 住房:
                flexbox-item
                    selector(:options="['不限','有房','有房无贷款']" v-model="entity.forHouse")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 感情经历:
                flexbox-item
                    selector(:options="['不限','1次','2次','3-5次']" v-model="entity.forSex")        
            flexbox
                flexbox-item(:span="3" style="text-align:right") 吸烟:
                flexbox-item
                    selector( :options="['不限','不吸烟','接受偶尔吸烟']" v-model="entity.forSmoke")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 饮酒:
                flexbox-item
                    selector(:options="['不限','不喝酒','接受偶尔喝酒','千杯不醉']" v-model="entity.forDrink")
            flexbox
                flexbox-item(:span="3" style="text-align:right") 宠物:
                flexbox-item
                    selector(:options="['不限','不接受宠物','喜欢养宠物']" v-model="entity.forPet")
            group(title="其它要求")
                x-textarea(v-model="entity.forOther" :max="512" :rows="4" placeholder="其它要求")
            br            
            br
            x-button(type="primary" @click.native="save") 保存
            
</template>
<script>
import * as _ from "ramda";
import axios from "axios";
import {
  Group,
  GroupTitle,
  XInput,
  Selector,
  XButton,
  Datetime,
  ChinaAddressData,
  XAddress,
  XTextarea,
  Scroller,
  Checker,
  CheckerItem,
  Flexbox,
  FlexboxItem,
  Cell
} from "vux";
import api from "@/api/api";

let _nationality = `汉族、满族、蒙古族、回族、藏族、维吾尔族、苗族、彝族、壮族、布依族、侗族、瑶族、白族、土家族、哈尼族、哈萨克族、傣族、黎族、傈僳族、佤族、畲族、高山族、拉祜族、水族、东乡族、纳西族、景颇族、柯尔克孜族、土族、达斡尔族、仫佬族、羌族、布朗族、撒拉族、毛南族、仡佬族、锡伯族、阿昌族、普米族、朝鲜族、塔吉克族、怒族、乌孜别克族、俄罗斯族、鄂温克族、德昂族、保安族、裕固族、京族、塔塔尔族、独龙族、鄂伦春族、赫哲族、门巴族、珞巴族、基诺族`.split(
  "、"
);

function _loop(list, min, max, p) {
  while (min < max) {
    list.push(p(min));
    min++;
  }
  return list;
}

let _height = _loop(["150以下"], 151, 200, p => `${p}cm`);
_height.push("200以上");

let _weight = _loop(["40kg以下"], 41, 99, p => `${p}kg`);
_weight.push("100以上");

let _hobbies = `唱歌、听音乐、看电影、看韩剧、看综艺娱乐节目、看书、看小说、看杂志、逛街、跳舞、吉他、健身、瑜伽、足球、篮球、排球、跑步、羽毛球、乒乓球、保龄球、游泳、划船、水上娱乐、登山、郊游、钓鱼、养鱼、饲养宠物、玩游戏、摄影、摄像、旅游、吃美食、做饭、做糕点、十字绣、织毛衣、做服装服饰、打扑克、麻将、睡觉、读书、练字、书法、下棋、美容`.split(
  "、"
);
let _label = `三毛、黑长直、一血小王子、泡吧、非洲酋长、口琴、吃饱才有力气、麻将、流行、不吃肉不能活、翻山越岭只为吃中二病晚期、直男癌晚期、高富帅、琼瑶、铲屎官、仙气十足、摇滚、王小波、我这么美我不能死、大叔、IT民工、飞友、萌萌哒、穷游党、正太、锤粉、男神、腹黑、TVB影迷、小清新、为了联盟、烹饪、烘焙、美妆达人、眼镜男、钢琴、逛街、玄不救非，氪不改命、吉他、追剧是坚持、宫崎骏、喵星人、懒癌患者、衬衫控、做一个开心的吃货、聚会、果粉、K歌之王、软妹子、轻音乐、逗比、夜猫子、宅男拯救世界、选择恐惧症、绘画、欧皇、民谣、为了部落、花草、米粉、宇宙第一帅、长腿欧巴、篮球、女神、汪星人、话唠、索尼大法好、背包客、天然呆、萌新求带、愤青、萝莉`.split(
  "、"
);

let _forAge = _loop([], 18, 50, p => `${p}岁`);

export default {
  components: {
    Group,
    GroupTitle,
    XInput,
    Selector,
    Flexbox,
    FlexboxItem,
    XButton,
    Datetime,
    ChinaAddressData,
    XAddress,
    XTextarea,
    Scroller,
    Checker,
    CheckerItem,
    Cell
  },
  watch: {
    $route(to, from) {
      this.id32 = to.query.id32;
      this.loadUserDetail();
    }
  },
  data() {
    return {
      livePhoto: "",
      pagePrivate: {
        nationality: _nationality,
        height: _height,
        weight: _weight,
        education: ["高中及以下", "大专", "本科", "双学士", "硕士", "博士"],
        education1: ["不限", "大专以上", "本科以上", "双学士", "硕士", "博士"],
        constellation: `白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座、双鱼座`.split(
          "、"
        ),
        salary: [
          "5万以下",
          "5-10万",
          "10-15万",
          "15-20万",
          "20-30万",
          "30-50万",
          "50-100万",
          "100万以上"
        ],
        salary1: [
          "不限",
          "10万以上",
          "15万以上",
          "20万以上",
          "30万以上",
          "50万以上"
        ],
        // addressData: ChinaAddressData,
        hobbies: _hobbies,
        label: _label,
        forAge: _forAge
      },

      id32: "",
      entity: {
        attachHobbies: "",
        attachLabel: "",
        id: 1,
        userid: 0,
        wx: "",
        phone: "",
        name: "",
        gender: "男",
        nationality: "",
        birth: "0001-01-01",
        height: "",
        weight: "0",
        education: "",
        constellation: "",
        profession: "",
        salary: "",
        car: "",
        marriage: "",
        house: "",
        address: ["", "", ""],
        hometown: ["", "", ""],
        sex: "",
        smoke: "",
        drink: "",
        pet: "",
        diet: "",
        hobbies: "",
        label: "",
        selfIntroduction: "",
        forAge1: "",
        forAge2: "",
        forHeight1: "",
        forHeight2: "",
        forWeight1: "",
        forWeight2: "",
        forEducation: "",
        forSalary: "",
        forCar: "",
        forHouse: "",
        forAddress: "",
        forHometown: "",
        forSex: "",
        forSmoke: "",
        forDrink: "",
        forPet: "",
        forOther: ""
      }
    };
  },
  created() {
    document.title = "填写个人资料";
    this.id32 = this.$route.query.id32;
    this.loadUserDetail();
  },
  methods: {
    fileUpload(event) {
      debugger;
      let formData = new FormData();
      formData.append(
        "type",
        document.getElementById("lifephotoFile").files[0].type
      );
      formData.append(
        "uploadfile",
        document.getElementById("lifephotoFile").files[0]
      );
      axios
        .post("/api/uploadlifephoto", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(res => {
          if (res.data.success) {
            this.livePhoto = res.data.data
          } else {
            this.$vux.alert.show({
              title: "操作提示",
              content: res.data.msg
            });
          }
        });
      // 获取input里的文件
      // this.file.push(event.target.files[0]);
      // console.log(this.file);
    },
    async loadUserDetail() {
      this.$vux.loading.show({ text: "数据加载..." });
      console.log("id32:" + this.id32);
      let res = await api.user.getDetail(this.id32);
      if (res.success) {
        var entity = res.data;
        entity.userid = this.$ls.get("userid");
        if (_.isEmpty(entity.phone)) {
          entity.phone = this.$ls.get("phone");
        }
        if (_.isEmpty(entity.gender)) entity.gender = "保密";
        if (_.isEmpty(entity.nationality)) entity.nationality = "汉族";
        if (_.isEmpty(entity.birth)) entity.birth = "1990-01-01";
        if (_.isEmpty(entity.height)) entity.height = "170cm";
        if (_.isEmpty(entity.weight)) entity.weight = "50kg";
        if (_.isEmpty(entity.education)) entity.education = "大专";
        if (_.isEmpty(entity.marriage)) entity.marriage = "单身";

        if (_.isEmpty(entity.address)) {
          console.log(11);
          entity.address = ["四川省", "成都市", "金牛区"];
        } else {
          console.log(22);
          entity.address = entity.address.split(",");
        }
        if (_.isEmpty(entity.hometown)) {
          console.log(11);
          entity.hometown = ["四川省", "成都市", "金牛区"];
        } else {
          console.log(22);
          entity.hometown = entity.hometown.split(",");
        }
        entity.attachHobbies = "";
        entity.attachLabel = "";
        entity.hobbies = entity.hobbies.split(" ") || [];
        entity.label = entity.label.split(" ") || [];

        this.pagePrivate.hobbies = _.filter(
          p => p != "",
          _.uniq(this.pagePrivate.hobbies.concat(entity.hobbies))
        );
        this.pagePrivate.label = _.filter(
          p => p != "",
          _.uniq(this.pagePrivate.label.concat(entity.label))
        );
        if (_.isEmpty(entity.forAge)) {
          entity.forAge1 = "";
          entity.forAge2 = "";
        } else {
          entity.forAge1 = entity.forAge.split("-")[0];
          entity.forAge2 = entity.forAge.split("-")[1];
        }
        delete entity.forAge;

        if (_.isEmpty(entity.forHeight)) {
          entity.forHeight1 = "";
          entity.forHeight2 = "";
        } else {
          entity.forHeight1 = entity.forHeight.split("-")[0];
          entity.forHeight2 = entity.forHeight.split("-")[1];
        }
        delete entity.forHeight;

        if (_.isEmpty(entity.forWeight)) {
          entity.forWeight1 = "";
          entity.forWeight2 = "";
        } else {
          entity.forWeight1 = entity.forWeight.split("-")[0];
          entity.forWeight2 = entity.forWeight.split("-")[1];
        }
        delete entity.forWeight;

        this.entity = entity;
      } else {
        alert(res.msg);
      }
      this.$vux.loading.hide();
    },
    getAddressName(value) {
      if (value == "") return "";
      let item = _.find(_.propEq("value", value))(this.pagePrivate.addressData);
      return item.name || "";
    },
    async save() {
      let entity = _.clone(this.entity);

      entity.userid = this.$ls.get("userid");

      entity.address = [
        this.getAddressName(entity.address[0]),
        this.getAddressName(entity.address[1]),
        this.getAddressName(entity.address[2])
      ].join(",");
      entity.hometown = [
        this.getAddressName(entity.hometown[0]),
        this.getAddressName(entity.hometown[1]),
        this.getAddressName(entity.hometown[2])
      ].join(",");

      entity.forAge = `${entity.forAge1}-${entity.forAge2}`;
      entity.forHeight = `${entity.forHeight1}-${entity.forHeight2}`;
      entity.forWeight = `${entity.forWeight1}-${entity.forWeight2}`;
      entity.hobbies = entity.hobbies
        .concat(entity.attachHobbies.split(" "))
        .join(" ");
      entity.label = entity.label
        .concat(entity.attachLabel.split(" "))
        .join(" ");
      delete entity.attachHobbies;
      delete entity.attachLabel;
      delete entity.forAge1;
      delete entity.forAge2;
      delete entity.forWeight1;
      delete entity.attachLabel;
      delete entity.forWeight2;
      delete entity.forWeight2;

      this.$vux.loading.show({ text: "数据保存中..." });
      debugger;
      let res = await api.user.saveDetail(entity, this.id32);
      this.$vux.loading.hide();
      if (res.success) {
        this.$vux.alert.show({
          title: "操作提示",
          content: "保存成功"
        });
      } else {
        this.$vux.alert.show({
          title: "操作提示",
          content: res.msg
        });
      }
    }
  }
};
</script>
<style>
.demo1-item {
  border: 1px solid #ececec;
  border-radius: 5px;
  padding: 3px 8px;
  margin: 3px;
  font-size: 12px;
}
.demo1-item-selected {
  border: 1px solid green;
  background-color: green;
  color: #ffffff;
}
</style>
