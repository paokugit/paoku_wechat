var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var team_id = "";

var util = require('../../../../../utils/util.js');
var interval = "";
var timestampcount = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    statelist: '',
    amount: 1, //购买量
    standard: [],
    boxarr: [],
    ball: 1,
    choice: 0,
    single: 0,
    chooseList: [],
    specsTitle: '',
    specs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    team_id = options.teamid;

    this.datalist();
  },

  datalist: function () {
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.team.team_detail&comefrom=wxapp',
      data: {
        openid: useropenid,
        team_id: team_id
      },
      success: function (res) {
        console.log(res);
        if (res.data.error == 0) {
          t.setData({
            show: !0,
            statelist: res.data.data
          });
          if(res.data.data.success == 0){
            t.setCountDown();
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },

  /* 倒计时*/
  setCountDown: function () {
    var t = this;
    let record = t.data.statelist;

    interval = setInterval(function () {
      var TIME = util.formatTime(new Date());
      var timestamp = Date.parse(new Date());
      timestampcount = timestamp / 1000;

      record.time = parseInt(record.endtime) - parseInt(timestampcount);

      // 总秒数
      var second = record.time;

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

      record.hrStr = hrStr;
      record.minStr = minStr;
      record.secStr = secStr;

      console.log(123);
      t.setData({
        statelist: record
      })
    }, 1000);
  },

  // 参团规格弹窗
  spelljoin: function (e) {
    var s = this;
    wx.showLoading({
      mask: true
    });
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.option&comefrom=wxapp',
      data: {
        goods_id: e.currentTarget.dataset.goodsid,
        single: s.data.single
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.error == 0) {
          s.setData({
            standard: res.data.data,
            boxarr: res.data.data.options,
            ball: 0
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },

  // 关闭规格窗
  emptyActive: function (e) {
    this.setData({
      ball: 1
    })
  },

  // 选择规格
  selectGuige: function (e) {
    let that = this,

      idx = e.currentTarget.dataset.idx, // 获取第一个循环的index

      selectId = e.currentTarget.dataset.id, // 获取当前点击的id

      selectName = e.currentTarget.dataset.title; // 获取当前点击的规格名称

    var l = that.data.boxarr; //获取规格数据

    var outer = that.data.specs; //选择规格的数组

    var arrid = [];
    var s = "",
      d = "",
      i = [];
    outer[idx] = {
      id: selectId,
      title: selectName
    };
    outer.forEach(function (t) {
      s += t.title + ";", i.push(t.id);
    });

    for (var i = 0; i < outer.length; i++) {
      arrid.push(outer[i].id)
    }
    d = arrid.join("_");

    "" != e.currentTarget.dataset.thumb && that.setData({
      "standard.goods.thumb": e.currentTarget.dataset.thumb
    });
    l.forEach(function (t) {
      t.specs == d && (that.setData({
        optionid: t.id,
        "standard.goods.total": t.stock,
        "standard.goods.minprice": t.marketprice
      }));
    })

    that.setData({
      chooseList: outer,
      specsTitle: s
    });
  },

  // 跳转订单确认页
  spellbuy: function (e) {
    var t = this;
    var goodid = e.currentTarget.dataset.goodid;
    console.log(t.data.optionid, goodid, t.data.single, t.data.amount, team_id);
    // optionid：规格id。goodid：商品id。single：0拼团。amount：购买量。team_id：参团id

    if(e.currentTarget.dataset.morespec==1){
      if (t.data.optionid <= 0){
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.redirectTo({
          url: '/packageA/pages/changce/spelltuan/affirm/affirm?optionid=' + t.data.optionid + '&goodsid=' + goodid + '&single=' + t.data.single + '&amount=' + t.data.amount + "&team_id=" + team_id +"&morespec="+e.currentTarget.dataset.morespec,
        })
      }
    }else{
      wx.redirectTo({
        url: '/packageA/pages/changce/spelltuan/affirm/affirm?optionid=' + t.data.optionid + '&goodsid=' + goodid + '&single=' + t.data.single + '&amount=' + t.data.amount + "&team_id=" + team_id +"&morespec="+e.currentTarget.dataset.morespec,
      })
    }
  },

  indentBtn:function(){
    wx.navigateBack({
      delta: 1
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
    clearInterval(interval);
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
  onShareAppMessage: function (ops) {
    console.log(ops);
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '还差' + ops.target.dataset.num + '人，抢'+ ops.target.dataset.money +'元'+ops.target.dataset.name,
        path: '/packageA/pages/changce/spelltuan/state/state?teamid=' + ops.target.dataset.teamid,
        imageUrl: ops.target.dataset.img
      }
    }
  }
})