import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/articleApi.js")
let commonApi = require("../../api/commonApi.js")
import moment from "../../utils/moment.min.js"
import * as R from "../../utils/ramda.min.js"

let pageIndex = 1;


Page({

    /**
     * 页面的初始数据
     */
    data: {
        like: 0,
        currentOpenId: null,
        article: {},
        user: {},
        replies: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.articleId = options.id || "";
        commonApi.getOpenId("").then(res => {
            this.setData({
                currentOpenId: res.result
            })
        });
        api.likeStatus(this.articleId).then(res => {
            this.setData({
                like: res.result
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        if (this.articleId != "") {
            this.loadContent();

        } else {
            wx.showToast({
                title: '日记被主人删除',
                icon: 'none',
                duration: 3000
            })
        }
    },

    async loadContent() {
        wx.showLoading({
            title: '加载中',
        })
        if (pageIndex == 1) {
            let res = await api.getArticle(this.articleId);
            let res1 = await commonApi.selectUsers([res.result.data.openId]);
            res.result.data.time = moment(res.result.data.time).format("YYYY-MM-DD HH:mm");
            this.setData({
                article: res.result.data,
                user: res1.result.data[0],
            })
            wx.setNavigationBarTitle({
                title: this.data.article.title.length > 0 ? this.data.article.title : this.data.article.anonymity ? "匿名日记" : this.data.user.habit
            })
        }

        let res3 = await api.selectReplies({
            articleId: this.articleId,
            pageIndex: this.pageIndex,
            pageSize: 30
        });

        let replies = R.map(p => {
            p.time = moment(p.time).format("YYYY-MM-DD HH:mm");
            return p
        }, res3.result.data)


        let openIds = R.pluck('openId')(replies);
        openIds = R.compose(R.uniq, R.concat(openIds), R.pluck('at'))(replies)

        let res4 = await commonApi.selectUsers(openIds);
        let users = res4.result.data;

        replies = R.map(p => {
            let user = R.find(R.propEq('openId', p.openId))(users);
            let atUser = R.find(R.propEq('openId', p.at))(users);
            p.time = moment(p.time).format("YYYY-MM-DD HH:mm");
            p.user = user;
            p.atUser = atUser
            return p
        }, replies)

        this.setData({
            replies: this.data.replies.concat(replies),
        })
        wx.stopPullDownRefresh()
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

    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        console.log("onReachBottom");
        if (this.data.replies.length < pageIndex * 30) {
            wx.showToast({
                title: '没有回复了',
                icon: 'none',
                duration: 1500
            })
        } else {
            pageIndex++;
            this.loadContent();
        }
    },
    addReply(reply) {
        this.setData({
            replies: this.data.replies.concat([reply])
        });

    },

    toDel(e) {
        let replyid = e.currentTarget.dataset.replyid;
        wx.showModal({
            title: '',
            content: '删除后不能恢复，确认删除嘛？',
            confirmText: "确认删除",
            cancelText: "取消",
            success: (res) => {
                if (res.confirm) {
                    api.delReply(replyid).then((res) => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.setData({
                            replies: R.filter(p => p._id != replyid, this.data.replies)
                        })
                    })
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    },
    toReply(e) {
        let d = e.currentTarget.dataset;
        wx.navigateTo({
            url: `../articleReply/index?articleid=${d.articleid}&openid=${d.openid}&nickname=${encodeURIComponent(d.nickname)}`,
        })
    },
    toLike() {
        api.like(this.data.article._id).then(res => {
            this.setData({
                like: 1,
                "article.like": this.data.article.like + 1
            })
        })

    },
    toUnlike() {
        api.unlike(this.data.article._id).then(res => {
            this.setData({
                like: 0,
                "article.like": this.data.article.like - 1
            })
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})