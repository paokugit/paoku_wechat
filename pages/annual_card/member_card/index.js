// pages/annual_card/member_card/index.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();  

var imgSrc = "";
var useropenid = "";
var levelId = '';
var recordId = '';
var levelCode = '';
var addressId = '';
Page({

  data: {
    globalimg: t.globalData.appimg,
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1,
      title: '年卡中心',
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
    levelList:[],
    
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
      console.log(e);
      
      levelId = e.result.level.level_id;
      recordId = e.result.level.id;
      levelCode = e.result.level.status;

      var timeExpire = e.result.member.expire.substring(0, 11);

      var level_month = e.result.level.month;

      b.setData({
        nickname: e.result.member.nickname,
        memberTit: e.result.member.is_open == 0 ? '未享受4大权益' : '已享受4大权益',
        timeExpire: timeExpire,
        goodsList: e.result.goods,

        levelList:e.result.level,
        levelImg: e.result.level.thumb,
        levelPrice: e.result.level.price,
        levelMonth: level_month.substring(5, 7),
        levelTime: e.result.level.month,
        levelStatus: levelCode == 0 ? '免费领取' : levelCode == 1 ? '已领取' : '礼包失效',
        couponList: e.result.coupon
      })
    }); 
  },

  ticketBtn:function(){
    wx.navigateTo({
      url: '/pages/sale/coupon/my/index/index',
    })
  },

  btnGet: function (e) {
    var m = this;
    if (levelCode == 0){
      a.get("member.level.address_list",{
        openid: useropenid
      },function(e){    
  
        if(e.status == -1){
          m.setData({
            titMessage: e.result.message,
            isShow:true,
            siteList:[]
          })
        }else{
          let price = e.result.data.price;
          addressId = e.result.list[0].id;
          m.setData({
            siteList: e.result.list,
            postage: e.result.data.is_remote == 0 ? price : price+'（偏远）',
            rental:price,
            isShow: true,
            titMessage:''
          })
        }
      })
    }
  },

  cancelBtn:function(e){
    this.setData({
      isShow: false,
      btnNum:0
    })
  },

  clickNum:function(e){ 
    addressId = e.currentTarget.dataset.address;
    let btnNum = e.currentTarget.dataset.id;
    let m = this;
    a.get("member.level.change",{
      openid: useropenid,
      address_id: addressId
    },function(e){
      let price = e.result.data.price;
      m.setData({
        btnNum: btnNum,
        postage: e.result.data.is_remote == 0 ? price : price + '(偏远)',
        rental:price
      }) 
    })
  },

  site_ok:function(e){
    var m = this;
    var order = '';

    a.get("member.level.get",{
      openid: useropenid,
      level_id: levelId,
      address_id: addressId,
      record_id: recordId,
      money: m.data.rental
    },function(e){
      console.log(e);
      order = e.result.order_id;

      wx.requestPayment({
        timeStamp: e.result.timeStamp,
        nonceStr: e.result.nonceStr,
        package: e.result.package,
        signType: e.result.signType,
        paySign: e.result.paySign,
        success(res) {
          m.setData({ 
            isShow: false, 
            levelStatus:'已领取',
          });

          levelCode = 1;

          wx.showToast({
            title: '领取成功,请耐心等待',
            icon: 'none',
            dufailration: 1000
          });
        },
        fail(res){
          a.get("member.level.cancel", { 
            openid: useropenid,
            order_id: order
          },function(e){
            console.log(e);
          })
        }
      })
    })
  },

  site_skip:function(){
    wx.navigateTo({
      url: '/pages/member/address/index'
    })
    this.setData({
      isShow:false,
      btnNum:0
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