// miniprogram/pages/articleWrite/index.js
import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/articleApi.js")
let R = require("../../utils/ramda.min.js")
let commonApi = require("../../api/commonApi.js");
const contentCacheKey = 'positive_Content';
let isEmpty = R.compose(R.isEmpty, R.trim);




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
        this.articleId = options.id || "";
        wx.setNavigationBarTitle({
            title: '修改日记',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.loadArticle()
        


    },
    loadArticle(){
        wx.showLoading({
            title: '加载中...',
        })
        api.getArticle(this.articleId).then(res=>{
            console.log(res);
            this.setData({
                anonymity: res.result.data.anonymity,
                disabled: isEmpty(res.result.data.content),
                title: res.result.data.title,
                content: res.result.data.content
            })

            wx.hideLoading()
        });
        
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
        api.updateArticle({
            _id:this.articleId,
            title: this.data.title,
            content: this.data.content,
            anonymity: this.data.anonymity
        }).then(res => {
            wx.setStorage({
                key: contentCacheKey,
                data: ""
            })
            wx.switchTab({
                url: '../article/article'
            })
        });
    },
    titleInput(e) {
        this.setData({
            title: e.detail.value
        })
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