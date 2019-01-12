import regeneratorRuntime from '../utils/runtime.js'
let R = require("../utils/ramda.min.js")
let yun = async (a, b) => {
    console.log("call yun :"+a + ":" + JSON.stringify(b))
    let result =await wx.cloud.callFunction({
        name: 'yun',
        data: {
            a,
            b
        }
    })
    console.log("call yun :" + a + " result:" + JSON.stringify(result))
    return result;
}

exports.yun = R.curry(yun)