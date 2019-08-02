var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var merchid=''
var useropenid=''
var timestamp = ''
var noncestr = ''
var pack = ''
var signtype = ''
var paysign = ''
var own=''
var agentlevel=""
var conbind=''
var creditnum=""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 0, 
            title: '折扣付', 
            height: i.globalData.height * 2 + 30,
        },
        credit: '',
        conbind: '',
        credit4: '',
        tixian:'',
        len: '',
        animation: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var t=this
        var userinfo = f.getCache('userinfo');
        console.log(userinfo)
        useropenid = userinfo.openid
        own = userinfo.is_own
        agentlevel = userinfo.agentlevel
        if(userinfo.merchInfo==undefined || userinfo.merchInfo==false){
            merchid=undefined
        }else{
            merchid=userinfo.merchInfo.id
        }
        
    },
    withdrawbtn: function () {
        console.log(conbind)
        if (conbind == 0) {
            wx.showModal({
                title: '提示',
                content: '您还未开通贡献值',
            })
        } else if (conbind == 1) {
            wx.navigateTo({
                url: '/pages/contribute/withdraw/withdraw',
            })
        }
    },
    transferbtn: function () {
        wx.navigateTo({
            url: '/pages/discount/transfer/transfer',
        })
    },
    rechargebtn: function () {
        wx.navigateTo({
            url: '/pages/discount/zkbrechange/zkbrechange',
        })
    },
    getScancode: function() {
        var _this = this;
        wx.scanCode({
            success: (res) => {
                console.log(res.path)
                wx.navigateTo({
                    url: '/' + res.path,
                })
            }
        })

    },
    accountbtn: function() {
        wx.navigateTo({
            url: '/pages/discount/zkbaccount/zkbaccount',
        })
    },
    codebtn: function() {
        if (merchid==undefined) {
            console.log(agentlevel)
            if (agentlevel == 0 || agentlevel==1){
                wx.showModal({
                    title: '提示',
                    content: '成为星选达人或店主即可开通',
                    showCancel: true, 
                    cancelText: "知道了", 
                    confirmText: "去开通", 
                    success: function (res) {
                        if (res.cancel) {
                            console.log("取消")
                        } else if (res.confirm) {
                            //点击确定
                            console.log("确定")
                            wx.switchTab({
                                url: '/pages/exclusive/exclusive',
                            })
                        }
                    }
                })
            } else if (agentlevel==2){
                wx.navigateTo({
                    url: '/pages/discount/merchcode/merchcode',
                })
            } else if (agentlevel == 5){
                wx.navigateTo({
                    url: '/pages/discount/merchcode/merchcode',
                })
            }
            
        }else{
            wx.navigateTo({
                url: '/pages/discount/merchcode/merchcode',
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
        var a = this
        s.get("payment/index/getCredit", {
            openid: useropenid
        }, function (e) {
            console.log(e)
            a.setData({
                credit: e.result.credit3
            })
        })
        s.get("myown/devote/msg", {
            openid: useropenid,
        }, function (e) {
            console.log(e)
            if (e.error == 0) {
                conbind = e.message.bind
                creditnum = e.message.credit4
                // a.show_num(creditnum)
                a.setData({
                    conbind: e.message.bind,
                    credit4: e.message.credit4,
                    tixian: e.message.tixian
                })
            }
        })
    },
    // show_num(n) {
    //     var len = String(n).length;
    //     this.setData({
    //         len: len,
    //     })
    //     var char = String(n).split("")
    //     // h存储数字块高度
    //     var h = ''
    //     let self = this
    //     // 创造节点选择器
    //     wx.createSelectorQuery().select('.unit-num').boundingClientRect(function (rect) {
    //         h = rect.height
    //         var animate = []
    //         for (var i = 0; i < len; i++) {
    //             animate[i] = wx.createAnimation()
    //             animate[i].top(-parseInt(h) * char[i]).step({
    //                 duration: 1500
    //             })
    //             var deletedtodo = 'animation[' + i + ']';
    //             self.setData({
    //                 [deletedtodo]: animate[i].export()
    //             })
    //         }
    //     }).exec()
    // },

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
        wx.showToast({
            icon: 'loading',
            title:'玩命加载中'
        })
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