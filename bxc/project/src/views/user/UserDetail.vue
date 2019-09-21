<template lang="pug">
    div
        div(style="padding:5px 15px;color:red") 您的个人信息不会对外公开
        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            group-title(slot="title") 基本信息
            x-input(title="手机号" v-model="phone" required )
            x-input(title="微信号" v-model="wx" required )
            x-input(title="姓名" v-model="name" required )
            selector(title="性别" :options="['男', '女','保密']" v-model="gender")
            selector(title="民族" :options="pagePrivate.nationality" v-model="nationality")
            datetime(title="出生日期" v-model="birth" value-text-align="left")
            selector(title="身高" :options="pagePrivate.height" v-model="height")
            selector(title="体重" :options="pagePrivate.weight" v-model="weight")
            selector(title="学历" :options="pagePrivate.education" v-model="education")
            selector(title="星座" :options="pagePrivate.constellation" v-model="constellation")
            x-input(title="职业" v-model="profession")
            selector(title="年薪" :options="pagePrivate.salary" v-model="salary")
            selector(title="住房" :options="['已购无贷款','已购有贷款','无','保密']" v-model="house")
            selector(title="汽车" :options="['豪华型','经济型', '无','保密']" v-model="car")
            x-address(title="居住地" v-model="address" raw-value :list="pagePrivate.addressData" value-text-align="left")
            x-address(title="家乡" v-model="hometown" raw-value :list="pagePrivate.addressData" value-text-align="left")
        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            group-title(slot="title") 生活状态
            selector(title="感情经历" :options="['无','1次','2次','3次','4次','5次','5-10次','10次以上']" v-model="sex")
            selector(title="吸烟" :options="['不吸烟并反感','不吸烟','偶尔','经常']" v-model="smoke")
            selector(title="饮酒" :options="['不饮酒','偶尔','经常','无酒不欢']" v-model="drink")
            selector(title="宠物" :options="['养猫','养狗','想养宠物','不喜欢宠物','无']" v-model="pet")
            x-input(title="饮食习惯" v-model="diet")
            x-input(title="兴趣爱好" v-model="attachHobbies" placeholder="请选择，可自由输入")
        scroller(lock-x height="200px")
            checker(v-model="hobbies" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected")
                checker-item(:value="item" v-for="item in pagePrivate.hobbies" :key="item") {{item}}

        group(label-width="4.5em" label-margin-right="2em" label-align="right")
            x-input(title="个人标签" v-model="attachLabel" placeholder="请选择，可自由输入")
        scroller(lock-x height="200px")
            checker(v-model="label" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected")
                checker-item(:value="item" v-for="item in pagePrivate.label" :key="item") {{item}}
        group(title="自我介绍")
            x-textarea(v-model="selfIntroduction" :max="1024" :rows="8" placeholder="自我介绍")

        group(title="心中的另一半")
            br
            br
            x-button(type="primary" @click.native="save") 保存
            
</template>
<script>
import { Group,GroupTitle, XInput, Selector, XButton,Datetime,ChinaAddressData,XAddress,XTextarea,Scroller,Checker, CheckerItem } from "vux";
import api from "@/api/api";

let _nationality = `汉族、满族、蒙古族、回族、藏族、维吾尔族、苗族、彝族、壮族、布依族、侗族、瑶族、白族、土家族、哈尼族、哈萨克族、傣族、黎族、傈僳族、佤族、畲族、高山族、拉祜族、水族、东乡族、纳西族、景颇族、柯尔克孜族、土族、达斡尔族、仫佬族、羌族、布朗族、撒拉族、毛南族、仡佬族、锡伯族、阿昌族、普米族、朝鲜族、塔吉克族、怒族、乌孜别克族、俄罗斯族、鄂温克族、德昂族、保安族、裕固族、京族、塔塔尔族、独龙族、鄂伦春族、赫哲族、门巴族、珞巴族、基诺族`.split(
  "、"
);
let _height = ['150以下']
let _minHeight = 151
while (_minHeight < 200) {
    _height.push(`${_minHeight}cm`)
    _minHeight++
}
_height.push('200以上')

let _weight = ['40kg以下']
let _minWeight = 41
while (_minWeight < 99) {
    _weight.push(`${_minHeight}kg`)
    _minWeight++
}
_weight.push('100以上')

let _hobbies = `唱歌、听音乐、看电影、看韩剧、看综艺娱乐节目、看书、看小说、看杂志、逛街、跳舞、吉他、健身、瑜伽、足球、篮球、排球、跑步、羽毛球、乒乓球、保龄球、游泳、划船、水上娱乐、登山、郊游、钓鱼、养鱼、饲养宠物、玩游戏、摄影、摄像、旅游、吃美食、做饭、做糕点、十字绣、织毛衣、做服装服饰、打扑克、麻将、睡觉、读书、练字、书法、下棋、美容`.split('、')
let _label = `三毛、黑长直、一血小王子、泡吧、非洲酋长、口琴、吃饱才有力气、麻将、流行、不吃肉不能活、翻山越岭只为吃中二病晚期、直男癌晚期、高富帅、琼瑶、铲屎官、仙气十足、摇滚、王小波、我这么美我不能死、大叔、IT民工、飞友、萌萌哒、穷游党、正太、锤粉、男神、腹黑、TVB影迷、小清新、为了联盟、烹饪、烘焙、美妆达人、眼镜男、钢琴、逛街、玄不救非，氪不改命、吉他、追剧是坚持、宫崎骏、喵星人、懒癌患者、衬衫控、做一个开心的吃货、聚会、果粉、K歌之王、软妹子、轻音乐、逗比、夜猫子、宅男拯救世界、选择恐惧症、绘画、欧皇、民谣、为了部落、花草、米粉、宇宙第一帅、长腿欧巴、篮球、女神、汪星人、话唠、索尼大法好、背包客、天然呆、萌新求带、愤青、萝莉`.split('、')

export default {
  components: {
    Group,GroupTitle,
    XInput,
    Selector,
    XButton,Datetime,ChinaAddressData,XAddress,XTextarea,Scroller,Checker, CheckerItem
  },
  data() {
    return {
      pagePrivate: {
        nationality: _nationality,
        height:_height,
        weight:_weight,
        education:['高中及以下','大专','本科','双学士','硕士','博士'],
        constellation:`白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座、双鱼座`.split('、'),
        salary:['5万以下','5-10万','10-15万','15-20万','20-30万','30-50万','50-100万','100万以上'],
        addressData:ChinaAddressData,
        hobbies:_hobbies,
        label:_label
      },
      attachHobbies:'',
      attachLabel:'',
      id: 1,
      userid: 1,
      wx:'',
      phone: "13002882316",
      name: "ywb",
      gender: "男",
      nationality: "",
      birth: "0001-01-01T00:00:00Z",
      height: 0,
      weight: 0,
      education: "",
      constellation: "",
      profession: "",
      salary: "",
      car: "",
      house: "",
      address: ["",'',''],
      hometown: ["",'',''],
      sex: "",
      smoke: "",
      drink: "",
      pet: "",
      diet: "",
      hobbies: "",
      label: "",
      selfIntroduction: "",
      forAge: "",
      forHeight: "",
      forWeight: "",
      forEducation: "",
      forSalary: "",
      forCar: "",
      forHouse: "",
      forAddress: "",
      forHometown: "",
      forSex: "",
      forSmoke: "",
      forDrink: "",
      forPet: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {},
    async save() {}
  },
  created() {}
};
</script>
<style>
.demo1-item{
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 3px 8px;
    margin: 3px;
    font-size:12px;
} 
.demo1-item-selected{
    border: 1px solid green;

}
</style>
