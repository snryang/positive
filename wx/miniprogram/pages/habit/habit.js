// pages/habit/habit.js
import regeneratorRuntime from '../../utils/runtime.js'
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
        pageStatus1: 1,
        habitName1: "",
        disabled1: false,
        currentHabit1: {},
        pageStatus2: 1,
        habitName2: "",
        disabled2: false,
        currentHabit2: {}
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
        this.pageInit();

        //this.showMyHabit()

    },
    async pageInit() {
        wx.showLoading({
            title: '加载中',
        })
        let res1 = await habitApi.currentHabit(1);
        let res2 = await habitApi.currentHabit(2);

        if (res1.result == null) {
            this.setData({
                pageStatus1: 1,
                disabled1: false
            })
        } else {
            let lastTime = res1.result.lastTime;
            res1.result.lastTime = moment(lastTime).format("YYYY-MM-DD HH:mm");

            this.setData({
                pageStatus1: 2,
                currentHabit1: res1.result,
                disabled1: moment(new Date).format("YYYY-MM-DD") == moment(lastTime).format("YYYY-MM-DD")
            })
        }

        if (res2.result == null) {
            this.setData({
                pageStatus2: 1,
                disabled2: false
            })
        } else {
            let lastTime = res2.result.lastTime;
            res2.result.lastTime = moment(lastTime).format("YYYY-MM-DD HH:mm");

            this.setData({
                pageStatus2: 2,
                currentHabit2: res2.result,
                disabled2: moment(new Date).format("YYYY-MM-DD") == moment(lastTime).format("YYYY-MM-DD")
            })
        }

        wx.hideLoading()
        wx.stopPullDownRefresh()
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
        this.pageInit();
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

    bindInputHabitName1(e) {
        this.setData({
            habitName1: e.detail.value
        })
    },
    bindInputHabitName2(e) {
        this.setData({
            habitName2: e.detail.value
        })
    },

    onSubmit1() {
        if (this.data.pageStatus1 == 1) {
            if (isEmpty(this.data.habitName1)) {
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
            habitApi.add({
                name: this.data.habitName1,
                type: 1
            }).then(res => {
                console.log(res);
                // let lastTime = res.result.lastTime;
                // res.result.lastTime = moment(lastTime).format("YYYY-MM-DD HH:mm");
                this.setData({
                    pageStatus1: 2,
                    currentHabit1: res.result,
                    disabled1: false
                })
                wx.showToast({
                    title: '创建成功，加油！',
                    icon: 'success',
                    duration: 1500
                });
            });

        } else {
            //打卡
            wx.showLoading({
                title: '处理中',
            })
            habitApi.inc(this.data.currentHabit1._id).then(res => {
                wx.hideLoading()
                let total = this.data.currentHabit1.num + 1;
                if (total < 30) {
                    this.setData({
                        "currentHabit1.num": total,
                        "currentHabit1.lastTime": moment(new Date).format("yyyy-MM-DD HH:mm"),
                        "disabled1": true
                    })
                    wx.showToast({
                        title: '打卡成功',
                        icon: 'success',
                        duration: 1500
                    });
                } else {
                    this.setData({
                        "currentHabit1.num": total,
                    })
                    var that = this;
                    wx.showModal({
                        title: '恭喜你！完成30次打卡',
                        content: '奖励一下自己，准备接受新挑战吧',
                        showCancel: false,
                        success(res) {
                            that.setData({
                                pageStatus1: 1,
                                disabled1: false
                            })
                        }
                    })
                }
            })
        }
    },

    onSubmit2() {
        if (this.data.pageStatus2 == 1) {
            if (isEmpty(this.data.habitName2)) {
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
            habitApi.add({
                name: this.data.habitName2,
                type: 2
            }).then(res => {
                console.log(res);
                // let lastTime = res.result.lastTime;
                // res.result.lastTime = moment(lastTime).format("YYYY-MM-DD HH:mm");
                this.setData({
                    pageStatus2: 2,
                    currentHabit2: res.result,
                    disabled2: false
                })
                wx.showToast({
                    title: '创建成功，加油！',
                    icon: 'success',
                    duration: 1500
                });
            });

        } else {
            //打卡
            wx.showLoading({
                title: '处理中',
            })
            habitApi.inc(this.data.currentHabit2._id).then(res => {
                wx.hideLoading()
                let total = this.data.currentHabit2.num + 1;
                if (total < 30) {
                    this.setData({
                        "currentHabit2.num": total,
                        "currentHabit2.lastTime": moment(new Date).format("yyyy-MM-DD HH:mm"),
                        "disabled2": true
                    })
                    wx.showToast({
                        title: '打卡成功',
                        icon: 'success',
                        duration: 1500
                    });
                } else {
                    this.setData({
                        "currentHabit2.num": total,
                    })
                    var that = this;
                    wx.showModal({
                        title: '恭喜你！完成30次打卡',
                        content: '奖励一下自己，准备接受新挑战吧',
                        showCancel: false,
                        success(res) {
                            that.setData({
                                pageStatus2: 1,
                                disabled2: false
                            })
                        }
                    })
                }
            })

        }
    },

    onDel1: function() {
        wx.showModal({
            title: '',
            content: '删除后不能恢复，确认删除嘛？',
            confirmText: "确认删除",
            cancelText: "取消",
            success: (res) => {
                if (res.confirm) {
                    habitApi.del(this.data.currentHabit1._id).then(() => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.setData({
                            pageStatus1: 1,
                            disabled1: false,
                            currentHabit1: {}
                        })
                    })
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    },

    onDel2: function() {
        wx.showModal({
            title: '',
            content: '删除后不能恢复，确认删除嘛？',
            confirmText: "确认删除",
            cancelText: "取消",
            success: (res) => {
                if (res.confirm) {
                    habitApi.del(this.data.currentHabit2._id).then(() => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.setData({
                            pageStatus2: 1,
                            disabled2: false,
                            currentHabit2: {}
                        })
                    })
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    }

    // showMyHabit:function(){
    //     habitApi.myHabits().then(res =>{
    //         this.setData({
    //             myHabits: res.result || [],
    //         })
    //     })
    // }
})