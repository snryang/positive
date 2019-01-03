let app = getApp()

exports.updateUser = () => {
    console.log(app.currentUser);
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a: "user.update",
            b: app.currentUser
        }
    })
}