//index.js
const commonApi = require('../../api/commonApi.js');

Page({
    data: {
        logged: false
    },

    onLoad: function() {

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            commonApi.updateUser(res.userInfo);
                            this.setData({
                                logged: true
                            })
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



})