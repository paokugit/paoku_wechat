// pages/lottery/lottery.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();
var useropenid = ''
const app = getApp()
//计数器
var interval = null;
//值越大旋转时间越长  即旋转速度
var intime = 50;
var userid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    mask: 0,
    images: [
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
      'https://www.paokucoin.com/img/backgroup/kongquan.png',
    ], //奖品图片数组
    gratis: 0,
    zhekounum: '',
    shownum: '',
    nickname: '',
    shownum: '',
    msgList: '',
    datanum: '',
    shuzhi: '',
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    btnconfirm: 'https://www.paokucoin.com/img/backgroup/start.png',
    //点击事件
    clickLuck: 'clickLuck',
    //中奖位置
    luckPosition: 0,
    blocknum: [],
    kaluliyu: 0,
    lsdas: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("页面加载")
    this.loadAnimation();
    var _that = this
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    userid = userinfo.id
    console.log(useropenid, userid)
    //调用接口
    a.get("game.reward", {
      openid: useropenid,
      type: 2
    }, function(e) {
      _that.setData({
        gratis: e.result.num, //免费抽
        msgList: e.result.log, //头部交替悬浮文字
        blocknum: e.result.list, //图片上显示得折扣
        kaluliyu: e.result.credit1
      })
    })
  },
  //点击抽奖按钮
  clickLuck: function(h) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    var _that = this
    var loc = ''
    console.log()
    if (h.currentTarget.dataset.gratis == 0) {
      if (h.currentTarget.dataset.zhi >= 5) {
        a.get("game.getprize", {
          money: 5,
          openid: useropenid,
          type: 0,
        }, function(e) {
          loc = e.result.location
          if (e.result.remain > 0) {
            _that.setData({
              zhekounum: e.result.num,
              gratis: e.result.remain,
              kaluliyu: e.result.credit1,
              lsdas: 1,
              mask: 2,
            })
          } else {
            _that.setData({
              zhekounum: e.result.num,
              gratis: e.result.remain,
              kaluliyu: e.result.credit1,
            })
          }

        })
      } else {
        wx: wx.showModal({
          title: '卡路里余额不足',
          content: '小主的卡路里不足啦，赶快邀请好友助力获取卡路里吧',
          showCancel: true,
          confirmText: '去助力',
          success: function(res) {
            if (res.cancel) {

            } else if (res.confirm) {
              wx.navigateTo({
                url: '/packageA/pages/helphand/friendhelp/friendhelp',
              })
            }
          },
        })
      }
    } else {
      a.get("game.getprize", {
        money: 0,
        openid: useropenid,
        type: 2,
      }, function(e) {
        loc = e.result.location
        _that.setData({
          zhekounum: e.result.num,
          gratis: e.result.remain
        })
      })
    }

    var e = this;
    //判断中奖位置格式
    if (e.data.luckPosition == null || isNaN(e.data.luckPosition) || e.data.luckPosition > 7) {
      wx.showModal({
        title: '提示',
        content: '请填写正确数值',
        showCancel: false,
      })
      return;
    }
    //设置按钮不可点击
    e.setData({
      btnconfirm: 'https://www.paokucoin.com/img/backgroup/start.png',
      clickLuck: '',
    })
    //清空计时器
    clearInterval(interval);
    var index = 0;
    console.log(e.data.color[0]);
    //循环设置每一项的透明度
    interval = setInterval(function() {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, intime);

    //模拟网络请求时间  设为两秒
    var stoptime = 2000;
    setTimeout(function() {
      e.stop(loc);
    }, stoptime)
  },
  stop: function(which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    e.stopLuck(which, index, intime, 10);
  },


  stopLuck: function(which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function() {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function() {
          e.setData({
            mask: 1,
            clickLuck: 'clickLuck'
          })
          e.loadAnimation();
        }, 1000);
      }
    }, time);
  },
  //进入页面时缓慢切换
  loadAnimation: function() {
    var e = this;
    var index = 0;
    // if (interval == null){
    interval = setInterval(function() {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, 1000);
  },

  closemask: function() {
    this.setData({
      mask: 0,
    })
  },
  buttonmask: function() {
    this.setData({
      mask: '0',
      lsdas: '0'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },
  rulemask: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    // return s.onShareAppMessage();
    var that = this;
    that.setData({
      mask: 0
    })
    return {
      title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
      path: '/pages/index/index?scene=' + userid,
      imageUrl: "https://www.paokucoin.com/img/backgroup/lottary.png",
      success: function(res) {
        // 转发成功
        that.shareClick();
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
}, )