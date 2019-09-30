<template lang="pug">
    div
        van-sticky
            van-nav-bar(left-arrow @click-left="onClickLeft" title="填写个人资料")
                div(slot="right")
                    van-button(type="primary" size="small" @click="save") 保存
        div(class="fx-row"): div(span="fx-1"): img(v-if="imgUrl != ''" :src="imgUrl" style="width:100%")

        van-sticky(:offset-top="46")
            van-tabs(v-model="activeName")
                van-tab(title="基本信息" name="a")                
                van-tab(title="择偶要求" name="b")   
                van-tab(title="选填项" name="c")

        div(v-if="activeName=='a'")
            van-cell-group(title="必填项")
                van-field(label="手机号" type="number" maxlength="11" required placeholder="手机号" v-model="entity.phone")
                van-field(label="微信号" required placeholder="微信号" v-model="entity.wx")
                van-field(label="姓名" required placeholder="姓名" v-model="entity.name")
                van-select(label="性别" required  :options="['男', '女']" v-model="entity.gender")             
                van-field(label="出生日期" required placeholder="1990-09-27" v-model="entity.birth" error-message="示例：1990-09-27")
                van-select(label="身高" required :options="pagePrivate.height" v-model="entity.height")             
                van-select(label="体重" required :options="pagePrivate.weight" v-model="entity.weight")             
                van-select(label="学历" required :options="pagePrivate.education" v-model="entity.education")             
                van-field(label="职业" required placeholder="职业" v-model="entity.profession")
                van-select(label="年薪" required :options="pagePrivate.salary" v-model="entity.salary")             
                van-select(label="住房" required :options="['已购无贷款','已购有贷款','无','保密']" v-model="entity.house")             
                van-select(label="汽车" required :options="['豪华型','经济型', '无','保密']" v-model="entity.car")             
                van-select(label="婚烟状态" required :options="['单身','离异', '丧偶']" v-model="entity.marriage")             
                van-field(label="居住地" required placeholder="居住地" v-model="entity.address" error-message="示例：成都市金牛区 XXX")         
                van-field(label="家乡" placeholder="家乡" v-model="entity.hometown")   
                van-field(label="兴趣爱好" v-model="entity.attachHobbies" placeholder="请选择，可自由输入")
            div(class="scroller")
                van-tag(color="#f2826a" )
                van-tag(color="#f2826a" v-for="item in entity.hobbies" :plain="!item.checked" @click="item.checked = !item.checked") {{item.value}}              
            van-cell-group(title="自我介绍")
                van-field(v-model="entity.selfIntroduction" type="textarea" :rows="8" maxlength="1024" placeholder="自我介绍，填写越详细匹配度越高")


        div(v-if="activeName=='b'")
            div(class="fx-row" style="background-color:#fff") 
                div(class="ywb-cell-title") 年龄
                div(span="fx-1"): van-select(:options="pagePrivate.forAge" :labelWidth="1" v-model="entity.forAge1") 
                div(style="padding:16px 16px 10px 16px;") -
                div(span="fx-1"): van-select(:options="pagePrivate.forAge" :labelWidth="1" v-model="entity.forAge2")
            div(class="fx-row" style="background-color:#fff") 
                div(class="ywb-cell-title") 身高
                div(span="fx-1"): van-select(:options="pagePrivate.height" :labelWidth="1" v-model="entity.forHeight1")
                div(style="padding:16px 16px 10px 16px;") -
                div(span="fx-1"): van-select(:options="pagePrivate.height" :labelWidth="1" v-model="entity.forHeight2")
            div(class="fx-row" style="background-color:#fff") 
                div(class="ywb-cell-title") 体重
                div(span="fx-1"): van-select(:options="pagePrivate.weight" :labelWidth="1" v-model="entity.forWeight1")
                div(style="padding:16px 16px 10px 16px;") -
                div(span="fx-1"): van-select(:options="pagePrivate.weight" :labelWidth="1" v-model="entity.forWeight2")                    
            van-cell-group()
                van-select(label="学历" :options="pagePrivate.education1" v-model="entity.forEducation")  
                van-select(label="年薪" :options="pagePrivate.salary1" v-model="entity.forSalary")
                van-select(label="汽车" :options="['不限','有车']" v-model="entity.forCar")
                van-select(label="住房" :options="['不限','有房','有房无贷款']" v-model="entity.forHouse")
                van-select(label="感情经历" :options="['不限','1次','2次','3-5次']" v-model="entity.forSex")        
                van-select(label="吸烟" :options="['不限','不吸烟','接受偶尔吸烟']" v-model="entity.forSmoke")
                van-select(label="饮酒" :options="['不限','不喝酒','接受偶尔喝酒','千杯不醉']" v-model="entity.forDrink")
                van-select(label="宠物" :options="['不限','不接受宠物','喜欢养宠物']" v-model="entity.forPet")
            van-cell-group(title="其它要求")
                van-field(v-model="entity.forOther" type="textarea" :rows="8" maxlength="512" placeholder="其它要求，填写越详细匹配度越高")


        div(v-if="activeName=='c'") 
            van-cell-group()
                van-select(label="民族" :options="pagePrivate.nationality" v-model="entity.nationality")  
                van-select(label="星座" :options="pagePrivate.constellation" v-model="entity.constellation")                                                 
                van-select(label="感情经历" :options="['无','1次','2次','3次','4次','5次','5-10次','10次以上']" v-model="entity.sex")
                van-select(label="吸烟" :options="['不吸烟并反感','不吸烟','偶尔','经常']" v-model="entity.smoke")
                van-select(label="饮酒" :options="['不饮酒','偶尔','经常','无酒不欢']" v-model="entity.drink")
                van-select(label="宠物" :options="['养猫','养狗','想养宠物','不喜欢宠物','无']" v-model="entity.pet")
                van-field(label="饮食习惯" v-model="entity.diet")               
            van-cell-group()
                van-field(label="个人标签" v-model="entity.attachLabel" placeholder="请选择，可自由输入")
            div(class="scroller")
                van-tag(color="#f2826a" )
                van-tag(color="#f2826a" v-for="item in entity.label" :plain="!item.checked" @click="item.checked = !item.checked") {{item.value}}

        
        div(class="fx-row"): div(span="fx-1"): img(v-if="imgUrl2 != ''" :src="imgUrl2" style="width:100%")
        br
        br
