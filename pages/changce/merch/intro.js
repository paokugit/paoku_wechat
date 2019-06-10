var t = getApp(),
  s = t.requirejs("wxParse/wxParse"),
  a = t.requirejs("core");
Page({
  data: {
    merchid: 0,
    loading: false,
    loaded: false,
    merch: [],
    approot: t.globalData.approot
  },
  onLoad: function (t) {
    this.setData({
      merchid: t.id
    }),
    this.getIntro()
  },
  getIntro: function () {
    var t = this;
    a.get("changce/merch/intro", { id: t.data.merchid}, function (a) {
      var markers = [];
      if (a.merch.lat) markers = [{
        latitude: a.merch.lat,
        longitude: a.merch.lng,
        name: a.merch.merchname,
        desc: a.merch.address
      }] 
      t.setData({
        merch: a.merch,
        markers: markers
      });
      s.wxParse("wxParseData", "html", a.merch.desc, t, "0");
    })
  },
  callme: function (t) {
    wx.makePhoneCall({
      phoneNumber: t.target.id
    })
  },
  jump: function (t) {
    var e = a.pdata(t).id;
    e > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + e
    })
  },
  daohang:function () {
    var lanlng=this.data.markers[0];
    console.log(lanlng);
    const latitude = lanlng.latitude
    const longitude = lanlng.longitude
    wx.openLocation({
      latitude,
      longitude,
      name:lanlng.name,
      address:lanlng.desc,
      scale: 18
    })
  }
})