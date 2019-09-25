var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var usermobile = ''
var errormessage = ''
var usercode = ''
var code = ''
var message=''
var param=''
var countyid=''
var index=''
var country=''
var usecountyid=44
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        second: 60,
        seconddisp:'none',
        codedisp: 'block',
      showIcon: true,
        country:'',
        index:0
    },
   
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var t = this;
        param=options.param
        s.get("myown.bindmobile.country", {
        }, function (c) {
          console.log(c.message.list)
          t.setData({
            country: c.message.list,
          });
          country = c.message.list
        })
    },
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
       })
      countyid = e.detail.value
      if (countyid == undefined || countyid==''){
        countyid=0;
      }
      usecountyid = country[countyid]['id'];
    },
    inputChange: function(event) {
        var a = this
        usermobile = event.detail.value
    },
    codeChange: function(eve) {
        var a = this
        usercode = eve.detail.value
    },
    getCode: function() {
        var t = this
        s.get("myown/bindmobile/send", {
            mobile: usermobile,
            id: usecountyid
        }, function(e) {
            console.log(e)
            if (e.error == 0) {
                code = e.message.code
                wx.showModal({
                    title: '提示',
                    content: '短信发送成功',
                    success:function(res){
                        if(res.cancel){
                            // 取消
                        }else{
                            countdown(t)
                        }
                    }
                })
            } else {
                errormessage = e.message
                wx.showModal({
                    title: '提示',
                    content: errormessage,
                })
            }
        })
        //倒计时方法
        function countdown(that) {
            var second = t.data.second;
            if (second == 0) {
                // console.log("Time Out...");
                t.setData({
                    // selected: false,
                    // selected1: true,
                    second: 60,
                    seconddisp: 'none',
                    codedisp: 'block'
                });
                return;
            }
            var time = setTimeout(function () {
                that.setData({
                    second: second - 1,
                    seconddisp: 'block',
                    codedisp: 'none'
                });
                countdown(that);
            }, 1000)
        }
    },
    bindPhone: function() {
        console.log(userinfo)
        console.log(usermobile, usercode)
        if (usermobile==""){
            wx.showModal({
                title: '提示',
                content: '请输入手机号',
            })
        } else if (usercode==""){
            wx.showModal({
                title: '提示',
                content: '请输入验证码',
            })
        }else if (usercode != code){
            console.log('验证码错误')
            wx.showModal({
                title: '提示',
                content: '验证码错误',
            })
        } else if (usercode == code) {
            console.log('验证码正确')
            // 验证码正确
            s.get("myown/bindmobile/bind", {
                mobile: usermobile,
                openid: userinfo.openid
            }, function (t) {
                console.log(t)
                if (t.error == 0) {
                    message = t.message
                    // wx.showToast({
                    //     title: message,
                    //     success:function(){
                    //         wx.switchTab({
                    //             url: '/pages/member/index/index',
                    //         })
                    //     }
                    // })
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function (res) {
                            if (res.cancel) {
                                // 点击取消
                            } else {
                                // 点击确定
                                if (param == 1) {
                                    console.log('首页')
                                    wx.switchTab({
                                        url: '/pages/index/index',
                                    })
                                } else if (param == 2) {
                                    console.log('我的')
                                    wx.switchTab({
                                        url: '/pages/member/index/index',
                                    })
                                } else if (param == 3) {
                                    console.log('认证资料')
                                    wx.navigateTo({
                                        url: '/packageA/pages/contribute/contribute/contribute',
                                    })
                                }
                            }
                        }
                    })
                } else {
                    message = t.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                    })
                }

            })
        }


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
    onShareAppMessage: function() {

    }
})