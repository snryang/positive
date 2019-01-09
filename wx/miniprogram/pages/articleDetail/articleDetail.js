import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/articleApi.js")
let commonApi = require("../../api/commonApi.js");
import moment from "../../utils/moment.min.js"
let pageIndex=1;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.articleId = options.id || "XDXlIsDR1TiNb6vt";
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.pageInit();
    },

    async pageInit(){
        wx.showLoading({
            title: '加载中',
        })
        let res = await api.getArticle(this.articleId);
        let res2 = await commonApi.selectUsers([res.result.data.openId]);
        let res3 = await api.selectReplies({ articleId: this.articleId, pageIndex: this.pageIndex,pageSize:30});
        res.result.data.time = moment(res.result.data.time).format("YYYY-MM-DD HH:mm");
        this.setData({
            article: res.result.data,
            user: res2.result.data[0],
            replies:res3.result.data
        })
        console.log(this.data);
        wx.stopPullDownRefresh()
        wx.hideLoading()
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

    reply(e){
        console.log(e.currentTarget.dataset)
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})