// pages/annual_card/member_card/index.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();  

var imgSrc = "";
var useropenid = "";
var addressId = '';
var levelId = '';
var recordId = '';
var levelCode = '';

Page({

  data: {
    globalimg: t.globalData.appimg,
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1,
      title: '',
      height: t.globalData.height * 2 + 20,
    },
    
    nickname:'', 
    timeExpire:'',
    memberTit: '',
    goodsList:[],
    levelImg:'',
    levelPrice:'',
    levelMonth:'',
    levelTime:'',
    couponList:[],
    isShow: false,
    siteList:[],
    levelStatus:'',
    
    cardName:'',
    cardOpen: '',
    is_expire:'',
    cardExpire: '',
    cardTit:'',
    headImg:'',

    btnNum:'',
    nowPage: "firstPage",
    nowIndex: 0,
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

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
     useropenid = userinfo.openid;
    var b = this;
    a.get("member.level", {
      openid: useropenid,
    }, function (e) { 
      levelId = e.result.level.level_id;
      recordId = e.result.level.id;
      levelCode = e.result.level.status;

      var timeExpire = e.result.member.expire.substring(0, 11);
      var level_month = e.result.level.month;
      b.setData({
        nickname: e.result.member.nickname,
        memberTit: e.result.member.is_open == 0 ? '未享受五大权益' :'已享受五大权益',
        timeExpire: timeExpire,
        goodsList: e.result.goods,

        levelImg: e.result.level.thumb,
        levelPrice: e.result.level.price,
        levelMonth: level_month.substring(4, 6) > 9 ? level_month.substring(4, 6) : level_month.substring(5, 6),
        levelTime: level_month.substring(0, 4) + '年' + level_month.substring(5, 7) + '月20日',
        levelStatus: levelCode == 0 ? '未领取' : levelCode == 1?'已领取':'礼包失效',
    
        couponList: e.result.coupon
      })

    });

    a.get("member.level.my",{
      openid: useropenid
    },function(e){
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
  toThird(){
    this.scrollPage();
    this.setData({
      nowPage: "trailerPage",
      nowIndex: 2,
    })
  },
  scrollPage:function(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
  },

  btnGet: function (e) {
    if (levelCode == 0){
      var m = this;
      a.get("member.level.address_list",{
        openid: useropenid
      },function(e){
        if(e.status == -1){
          wx.showToast({
            title: e.result.message,
            icon: 'none',
            duration: 2000
          })
        }else{
          addressId = e.result.list[0].id;
          m.setData({
            isShow: true,
            siteList: e.result.list
          })
        }
      })
    } 
  },

  cancelBtn:function(e){
    this.setData({
      isShow: false,
    })
  },

  clickNum:function(e){ 
    addressId = e.currentTarget.dataset.address;
    this.setData({
      btnNum: e.currentTarget.dataset.id,
    }) 
  },

  site_ok:function(e){
    var m = this;
    a.get("member.level.get",{
      openid: useropenid,
      level_id: levelId,
      address_id: addressId,
      record_id: recordId
    },function(e){
      if(e.status == 0){
        wx.showToast({
          title: '领取失败',
          icon: 'none',
          duration: 2000
        })
      } else if (e.status == 1){
        wx.showToast({
          title: '领取成功',
          icon: 'none', 
          duration: 2000
        }) 
        m.setData({
          isShow: false
        })
      }
    });
  }
  
})