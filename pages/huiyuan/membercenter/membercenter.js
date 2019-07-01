var a, e, i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"),
    r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), c = (i.requirejs("foxui"),
        i.requirejs("jquery"));
        var levelid=''
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
            title: '达人中心', //导航栏 中间的标题
            // 此页面 页面内容距最顶部的距离
            height: i.globalData.height * 2 + 20,
        },
        color:'green',
        nickName: '',
        avatarUrl: '',
        loaded: !1,
        loading: !0,
        speeddone:'none',
        speeding:'block',
        dateDis:'block',
        avatar:'',
        levelid:'',
        endtime:'',
        levelname:'',
        leveltime:'',
        addspead:"",
        surplus_day:"",
        give_day:"",
        accelerate_day:"",
        levelinfo:'',
        imglist:[
            {
                imgurl: '/icon1/sport-n.png',
                hoverurl:'/icon1/sport-s.png'
            },
            {
                imgurl: '/icon1/home-n.png',
                hoverurl: '/icon1/home-s.png'
            },
            {
                imgurl: '/icon1/shop-n.png',
                hoverurl: '/icon1/shop-s.png'
            },
            {
                imgurl: '/icon1/huiyuan-n.png',
                hoverurl: '/icon1/huiyuan-s.png'
            },
            {
                imgurl: '/icon1/user-n.png',
                hoverurl: '/icon1/user-s.png'
            },
        ],
        imgHoverIndex: '',
        arr01: [
            {
                img: 'https://paokucoin.com/img/backgroup/qiandao.png',
            },
            // {
            //     img: 'https://paokucoin.com/img/backgroup/zhuce.png',
            // },
            // {
            //     img: 'https://paokucoin.com/img/backgroup/ziliao.png',
            // },
            {
                img: 'https://paokucoin.com/img/backgroup/sharehaibao.png',
            },
            ]
    },
    shengji:function(){
        wx.navigateTo({
            url: '../hygrade/hygrade?hyid=' + levelid,
        })
    },
// 邀请好友
    invite:function(){
        wx.navigateTo({
        url: '../../commission/down/index',
})
    }, 
    hbshare:function(){
        wx.navigateTo({
            url: '/pages/sportdiary/sportdiary/sportdiary',
        })
    },
    zlBtn:function(){
        wx.showToast({
            title: '暂未开放',
            duration:2000
        })
    },
    sportBtn:function(e){
        console.log(e)
        // this.setData({
        //     imgHoverIndex: e.currentTarget.dataset.index
        // })
        wx.switchTab({
            url: '../../index/index',
        })
    },
    shopBtn: function () {
        wx.switchTab({
            url: '../../index/huodong',
        })
    },
    carBtn: function () {
        wx.switchTab({
          url: '/pages/discount/discount/discount',
        })
    },
    userBtn: function () {
        wx.switchTab({
            url: '../../member/index/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var i=this
        // let open = wx.getStorageSync('openid')
        s.get("member", {
            openid: userinfo.openid
        }, function (e){
            console.log(e)
            levelid = e.levelid
        i.setData({
            nickname: e.nickname,
            avatar: e.avatar,
            levelid: e.levelid,
            endtime: e.endtime,
            levelname: e.levelname,
            leveltime: e.leveltime,
            levelinfo: e.levelinfo
        })
        })
        let myUserInfo = wx.getStorageSync('myUserInfo');
        this.setData({
            nickName: myUserInfo.nickName,
            avatarUrl: myUserInfo.avatarUrl
        })
        var ttt=this
        s.get("myown/index/accelerate", {
            openid: userinfo.openid
        },function(eve){
            console.log(eve)
            if (eve.message.surplus_day == 0) {
               ttt.setData({
                    speeding: 'none',
                    speeddone: 'block'
                })
            } else {
               ttt.setData({
                    speeding: 'block',
                    speeddone: 'none'
                })
            }
            ttt.setData({
                credit: eve.message.credit,
                surplus_day: eve.message.surplus_day,
                give_day: eve.message.give_day,
                accelerate_day: eve.message.accelerate_day,
                addspead: (eve.message.accelerate_day) / (eve.message.accelerate_day + eve.message.surplus_day) * 100
            })
        } )
       
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
    onShareAppMessage: function (res) {
        // return s.onShareAppMessage();
        var that = this;
        return {
            title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
            path: '/pages/index/index?id=' + that.data.scratchId,
            success: function (res) {
                // 转发成功

                that.shareClick();
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})