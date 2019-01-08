let R = require("../utils/ramda.min.js")
let yun = (a, b) => wx.cloud.callFunction({name: 'yun',data: { a, b }})

exports.yun = R.curry(yun)