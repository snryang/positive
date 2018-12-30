let app = getApp()

exports.get = (key) => {
  console.log(app.currentUser);
  return wx.cloud.callFunction({
    name: 'yun',
    data: {
      a: "config.get",
      b: key,
      c: app.currentUser
    }
  })
}