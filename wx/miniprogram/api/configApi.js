
exports.get = (key) => {
  return wx.cloud.callFunction({
    name: 'yun',
    data: {
      a: "config.get",
      b: key
    }
  })
}