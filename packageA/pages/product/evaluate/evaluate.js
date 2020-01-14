var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();

var useropenid = "";

var goodsid = '';
var attribute = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    loading: !0,
    type: 0,
    page: 1,
    pagetotal:1,
    list: '',
    isFold: true,
    isOpen: false,
    isFold: false, // 是否显示'展开' 默认不显示显示

    allevaluate: 0,
    conceal: 0,
    appraise: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    goodsid = options.id;
    if (options.label == undefined) {
      attribute = '';
    } else {
      attribute = options.label;
    }

    let _that = this; // 一定要先存this，避免在回调中设置data时报错

    setTimeout(function () {
      console.log('123');
      let query = wx.createSelectorQuery();
      query.select('.content').boundingClientRect();
      query.exec(function (rect) {
        if (rect[0] === null) {
          return
        } else if (rect[0].height > 100) { // 自定义一个边界高度
          _that.setData({
            isFold: true
          })
        }
      })
    }, 100)
  },
  open() {
    this.setData({
      isOpen: this.data.isOpen ? false : true
    })
  },
  change: function (e) {

    var ide = e.currentTarget.dataset.id;
    var message = this.data.appraise;

    for (var i = 0; i < message.length; i++) {
      if (message[i].id == ide) {
        if (message[i].zan == 0) {
          message[i].zan = 1;
        } else if (message[i].zan == 1) {
          message[i].zan = 0;
        }
      }
    }
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.shop.shop_goods_comment_fav',
      data: {
        token: useropenid,
        id: ide,
        app_type: 2
      },
      success: function (res) {
        console.log(res);
      }
    });
    this.setData({
      appraise: message
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  datalist: function () {
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.comment_list&comefrom=wxapp',
      data: {
        goods_id: goodsid,
        page: t.data.page,
        label: attribute,
        openid: useropenid
      },
      success: function (res) {
        console.log(res);
        if (res.data.error == 0) {
          t.setData({
            show: !0,
            page:res.data.data.page+1,
            pagetotal:res.data.data.pagetotal,
            list: res.data.data,
            appraise: t.data.appraise.concat(res.data.data.list),
            allevaluate: Math.round(parseFloat(res.data.data.rate) / 20)
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.datalist();
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
    var th = this;
    if (th.data.page <= th.data.pagetotal) {
      th.datalist();
    } else {
      th.setData({
        conceal: 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})