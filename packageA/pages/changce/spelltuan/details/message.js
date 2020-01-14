var t = getApp(),
  a = t.requirejs("core"),
  b = t.requirejs("wxParse/wxParse"),
  s = t.requirejs("jquery");
var f = getApp();
var useropenid = "";

var util = require('../../../../../utils/util.js');
var interval = ""; 
var timestampcount = "";
var aloneid = '';//判断拼团列表自己是否已参与
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    advWidth:0,
    advHeight:0,
    goodsDetails:[],
    standard:[],
    ball:1,
    amount:1,//购买量
    choice:0,
    specsTitle:'',
    chooseList:[],
    specs: [],
    boxarr:[],
    optionid: 0,//规格id
    goodsid:'',//商品id
    single:0,//是否单购 0拼团，1单独
    team_id:'',//参团id

    listData:[],
    mydata:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    aloneid = userinfo.id
    
    var opt = this;
    console.log(options);
    if (options.id != undefined){
      opt.setData({
        goodsid: options.id
      })
    }
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
    var e = this;
    
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    if (Object.keys(json).length != 0){
      e.data.goodsid = json.id;
      e.data.single = json.xuan;
      e.data.team_id = json.teamid;

      wx.showLoading({
        mask: true
      });

      wx.request({
        url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.option&comefrom=wxapp',
        data: {
          goods_id: json.id,
          single: json.xuan
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          if (res.data.error == 0) {
            e.setData({
              standard: res.data.data,
              boxarr: res.data.data.options,
              ball: 0,
              choice: json.xuan
            });

          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      });
    }

    wx.getSystemInfo({
      success: function (t) {
        var a = t.windowWidth / 1;
        e.setData({
          advWidth: t.windowWidth,
          advHeight: t.windowWidth
        });
      }
    });
    
    e.goodsList();
  },

  goodsList:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.good_detail&comefrom=wxapp',
      data: {
        goods_id:t.data.goodsid, 
        openid: useropenid
      },
      success: function (res) {
        console.log(res);
        t.setData({
          show: !0
        });
        if (res.data.error == 0){

          t.setData({
            goodsDetails: res.data.data,
            listData: res.data.data.group.list
          });
          b.wxParse("wxParseData", "html", res.data.data.content, t, "25");
          if (t.data.listData.length != 0){
            t.setCountDown();
          }
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
      } 
    });
  },

  /* 倒计时*/
  setCountDown: function () {
    var t = this;
    let record = t.data.listData;
    
    interval = setInterval(function () {
      var TIME = util.formatTime(new Date());
      var timestamp = Date.parse(new Date());
      timestampcount = timestamp / 1000;

      for (var i = 0; i < record.length; i++) {

        for (var j = 0; j < record[i].userid.length; j++) {
          if (record[i].userid[j] == aloneid) {
            record[i].gerenid = 1;
          } else {
            record[i].gerenid = 0;
          }
        }
  
        record[i].time = parseInt(record[i].endtime) - parseInt(timestampcount);

        // 总秒数
        var second = record[i].time;
        
        // 小时位
        var hr = Math.floor((second) / 3600);

        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;
   
        // 分钟位
        var min = Math.floor((second - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位
        var sec = second - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        record[i].countDown = hrStr + ':' + minStr + ':' + secStr;

        if (record[i].endtime == timestampcount){
          record[i].jihao = 1
        }else{
          record[i].jihao = 0
        }
      }
      console.log('123');
      t.setData({
        listData: record
      })
    },1000);
  },

  selectBtn:function(e){
    var s = this;
    s.data.goodsid = e.currentTarget.dataset.id;
    s.data.single = e.currentTarget.dataset.xuan;
    s.data.team_id = e.currentTarget.dataset.teamid
    console.log('123');
    if(e.currentTarget.dataset.morespec == 1){
      wx.showLoading({
        mask: true
      });
      console.log('avc');
      wx.request({
        url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.option&comefrom=wxapp',
        data: {
          goods_id: s.data.goodsid,
          single: e.currentTarget.dataset.xuan
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          if(res.data.error == 0){
            s.setData({
              standard:res.data.data,
              boxarr: res.data.data.options,
              ball:0,
              choice: e.currentTarget.dataset.xuan
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      });
    }else{
      s.setData({
        ball:0,
        choice: e.currentTarget.dataset.xuan
      })
    }
  },

  emptyActive:function(e){
    this.setData({
      ball:1
    })
  },

  selectGuige:function(e){
    let that = this,
      
      idx = e.currentTarget.dataset.idx,// 获取第一个循环的index
      
      selectId = e.currentTarget.dataset.id,// 获取当前点击的id
      
      selectName = e.currentTarget.dataset.title;// 获取当前点击的规格名称

    var l = that.data.boxarr;//获取规格数据

    var outer = that.data.specs;//选择规格的数组

    var arrid=[];
    var s = "", d = "", i = [];
    outer[idx] = {
      id: selectId,
      title: selectName
    };
    outer.forEach(function (t) {
      s += t.title + ";", i.push(t.id);
    });

    for(var i = 0; i < outer.length; i++){
      arrid.push(outer[i].id)
    }
    d = arrid.join("_");

    "" != e.currentTarget.dataset.thumb && that.setData({
      "standard.goods.thumb": e.currentTarget.dataset.thumb
    });
    l.forEach(function (t) {
      console.log(t);
      t.specs == d && (that.setData({
        optionid: t.id,
        "standard.goods.total": t.stock,
        "standard.goods.minprice": t.marketprice
      }));
    })

    that.setData({
      chooseList:outer,
      specsTitle:s
    });
  },

  quantityBtn:function(e){
    var p = this;
    var num = p.data.amount;
    let sign = e.currentTarget.dataset.sign;
    if (sign == 0){
      num -= 1;
      if(num < 1){
        wx.showToast({
          title: '单次最少购买一件',
          icon: 'none',
          duration: 2000//持续的时间
        })
        return;
      }
    }else if(sign == 1){
      num += 1;
    }
    p.setData({
      amount: num
    })
  },

  spellbuy:function(e){
    var t = this;
    console.log(t.data.optionid, t.data.goodsid, t.data.single, t.data.amount, t.data.team_id);
    
    if(e.currentTarget.dataset.morespec==1){
      if (t.data.optionid <= 0){
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.navigateTo({
          url: '/packageA/pages/changce/spelltuan/affirm/affirm?optionid=' + t.data.optionid + '&goodsid=' + t.data.goodsid + '&single=' + t.data.single + '&amount=' + t.data.amount + "&team_id=" + t.data.team_id+"&morespec="+e.currentTarget.dataset.morespec,
        })
      }
    }else{
      wx.navigateTo({
        url: '/packageA/pages/changce/spelltuan/affirm/affirm?optionid=' + t.data.optionid + '&goodsid=' + t.data.goodsid + '&single=' + t.data.single + '&amount=' + t.data.amount + "&team_id=" + t.data.team_id+"&morespec="+e.currentTarget.dataset.morespec,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(interval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(interval);
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