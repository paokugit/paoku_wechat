// pages/playmethod/playmethod/playmethod.js
var t = getApp(),
    a = t.requirejs("core");
// console.log(t.globalData.appimg)
var useropenid = ""
var problem = "",
    faulttime = "",
    thumbs = "",
    phonenum = ""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedSrc: "icox icox-xing selected",
        key: -1,
        content: "",
        images: [],
        imgs: [],
        globalimg: t.globalData.appimg,
      showIcon: true,
        index: 0,
        date: '',
        dateDis: 'block',
        inputtext: ''
    },

    onLoad: function(a) {
        var userinfo = t.getCache('userinfo');
        console.log(userinfo)
        useropenid = userinfo.openid
        this.setData({
            options: a
        }), t.url(a);
    }, 
    upload: function(t) {
        var e = this,
            s = a.data(t),
            i = s.type, 
            o = e.data.images,
            n = e.data.imgs,
            r = s.index;
        "image" == i ? a.upload(function(t) {
            o.push(t.filename), n.push(t.url), e.setData({
                images: o,
                imgs: n
            });
        }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1), e.setData({
            images: o,
            imgs: n
        })) : "image-preview" == i && wx.previewImage({
            current: n[r],
            urls: n
        });
        console.log(n)
        thumbs = n
        console.log(thumbs)
    },
    inputchange: function(event) {
        var that = this
        that.setData({
            inputtext: event.detail.value
        })
        problem = event.detail.value
        // console.log(event.detail.value)
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            dateDis: 'none',
            date: e.detail.value
        })
        faulttime = e.detail.value
    },
    phonechange: function(eve) {
        // console.log(eve.detail.value)
        phonenum = eve.detail.value
    },
    submitbtn: function() {
        console.log(problem, faulttime, thumbs, phonenum)
        if (problem == "") {
            wx.showModal({
                title: '提示',
                content: '请输入您的问题',
            })
        } else {
            if (faulttime == "") {
                wx.showModal({
                    title: '提示',
                    content: '请输入故障时间',
                })
            } else {
                a.get("myown/novice/question", {
                    openid: useropenid,
                    content: problem,
                    mobile: phonenum,
                    time: faulttime,
                    img: thumbs
                }, function(e) {
                    console.log(e)
                    if (e.error == 0) {
                        wx.showModal({
                            title: '提示',
                            content: e.message,
                            success: function(res) {
                                if (res.cancel) {
                                    // 取消
                                }else{
                                    wx.navigateBack();
                                }
                            }
                        })
                    }
                });
            }
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
        // this.videoContext = wx.createVideoContext('myvideo', this);
        // this.videoContext.requestFullScreen({ direction: 90 });
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