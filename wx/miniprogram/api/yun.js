let R = require("../utils/ramda.min.js")
let yun = (a, b) => {
    console.log("call yun :"+a + ":" + JSON.stringify(b))
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a,
            b
        }
    })
}

exports.yun = R.curry(yun)