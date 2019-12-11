var t = getApp(), a = t.requirejs("core");

var useropenid = "";
Page({
    data: {
        cate: 0,
        page: 1,
        loading: !1,
        loaded: !1,
        list: [],
        approot: t.globalData.approot,
      showIcon: true,
      gloheight: t.globalData.gloheight,
      globalimg: t.globalData.appimg,

      closecenter:1,

      colorA: 'yhj_img_bg2@2x',
      colorB: 'yhj_img_bg_hs1@2x',
      colorC: 'yhj_img_bg_ls1@2x',
      ticketlist: [],
    },
  onLoad: function (options) {
        var userinfo = t.getCache('userinfo');
        useropenid = userinfo.openid;

        this.getList();
    },
    myTab: function(t) {
        var e = this, i = a.pdata(t).cate;
        e.setData({
            cate: i,
            page: 1,
            ticketlist: []
        }), e.getList();
    },
    getList: function() {
        var t = this;
        a.loading();
    
        wx.request({
          url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.personcenter.mycoupon&comefrom=wxapp',
          data: {
            openid: useropenid,
            use: t.data.cate
          },
          success(res) {
            a.hideLoading();
            console.log(res);

            if (res.data.error == 0) {
              t.setData({
                loading: !1,
                total: res.data.data.total,
                ticketlist: res.data.data.list
              })
            } else if (res.data.error == 1) {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          }
        }) 
    },
    onReachBottom: function() {
        // this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    jump: function(t) {
        // var e = a.pdata(t).id;
        // console.log(e);
        // e > 0 && wx.navigateTo({
        //     url: "/pages/sale/coupon/my/detail/index?id=" + e
        // });
      console.log(t.currentTarget.dataset.urlid);
      let index = t.currentTarget.dataset.urlid;
 
      if (index == 0){
        wx.switchTab({
          url: '/pages/index/index',
        })
      }else{
        wx.navigateTo({
          url: '/packageA/pages/changce/merch/detail',
        })
      }
    }
});