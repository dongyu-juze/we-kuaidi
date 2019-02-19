//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    inputCon: {},
    errTip: ''
  },
  //事件处理
  bindViewTap:function () {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  bindChange: function (e) {
    var id;
    var value;
    id = e.target.id;
    value = e.detail.value + '';
    this.data.inputCon[id] = value;
  },
  query: function () {
    var that = this;
    var type = that.data.inputCon.company;
    var postid = that.data.inputCon.orderId;
    var data = {
      'type': type,
      'postid': postid
    }
    app.globalData.queryInfo.push(data);

    console.log(app);

    wx.request({
      url: 'https://www.kuaidi100.com/query',
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        // var orderInfo = res.data.data;
        // app.globalData.orderInfo = orderInfo;
        // wx.navigateTo({
        //   url: '../order/order',
        // })
        var errTip = res.data.message;
        var orderInfo = res.data.data;
        if(orderInfo.length == 0){
          that.setData({
            errTip: errTip
          })
          return;         
        }
        that.setData({
          errTip: ''
        })
        app.globalData.orderInfo=orderInfo;
        wx.navigateTo({
          url: '../order/order'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        // hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: function (res) {
          var that = this;
          app.globaData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo
          })
          // 最后，在page中定义一个 用于检测 当前授权的状态
          // that.checkSettingStatus();
        }
      })
    }
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
