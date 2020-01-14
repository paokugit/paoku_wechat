var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var order_id = 0;

var anonymous = 0;
var labelStr=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    one_2: 5,
    two_2: 0,
    goods_1: 5,
    goods_2: 0,
    manner_1: 5,
    manner_2: 0,
    starlevel: '',
    hint: '宝贝满足你的期待吗？说说你的使用心得，分享给想买的 他们吧',
    fileName: [],
    tempFilePaths: [],
    checked: false,
    appraise_txt:'',
    goodslist: [],
    addto:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    if (options.order_id != undefined) {
      order_id = options.order_id
    }
    if(options.addto != undefined){
      this.setData({
        addto : options.addto
      })
    }

    this.exhibition();
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

  exhibition: function () {
    var lm = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.comment_view&comefrom=wxapp',
      data: {
        order_id: order_id
      },
      success: function (res) {
        console.log(res);
        lm.setData({
          show: !0
        });
        if (res.data.error == 0) {
          lm.setData({
            goodslist: res.data.data.goods
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },

  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    var text;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    if (one_2 == 1) {
      text = '非常差';
    } else if (one_2 == 2) {
      text = '差';
    } else if (one_2 == 3) {
      text = '一般';
    } else if (one_2 == 4) {
      text = '好';
    } else if (one_2 == 5) {
      text = '非常好';
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2,
      starlevel: text
    })
  },
  goods: function (e) {
    var goods_ind = e.currentTarget.dataset.in;
    var goods_1;
    if (goods_ind === 'goods_1') {
      goods_1 = Number(e.currentTarget.id);
    } else {
      goods_1 = Number(e.currentTarget.id) + this.data.goods_1;
    }
    this.setData({
      goods_1: goods_1,
      goods_2: 5 - goods_1
    })
  },
  manner: function (e) {
    var manner_ind = e.currentTarget.dataset.in;
    var manner_1;
    if (manner_ind === 'manner_1') {
      manner_1 = Number(e.currentTarget.id);
    } else {
      manner_1 = Number(e.currentTarget.id) + this.data.manner_1;
    }
    this.setData({
      manner_1: manner_1,
      manner_2: 5 - manner_1
    })
  },

  // 上传
  choose: function (options) {
    var that = this,
      tempFilePaths = this.data.tempFilePaths;
    wx.chooseImage({
      count: 9 - tempFilePaths.length,
      sizeType: 'compressed',
      sourceType: 'album',
      success: function (res) {
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.showLoading({
            title: '上传中...',
            mask: true
          })
          wx.uploadFile({
            url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=util.uploader.upload&file=file',
            filePath: res.tempFilePaths[i],
            name: "file",
            header: {
              'content-type': 'multipart/form-data'
            },
            success: function (n) {
              wx.hideLoading();
              var o = JSON.parse(n.data);
              console.log(o)
              if (o.error == 0) {
                that.data.fileName.push(o.files[0].filename);
                tempFilePaths.push(o.files[0].url);
                that.setData({
                  tempFilePaths: tempFilePaths
                });
              } else {
                wx.showToast({
                  title: o.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }

          });
        };
      }
    })
  },

  // 删除
  deletePic: function (e) {
    var m = this;
    var images = m.data.tempFilePaths;
    var imgfile = m.data.fileName;
    var index = e.currentTarget.dataset.id;


    imgfile.splice(index, 1);
    images.splice(index, 1);

    console.log(imgfile, images)
    m.setData({
      tempFilePaths: images,
      fileName: imgfile
    })
  },

  checkedTap: function () {
    var _th = this;
    var checked = _th.data.checked;
    console.log(checked);
    if(checked == false){
      anonymous = 1;
    }else{
      anonymous = 0;
    }
    _th.setData({
      "checked": !checked
    })
  },

  change:function(e){
    this.setData({
      appraise_txt:e.detail.value
    })
  },

  itelabBtn:function(e){
    var labtxt = e.currentTarget.dataset.lab;
    var so = this;
    labelStr.push(labtxt);

    var list = so.data.goodslist;
    list[e.currentTarget.dataset.boxind].label[e.currentTarget.dataset.ind].selected = e.currentTarget.dataset.ind;
    so.setData({
      goodslist:list
    })
  },

  appraiseBtn: function () {
    var kl = this;
    var comments = [];
    for (var e = 0, s = kl.data.goodslist.length; e < s; e++) {
      var i = {
        goodsid: kl.data.goodslist[e].goods_id,
        level: kl.data.one_2,
        content: kl.data.appraise_txt,
        images: kl.data.fileName,
        label:labelStr.toString(),
        anonymous:anonymous,
      };
      comments.push(i);
    }
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.comment_submit&comefrom=wxapp',
      data: {
        openid:useropenid,
        orderid:order_id,
        comments:comments,
        deliverry_service:kl.data.goods_1,
        service_attitude:kl.data.manner_1
      },
      success: function (res) {
        console.log(res);
        kl.setData({
          show: !0
        });
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        if (res.data.error == 0) {
          setTimeout(function(){
            wx.setStorageSync('evaluate', '1');
            wx.navigateBack();
          }, 2000); 
        }
      }
    });
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