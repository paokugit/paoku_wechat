var t = getApp();
var s = t.requirejs("core")
// console.log(t.globalData.appimg)
var refrom = '';
var reurl = '/pages/index/index', mid = '', hlpid = '';

Page({
  data: {
    globalimg: t.globalData.appimg,
    close: 0,
    text: ""
  },
  onLoad: function (t) {
    console.log(t)
    mid = t.mid
    if (t.refrom == 'goods') {
      reurl = t.reurl + '?id=' + t.id + '&mid=' + mid;
    } else if (t.refrom =='helpshare') {
      refrom = t.refrom;
      hlpid = t.hlpid;
      mid = t.mid;
      reurl = t.reurl + '?hlpid=' + hlpid + '&mid=' + mid;

    } else if (t.refrom=="gift"){
      refrom = t.refrom;
      reurl = t.reurl + '?mid=' + mid;
    }

    console.log('yaya')
    console.log(reurl);
    console.log(t), console.log('yayaya'), this.setData({
      close: t.close,
      text: t.text
    });
    console.log(reurl);
  },
  onShow: function () {
    var e = t.getCache("sysset").shopname;
    wx.setNavigationBarTitle({
      title: e || "提示"
    });
  },
  bind: function () {
    var t = this, e = setInterval(function () {
      console.log(reurl);
      wx.getSetting({
        success: function (n) {
          console.log(n);
          var a = n.authSetting["scope.userInfo"];
          var f = getApp();
          var userinfo = f.getCache('userinfo');
          console.log(userinfo)
          //lihanwen
          if (userinfo.nickname == '' || userinfo.avatarUrl == '') {
            wx.login({
              success: function (a) {
                a.code ? s.post("wxapp.login", {
                  code: a.code
                }, function (a) {
                  console.log(a)
                  wx.getUserInfo({
                    success: function (info) {
                      console.log(info);
                      console.log(a.session_key);
                      s.get("wxapp/auth", {
                        data: info.encryptedData,
                        iv: info.iv,
                        sessionKey: a.session_key
                      })
                      //n.setCache("userinfo", i.userInfo, expiration)
                    }
                  });
                }) : s.alert("获取用户登录态失败:" + a.errMsg);

              }
            })

          }
          //lihanwen
          a && (wx.reLaunch({
            url: reurl
          }), clearInterval(e), t.setData({
            userInfo: a
          }));






        }
      });
    }, 1e3);
  }

});
