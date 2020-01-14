var t = getApp(),
  a = t.requirejs("core"),
  b = t.requirejs("wxParse/wxParse"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";

var optionid = 0;//规格id
var goodsid = 0;//商品id
var ipid = 0;//收货地址id
var team_id = '';//团队id
var remark = '';//备注
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    sitelist:{},
    optionlist:{},
    goodslist:{},
    realitypay:0,
    single: 0,//0拼团，1单购
    quantity:1,//购买数量
    morespec:1,//是否多规格，0无，1有
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this;

    console.log(options);
    optionid = options.optionid;
    goodsid = options.goodsid;
    team_id = options.team_id;
    m.setData({
      single: options.single,
      quantity: options.amount,
      morespec:options.morespec
    })

    m.goods();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goods:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.team.comfirm_order&comefrom=wxapp',
      data: {
        openid: useropenid,
        goods_id: goodsid,
        optionid: optionid
      },
      success: function (res) {
        console.log(res);
        t.setData({
          show: !0
        });
        if(res.data.error == 0){
          var price = 0;
          if(t.data.morespec == 1){
            if (t.data.single == 0){
              price = res.data.data.option.price;
            }else{
              price = res.data.data.option.single_price;
            }
          }else{
            if (t.data.single == 0){
              price = res.data.data.groupsprice;
            }else{
              price = res.data.data.singleprice;
            }
          }
          ipid = res.data.data.address.id;
          t.setData({
            sitelist: res.data.data.address,
            optionlist: res.data.data.option,
            goodslist:res.data.data,
            realitypay: parseFloat(price) + parseFloat(res.data.data.freight)
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
      }
    });
  },

  dataChange: function (e) {
    console.log(e.detail.value);
    remark = e.detail.value;
  },

  btnpay:function(){
    var t = this;
    console.log(goodsid, t.data.single, optionid, ipid, t.data.quantity, team_id, remark);
    wx.navigateTo({
      url: '/packageA/pages/changce/spelltuan/alipay/alipay?goodid=' + goodsid + '&single=' + t.data.single + '&option_id=' + optionid + '&addressid=' + ipid + '&total=' + t.data.quantity + '&team_id=' + team_id + '&remark=' + remark
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _that = this;

    var r = t.getCache("orderAddress");
    if(r != ''){
      ipid = r.id;
      _that.setData({
        sitelist:r
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})