</template>
<script>
import {markdown} from 'markdown';
import * as _ from "ramda";
import axios from "axios";
import api from "@/api/api";
import VanSelect from '@/views/VanSelect'
import moment from 'moment'

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
_hobbies = _.map(p=>{return{value:p,checked:false}},_hobbies)
let _label = `三毛、黑长直、一血小王子、泡吧、非洲酋长、口琴、吃饱才有力气、麻将、流行、不吃肉不能活、翻山越岭只为吃中二病晚期、直男癌晚期、高富帅、琼瑶、铲屎官、仙气十足、摇滚、王小波、我这么美我不能死、大叔、IT民工、飞友、萌萌哒、穷游党、正太、锤粉、男神、腹黑、TVB影迷、小清新、为了联盟、烹饪、烘焙、美妆达人、眼镜男、钢琴、逛街、玄不救非，氪不改命、吉他、追剧是坚持、宫崎骏、喵星人、懒癌患者、衬衫控、做一个开心的吃货、聚会、果粉、K歌之王、软妹子、轻音乐、逗比、夜猫子、宅男拯救世界、选择恐惧症、绘画、欧皇、民谣、为了部落、花草、米粉、宇宙第一帅、长腿欧巴、篮球、女神、汪星人、话唠、索尼大法好、背包客、天然呆、萌新求带、愤青、萝莉`.split(
  "、"
);
_label = _.map(p=>{return{value:p,checked:false}},_label)
let _forAge = _loop([], 18, 50, p => `${p}岁`);

