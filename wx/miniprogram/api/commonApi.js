let {yun} = require("./yun.js");
let app = getApp()
let R = require("../utils/ramda.min.js")

exports.updateUser = () => {
    console.log(app.currentUser);
    return yun("user.update",app.currentUser);
}

exports.selectUsers = (openIds) =>{    
    return yun("user.selectUsers",R.uniq(openIds));
}