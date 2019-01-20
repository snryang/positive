import regeneratorRuntime from '../../utils/runtime.js'
let api = require("../../api/habitApi.js")
let commonApi = require("../../api/commonApi.js");
let R = require("../../utils/ramda.min.js")
import moment from "../../utils/moment.min.js"
let pageIndex = 1;


Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:null,
        currentOpenId:null,
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        commonApi.getOpenId("").then(res => {
            console.log(res.result);
            this.setData({ currentOpenId: res.result})
        });   
            
        if (options.id){
            this.setData({ openid: options.id })
            commonApi.getUser(options.id).then(res =>{
                wx.setNavigationBarTitle({
                    title: res.userInfo.nickName + ' 的例行公事'
                })
            })
        }else{
            wx.setNavigationBarTitle({
                title: "例行公事广场"
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.pageInit();
    },

    async pageInit(){
        let that = this;
        wx.showLoading({
            title: '加载中',
        })
        let filter = {
            pageIndex: pageIndex,
            pageSize: 30
        };
        if (this.data.openId != null) filter.openId = this.data.openId
        let res = await api.selectHabits(filter);
        let habits = res.result.data;
        let openIds = R.pluck('openId')(habits);
        let res2 = await commonApi.selectUsers(openIds);
        let users = res2.result.data;

        if (pageIndex == 1) {
            that.setData({
                items: []
            });
        }
        let items = R.map(p => {
            p.lastTime = moment(p.lastTime || p.createTime ).format("YYYY-MM-DD HH:mm");
            let user = R.find(R.propEq('openId', p.openId))(users);
            return {
                nickName: user.userInfo.nickName,
                avatarUrl: user.userInfo.avatarUrl,
                openId: user.openId,
                habit: p
            }
        }, habits);
        that.setData({
            items: that.data.items.concat(items)
        });
        console.log(items);
        wx.stopPullDownRefresh()
        wx.hideLoading()
    },

    toUser(e){
        if (this.data.openid == null){
            wx.navigateTo({
                url: '../habitList/index?id=' + e.currentTarget.dataset.openid
            })
        }
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
        pageIndex = 1;
        this.pageInit();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.items.length < pageIndex * 30) {
            wx.showToast({
                title: '没有了',
                icon: 'none',
                duration: 1500
            })
        } else {
            pageIndex++;
            this.pageInit();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})