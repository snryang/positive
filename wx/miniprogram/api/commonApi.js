import regeneratorRuntime from '../utils/runtime.js'
let {yun} = require("./yun.js");
let app = getApp()
let R = require("../utils/ramda.min.js")

exports.updateUser = yun("user.update");

exports.selectUsers = (openIds) =>{    
    return yun("user.selectUsers",R.uniq(openIds));
}
exports.getUser = async (openId) =>{
    let res = await yun("user.selectUsers", [openId]);    
    return res.result.data[0];
}

exports.getOpenId = yun("user.openid")