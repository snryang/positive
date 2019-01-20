import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/articleApi.js")
let commonApi = require("../../api/commonApi.js");
let R = require("../../utils/ramda.min.js")
import moment from "../../utils/moment.min.js"

let pageIndex = 1;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: null,
        currentOpenId: null,
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        commonApi.getOpenId("").then(res => {
            this.setData({ currentOpenId: res.result })
        });
        console.log(options)
        this.setData({ openid: options.id })
        commonApi.getUser(options.id).then(res => {
            console.log(res)
            wx.setNavigationBarTitle({
                title: res.userInfo.nickName + ' 的日记'
            })
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.loadArticle();
    },
    async loadArticle() {
        let that = this;
        wx.showLoading({
            title: '加载中',
        })
        let filter = {
            pageIndex: pageIndex,
            pageSize: 30
        };
        if (this.data.openId != null) filter.openId = this.data.openId
        let res = await api.selectArticles(filter);
        let articles = res.result.data;
        let openIds = R.pluck('openId')(articles);
        let res2 = await commonApi.selectUsers(openIds);
        let users = res2.result.data;

        if (pageIndex == 1) {
            that.setData({
                items: []
            });
        }
        let items = R.map(p => {
            p.time = moment(p.time).format("YYYY-MM-DD HH:mm");
            let user = R.find(R.propEq('openId', p.openId))(users);
            return {
                nickName: user.userInfo.nickName,
                avatarUrl: user.userInfo.avatarUrl,
                habit: user.habit,
                article: p
            }
        }, articles);
        that.setData({
            items: that.data.items.concat(items)
        });
        console.log(items);
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
        console.log("onPullDownRefresh");
        pageIndex = 1;
        this.loadArticle();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("onReachBottom");
        if (this.data.items.length < pageIndex * 30) {
            wx.showToast({
                title: '没有日志了',
                icon: 'none',
                duration: 1500
            })
        } else {
            pageIndex++;
            this.loadArticle();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    toEdit(e) {
        let articleid = e.currentTarget.dataset.articleid;
        wx.navigateTo({
            url: '../articleEdit/index?id=' + articleid
        })
    },
    toDel(e) {
        let articleid = e.currentTarget.dataset.articleid;
        wx.showModal({
            title: '',
            content: '删除后不能恢复，确认删除嘛？',
            confirmText: "确认删除",
            cancelText: "取消",
            success: (res) => {
                if (res.confirm) {
                    api.delArticle(articleid).then(() => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.setData({
                            items: R.filter(p => p.article._id != articleid, this.data.items)
                        })
                    })
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    },
    
    //转到详细
    bindToDetail(e) {
        console.log(e.currentTarget.id)
        console.log(e)
        wx.navigateTo({
            url: '../articleDetail/articleDetail?id=' + e.currentTarget.id
        })
    },
    bindToWrite(e) {
        wx.navigateTo({
            url: '../articleWrite/index'
        })
    }
})