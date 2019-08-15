var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url: '',
        globalimg: i.globalData.appimg,
        nvabarData: {
            showCapsule: 1, 
            title: '邀请海报',
            height: i.globalData.height * 2 + 30,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var t=this
        var u = {}; u.mid = userinfo.id;
        i.url(u),
        s.get("goods/poster/gethelpimage", {
            openid: userinfo.openid,
            mid: userinfo.id,
            mids: userinfo.id,
       }, function (e) {
            console.log(e)
           t.setData({
              url:e.url
            })

        })
        

    },
    downloadImage: function (imageUrl) {
        wx.downloadFile({
            url: imageUrl,
            success: function (res) {
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
            fail: function (res) {
                console.log("下载文件：fail");
                console.log(res);
            }
        })
    },
    onSavePicClick: function (e) {
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
                    console.log("1-没有授权《保存图片》权限");
                    // 接口调用询问  
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            console.log("2-授权《保存图片》权限成功");
                            that.downloadImage(downloadUrl);
                        },
                        fail() {
                            // 用户拒绝了授权  
                            console.log("2-授权《保存图片》权限失败");
                            // 打开设置页面  
                            wx.openSetting({
                                success: function (data) {
                                    console.log("openSetting: success");
                                },
                                fail: function (data) {
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
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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