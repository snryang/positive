// miniprogram/pages/articleWrite/index.js
import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/articleApi.js")
let R = require("../../utils/ramda.min.js")
let commonApi = require("../../api/commonApi.js")
import moment from '../../utils/moment.min.js'
const contentCacheKey = 'positive_reply';
let isEmpty = R.compose(R.isEmpty, R.trim);



//https://blog.csdn.net/belvine/article/details/80687003

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentOpenId:'',
        disabled: true,
        content: '',
        nickName: '',
        openId: '',
        articleId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        commonApi.getOpenId("").then(res => {
            this.setData({ currentOpenId: res.result })
        });
        wx.setNavigationBarTitle({
            title: '回复',
        })
        this.setData({
            nickName: options.nickname,
            openId: options.openid,
            articleId: options.articleid
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var that = this;
        wx.getStorage({
            key: contentCacheKey,
            success(res) {
                console.log(res)
                that.setData({
                    content: res.data,
                    disabled: isEmpty(res.data)
                });
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    onSubmit() {
        wx.showLoading({
            title: '处理中...',
        })
        var reply = {
            articleId: this.data.articleId,
            content: this.data.content,
            at: this.data.openId,
        }

        api.addReply(reply).then(res => {
            wx.setStorage({
                key: contentCacheKey,
                data: ""
            })            
            reply = res.result;
            reply.time = moment(reply.time).format("YYYY-MM-DD HH:mm")
            commonApi.selectUsers([this.data.openId, this.data.currentOpenId]).then(res1 =>{
                wx.hideLoading()

                let users = res1.result.data;
                reply.user = R.find(R.propEq('openId', this.data.currentOpenId))(users);
                reply.atUser = R.find(R.propEq('openId', this.data.openId))(users);

                var pages = getCurrentPages();
                if (pages.length > 1) {
                    var prePage = pages[pages.length - 2];
                    prePage.addReply(reply)
                }

                wx.showToast({
                    title: '回复成功',
                    icon: 'success',
                    duration: 1500
                });
                setTimeout(() => {
                    wx.navigateBack({ delta: 1 })
                }, 2000)

            });
        });
    },

    contentInput(e) {
        console.log(e.detail.value)
        this.setData({
            disabled: isEmpty(e.detail.value),
            content: e.detail.value
        });

        wx.setStorage({
            key: contentCacheKey,
            data: e.detail.value
        })
    }

})