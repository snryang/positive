//index.js
const commonApi = require('../../api/commonApi.js');

Page({
    data: {
        logged: false,
        openid:''
    },

    onLoad: function() {

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            commonApi.updateUser(res.userInfo).then(res =>{
                                console.log(res)
                                this.setData({
                                    logged: true,
                                    openid:res.result

                                })
                            });
                            
                            
                        }
                    })
                }
            }
        })

    },  

    onGetUserInfo: function(e) {        
        if (!this.logged && e.detail.userInfo) {
            commonApi.updateUser(e.detail.userInfo);
            this.setData({
                logged: true                
            })
        }
    },

    toMyArticles(e){
        wx.navigateTo({
            url: '../articleList/index?id=' + this.data.openid
        })
    },
    toMyHabits(e) {
        wx.navigateTo({
            url: '../habitList/index?id=' + this.data.openid
        })
    }


})