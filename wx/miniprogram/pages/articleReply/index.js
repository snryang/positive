// miniprogram/pages/articleWrite/index.js
let api = require("../../api/articleApi.js")
let R = require("../../utils/ramda.min.js")

const contentCacheKey = 'positive_Content';
let isEmpty = R.compose(R.isEmpty, R.trim);



//https://blog.csdn.net/belvine/article/details/80687003

Page({

    /**
     * 页面的初始数据
     */
    data: {
        anonymity: false,
        disabled: true,
        title: '',
        content: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '写日记',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
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
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    switchChange(e) {
        console.log(e.detail.value);
        this.setData({
            anonymity: e.detail.value
        })
    },
    onSubmit() {
        console.log(this.data);
        api.addArticle({
            title: this.data.title,
            content: this.data.content,
            anonymity: this.data.anonymity
        }).then(res => {
            wx.setStorage({
                key: contentCacheKey,
                data: ""
            })
            console.log(res);
            wx.showToast({
                title: '发表成功',
                icon: 'success',
                duration: 1500
            });
            setTimeout(() => {
                wx.switchTab({
                    url: '../article/article'
                })
            }, 2000)

        });
    },
    titleInput(e) {
        this.setData({ title: e.detail.value })
    },
    contentInput(e) {
        console.log(e.detail.value)
        this.setData({ disabled: isEmpty(e.detail.value), content: e.detail.value });

        wx.setStorage({
            key: contentCacheKey,
            data: e.detail.value
        })
    }

})