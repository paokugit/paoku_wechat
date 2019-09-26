var t = getApp();
var s = t.requirejs("core")
// console.log(t.globalData.appimg)
var refrom = '';
var reurl = '/pages/index/index', mid = '', hlpid = '';

Page({
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
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
    } else if (t.refrom == "sportdiary"){
      reurl = t.reurl
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
    var that=this
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          console.log('未获取个人信息')
          
        } else if (res.authSetting['scope.userInfo']) {
          console.log('已经获取个人信息')
           wx.reLaunch({
            url: reurl
          })

        }
      }
    });

  },
  getUserInfo: function () {
    var t = this
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
          console.log(a)
          if (n.authSetting['scope.userInfo']) {
            console.log("已授权=====")
            //lihanwen
            a && (wx.reLaunch({
              url: reurl
            }));

          } else {
            console.log("未授权=====")
            t.showSettingToast("获取您的头像和昵称更方便了解跑库哦")
          }
         






        }
      });
  },
  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示',
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "去设置",
      confirmColor: "#01d7a1",
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
                wx.getUserInfo({
                  success: function (res) {
                    var userInfo = res.userInfo;
                  }
                })
                console.log('tongyi')
              }
            },
            fail: function (res) {
              
            }
          })
        } else {
          // 取消
          console.log('取消')
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  },

});
