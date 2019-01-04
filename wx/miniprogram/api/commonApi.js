let {yun} = require("./yun.js");
let app = getApp()

exports.updateUser = () => {
    console.log(app.currentUser);
    return yun("user.update",app.currentUser);
}

exports.selectUsers = (openIds) =>{
    return yun("user.selectUsers",openIds);
}