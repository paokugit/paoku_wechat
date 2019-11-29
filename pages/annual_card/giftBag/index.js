var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
var addressId = '';
var recordId = '';
var productId = '';
Page({
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    goods_list:[],
    isShow: false,
    titMessage: '',
    siteList:[],
    btnNum:0,
    postage: 0,
    rental: 0,

    levelStatus:''
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    recordId = options.recordId;

    var m = this;
    m.list();
  },

  list:function(){
    var b = this;
    a.get("member.level.goods_list", {
      openid: b.data.useropenid,
      level_id: 5
    }, function (e) {
      console.log(e);
      if(e.status == 1){
        b.setData({
          levelStatus: e.result.get == 1 ? '已领取' : '免费领取',
          goods_list: e.result.goods
        })
      }else if(e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  btnGet: function (e) {
    productId = e.currentTarget.dataset.productid;
    
    var m = this;
    a.get("member.level.address_list", {
      openid: useropenid
    }, function (e) {
      if (e.status == -1) {
        m.setData({
          titMessage: e.result.message,
          isShow: true,
          siteList: []
        })
      } else if(e.status == 1){
        let price = e.result.data.price;
        addressId = e.result.list[0].id;
        m.setData({
          siteList: e.result.list,
          postage: e.result.data.is_remote == 0 ? price : price + '（偏远）',
          rental: price,
          isShow: true,
          titMessage: ''
        })
      } else if (e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },

  cancelBtn: function (e) {
    this.setData({
      isShow: false,
      btnNum: 0
    })
  },

  clickNum: function (e) {
    addressId = e.currentTarget.dataset.address;
    let btnNum = e.currentTarget.dataset.id;
    let m = this;
    a.get("member.level.change", {
      openid: useropenid,
      address_id: addressId
    }, function (e) {
      console.log(e);
      if (e.status == 1){
        let price = e.result.data.price;
        m.setData({
          btnNum: btnNum,
          postage: e.result.data.is_remote == 0 ? price : price + '(偏远)',
          rental: price
        })
      } else if (e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  site_skip: function () {
    wx.navigateTo({
      url: '/pages/member/address/index'
    })
    this.setData({
      isShow: false,
      btnNum: 0
    })
  },

  site_ok: function (e) {
    var m = this;
    var order = '';
    a.get("member.level.get", {
      openid: useropenid,
      level_id: 5,
      address_id: addressId,
      record_id: recordId,
      money: m.data.rental,
      goods_id: productId
    }, function (e) {
      console.log(e);

      if(e.status == 2){
        m.setData({
          isShow: false
        });
        wx.showToast({
          title: '领取成功,请耐心等待',
          icon: 'none',
          dufailration: 1000
        });
        m.list();
      } else if (e.status == 1){
        wx.requestPayment({
          timeStamp: e.result.timeStamp,
          nonceStr: e.result.nonceStr,
          package: e.result.package,
          signType: e.result.signType,
          paySign: e.result.paySign,
          success(res) {
            m.setData({
              isShow:false
            })
            wx.showToast({
              title: '领取成功,请耐心等待',
              icon: 'none',
              dufailration: 1000
            });
            m.list();
          },
          fail(res) {
            a.get("member.level.cancel", { 
              openid: useropenid,
              order_id: order
            },function(e){
              console.log(e);
            })
          }
        })
      }
    })
  },
  
  onShow: function () {
    var m = this;
    m.list();
  },
})