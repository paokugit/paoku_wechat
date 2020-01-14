var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    status: 7, 

    page:1,
    totalpage:1,

    loading: 0,
    orderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    this.setData({
      status: options.status
    })
    this.ajaxlist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  selected: function (t) {
    var m = this;
    var e = a.data(t).type;
    console.log(e);
    
    m.setData({
      status: e,
      orderlist:[],
      show: 0,
      page: 1,
      totalpage: 1
    });
    m.ajaxlist();
  },

  ajaxlist:function(){
    var lm = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.index&comefrom=wxapp',
      data: {
        openid: useropenid,
        page:lm.data.page,
        status: lm.data.status
      },
      success: function (res) {
        console.log(res);
        lm.setData({
          show: !0,
          loading:0
        });
        if (res.data.error == 0) {
          lm.setData({
            orderlist: lm.data.orderlist.concat(res.data.data.list),
            totalpage: res.data.data.pagetotal,
            page:lm.data.page + 1
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

  remindbtn:function(){
    wx.showToast({
      title: '已提醒卖家发货！',
      icon: 'none',
      duration: 2000

    })
  },

  cancelbtn:function(e){
    var ly = this;
    var txt = '';
    if(e.currentTarget.dataset.cancel == 1){
      txt = '取消';
    }else{
      txt = '删除'
    }
    wx.showModal({
      title: '提示',
      content: '确当要'+txt+'吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            mask: true
          })
          wx.request({
            url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.cancel&comefrom=wxapp',
            data: {
              openid: useropenid,
              order_id: e.currentTarget.dataset.orderid,
              cancel: e.currentTarget.dataset.cancel
            },
            success: function (res) {
              console.log(res);
              wx.hideLoading();
              
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              if (res.data.error == 0) {
                ly.setData({
                  orderlist:[],
                  page:1,
                  totalpage:1
                })
                ly.ajaxlist();
              }
            }
          });
        } 
      }
    })
  },

  dial:function(e){
    var merchphone = e.currentTarget.dataset.mobile;
    // var merchphone = '18838043906';
    wx.makePhoneCall({
      phoneNumber: merchphone,
    })
  },

  affirm:function(e){
    var om = this;
    wx.showModal({
      title: '提示',
      content: '确认已收到货了吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            mask: true
          })
          wx.request({
            url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.finish&comefrom=wxapp',
            data:{
              openid:useropenid,
              order_id:e.currentTarget.dataset.id
            },
            success:function(res){
              console.log(res);
              wx.hideLoading();
              if(res.data.error == 0){
                om.setData({
                  page:1,
                  totalpage:1,
                  orderlist:[]
                })
                om.ajaxlist();
              }
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
 
          console.log('用户点击取消')
        }
      }
    })
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var value = wx.getStorageSync('evaluate');
    console.log(value);
    if(value!=''){
      this.setData({
        page:1, 
        totalpage:1,
        orderlist:[],
        show:0
      })
      this.ajaxlist();
      wx.removeStorageSync('evaluate');
    }
    
    
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
    var pl = this;
    console.log(pl.data.page, pl.data.totalpage);
    if (pl.data.page <= pl.data.totalpage){
      pl.setData({
        loading:!0
      })
      pl.ajaxlist();
    }else{
      pl.setData({
        basetxt:'到底了！'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    console.log(ops);
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      return {
        title:'还差' + ops.target.dataset.num + '人，抢'+ ops.target.dataset.money +'元'+ops.target.dataset.name,
        path: '/packageA/pages/changce/spelltuan/state/state?teamid=' + ops.target.dataset.teamid +'&type=1',
        imageUrl: ops.target.dataset.img
      }
    }
  }
})