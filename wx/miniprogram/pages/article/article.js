import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/articleApi.js")
let commonApi = require("../../api/commonApi.js");
let R = require("../../utils/ramda.min.js")


Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageIndex: 1,
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let that = this;
        this.loadArticle(1);
    },
    async loadArticle(pageIndex) {
        let that = this;
        wx.showLoading({
            title: '加载中',
        })


        let res = await api.selectArticles({
            pageIndex: that.data.pageIndex,
            pageSize: 30
        });
        let articles = res.result.data;
        let openIds = R.pluck('openId')(articles);
        let res2 = await commonApi.selectUsers(openIds);
        let users = res2.result.data;        

        R.map(async p => {
            let user = R.find(R.propEq('openId', p.openId))(users);
            let obj = {
                nickName: user.userInfo.nickName,
                avatarUrl: user.userInfo.avatarUrl,
                habit: user.habit,
                article: p
            }            
            that.setData({
                items: that.data.items.concat([obj])
            });
            console.log(obj)
        }, articles);
        
        wx.hideLoading()
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
        console.log("onPullDownRefresh");
        this.setData({
            pageIndex:1,
            items:[]
        });

        this.loadArticle(1);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        console.log("onReachBottom");
        if(this.data.items.length < this.data.pageIndex * 30){
            wx.showToast({
                title: '没有日志了',
                icon: 'none',
                duration: 1500
            })
        }else{
            let pageIndex = this.data.pageIndex++;
            this.setData({pageIndex})
            this.loadArticle(pageIndex);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    //转到详细
    bindToDetail(e) {
        console.log(e.currentTarget.id)
        console.log(e)
    },
    bindToWrite(e) {
        wx.navigateTo({
            url: '../articleWrite/index'
        })
    }
})