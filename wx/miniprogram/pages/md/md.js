// pages/md/md.js

const configApi = require('../../api/configApi.js');  
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    var key = options.key || "md_1";
    this.setData({key});
    
    configApi.get(key).then(res => {
      console.log(res.result);
      let config = res.result || {};

      wx.setNavigationBarTitle({
        title: config.desc || "..."
      })

      //微信开发者工具云数据库不支持换行字符录入，暂时使用\n代替换行
      let article = app.towxml.toJson(
        (config.value || "").replace(/\-/g, "\n-").replace(/\\n/g, "\n"),               // `markdown`或`html`文本内容
        'markdown'              // `markdown`或`html`
      );
      this.setData({article})
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})