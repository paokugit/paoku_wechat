var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var num = ''
var reurl = ""
var useropenid = ""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sportDis:'block',
        exchangeDis:'none',
        url: '',
        globalimg: i.globalData.appimg,
        showIcon: true,
        gloheight: i.globalData.gloheight,

        num:'',
        exurl:''
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userinfo = f.getCache('userinfo');
    console.log(userinfo)
    useropenid = userinfo.openid
    console.log(options)
  },
  exchange: function() {
    var a = this
    a.setData({
      exchangeDis: 'block',
      sportDis: 'none',

    })

    s.get("myown/sport/sports_poster", {
      openid: useropenid,
      num: num
    }, function(eve) {
      console.log(eve)
      num = eve.message.num
      a.setData({
        url: eve.message.url
      })
    })
  },
  downloadImage: function(imageUrl) {
    wx.downloadFile({
      url: imageUrl,
      success: function(res) {
        console.log("下载文件：success");
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log("保存图片：success");
            wx.showToast({
              title: '保存成功',
            });
          },
          fail(res) {
            console.log("保存图片：fail");
            console.log(res);
          }
        })
      },
      fail: function(res) {
        console.log("下载文件：fail");
        console.log(res);
      }
    })
  },
  onSavePicClick: function(e) {
    var that = this;
    console.log("onSavePicClick");
    console.log(e);
    var downloadUrl = e.currentTarget.dataset.img;
    console.log("downloadUrl=" + downloadUrl);

    if (!wx.saveImageToPhotosAlbum) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
      return;
    }
    wx.getSetting({
      success(res) {
        console.log("getSetting: success");
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log("没有授权");
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log("授权");
              that.downloadImage(downloadUrl);
            },
            fail() {
              console.log("2-授权《保存图片》权限失败");
              wx.openSetting({
                success: function(data) {
                  console.log("openSetting: success");
                },
                fail: function(data) {
                  console.log("openSetting: fail");
                }
              });
            }
          })
        } else {
          console.log("1-已经授权《保存图片》权限");
          that.downloadImage(downloadUrl)
        }
      },
      fail(res) {
        console.log("getSetting: fail");
        console.log(res);
      }

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
    var t=this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          s.get("myown/sport/sports_poster", {
            openid: useropenid,
            num: ""
          }, function (e) {
            console.log(e)
            num = e.message.num
            t.setData({
              url: e.message.url,
              num: e.message.num
            })
          })
        } else {
          console.log("未授权====")
          reurl = '/packageA/pages/sportdiary/sportdiary/sportdiary'
          wx.redirectTo({
            url: "/pages/message/auth/index?refrom=sportdiary&reurl=" + reurl
          })
        }

      }
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    // return s.onShareAppMessage();
    var that = this;
    return {
      title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
      path: '/pages/index/index?scene=' + useropenid,
      success: function(res) {
        // 转发成功
        that.shareClick();
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})