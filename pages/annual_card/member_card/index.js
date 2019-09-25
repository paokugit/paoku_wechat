// pages/annual_card/member_card/index.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();  
 
var imgSrc = "";
var useropenid = "";
var recordId = '';
Page({

  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    nickname:'', 
    timeExpire:'',
    memberTit: '',
    goodsList:[],
    levelImg:'',
    levelPrice:'',
    levelMonth:'',
    levelTime:'',
    couponList:[],
    siteList:[],
    levelStatus:'',
    levelList:[],
    levelCode:'',
    
    cardName:'',
    cardOpen: '',
    is_expire: '',
    cardExpire: '',
    cardTit:'',
    headImg:'',

    btnNum:'',
    nowPage: "firstPage",
    nowIndex: 0,

    postage:0,
    rental:0,

    titMessage:'',
    tabBar: [
      {
        "iconClass":"home@2x.png",
        "imgSrc":"home03.png",
        "text": "年卡中心",
        "tapFunction": "toFirst",
        "active": "active"
      },
      {
        "iconClass": "nianka@2x.png",
        "imgSrc": "nianka-s@2x.png",
        "text": "权益介绍",
        "tapFunction": "toSecond",
        "active": ""
      },
      {
        "iconClass": "wdhy@2x.png",
        "imgSrc": "wdhy-s@2x.png",
        "text": "我的会员",
        "tapFunction": "toThird",
        "active": ""
      }
    ]
  },

  toFirst() {
    this.scrollPage();
    this.setData({
      nowPage: "firstPage",
      nowIndex: 0,
    })
  },
  toSecond() {
    wx.navigateTo({
      url: "../equity/equity"
    })
  },
  toThird() {
    this.scrollPage();
    this.setData({
      nowPage: "trailerPage",
      nowIndex: 2,
    })
  },
  scrollPage: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    
    var b = this;
    b.cal_centre();
    b.my_vip();
  },

  my_vip: function () {
    var b = this;
    a.get("member.level.my", {
      openid: b.data.useropenid
    }, function (e) {
      b.setData({
        cardName: e.result.member.nickname,
        cardOpen: e.result.member.is_open,
        is_expire: e.result.member.is_expire,
        cardExpire: e.result.member.expire,
        cardTit: e.result.member.is_open == 0 ? '已到期' : '年卡到期',
        headImg: e.result.member.avatar
      })
    })
  },

  cal_centre:function(){
    var b = this;
    a.get("member.level", {
      openid: b.data.useropenid,
    }, function (e) {
      recordId = e.result.level.id;

      var timeExpire = e.result.member.expire.substring(0, 11); 

      var level_month = e.result.level.month;

      b.setData({
        nickname: e.result.member.nickname,
        memberTit: e.result.member.is_open == 0 ? '未享受4大权益' : '已享受4大权益',
        timeExpire: timeExpire,
        goodsList: e.result.goods,

        levelCode:e.result.level.status,
        levelStatus: e.result.level.status == 0 ? '免费领取' : e.result.level.status == 1 ? '已领取' : '礼包失效',
        levelList:e.result.level,
        levelImg: e.result.level.thumb,
        levelPrice: e.result.level.price,
        levelMonth: level_month.substring(5, 7),
        levelTime: e.result.level.month,
        couponList: e.result.coupon
      })
    }); 
  },

  ticketBtn:function(){
    wx.navigateTo({
      url: '/pages/sale/coupon/my/index/index',
    })
  },

  btnList:function(){
    wx.navigateTo({
      url: '/pages/annual_card/giftBag/index?recordId='+recordId
    })
  },

  onPullDownRefresh:function(){
    var b = this;
    b.cal_centre();
    b.my_vip();
  },
  onShow:function(){
    var b = this;
    b.cal_centre();
    b.my_vip();
  }
})