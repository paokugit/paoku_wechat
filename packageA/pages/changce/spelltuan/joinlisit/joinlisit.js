var t = getApp(),
  a = t.requirejs("core"),
  b = t.requirejs("wxParse/wxParse"),
  s = t.requirejs("jquery");
var f = getApp();

var util = require('../../../../../utils/util.js');

var useropenid = "";
var goodid = '';
var interval = "";
var timestampcount = "";
var aloneid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
  
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    aloneid = userinfo.id;
    
    goodid = options.id;
  
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
    this.list();
  },

  list:function(){
    var e = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.group_list&comefrom=wxapp',
      data: {
        goods_id: goodid
      },
      success: function (res) {
        console.log(res)
        e.setData({
          show: !0
        });
        if (res.data.error == 0) {
          e.setData({
            list:res.data.data.list
          })
          e.setCountDown();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
      }
    });
  },

  /* 倒计时*/
  setCountDown: function () {
    var t = this;
    let record = t.data.list;

    interval = setInterval(function () {
      var TIME = util.formatTime(new Date());
      var timestamp = Date.parse(new Date());
      timestampcount = timestamp / 1000;

      for (var i = 0; i < record.length; i++) {

        for (var j = 0; j < record[i].userid.length; j++){
          if (record[i].userid[j] == aloneid){
            record[i].gerenid = 1; 
          }else{
            record[i].gerenid = 0; 
          }
        }

        record[i].time = parseInt(record[i].endtime) - parseInt(timestampcount);

        // 总秒数
        var second = record[i].time;

        // 小时位
        var hr = Math.floor((second) / 3600);

        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        // 分钟位
        var min = Math.floor((second - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位
        var sec = second - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        record[i].countDown = hrStr + ':' + minStr + ':' + secStr;

        if (record[i].endtime == timestampcount) {
          record[i].jihao = 1
        } else {
          record[i].jihao = 0
        }
      }
      console.log(record);
      t.setData({
        list: record
      })
    }, 1000);
  },


  selectBtn:function(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      mydata:{
        teamid: e.currentTarget.dataset.teamid,
        xuan: e.currentTarget.dataset.xuan,
        id: goodid
      } 
    })
    wx.navigateBack({
      delta: 1,
    })
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
    clearInterval(interval);
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