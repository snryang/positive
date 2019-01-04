exports.yun = (a,b)=>{
    return wx.cloud.callFunction({
        name: 'yun',
        data: {a,b}
    })
}