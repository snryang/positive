// 云函数入口文件
const cloud = require('wx-server-sdk')

const articleService = require("article.js")
const habitService = require("habit.js")
const configService = require("config.js")

cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event)
  // console.log(context)

  let tag = event.a.split(".");
  switch(tag[0]){
    case "article":
      return await articleService[tag[1]](event.b,cloud);      
    case "habit":
      return await habitService[tag[1]](event.b,cloud);
    case "config":
      return await configService[tag[1]](event.b,cloud);
  }
  return true;
}