export default {
    components: {
    VanSelect
  },
  data: function() {
    return {
      imgUrl: "",
      imgUrl2:'',
      activeName: "a",
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
          "100万以上",
          "保密"
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
    this.init()
    this.loadUserDetail();
  },
  methods: {
    async init(){
        let value = await api.config.get("page_usercenter_detail")            
        this.imgUrl = value.split(';')[0] || ''
        this.imgUrl2 = value.split(';')[1] || ''
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    tagHander(checkedItem,items){      
      checkedItem = _.filter( p => p.value != "" ,_.map(p=>{return{value:p,checked:true}},checkedItem))
      for(var i=0,item;item=items[i];i++){
        if(_.find( p => {return p.value == item.value},checkedItem) == void 0){
          checkedItem.push(item)
        }
      }
      return checkedItem
    },
    async loadUserDetail() {
      this.$toast({type:'loading',forbidClick:true,duration: 0,message: '数据加载...'});      
      
      
      let res = await api.user.getDetail();
      if (res.success) {
        var entity = res.data;
        entity.userid = this.$ls.get("userid");
        if (_.isEmpty(entity.phone)) {
          entity.phone = this.$ls.get("phone");
        }
        if (_.isEmpty(entity.gender)) entity.gender = "女";
        if (_.isEmpty(entity.nationality)) entity.nationality = "汉族";
        // if (_.isEmpty(entity.birth)) entity.birth = "1990-01-01";
        // if (_.isEmpty(entity.height)) entity.height = "170cm";
        // if (_.isEmpty(entity.weight)) entity.weight = "50kg";
        // if (_.isEmpty(entity.education)) entity.education = "大专";
        // if (_.isEmpty(entity.marriage)) entity.marriage = "单身";

        
        entity.attachHobbies = "";
        entity.attachLabel = "";
        entity.hobbies = this.tagHander(entity.hobbies.split(" ") || [],this.pagePrivate.hobbies) 
        entity.label = this.tagHander(entity.label.split(" ") || [],this.pagePrivate.label) 
       
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
        this.$notify(res.msg)        
      }
      this.$toast.clear();
    },
    // getAddressName(value) {
    //   if (value == "") return "";
    //   let item = _.find(_.propEq("value", value))(this.pagePrivate.addressData);
    //   return item.name || "";
    // },
    async save() {
      let entity = _.clone(this.entity);

      entity.userid = this.$ls.get("userid");

      if (entity.phone.length != 11) {
        this.$notify('手机号不正确');        
        this.$vux.toast.text("手机号不正确", "top");
        return;
      }
      if (_.isEmpty(entity.wx)) {
        this.$notify('请填写微信号');                
        return;
      }
      if (_.isEmpty(entity.name)) {
        this.$notify('请填写姓名');                
        return;
      }
      if (_.isEmpty(entity.gender)) {
        this.$notify('请填写性别');                
        return;
      }
      if (moment(entity.birth).format("YYYY-MM-DD") == 'Invalid date') {
        this.$notify('出生日期格式不正确');                
        return;
      }
        if (_.isEmpty(entity.height)) {
        this.$notify('请填写身高');                
        return;
      }
      if (_.isEmpty(entity.weight)) {
        this.$notify('请填写体重');                
        return;
      }
      if (_.isEmpty(entity.education)) {
        this.$notify('请填写学历');                
        return;
      }

      if (_.isEmpty(entity.profession)) {
        this.$notify('请填写职业');                
        return;
      }
      if (_.isEmpty(entity.salary)) {
        this.$notify('请填写年薪');                
        return;
      }
      if (_.isEmpty(entity.house)) {
        this.$notify('请填写住房');                
        return;
      }
      if (_.isEmpty(entity.car)) {
        this.$notify('请填写汽车');                
        return;
      }
      if (_.isEmpty(entity.marriage)) {
        this.$notify('请填写婚烟状态');                
        return;
      }
      if (_.isEmpty(entity.address)) {
        this.$notify('请填写居住地');                
        return;
      }

      // entity.address = [
      //   this.getAddressName(entity.address[0]),
      //   this.getAddressName(entity.address[1]),
      //   this.getAddressName(entity.address[2])
      // ].join(",");
      // entity.hometown = [
      //   this.getAddressName(entity.hometown[0]),
      //   this.getAddressName(entity.hometown[1]),
      //   this.getAddressName(entity.hometown[2])
      // ].join(",");

      entity.forAge = `${entity.forAge1}-${entity.forAge2}`;
      entity.forHeight = `${entity.forHeight1}-${entity.forHeight2}`;
      entity.forWeight = `${entity.forWeight1}-${entity.forWeight2}`;
      entity.hobbies = _.pluck('value')(_.filter(p=> p.checked,entity.hobbies))
        .concat(entity.attachHobbies.split(" "))
        .join(" ");
      entity.label = _.pluck('value')(_.filter(p=> p.checked,entity.label))
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

      this.$toast({type:'loading',forbidClick:true,duration: 0,message: '数据保存中...'});      
      
      let res = await api.user.saveDetail(entity);
      this.$toast.clear();
      if (res.success) {
        this.$toast.success('保存成功')
      } else {
        this.$toast.fail(res.msg)
      }
    }
  }
};
</script>
<style>
.scroller{    
    padding:5px;
    height:154px;
    overflow-y: scroll;    
}
.scroller  .van-tag{
    margin-left: 5px;
    margin-top: 5px;
}

.ywb-cell-title {
    color: rgb(50, 50, 51);
display: block;
font-size: 14px;

width: 90px;
padding:16px 16px 10px 16px;
-webkit-box-flex: 0;
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
</style>
