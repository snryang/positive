// pages/habit/habit.js
import regeneratorRuntime from '../../utils/runtime.js'
let moment = require("../../utils/moment.min.js")
let habitApi = require("../../api/habitApi.js")
let R = require("../../utils/ramda.min.js")

let isEmpty = R.compose(R.isEmpty, R.trim);

let disabledHander = p => {    
    p.disabled = moment(new Date).format("YYYY-MM-DD") == moment(p.lastTime).format("YYYY-MM-DD")
    p.lastTime = moment(p.lastTime || p.createTime).format("YYYY-MM-DD HH:mm")
    return p;
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        finish: [],
        habits: [],

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
    },
    async pageInit() {
        wx.showLoading({
            title: '加载中',
        })
        let res1 = await habitApi.myHabits(true);
        let res2 = await habitApi.myHabits(false);

        this.setData({
            finish: R.map(disabledHander, res1.result),
            habits: R.map(disabledHander, res2.result)
        });

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
  
    addHabit(habit){
        console.log(habit);
        this.setData({
            habits: R.map(disabledHander, [habit]).concat(this.data.habits)
        });
        // wx.showToast({
        //     title: '创建成功，加油！',
        //     icon: 'success',
        //     duration: 1500
        // });
    },
    toAdd(){
        wx.navigateTo({
            url: '../habitAdd/index',
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

    onInc(e){
        let habitId = e.currentTarget.dataset.habitid;
        let num = e.currentTarget.dataset.num;
        //打卡
        wx.showLoading({
            title: '处理中',
        })
        habitApi.inc(habitId).then(() => {
            wx.hideLoading()

            let habit = R.find(p => p._id == habitId, this.data.habits)
            if(habit){
                if(num==29){
                    habit.num++;
                    habit.disabled = true;
                    habit.lastTime = moment(new Date).format("YYYY-MM-DD HH:mm");
                    this.setData({
                        habits: R.filter(p => p._id != habitId, this.data.habits),
                        finish: [habit].concat(this.data.finish)
                    })
                    wx.showModal({
                        title: '恭喜你！完成30次打卡',
                        content: '',
                        showCancel: false,
                        success(res) {}
                    })
                    return
                }else{
                    let items = R.map(p=>{
                        if (p._id == habitId){
                            p.num++;
                            p.disabled = true;
                            p.lastTime = moment(new Date).format("YYYY-MM-DD HH:mm");
                        }
                        return p;
                    })(this.data.habits)
                    this.setData({ habits: items})
                }
            }else{
                habit = R.find(p => p._id == habitId, this.data.finish)
                let items = R.map(p => {
                    if (p._id == habitId) {
                        p.num++;
                        p.disabled = true;
                        p.lastTime = moment(new Date).format("YYYY-MM-DD HH:mm");
                    }
                    return p;
                })(this.data.finish)
                this.setData({ finish: items })
            }

            wx.showToast({
                title: '打卡成功',
                icon: 'success',
                duration: 1500
            });

        })
    },

    onDel(e) {
        let habitId = e.currentTarget.dataset.habitid;
        wx.showModal({
            title: '',
            content: '删除后不能恢复，确认删除嘛？',
            confirmText: "确认删除",
            cancelText: "取消",
            success: (res) => {
                if (res.confirm) {
                    habitApi.del(habitId).then(() => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.setData({
                            habits: R.filter(p => p._id != habitId, this.data.habits) 
                        })
                    })
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    }

   
})