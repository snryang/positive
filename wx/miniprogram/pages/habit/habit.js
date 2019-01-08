// pages/habit/habit.js
let moment = require("../../utils/moment.min.js")
let habitApi = require("../../api/habitApi.js")
let R = require("../../utils/ramda.min.js")

let isEmpty = R.compose(R.isEmpty, R.trim);

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTopTips: false,
        //页面状态 1创建新习惯 2每日打卡
        habitName: "",
        pageStatus: 1,
        disabled: false,
        myHabits:[],
        currentHabit:{}
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
        wx.setNavigationBarTitle({
            title: '例行公事',
        })
        //this.showMyHabit()
        wx.showLoading({
            title: '加载中',
        })
        habitApi.currentHabit().then(res =>{            
            if(res.result == null){
                this.setData({
                    pageStatus: 1,
                    disabled:false
                })
            }else{
                let lastTime = res.result.lastTime;
                res.result.lastTime = moment(lastTime).format("YYYY-MM-DD HH:mm");

                this.setData({
                    pageStatus: 2,
                    currentHabit: res.result,
                    disabled: moment(new Date).format("YYYY-MM-DD") == moment(lastTime).format("YYYY-MM-DD")
                })
            }
            wx.hideLoading();
            wx.stopPullDownRefresh()
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
        this.onReady();
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

    bindInputHabitName(e){
        this.setData({
            habitName: e.detail.value
        })
    },

    onSubmit(){
        if (this.data.pageStatus == 1){            
            if (isEmpty(this.data.habitName)){
                this.setData({
                    showTopTips: true
                });
                setTimeout(() => {
                    this.setData({
                        showTopTips: false
                    });
                }, 3000);
                return;
            }
            //创建习惯
            habitApi.add(this.data.habitName).then(res =>{
                console.log(res);
                // let lastTime = res.result.lastTime;
                // res.result.lastTime = moment(lastTime).format("YYYY-MM-DD HH:mm");
                this.setData({
                    pageStatus: 2,
                    currentHabit: res.result,
                    disabled: false
                })
                wx.showToast({
                    title: '创建成功，加油！',
                    icon: 'success',
                    duration: 1500
                });
            });

        }else{
            //打卡
            wx.showLoading({
                title: '处理中',
            })
            habitApi.inc(this.data.currentHabit._id).then(res=>{
                this.setData({
                    "currentHabit.num":this.data.currentHabit.num +1,
                    "currentHabit.lastTime":moment(new Date).format("yyyy-MM-DD HH:mm"),
                    "disabled":true
                })
                wx.hideLoading()
                wx.showToast({
                    title: '打卡成功',
                    icon: 'success',
                    duration: 1500
                });
            })

        }
    },

    onDel:function(){
        wx.showModal({
            title: '',
            content: '删除后不能恢复，确认删除嘛？',
            confirmText: "确认删除",
            cancelText: "取消",
            success:  (res) =>{
                if (res.confirm) {
                    habitApi.del(this.data.currentHabit._id).then(() =>{
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.setData({
                            pageStatus: 1,
                            disabled:false,
                            currentHabit:{}
                        })
                    })
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    },

    showMyHabit:function(){
        habitApi.myHabits().then(res =>{
            this.setData({
                myHabits: res.result || [],
            })
        })
    }
})